-- ════════════════════════════════════════════════════════════════
--  Mãe Salvador — Dados Complementares Cidadão PEC
--  Migration 005: Supplemental citizen data from PEC export
-- ════════════════════════════════════════════════════════════════
--
--  Stores citizen data exported from PEC (dados_primarios_cidadao_pec)
--  to fill gaps in the live e-SUS DW tables — primarily missing CPFs,
--  mother's name, birth date, and name corrections.
--
--  Matched to gestantes by normalised name + birth date, or by CPF.
--  Safe to re-run (IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS cidadao_dados_pec (
  id                      UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  no_usuario              TEXT    NOT NULL,
  no_usuario_normalizado  TEXT    NOT NULL,
  no_mae                  TEXT,
  dt_nascimento           DATE,
  nu_cpf                  TEXT,
  criado_em               TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fast lookup by normalised name + birth date (primary matching key)
CREATE UNIQUE INDEX IF NOT EXISTS idx_cidadao_pec_nome_nasc
  ON cidadao_dados_pec (no_usuario_normalizado, dt_nascimento)
  WHERE dt_nascimento IS NOT NULL;

-- Fast lookup by CPF (non-unique: PEC data may have shared CPFs)
CREATE INDEX IF NOT EXISTS idx_cidadao_pec_cpf
  ON cidadao_dados_pec (nu_cpf) WHERE nu_cpf IS NOT NULL;
