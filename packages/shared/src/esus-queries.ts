/**
 * ════════════════════════════════════════════════════════════════
 *  e-SUS DW → Mãe Salvador  —  SQL Query Templates
 * ════════════════════════════════════════════════════════════════
 *
 * These queries run against the e-SUS PostgreSQL replica (read-only).
 *
 * Domain views in `mae_salvador` schema source from the DW star
 * schema (tb_fat_* + tb_dim_*). Org views (prof, UBS, equipe)
 * remain PEC-based. See database/migrations/001_views.sql.
 */


// ════════════════════════════════════════════════════════════════
//  1. GESTANTE — List all active pregnant women
// ════════════════════════════════════════════════════════════════

export const QUERY_GESTANTES = `
SELECT * FROM mae_salvador.vw_gestante_ativa
ORDER BY no_cidadao
`;


// ════════════════════════════════════════════════════════════════
//  1b. GESTANTE BY ID — Single gestante with full data
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao */
export const QUERY_GESTANTE_BY_ID = `
SELECT * FROM mae_salvador.vw_gestante_ativa
WHERE co_seq_cidadao = $1
LIMIT 1
`;


// ════════════════════════════════════════════════════════════════
//  2. CONSULTAS PRÉ-NATAL — By gestante
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (DW co_fat_cidadao_pec) */
export const QUERY_CONSULTAS_BY_GESTANTE = `
SELECT *
FROM mae_salvador.vw_consulta_prenatal
WHERE co_fat_cidadao_pec = $1
ORDER BY data_consulta DESC
`;


// ════════════════════════════════════════════════════════════════
//  3. EXAMES — By gestante
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (DW co_fat_cidadao_pec) */
export const QUERY_EXAMES_BY_GESTANTE = `
SELECT *
FROM mae_salvador.vw_exame
WHERE co_fat_cidadao_pec = $1
ORDER BY dt_solicitacao DESC
`;


// ════════════════════════════════════════════════════════════════
//  4. VACINAS — By gestante (pregnancy vaccines only)
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (DW co_fat_cidadao_pec) */
export const QUERY_VACINAS_BY_GESTANTE = `
SELECT *
FROM mae_salvador.vw_vacina_gestante
WHERE co_fat_cidadao_pec = $1
ORDER BY dt_aplicacao DESC NULLS LAST
`;


// ════════════════════════════════════════════════════════════════
//  5. MEDICAÇÕES — By gestante
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (DW co_fat_cidadao_pec) */
export const QUERY_MEDICACOES_BY_GESTANTE = `
SELECT *
FROM mae_salvador.vw_medicacao
WHERE co_fat_cidadao_pec = $1
ORDER BY dt_inicio_tratamento DESC
`;


// ════════════════════════════════════════════════════════════════
//  6. PROFISSIONAL — By ID
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_prof */
export const QUERY_PROFISSIONAL_BY_ID = `
SELECT * FROM mae_salvador.vw_profissional
WHERE co_seq_prof = $1
`;


// ════════════════════════════════════════════════════════════════
//  7. UBS — List all active health units
// ════════════════════════════════════════════════════════════════

export const QUERY_UBS_LIST = `
SELECT * FROM mae_salvador.vw_ubs
ORDER BY no_unidade_saude
`;


// ════════════════════════════════════════════════════════════════
//  8. EQUIPES — By UBS
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_unidade_saude (UBS ID) */
export const QUERY_EQUIPES_BY_UBS = `
SELECT * FROM mae_salvador.vw_equipe
WHERE co_unidade_saude = $1
`;


// ════════════════════════════════════════════════════════════════
//  9. PESO HISTORY — For weight gain chart
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (DW co_fat_cidadao_pec) */
export const QUERY_HISTORICO_PESO = `
SELECT
  enc.dt_inicial_atendimento::date AS data,
  enc.nu_peso                      AS peso_kg,
  NULL::numeric                    AS imc,
  enc.nu_altura                    AS altura
FROM public.tb_fat_atendimento_individual enc
WHERE enc.co_fat_cidadao_pec = $1
  AND enc.nu_peso IS NOT NULL
ORDER BY enc.dt_inicial_atendimento ASC
`;


// ════════════════════════════════════════════════════════════════
//  10. RISK FACTORS — Active problems for a gestante
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (DW co_fat_cidadao_pec) */
export const QUERY_FATORES_RISCO = `
SELECT *
FROM mae_salvador.vw_fator_risco
WHERE co_fat_cidadao_pec = $1
ORDER BY dt_inicio_problema DESC
`;
