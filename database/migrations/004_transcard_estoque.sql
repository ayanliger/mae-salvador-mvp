-- ════════════════════════════════════════════════════════════════
--  Mãe Salvador — Transcard Estoque (card inventory)
--  Migration 004: Physical Transcard numbers available per UBS
-- ════════════════════════════════════════════════════════════════
--
--  Each row represents a pre-printed physical Transcard.
--  Cards are distributed to UBSs in batches and consumed
--  (disponivel → false) when assigned to a gestante.

CREATE TABLE IF NOT EXISTS transcard_estoque (
  id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_transcard TEXT    UNIQUE NOT NULL,
  ubs_cnes         TEXT    NOT NULL,
  disponivel       BOOLEAN NOT NULL DEFAULT true,
  criado_em        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transcard_estoque_ubs_disp
  ON transcard_estoque (ubs_cnes) WHERE disponivel = true;
