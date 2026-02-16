-- ════════════════════════════════════════════════════════════════
--  Mãe Salvador — DW-Primary Views with PEC SOAP Enrichment
--  Migration 001: Core domain views (DW rewrite)
-- ════════════════════════════════════════════════════════════════
--
--  Primary data: DW star schema (tb_fat_* + tb_dim_*)
--  PEC used for: org data (prof, UBS, equipe) + SOAP notes
--  Safe to re-run (CREATE OR REPLACE).

CREATE SCHEMA IF NOT EXISTS mae_salvador;

-- ────────────────────────────────────────────────────────────────
--  DROP old PEC-only base views no longer referenced
-- ────────────────────────────────────────────────────────────────

DROP VIEW IF EXISTS mae_salvador.vw_fator_risco CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_medicacao CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_vacina_gestante CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_exame CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_consulta_prenatal CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_gestante_ativa CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_gestante CASCADE;

DROP VIEW IF EXISTS mae_salvador.vw_cidadao CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_pre_natal CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_antecedente CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_vinculacao_equipe CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_atend_prof_pre_natal CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_medicao CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_exame_requisitado CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_requisicao_exame CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_vacinacao CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_registro_vacinacao CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_imunobiologico_lote CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_receita_medicamento CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_medicamento CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_problema CASCADE;
DROP VIEW IF EXISTS mae_salvador.vw_problema_evolucao CASCADE;

-- ────────────────────────────────────────────────────────────────
--  PEC BASE VIEWS — kept for SOAP bridge + org data
-- ────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW mae_salvador.vw_prontuario AS
SELECT DISTINCT ON (co_seq_prontuario) *
FROM public.ta_prontuario
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_prontuario, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_atend AS
SELECT DISTINCT ON (co_seq_atend) *
FROM public.ta_atend
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_atend, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_atend_prof AS
SELECT DISTINCT ON (co_seq_atend_prof) *
FROM public.ta_atend_prof
WHERE co_tipo_auditoria != 'E'
  AND st_cancelado IS DISTINCT FROM 1
ORDER BY co_seq_atend_prof, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_evolucao_subjetivo AS
SELECT DISTINCT ON (co_atend_prof) *
FROM public.ta_evolucao_subjetivo
WHERE co_tipo_auditoria != 'E'
ORDER BY co_atend_prof, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_evolucao_plano AS
SELECT DISTINCT ON (co_atend_prof) *
FROM public.ta_evolucao_plano
WHERE co_tipo_auditoria != 'E'
ORDER BY co_atend_prof, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_evolucao_avaliacao AS
SELECT DISTINCT ON (co_atend_prof) *
FROM public.ta_evolucao_avaliacao
WHERE co_tipo_auditoria != 'E'
ORDER BY co_atend_prof, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_lotacao AS
SELECT DISTINCT ON (co_seq_talotacao) *
FROM public.ta_lotacao
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_talotacao, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_prof AS
SELECT DISTINCT ON (co_seq_prof) *
FROM public.ta_prof
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_prof, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_equipe_base AS
SELECT DISTINCT ON (co_seq_equipe) *
FROM public.ta_equipe
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_equipe, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_unidade_saude AS
SELECT DISTINCT ON (co_seq_unidade_saude) *
FROM public.ta_unidade_saude
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_unidade_saude, dt_auditoria DESC;


-- ────────────────────────────────────────────────────────────────
--  DW DOMAIN VIEWS
-- ────────────────────────────────────────────────────────────────

-- 1. GESTANTE — pregnant women from DW star schema (active + recent completed)
--    Source: tb_fat_rel_op_gestante + tb_fat_cidadao_pec + dims
--    Includes active pregnancies AND completed pregnancies from 2024+
--    so we have clinical data (the DW hasn't ingested encounters for
--    currently-active pregnancies yet in this dump).
CREATE OR REPLACE VIEW mae_salvador.vw_gestante AS
SELECT
  fcp.co_seq_fat_cidadao_pec        AS co_seq_cidadao,
  COALESCE(fcp.no_cidadao, ci.no_nome) AS no_cidadao,
  COALESCE(fcp.nu_cpf_cidadao, ci.nu_cpf_cidadao) AS nu_cpf,
  fcp.nu_cns,
  t_nasc.dt_registro                AS dt_nascimento,
  COALESCE(fcp.nu_telefone_celular, ci.nu_celular) AS nu_telefone_celular,
  ci.no_email                       AS ds_email,
  rc.ds_raca_cor                    AS no_raca_cor,
  NULL::text                        AS no_tipo_sanguineo,
  CASE WHEN g.dt_inicio_puerperio > CURRENT_DATE THEN 'ativa' ELSE 'concluída' END AS situacao,
  -- Address (not available in DW citizen tables)
  NULL::text AS ds_logradouro,
  NULL::text AS nu_numero,
  NULL::text AS ds_complemento,
  NULL::text AS no_bairro,
  NULL::text AS ds_cep,
  -- Pregnancy
  COALESCE(g.dt_fai_dum, g.dt_inicio_gestacao) AS dt_ultima_menstruacao,
  NULL::integer                     AS st_alto_risco,
  NULL::text                        AS tp_gravidez,
  NULL::date                        AS dt_desfecho,
  -- Obstetric history (from latest prenatal encounter)
  COALESCE(oh.nu_gestas_previas::text, '0') AS ds_gestacao,
  COALESCE(oh.nu_partos::text, '0')         AS ds_parto,
  '0'::text                         AS qt_aborto,
  '0'::text                         AS ds_filho_vivo,
  -- Team/UBS
  eq.nu_ine                         AS equipe_ine,
  us.nu_cnes                        AS ubs_cnes
FROM public.tb_fat_rel_op_gestante g
JOIN public.tb_fat_cidadao_pec fcp
  ON fcp.co_seq_fat_cidadao_pec = g.co_fat_cidadao_pec
LEFT JOIN public.tb_dim_tempo t_nasc
  ON t_nasc.co_seq_dim_tempo = fcp.co_dim_tempo_nascimento
LEFT JOIN public.tb_dim_unidade_saude us
  ON us.co_seq_dim_unidade_saude = fcp.co_dim_unidade_saude_vinc
LEFT JOIN public.tb_dim_equipe eq
  ON eq.co_seq_dim_equipe = fcp.co_dim_equipe_vinc
-- Latest CDS registration for enrichment (name, phone, race, email)
LEFT JOIN LATERAL (
  SELECT ci2.no_nome, ci2.nu_cpf_cidadao, ci2.nu_celular,
         ci2.no_email, ci2.co_dim_raca_cor
  FROM public.tb_fat_cad_individual ci2
  WHERE ci2.co_fat_cidadao_pec = fcp.co_seq_fat_cidadao_pec
    AND ci2.st_ficha_inativa = 0
  ORDER BY ci2.co_dim_tempo DESC
  LIMIT 1
) ci ON true
LEFT JOIN public.tb_dim_raca_cor rc
  ON rc.co_seq_dim_raca_cor = ci.co_dim_raca_cor
-- Latest prenatal encounter for obstetric history
LEFT JOIN LATERAL (
  SELECT enc2.nu_gestas_previas, enc2.nu_partos
  FROM public.tb_fat_atendimento_individual enc2
  WHERE enc2.co_fat_cidadao_pec = fcp.co_seq_fat_cidadao_pec
    AND enc2.nu_idade_gestacional_semanas > 0
    AND (enc2.nu_gestas_previas IS NOT NULL OR enc2.nu_partos IS NOT NULL)
  ORDER BY enc2.co_dim_tempo DESC
  LIMIT 1
) oh ON true
WHERE COALESCE(fcp.st_faleceu, 0) = 0
  AND g.dt_inicio_puerperio >= '2024-01-01';


-- 2. CONSULTA PRÉ-NATAL — DW encounters with vitals + PEC SOAP bridge
--    Source: tb_fat_atendimento_individual WHERE IG > 0
--    SOAP: best-effort bridge via co_cidadao + date matching to PEC
CREATE OR REPLACE VIEW mae_salvador.vw_consulta_prenatal AS
SELECT
  enc.co_seq_fat_atd_ind            AS co_seq_atend_prof,
  enc.co_fat_cidadao_pec,
  dt.dt_registro                    AS data_consulta,
  NULL::integer                     AS status_code,
  enc.co_dim_profissional_1         AS profissional_id,
  us.nu_cnes                        AS ubs_id,
  -- Vitals (DW has separate numeric columns, not combined strings)
  enc.nu_peso                       AS nu_medicao_peso,
  enc.nu_pressao_sistolica,
  enc.nu_pressao_diastolica,
  NULL::numeric                     AS nu_medicao_altura_uterina,
  NULL::numeric                     AS bcf,
  NULL::integer                     AS tp_edema,
  NULL::integer                     AS st_movimentacao_fetal,
  enc.nu_idade_gestacional_semanas,
  -- SOAP from PEC (bridged via co_cidadao + date)
  soap.ds_subjetivo                 AS queixas,
  soap.ds_plano                     AS conduta,
  soap.ds_avaliacao                 AS observacoes
FROM public.tb_fat_atendimento_individual enc
JOIN public.tb_dim_tempo dt
  ON dt.co_seq_dim_tempo = enc.co_dim_tempo
JOIN public.tb_fat_cidadao_pec fcp
  ON fcp.co_seq_fat_cidadao_pec = enc.co_fat_cidadao_pec
LEFT JOIN public.tb_dim_unidade_saude us
  ON us.co_seq_dim_unidade_saude = enc.co_dim_unidade_saude_1
-- SOAP bridge: DW cidadao → PEC prontuario → encounter → SOAP
LEFT JOIN (
  SELECT DISTINCT ON (pr.co_cidadao, ap.dt_inicio::date)
    pr.co_cidadao,
    ap.dt_inicio::date              AS dt_atend,
    sub.ds_subjetivo,
    pl.ds_plano,
    av.ds_avaliacao
  FROM mae_salvador.vw_prontuario pr
  JOIN mae_salvador.vw_atend a  ON a.co_prontuario = pr.co_seq_prontuario
  JOIN mae_salvador.vw_atend_prof ap ON ap.co_atend = a.co_seq_atend
  LEFT JOIN mae_salvador.vw_evolucao_subjetivo sub
    ON sub.co_atend_prof = ap.co_seq_atend_prof
  LEFT JOIN mae_salvador.vw_evolucao_plano pl
    ON pl.co_atend_prof = ap.co_seq_atend_prof
  LEFT JOIN mae_salvador.vw_evolucao_avaliacao av
    ON av.co_atend_prof = ap.co_seq_atend_prof
  WHERE sub.ds_subjetivo IS NOT NULL
     OR pl.ds_plano IS NOT NULL
     OR av.ds_avaliacao IS NOT NULL
  ORDER BY pr.co_cidadao, ap.dt_inicio::date, ap.co_seq_atend_prof DESC
) soap ON soap.co_cidadao = fcp.co_cidadao
      AND soap.dt_atend = dt.dt_registro
WHERE enc.nu_idade_gestacional_semanas > 0;


-- 3. EXAME — from DW exams fact table
CREATE OR REPLACE VIEW mae_salvador.vw_exame AS
SELECT
  ex.co_seq_fat_atd_ind_exames      AS co_seq_exame_requisitado,
  ex.co_fat_cidadao_pec,
  ex.dt_solicitacao,
  ex.dt_resultado,
  ex.dt_realizacao,
  CASE
    WHEN ex.nu_resultado_valor IS NOT NULL THEN ex.nu_resultado_valor::text
    ELSE NULL::text
  END                                AS ds_resultado,
  NULL::text                         AS ds_observacao,
  proc.ds_proced                     AS nome_exame,
  NULL::integer                      AS tp_exame,
  CASE
    WHEN ex.dt_resultado IS NOT NULL THEN 'resultado-disponivel'
    WHEN ex.dt_realizacao IS NOT NULL THEN 'coletado'
    ELSE 'solicitado'
  END                                AS status_exame
FROM public.tb_fat_atd_ind_exames ex
LEFT JOIN public.tb_dim_procedimento proc
  ON proc.co_seq_dim_procedimento = ex.co_dim_procedimento;


-- 4. VACINA GESTANTE — vaccinations from DW
CREATE OR REPLACE VIEW mae_salvador.vw_vacina_gestante AS
SELECT
  vv.co_seq_fat_vacinacao_vacina     AS co_seq_registro_vacinacao,
  v.co_fat_cidadao_pec,
  imuno.no_imunobiologico            AS nome_vacina,
  dose.sg_dose_imunobiologico        AS dose,
  t_apl.dt_registro                  AS dt_aplicacao,
  NULL::date                         AS dt_aprazamento,
  vv.no_lote                         AS ds_lote,
  CASE
    WHEN t_apl.dt_registro IS NOT NULL THEN 'aplicada'
    ELSE 'pendente'
  END                                AS status_vacina
FROM public.tb_fat_vacinacao_vacina vv
JOIN public.tb_fat_vacinacao v
  ON v.co_seq_fat_vacinacao = vv.co_fat_vacinacao
LEFT JOIN public.tb_dim_imunobiologico imuno
  ON imuno.co_seq_dim_imunobiologico = vv.co_dim_imunobiologico
LEFT JOIN public.tb_dim_dose_imunobiologico dose
  ON dose.co_seq_dim_dose_imunobiologico = vv.co_dim_dose_imunobiologico
LEFT JOIN public.tb_dim_tempo t_apl
  ON t_apl.co_seq_dim_tempo = vv.co_dim_tempo_vacina_aplicada;


-- 5. MEDICAÇÃO — prescriptions from DW
CREATE OR REPLACE VIEW mae_salvador.vw_medicacao AS
SELECT
  med.co_seq_fat_atd_ind_medicam     AS co_seq_receita_medicamento,
  med.co_fat_cidadao_pec,
  cat.no_principio_ativo,
  cat.ds_concentracao,
  med.ds_dose,
  med.ds_dose_frequencia             AS no_posologia,
  med.dt_inicio_tratamento,
  NULL::date                         AS dt_fim_tratamento,
  CASE WHEN med.st_uso_continuo = 1 THEN 1 ELSE 0 END AS st_uso_continuo,
  0::integer                         AS st_interrompido,
  NULL::text                         AS ds_recomendacao,
  true                               AS ativa
FROM public.tb_fat_atd_ind_medicamentos med
LEFT JOIN public.tb_dim_catmat cat
  ON cat.co_seq_dim_catmat = med.co_dim_catmat;


-- 6. PROFISSIONAL — PEC-based (well populated: 389 UBS, 1006 equipes)
CREATE OR REPLACE VIEW mae_salvador.vw_profissional AS
SELECT
  pr.co_seq_prof,
  pr.no_profissional,
  pr.nu_cpf,
  pr.nu_cns,
  pr.nu_conselho_classe,
  cbo.co_cbo_2002                  AS nu_cbo,
  cbo.no_cbo,
  ARRAY_AGG(DISTINCT l.co_unidade_saude) FILTER (WHERE l.co_unidade_saude IS NOT NULL) AS ubs_ids
FROM mae_salvador.vw_prof pr
LEFT JOIN mae_salvador.vw_lotacao l ON l.co_prof = pr.co_seq_prof
                                   AND l.dt_desativacao_lotacao IS NULL
LEFT JOIN public.tb_cbo cbo        ON cbo.co_cbo = l.co_cbo
GROUP BY pr.co_seq_prof, pr.no_profissional, pr.nu_cpf, pr.nu_cns,
         pr.nu_conselho_classe, cbo.co_cbo_2002, cbo.no_cbo;


-- 7. UBS — active health units with equipe count
CREATE OR REPLACE VIEW mae_salvador.vw_ubs AS
SELECT
  u.co_seq_unidade_saude,
  u.no_unidade_saude,
  u.nu_cnes,
  u.tp_unidade_saude,
  u.ds_logradouro,
  u.nu_numero,
  u.no_bairro,
  u.ds_cep,
  u.nu_telefone_comercial,
  COALESCE(ec.num_equipes, 0)      AS equipes_sf
FROM mae_salvador.vw_unidade_saude u
LEFT JOIN (
  SELECT co_unidade_saude, COUNT(*) AS num_equipes
  FROM mae_salvador.vw_equipe_base
  WHERE st_ativo = 1
  GROUP BY co_unidade_saude
) ec ON ec.co_unidade_saude = u.co_seq_unidade_saude
WHERE u.st_ativo = 1;


-- 8. EQUIPE — active teams
CREATE OR REPLACE VIEW mae_salvador.vw_equipe AS
SELECT
  co_seq_equipe,
  no_equipe,
  nu_ine,
  co_unidade_saude,
  tp_equipe,
  ds_area
FROM mae_salvador.vw_equipe_base
WHERE st_ativo = 1;


-- 9. FATORES DE RISCO — from DW problems fact table
CREATE OR REPLACE VIEW mae_salvador.vw_fator_risco AS
SELECT
  p.co_seq_fat_atend_ind_problemas   AS co_seq_problema,
  p.co_fat_cidadao_pec,
  COALESCE(ciap.no_ciap, cid.no_cid) AS descricao_problema,
  ciap.nu_ciap                       AS co_ciap,
  cid.nu_cid                         AS co_cid10,
  NULL::integer                      AS co_situacao_problema,
  dt_inicio.dt_registro              AS dt_inicio_problema,
  dt_fim.dt_registro                 AS dt_fim_problema
FROM public.tb_fat_atd_ind_problemas p
LEFT JOIN public.tb_dim_ciap ciap
  ON ciap.co_seq_dim_ciap = p.co_dim_ciap AND p.co_dim_ciap != 1
LEFT JOIN public.tb_dim_cid cid
  ON cid.co_seq_dim_cid = p.co_dim_cid AND p.co_dim_cid != 1
LEFT JOIN public.tb_dim_tempo dt_inicio
  ON dt_inicio.co_seq_dim_tempo = p.co_dim_data_inicio_problema
LEFT JOIN public.tb_dim_tempo dt_fim
  ON dt_fim.co_seq_dim_tempo = p.co_dim_data_fim_problema
WHERE (p.co_dim_ciap != 1 OR p.co_dim_cid != 1)
  AND (p.co_dim_data_fim_problema IS NULL OR p.co_dim_data_fim_problema <= 1);


-- ────────────────────────────────────────────────────────────────
--  GRANT read access to esus_leitura
-- ────────────────────────────────────────────────────────────────

GRANT USAGE ON SCHEMA mae_salvador TO esus_leitura;
GRANT SELECT ON ALL TABLES IN SCHEMA mae_salvador TO esus_leitura;
ALTER DEFAULT PRIVILEGES IN SCHEMA mae_salvador GRANT SELECT ON TABLES TO esus_leitura;
