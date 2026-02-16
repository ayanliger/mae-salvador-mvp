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
SELECT * FROM mae_salvador.vw_gestante
ORDER BY no_cidadao
`;


// ════════════════════════════════════════════════════════════════
//  1b. GESTANTE BY ID — Single gestante with full data
// ════════════════════════════════════════════════════════════════

/** Param: $1 = co_seq_cidadao */
export const QUERY_GESTANTE_BY_ID = `
SELECT * FROM mae_salvador.vw_gestante
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


// ════════════════════════════════════════════════════════════════
//  11. ÚLTIMA CONSULTA POR GESTANTE — aggregate for painel list
// ════════════════════════════════════════════════════════════════

export const QUERY_ULTIMA_CONSULTA_POR_GESTANTE = `
SELECT
  co_fat_cidadao_pec,
  MAX(data_consulta) AS ultima_consulta,
  COUNT(*)           AS total_consultas
FROM mae_salvador.vw_consulta_prenatal
GROUP BY co_fat_cidadao_pec
`;


// ════════════════════════════════════════════════════════════════
//  12. SÍFILIS — gestantes with syphilis diagnosis
// ════════════════════════════════════════════════════════════════

export const QUERY_CASOS_SIFILIS = `
SELECT
  fr.co_fat_cidadao_pec           AS gestante_id,
  fr.descricao_problema,
  fr.co_ciap,
  fr.co_cid10,
  fr.dt_inicio_problema           AS data_deteccao,
  g.dt_ultima_menstruacao          AS dum,
  CASE
    WHEN fr.co_cid10 LIKE 'A51%' THEN 'recente'
    WHEN fr.co_cid10 LIKE 'A52%' THEN 'tardia'
    WHEN fr.co_cid10 = 'O981'    THEN 'recente'
    WHEN fr.co_ciap = 'X70'      THEN 'recente'
    ELSE 'indeterminada'
  END                              AS classificacao
FROM mae_salvador.vw_fator_risco fr
JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = fr.co_fat_cidadao_pec
WHERE fr.co_cid10 LIKE 'A5%'
   OR fr.co_ciap = 'X70'
   OR fr.co_cid10 = 'O981'
ORDER BY fr.dt_inicio_problema DESC NULLS LAST
`;


// ════════════════════════════════════════════════════════════════
//  13. INDICADORES SNAPSHOT — current aggregate metrics
// ════════════════════════════════════════════════════════════════

/** Returns a single row with all computed indicator values */
export const QUERY_INDICADORES_SNAPSHOT = `
WITH gestantes AS (
  SELECT co_seq_cidadao, dt_ultima_menstruacao AS dum
  FROM mae_salvador.vw_gestante
),
consultas_por_gestante AS (
  SELECT
    cp.co_fat_cidadao_pec,
    COUNT(*)                         AS total_consultas,
    MIN(cp.data_consulta)            AS primeira_consulta
  FROM mae_salvador.vw_consulta_prenatal cp
  JOIN gestantes g ON g.co_seq_cidadao = cp.co_fat_cidadao_pec
  GROUP BY cp.co_fat_cidadao_pec
),
vac_counts AS (
  SELECT
    v.co_fat_cidadao_pec,
    bool_or(LOWER(i.nome_vacina) LIKE '%dtpa%' OR LOWER(i.nome_vacina) LIKE '%difteria%tetano%pertussis%') AS has_dtpa,
    bool_or(LOWER(i.nome_vacina) LIKE '%influenza%')  AS has_influenza
  FROM mae_salvador.vw_vacina_gestante v
  JOIN gestantes g ON g.co_seq_cidadao = v.co_fat_cidadao_pec
  LEFT JOIN LATERAL (
    SELECT v.nome_vacina
  ) i ON true
  WHERE v.status_vacina = 'aplicada'
  GROUP BY v.co_fat_cidadao_pec
)
SELECT
  (SELECT COUNT(*) FROM gestantes)                                          AS total_gestantes,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante WHERE total_consultas >= 6), 0) AS com_6_consultas,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante WHERE total_consultas >= 7), 0) AS com_7_consultas,
  COALESCE((
    SELECT COUNT(*) FROM consultas_por_gestante cpg
    JOIN gestantes g ON g.co_seq_cidadao = cpg.co_fat_cidadao_pec
    WHERE g.dum IS NOT NULL
      AND (cpg.primeira_consulta - g.dum::date) <= 84  -- 12 weeks = 84 days
  ), 0)                                                                     AS inicio_precoce,
  COALESCE((SELECT COUNT(*) FROM vac_counts WHERE has_dtpa), 0)             AS cobertura_dtpa,
  COALESCE((SELECT COUNT(*) FROM vac_counts WHERE has_influenza), 0)        AS cobertura_influenza,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante), 0)                AS gestantes_com_consulta
`;
