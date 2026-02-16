-- ════════════════════════════════════════════════════════════════
--  Mãe Salvador — Views over e-SUS audit-trail tables
--  Migration 001: Core domain views
-- ════════════════════════════════════════════════════════════════
--
--  All views live in the `mae_salvador` schema to keep them
--  separate from the e-SUS `public` schema.
--  Safe to re-run (CREATE OR REPLACE).

CREATE SCHEMA IF NOT EXISTS mae_salvador;

-- ────────────────────────────────────────────────────────────────
--  BASE VIEWS — audit-trail deduplication
--  Each returns the latest non-deleted row per entity PK.
-- ────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW mae_salvador.vw_cidadao AS
SELECT DISTINCT ON (co_seq_cidadao) *
FROM public.ta_cidadao
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_cidadao, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_prontuario AS
SELECT DISTINCT ON (co_seq_prontuario) *
FROM public.ta_prontuario
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_prontuario, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_pre_natal AS
SELECT DISTINCT ON (co_seq_pre_natal) *
FROM public.ta_pre_natal
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_pre_natal, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_antecedente AS
SELECT DISTINCT ON (co_prontuario) *
FROM public.ta_antecedente
WHERE co_tipo_auditoria != 'E'
ORDER BY co_prontuario, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_vinculacao_equipe AS
SELECT DISTINCT ON (co_cidadao) *
FROM public.ta_cidadao_vinculacao_equipe
WHERE co_tipo_auditoria != 'E'
ORDER BY co_cidadao, dt_auditoria DESC;

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

CREATE OR REPLACE VIEW mae_salvador.vw_atend_prof_pre_natal AS
SELECT DISTINCT ON (co_atend_prof_pre_natal) *
FROM public.ta_atend_prof_pre_natal
WHERE co_tipo_auditoria != 'E'
ORDER BY co_atend_prof_pre_natal, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_medicao AS
SELECT DISTINCT ON (co_atend_prof) *
FROM public.ta_medicao
WHERE co_tipo_auditoria != 'E'
ORDER BY co_atend_prof, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_lotacao AS
SELECT DISTINCT ON (co_seq_talotacao) *
FROM public.ta_lotacao
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_talotacao, dt_auditoria DESC;

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

CREATE OR REPLACE VIEW mae_salvador.vw_exame_requisitado AS
SELECT DISTINCT ON (co_seq_exame_requisitado) *
FROM public.ta_exame_requisitado
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_exame_requisitado, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_requisicao_exame AS
SELECT DISTINCT ON (co_seq_requisicao_exame) *
FROM public.ta_requisicao_exame
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_requisicao_exame, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_vacinacao AS
SELECT DISTINCT ON (co_seq_vacinacao) *
FROM public.ta_vacinacao
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_vacinacao, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_registro_vacinacao AS
SELECT DISTINCT ON (co_seq_registro_vacinacao) *
FROM public.ta_registro_vacinacao
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_registro_vacinacao, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_imunobiologico_lote AS
SELECT DISTINCT ON (co_seq_imunobiologico_lote) *
FROM public.ta_imunobiologico_lote
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_imunobiologico_lote, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_receita_medicamento AS
SELECT DISTINCT ON (co_seq_receita_medicamento) *
FROM public.ta_receita_medicamento
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_receita_medicamento, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_medicamento AS
SELECT DISTINCT ON (co_seq_medicamento) *
FROM public.ta_medicamento
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_medicamento, dt_auditoria DESC;

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

CREATE OR REPLACE VIEW mae_salvador.vw_problema AS
SELECT DISTINCT ON (co_seq_problema) *
FROM public.ta_problema
WHERE co_tipo_auditoria != 'E'
ORDER BY co_seq_problema, dt_auditoria DESC;

CREATE OR REPLACE VIEW mae_salvador.vw_problema_evolucao AS
SELECT DISTINCT ON (co_unico_problema) *
FROM public.ta_problema_evolucao
WHERE co_tipo_auditoria != 'E'
ORDER BY co_unico_problema, dt_auditoria DESC;


-- ────────────────────────────────────────────────────────────────
--  DOMAIN VIEWS — consumed by the application
-- ────────────────────────────────────────────────────────────────

-- 1. GESTANTE ATIVA — active pregnant women with full context
CREATE OR REPLACE VIEW mae_salvador.vw_gestante_ativa AS
SELECT
  c.co_seq_cidadao,
  c.no_cidadao,
  c.nu_cpf,
  c.nu_cns,
  c.dt_nascimento,
  c.nu_telefone_celular,
  c.ds_email,
  c.no_tipo_sanguineo,
  rc.no_raca_cor,
  c.st_ativo,
  -- Address
  c.ds_logradouro,
  c.nu_numero,
  c.ds_complemento,
  c.no_bairro,
  c.ds_cep,
  -- Pregnancy
  pn.co_seq_pre_natal,
  pn.dt_ultima_menstruacao,
  pn.st_alto_risco,
  pn.tp_gravidez,
  pn.dt_desfecho,
  -- Obstetric history
  COALESCE(ant.ds_gestacao, '0')    AS ds_gestacao,
  COALESCE(ant.ds_parto, '0')      AS ds_parto,
  COALESCE(ant.qt_aborto, '0')     AS qt_aborto,
  COALESCE(ant.ds_filho_vivo, '0') AS ds_filho_vivo,
  -- Team assignment
  v.nu_ine   AS equipe_ine,
  v.nu_cnes  AS ubs_cnes,
  -- Prontuario link
  p.co_seq_prontuario
FROM mae_salvador.vw_cidadao c
JOIN mae_salvador.vw_prontuario p        ON p.co_cidadao = c.co_seq_cidadao
LEFT JOIN mae_salvador.vw_pre_natal pn   ON pn.co_prontuario = p.co_seq_prontuario
                                        AND pn.dt_desfecho IS NULL
LEFT JOIN mae_salvador.vw_antecedente ant ON ant.co_prontuario = p.co_seq_prontuario
LEFT JOIN mae_salvador.vw_vinculacao_equipe v ON v.co_cidadao = c.co_seq_cidadao
LEFT JOIN public.tb_raca_cor rc          ON rc.co_raca_cor = c.co_raca_cor
WHERE UPPER(c.no_sexo) = 'FEMININO'
  AND c.st_ativo = 1
  AND c.st_faleceu = 0
  AND pn.co_seq_pre_natal IS NOT NULL;


-- 2. CONSULTA PRÉ-NATAL — encounters with vitals + SOAP
CREATE OR REPLACE VIEW mae_salvador.vw_consulta_prenatal AS
SELECT
  ap.co_seq_atend_prof,
  a.co_prontuario,
  ap.dt_inicio                     AS data_consulta,
  ap.st_atend_prof                 AS status_code,
  l.co_prof                        AS profissional_id,
  a.co_unidade_saude               AS ubs_id,
  -- Vitals
  m.nu_medicao_peso,
  m.nu_medicao_pressao_arterial,
  m.nu_medicao_altura_uterina,
  m.nu_medicao_batimnto_cardco_ftl AS bcf,
  -- Pre-natal specifics
  pna.tp_edema,
  pna.st_movimentacao_fetal,
  -- SOAP notes
  s.ds_subjetivo                   AS queixas,
  pl.ds_plano                      AS conduta,
  av.ds_avaliacao                  AS observacoes
FROM mae_salvador.vw_atend_prof ap
JOIN mae_salvador.vw_atend a                ON a.co_seq_atend = ap.co_atend
LEFT JOIN mae_salvador.vw_atend_prof_pre_natal pna ON pna.co_atend_prof_pre_natal = ap.co_seq_atend_prof
LEFT JOIN mae_salvador.vw_medicao m          ON m.co_atend_prof = ap.co_seq_atend_prof
LEFT JOIN mae_salvador.vw_evolucao_subjetivo s  ON s.co_atend_prof = ap.co_seq_atend_prof
LEFT JOIN mae_salvador.vw_evolucao_plano pl     ON pl.co_atend_prof = ap.co_seq_atend_prof
LEFT JOIN mae_salvador.vw_evolucao_avaliacao av ON av.co_atend_prof = ap.co_seq_atend_prof
LEFT JOIN mae_salvador.vw_lotacao l          ON l.co_seq_talotacao = ap.co_lotacao;


-- 3. EXAME — with human-readable name and derived status
CREATE OR REPLACE VIEW mae_salvador.vw_exame AS
SELECT
  er.co_seq_exame_requisitado,
  er.co_prontuario,
  er.dt_solicitacao,
  er.dt_resultado,
  er.dt_realizacao,
  er.ds_resultado,
  er.ds_observacao,
  proc.no_proced                   AS nome_exame,
  req.tp_exame,
  CASE
    WHEN er.dt_resultado IS NOT NULL THEN 'resultado-disponivel'
    WHEN er.dt_realizacao IS NOT NULL THEN 'coletado'
    ELSE 'solicitado'
  END AS status_exame
FROM mae_salvador.vw_exame_requisitado er
LEFT JOIN mae_salvador.vw_requisicao_exame req ON req.co_seq_requisicao_exame = er.co_requisicao_exame
LEFT JOIN public.tb_proced proc               ON proc.co_seq_proced = er.co_proced;


-- 4. VACINA GESTANTE — pregnancy vaccines with names and derived status
CREATE OR REPLACE VIEW mae_salvador.vw_vacina_gestante AS
SELECT
  rv.co_seq_registro_vacinacao,
  vac.co_prontuario,
  imuno.no_imunobiologico          AS nome_vacina,
  dose.sg_dose_imunobiologico      AS dose,
  rv.dt_aplicacao,
  rv.dt_aprazamento,
  lt.ds_lote,
  CASE
    WHEN rv.dt_aplicacao IS NOT NULL THEN 'aplicada'
    WHEN rv.dt_aprazamento < CURRENT_DATE AND rv.dt_aplicacao IS NULL THEN 'atrasada'
    ELSE 'pendente'
  END AS status_vacina
FROM mae_salvador.vw_registro_vacinacao rv
JOIN mae_salvador.vw_vacinacao vac           ON vac.co_seq_vacinacao = rv.co_vacinacao
LEFT JOIN public.tb_imunobiologico imuno     ON imuno.co_imunobiologico = rv.co_imunobiologico
LEFT JOIN public.tb_dose_imunobiologico dose ON dose.co_dose_imunobiologico = rv.co_dose_imunobiologico
LEFT JOIN mae_salvador.vw_imunobiologico_lote lt ON lt.co_seq_imunobiologico_lote = rv.co_imunobiologico_lote
WHERE vac.st_gestante = 1;


-- 5. MEDICAÇÃO — prescriptions with drug name and active status
CREATE OR REPLACE VIEW mae_salvador.vw_medicacao AS
SELECT
  rm.co_seq_receita_medicamento,
  rm.co_atend_prof,
  med.no_principio_ativo,
  med.ds_concentracao,
  rm.ds_dose,
  rm.no_posologia,
  rm.dt_inicio_tratamento,
  rm.dt_fim_tratamento,
  rm.st_uso_continuo,
  rm.st_interrompido,
  rm.ds_recomendacao,
  CASE
    WHEN rm.st_interrompido = 1 THEN false
    WHEN rm.dt_fim_tratamento IS NOT NULL
      AND rm.dt_fim_tratamento < CURRENT_DATE THEN false
    ELSE true
  END AS ativa
FROM mae_salvador.vw_receita_medicamento rm
LEFT JOIN mae_salvador.vw_medicamento med ON med.co_seq_medicamento = rm.co_medicamento;


-- 6. PROFISSIONAL — with CBO code and role
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


-- 9. FATORES DE RISCO — active health problems
CREATE OR REPLACE VIEW mae_salvador.vw_fator_risco AS
SELECT
  pr.co_seq_problema,
  pr.co_prontuario,
  pr.ds_outro                      AS descricao_problema,
  pr.co_ciap,
  pr.co_cid10,
  ev.co_situacao_problema,
  ev.dt_inicio_problema,
  ev.dt_fim_problema
FROM mae_salvador.vw_problema pr
LEFT JOIN mae_salvador.vw_problema_evolucao ev ON ev.co_unico_problema = pr.co_unico_problema
WHERE ev.co_situacao_problema IS DISTINCT FROM 3
  AND ev.dt_fim_problema IS NULL;


-- ────────────────────────────────────────────────────────────────
--  GRANT read access to esus_leitura
-- ────────────────────────────────────────────────────────────────

GRANT USAGE ON SCHEMA mae_salvador TO esus_leitura;
GRANT SELECT ON ALL TABLES IN SCHEMA mae_salvador TO esus_leitura;
ALTER DEFAULT PRIVILEGES IN SCHEMA mae_salvador GRANT SELECT ON TABLES TO esus_leitura;
