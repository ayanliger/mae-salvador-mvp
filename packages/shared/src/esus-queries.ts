/**
 * ════════════════════════════════════════════════════════════════
 *  e-SUS AB PEC → Mãe Salvador  —  SQL Query Templates
 * ════════════════════════════════════════════════════════════════
 *
 * These queries run against the e-SUS PostgreSQL replica (read-only).
 *
 * All `ta_*` queries use the audit-trail pattern:
 *   - DISTINCT ON (co_seq_*) + ORDER BY dt_auditoria DESC
 *   - WHERE co_tipo_auditoria != 'E' (exclude deletions)
 *
 * Each query is a tagged template literal that can be used with
 * any PostgreSQL client (pg, drizzle, etc.) by replacing $N params.
 */

// ════════════════════════════════════════════════════════════════
//  COMMON: Audit-trail CTE for getting latest record per entity
// ════════════════════════════════════════════════════════════════

/**
 * Reusable CTE pattern for any ta_* table.
 * Usage: replace TABLE_NAME and PK_COLUMN.
 *
 * Example for ta_cidadao:
 *   WITH cidadao_atual AS (
 *     SELECT DISTINCT ON (co_seq_cidadao) *
 *     FROM ta_cidadao
 *     WHERE co_tipo_auditoria != 'E'
 *     ORDER BY co_seq_cidadao, dt_auditoria DESC
 *   )
 */
export const AUDIT_CTE_TEMPLATE = (table: string, pk: string) => `
  SELECT DISTINCT ON (${pk}) *
  FROM ${table}
  WHERE co_tipo_auditoria != 'E'
  ORDER BY ${pk}, dt_auditoria DESC
`;


// ════════════════════════════════════════════════════════════════
//  1. GESTANTE — List all active pregnant women
// ════════════════════════════════════════════════════════════════

/**
 * Returns all active gestantes with pregnancy + obstetric data.
 *
 * Join path:
 *   ta_cidadao → ta_prontuario → ta_pre_natal
 *                               → ta_antecedente
 *              → ta_cidadao_vinculacao_equipe
 *
 * Filters:
 *   - cidadao is female (no_sexo = 'Feminino')
 *   - cidadao is active (st_ativo = 1, st_faleceu = 0)
 *   - has an active pre_natal record (dt_desfecho IS NULL)
 */
export const QUERY_GESTANTES = `
WITH cidadao AS (
  SELECT DISTINCT ON (co_seq_cidadao) *
  FROM ta_cidadao
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_seq_cidadao, dt_auditoria DESC
),
prontuario AS (
  SELECT DISTINCT ON (co_seq_prontuario) *
  FROM ta_prontuario
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_seq_prontuario, dt_auditoria DESC
),
pre_natal AS (
  SELECT DISTINCT ON (co_seq_pre_natal) *
  FROM ta_pre_natal
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_seq_pre_natal, dt_auditoria DESC
),
antecedente AS (
  SELECT DISTINCT ON (co_prontuario) *
  FROM ta_antecedente
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_prontuario, dt_auditoria DESC
),
vinculacao AS (
  SELECT DISTINCT ON (co_cidadao) *
  FROM ta_cidadao_vinculacao_equipe
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_cidadao, dt_auditoria DESC
)
SELECT
  -- Demographics (→ Gestante)
  c.co_seq_cidadao,
  c.no_cidadao,
  c.nu_cpf,
  c.nu_cns,
  c.dt_nascimento,
  c.nu_telefone_celular,
  c.ds_email,
  c.no_tipo_sanguineo,
  c.co_raca_cor,
  c.st_ativo,
  -- Address (→ Gestante.endereco)
  c.ds_logradouro,
  c.nu_numero,
  c.ds_complemento,
  c.no_bairro,
  c.ds_cep,
  -- Pregnancy (→ Gestante DUM/DPP/risco)
  pn.co_seq_pre_natal,
  pn.dt_ultima_menstruacao,
  pn.st_alto_risco,
  pn.tp_gravidez,
  pn.dt_desfecho,
  -- Obstetric history (→ Gestante gestacoes/partos/abortos)
  COALESCE(ant.ds_gestacao, '0')  AS ds_gestacao,
  COALESCE(ant.ds_parto, '0')    AS ds_parto,
  COALESCE(ant.qt_aborto, '0')   AS qt_aborto,
  COALESCE(ant.ds_filho_vivo, '0') AS ds_filho_vivo,
  -- Team assignment
  v.nu_ine   AS equipe_ine,
  v.nu_cnes  AS ubs_cnes,
  -- Prontuario link
  p.co_seq_prontuario
FROM cidadao c
JOIN prontuario p       ON p.co_cidadao = c.co_seq_cidadao
LEFT JOIN pre_natal pn  ON pn.co_prontuario = p.co_seq_prontuario
                       AND pn.dt_desfecho IS NULL
LEFT JOIN antecedente ant ON ant.co_prontuario = p.co_seq_prontuario
LEFT JOIN vinculacao v    ON v.co_cidadao = c.co_seq_cidadao
WHERE c.no_sexo = 'Feminino'
  AND c.st_ativo = 1
  AND c.st_faleceu = 0
  AND pn.co_seq_pre_natal IS NOT NULL
ORDER BY c.no_cidadao
`;


// ════════════════════════════════════════════════════════════════
//  1b. GESTANTE BY ID — Single gestante with full data
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_cidadao (gestante ID)
 */
export const QUERY_GESTANTE_BY_ID = `
WITH cidadao AS (
  SELECT DISTINCT ON (co_seq_cidadao) *
  FROM ta_cidadao
  WHERE co_tipo_auditoria != 'E'
    AND co_seq_cidadao = $1
  ORDER BY co_seq_cidadao, dt_auditoria DESC
),
prontuario AS (
  SELECT DISTINCT ON (co_seq_prontuario) *
  FROM ta_prontuario
  WHERE co_tipo_auditoria != 'E'
    AND co_cidadao = $1
  ORDER BY co_seq_prontuario, dt_auditoria DESC
),
pre_natal AS (
  SELECT DISTINCT ON (co_seq_pre_natal) pn.*
  FROM ta_pre_natal pn
  JOIN prontuario p ON p.co_seq_prontuario = pn.co_prontuario
  WHERE pn.co_tipo_auditoria != 'E'
  ORDER BY co_seq_pre_natal, pn.dt_auditoria DESC
),
antecedente AS (
  SELECT DISTINCT ON (ant.co_prontuario) ant.*
  FROM ta_antecedente ant
  JOIN prontuario p ON p.co_seq_prontuario = ant.co_prontuario
  WHERE ant.co_tipo_auditoria != 'E'
  ORDER BY ant.co_prontuario, ant.dt_auditoria DESC
)
SELECT
  c.co_seq_cidadao,
  c.no_cidadao,
  c.nu_cpf,
  c.nu_cns,
  c.dt_nascimento,
  c.nu_telefone_celular,
  c.ds_email,
  c.no_tipo_sanguineo,
  c.co_raca_cor,
  c.st_ativo,
  c.ds_logradouro,
  c.nu_numero,
  c.ds_complemento,
  c.no_bairro,
  c.ds_cep,
  pn.dt_ultima_menstruacao,
  pn.st_alto_risco,
  pn.tp_gravidez,
  pn.dt_desfecho,
  COALESCE(ant.ds_gestacao, '0')    AS ds_gestacao,
  COALESCE(ant.ds_parto, '0')      AS ds_parto,
  COALESCE(ant.qt_aborto, '0')     AS qt_aborto,
  COALESCE(ant.ds_filho_vivo, '0') AS ds_filho_vivo,
  p.co_seq_prontuario
FROM cidadao c
JOIN prontuario p       ON p.co_cidadao = c.co_seq_cidadao
LEFT JOIN pre_natal pn  ON pn.co_prontuario = p.co_seq_prontuario
LEFT JOIN antecedente ant ON ant.co_prontuario = p.co_seq_prontuario
LIMIT 1
`;


// ════════════════════════════════════════════════════════════════
//  2. CONSULTAS PRÉ-NATAL — By gestante
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_cidadao (gestante ID)
 *
 * Returns all prenatal consultations for a gestante, including vitals
 * and SOAP notes, ordered by date descending.
 */
export const QUERY_CONSULTAS_BY_GESTANTE = `
WITH prontuario AS (
  SELECT DISTINCT ON (co_seq_prontuario) *
  FROM ta_prontuario
  WHERE co_tipo_auditoria != 'E'
    AND co_cidadao = $1
  ORDER BY co_seq_prontuario, dt_auditoria DESC
),
atend AS (
  SELECT DISTINCT ON (a.co_seq_atend) a.*
  FROM ta_atend a
  JOIN prontuario p ON p.co_seq_prontuario = a.co_prontuario
  WHERE a.co_tipo_auditoria != 'E'
  ORDER BY a.co_seq_atend, a.dt_auditoria DESC
),
atend_prof AS (
  SELECT DISTINCT ON (ap.co_seq_atend_prof) ap.*
  FROM ta_atend_prof ap
  JOIN atend a ON a.co_seq_atend = ap.co_atend
  WHERE ap.co_tipo_auditoria != 'E'
    AND ap.st_cancelado IS DISTINCT FROM 1
  ORDER BY ap.co_seq_atend_prof, ap.dt_auditoria DESC
),
pre_natal_atend AS (
  SELECT DISTINCT ON (apn.co_atend_prof_pre_natal) apn.*
  FROM ta_atend_prof_pre_natal apn
  WHERE apn.co_tipo_auditoria != 'E'
  ORDER BY apn.co_atend_prof_pre_natal, apn.dt_auditoria DESC
),
medicao AS (
  SELECT DISTINCT ON (m.co_atend_prof) m.*
  FROM ta_medicao m
  WHERE m.co_tipo_auditoria != 'E'
  ORDER BY m.co_atend_prof, m.dt_auditoria DESC
),
subjetivo AS (
  SELECT DISTINCT ON (s.co_atend_prof) s.*
  FROM ta_evolucao_subjetivo s
  WHERE s.co_tipo_auditoria != 'E'
  ORDER BY s.co_atend_prof, s.dt_auditoria DESC
),
plano AS (
  SELECT DISTINCT ON (pl.co_atend_prof) pl.*
  FROM ta_evolucao_plano pl
  WHERE pl.co_tipo_auditoria != 'E'
  ORDER BY pl.co_atend_prof, pl.dt_auditoria DESC
),
avaliacao AS (
  SELECT DISTINCT ON (av.co_atend_prof) av.*
  FROM ta_evolucao_avaliacao av
  WHERE av.co_tipo_auditoria != 'E'
  ORDER BY av.co_atend_prof, av.dt_auditoria DESC
),
lotacao AS (
  SELECT DISTINCT ON (co_prof, co_unidade_saude) *
  FROM ta_lotacao
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_prof, co_unidade_saude, dt_auditoria DESC
)
SELECT
  ap.co_seq_atend_prof,
  ap.dt_inicio                     AS data_consulta,
  ap.st_atend_prof                 AS status_code,
  -- Profissional
  l.co_prof                        AS profissional_id,
  -- UBS
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
FROM atend_prof ap
JOIN atend a              ON a.co_seq_atend = ap.co_atend
LEFT JOIN pre_natal_atend pna ON pna.co_atend_prof_pre_natal = ap.co_seq_atend_prof
LEFT JOIN medicao m       ON m.co_atend_prof = ap.co_seq_atend_prof
LEFT JOIN subjetivo s     ON s.co_atend_prof = ap.co_seq_atend_prof
LEFT JOIN plano pl        ON pl.co_atend_prof = ap.co_seq_atend_prof
LEFT JOIN avaliacao av    ON av.co_atend_prof = ap.co_seq_atend_prof
LEFT JOIN lotacao l       ON l.co_seq_talotacao = ap.co_lotacao
ORDER BY ap.dt_inicio DESC
`;


// ════════════════════════════════════════════════════════════════
//  3. EXAMES — By gestante
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_cidadao (gestante ID)
 */
export const QUERY_EXAMES_BY_GESTANTE = `
WITH prontuario AS (
  SELECT DISTINCT ON (co_seq_prontuario) *
  FROM ta_prontuario
  WHERE co_tipo_auditoria != 'E'
    AND co_cidadao = $1
  ORDER BY co_seq_prontuario, dt_auditoria DESC
),
exame_req AS (
  SELECT DISTINCT ON (er.co_seq_exame_requisitado) er.*
  FROM ta_exame_requisitado er
  JOIN prontuario p ON p.co_seq_prontuario = er.co_prontuario
  WHERE er.co_tipo_auditoria != 'E'
  ORDER BY er.co_seq_exame_requisitado, er.dt_auditoria DESC
),
requisicao AS (
  SELECT DISTINCT ON (co_seq_requisicao_exame) *
  FROM ta_requisicao_exame
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_seq_requisicao_exame, dt_auditoria DESC
)
SELECT
  er.co_seq_exame_requisitado,
  er.dt_solicitacao,
  er.dt_resultado,
  er.dt_realizacao,
  er.ds_resultado,
  er.ds_observacao,
  er.co_proced,
  -- Exam type from requisition
  req.tp_exame,
  -- Derived status
  CASE
    WHEN er.dt_resultado IS NOT NULL THEN 'resultado-disponivel'
    WHEN er.dt_realizacao IS NOT NULL THEN 'coletado'
    ELSE 'solicitado'
  END AS status_exame
FROM exame_req er
LEFT JOIN requisicao req ON req.co_seq_requisicao_exame = er.co_requisicao_exame
ORDER BY er.dt_solicitacao DESC
`;


// ════════════════════════════════════════════════════════════════
//  4. VACINAS — By gestante (pregnancy vaccines only)
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_cidadao (gestante ID)
 */
export const QUERY_VACINAS_BY_GESTANTE = `
WITH prontuario AS (
  SELECT DISTINCT ON (co_seq_prontuario) *
  FROM ta_prontuario
  WHERE co_tipo_auditoria != 'E'
    AND co_cidadao = $1
  ORDER BY co_seq_prontuario, dt_auditoria DESC
),
vacinacao AS (
  SELECT DISTINCT ON (v.co_seq_vacinacao) v.*
  FROM ta_vacinacao v
  JOIN prontuario p ON p.co_seq_prontuario = v.co_prontuario
  WHERE v.co_tipo_auditoria != 'E'
    AND v.st_gestante = 1
  ORDER BY v.co_seq_vacinacao, v.dt_auditoria DESC
),
registro AS (
  SELECT DISTINCT ON (rv.co_seq_registro_vacinacao) rv.*
  FROM ta_registro_vacinacao rv
  JOIN vacinacao v ON v.co_seq_vacinacao = rv.co_vacinacao
  WHERE rv.co_tipo_auditoria != 'E'
  ORDER BY rv.co_seq_registro_vacinacao, rv.dt_auditoria DESC
),
lote AS (
  SELECT DISTINCT ON (co_seq_imunobiologico_lote) *
  FROM ta_imunobiologico_lote
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_seq_imunobiologico_lote, dt_auditoria DESC
)
SELECT
  rv.co_seq_registro_vacinacao,
  rv.co_imunobiologico,
  rv.co_dose_imunobiologico,
  rv.dt_aplicacao,
  rv.dt_aprazamento,
  lt.ds_lote,
  -- Derived status
  CASE
    WHEN rv.dt_aplicacao IS NOT NULL THEN 'aplicada'
    WHEN rv.dt_aprazamento < CURRENT_DATE AND rv.dt_aplicacao IS NULL THEN 'atrasada'
    ELSE 'pendente'
  END AS status_vacina
FROM registro rv
LEFT JOIN lote lt ON lt.co_seq_imunobiologico_lote = rv.co_imunobiologico_lote
ORDER BY COALESCE(rv.dt_aplicacao, rv.dt_aprazamento) DESC
`;


// ════════════════════════════════════════════════════════════════
//  5. MEDICAÇÕES — By gestante (active prescriptions)
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_cidadao (gestante ID)
 */
export const QUERY_MEDICACOES_BY_GESTANTE = `
WITH prontuario AS (
  SELECT DISTINCT ON (co_seq_prontuario) *
  FROM ta_prontuario
  WHERE co_tipo_auditoria != 'E'
    AND co_cidadao = $1
  ORDER BY co_seq_prontuario, dt_auditoria DESC
),
atend AS (
  SELECT DISTINCT ON (a.co_seq_atend) a.*
  FROM ta_atend a
  JOIN prontuario p ON p.co_seq_prontuario = a.co_prontuario
  WHERE a.co_tipo_auditoria != 'E'
  ORDER BY a.co_seq_atend, a.dt_auditoria DESC
),
atend_prof AS (
  SELECT DISTINCT ON (ap.co_seq_atend_prof) ap.*
  FROM ta_atend_prof ap
  JOIN atend a ON a.co_seq_atend = ap.co_atend
  WHERE ap.co_tipo_auditoria != 'E'
  ORDER BY ap.co_seq_atend_prof, ap.dt_auditoria DESC
),
receita AS (
  SELECT DISTINCT ON (rm.co_seq_receita_medicamento) rm.*
  FROM ta_receita_medicamento rm
  JOIN atend_prof ap ON ap.co_seq_atend_prof = rm.co_atend_prof
  WHERE rm.co_tipo_auditoria != 'E'
  ORDER BY rm.co_seq_receita_medicamento, rm.dt_auditoria DESC
),
medicamento AS (
  SELECT DISTINCT ON (co_seq_medicamento) *
  FROM ta_medicamento
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_seq_medicamento, dt_auditoria DESC
)
SELECT
  rm.co_seq_receita_medicamento,
  med.no_principio_ativo,
  med.ds_concentracao,
  rm.ds_dose,
  rm.no_posologia,
  rm.dt_inicio_tratamento,
  rm.dt_fim_tratamento,
  rm.st_uso_continuo,
  rm.st_interrompido,
  rm.ds_recomendacao,
  -- Derived active status
  CASE
    WHEN rm.st_interrompido = 1 THEN false
    WHEN rm.dt_fim_tratamento IS NOT NULL
      AND rm.dt_fim_tratamento < CURRENT_DATE THEN false
    ELSE true
  END AS ativa
FROM receita rm
LEFT JOIN medicamento med ON med.co_seq_medicamento = rm.co_medicamento
ORDER BY rm.dt_inicio_tratamento DESC
`;


// ════════════════════════════════════════════════════════════════
//  6. PROFISSIONAL — By ID
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_prof (profissional ID)
 */
export const QUERY_PROFISSIONAL_BY_ID = `
WITH prof AS (
  SELECT DISTINCT ON (co_seq_prof) *
  FROM ta_prof
  WHERE co_tipo_auditoria != 'E'
    AND co_seq_prof = $1
  ORDER BY co_seq_prof, dt_auditoria DESC
),
lotacao AS (
  SELECT DISTINCT ON (co_seq_talotacao) *
  FROM ta_lotacao
  WHERE co_tipo_auditoria != 'E'
    AND co_prof = $1
    AND dt_desativacao_lotacao IS NULL
  ORDER BY co_seq_talotacao, dt_auditoria DESC
)
SELECT
  pr.co_seq_prof,
  pr.no_profissional,
  pr.nu_cpf,
  pr.nu_cns,
  pr.nu_conselho_classe,
  -- Aggregate active UBS assignments
  ARRAY_AGG(DISTINCT l.co_unidade_saude) FILTER (WHERE l.co_unidade_saude IS NOT NULL) AS ubs_ids,
  -- CBO from first active lotação
  (SELECT l2.co_cbo FROM lotacao l2 LIMIT 1) AS co_cbo
FROM prof pr
LEFT JOIN lotacao l ON l.co_prof = pr.co_seq_prof
GROUP BY pr.co_seq_prof, pr.no_profissional, pr.nu_cpf, pr.nu_cns, pr.nu_conselho_classe
`;


// ════════════════════════════════════════════════════════════════
//  7. UBS — List all active health units
// ════════════════════════════════════════════════════════════════

export const QUERY_UBS_LIST = `
WITH unidade AS (
  SELECT DISTINCT ON (co_seq_unidade_saude) *
  FROM ta_unidade_saude
  WHERE co_tipo_auditoria != 'E'
  ORDER BY co_seq_unidade_saude, dt_auditoria DESC
),
equipe_count AS (
  SELECT
    e.co_unidade_saude,
    COUNT(*) AS num_equipes
  FROM (
    SELECT DISTINCT ON (co_seq_equipe) *
    FROM ta_equipe
    WHERE co_tipo_auditoria != 'E'
    ORDER BY co_seq_equipe, dt_auditoria DESC
  ) e
  WHERE e.st_ativo = 1
  GROUP BY e.co_unidade_saude
)
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
  COALESCE(ec.num_equipes, 0) AS equipes_sf
FROM unidade u
LEFT JOIN equipe_count ec ON ec.co_unidade_saude = u.co_seq_unidade_saude
WHERE u.st_ativo = 1
ORDER BY u.no_unidade_saude
`;


// ════════════════════════════════════════════════════════════════
//  8. EQUIPES — By UBS
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_unidade_saude (UBS ID)
 */
export const QUERY_EQUIPES_BY_UBS = `
SELECT DISTINCT ON (co_seq_equipe)
  co_seq_equipe,
  no_equipe,
  nu_ine,
  co_unidade_saude,
  tp_equipe,
  ds_area
FROM ta_equipe
WHERE co_tipo_auditoria != 'E'
  AND co_unidade_saude = $1
  AND st_ativo = 1
ORDER BY co_seq_equipe, dt_auditoria DESC
`;


// ════════════════════════════════════════════════════════════════
//  9. PESO HISTORY — For weight gain chart
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_cidadao (gestante ID)
 *
 * Returns all weight measurements during prenatal encounters,
 * for building the RegistroPeso[] array.
 */
export const QUERY_HISTORICO_PESO = `
WITH prontuario AS (
  SELECT DISTINCT ON (co_seq_prontuario) *
  FROM ta_prontuario
  WHERE co_tipo_auditoria != 'E'
    AND co_cidadao = $1
  ORDER BY co_seq_prontuario, dt_auditoria DESC
),
atend AS (
  SELECT DISTINCT ON (a.co_seq_atend) a.*
  FROM ta_atend a
  JOIN prontuario p ON p.co_seq_prontuario = a.co_prontuario
  WHERE a.co_tipo_auditoria != 'E'
  ORDER BY a.co_seq_atend, a.dt_auditoria DESC
),
atend_prof AS (
  SELECT DISTINCT ON (ap.co_seq_atend_prof) ap.*
  FROM ta_atend_prof ap
  JOIN atend a ON a.co_seq_atend = ap.co_atend
  WHERE ap.co_tipo_auditoria != 'E'
    AND ap.st_cancelado IS DISTINCT FROM 1
  ORDER BY ap.co_seq_atend_prof, ap.dt_auditoria DESC
),
medicao AS (
  SELECT DISTINCT ON (m.co_atend_prof) m.*
  FROM ta_medicao m
  WHERE m.co_tipo_auditoria != 'E'
    AND m.nu_medicao_peso IS NOT NULL
  ORDER BY m.co_atend_prof, m.dt_auditoria DESC
)
SELECT
  m.dt_medicao            AS data,
  m.nu_medicao_peso       AS peso_kg,
  m.nu_medicao_imc        AS imc,
  m.nu_medicao_altura     AS altura
FROM medicao m
JOIN atend_prof ap ON ap.co_seq_atend_prof = m.co_atend_prof
ORDER BY m.dt_medicao ASC
`;


// ════════════════════════════════════════════════════════════════
//  10. RISK FACTORS — Active problems for a gestante
// ════════════════════════════════════════════════════════════════

/**
 * Param: $1 = co_seq_cidadao (gestante ID)
 *
 * Returns active health problems (fatoresRisco) linked to
 * the gestante's prontuário, using the latest problem evolution.
 */
export const QUERY_FATORES_RISCO = `
WITH prontuario AS (
  SELECT DISTINCT ON (co_seq_prontuario) *
  FROM ta_prontuario
  WHERE co_tipo_auditoria != 'E'
    AND co_cidadao = $1
  ORDER BY co_seq_prontuario, dt_auditoria DESC
),
problema AS (
  SELECT DISTINCT ON (pr.co_seq_problema) pr.*
  FROM ta_problema pr
  JOIN prontuario p ON p.co_seq_prontuario = pr.co_prontuario
  WHERE pr.co_tipo_auditoria != 'E'
  ORDER BY pr.co_seq_problema, pr.dt_auditoria DESC
),
evolucao AS (
  SELECT DISTINCT ON (pe.co_unico_problema) pe.*
  FROM ta_problema_evolucao pe
  WHERE pe.co_tipo_auditoria != 'E'
  ORDER BY pe.co_unico_problema, pe.dt_auditoria DESC
)
SELECT
  pr.co_seq_problema,
  pr.ds_outro        AS descricao_problema,
  pr.co_ciap,
  pr.co_cid10,
  ev.co_situacao_problema,
  ev.dt_inicio_problema,
  ev.dt_fim_problema
FROM problema pr
LEFT JOIN evolucao ev ON ev.co_unico_problema = pr.co_unico_problema
WHERE ev.co_situacao_problema IS DISTINCT FROM 3  -- exclude resolved (code may vary)
  AND ev.dt_fim_problema IS NULL
ORDER BY ev.dt_inicio_problema DESC
`;
