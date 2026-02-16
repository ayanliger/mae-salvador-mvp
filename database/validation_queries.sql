-- ════════════════════════════════════════════════════════════════
--  Mãe Salvador — Validation Queries
--  Run against the e-SUS PostgreSQL replica (read-only).
--  Purpose: verify that data displayed on the frontend matches the DB.
-- ════════════════════════════════════════════════════════════════
--
--  Frontend Screens:
--    /painel        → Patient list (gestante table + last consultation)
--    /gestante/:id  → Detail view (5 tabs: dados, consultas, exames, vacinas, medicações)
--    /gestor        → KPI dashboard (indicators, syphilis)
--
--  All queries use the mae_salvador.* views from 001_views.sql.
--  Replace <GESTANTE_ID> with a real co_seq_cidadao when testing
--  a specific patient.


-- ════════════════════════════════════════════════════════════════
--  SECTION 1: PAINEL — Patient List (/painel)
-- ════════════════════════════════════════════════════════════════

-- 1a. Total gestantes count (should match the row count on the Painel table)
SELECT COUNT(*) AS total_gestantes
FROM mae_salvador.vw_gestante;


-- 1b. Gestante list with UBS name (matches table columns: nome, CPF, UBS, situação)
SELECT
  g.co_seq_cidadao           AS id,
  g.no_cidadao               AS nome,
  g.nu_cpf                   AS cpf,
  g.nu_cns                   AS cns,
  g.dt_ultima_menstruacao    AS dum,
  g.situacao,
  u.no_unidade_saude         AS ubs_nome,
  g.ubs_cnes
FROM mae_salvador.vw_gestante g
LEFT JOIN mae_salvador.vw_ubs u ON u.nu_cnes = g.ubs_cnes
ORDER BY g.no_cidadao;


-- 1c. Last consultation date + total consultations per gestante
--     (shown as columns "Última Consulta" and "Consultas" on painel)
SELECT
  cp.co_fat_cidadao_pec      AS gestante_id,
  g.no_cidadao               AS nome,
  MAX(cp.data_consulta)      AS ultima_consulta,
  COUNT(*)                   AS total_consultas
FROM mae_salvador.vw_consulta_prenatal cp
JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = cp.co_fat_cidadao_pec
GROUP BY cp.co_fat_cidadao_pec, g.no_cidadao
ORDER BY g.no_cidadao;


-- 1d. Gestantes without any consultations (should show "—" on painel)
SELECT
  g.co_seq_cidadao           AS id,
  g.no_cidadao               AS nome
FROM mae_salvador.vw_gestante g
LEFT JOIN mae_salvador.vw_consulta_prenatal cp
  ON cp.co_fat_cidadao_pec = g.co_seq_cidadao
WHERE cp.co_seq_atend_prof IS NULL
ORDER BY g.no_cidadao;


-- 1e. Gestantes breakdown by UBS (useful for painel UBS filter validation)
SELECT
  u.no_unidade_saude         AS ubs_nome,
  u.nu_cnes,
  COUNT(g.co_seq_cidadao)    AS total_gestantes
FROM mae_salvador.vw_gestante g
LEFT JOIN mae_salvador.vw_ubs u ON u.nu_cnes = g.ubs_cnes
GROUP BY u.no_unidade_saude, u.nu_cnes
ORDER BY total_gestantes DESC;


-- ════════════════════════════════════════════════════════════════
--  SECTION 2: GESTANTE DETAIL — Demographics Tab (/gestante/:id)
-- ════════════════════════════════════════════════════════════════

-- 2a. Full patient record (all columns shown on the "Dados" tab)
--     Replace <GESTANTE_ID> with a real co_seq_cidadao
SELECT
  co_seq_cidadao             AS id,
  no_cidadao                 AS nome,
  nu_cpf                     AS cpf,
  nu_cns                     AS cns,
  dt_nascimento,
  nu_telefone_celular        AS telefone,
  ds_email                   AS email,
  no_raca_cor                AS raca_cor,
  no_tipo_sanguineo          AS tipo_sanguineo,
  ds_logradouro              AS logradouro,
  nu_numero                  AS numero,
  ds_complemento             AS complemento,
  no_bairro                  AS bairro,
  ds_cep                     AS cep,
  -- Pregnancy data
  dt_ultima_menstruacao      AS dum,
  situacao,
  -- Obstetric history
  ds_gestacao                AS gestacoes_anteriores,
  ds_parto                   AS partos_anteriores,
  qt_aborto                  AS abortos,
  ds_filho_vivo              AS filhos_vivos,
  -- Vínculo
  equipe_ine,
  ubs_cnes
FROM mae_salvador.vw_gestante
WHERE co_seq_cidadao = '<GESTANTE_ID>';


-- 2b. Risk factors for a patient (shown on detail header/badge)
SELECT
  descricao_problema,
  co_ciap,
  co_cid10,
  dt_inicio_problema,
  dt_fim_problema
FROM mae_salvador.vw_fator_risco
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>'
ORDER BY dt_inicio_problema DESC;


-- ════════════════════════════════════════════════════════════════
--  SECTION 3: GESTANTE DETAIL — Consultas Tab
-- ════════════════════════════════════════════════════════════════

-- 3a. All prenatal consultations for a patient (table on Consultas tab)
SELECT
  co_seq_atend_prof          AS id,
  data_consulta,
  nu_idade_gestacional_semanas AS ig_semanas,
  nu_medicao_peso            AS peso_kg,
  nu_pressao_sistolica       AS pa_sistolica,
  nu_pressao_diastolica      AS pa_diastolica,
  nu_medicao_altura_uterina  AS altura_uterina_cm,
  bcf,
  tp_edema                   AS edema,
  st_movimentacao_fetal      AS mov_fetal,
  profissional_id,
  ubs_id,
  -- SOAP notes
  queixas,
  conduta,
  observacoes
FROM mae_salvador.vw_consulta_prenatal
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>'
ORDER BY data_consulta DESC;


-- 3b. Consultation count cross-check
SELECT COUNT(*) AS total_consultas
FROM mae_salvador.vw_consulta_prenatal
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>';


-- ════════════════════════════════════════════════════════════════
--  SECTION 4: GESTANTE DETAIL — Exames Tab
-- ════════════════════════════════════════════════════════════════

-- 4a. All exams for a patient
SELECT
  co_seq_exame_requisitado   AS id,
  nome_exame,
  dt_solicitacao,
  dt_realizacao,
  dt_resultado,
  ds_resultado               AS resultado,
  status_exame,
  ds_observacao
FROM mae_salvador.vw_exame
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>'
ORDER BY dt_solicitacao DESC;


-- 4b. Exam count and status breakdown
SELECT
  status_exame,
  COUNT(*) AS quantidade
FROM mae_salvador.vw_exame
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>'
GROUP BY status_exame;


-- ════════════════════════════════════════════════════════════════
--  SECTION 5: GESTANTE DETAIL — Vacinas Tab
-- ════════════════════════════════════════════════════════════════

-- 5a. All vaccinations for a patient
SELECT
  co_seq_registro_vacinacao  AS id,
  nome_vacina,
  dose,
  dt_aplicacao,
  dt_aprazamento,
  ds_lote                    AS lote,
  status_vacina
FROM mae_salvador.vw_vacina_gestante
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>'
ORDER BY dt_aplicacao DESC NULLS LAST;


-- 5b. Vaccine count and status breakdown
SELECT
  status_vacina,
  COUNT(*) AS quantidade
FROM mae_salvador.vw_vacina_gestante
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>'
GROUP BY status_vacina;


-- ════════════════════════════════════════════════════════════════
--  SECTION 6: GESTANTE DETAIL — Medicações Tab
-- ════════════════════════════════════════════════════════════════

-- 6a. All medications for a patient
SELECT
  co_seq_receita_medicamento AS id,
  no_principio_ativo         AS medicamento,
  ds_concentracao            AS concentracao,
  ds_dose                    AS dose,
  ds_dose_frequencia         AS posologia,
  dt_inicio_tratamento,
  dt_fim_tratamento,
  st_uso_continuo            AS uso_continuo,
  st_interrompido            AS interrompido
FROM mae_salvador.vw_medicacao
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>'
ORDER BY dt_inicio_tratamento DESC;


-- 6b. Medication count
SELECT COUNT(*) AS total_medicacoes
FROM mae_salvador.vw_medicacao
WHERE co_fat_cidadao_pec = '<GESTANTE_ID>';


-- ════════════════════════════════════════════════════════════════
--  SECTION 7: GESTANTE DETAIL — Weight History (chart)
-- ════════════════════════════════════════════════════════════════

-- 7a. Weight entries that feed the weight-gain chart
SELECT
  enc.dt_inicial_atendimento::date AS data,
  enc.nu_peso                      AS peso_kg,
  enc.nu_altura                    AS altura_cm
FROM public.tb_fat_atendimento_individual enc
WHERE enc.co_fat_cidadao_pec = '<GESTANTE_ID>'
  AND enc.nu_peso IS NOT NULL
ORDER BY enc.dt_inicial_atendimento ASC;


-- ════════════════════════════════════════════════════════════════
--  SECTION 8: GESTOR — KPI Dashboard (/gestor)
-- ════════════════════════════════════════════════════════════════

-- 8a. Total gestantes (card "Total de Gestantes")
SELECT COUNT(*) AS total_gestantes
FROM mae_salvador.vw_gestante;


-- 8b. Gestantes with >= 6 and >= 7 consultations
--     (cards "Com 6+ Consultas" and "Com 7+ Consultas")
SELECT
  COUNT(*) FILTER (WHERE total >= 6) AS com_6_consultas,
  COUNT(*) FILTER (WHERE total >= 7) AS com_7_consultas
FROM (
  SELECT co_fat_cidadao_pec, COUNT(*) AS total
  FROM mae_salvador.vw_consulta_prenatal
  GROUP BY co_fat_cidadao_pec
) sub;


-- 8c. Early initiation of prenatal care (first consultation <= 12 weeks)
--     (card "Início Precoce")
SELECT COUNT(*) AS inicio_precoce
FROM (
  SELECT
    cp.co_fat_cidadao_pec,
    MIN(cp.data_consulta) AS primeira_consulta
  FROM mae_salvador.vw_consulta_prenatal cp
  JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = cp.co_fat_cidadao_pec
  GROUP BY cp.co_fat_cidadao_pec
) sub
JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = sub.co_fat_cidadao_pec
WHERE g.dt_ultima_menstruacao IS NOT NULL
  AND (sub.primeira_consulta - g.dt_ultima_menstruacao::date) <= 84;  -- 12 weeks


-- 8d. dTpa and Influenza vaccine coverage
--     (cards "Cobertura dTpa" and "Cobertura Influenza")
SELECT
  COUNT(*) FILTER (WHERE has_dtpa)       AS cobertura_dtpa,
  COUNT(*) FILTER (WHERE has_influenza)  AS cobertura_influenza
FROM (
  SELECT
    v.co_fat_cidadao_pec,
    bool_or(LOWER(v.nome_vacina) LIKE '%dtpa%'
         OR LOWER(v.nome_vacina) LIKE '%difteria%tetano%pertussis%') AS has_dtpa,
    bool_or(LOWER(v.nome_vacina) LIKE '%influenza%')                AS has_influenza
  FROM mae_salvador.vw_vacina_gestante v
  JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = v.co_fat_cidadao_pec
  WHERE v.status_vacina = 'aplicada'
  GROUP BY v.co_fat_cidadao_pec
) sub;


-- 8e. Gestantes with at least 1 consultation
SELECT COUNT(DISTINCT co_fat_cidadao_pec) AS gestantes_com_consulta
FROM mae_salvador.vw_consulta_prenatal;


-- 8f. Full indicator snapshot (single-row, mirrors the frontend exactly)
--     This is the same query used by the app (QUERY_INDICADORES_SNAPSHOT).
WITH gestantes AS (
  SELECT co_seq_cidadao, dt_ultima_menstruacao AS dum
  FROM mae_salvador.vw_gestante
),
consultas_por_gestante AS (
  SELECT
    cp.co_fat_cidadao_pec,
    COUNT(*)           AS total_consultas,
    MIN(cp.data_consulta) AS primeira_consulta
  FROM mae_salvador.vw_consulta_prenatal cp
  JOIN gestantes g ON g.co_seq_cidadao = cp.co_fat_cidadao_pec
  GROUP BY cp.co_fat_cidadao_pec
),
vac_counts AS (
  SELECT
    v.co_fat_cidadao_pec,
    bool_or(LOWER(v.nome_vacina) LIKE '%dtpa%'
         OR LOWER(v.nome_vacina) LIKE '%difteria%tetano%pertussis%') AS has_dtpa,
    bool_or(LOWER(v.nome_vacina) LIKE '%influenza%')                AS has_influenza
  FROM mae_salvador.vw_vacina_gestante v
  JOIN gestantes g ON g.co_seq_cidadao = v.co_fat_cidadao_pec
  WHERE v.status_vacina = 'aplicada'
  GROUP BY v.co_fat_cidadao_pec
)
SELECT
  (SELECT COUNT(*) FROM gestantes)                                                   AS total_gestantes,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante WHERE total_consultas >= 6), 0) AS com_6_consultas,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante WHERE total_consultas >= 7), 0) AS com_7_consultas,
  COALESCE((
    SELECT COUNT(*) FROM consultas_por_gestante cpg
    JOIN gestantes g ON g.co_seq_cidadao = cpg.co_fat_cidadao_pec
    WHERE g.dum IS NOT NULL
      AND (cpg.primeira_consulta - g.dum::date) <= 84
  ), 0)                                                                                AS inicio_precoce,
  COALESCE((SELECT COUNT(*) FROM vac_counts WHERE has_dtpa), 0)                        AS cobertura_dtpa,
  COALESCE((SELECT COUNT(*) FROM vac_counts WHERE has_influenza), 0)                   AS cobertura_influenza,
  COALESCE((SELECT COUNT(*) FROM consultas_por_gestante), 0)                           AS gestantes_com_consulta;


-- ════════════════════════════════════════════════════════════════
--  SECTION 9: GESTOR — Syphilis Cases
-- ════════════════════════════════════════════════════════════════

-- 9a. All syphilis cases (table on gestor dashboard)
SELECT
  fr.co_fat_cidadao_pec      AS gestante_id,
  g.no_cidadao               AS nome,
  fr.descricao_problema,
  fr.co_ciap,
  fr.co_cid10,
  fr.dt_inicio_problema      AS data_deteccao,
  g.dt_ultima_menstruacao    AS dum,
  CASE
    WHEN fr.co_cid10 LIKE 'A51%' THEN 'recente'
    WHEN fr.co_cid10 LIKE 'A52%' THEN 'tardia'
    WHEN fr.co_cid10 = 'O981'    THEN 'recente'
    WHEN fr.co_ciap = 'X70'      THEN 'recente'
    ELSE 'indeterminada'
  END                         AS classificacao
FROM mae_salvador.vw_fator_risco fr
JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = fr.co_fat_cidadao_pec
WHERE fr.co_cid10 LIKE 'A5%'
   OR fr.co_ciap = 'X70'
   OR fr.co_cid10 = 'O981'
ORDER BY fr.dt_inicio_problema DESC NULLS LAST;


-- 9b. Syphilis case count
SELECT COUNT(DISTINCT fr.co_fat_cidadao_pec) AS total_casos_sifilis
FROM mae_salvador.vw_fator_risco fr
JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = fr.co_fat_cidadao_pec
WHERE fr.co_cid10 LIKE 'A5%'
   OR fr.co_ciap = 'X70'
   OR fr.co_cid10 = 'O981';


-- ════════════════════════════════════════════════════════════════
--  SECTION 10: REFERENCE DATA — UBS / Equipes / Profissionais
-- ════════════════════════════════════════════════════════════════

-- 10a. UBS list (used in filters and dropdowns across the dashboard)
SELECT
  co_seq_unidade_saude       AS id,
  no_unidade_saude           AS nome,
  nu_cnes                    AS cnes,
  no_bairro                  AS bairro,
  equipes_sf                 AS total_equipes
FROM mae_salvador.vw_ubs
ORDER BY no_unidade_saude;


-- 10b. Equipes by UBS (replace <UBS_ID> with a co_seq_unidade_saude)
SELECT
  co_seq_equipe              AS id,
  no_equipe                  AS nome,
  nu_ine                     AS ine,
  tp_equipe
FROM mae_salvador.vw_equipe
WHERE co_unidade_saude = '<UBS_ID>'
ORDER BY no_equipe;


-- 10c. Profissional lookup (replace <PROF_ID> with co_seq_prof)
SELECT
  co_seq_prof                AS id,
  no_profissional            AS nome,
  nu_cbo                     AS cbo,
  no_cbo                     AS cargo,
  ubs_ids
FROM mae_salvador.vw_profissional
WHERE co_seq_prof = '<PROF_ID>';


-- ════════════════════════════════════════════════════════════════
--  SECTION 11: QUICK SANITY CHECKS
-- ════════════════════════════════════════════════════════════════

-- 11a. Row counts for all domain views (overall data health check)
SELECT 'vw_gestante'           AS view_name, COUNT(*) AS rows FROM mae_salvador.vw_gestante
UNION ALL
SELECT 'vw_consulta_prenatal', COUNT(*) FROM mae_salvador.vw_consulta_prenatal
UNION ALL
SELECT 'vw_exame',            COUNT(*) FROM mae_salvador.vw_exame
UNION ALL
SELECT 'vw_vacina_gestante',  COUNT(*) FROM mae_salvador.vw_vacina_gestante
UNION ALL
SELECT 'vw_medicacao',        COUNT(*) FROM mae_salvador.vw_medicacao
UNION ALL
SELECT 'vw_fator_risco',      COUNT(*) FROM mae_salvador.vw_fator_risco
UNION ALL
SELECT 'vw_profissional',     COUNT(*) FROM mae_salvador.vw_profissional
UNION ALL
SELECT 'vw_ubs',              COUNT(*) FROM mae_salvador.vw_ubs
UNION ALL
SELECT 'vw_equipe',           COUNT(*) FROM mae_salvador.vw_equipe
ORDER BY view_name;


-- 11b. Sample gestante IDs to use in per-patient queries above
--      Pick any co_seq_cidadao from here and replace <GESTANTE_ID>
SELECT
  co_seq_cidadao  AS id,
  no_cidadao      AS nome,
  situacao
FROM mae_salvador.vw_gestante
ORDER BY no_cidadao
LIMIT 10;


-- 11c. Orphan check: consultations without a matching gestante
SELECT COUNT(*) AS orphan_consultas
FROM mae_salvador.vw_consulta_prenatal cp
LEFT JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = cp.co_fat_cidadao_pec
WHERE g.co_seq_cidadao IS NULL;


-- 11d. Orphan check: exams without a matching gestante
SELECT COUNT(*) AS orphan_exames
FROM mae_salvador.vw_exame ex
LEFT JOIN mae_salvador.vw_gestante g ON g.co_seq_cidadao = ex.co_fat_cidadao_pec
WHERE g.co_seq_cidadao IS NULL;
