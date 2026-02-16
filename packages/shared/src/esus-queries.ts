/**
 * ════════════════════════════════════════════════════════════════
 *  e-SUS AB PEC → Mãe Salvador  —  SQL Query Templates
 * ════════════════════════════════════════════════════════════════
 *
 * These queries run against the e-SUS PostgreSQL replica (read-only).
 *
 * All queries target views in the `mae_salvador` schema, which
 * encapsulate the audit-trail deduplication and lookup joins.
 * See database/migrations/001_views.sql for view definitions.
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

/** Param: $1 = co_seq_cidadao (gestante ID) */
export const QUERY_CONSULTAS_BY_GESTANTE = `
SELECT c.*
FROM mae_salvador.vw_consulta_prenatal c
JOIN mae_salvador.vw_prontuario p ON p.co_seq_prontuario = c.co_prontuario
WHERE p.co_cidadao = $1
ORDER BY c.data_consulta DESC
`;


// ════════════════════════════════════════════════════════════════
//  3. EXAMES — By gestante
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (gestante ID) */
export const QUERY_EXAMES_BY_GESTANTE = `
SELECT e.*
FROM mae_salvador.vw_exame e
JOIN mae_salvador.vw_prontuario p ON p.co_seq_prontuario = e.co_prontuario
WHERE p.co_cidadao = $1
ORDER BY e.dt_solicitacao DESC
`;


// ════════════════════════════════════════════════════════════════
//  4. VACINAS — By gestante (pregnancy vaccines only)
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (gestante ID) */
export const QUERY_VACINAS_BY_GESTANTE = `
SELECT v.*
FROM mae_salvador.vw_vacina_gestante v
JOIN mae_salvador.vw_prontuario p ON p.co_seq_prontuario = v.co_prontuario
WHERE p.co_cidadao = $1
ORDER BY COALESCE(v.dt_aplicacao, v.dt_aprazamento) DESC
`;


// ════════════════════════════════════════════════════════════════
//  5. MEDICAÇÕES — By gestante
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (gestante ID) */
export const QUERY_MEDICACOES_BY_GESTANTE = `
SELECT m.*
FROM mae_salvador.vw_medicacao m
JOIN mae_salvador.vw_atend_prof ap ON ap.co_seq_atend_prof = m.co_atend_prof
JOIN mae_salvador.vw_atend a       ON a.co_seq_atend = ap.co_atend
JOIN mae_salvador.vw_prontuario p  ON p.co_seq_prontuario = a.co_prontuario
WHERE p.co_cidadao = $1
ORDER BY m.dt_inicio_tratamento DESC
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

/** Param: $1 = co_seq_cidadao (gestante ID) */
export const QUERY_HISTORICO_PESO = `
SELECT
  m.dt_medicao            AS data,
  m.nu_medicao_peso       AS peso_kg,
  m.nu_medicao_imc        AS imc,
  m.nu_medicao_altura     AS altura
FROM mae_salvador.vw_medicao m
JOIN mae_salvador.vw_atend_prof ap ON ap.co_seq_atend_prof = m.co_atend_prof
JOIN mae_salvador.vw_atend a       ON a.co_seq_atend = ap.co_atend
JOIN mae_salvador.vw_prontuario p  ON p.co_seq_prontuario = a.co_prontuario
WHERE p.co_cidadao = $1
  AND m.nu_medicao_peso IS NOT NULL
ORDER BY m.dt_medicao ASC
`;


// ════════════════════════════════════════════════════════════════
//  10. RISK FACTORS — Active problems for a gestante
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao (gestante ID) */
export const QUERY_FATORES_RISCO = `
SELECT f.*
FROM mae_salvador.vw_fator_risco f
JOIN mae_salvador.vw_prontuario p ON p.co_seq_prontuario = f.co_prontuario
WHERE p.co_cidadao = $1
ORDER BY f.dt_inicio_problema DESC
`;
