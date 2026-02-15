import type {
  Gestante, ConsultaPreNatal, Exame, Vacina, Medicacao,
  Profissional, Notificacao, RegistroPeso, KPIsGestor,
  TranscardVinculacao, AtividadeEducativa, VisitaMaternidade,
  CasoSifilis, IndicadorPrevine,
} from "./types";
import { UBS_LIST, MATERNIDADES } from "./constants";

// ── Helpers ────────────────────────────────────────────

function isoDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

// ── Profissionais ──────────────────────────────────────

export const MOCK_PROFISSIONAIS: Profissional[] = [
  {
    id: "prof-001", nomeCompleto: "Dra. Ana Beatriz Souza", cpf: "111.222.333-44",
    cns: "898001234567890", papel: "medico", cbo: "2251-25", conselho: "CRM-BA 12345",
    ubsIds: ["ubs-001", "ubs-002"],
  },
  {
    id: "prof-002", nomeCompleto: "Enf. Carla Santos Oliveira", cpf: "222.333.444-55",
    cns: "898002345678901", papel: "enfermeiro", cbo: "2235-05", conselho: "COREN-BA 67890",
    ubsIds: ["ubs-001"],
  },
  {
    id: "prof-003", nomeCompleto: "Dr. Roberto Lima Nascimento", cpf: "333.444.555-66",
    cns: "898003456789012", papel: "medico", cbo: "2251-25", conselho: "CRM-BA 54321",
    ubsIds: ["ubs-003", "ubs-004"],
  },
  {
    id: "prof-004", nomeCompleto: "Maria Helena Ferreira", cpf: "444.555.666-77",
    papel: "gestor", cbo: "1312-10", ubsIds: ["ubs-001", "ubs-002", "ubs-003", "ubs-004", "ubs-005", "ubs-006", "ubs-007", "ubs-008"],
  },
];

// ── Gestantes ──────────────────────────────────────────

export const MOCK_GESTANTES: Gestante[] = [
  {
    id: "gest-001", nomeCompleto: "Adriana Conceição Silva", cpf: "987.654.321-00",
    cns: "700001234567890", dataNascimento: "1995-03-12", telefone: "(71) 98812-3456",
    email: "adriana.silva@email.com",
    endereco: { logradouro: "Rua da Alegria", numero: "42", bairro: "Bairro da Paz", cep: "41512-010", distritoSanitarioId: "ds-08" },
    tipoSanguineo: "O+", gestacoes: 2, partos: 1, abortos: 0, filhosVivos: 1,
    dum: "2025-08-15", dpp: "2026-05-22", idadeGestacionalSemanas: 26,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-001", maternidadeReferencia: MATERNIDADES[0], profissionalResponsavelId: "prof-002",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "parda", equipeId: "eq-001",
    dataCadastro: "2025-09-10", ativa: true,
  },
  {
    id: "gest-002", nomeCompleto: "Beatriz Santos Nascimento", cpf: "876.543.210-11",
    cns: "700002345678901", dataNascimento: "1990-07-28", telefone: "(71) 99934-5678",
    endereco: { logradouro: "Travessa do Sol", numero: "15", bairro: "Cajazeiras", cep: "41340-020", distritoSanitarioId: "ds-12" },
    tipoSanguineo: "A+", gestacoes: 3, partos: 2, abortos: 0, filhosVivos: 2,
    dum: "2025-06-01", dpp: "2026-03-08", idadeGestacionalSemanas: 37,
    riscoGestacional: "alto", fatoresRisco: ["Hipertensão arterial crônica", "Idade materna ≥ 35 anos"],
    ubsId: "ubs-002", maternidadeReferencia: MATERNIDADES[1], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-003",
    dataCadastro: "2025-07-15", ativa: true,
  },
  {
    id: "gest-003", nomeCompleto: "Camila Ferreira dos Santos", cpf: "765.432.109-22",
    cns: "700003456789012", dataNascimento: "2000-11-05", telefone: "(71) 98765-4321",
    endereco: { logradouro: "Rua do Pelourinho", numero: "88", bairro: "Pelourinho", cep: "40026-100", distritoSanitarioId: "ds-01" },
    tipoSanguineo: "B+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-10-20", dpp: "2026-07-27", idadeGestacionalSemanas: 17,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-003", maternidadeReferencia: MATERNIDADES[2], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "branca", equipeId: "eq-005",
    dataCadastro: "2025-11-05", ativa: true,
  },
  {
    id: "gest-004", nomeCompleto: "Daniela Oliveira Lima", cpf: "654.321.098-33",
    dataNascimento: "1988-01-20", telefone: "(71) 99876-5432",
    endereco: { logradouro: "Av. Suburbana", numero: "200", bairro: "Pau da Lima", cep: "41235-010", distritoSanitarioId: "ds-10" },
    tipoSanguineo: "AB-", gestacoes: 4, partos: 2, abortos: 1, filhosVivos: 2,
    dum: "2025-07-10", dpp: "2026-04-16", idadeGestacionalSemanas: 31,
    riscoGestacional: "alto", fatoresRisco: ["Diabetes gestacional", "Pré-eclâmpsia em gestação anterior", "Idade materna ≥ 35 anos"],
    ubsId: "ubs-004", maternidadeReferencia: MATERNIDADES[3], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-006",
    dataCadastro: "2025-08-01", ativa: true,
  },
  {
    id: "gest-005", nomeCompleto: "Elaine Ribeiro Souza", cpf: "543.210.987-44",
    dataNascimento: "1997-09-15", telefone: "(71) 98654-3210",
    endereco: { logradouro: "Rua do Cabula", numero: "67", bairro: "Cabula", cep: "41150-030", distritoSanitarioId: "ds-09" },
    tipoSanguineo: "O-", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-09-01", dpp: "2026-06-08", idadeGestacionalSemanas: 24,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-005", maternidadeReferencia: MATERNIDADES[4], profissionalResponsavelId: "prof-002",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "parda", equipeId: "eq-008",
    dataCadastro: "2025-10-01", ativa: true,
  },
  {
    id: "gest-006", nomeCompleto: "Fernanda Almeida Costa", cpf: "432.109.876-55",
    dataNascimento: "1993-04-22", telefone: "(71) 99543-2109",
    endereco: { logradouro: "Rua da Liberdade", numero: "130", bairro: "Liberdade", cep: "40325-010", distritoSanitarioId: "ds-04" },
    tipoSanguineo: "A-", gestacoes: 2, partos: 1, abortos: 0, filhosVivos: 1,
    dum: "2025-11-01", dpp: "2026-08-08", idadeGestacionalSemanas: 15,
    riscoGestacional: "alto", fatoresRisco: ["Anemia falciforme"],
    ubsId: "ubs-006", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: false, bolsaFamilia: false, racaCor: "amarela", equipeId: "eq-009",
    dataCadastro: "2025-12-01", ativa: true,
  },
];

// ── Consultas ──────────────────────────────────────────

export const MOCK_CONSULTAS: ConsultaPreNatal[] = [
  // Adriana — 5 consultas realizadas
  {
    id: "cons-001", gestanteId: "gest-001", profissionalId: "prof-002", ubsId: "ubs-001",
    data: "2025-09-25", idadeGestacionalSemanas: 6, status: "realizada",
    pesoKg: 62.5, pressaoSistolica: 110, pressaoDiastolica: 70, bcf: undefined,
    queixas: "Náuseas matinais", conduta: "Orientação alimentar, prescrição de ácido fólico",
  },
  {
    id: "cons-002", gestanteId: "gest-001", profissionalId: "prof-002", ubsId: "ubs-001",
    data: "2025-10-30", idadeGestacionalSemanas: 11, status: "realizada",
    pesoKg: 63.1, pressaoSistolica: 115, pressaoDiastolica: 72, bcf: 152,
    conduta: "Solicitação de exames do 1º trimestre",
  },
  {
    id: "cons-003", gestanteId: "gest-001", profissionalId: "prof-001", ubsId: "ubs-001",
    data: "2025-12-04", idadeGestacionalSemanas: 16, status: "realizada",
    pesoKg: 64.8, pressaoSistolica: 112, pressaoDiastolica: 68, alturaUterinaСm: 16, bcf: 148,
    conduta: "Gestação evoluindo bem",
  },
  {
    id: "cons-004", gestanteId: "gest-001", profissionalId: "prof-002", ubsId: "ubs-001",
    data: "2026-01-08", idadeGestacionalSemanas: 21, status: "realizada",
    pesoKg: 66.2, pressaoSistolica: 118, pressaoDiastolica: 74, alturaUterinaСm: 21, bcf: 145,
    movimentosFetais: true, conduta: "USG morfológica solicitada, vacinação dTpa agendada",
  },
  {
    id: "cons-005", gestanteId: "gest-001", profissionalId: "prof-002", ubsId: "ubs-001",
    data: "2026-02-05", idadeGestacionalSemanas: 25, status: "realizada",
    pesoKg: 67.5, pressaoSistolica: 114, pressaoDiastolica: 70, alturaUterinaСm: 25, bcf: 140,
    movimentosFetais: true, conduta: "Resultados de exames normais. Próxima consulta em 2 semanas",
  },
  {
    id: "cons-006", gestanteId: "gest-001", profissionalId: "prof-002", ubsId: "ubs-001",
    data: "2026-02-19", idadeGestacionalSemanas: 27, status: "agendada",
  },
  // Beatriz — 8 consultas (alto risco, acompanhamento mais frequente)
  {
    id: "cons-010", gestanteId: "gest-002", profissionalId: "prof-001", ubsId: "ubs-002",
    data: "2025-08-05", idadeGestacionalSemanas: 9, status: "realizada",
    pesoKg: 78.0, pressaoSistolica: 138, pressaoDiastolica: 88, bcf: 160,
    queixas: "Cefaleia frequente", conduta: "Monitoramento pressórico, encaminhamento para pré-natal de alto risco",
    riscoAtualizado: "alto",
  },
  {
    id: "cons-011", gestanteId: "gest-002", profissionalId: "prof-001", ubsId: "ubs-002",
    data: "2025-09-10", idadeGestacionalSemanas: 14, status: "realizada",
    pesoKg: 79.2, pressaoSistolica: 135, pressaoDiastolica: 85, alturaUterinaСm: 14, bcf: 155,
    conduta: "PA controlada com medicação. Manter acompanhamento quinzenal",
  },
  {
    id: "cons-012", gestanteId: "gest-002", profissionalId: "prof-001", ubsId: "ubs-002",
    data: "2026-01-20", idadeGestacionalSemanas: 33, status: "realizada",
    pesoKg: 84.5, pressaoSistolica: 130, pressaoDiastolica: 82, alturaUterinaСm: 32, bcf: 142,
    movimentosFetais: true, conduta: "Gestação estável. Preparo para parto",
  },
  // Camila — 2 consultas (início recente)
  {
    id: "cons-020", gestanteId: "gest-003", profissionalId: "prof-003", ubsId: "ubs-003",
    data: "2025-11-20", idadeGestacionalSemanas: 5, status: "realizada",
    pesoKg: 55.0, pressaoSistolica: 105, pressaoDiastolica: 65,
    conduta: "Primeira consulta. Solicitação de todos os exames do 1º trimestre. Ácido fólico e sulfato ferroso prescritos",
  },
  {
    id: "cons-021", gestanteId: "gest-003", profissionalId: "prof-003", ubsId: "ubs-003",
    data: "2026-01-10", idadeGestacionalSemanas: 12, status: "realizada",
    pesoKg: 56.2, pressaoSistolica: 108, pressaoDiastolica: 68, bcf: 158,
    conduta: "Exames normais. USG 1º trimestre confirmou IG. Gestação tópica única",
  },
  // Daniela — próxima consulta agendada
  {
    id: "cons-030", gestanteId: "gest-004", profissionalId: "prof-003", ubsId: "ubs-004",
    data: "2026-02-20", idadeGestacionalSemanas: 32, status: "agendada",
  },
];

// ── Exames ─────────────────────────────────────────────

export const MOCK_EXAMES: Exame[] = [
  // Adriana — 1º trimestre completo
  { id: "ex-001", gestanteId: "gest-001", tipo: "laboratorio", nome: "Hemograma completo", dataSolicitacao: "2025-10-30", dataResultado: "2025-11-05", resultado: "Hb 12.2 g/dL — Normal", valorReferencia: "≥11 g/dL", status: "resultado-disponivel", trimestre: 1 },
  { id: "ex-002", gestanteId: "gest-001", tipo: "laboratorio", nome: "Glicemia de jejum", dataSolicitacao: "2025-10-30", dataResultado: "2025-11-05", resultado: "82 mg/dL — Normal", valorReferencia: "<92 mg/dL", status: "resultado-disponivel", trimestre: 1 },
  { id: "ex-003", gestanteId: "gest-001", tipo: "laboratorio", nome: "Tipagem sanguínea e fator Rh", dataSolicitacao: "2025-10-30", dataResultado: "2025-11-03", resultado: "O positivo", status: "resultado-disponivel", trimestre: 1 },
  { id: "ex-004", gestanteId: "gest-001", tipo: "laboratorio", nome: "Teste rápido HIV", dataSolicitacao: "2025-10-30", dataResultado: "2025-10-30", resultado: "Não reagente", status: "resultado-disponivel", trimestre: 1 },
  { id: "ex-005", gestanteId: "gest-001", tipo: "laboratorio", nome: "Teste rápido de sífilis (VDRL)", dataSolicitacao: "2025-10-30", dataResultado: "2025-10-30", resultado: "Não reagente", status: "resultado-disponivel", trimestre: 1 },
  { id: "ex-006", gestanteId: "gest-001", tipo: "imagem", nome: "Ultrassonografia obstétrica (1º trimestre)", dataSolicitacao: "2025-10-30", dataResultado: "2025-11-15", resultado: "Gestação tópica única, BCF+, IG compatível com DUM", status: "resultado-disponivel", trimestre: 1 },
  // Adriana — 2º trimestre
  { id: "ex-007", gestanteId: "gest-001", tipo: "laboratorio", nome: "TOTG 75g (24-28 semanas)", dataSolicitacao: "2026-01-08", dataResultado: "2026-01-20", resultado: "Jejum: 78 | 1h: 145 | 2h: 118 — Normal", valorReferencia: "Jejum <92 | 1h <180 | 2h <153", status: "resultado-disponivel", trimestre: 2 },
  { id: "ex-008", gestanteId: "gest-001", tipo: "imagem", nome: "Ultrassonografia morfológica", dataSolicitacao: "2026-01-08", status: "solicitado", trimestre: 2 },
  // Beatriz — exames com alterações
  { id: "ex-010", gestanteId: "gest-002", tipo: "laboratorio", nome: "Glicemia de jejum", dataSolicitacao: "2025-08-05", dataResultado: "2025-08-12", resultado: "98 mg/dL — Alterado", valorReferencia: "<92 mg/dL", status: "resultado-disponivel", trimestre: 1, observacoes: "Valor limítrofe, solicitar TOTG" },
  { id: "ex-011", gestanteId: "gest-002", tipo: "laboratorio", nome: "Hemograma completo", dataSolicitacao: "2025-08-05", dataResultado: "2025-08-12", resultado: "Hb 10.8 g/dL — Anemia leve", valorReferencia: "≥11 g/dL", status: "resultado-disponivel", trimestre: 1 },
];

// ── Vacinas ────────────────────────────────────────────

export const MOCK_VACINAS: Vacina[] = [
  // Adriana
  { id: "vac-001", gestanteId: "gest-001", nome: "dTpa", dose: "Dose única", dataAplicacao: "2026-01-15", dataPrevista: "2026-01-08", status: "aplicada", lote: "DTPA2025A", localAplicacao: "USF Bairro da Paz" },
  { id: "vac-002", gestanteId: "gest-001", nome: "Influenza", dose: "Dose única", dataPrevista: "2025-10-30", dataAplicacao: "2025-11-02", status: "aplicada", lote: "FLU2025B", localAplicacao: "USF Bairro da Paz" },
  { id: "vac-003", gestanteId: "gest-001", nome: "Hepatite B", dose: "1ª dose", dataPrevista: "2025-10-30", dataAplicacao: "2025-10-30", status: "aplicada" },
  { id: "vac-004", gestanteId: "gest-001", nome: "Hepatite B", dose: "2ª dose", dataPrevista: "2025-11-30", dataAplicacao: "2025-12-05", status: "aplicada" },
  { id: "vac-005", gestanteId: "gest-001", nome: "Hepatite B", dose: "3ª dose", dataPrevista: "2026-04-30", status: "pendente" },
  // Beatriz
  { id: "vac-010", gestanteId: "gest-002", nome: "dTpa", dose: "Dose única", dataAplicacao: "2025-11-10", dataPrevista: "2025-11-01", status: "aplicada" },
  { id: "vac-011", gestanteId: "gest-002", nome: "Influenza", dose: "Dose única", dataPrevista: "2025-08-15", status: "atrasada" },
  // Camila — nenhuma vacina ainda
  { id: "vac-020", gestanteId: "gest-003", nome: "dTpa", dose: "Dose única", dataPrevista: "2026-03-10", status: "pendente" },
  { id: "vac-021", gestanteId: "gest-003", nome: "Influenza", dose: "Dose única", dataPrevista: "2026-01-15", status: "atrasada" },
];

// ── Medicações ─────────────────────────────────────────

export const MOCK_MEDICACOES: Medicacao[] = [
  { id: "med-001", gestanteId: "gest-001", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-09-25", ativa: true },
  { id: "med-002", gestanteId: "gest-001", nome: "Sulfato ferroso", dosagem: "40mg Fe elementar", frequencia: "1x ao dia", dataInicio: "2025-09-25", ativa: true, observacoes: "Tomar longe das refeições" },
  { id: "med-003", gestanteId: "gest-002", nome: "Metildopa", dosagem: "250mg", frequencia: "3x ao dia", dataInicio: "2025-08-10", ativa: true, observacoes: "Controle de hipertensão" },
  { id: "med-004", gestanteId: "gest-002", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-07-20", ativa: true },
  { id: "med-005", gestanteId: "gest-003", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-11-20", ativa: true },
  { id: "med-006", gestanteId: "gest-003", nome: "Sulfato ferroso", dosagem: "40mg Fe elementar", frequencia: "1x ao dia", dataInicio: "2025-11-20", ativa: true },
];

// ── Registros de peso (para gráfico — Adriana) ─────────

export const MOCK_REGISTROS_PESO: RegistroPeso[] = [
  { data: "2025-09-25", idadeGestacionalSemanas: 6, pesoKg: 62.5, imcAtual: 23.4 },
  { data: "2025-10-30", idadeGestacionalSemanas: 11, pesoKg: 63.1, imcAtual: 23.6 },
  { data: "2025-12-04", idadeGestacionalSemanas: 16, pesoKg: 64.8, imcAtual: 24.3 },
  { data: "2026-01-08", idadeGestacionalSemanas: 21, pesoKg: 66.2, imcAtual: 24.8 },
  { data: "2026-02-05", idadeGestacionalSemanas: 25, pesoKg: 67.5, imcAtual: 25.3 },
];

// ── Notificações ───────────────────────────────────────

export const MOCK_NOTIFICACOES: Notificacao[] = [
  { id: "not-001", gestanteId: "gest-001", titulo: "Consulta agendada", mensagem: "Sua próxima consulta pré-natal é dia 19/02 às 09:00 na USF Bairro da Paz.", tipo: "consulta", lida: false, data: "2026-02-14" },
  { id: "not-002", gestanteId: "gest-001", titulo: "Resultado de exame disponível", mensagem: "O resultado do exame TOTG 75g está disponível. Consulte sua caderneta.", tipo: "exame", lida: true, data: "2026-01-20" },
  { id: "not-003", gestanteId: "gest-001", titulo: "Vacina pendente", mensagem: "A 3ª dose da vacina Hepatite B está prevista para abril. Fique atenta!", tipo: "vacina", lida: false, data: "2026-02-10" },
  { id: "not-004", gestanteId: "gest-001", titulo: "Dica da semana", mensagem: "Na 26ª semana, seu bebê já consegue abrir os olhos. Continue com a alimentação saudável!", tipo: "geral", lida: false, data: "2026-02-12" },
];

// ── Atividades Educativas ───────────────────────────────

export const MOCK_ATIVIDADES_EDUCATIVAS: AtividadeEducativa[] = [
  { id: "ae-001", gestanteId: "gest-001", data: "2025-11-15", descricao: "Roda de conversa: Aleitamento materno e seus benefícios", profissionalId: "prof-002" },
  { id: "ae-002", gestanteId: "gest-001", data: "2026-01-20", descricao: "Oficina: Cuidados com o recém-nascido", profissionalId: "prof-002" },
  { id: "ae-003", gestanteId: "gest-002", data: "2025-10-10", descricao: "Palestra: Sinais de alerta na gestação de alto risco", profissionalId: "prof-001" },
  { id: "ae-004", gestanteId: "gest-002", data: "2025-12-05", descricao: "Grupo de gestantes: Exercícios respiratórios para o parto", profissionalId: "prof-001" },
  { id: "ae-005", gestanteId: "gest-002", data: "2026-01-18", descricao: "Roda de conversa: Direitos da gestante e puérpera", profissionalId: "prof-001" },
];

// ── Visitas à Maternidade ───────────────────────────────

export const MOCK_VISITAS_MATERNIDADE: VisitaMaternidade[] = [
  { id: "vm-001", gestanteId: "gest-001", data: "2026-01-25", maternidade: "Maternidade Albert Sabin", profissionalId: "prof-002", observacoes: "Gestante conheceu a sala de parto e o alojamento conjunto" },
  { id: "vm-002", gestanteId: "gest-002", data: "2025-12-15", maternidade: "Maternidade Climério de Oliveira (UFBA)", profissionalId: "prof-001", observacoes: "Visita guiada com equipe da maternidade. Gestante tirou dúvidas sobre parto cesáreo" },
];

// ── Transcard Vinculações ──────────────────────────────

export const MOCK_TRANSCARD: TranscardVinculacao[] = [
  {
    id: "tc-001", gestanteId: "gest-001", numeroTranscard: "TC-001-0041", cpf: "987.654.321-00",
    situacao: "ativo", dataVinculacao: "2025-10-15", etapaAtual: 2,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
  {
    id: "tc-002", gestanteId: "gest-002", numeroTranscard: "TC-002-0028", cpf: "876.543.210-11",
    situacao: "ativo", dataVinculacao: "2025-08-20", etapaAtual: 3,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2026-01-10",
  },
  {
    id: "tc-003", gestanteId: "gest-003", numeroTranscard: "TC-003-0010", cpf: "765.432.109-22",
    situacao: "pendente", dataVinculacao: "2025-12-01", etapaAtual: 1,
    lgpdConsentimento: "pendente", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
  {
    id: "tc-004", gestanteId: "gest-004", numeroTranscard: "TC-004-0055", cpf: "654.321.098-33",
    situacao: "ativo", dataVinculacao: "2025-09-05", etapaAtual: 2,
    lgpdConsentimento: "assinado-fisico", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2025-12-20",
  },
];

// ── Casos de Sífilis ───────────────────────────────────

export const MOCK_CASOS_SIFILIS: CasoSifilis[] = [
  { id: "sif-001", gestanteId: "gest-002", classificacao: "recente", dataDeteccao: "2025-09-12", idadeGestacionalDeteccao: 14, tratamentoIniciado: true, tratamentoConcluido: true, parceiroTratado: true },
  { id: "sif-002", gestanteId: "gest-004", classificacao: "tardia", dataDeteccao: "2025-08-20", idadeGestacionalDeteccao: 6, tratamentoIniciado: true, tratamentoConcluido: false, parceiroTratado: false },
  { id: "sif-003", gestanteId: "gest-006", classificacao: "recente", dataDeteccao: "2025-12-15", idadeGestacionalDeteccao: 7, tratamentoIniciado: true, tratamentoConcluido: true, parceiroTratado: true },
];

// ── Indicadores Previne Brasil (quadrimestral) ─────────

export const MOCK_INDICADORES_PREVINE: IndicadorPrevine[] = [
  { id: "ip-01", nome: "Proporção de gestantes com pelo menos 6 consultas", meta: 60, valores: [
    { quadrimestre: "1° Quad 2025", valor: 52.4 }, { quadrimestre: "2° Quad 2025", valor: 55.1 }, { quadrimestre: "3° Quad 2025", valor: 58.7 },
  ]},
  { id: "ip-02", nome: "Proporção de gestantes com início precoce do pré-natal (≤12 sem)", meta: 80, valores: [
    { quadrimestre: "1° Quad 2025", valor: 65.2 }, { quadrimestre: "2° Quad 2025", valor: 68.8 }, { quadrimestre: "3° Quad 2025", valor: 72.3 },
  ]},
  { id: "ip-03", nome: "Proporção de gestantes com exames do 1° trimestre", meta: 80, valores: [
    { quadrimestre: "1° Quad 2025", valor: 71.0 }, { quadrimestre: "2° Quad 2025", valor: 74.5 }, { quadrimestre: "3° Quad 2025", valor: 76.8 },
  ]},
  { id: "ip-04", nome: "Cobertura vacinal dTpa", meta: 85, valores: [
    { quadrimestre: "1° Quad 2025", valor: 75.0 }, { quadrimestre: "2° Quad 2025", valor: 78.3 }, { quadrimestre: "3° Quad 2025", valor: 81.5 },
  ]},
  { id: "ip-05", nome: "Cobertura vacinal Influenza", meta: 80, valores: [
    { quadrimestre: "1° Quad 2025", valor: 55.0 }, { quadrimestre: "2° Quad 2025", valor: 60.2 }, { quadrimestre: "3° Quad 2025", valor: 64.2 },
  ]},
  { id: "ip-06", nome: "Teste rápido de sífilis no 1° trimestre", meta: 90, valores: [
    { quadrimestre: "1° Quad 2025", valor: 82.1 }, { quadrimestre: "2° Quad 2025", valor: 85.4 }, { quadrimestre: "3° Quad 2025", valor: 87.3 },
  ]},
  { id: "ip-07", nome: "Teste rápido de HIV no 1° trimestre", meta: 90, valores: [
    { quadrimestre: "1° Quad 2025", valor: 80.5 }, { quadrimestre: "2° Quad 2025", valor: 84.0 }, { quadrimestre: "3° Quad 2025", valor: 86.9 },
  ]},
  { id: "ip-08", nome: "Proporção de gestantes com 7+ consultas", meta: 70, valores: [
    { quadrimestre: "1° Quad 2025", valor: 48.3 }, { quadrimestre: "2° Quad 2025", valor: 53.6 }, { quadrimestre: "3° Quad 2025", valor: 58.1 },
  ]},
  { id: "ip-09", nome: "Urocultura no 1° trimestre", meta: 75, valores: [
    { quadrimestre: "1° Quad 2025", valor: 60.2 }, { quadrimestre: "2° Quad 2025", valor: 64.8 }, { quadrimestre: "3° Quad 2025", valor: 68.4 },
  ]},
  { id: "ip-10", nome: "Ultrassonografia obstétrica 1° trimestre", meta: 70, valores: [
    { quadrimestre: "1° Quad 2025", valor: 58.0 }, { quadrimestre: "2° Quad 2025", valor: 62.5 }, { quadrimestre: "3° Quad 2025", valor: 65.3 },
  ]},
  { id: "ip-11", nome: "Suplementação de sulfato ferroso", meta: 85, valores: [
    { quadrimestre: "1° Quad 2025", valor: 78.5 }, { quadrimestre: "2° Quad 2025", valor: 81.0 }, { quadrimestre: "3° Quad 2025", valor: 83.2 },
  ]},
];

// ── KPIs do Gestor ─────────────────────────────────────

export const MOCK_KPIS: KPIsGestor = {
  gestantesAtivas: 1247,
  consultasRealizadasMes: 3842,
  inicioPrecoce: 72.3,
  seteMaisConsultas: 58.1,
  coberturaVacinalDtpa: 81.5,
  coberturaVacinalInfluenza: 64.2,
  examesPrimeiroTrimestre: 76.8,
  distribuicaoRisco: { habitual: 68, alto: 32 },
};

// ── Dados agregados por UBS (para tabela do gestor) ────

export interface DadosUBS {
  ubsId: string;
  ubsNome: string;
  distrito: string;
  gestantesAtivas: number;
  consultasMes: number;
  inicioPrecoce: number;
  coberturaVacinal: number;
}

export const MOCK_DADOS_UBS: DadosUBS[] = UBS_LIST.map((ubs, i) => ({
  ubsId: ubs.id,
  ubsNome: ubs.nome,
  distrito: ubs.distritoSanitarioId,
  gestantesAtivas: [180, 145, 92, 210, 135, 165, 120, 98][i] ?? 100,
  consultasMes: [540, 410, 265, 630, 385, 480, 345, 287][i] ?? 300,
  inicioPrecoce: [75.2, 68.4, 80.1, 62.3, 73.8, 71.5, 69.2, 77.6][i] ?? 70,
  coberturaVacinal: [84.3, 76.1, 88.5, 71.2, 80.4, 78.9, 73.6, 82.1][i] ?? 75,
}));

// ── Dados de tendência mensal (para gráficos do gestor) ─

export const MOCK_TENDENCIA_MENSAL = [
  { mes: "Set/25", consultas: 3120, gestantesNovas: 285, inicioPrecoce: 68.5 },
  { mes: "Out/25", consultas: 3340, gestantesNovas: 310, inicioPrecoce: 70.1 },
  { mes: "Nov/25", consultas: 3510, gestantesNovas: 298, inicioPrecoce: 71.8 },
  { mes: "Dez/25", consultas: 3290, gestantesNovas: 265, inicioPrecoce: 69.4 },
  { mes: "Jan/26", consultas: 3680, gestantesNovas: 320, inicioPrecoce: 73.2 },
  { mes: "Fev/26", consultas: 3842, gestantesNovas: 305, inicioPrecoce: 72.3 },
];
