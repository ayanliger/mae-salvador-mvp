/**
 * Data access layer — currently backed by mock data.
 *
 * Every function is async so the call-sites don't change when we swap
 * to real PostgreSQL queries (via esus-queries.ts or an app-DB pool).
 *
 * To switch a function to a real DB:
 *   1. Import the relevant QUERY_* from @mae-salvador/shared/esus-queries
 *   2. Replace the mock-data logic with pool.query(QUERY_*, params)
 *   3. Map the raw rows through the field-maps in esus-mapping.ts
 */

import type {
  Gestante,
  ConsultaPreNatal,
  Exame,
  Vacina,
  Medicacao,
  Profissional,
  UBS,
  Equipe,
  KPIsGestor,
  IndicadorPrevine,
  CasoSifilis,
  TranscardVinculacao,
  AtividadeEducativa,
  VisitaMaternidade,
  RegistroPeso,
  Notificacao,
  RiscoGestacional,
} from "@mae-salvador/shared";

import {
  MOCK_GESTANTES,
  MOCK_CONSULTAS,
  MOCK_EXAMES,
  MOCK_VACINAS,
  MOCK_MEDICACOES,
  MOCK_PROFISSIONAIS,
  MOCK_TRANSCARD,
  MOCK_ATIVIDADES_EDUCATIVAS,
  MOCK_VISITAS_MATERNIDADE,
  MOCK_CASOS_SIFILIS,
  MOCK_INDICADORES_PREVINE,
  MOCK_KPIS,
  MOCK_DADOS_UBS,
  MOCK_TENDENCIA_MENSAL,
  MOCK_REGISTROS_PESO,
  MOCK_NOTIFICACOES,
  UBS_LIST,
  EQUIPES,
} from "@mae-salvador/shared";

// ── Filter types ───────────────────────────────────────

export interface GestantesFilter {
  search?: string;
  risco?: RiscoGestacional;
  ubsId?: string;
  equipeId?: string;
  ativa?: boolean;
}

// ── Gestantes ──────────────────────────────────────────

export async function getGestantes(
  filters?: GestantesFilter,
): Promise<Gestante[]> {
  let result = MOCK_GESTANTES;

  if (filters) {
    if (filters.ativa !== undefined) {
      result = result.filter((g) => g.ativa === filters.ativa);
    }
    if (filters.risco) {
      result = result.filter((g) => g.riscoGestacional === filters.risco);
    }
    if (filters.ubsId) {
      result = result.filter((g) => g.ubsId === filters.ubsId);
    }
    if (filters.equipeId) {
      result = result.filter((g) => g.equipeId === filters.equipeId);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (g) =>
          g.nomeCompleto.toLowerCase().includes(q) || g.cpf.includes(q),
      );
    }
  }

  return result;
}

export async function getGestanteById(
  id: string,
): Promise<Gestante | null> {
  return MOCK_GESTANTES.find((g) => g.id === id) ?? null;
}

// ── Sub-resources by gestante ──────────────────────────

export async function getConsultasByGestante(
  gestanteId: string,
): Promise<ConsultaPreNatal[]> {
  return MOCK_CONSULTAS.filter((c) => c.gestanteId === gestanteId).sort(
    (a, b) => b.data.localeCompare(a.data),
  );
}

export async function getExamesByGestante(
  gestanteId: string,
): Promise<Exame[]> {
  return MOCK_EXAMES.filter((e) => e.gestanteId === gestanteId).sort(
    (a, b) => b.dataSolicitacao.localeCompare(a.dataSolicitacao),
  );
}

export async function getVacinasByGestante(
  gestanteId: string,
): Promise<Vacina[]> {
  return MOCK_VACINAS.filter((v) => v.gestanteId === gestanteId);
}

export async function getMedicacoesByGestante(
  gestanteId: string,
): Promise<Medicacao[]> {
  return MOCK_MEDICACOES.filter((m) => m.gestanteId === gestanteId);
}

export async function getTranscardByGestante(
  gestanteId: string,
): Promise<TranscardVinculacao | null> {
  return MOCK_TRANSCARD.find((t) => t.gestanteId === gestanteId) ?? null;
}

export async function getAtividadesByGestante(
  gestanteId: string,
): Promise<AtividadeEducativa[]> {
  return MOCK_ATIVIDADES_EDUCATIVAS.filter(
    (a) => a.gestanteId === gestanteId,
  ).sort((a, b) => b.data.localeCompare(a.data));
}

export async function getVisitasByGestante(
  gestanteId: string,
): Promise<VisitaMaternidade[]> {
  return MOCK_VISITAS_MATERNIDADE.filter(
    (v) => v.gestanteId === gestanteId,
  ).sort((a, b) => b.data.localeCompare(a.data));
}

export async function getRegistrosPesoByGestante(
  gestanteId: string,
): Promise<RegistroPeso[]> {
  // Mock data is implicitly for gest-001 (Adriana)
  return gestanteId === "gest-001" ? MOCK_REGISTROS_PESO : [];
}

export async function getNotificacoesByGestante(
  gestanteId: string,
): Promise<Notificacao[]> {
  return MOCK_NOTIFICACOES.filter((n) => n.gestanteId === gestanteId).sort(
    (a, b) => b.data.localeCompare(a.data),
  );
}

// ── Profissionais ──────────────────────────────────────

export async function getProfissionais(): Promise<Profissional[]> {
  return MOCK_PROFISSIONAIS;
}

export async function getProfissionalById(
  id: string,
): Promise<Profissional | null> {
  return MOCK_PROFISSIONAIS.find((p) => p.id === id) ?? null;
}

// ── UBS & Equipes ──────────────────────────────────────

export async function getUbsList(): Promise<UBS[]> {
  return UBS_LIST;
}

export async function getEquipesByUbs(ubsId: string): Promise<Equipe[]> {
  return EQUIPES.filter((e) => e.ubsId === ubsId);
}

// ── Gestor dashboard ───────────────────────────────────

export async function getKPIs(): Promise<KPIsGestor> {
  return MOCK_KPIS;
}

export async function getIndicadoresPrevine(): Promise<IndicadorPrevine[]> {
  return MOCK_INDICADORES_PREVINE;
}

export async function getCasosSifilis(): Promise<CasoSifilis[]> {
  return MOCK_CASOS_SIFILIS;
}

export async function getDadosUbs() {
  return MOCK_DADOS_UBS;
}

export async function getTendenciaMensal() {
  return MOCK_TENDENCIA_MENSAL;
}
