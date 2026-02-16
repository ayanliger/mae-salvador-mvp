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
  EtapaMaeSalvador,
  SituacaoTranscard,
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
