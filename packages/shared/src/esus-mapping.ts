/**
 * ════════════════════════════════════════════════════════════════
 *  e-SUS AB PEC → Mãe Salvador  —  Data Mapping Specification
 * ════════════════════════════════════════════════════════════════
 *
 * The e-SUS schema uses audit-trail tables (`ta_*`). Each row has:
 *   - co_seq_ta*        → surrogate PK of the audit row
 *   - co_tipo_auditoria → 'I' (insert), 'A' (update), 'E' (delete)
 *   - dt_auditoria      → timestamp of the audit event
 *   - co_seq_*          → the actual entity PK
 *
 * To get current state: select the latest row per entity where
 * co_tipo_auditoria != 'E'.
 *
 * Reference/lookup tables (`tb_*`) hold static data (CBO codes,
 * imunobiológicos, etc.) and don't need audit filtering.
 *
 * ── Naming conventions ─────────────────────────────────────────
 *   co_  → código (FK or PK)
 *   no_  → nome (text name)
 *   nu_  → número (numeric string, e.g. CPF, CNS)
 *   dt_  → data/timestamp
 *   ds_  → descrição (longer text)
 *   st_  → status/flag (int4, typically 0/1)
 *   tp_  → tipo (type enum, usually FK to lookup)
 *   qt_  → quantidade
 *   vl_  → valor (numeric value)
 */

// ── Re-export app types for reference ──────────────────────────

import type {
  Gestante, ConsultaPreNatal, Exame, Vacina, Medicacao,
  Profissional, UBS, Equipe,
} from "./types";

// ════════════════════════════════════════════════════════════════
//  1. GESTANTE  ←  ta_cidadao + ta_pre_natal + ta_antecedente
//                   + ta_prontuario + ta_cidadao_vinculacao_equipe
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_cidadao (latest non-deleted audit record) */
export interface RawEsusCidadao {
  co_seq_cidadao: number;
  // ── Demographics ──
  no_cidadao: string;              // → Gestante.nomeCompleto
  nu_cpf: string | null;           // → Gestante.cpf
  nu_cns: string | null;           // → Gestante.cns
  dt_nascimento: string;           // → Gestante.dataNascimento (date)
  no_sexo: string | null;          // filter: only 'Feminino'
  no_tipo_sanguineo: string | null;// → Gestante.tipoSanguineo
  co_raca_cor: number | null;      // → FK to tb_raca_cor → Gestante.racaCor
  co_escolaridade: number | null;
  co_estado_civil: number | null;
  // ── Contact ──
  nu_telefone_celular: string | null; // → Gestante.telefone
  ds_email: string | null;            // → Gestante.email
  // ── Address ──
  ds_logradouro: string | null;    // → Gestante.endereco.logradouro
  nu_numero: string | null;        // → Gestante.endereco.numero
  ds_complemento: string | null;   // → Gestante.endereco.complemento
  no_bairro: string | null;        // → Gestante.endereco.bairro
  ds_cep: string | null;           // → Gestante.endereco.cep
  // ── Status ──
  st_ativo: number;                // 1 = active → Gestante.ativa
  st_faleceu: number;
  dt_obito: string | null;
}

/**
 * Column mapping: ta_cidadao → Gestante
 *
 *  e-SUS column              →  Gestante field              Notes
 *  ─────────────────────────────────────────────────────────────
 *  co_seq_cidadao            →  id (as string)              PK
 *  no_cidadao                →  nomeCompleto
 *  nu_cpf                    →  cpf                         format: 11 digits, no mask
 *  nu_cns                    →  cns                         16 chars
 *  dt_nascimento             →  dataNascimento              ISO date
 *  nu_telefone_celular       →  telefone
 *  ds_email                  →  email
 *  ds_logradouro             →  endereco.logradouro
 *  nu_numero                 →  endereco.numero
 *  ds_complemento            →  endereco.complemento
 *  no_bairro                 →  endereco.bairro
 *  ds_cep                    →  endereco.cep
 *  no_tipo_sanguineo         →  tipoSanguineo               already human-readable
 *  co_raca_cor               →  racaCor                     FK → tb_raca_cor.no_raca_cor
 *  st_ativo                  →  ativa                       1 → true
 */
export const CIDADAO_FIELD_MAP = {
  co_seq_cidadao:         "id",
  no_cidadao:             "nomeCompleto",
  nu_cpf:                 "cpf",
  nu_cns:                 "cns",
  dt_nascimento:          "dataNascimento",
  nu_telefone_celular:    "telefone",
  ds_email:               "email",
  ds_logradouro:          "endereco.logradouro",
  nu_numero:              "endereco.numero",
  ds_complemento:         "endereco.complemento",
  no_bairro:              "endereco.bairro",
  ds_cep:                 "endereco.cep",
  no_tipo_sanguineo:      "tipoSanguineo",
  co_raca_cor:            "racaCor",          // needs lookup join
  st_ativo:               "ativa",            // 1 → true
} as const;

/** Raw row from ta_pre_natal */
export interface RawEsusPreNatal {
  co_seq_pre_natal: number;
  co_prontuario: number;           // → links to ta_prontuario → co_cidadao
  co_problema: number | null;      // FK to ta_problema
  tp_gravidez: number | null;      // FK to lookup (1=única, 2=dupla, 3=tripla+)
  dt_ultima_menstruacao: string | null; // → Gestante.dum
  dt_desfecho: string | null;      // when pregnancy ended
  st_gravidez_planejada: number | null;
  st_alto_risco: number | null;    // → Gestante.riscoGestacional ('alto' if 1)
  co_unico_pre_natal: number | null;
}

/**
 * Column mapping: ta_pre_natal → Gestante (pregnancy fields)
 *
 *  e-SUS column              →  Gestante field              Notes
 *  ─────────────────────────────────────────────────────────────
 *  dt_ultima_menstruacao     →  dum                         ISO date
 *  (computed: DUM + 280 d)  →  dpp                         Naegele's rule
 *  (computed from DUM)      →  idadeGestacionalSemanas     floor((today - DUM) / 7)
 *  st_alto_risco             →  riscoGestacional            1→'alto', else 'habitual'
 *  dt_desfecho               →  (if set, pregnancy ended)
 */
export const PRE_NATAL_FIELD_MAP = {
  dt_ultima_menstruacao:  "dum",
  st_alto_risco:          "riscoGestacional",  // 1 → "alto", 0/null → "habitual"
} as const;

/** Raw row from ta_antecedente (obstetric history) */
export interface RawEsusAntecedente {
  co_prontuario: number;
  ds_gestacao: string | null;      // → Gestante.gestacoes (parse as number)
  ds_parto: string | null;         // → Gestante.partos
  qt_aborto: string | null;        // → Gestante.abortos
  ds_filho_vivo: string | null;    // → Gestante.filhosVivos
  ds_cesaria: string | null;
  ds_natimorto: string | null;
  dt_ultimo_parto: string | null;
}

/**
 * Column mapping: ta_antecedente → Gestante (obstetric history)
 *
 *  e-SUS column     →  Gestante field     Notes
 *  ──────────────────────────────────────────────────
 *  ds_gestacao      →  gestacoes          parse to int
 *  ds_parto         →  partos             parse to int
 *  qt_aborto        →  abortos            parse to int
 *  ds_filho_vivo    →  filhosVivos        parse to int
 */
export const ANTECEDENTE_FIELD_MAP = {
  ds_gestacao:    "gestacoes",
  ds_parto:       "partos",
  qt_aborto:      "abortos",
  ds_filho_vivo:  "filhosVivos",
} as const;


// ════════════════════════════════════════════════════════════════
//  2. CONSULTA PRÉ-NATAL  ←  ta_atend + ta_atend_prof
//     + ta_atend_prof_pre_natal + ta_medicao + ta_agendado
//     + SOAP notes (ta_evolucao_*)
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_atend (encounter container) */
export interface RawEsusAtend {
  co_seq_atend: number;
  dt_inicio: string | null;        // encounter start
  dt_fim: string | null;           // encounter end
  st_atend: number | null;         // status
  co_prontuario: number | null;    // → links to cidadao
  co_unidade_saude: number | null; // → UBS
  co_agendado: number | null;      // → scheduling link
  co_equipe: number | null;
}

/** Raw row from ta_atend_prof (professional encounter) */
export interface RawEsusAtendProf {
  co_seq_atend_prof: number;
  co_atend: number;                // FK → ta_atend
  co_lotacao: number;              // FK → ta_lotacao (→ profissional + equipe + UBS)
  dt_inicio: string | null;        // → ConsultaPreNatal.data
  dt_fim: string | null;
  tp_atend_prof: number | null;    // type of encounter
  st_atend_prof: number | null;    // status (realizada, etc.)
  st_cancelado: number | null;
}

/** Raw row from ta_atend_prof_pre_natal */
export interface RawEsusAtendProfPreNatal {
  co_atend_prof_pre_natal: number;
  co_unico_pre_natal: number | null; // links to ta_pre_natal
  tp_edema: number | null;         // → ConsultaPreNatal.edema (FK to lookup)
  st_gravidez_planejada: number | null;
  st_movimentacao_fetal: number | null; // → ConsultaPreNatal.movimentosFetais
}

/** Raw row from ta_medicao (vitals measured during encounter) */
export interface RawEsusMedicao {
  co_seq_medicao: number;
  co_atend_prof: number;           // FK → ta_atend_prof
  dt_medicao: string | null;
  // ── Vital signs ──
  nu_medicao_peso: string | null;  // → ConsultaPreNatal.pesoKg (parse float)
  nu_medicao_altura: string | null;
  nu_medicao_pressao_arterial: string | null; // "120/80" → sistólica/diastólica
  nu_medicao_altura_uterina: string | null;   // → ConsultaPreNatal.alturaUterinaCm
  nu_medicao_batimnto_cardco_ftl: string | null; // → ConsultaPreNatal.bcf
  nu_medicao_frequencia_cardiaca: string | null;
  nu_medicao_temperatura: string | null;
  nu_medicao_imc: string | null;
  nu_medicao_glicemia: string | null;
  dt_ultima_menstruacao: string | null;
}

/**
 * Column mapping: ta_atend_prof + ta_medicao → ConsultaPreNatal
 *
 *  e-SUS source                              →  ConsultaPreNatal field
 *  ─────────────────────────────────────────────────────────────────────
 *  ta_atend_prof.co_seq_atend_prof           →  id
 *  ta_atend.co_prontuario → co_cidadao       →  gestanteId
 *  ta_atend_prof.co_lotacao → co_prof         →  profissionalId
 *  ta_atend.co_unidade_saude                  →  ubsId
 *  ta_atend_prof.dt_inicio                    →  data
 *  (computed from DUM)                        →  idadeGestacionalSemanas
 *  ta_atend_prof.st_atend_prof                →  status (map codes)
 *  ta_medicao.nu_medicao_peso                 →  pesoKg (parseFloat)
 *  ta_medicao.nu_medicao_pressao_arterial     →  pressaoSistolica / pressaoDiastolica
 *  ta_medicao.nu_medicao_altura_uterina       →  alturaUterinaCm (parseFloat)
 *  ta_medicao.nu_medicao_batimnto_cardco_ftl  →  bcf (parseInt)
 *  ta_atend_prof_pre_natal.tp_edema           →  edema (lookup)
 *  ta_atend_prof_pre_natal.st_movimentacao_fetal → movimentosFetais (1→true)
 *  ta_evolucao_subjetivo.ds_subjetivo         →  queixas
 *  ta_evolucao_plano.ds_plano                 →  conduta
 *  ta_evolucao_avaliacao.ds_avaliacao         →  observacoes
 */
export const CONSULTA_FIELD_MAP = {
  "ta_atend_prof.co_seq_atend_prof":                "id",
  "ta_atend_prof.dt_inicio":                        "data",
  "ta_atend_prof.st_atend_prof":                    "status",
  "ta_medicao.nu_medicao_peso":                     "pesoKg",
  "ta_medicao.nu_medicao_pressao_arterial":         "pressaoSistolica_pressaoDiastolica",
  "ta_medicao.nu_medicao_altura_uterina":           "alturaUterinaCm",
  "ta_medicao.nu_medicao_batimnto_cardco_ftl":      "bcf",
  "ta_atend_prof_pre_natal.tp_edema":               "edema",
  "ta_atend_prof_pre_natal.st_movimentacao_fetal":   "movimentosFetais",
  "ta_evolucao_subjetivo.ds_subjetivo":             "queixas",
  "ta_evolucao_plano.ds_plano":                     "conduta",
  "ta_evolucao_avaliacao.ds_avaliacao":             "observacoes",
} as const;

/**
 * Status mapping: ta_atend_prof.st_atend_prof → StatusConsulta
 *
 * The e-SUS status codes are numeric. Common mappings:
 *   1 → 'agendada'   (waiting)
 *   2 → 'realizada'  (completed)
 *   3 → 'faltou'     (no-show / cancelled)
 *
 * Note: Exact codes depend on the e-SUS version. Validate against
 * actual data before hardcoding.
 */
export const STATUS_ATEND_PROF_MAP: Record<number, string> = {
  1: "agendada",
  2: "realizada",
  3: "faltou",
};

/**
 * Edema mapping: ta_atend_prof_pre_natal.tp_edema → string
 */
export const EDEMA_MAP: Record<number, string> = {
  1: "ausente",
  2: "leve",
  3: "moderado",
  4: "grave",
};

/**
 * Blood pressure parsing: "120/80" → { sistolica: 120, diastolica: 80 }
 */
export function parsePressaoArterial(raw: string | null): { sistolica: number; diastolica: number } | null {
  if (!raw) return null;
  const parts = raw.split("/");
  if (parts.length !== 2) return null;
  const sistolica = parseInt(parts[0], 10);
  const diastolica = parseInt(parts[1], 10);
  if (isNaN(sistolica) || isNaN(diastolica)) return null;
  return { sistolica, diastolica };
}


// ════════════════════════════════════════════════════════════════
//  3. EXAME  ←  ta_requisicao_exame + ta_exame_requisitado
//     + specific result tables (ta_exame_hemoglobina_glicada, etc.)
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_exame_requisitado */
export interface RawEsusExameRequisitado {
  co_seq_exame_requisitado: number;
  co_requisicao_exame: number | null;  // FK → ta_requisicao_exame
  co_atend_prof_solicitacao: number | null; // who ordered
  co_atend_prof_resultado: number | null;   // who entered result
  co_proced: number | null;            // FK → tb_proced (procedure/exam type)
  co_prontuario: number | null;
  dt_solicitacao: string | null;       // → Exame.dataSolicitacao
  dt_resultado: string | null;         // → Exame.dataResultado
  dt_realizacao: string | null;
  ds_resultado: string | null;         // → Exame.resultado (free text)
  ds_observacao: string | null;        // → Exame.observacoes
  st_conferido: number | null;         // result verified
}

/** Raw row from ta_requisicao_exame */
export interface RawEsusRequisicaoExame {
  co_seq_requisicao_exame: number;
  co_atend_prof: number | null;
  dt_requisicao: string | null;
  ds_justificativa_procedimento: string | null;
  tp_exame: number | null;            // 1=laboratorio, 2=imagem
}

/**
 * Column mapping: ta_exame_requisitado + ta_requisicao_exame → Exame
 *
 *  e-SUS source                                  →  Exame field
 *  ─────────────────────────────────────────────────────────────────
 *  ta_exame_requisitado.co_seq_exame_requisitado →  id
 *  ta_prontuario.co_cidadao                      →  gestanteId
 *  ta_requisicao_exame.tp_exame                  →  tipo (1→'laboratorio', 2→'imagem')
 *  tb_proced.no_proced (via co_proced)           →  nome
 *  ta_exame_requisitado.dt_solicitacao           →  dataSolicitacao
 *  ta_exame_requisitado.dt_resultado             →  dataResultado
 *  ta_exame_requisitado.ds_resultado             →  resultado
 *  ta_exame_requisitado.ds_observacao            →  observacoes
 *  (derived from status logic)                   →  status
 *  (derived from IG at solicitacao)              →  trimestre
 *
 * Status derivation:
 *   - dt_resultado IS NOT NULL → 'resultado-disponivel'
 *   - dt_realizacao IS NOT NULL AND dt_resultado IS NULL → 'coletado'
 *   - else → 'solicitado'
 *
 * Specific result tables (for numeric values):
 *   ta_exame_hemoglobina_glicada  → vl_hemoglobina_glicada
 *   ta_exame_colesterol_total     → vl_colesterol_total
 *   ta_exame_colesterol_hdl       → vl_colesterol_hdl
 *   ta_exame_colesterol_ldl       → vl_colesterol_ldl
 *   ta_exame_triglicerideos       → vl_triglicerideos
 *   ta_exame_creatina_serica      → vl_creatina_serica
 *   ta_exame_clearance_creatina   → vl_clearance_creatina
 *   ta_exame_prenatal             → qt_semana_gestacional_eco, dt_provavel_parto_eco
 *   ta_exame_puericultura         → (childcare exam results)
 *
 * These join via co_exame_requisitado FK.
 */
export const EXAME_FIELD_MAP = {
  "ta_exame_requisitado.co_seq_exame_requisitado": "id",
  "ta_exame_requisitado.dt_solicitacao":           "dataSolicitacao",
  "ta_exame_requisitado.dt_resultado":             "dataResultado",
  "ta_exame_requisitado.ds_resultado":             "resultado",
  "ta_exame_requisitado.ds_observacao":            "observacoes",
  "ta_requisicao_exame.tp_exame":                  "tipo",
} as const;

export const TIPO_EXAME_MAP: Record<number, string> = {
  1: "laboratorio",
  2: "imagem",
};


// ════════════════════════════════════════════════════════════════
//  4. VACINA  ←  ta_vacinacao + ta_registro_vacinacao
//     + ta_imunobiologico_lote
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_registro_vacinacao */
export interface RawEsusRegistroVacinacao {
  co_seq_registro_vacinacao: number;
  co_vacinacao: number | null;       // FK → ta_vacinacao
  co_imunobiologico: number | null;  // FK → tb_imunobiologico → nome da vacina
  co_dose_imunobiologico: number | null; // FK → tb_dose_imunobiologico → dose label
  co_imunobiologico_lote: number | null; // FK → ta_imunobiologico_lote
  dt_aplicacao: string | null;       // → Vacina.dataAplicacao
  dt_aprazamento: string | null;     // → Vacina.dataPrevista (scheduled date)
  co_local_apl_vacina: number | null;
  st_registro_anterior: number | null; // historical record flag
}

/** Raw row from ta_vacinacao (vaccination session) */
export interface RawEsusVacinacao {
  co_seq_vacinacao: number;
  co_atend_prof: number | null;
  co_prontuario: number | null;       // → links to cidadao
  st_gestante: number | null;         // 1 = vaccine given during pregnancy
  st_puerpera: number | null;
}

/**
 * Column mapping: ta_registro_vacinacao + ta_vacinacao → Vacina
 *
 *  e-SUS source                                    →  Vacina field
 *  ────────────────────────────────────────────────────────────────
 *  ta_registro_vacinacao.co_seq_registro_vacinacao →  id
 *  ta_vacinacao.co_prontuario → co_cidadao         →  gestanteId
 *  tb_imunobiologico.no_imunobiologico             →  nome
 *  tb_dose_imunobiologico.sg_dose_imunobiologico   →  dose
 *  ta_registro_vacinacao.dt_aplicacao              →  dataAplicacao
 *  ta_registro_vacinacao.dt_aprazamento            →  dataPrevista
 *  ta_imunobiologico_lote.ds_lote                  →  lote
 *  (lookup via co_local_apl_vacina)                →  localAplicacao
 *
 * Status derivation:
 *   - dt_aplicacao IS NOT NULL → 'aplicada'
 *   - dt_aprazamento < today AND dt_aplicacao IS NULL → 'atrasada'
 *   - else → 'pendente'
 *
 * Filter: only rows where ta_vacinacao.st_gestante = 1 for prenatal vaccines.
 */
export const VACINA_FIELD_MAP = {
  "ta_registro_vacinacao.co_seq_registro_vacinacao": "id",
  "tb_imunobiologico.no_imunobiologico":             "nome",
  "tb_dose_imunobiologico.sg_dose_imunobiologico":   "dose",
  "ta_registro_vacinacao.dt_aplicacao":              "dataAplicacao",
  "ta_registro_vacinacao.dt_aprazamento":            "dataPrevista",
  "ta_imunobiologico_lote.ds_lote":                  "lote",
} as const;


// ════════════════════════════════════════════════════════════════
//  5. MEDICAÇÃO  ←  ta_receita_medicamento + ta_medicamento
//     + ta_medicamento_catmat + ta_medicamento_uso_continuo
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_receita_medicamento */
export interface RawEsusReceitaMedicamento {
  co_seq_receita_medicamento: number;
  co_atend_prof: number | null;       // FK → encounter
  co_medicamento: number | null;      // FK → ta_medicamento
  no_posologia: string | null;        // → Medicacao.frequencia (dosage instructions)
  ds_dose: string | null;             // → Medicacao.dosagem
  dt_inicio_tratamento: string | null; // → Medicacao.dataInicio
  dt_fim_tratamento: string | null;    // → Medicacao.dataFim
  st_uso_continuo: number | null;     // 1 = continuous use
  st_interrompido: number | null;     // 1 = interrupted → !Medicacao.ativa
  ds_recomendacao: string | null;     // → Medicacao.observacoes
  ds_observacao_interrupcao: string | null;
}

/** Raw row from ta_medicamento (medication catalog) */
export interface RawEsusMedicamento {
  co_seq_medicamento: number;
  no_principio_ativo: string | null;  // → Medicacao.nome
  ds_concentracao: string | null;     // e.g. "500mg"
  co_forma_farmaceutica: number | null;
  ds_unidade_fornecimento: string | null;
}

/**
 * Column mapping: ta_receita_medicamento + ta_medicamento → Medicacao
 *
 *  e-SUS source                                    →  Medicacao field
 *  ────────────────────────────────────────────────────────────────
 *  ta_receita_medicamento.co_seq_receita_medicamento → id
 *  ta_prontuario.co_cidadao (via atend_prof→atend) →  gestanteId
 *  ta_medicamento.no_principio_ativo               →  nome
 *  ta_receita_medicamento.ds_dose                  →  dosagem
 *  ta_receita_medicamento.no_posologia             →  frequencia
 *  ta_receita_medicamento.dt_inicio_tratamento     →  dataInicio
 *  ta_receita_medicamento.dt_fim_tratamento        →  dataFim
 *  ta_receita_medicamento.ds_recomendacao          →  observacoes
 *  (st_interrompido = 0 AND no active end date)    →  ativa
 *
 * For continuous-use medications, also check ta_medicamento_uso_continuo
 * which tracks the current active prescription per prontuário.
 */
export const MEDICACAO_FIELD_MAP = {
  "ta_receita_medicamento.co_seq_receita_medicamento": "id",
  "ta_medicamento.no_principio_ativo":                  "nome",
  "ta_receita_medicamento.ds_dose":                     "dosagem",
  "ta_receita_medicamento.no_posologia":                "frequencia",
  "ta_receita_medicamento.dt_inicio_tratamento":        "dataInicio",
  "ta_receita_medicamento.dt_fim_tratamento":           "dataFim",
  "ta_receita_medicamento.ds_recomendacao":             "observacoes",
} as const;


// ════════════════════════════════════════════════════════════════
//  6. PROFISSIONAL  ←  ta_prof + ta_lotacao + ta_ator_papel
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_prof */
export interface RawEsusProf {
  co_seq_prof: number;
  no_profissional: string;           // → Profissional.nomeCompleto
  nu_cpf: string | null;            // → Profissional.cpf
  nu_cns: string | null;            // → Profissional.cns
  nu_conselho_classe: string | null; // → Profissional.conselho
  co_conselho_classe: number | null; // FK → lookup table
  co_uf_emissora_conselho_classe: number | null;
  ds_email: string | null;
  nu_telefone: string | null;
  no_sexo: string | null;
}

/** Raw row from ta_lotacao (staff assignment) */
export interface RawEsusLotacao {
  co_seq_talotacao: number;
  co_cbo: number | null;            // FK → tb_cbo → Profissional.cbo
  co_prof: number | null;           // FK → ta_prof
  co_unidade_saude: number | null;  // FK → ta_unidade_saude → Profissional.ubsIds
  co_equipe: number | null;         // FK → ta_equipe
  co_ator_papel: number | null;     // FK → ta_ator_papel
  dt_desativacao_lotacao: string | null; // if set, assignment is inactive
}

/**
 * Column mapping: ta_prof + ta_lotacao → Profissional
 *
 *  e-SUS source                      →  Profissional field
 *  ─────────────────────────────────────────────────────────
 *  ta_prof.co_seq_prof               →  id
 *  ta_prof.no_profissional           →  nomeCompleto
 *  ta_prof.nu_cpf                    →  cpf
 *  ta_prof.nu_cns                    →  cns
 *  tb_cbo.nu_cbo (via ta_lotacao)    →  cbo
 *  ta_prof.nu_conselho_classe        →  conselho
 *  ta_lotacao.co_unidade_saude[]     →  ubsIds (array from active lotações)
 *
 * Role derivation (Profissional.papel):
 *   Derived from tb_cbo.nu_cbo:
 *     2251-* → 'medico'
 *     2235-* → 'enfermeiro'
 *     1312-* → 'gestor'
 *     else   → 'admin'
 */
export const PROF_FIELD_MAP = {
  "ta_prof.co_seq_prof":        "id",
  "ta_prof.no_profissional":    "nomeCompleto",
  "ta_prof.nu_cpf":             "cpf",
  "ta_prof.nu_cns":             "cns",
  "ta_prof.nu_conselho_classe": "conselho",
} as const;


// ════════════════════════════════════════════════════════════════
//  7. UBS  ←  ta_unidade_saude
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_unidade_saude */
export interface RawEsusUnidadeSaude {
  co_seq_unidade_saude: number;
  nu_cnes: string | null;           // → UBS.cnes
  no_unidade_saude: string | null;  // → UBS.nome
  tp_unidade_saude: number | null;  // → UBS.tipo (lookup)
  st_ativo: number | null;
  // ── Address ──
  ds_logradouro: string | null;
  nu_numero: string | null;
  ds_complemento: string | null;
  no_bairro: string | null;
  ds_cep: string | null;
  nu_telefone_comercial: string | null; // → UBS.telefone
}

/**
 * Column mapping: ta_unidade_saude → UBS
 *
 *  e-SUS column              →  UBS field
 *  ───────────────────────────────────────────
 *  co_seq_unidade_saude      →  id
 *  no_unidade_saude          →  nome
 *  nu_cnes                   →  cnes
 *  tp_unidade_saude          →  tipo (map code)
 *  ds_logradouro             →  endereco.logradouro
 *  nu_numero                 →  endereco.numero
 *  no_bairro                 →  endereco.bairro
 *  ds_cep                    →  endereco.cep
 *  nu_telefone_comercial     →  telefone
 *  (count of equipes)        →  equipesSF
 *
 * distritoSanitarioId: not directly in e-SUS — must be mapped from
 * the UBS address/bairro to the 12 distritos sanitários of Salvador.
 * This is Mãe Salvador–specific logic.
 */
export const UBS_FIELD_MAP = {
  "co_seq_unidade_saude":  "id",
  "no_unidade_saude":      "nome",
  "nu_cnes":               "cnes",
  "tp_unidade_saude":      "tipo",
  "nu_telefone_comercial": "telefone",
} as const;


// ════════════════════════════════════════════════════════════════
//  8. EQUIPE  ←  ta_equipe
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_equipe */
export interface RawEsusEquipe {
  co_seq_equipe: number;
  nu_ine: string | null;            // INE code
  no_equipe: string | null;         // → Equipe.nome
  co_unidade_saude: number | null;  // → Equipe.ubsId
  tp_equipe: number | null;         // → Equipe.tipo (map to 'eSF'|'eAP'|'eSB')
  st_ativo: number | null;
  ds_area: string | null;
}

/**
 * Column mapping: ta_equipe → Equipe
 *
 *  e-SUS column          →  Equipe field
 *  ──────────────────────────────────────
 *  co_seq_equipe         →  id
 *  no_equipe             →  nome
 *  co_unidade_saude      →  ubsId
 *  tp_equipe             →  tipo (lookup)
 */
export const EQUIPE_FIELD_MAP = {
  "co_seq_equipe":     "id",
  "no_equipe":         "nome",
  "co_unidade_saude":  "ubsId",
  "tp_equipe":         "tipo",
} as const;


// ════════════════════════════════════════════════════════════════
//  9. AGENDAMENTO  ←  ta_agendado
// ════════════════════════════════════════════════════════════════

/** Raw row from ta_agendado (scheduling) */
export interface RawEsusAgendado {
  co_seq_agendado: number;
  dt_agendado: string | null;        // scheduled date
  hr_inicial_agendado: string | null; // start time
  st_agendado: number | null;        // scheduling status
  co_lotacao_agendada: number | null; // FK → ta_lotacao (which professional)
  co_prontuario: number | null;      // FK → patient
  ds_observacao: string | null;
  st_fora_ubs: number | null;        // outside UBS flag
}


// ════════════════════════════════════════════════════════════════
//  10. JOIN PATHS  —  How tables connect
// ════════════════════════════════════════════════════════════════
//
//  Gestante assembly:
//    ta_cidadao ──(co_seq_cidadao)──→ ta_prontuario.co_cidadao
//    ta_prontuario ──(co_seq_prontuario)──→ ta_pre_natal.co_prontuario
//    ta_prontuario ──(co_seq_prontuario)──→ ta_antecedente.co_prontuario
//    ta_cidadao ──(co_seq_cidadao)──→ ta_cidadao_vinculacao_equipe.co_cidadao
//    ta_prontuario ──(co_seq_prontuario)──→ ta_problema.co_prontuario
//
//  Consulta assembly:
//    ta_atend_prof ──(co_atend)──→ ta_atend.co_seq_atend
//    ta_atend ──(co_prontuario)──→ ta_prontuario → ta_cidadao
//    ta_atend_prof ──(co_lotacao)──→ ta_lotacao → ta_prof + ta_equipe + ta_unidade_saude
//    ta_atend_prof ──(co_seq_atend_prof)──→ ta_atend_prof_pre_natal.co_atend_prof_pre_natal
//    ta_atend_prof ──(co_seq_atend_prof)──→ ta_medicao.co_atend_prof
//    ta_atend_prof ──(co_seq_atend_prof)──→ ta_evolucao_subjetivo.co_atend_prof
//    ta_atend_prof ──(co_seq_atend_prof)──→ ta_evolucao_objetivo.co_atend_prof
//    ta_atend_prof ──(co_seq_atend_prof)──→ ta_evolucao_avaliacao.co_atend_prof
//    ta_atend_prof ──(co_seq_atend_prof)──→ ta_evolucao_plano.co_atend_prof
//
//  Exame assembly:
//    ta_exame_requisitado ──(co_requisicao_exame)──→ ta_requisicao_exame.co_seq_requisicao_exame
//    ta_exame_requisitado ──(co_prontuario)──→ ta_prontuario → ta_cidadao
//    ta_exame_requisitado ──(co_proced)──→ tb_proced (exam name)
//    ta_exame_requisitado ←──(co_exame_requisitado)── ta_exame_hemoglobina_glicada (etc.)
//
//  Vacina assembly:
//    ta_registro_vacinacao ──(co_vacinacao)──→ ta_vacinacao.co_seq_vacinacao
//    ta_vacinacao ──(co_prontuario)──→ ta_prontuario → ta_cidadao
//    ta_registro_vacinacao ──(co_imunobiologico)──→ tb_imunobiologico
//    ta_registro_vacinacao ──(co_dose_imunobiologico)──→ tb_dose_imunobiologico
//    ta_registro_vacinacao ──(co_imunobiologico_lote)──→ ta_imunobiologico_lote
//
//  Medicação assembly:
//    ta_receita_medicamento ──(co_atend_prof)──→ ta_atend_prof → ta_atend → ta_prontuario → ta_cidadao
//    ta_receita_medicamento ──(co_medicamento)──→ ta_medicamento
//    ta_medicamento ──(co_seq_medicamento)──→ ta_medicamento_catmat (CATMAT codes)
//    ta_prontuario ──(co_seq_prontuario)──→ ta_medicamento_uso_continuo.co_prontuario
//
//  Profissional assembly:
//    ta_prof ──(co_seq_prof)──→ ta_lotacao.co_prof
//    ta_lotacao ──(co_cbo)──→ tb_cbo
//    ta_lotacao ──(co_unidade_saude)──→ ta_unidade_saude
//    ta_lotacao ──(co_equipe)──→ ta_equipe
//    ta_lotacao ──(co_ator_papel)──→ ta_ator_papel → ta_ator_papel_perfil


// ════════════════════════════════════════════════════════════════
//  11. DATA NOT IN e-SUS  —  Needs application database
// ════════════════════════════════════════════════════════════════
//
//  The following Mãe Salvador domain types have NO equivalent in e-SUS:
//
//  ┌─────────────────────────┬──────────────────────────────────────────┐
//  │ App Type                │ Why it's not in e-SUS                    │
//  ├─────────────────────────┼──────────────────────────────────────────┤
//  │ TranscardVinculacao     │ Mãe Salvador program-specific enrollment │
//  │ AtividadeEducativa      │ Could partially map to ta_atividade_     │
//  │                         │ coletiva but program-specific fields     │
//  │                         │ (etapas) are not in e-SUS                │
//  │ VisitaMaternidade       │ Program-specific visit tracking          │
//  │ CasoSifilis             │ e-SUS has SINAN notifications but not    │
//  │                         │ the treatment tracking structure          │
//  │ IndicadorPrevine        │ Aggregated/computed — build from queries │
//  │ KPIsGestor              │ Aggregated/computed — build from queries │
//  │ Notificacao             │ App-specific push notification system    │
//  │ RegistroPeso            │ Can derive from ta_medicao history       │
//  │ DistritoSanitario       │ Salvador-specific — hardcode constants   │
//  └─────────────────────────┴──────────────────────────────────────────┘
//
//  RegistroPeso CAN be derived from ta_medicao by querying all weight
//  measurements for a gestante's prenatal encounters, ordered by date.


// ════════════════════════════════════════════════════════════════
//  12. HELPER: Gestational age computation
// ════════════════════════════════════════════════════════════════

/** Compute gestational age in weeks from DUM */
export function computeIdadeGestacional(dum: string, referenceDate?: string): number {
  const dumDate = new Date(dum);
  const ref = referenceDate ? new Date(referenceDate) : new Date();
  const diffMs = ref.getTime() - dumDate.getTime();
  return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
}

/** Compute DPP (expected delivery date) using Naegele's rule: DUM + 280 days */
export function computeDPP(dum: string): string {
  const dumDate = new Date(dum);
  dumDate.setDate(dumDate.getDate() + 280);
  return dumDate.toISOString().slice(0, 10);
}

/** Determine trimestre from gestational age in weeks */
export function computeTrimestre(semanas: number): 1 | 2 | 3 {
  if (semanas <= 13) return 1;
  if (semanas <= 27) return 2;
  return 3;
}
