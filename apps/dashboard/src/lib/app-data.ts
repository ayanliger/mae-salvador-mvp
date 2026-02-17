/**
 * Data access layer for the Mãe Salvador application database.
 *
 * All functions operate on the `mae_salvador` PostgreSQL database
 * (via getAppPool()) and map rows to shared domain types.
 *
 * These cover program-specific data NOT stored in e-SUS:
 * Transcard, programa_gestante, notifications, syphilis, sessions, etc.
 */

import { getAppPool } from "./db";

import type {
  TranscardVinculacao,
  AtividadeEducativa,
  VisitaMaternidade,
  Notificacao,
  CasoSifilis,
  CadastroGestante,
  CadastroGestanteInput,
  EtapaMaeSalvador,
  SituacaoTranscard,
  StatusCadastro,
} from "@mae-salvador/shared";

// ── Helpers ────────────────────────────────────────────

function toISODate(v: unknown): string {
  if (!v) return "";
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
}

function toStr(v: unknown): string {
  return v != null ? String(v) : "";
}

function toOptStr(v: unknown): string | undefined {
  return v != null ? String(v) : undefined;
}

// ── Dados Complementares PEC (spreadsheet enrichment) ──

export interface DadosComplementaresRow {
  no_usuario: string;
  no_mae: string | null;
  dt_nascimento: string | null;
  nu_cpf: string | null;
}

interface LookupKey {
  nome: string;
  dt_nascimento: string;
  cpf: string;
}

/**
 * Batch-lookup supplemental citizen data from the imported PEC spreadsheet.
 * Returns a Map keyed by both "NAME|DOB" and by CPF (when available).
 */
export async function appGetDadosComplementares(
  lookups: LookupKey[],
): Promise<Map<string, DadosComplementaresRow>> {
  if (lookups.length === 0) return new Map();

  // Collect unique normalised names and CPFs for a single batch query
  const names = new Set<string>();
  const cpfs = new Set<string>();
  for (const l of lookups) {
    if (l.nome && l.dt_nascimento) names.add(normaliseForMatch(l.nome));
    if (l.cpf) cpfs.add(l.cpf);
  }

  const conditions: string[] = [];
  const params: unknown[] = [];
  let idx = 1;

  if (names.size > 0) {
    conditions.push(`no_usuario_normalizado = ANY($${idx})`);
    params.push([...names]);
    idx++;
  }
  if (cpfs.size > 0) {
    conditions.push(`nu_cpf = ANY($${idx})`);
    params.push([...cpfs]);
    idx++;
  }

  if (conditions.length === 0) return new Map();

  const { rows } = await getAppPool().query(
    `SELECT no_usuario, no_mae, dt_nascimento, nu_cpf
     FROM cidadao_dados_pec
     WHERE ${conditions.join(" OR ")}`,
    params,
  );

  const result = new Map<string, DadosComplementaresRow>();
  for (const r of rows) {
    const row = r as DadosComplementaresRow;
    // Key by original name + DOB
    if (row.no_usuario && row.dt_nascimento) {
      const nameKey = `${row.no_usuario}|${toISODate(row.dt_nascimento)}`;
      result.set(nameKey, row);
    }
    // Also key by CPF for direct lookup
    if (row.nu_cpf) {
      result.set(row.nu_cpf, row);
    }
  }
  return result;
}

function normaliseForMatch(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

// ── Programa Gestante (enrichment) ─────────────────────

export interface ProgramaGestanteRow {
  co_cidadao: number;
  maternidade_referencia: string | null;
  profissional_responsavel_id: number | null;
  cartao_mae_salvador: boolean;
  bolsa_familia: boolean;
  data_cadastro: string;
}

export async function appGetProgramaGestante(
  coCidadao: string,
): Promise<ProgramaGestanteRow | null> {
  const { rows } = await getAppPool().query(
    `SELECT co_cidadao, maternidade_referencia, profissional_responsavel_id,
            cartao_mae_salvador, bolsa_familia, data_cadastro
     FROM programa_gestante WHERE co_cidadao = $1`,
    [coCidadao],
  );
  return rows.length > 0 ? (rows[0] as ProgramaGestanteRow) : null;
}

export async function appUpsertProgramaGestante(
  coCidadao: string,
  data: Partial<Omit<ProgramaGestanteRow, "co_cidadao">>,
): Promise<void> {
  const fields = Object.keys(data);
  if (fields.length === 0) return;

  const setClauses = fields.map((f, i) => `${f} = $${i + 2}`);
  const values = fields.map((f) => data[f as keyof typeof data]);

  await getAppPool().query(
    `INSERT INTO programa_gestante (co_cidadao, ${fields.join(", ")})
     VALUES ($1, ${fields.map((_, i) => `$${i + 2}`).join(", ")})
     ON CONFLICT (co_cidadao) DO UPDATE SET ${setClauses.join(", ")}, atualizado_em = now()`,
    [coCidadao, ...values],
  );
}

// ── Transcard Vinculação ───────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapTranscard(row: any): TranscardVinculacao {
  return {
    id: String(row.id),
    gestanteId: String(row.co_cidadao),
    numeroTranscard: toStr(row.numero_transcard),
    cpf: toStr(row.cpf),
    situacao: row.situacao as SituacaoTranscard,
    dataVinculacao: toISODate(row.data_vinculacao),
    etapaAtual: row.etapa_atual as EtapaMaeSalvador,
    lgpdConsentimento: row.lgpd_consentimento,
    recusouTranscard: row.recusou_transcard === true,
    recusouKitEnxoval: row.recusou_kit_enxoval === true,
    encaminhadaCras: row.encaminhada_cras === true,
    dataEncaminhamentoCras: toOptStr(row.data_encaminhamento_cras)
      ? toISODate(row.data_encaminhamento_cras)
      : undefined,
  };
}

export async function appGetTranscardByGestante(
  coCidadao: string,
): Promise<TranscardVinculacao | null> {
  const { rows } = await getAppPool().query(
    "SELECT * FROM transcard_vinculacao WHERE co_cidadao = $1 ORDER BY criado_em DESC LIMIT 1",
    [coCidadao],
  );
  return rows.length > 0 ? mapTranscard(rows[0]) : null;
}

export async function appCreateTranscard(
  coCidadao: string,
  cpf: string,
  numeroTranscard?: string,
): Promise<TranscardVinculacao> {
  const { rows } = await getAppPool().query(
    `INSERT INTO transcard_vinculacao (co_cidadao, cpf, numero_transcard)
     VALUES ($1, $2, $3) RETURNING *`,
    [coCidadao, cpf, numeroTranscard ?? null],
  );
  // Mark the physical card as consumed in estoque
  if (numeroTranscard) {
    await appReservarTranscard(numeroTranscard);
  }
  return mapTranscard(rows[0]);
}

export async function appUpdateTranscard(
  id: string,
  data: Partial<Pick<TranscardVinculacao, "situacao" | "etapaAtual" | "lgpdConsentimento" | "recusouTranscard" | "recusouKitEnxoval" | "encaminhadaCras" | "dataEncaminhamentoCras">>,
): Promise<void> {
  const colMap: Record<string, string> = {
    situacao: "situacao",
    etapaAtual: "etapa_atual",
    lgpdConsentimento: "lgpd_consentimento",
    recusouTranscard: "recusou_transcard",
    recusouKitEnxoval: "recusou_kit_enxoval",
    encaminhadaCras: "encaminhada_cras",
    dataEncaminhamentoCras: "data_encaminhamento_cras",
  };

  const entries = Object.entries(data).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return;

  const setClauses = entries.map(([k], i) => `${colMap[k]} = $${i + 2}`);
  const values = entries.map(([, v]) => v);

  await getAppPool().query(
    `UPDATE transcard_vinculacao SET ${setClauses.join(", ")}, atualizado_em = now() WHERE id = $1`,
    [id, ...values],
  );
}

// ── Transcard Estoque (card inventory) ─────────────────

export async function appGetTranscardsDisponiveis(
  ubsCnes: string,
): Promise<string[]> {
  const { rows } = await getAppPool().query(
    "SELECT numero_transcard FROM transcard_estoque WHERE ubs_cnes = $1 AND disponivel = true ORDER BY numero_transcard",
    [ubsCnes],
  );
  return rows.map((r: any) => String(r.numero_transcard));
}

async function appReservarTranscard(numeroTranscard: string): Promise<void> {
  await getAppPool().query(
    "UPDATE transcard_estoque SET disponivel = false WHERE numero_transcard = $1",
    [numeroTranscard],
  );
}

// ── Atividades Educativas ──────────────────────────────

function mapAtividade(row: any): AtividadeEducativa {
  return {
    id: String(row.id),
    gestanteId: String(row.co_cidadao),
    data: toISODate(row.data),
    descricao: toStr(row.descricao),
    profissionalId: String(row.co_prof),
  };
}

export async function appGetAtividadesByGestante(
  coCidadao: string,
): Promise<AtividadeEducativa[]> {
  const { rows } = await getAppPool().query(
    "SELECT * FROM atividade_educativa WHERE co_cidadao = $1 ORDER BY data DESC",
    [coCidadao],
  );
  return rows.map(mapAtividade);
}

export async function appCreateAtividade(
  coCidadao: string,
  coProf: string,
  data: string,
  descricao: string,
): Promise<AtividadeEducativa> {
  const { rows } = await getAppPool().query(
    `INSERT INTO atividade_educativa (co_cidadao, co_prof, data, descricao)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [coCidadao, coProf, data, descricao],
  );
  return mapAtividade(rows[0]);
}

// ── Visitas Maternidade ────────────────────────────────

function mapVisita(row: any): VisitaMaternidade {
  return {
    id: String(row.id),
    gestanteId: String(row.co_cidadao),
    data: toISODate(row.data),
    maternidade: toStr(row.maternidade),
    profissionalId: String(row.co_prof),
    observacoes: toOptStr(row.observacoes),
  };
}

export async function appGetVisitasByGestante(
  coCidadao: string,
): Promise<VisitaMaternidade[]> {
  const { rows } = await getAppPool().query(
    "SELECT * FROM visita_maternidade WHERE co_cidadao = $1 ORDER BY data DESC",
    [coCidadao],
  );
  return rows.map(mapVisita);
}

export async function appCreateVisita(
  coCidadao: string,
  coProf: string,
  data: string,
  maternidade: string,
  observacoes?: string,
): Promise<VisitaMaternidade> {
  const { rows } = await getAppPool().query(
    `INSERT INTO visita_maternidade (co_cidadao, co_prof, data, maternidade, observacoes)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [coCidadao, coProf, data, maternidade, observacoes ?? null],
  );
  return mapVisita(rows[0]);
}

// ── Notificações ───────────────────────────────────────

function mapNotificacao(row: any): Notificacao {
  return {
    id: String(row.id),
    gestanteId: String(row.co_cidadao),
    titulo: toStr(row.titulo),
    mensagem: toStr(row.mensagem),
    tipo: row.tipo,
    lida: row.lida === true,
    data: row.data instanceof Date ? row.data.toISOString() : String(row.data),
  };
}

export async function appGetNotificacoesByGestante(
  coCidadao: string,
): Promise<Notificacao[]> {
  const { rows } = await getAppPool().query(
    "SELECT * FROM notificacao WHERE co_cidadao = $1 ORDER BY data DESC",
    [coCidadao],
  );
  return rows.map(mapNotificacao);
}

export async function appCreateNotificacao(
  coCidadao: string,
  titulo: string,
  mensagem: string,
  tipo: Notificacao["tipo"],
): Promise<Notificacao> {
  const { rows } = await getAppPool().query(
    `INSERT INTO notificacao (co_cidadao, titulo, mensagem, tipo)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [coCidadao, titulo, mensagem, tipo],
  );
  return mapNotificacao(rows[0]);
}

export async function appMarkNotificacaoLida(id: string): Promise<void> {
  await getAppPool().query(
    "UPDATE notificacao SET lida = true WHERE id = $1",
    [id],
  );
}

export async function appGetUnreadCount(coCidadao: string): Promise<number> {
  const { rows } = await getAppPool().query(
    "SELECT COUNT(*)::int AS count FROM notificacao WHERE co_cidadao = $1 AND lida = false",
    [coCidadao],
  );
  return rows[0]?.count ?? 0;
}

// ── Casos de Sífilis ───────────────────────────────────

function mapSifilis(row: any): CasoSifilis {
  return {
    id: String(row.id),
    gestanteId: String(row.co_cidadao),
    classificacao: row.classificacao,
    dataDeteccao: toISODate(row.data_deteccao),
    idadeGestacionalDeteccao: row.ig_deteccao_semanas ?? 0,
    tratamentoIniciado: row.tratamento_iniciado === true,
    tratamentoConcluido: row.tratamento_concluido === true,
    parceiroTratado: row.parceiro_tratado === true,
  };
}

export async function appGetCasosSifilisByGestante(
  coCidadao: string,
): Promise<CasoSifilis[]> {
  const { rows } = await getAppPool().query(
    "SELECT * FROM caso_sifilis WHERE co_cidadao = $1 ORDER BY data_deteccao DESC",
    [coCidadao],
  );
  return rows.map(mapSifilis);
}

export async function appGetAllCasosSifilis(): Promise<CasoSifilis[]> {
  const { rows } = await getAppPool().query(
    "SELECT * FROM caso_sifilis ORDER BY data_deteccao DESC",
  );
  return rows.map(mapSifilis);
}

export async function appCreateCasoSifilis(
  coCidadao: string,
  classificacao: CasoSifilis["classificacao"],
  dataDeteccao: string,
  igSemanas?: number,
): Promise<CasoSifilis> {
  const { rows } = await getAppPool().query(
    `INSERT INTO caso_sifilis (co_cidadao, classificacao, data_deteccao, ig_deteccao_semanas)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [coCidadao, classificacao, dataDeteccao, igSemanas ?? null],
  );
  return mapSifilis(rows[0]);
}

// ── Cadastro Gestante ──────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapCadastro(row: any): CadastroGestante {
  return {
    id: String(row.id),
    cpf: toStr(row.cpf),
    cns: toOptStr(row.cns),
    nomeCompleto: toStr(row.nome_completo),
    nomeSocial: toOptStr(row.nome_social),
    identidadeGenero: toOptStr(row.identidade_genero),
    orientacaoSexual: toOptStr(row.orientacao_sexual),
    dataNascimento: row.data_nascimento ? toISODate(row.data_nascimento) : undefined,
    telefone: toStr(row.telefone),
    temWhatsapp: row.tem_whatsapp === true,
    logradouro: toStr(row.logradouro),
    numero: toStr(row.numero),
    complemento: toOptStr(row.complemento),
    bairro: toStr(row.bairro),
    cep: toStr(row.cep),
    distritoSanitarioId: toOptStr(row.distrito_sanitario_id),
    descobrimentoGestacao: row.descobrimento_gestacao,
    dum: row.dum ? toISODate(row.dum) : undefined,
    programaSocial: row.programa_social,
    nis: toOptStr(row.nis),
    planoSaude: row.plano_saude ?? undefined,
    manterAcompanhamentoUbs: row.manter_acompanhamento_ubs ?? undefined,
    ubsId: toStr(row.ubs_id),
    gestacoesPrevias: row.gestacoes_previas ?? undefined,
    partosCesareo: row.partos_cesareo ?? undefined,
    partosNormal: row.partos_normal ?? undefined,
    abortos: row.abortos ?? undefined,
    alergias: toOptStr(row.alergias),
    doencasConhecidas: toOptStr(row.doencas_conhecidas),
    medicacoesEmUso: toOptStr(row.medicacoes_em_uso),
    origem: row.origem,
    status: row.status,
    criadoEm: row.criado_em instanceof Date ? row.criado_em.toISOString() : String(row.criado_em),
    atualizadoEm: row.atualizado_em instanceof Date ? row.atualizado_em.toISOString() : String(row.atualizado_em),
  };
}

export async function appCreateCadastroGestante(
  data: CadastroGestanteInput,
): Promise<CadastroGestante> {
  const cpfDigits = data.cpf ? data.cpf.replace(/\D/g, "") : null;
  const cnsDigits = data.cns ? data.cns.replace(/\D/g, "") : null;
  const { rows } = await getAppPool().query(
    `INSERT INTO cadastro_gestante (
       cpf, cns, nome_completo, nome_social, identidade_genero, orientacao_sexual,
       data_nascimento, telefone, tem_whatsapp,
       logradouro, numero, complemento, bairro, cep, distrito_sanitario_id,
       descobrimento_gestacao, dum, programa_social, nis, plano_saude, manter_acompanhamento_ubs,
       ubs_id,
       gestacoes_previas, partos_cesareo, partos_normal, abortos,
       alergias, doencas_conhecidas, medicacoes_em_uso,
       origem
     ) VALUES (
       $1, $2, $3, $4, $5, $6,
       $7, $8, $9,
       $10, $11, $12, $13, $14, $15,
       $16, $17, $18, $19, $20, $21,
       $22,
       $23, $24, $25, $26,
       $27, $28, $29,
       $30
     ) RETURNING *`,
    [
      cpfDigits || null, cnsDigits || null, data.nomeCompleto, data.nomeSocial || null,
      data.identidadeGenero || null, data.orientacaoSexual || null,
      data.dataNascimento || null, data.telefone, data.temWhatsapp,
      data.logradouro, data.numero, data.complemento || null,
      data.bairro, data.cep, data.distritoSanitarioId || null,
      data.descobrimentoGestacao, data.dum || null, data.programaSocial,
      data.nis || null, data.planoSaude || null, data.manterAcompanhamentoUbs || null,
      data.ubsId,
      data.gestacoesPrevias ?? null, data.partosCesareo ?? null,
      data.partosNormal ?? null, data.abortos ?? null,
      data.alergias || null, data.doencasConhecidas || null, data.medicacoesEmUso || null,
      data.origem,
    ],
  );
  return mapCadastro(rows[0]);
}

export async function appGetCadastrosGestante(
  status?: StatusCadastro,
): Promise<CadastroGestante[]> {
  const query = status
    ? "SELECT * FROM cadastro_gestante WHERE status = $1 ORDER BY criado_em DESC"
    : "SELECT * FROM cadastro_gestante ORDER BY criado_em DESC";
  const params = status ? [status] : [];
  const { rows } = await getAppPool().query(query, params);
  return rows.map(mapCadastro);
}
