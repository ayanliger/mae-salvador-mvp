/**
 * e-SUS data access layer — executes queries from @mae-salvador/shared
 * against the read-only esusPool and maps raw rows to domain types.
 *
 * Each function mirrors the signature in data.ts so they can be
 * swapped in one at a time during step 7 (progressive mock replacement).
 */

import { getEsusPool } from "./db";
import { appGetProgramaGestante, type ProgramaGestanteRow } from "./app-data";

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
  QUERY_GESTANTE_BY_ID,
  QUERY_CONSULTAS_BY_GESTANTE,
  QUERY_EXAMES_BY_GESTANTE,
  QUERY_VACINAS_BY_GESTANTE,
  QUERY_MEDICACOES_BY_GESTANTE,
  QUERY_PROFISSIONAL_BY_ID,
  QUERY_UBS_LIST,
  QUERY_EQUIPES_BY_UBS,
  QUERY_HISTORICO_PESO,
  QUERY_FATORES_RISCO,
  QUERY_ULTIMA_CONSULTA_POR_GESTANTE,
  QUERY_CASOS_SIFILIS,
  QUERY_INDICADORES_SNAPSHOT,
} from "@mae-salvador/shared";

/**
 * SQL condition that identifies clinically significant high-risk
 * pregnancy conditions from CID-10 and CIAP-2 codes.
 *
 * Based on Ministério da Saúde "Manual de Gestação de Alto Risco" (2022)
 * and Cadernos de Atenção Básica nº 32.
 *
 * Requires table alias `fr` referencing mae_salvador.vw_fator_risco.
 */
const SQL_ALTO_RISCO_CONDITION = `(
  -- CID-10 O-chapter: obstetric complications
  fr.co_cid10 SIMILAR TO 'O1[0-6]%'     -- Hypertensive disorders (pre-eclampsia, eclampsia)
  OR fr.co_cid10 LIKE 'O09%'            -- Supervision of high-risk pregnancy
  OR fr.co_cid10 LIKE 'O24%'            -- Diabetes mellitus in pregnancy
  OR fr.co_cid10 LIKE 'O30%'            -- Multiple gestation
  OR fr.co_cid10 SIMILAR TO 'O3[56]%'   -- Fetal problems, isoimmunization
  OR fr.co_cid10 SIMILAR TO 'O4[456]%'  -- Placenta previa, abruption, hemorrhage
  OR fr.co_cid10 LIKE 'O98%'            -- Maternal infectious diseases (HIV, syphilis)
  OR fr.co_cid10 LIKE 'O99%'            -- Other maternal diseases complicating pregnancy
  -- CID-10: pre-existing chronic conditions
  OR fr.co_cid10 SIMILAR TO 'I1[0-5]%'  -- Chronic hypertension
  OR fr.co_cid10 SIMILAR TO 'E1[0-4]%'  -- Diabetes mellitus
  OR fr.co_cid10 LIKE 'D57%'            -- Sickle cell disorders
  OR fr.co_cid10 SIMILAR TO 'B2[0-4]%'  -- HIV disease
  OR fr.co_cid10 SIMILAR TO 'A5[0-3]%'  -- Syphilis
  OR fr.co_cid10 SIMILAR TO 'F1[0-9]%'  -- Substance use disorders
  OR fr.co_cid10 LIKE 'E66%'            -- Obesity
  OR fr.co_cid10 LIKE 'N18%'            -- Chronic kidney disease
  OR fr.co_cid10 LIKE 'G40%'            -- Epilepsy
  OR fr.co_cid10 SIMILAR TO 'I0[5-9]%'  -- Valvular / rheumatic heart disease
  OR fr.co_cid10 LIKE 'I42%'            -- Cardiomyopathy
  OR fr.co_cid10 LIKE 'M32%'            -- Systemic lupus erythematosus
  OR fr.co_cid10 SIMILAR TO 'E0[0-7]%'  -- Thyroid disorders
  OR fr.co_cid10 LIKE 'D68%'            -- Thrombophilia / coagulation defects
  -- CIAP-2 high-risk codes
  OR fr.co_ciap IN ('W81','W84','W85')   -- Toxemia, high-risk pregnancy, gest. diabetes
  OR fr.co_ciap IN ('K86','K87')         -- Hypertension
  OR fr.co_ciap IN ('T89','T90')         -- Diabetes
  OR fr.co_ciap IN ('X70','B90')         -- Syphilis, HIV
  OR fr.co_ciap SIMILAR TO 'P1[5-9]'    -- Substance abuse
)`;

/**
 * Lean list query — computes risk from CID-10/CIAP codes rather
 * than the expensive vw_gestante st_alto_risco subquery.
 */
const QUERY_GESTANTES_LIST = `
SELECT
  fcp.co_seq_fat_cidadao_pec        AS co_seq_cidadao,
  COALESCE(fcp.no_cidadao, ci.no_nome) AS no_cidadao,
  COALESCE(fcp.nu_cpf_cidadao, ci.nu_cpf_cidadao) AS nu_cpf,
  fcp.nu_cns,
  t_nasc.dt_registro                AS dt_nascimento,
  COALESCE(fcp.nu_telefone_celular, ci.nu_celular) AS nu_telefone_celular,
  'ativa'::text                     AS situacao,
  COALESCE(g.dt_fai_dum, g.dt_inicio_gestacao) AS dt_ultima_menstruacao,
  CASE WHEN EXISTS (
    SELECT 1 FROM mae_salvador.vw_fator_risco fr
    WHERE fr.co_fat_cidadao_pec = fcp.co_seq_fat_cidadao_pec
    AND ${SQL_ALTO_RISCO_CONDITION}
  ) THEN 1 ELSE 0 END                AS st_alto_risco,
  eq.nu_ine                         AS equipe_ine,
  us.nu_cnes                        AS ubs_cnes,
  rc.ds_raca_cor                    AS no_raca_cor,
  '0' AS ds_gestacao, '0' AS ds_parto, '0' AS qt_aborto, '0' AS ds_filho_vivo
FROM public.tb_fat_cidadao_pec fcp
-- Only active pregnancies (puerperio still in the future)
JOIN LATERAL (
  SELECT g2.*
  FROM public.tb_fat_rel_op_gestante g2
  WHERE g2.co_fat_cidadao_pec = fcp.co_seq_fat_cidadao_pec
    AND g2.dt_inicio_puerperio > CURRENT_DATE
  ORDER BY g2.dt_inicio_puerperio DESC
  LIMIT 1
) g ON true
LEFT JOIN public.tb_dim_tempo t_nasc
  ON t_nasc.co_seq_dim_tempo = fcp.co_dim_tempo_nascimento
LEFT JOIN public.tb_dim_unidade_saude us
  ON us.co_seq_dim_unidade_saude = fcp.co_dim_unidade_saude_vinc
LEFT JOIN public.tb_dim_equipe eq
  ON eq.co_seq_dim_equipe = fcp.co_dim_equipe_vinc
LEFT JOIN LATERAL (
  SELECT ci2.no_nome, ci2.nu_cpf_cidadao, ci2.nu_celular, ci2.co_dim_raca_cor
  FROM public.tb_fat_cad_individual ci2
  WHERE ci2.co_fat_cidadao_pec = fcp.co_seq_fat_cidadao_pec
    AND ci2.st_ficha_inativa = 0
  ORDER BY ci2.co_dim_tempo DESC
  LIMIT 1
) ci ON true
LEFT JOIN public.tb_dim_raca_cor rc
  ON rc.co_seq_dim_raca_cor = ci.co_dim_raca_cor
WHERE COALESCE(fcp.st_faleceu, 0) = 0
ORDER BY COALESCE(fcp.no_cidadao, ci.no_nome)
`;

import {
  computeIdadeGestacional,
  computeDPP,
  computeTrimestre,
  STATUS_ATEND_PROF_MAP,
  EDEMA_MAP,
  TIPO_EXAME_MAP,
} from "@mae-salvador/shared";

import type { CasoSifilis, ClassificacaoSifilis } from "@mae-salvador/shared";

// ── In-memory TTL cache ────────────────────────────────

const _cache = new Map<string, { data: unknown; expiresAt: number }>();

/** Return cached value if fresh, otherwise call `fn`, cache & return. */
async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const hit = _cache.get(key);
  if (hit && Date.now() < hit.expiresAt) return hit.data as T;
  const data = await fn();
  _cache.set(key, { data, expiresAt: Date.now() + ttlMs });
  return data;
}

const FIVE_MIN = 5 * 60 * 1000;

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

/** Return a valid 11-digit CPF string, or "" for junk values like 0. */
function parseCpf(v: unknown): string {
  const digits = String(v ?? "").replace(/\D/g, "");
  if (digits.length !== 11 || /^0+$/.test(digits)) return "";
  return digits;
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

function mapGestante(row: any, programa?: ProgramaGestanteRow | null): Gestante {
  const dum = toISODate(row.dt_ultima_menstruacao);
  return {
    id: String(row.co_seq_cidadao),
    nomeCompleto: toStr(row.no_cidadao),
    cpf: parseCpf(row.nu_cpf),
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
      distritoSanitarioId: "",
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
    fatoresRisco: [],
    // Vínculo (e-SUS + app DB enrichment)
    ubsId: toStr(row.ubs_cnes),
    equipeId: toStr(row.equipe_ine),
    maternidadeReferencia: programa?.maternidade_referencia ?? "",
    profissionalResponsavelId: programa?.profissional_responsavel_id
      ? String(programa.profissional_responsavel_id)
      : "",
    // Programa (app DB)
    cartaoMaeSalvador: programa?.cartao_mae_salvador ?? false,
    bolsaFamilia: programa?.bolsa_familia ?? false,
    // Meta
    dataCadastro: programa?.data_cadastro
      ? toISODate(programa.data_cadastro)
      : "",
    ativa: row.situacao === 'ativa',
  };
}

export function esusGetGestantes(): Promise<Gestante[]> {
  return cached("gestantes-list", FIVE_MIN, async () => {
    const { rows } = await getEsusPool().query(QUERY_GESTANTES_LIST);
    return rows.map((r: any) => mapGestante(r));
  });
}

export async function esusGetGestanteById(
  id: string,
): Promise<Gestante | null> {
  const { rows } = await getEsusPool().query(QUERY_GESTANTE_BY_ID, [id]);
  if (rows.length === 0) return null;
  let programa: ProgramaGestanteRow | null = null;
  try {
    programa = await appGetProgramaGestante(id);
  } catch {
    // APP_DATABASE_URL not configured — skip enrichment
  }
  return mapGestante(rows[0], programa);
}

// ── Consultas Pré-Natal ────────────────────────────────

/** Strip HTML tags and decode common entities from PEC SOAP rich-text. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Consulta query with professional name resolved via DW dimension join. */
const QUERY_CONSULTAS_WITH_PROF = `
SELECT cp.*, prof.no_profissional
FROM mae_salvador.vw_consulta_prenatal cp
LEFT JOIN public.tb_dim_profissional prof
  ON prof.co_seq_dim_profissional = cp.profissional_id
WHERE cp.co_fat_cidadao_pec = $1
  AND cp.data_consulta >= $2::date
ORDER BY cp.data_consulta DESC
`;

function mapConsulta(row: any, gestanteId: string, dum?: string): ConsultaPreNatal {
  const dataConsulta = toISODate(row.data_consulta);
  return {
    id: String(row.co_seq_atend_prof),
    gestanteId,
    profissionalId: toStr(row.no_profissional) || toStr(row.profissional_id),
    ubsId: toStr(row.ubs_id),
    data: dataConsulta,
    idadeGestacionalSemanas: dum ? computeIdadeGestacional(dum, dataConsulta) : 0,
    status: (STATUS_ATEND_PROF_MAP[row.status_code] as StatusConsulta) ?? "realizada",
    pesoKg: toFloat(row.nu_medicao_peso),
    // DW provides separate numeric columns for BP (not combined "120/80" string)
    pressaoSistolica: toFloat(row.nu_pressao_sistolica),
    pressaoDiastolica: toFloat(row.nu_pressao_diastolica),
    alturaUterinaСm: toFloat(row.nu_medicao_altura_uterina),
    bcf: toFloat(row.bcf) ? Math.round(toFloat(row.bcf)!) : undefined,
    edema: row.tp_edema != null ? (EDEMA_MAP[row.tp_edema] as ConsultaPreNatal["edema"]) : undefined,
    movimentosFetais: row.st_movimentacao_fetal === 1 ? true : undefined,
    queixas: toOptStr(row.queixas) ? stripHtml(String(row.queixas)) : undefined,
    conduta: toOptStr(row.conduta) ? stripHtml(String(row.conduta)) : undefined,
    observacoes: toOptStr(row.observacoes) ? stripHtml(String(row.observacoes)) : undefined,
  };
}

export async function esusGetConsultasByGestante(
  gestanteId: string,
  dum?: string,
): Promise<ConsultaPreNatal[]> {
  const dumParam = dum || "1900-01-01";
  const { rows } = await getEsusPool().query(QUERY_CONSULTAS_WITH_PROF, [gestanteId, dumParam]);
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

export function esusGetUbsList(): Promise<UBS[]> {
  return cached("ubs-list", FIVE_MIN, async () => {
    const { rows } = await getEsusPool().query(QUERY_UBS_LIST);
    return rows.map(mapUBS);
  });
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

// ── Fatores de Risco ───────────────────────────────────────

/**
 * Returns only clinically significant risk factors (matching the same
 * CID-10/CIAP-2 criteria used for the alto-risco classification).
 */
export async function esusGetFatoresRisco(
  gestanteId: string,
): Promise<string[]> {
  const { rows } = await getEsusPool().query(
    `SELECT * FROM mae_salvador.vw_fator_risco fr
     WHERE fr.co_fat_cidadao_pec = $1
     AND ${SQL_ALTO_RISCO_CONDITION}
     ORDER BY dt_inicio_problema DESC`,
    [gestanteId],
  );
  return rows
    .map((r: any) => toStr(r.descricao_problema))
    .filter((s: string) => s.length > 0);
}

// ── Última Consulta por Gestante (aggregate) ───────────────

export interface UltimaConsultaMap {
  [gestanteId: string]: { ultimaConsulta: string; totalConsultas: number };
}

// Lean aggregate query — goes directly to DW table, skipping the
// complex vw_consulta_prenatal SOAP bridge for much better performance.
// Joins with vw_gestante to filter encounters to the current pregnancy only.
const QUERY_ULTIMA_CONSULTA_LEAN = `
SELECT
  enc.co_fat_cidadao_pec,
  MAX(dt.dt_registro) AS ultima_consulta,
  COUNT(*)            AS total_consultas
FROM public.tb_fat_atendimento_individual enc
JOIN public.tb_dim_tempo dt ON dt.co_seq_dim_tempo = enc.co_dim_tempo
JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = enc.co_fat_cidadao_pec
WHERE enc.nu_idade_gestacional_semanas > 0
  AND dt.dt_registro >= g.dt_ultima_menstruacao
GROUP BY enc.co_fat_cidadao_pec
`;

export function esusGetUltimaConsultaPorGestante(): Promise<UltimaConsultaMap> {
  return cached("ultima-consulta-map", FIVE_MIN, async () => {
    const { rows } = await getEsusPool().query(QUERY_ULTIMA_CONSULTA_LEAN);
    const map: UltimaConsultaMap = {};
    for (const r of rows) {
      map[String(r.co_fat_cidadao_pec)] = {
        ultimaConsulta: toISODate(r.ultima_consulta),
        totalConsultas: toInt(r.total_consultas),
      };
    }
    return map;
  });
}

// ── Casos de Sífilis ───────────────────────────────────────

export function esusGetCasosSifilis(): Promise<CasoSifilis[]> {
  return cached("casos-sifilis", FIVE_MIN, async () => {
  const { rows } = await getEsusPool().query(QUERY_CASOS_SIFILIS);
  // De-duplicate by gestante (keep first / most specific diagnosis)
  const seen = new Set<string>();
  const result: CasoSifilis[] = [];
  for (const r of rows) {
    const gid = String(r.gestante_id);
    if (seen.has(gid)) continue;
    seen.add(gid);
    const dum = toISODate(r.dum);
    const dataDeteccao = toISODate(r.data_deteccao);
    const igDeteccao = dum && dataDeteccao
      ? computeIdadeGestacional(dum, dataDeteccao)
      : 0;
    result.push({
      id: `sif-${gid}`,
      gestanteId: gid,
      classificacao: (r.classificacao as ClassificacaoSifilis) ?? "indeterminada",
      dataDeteccao: dataDeteccao || "",
      idadeGestacionalDeteccao: igDeteccao,
      // Treatment data not available in DW
      tratamentoIniciado: false,
      tratamentoConcluido: false,
      parceiroTratado: false,
    });
  }
  return result;
  });
}

// ── Indicadores Snapshot

export interface IndicadoresSnapshot {
  totalGestantes: number;
  com6Consultas: number;
  com7Consultas: number;
  inicioPrecoce: number;
  coberturaDtpa: number;
  coberturaInfluenza: number;
  gestantesComConsulta: number;
}

// Lean indicadores query — avoids vw_gestante (expensive st_alto_risco)
const QUERY_INDICADORES_LEAN = `
WITH gestantes AS (
  SELECT DISTINCT ON (fcp.co_seq_fat_cidadao_pec)
    fcp.co_seq_fat_cidadao_pec AS co_seq_cidadao,
    COALESCE(g.dt_fai_dum, g.dt_inicio_gestacao) AS dum
  FROM public.tb_fat_rel_op_gestante g
  JOIN public.tb_fat_cidadao_pec fcp
    ON fcp.co_seq_fat_cidadao_pec = g.co_fat_cidadao_pec
  WHERE COALESCE(fcp.st_faleceu, 0) = 0
    AND g.dt_inicio_puerperio > CURRENT_DATE
  ORDER BY fcp.co_seq_fat_cidadao_pec,
    g.dt_inicio_puerperio DESC
),
consultas_por_gestante AS (
  SELECT
    enc.co_fat_cidadao_pec,
    COUNT(*) AS total_consultas,
    MIN(dt.dt_registro) AS primeira_consulta
  FROM public.tb_fat_atendimento_individual enc
  JOIN public.tb_dim_tempo dt ON dt.co_seq_dim_tempo = enc.co_dim_tempo
  JOIN gestantes g ON g.co_seq_cidadao = enc.co_fat_cidadao_pec
  WHERE enc.nu_idade_gestacional_semanas > 0
    AND dt.dt_registro >= g.dum
  GROUP BY enc.co_fat_cidadao_pec
),
vac_counts AS (
  SELECT
    v.co_fat_cidadao_pec,
    bool_or(LOWER(imuno.no_imunobiologico) LIKE '%dtpa%'
         OR LOWER(imuno.no_imunobiologico) LIKE '%difteria%tetano%pertussis%') AS has_dtpa,
    bool_or(LOWER(imuno.no_imunobiologico) LIKE '%influenza%') AS has_influenza
  FROM public.tb_fat_vacinacao_vacina vv
  JOIN public.tb_fat_vacinacao v ON v.co_seq_fat_vacinacao = vv.co_fat_vacinacao
  JOIN gestantes g ON g.co_seq_cidadao = v.co_fat_cidadao_pec
  LEFT JOIN public.tb_dim_imunobiologico imuno
    ON imuno.co_seq_dim_imunobiologico = vv.co_dim_imunobiologico
  LEFT JOIN public.tb_dim_tempo t_apl
    ON t_apl.co_seq_dim_tempo = vv.co_dim_tempo_vacina_aplicada
  WHERE t_apl.dt_registro IS NOT NULL
  GROUP BY v.co_fat_cidadao_pec
)
SELECT
  (SELECT COUNT(*) FROM gestantes) AS total_gestantes,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante WHERE total_consultas >= 6), 0) AS com_6_consultas,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante WHERE total_consultas >= 7), 0) AS com_7_consultas,
  COALESCE((
    SELECT COUNT(*) FROM consultas_por_gestante cpg
    JOIN gestantes g ON g.co_seq_cidadao = cpg.co_fat_cidadao_pec
    WHERE g.dum IS NOT NULL
      AND (cpg.primeira_consulta - g.dum::date) <= 84
  ), 0) AS inicio_precoce,
  COALESCE((SELECT COUNT(*) FROM vac_counts WHERE has_dtpa), 0) AS cobertura_dtpa,
  COALESCE((SELECT COUNT(*) FROM vac_counts WHERE has_influenza), 0) AS cobertura_influenza,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante), 0) AS gestantes_com_consulta
`;

export function esusGetIndicadoresSnapshot(): Promise<IndicadoresSnapshot> {
  return cached("indicadores-snapshot", FIVE_MIN, async () => {
    const { rows } = await getEsusPool().query(QUERY_INDICADORES_LEAN);
    const r = rows[0] ?? {};
    return {
      totalGestantes: toInt(r.total_gestantes),
      com6Consultas: toInt(r.com_6_consultas),
      com7Consultas: toInt(r.com_7_consultas),
      inicioPrecoce: toInt(r.inicio_precoce),
      coberturaDtpa: toInt(r.cobertura_dtpa),
      coberturaInfluenza: toInt(r.cobertura_influenza),
      gestantesComConsulta: toInt(r.gestantes_com_consulta),
    };
  });
}
