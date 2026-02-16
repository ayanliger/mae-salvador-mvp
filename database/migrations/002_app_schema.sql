-- ════════════════════════════════════════════════════════════════
--  Mãe Salvador — Application Schema
--  Migration 002: Program-specific tables (mae_salvador database)
-- ════════════════════════════════════════════════════════════════
--
--  These tables live in the `mae_salvador` database (NOT the esus DB).
--  They store program data that doesn't exist in e-SUS:
--  sessions, Transcard, notifications, syphilis tracking, etc.
--
--  co_cidadao / co_prof columns are cross-DB references to e-SUS
--  (no hard FK since they're in a separate database).

-- ────────────────────────────────────────────────────────────────
--  1. SESSÃO PROFISSIONAL — dashboard auth sessions
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sessao_profissional (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  co_prof    BIGINT      NOT NULL,
  papel      TEXT        NOT NULL CHECK (papel IN ('enfermeiro','medico','gestor','admin')),
  nivel_acesso TEXT      NOT NULL DEFAULT 'local-equipe'
                         CHECK (nivel_acesso IN ('local-equipe','local-gerente','distrital','central')),
  token      TEXT        UNIQUE NOT NULL,
  criado_em  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expira_em  TIMESTAMPTZ NOT NULL,
  ativo      BOOLEAN     NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_sessao_prof_token
  ON sessao_profissional (token) WHERE ativo = true;


-- ────────────────────────────────────────────────────────────────
--  2. SESSÃO GESTANTE — mobile app auth sessions
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sessao_gestante (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  cpf         TEXT        NOT NULL,
  co_cidadao  BIGINT,
  token       TEXT        UNIQUE NOT NULL,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now(),
  expira_em   TIMESTAMPTZ NOT NULL,
  ativo       BOOLEAN     NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_sessao_gest_token
  ON sessao_gestante (token) WHERE ativo = true;


-- ────────────────────────────────────────────────────────────────
--  3. TRANSCARD VINCULAÇÃO — program enrollment per gestante
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS transcard_vinculacao (
  id                       UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  co_cidadao               BIGINT    NOT NULL,
  numero_transcard         TEXT      UNIQUE,
  cpf                      TEXT      NOT NULL,
  situacao                 TEXT      NOT NULL DEFAULT 'pendente'
                           CHECK (situacao IN ('ativo','inconsistencia','pendente','recusado')),
  data_vinculacao          DATE      NOT NULL DEFAULT CURRENT_DATE,
  etapa_atual              SMALLINT  NOT NULL DEFAULT 1 CHECK (etapa_atual BETWEEN 1 AND 3),
  lgpd_consentimento       TEXT      NOT NULL DEFAULT 'pendente'
                           CHECK (lgpd_consentimento IN ('assinado-digital','assinado-fisico','pendente')),
  recusou_transcard        BOOLEAN   NOT NULL DEFAULT false,
  recusou_kit_enxoval      BOOLEAN   NOT NULL DEFAULT false,
  encaminhada_cras         BOOLEAN   NOT NULL DEFAULT false,
  data_encaminhamento_cras DATE,
  criado_em                TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transcard_cidadao
  ON transcard_vinculacao (co_cidadao);


-- ────────────────────────────────────────────────────────────────
--  4. PROGRAMA GESTANTE — app-only enrichment data
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS programa_gestante (
  id                          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  co_cidadao                  BIGINT  UNIQUE NOT NULL,
  maternidade_referencia      TEXT,
  profissional_responsavel_id BIGINT,
  cartao_mae_salvador         BOOLEAN NOT NULL DEFAULT false,
  bolsa_familia               BOOLEAN NOT NULL DEFAULT false,
  programa_social             TEXT    NOT NULL DEFAULT 'nenhum',
  nis                         TEXT,
  identidade_genero           TEXT,
  orientacao_sexual           TEXT,
  nome_social                 TEXT,
  tem_whatsapp                BOOLEAN NOT NULL DEFAULT false,
  data_cadastro               DATE    NOT NULL DEFAULT CURRENT_DATE,
  criado_em                   TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em               TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ────────────────────────────────────────────────────────────────
--  5. ATIVIDADE EDUCATIVA
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS atividade_educativa (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  co_cidadao  BIGINT      NOT NULL,
  data        DATE        NOT NULL,
  descricao   TEXT        NOT NULL,
  co_prof     BIGINT      NOT NULL,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_atividade_cidadao
  ON atividade_educativa (co_cidadao);


-- ────────────────────────────────────────────────────────────────
--  6. VISITA MATERNIDADE
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS visita_maternidade (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  co_cidadao  BIGINT      NOT NULL,
  data        DATE        NOT NULL,
  maternidade TEXT        NOT NULL,
  co_prof     BIGINT      NOT NULL,
  observacoes TEXT,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_visita_cidadao
  ON visita_maternidade (co_cidadao);


-- ────────────────────────────────────────────────────────────────
--  7. NOTIFICAÇÃO — push notification queue
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notificacao (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  co_cidadao  BIGINT      NOT NULL,
  titulo      TEXT        NOT NULL,
  mensagem    TEXT        NOT NULL,
  tipo        TEXT        NOT NULL CHECK (tipo IN ('consulta','exame','vacina','geral')),
  lida        BOOLEAN     NOT NULL DEFAULT false,
  data        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notificacao_cidadao_lida
  ON notificacao (co_cidadao, lida);


-- ────────────────────────────────────────────────────────────────
--  8. CASO SÍFILIS
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS caso_sifilis (
  id                    UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  co_cidadao            BIGINT    NOT NULL,
  classificacao         TEXT      NOT NULL
                        CHECK (classificacao IN ('recente','tardia','indeterminada')),
  data_deteccao         DATE      NOT NULL,
  ig_deteccao_semanas   SMALLINT,
  tratamento_iniciado   BOOLEAN   NOT NULL DEFAULT false,
  tratamento_concluido  BOOLEAN   NOT NULL DEFAULT false,
  parceiro_tratado      BOOLEAN   NOT NULL DEFAULT false,
  criado_em             TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sifilis_cidadao
  ON caso_sifilis (co_cidadao);
