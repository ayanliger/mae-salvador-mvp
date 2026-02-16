-- ════════════════════════════════════════════════════════════════
--  Mãe Salvador — Cadastro Gestante
--  Migration 003: Registration table (mae_salvador database)
-- ════════════════════════════════════════════════════════════════
--
--  Stores full registration data submitted from the dashboard
--  (by healthcare professionals) or from the mobile app
--  (self-registration by gestantes).
--
--  Safe to re-run (IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS cadastro_gestante (
  id                        UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identificação (CPF ou CNS obrigatório — validado na app layer)
  cpf                       TEXT,
  cns                       TEXT,
  nome_completo             TEXT        NOT NULL,
  nome_social               TEXT,
  identidade_genero         TEXT,
  orientacao_sexual         TEXT,
  data_nascimento           DATE,
  telefone                  TEXT        NOT NULL,
  tem_whatsapp              BOOLEAN     NOT NULL DEFAULT false,

  -- Endereço
  logradouro                TEXT        NOT NULL,
  numero                    TEXT        NOT NULL,
  complemento               TEXT,
  bairro                    TEXT        NOT NULL,
  cep                       TEXT        NOT NULL,
  distrito_sanitario_id     TEXT,

  -- Gestação
  descobrimento_gestacao    TEXT        NOT NULL
                            CHECK (descobrimento_gestacao IN ('teste-rapido','beta-hcg','atraso-menstrual')),
  dum                       DATE,
  programa_social           TEXT        NOT NULL DEFAULT 'nenhum'
                            CHECK (programa_social IN ('nenhum','bolsa-familia','bpc-loas','aluguel-social','outros')),
  nis                       TEXT,
  plano_saude               TEXT        CHECK (plano_saude IS NULL OR plano_saude IN ('sim','nao')),
  manter_acompanhamento_ubs TEXT        CHECK (manter_acompanhamento_ubs IS NULL OR manter_acompanhamento_ubs IN ('sim','nao')),

  -- UBS
  ubs_id                    TEXT        NOT NULL,

  -- Histórico obstétrico (facultativo)
  gestacoes_previas         SMALLINT,
  partos_cesareo            SMALLINT,
  partos_normal             SMALLINT,
  abortos                   SMALLINT,

  -- Saúde (facultativo)
  alergias                  TEXT,
  doencas_conhecidas        TEXT,
  medicacoes_em_uso         TEXT,

  -- Meta
  origem                    TEXT        NOT NULL CHECK (origem IN ('dashboard','mobile')),
  status                    TEXT        NOT NULL DEFAULT 'pendente'
                            CHECK (status IN ('pendente','aprovado','recusado')),
  criado_em                 TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em             TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prevent duplicate registrations by CPF or CNS
CREATE UNIQUE INDEX IF NOT EXISTS idx_cadastro_gestante_cpf
  ON cadastro_gestante (cpf) WHERE cpf IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_cadastro_gestante_cns
  ON cadastro_gestante (cns) WHERE cns IS NOT NULL;

-- Fast lookup by registration status
CREATE INDEX IF NOT EXISTS idx_cadastro_gestante_status
  ON cadastro_gestante (status);
