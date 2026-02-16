/**
 * e-SUS data access layer — executes queries from @mae-salvador/shared
 * against the read-only esusPool and maps raw rows to domain types.
 *
 * Each function mirrors the signature in data.ts so they can be
 * swapped in one at a time during step 7 (progressive mock replacement).
 */

import { getEsusPool } from "./db";

import type {
  Gestante,
  ConsultaPreNatal,
  Exame,
  Vacina,
  Medicacao,
  Profissional,
  UBS,
  Equipe,
  StatusConsulta,
  StatusExame,
  StatusVacina,
  TipoSanguineo,
  RiscoGestacional,
  RacaCor,
  PapelProfissional,
  TipoEquipe,
  RegistroPeso,
} from "@mae-salvador/shared";

import {
  QUERY_GESTANTES,
  QUERY_GESTANTE_BY_ID,
  QUERY_CONSULTAS_BY_GESTANTE,
  QUERY_EXAMES_BY_GESTANTE,
  QUERY_VACINAS_BY_GESTANTE,
  QUERY_MEDICACOES_BY_GESTANTE,
  QUERY_PROFISSIONAL_BY_ID,
  QUERY_UBS_LIST,
  QUERY_EQUIPES_BY_UBS,
  QUERY_HISTORICO_PESO,
} from "@mae-salvador/shared";

import {
  computeIdadeGestacional,
  computeDPP,
  computeTrimestre,
  parsePressaoArterial,
  STATUS_ATEND_PROF_MAP,
  EDEMA_MAP,
  TIPO_EXAME_MAP,
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

function toInt(v: unknown, fallback = 0): number {
  const n = parseInt(String(v), 10);
  return isNaN(n) ? fallback : n;
}

function toFloat(v: unknown): number | undefined {
  if (v == null) return undefined;
  const n = parseFloat(String(v));
  return isNaN(n) ? undefined : n;
}

// ── Lookup maps ────────────────────────────────────────

/** Map tb_raca_cor.no_raca_cor (uppercase PT) → domain enum */
function parseRacaCor(v: unknown): RacaCor {
  const s = String(v ?? "").toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (s.includes("BRANCA"))   return "branca";
  if (s.includes("PRETA"))    return "preta";
  if (s.includes("AMARELA"))  return "amarela";
  if (s.includes("INDIGENA")) return "indigena";
  return "parda"; // default / "PARDA"
}

function cboPapel(cbo: unknown): PapelProfissional {
  const s = String(cbo ?? "");
  if (s.startsWith("2251")) return "medico";
  if (s.startsWith("2235")) return "enfermeiro";
  if (s.startsWith("1312")) return "gestor";
  return "admin";
}

const TIPO_EQUIPE_MAP: Record<number, TipoEquipe> = {
  70: "eSF",
  76: "eAP",
  71: "eSB",
};

// ── Gestantes ──────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapGestante(row: any): Gestante {
  const dum = toISODate(row.dt_ultima_menstruacao);
  return {
    id: String(row.co_seq_cidadao),
    nomeCompleto: toStr(row.no_cidadao),
    cpf: toStr(row.nu_cpf),
    cns: toOptStr(row.nu_cns),
    dataNascimento: toISODate(row.dt_nascimento),
    telefone: toStr(row.nu_telefone_celular),
    email: toOptStr(row.ds_email),
    endereco: {
      logradouro: toStr(row.ds_logradouro),
      numero: toStr(row.nu_numero),
      complemento: toOptStr(row.ds_complemento),
      bairro: toStr(row.no_bairro),
      cep: toStr(row.ds_cep),
      distritoSanitarioId: "", // Salvador-specific — resolved from bairro in app layer
    },
    tipoSanguineo: (row.no_tipo_sanguineo as TipoSanguineo) ?? undefined,
    racaCor: parseRacaCor(row.no_raca_cor),
    // Obstetric history
    gestacoes: toInt(row.ds_gestacao),
    partos: toInt(row.ds_parto),
    abortos: toInt(row.qt_aborto),
    filhosVivos: toInt(row.ds_filho_vivo),
    // Pregnancy
    dum,
    dpp: dum ? computeDPP(dum) : "",
    idadeGestacionalSemanas: dum ? computeIdadeGestacional(dum) : 0,
    riscoGestacional: row.st_alto_risco === 1 ? "alto" : "habitual",
    fatoresRisco: [], // populated from QUERY_FATORES_RISCO when needed
    // Vínculo (partially from e-SUS, rest from app DB)
    ubsId: toStr(row.ubs_cnes),
    equipeId: toStr(row.equipe_ine),
    maternidadeReferencia: "",       // app DB (step 5)
    profissionalResponsavelId: "",   // app DB (step 5)
    // Programa (app DB)
    cartaoMaeSalvador: false,
    bolsaFamilia: false,
    // Meta
    dataCadastro: "",                // app DB (step 5)
    ativa: row.st_ativo === 1,
  };
}

export async function esusGetGestantes(): Promise<Gestante[]> {
  const { rows } = await getEsusPool().query(QUERY_GESTANTES);
  return rows.map(mapGestante);
}

export async function esusGetGestanteById(
  id: string,
): Promise<Gestante | null> {
  const { rows } = await getEsusPool().query(QUERY_GESTANTE_BY_ID, [id]);
  return rows.length > 0 ? mapGestante(rows[0]) : null;
}

// ── Consultas Pré-Natal ────────────────────────────────

function mapConsulta(row: any, gestanteId: string, dum?: string): ConsultaPreNatal {
  const dataConsulta = toISODate(row.data_consulta);
  const pa = parsePressaoArterial(row.nu_medicao_pressao_arterial);
  return {
    id: String(row.co_seq_atend_prof),
    gestanteId,
    profissionalId: toStr(row.profissional_id),
    ubsId: toStr(row.ubs_id),
    data: dataConsulta,
    idadeGestacionalSemanas: dum ? computeIdadeGestacional(dum, dataConsulta) : 0,
    status: (STATUS_ATEND_PROF_MAP[row.status_code] as StatusConsulta) ?? "realizada",
    pesoKg: toFloat(row.nu_medicao_peso),
    pressaoSistolica: pa?.sistolica,
    pressaoDiastolica: pa?.diastolica,
    alturaUterinaСm: toFloat(row.nu_medicao_altura_uterina),
    bcf: toFloat(row.bcf) ? Math.round(toFloat(row.bcf)!) : undefined,
    edema: row.tp_edema != null ? (EDEMA_MAP[row.tp_edema] as ConsultaPreNatal["edema"]) : undefined,
    movimentosFetais: row.st_movimentacao_fetal === 1 ? true : undefined,
    queixas: toOptStr(row.queixas),
    conduta: toOptStr(row.conduta),
    observacoes: toOptStr(row.observacoes),
  };
}

export async function esusGetConsultasByGestante(
  gestanteId: string,
  dum?: string,
): Promise<ConsultaPreNatal[]> {
  const { rows } = await getEsusPool().query(QUERY_CONSULTAS_BY_GESTANTE, [gestanteId]);
  return rows.map((r: any) => mapConsulta(r, gestanteId, dum));
}

// ── Exames ─────────────────────────────────────────────

function mapExame(row: any, gestanteId: string, dum?: string): Exame {
  const dataSol = toISODate(row.dt_solicitacao);
  const igSemanas = dum && dataSol ? computeIdadeGestacional(dum, dataSol) : 0;
  return {
    id: String(row.co_seq_exame_requisitado),
    gestanteId,
    tipo: TIPO_EXAME_MAP[row.tp_exame] ?? "laboratorio",
    nome: toStr(row.nome_exame),
    dataSolicitacao: dataSol,
    dataResultado: toOptStr(row.dt_resultado) ? toISODate(row.dt_resultado) : undefined,
    resultado: toOptStr(row.ds_resultado),
    status: (row.status_exame as StatusExame) ?? "solicitado",
    trimestre: computeTrimestre(igSemanas),
    observacoes: toOptStr(row.ds_observacao),
  };
}

export async function esusGetExamesByGestante(
  gestanteId: string,
  dum?: string,
): Promise<Exame[]> {
  const { rows } = await getEsusPool().query(QUERY_EXAMES_BY_GESTANTE, [gestanteId]);
  return rows.map((r: any) => mapExame(r, gestanteId, dum));
}

// ── Vacinas ────────────────────────────────────────────

function mapVacina(row: any, gestanteId: string): Vacina {
  return {
    id: String(row.co_seq_registro_vacinacao),
    gestanteId,
    nome: toStr(row.nome_vacina),
    dose: toStr(row.dose),
    dataAplicacao: toOptStr(row.dt_aplicacao) ? toISODate(row.dt_aplicacao) : undefined,
    dataPrevista: toISODate(row.dt_aprazamento),
    status: (row.status_vacina as StatusVacina) ?? "pendente",
    lote: toOptStr(row.ds_lote),
  };
}

export async function esusGetVacinasByGestante(
  gestanteId: string,
): Promise<Vacina[]> {
  const { rows } = await getEsusPool().query(QUERY_VACINAS_BY_GESTANTE, [gestanteId]);
  return rows.map((r: any) => mapVacina(r, gestanteId));
}

// ── Medicações ─────────────────────────────────────────

function mapMedicacao(row: any, gestanteId: string): Medicacao {
  const nome = toStr(row.no_principio_ativo);
  const conc = toOptStr(row.ds_concentracao);
  return {
    id: String(row.co_seq_receita_medicamento),
    gestanteId,
    nome: conc ? `${nome} ${conc}` : nome,
    dosagem: toStr(row.ds_dose),
    frequencia: toStr(row.no_posologia),
    dataInicio: toISODate(row.dt_inicio_tratamento),
    dataFim: toOptStr(row.dt_fim_tratamento) ? toISODate(row.dt_fim_tratamento) : undefined,
    observacoes: toOptStr(row.ds_recomendacao),
    ativa: row.ativa === true || row.ativa === "true",
  };
}

export async function esusGetMedicacoesByGestante(
  gestanteId: string,
): Promise<Medicacao[]> {
  const { rows } = await getEsusPool().query(QUERY_MEDICACOES_BY_GESTANTE, [gestanteId]);
  return rows.map((r: any) => mapMedicacao(r, gestanteId));
}

// ── Profissional ───────────────────────────────────────

function mapProfissional(row: any): Profissional {
  return {
    id: String(row.co_seq_prof),
    nomeCompleto: toStr(row.no_profissional),
    cpf: toStr(row.nu_cpf),
    cns: toOptStr(row.nu_cns),
    conselho: toOptStr(row.nu_conselho_classe),
    cbo: toStr(row.nu_cbo),
    papel: cboPapel(row.nu_cbo),
    ubsIds: Array.isArray(row.ubs_ids)
      ? row.ubs_ids.map(String)
      : [],
  };
}

export async function esusGetProfissionalById(
  id: string,
): Promise<Profissional | null> {
  const { rows } = await getEsusPool().query(QUERY_PROFISSIONAL_BY_ID, [id]);
  return rows.length > 0 ? mapProfissional(rows[0]) : null;
}

// ── UBS ────────────────────────────────────────────────

function mapUBS(row: any): UBS {
  return {
    id: String(row.co_seq_unidade_saude),
    nome: toStr(row.no_unidade_saude),
    cnes: toStr(row.nu_cnes),
    tipo: row.tp_unidade_saude === 1 ? "USF" : "UBS",
    distritoSanitarioId: "", // Salvador-specific — resolved from bairro in app layer
    endereco: {
      logradouro: toStr(row.ds_logradouro),
      numero: toStr(row.nu_numero),
      complemento: undefined,
      bairro: toStr(row.no_bairro),
      cep: toStr(row.ds_cep),
      distritoSanitarioId: "",
    },
    telefone: toOptStr(row.nu_telefone_comercial),
    equipesSF: toInt(row.equipes_sf),
  };
}

export async function esusGetUbsList(): Promise<UBS[]> {
  const { rows } = await getEsusPool().query(QUERY_UBS_LIST);
  return rows.map(mapUBS);
}

// ── Equipes ────────────────────────────────────────────

function mapEquipe(row: any): Equipe {
  return {
    id: String(row.co_seq_equipe),
    nome: toStr(row.no_equipe),
    ubsId: toStr(row.co_unidade_saude),
    tipo: TIPO_EQUIPE_MAP[row.tp_equipe] ?? "eSF",
  };
}

export async function esusGetEquipesByUbs(
  ubsId: string,
): Promise<Equipe[]> {
  const { rows } = await getEsusPool().query(QUERY_EQUIPES_BY_UBS, [ubsId]);
  return rows.map(mapEquipe);
}

// ── Histórico de Peso ──────────────────────────────────

export async function esusGetHistoricoPeso(
  gestanteId: string,
  dum?: string,
): Promise<RegistroPeso[]> {
  const { rows } = await getEsusPool().query(QUERY_HISTORICO_PESO, [gestanteId]);
  return rows.map((r: any) => {
    const data = toISODate(r.data);
    const pesoKg = parseFloat(String(r.peso_kg)) || 0;
    const igSemanas = dum ? computeIdadeGestacional(dum, data) : 0;
    return {
      data,
      idadeGestacionalSemanas: igSemanas,
      pesoKg,
      imcAtual: parseFloat(String(r.imc)) || 0,
    };
  });
}
