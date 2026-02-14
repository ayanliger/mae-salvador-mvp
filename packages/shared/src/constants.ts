import type { DistritoSanitario, UBS } from "./types";

// ── 12 Distritos Sanitários de Salvador ────────────────

export const DISTRITOS_SANITARIOS: DistritoSanitario[] = [
  { id: "ds-01", nome: "Centro Histórico", numero: 1 },
  { id: "ds-02", nome: "Itapagipe", numero: 2 },
  { id: "ds-03", nome: "São Caetano / Valéria", numero: 3 },
  { id: "ds-04", nome: "Liberdade", numero: 4 },
  { id: "ds-05", nome: "Brotas", numero: 5 },
  { id: "ds-06", nome: "Barra / Rio Vermelho", numero: 6 },
  { id: "ds-07", nome: "Boca do Rio", numero: 7 },
  { id: "ds-08", nome: "Itapuã", numero: 8 },
  { id: "ds-09", nome: "Cabula / Beiru", numero: 9 },
  { id: "ds-10", nome: "Pau da Lima", numero: 10 },
  { id: "ds-11", nome: "Subúrbio Ferroviário", numero: 11 },
  { id: "ds-12", nome: "Cajazeiras", numero: 12 },
];

// ── Sample UBS (representative subset) ─────────────────

export const UBS_LIST: UBS[] = [
  {
    id: "ubs-001", nome: "USF Bairro da Paz", cnes: "2802171", tipo: "USF",
    distritoSanitarioId: "ds-08", equipesSF: 4,
    endereco: { logradouro: "Rua da Paz", numero: "s/n", bairro: "Bairro da Paz", cep: "41512-000", distritoSanitarioId: "ds-08" },
  },
  {
    id: "ubs-002", nome: "USF Cajazeiras X", cnes: "2517957", tipo: "USF",
    distritoSanitarioId: "ds-12", equipesSF: 3,
    endereco: { logradouro: "Rua Cajazeiras X", numero: "20", bairro: "Cajazeiras", cep: "41340-000", distritoSanitarioId: "ds-12" },
  },
  {
    id: "ubs-003", nome: "UBS Ramiro de Azevedo", cnes: "2516985", tipo: "UBS",
    distritoSanitarioId: "ds-01", equipesSF: 2,
    endereco: { logradouro: "Praça da Sé", numero: "10", bairro: "Pelourinho", cep: "40026-010", distritoSanitarioId: "ds-01" },
  },
  {
    id: "ubs-004", nome: "USF Pau da Lima", cnes: "2509504", tipo: "USF",
    distritoSanitarioId: "ds-10", equipesSF: 5,
    endereco: { logradouro: "Rua Ceará", numero: "100", bairro: "Pau da Lima", cep: "41235-000", distritoSanitarioId: "ds-10" },
  },
  {
    id: "ubs-005", nome: "USF Vale do Camurugipe", cnes: "2521490", tipo: "USF",
    distritoSanitarioId: "ds-09", equipesSF: 3,
    endereco: { logradouro: "Rua do Vale", numero: "55", bairro: "Cabula", cep: "41150-000", distritoSanitarioId: "ds-09" },
  },
  {
    id: "ubs-006", nome: "USF Liberdade", cnes: "2530082", tipo: "USF",
    distritoSanitarioId: "ds-04", equipesSF: 4,
    endereco: { logradouro: "Rua Lima e Silva", numero: "80", bairro: "Liberdade", cep: "40325-000", distritoSanitarioId: "ds-04" },
  },
  {
    id: "ubs-007", nome: "USF São Marcos", cnes: "2516942", tipo: "USF",
    distritoSanitarioId: "ds-03", equipesSF: 3,
    endereco: { logradouro: "Rua São Marcos", numero: "15", bairro: "São Marcos", cep: "41250-000", distritoSanitarioId: "ds-03" },
  },
  {
    id: "ubs-008", nome: "UBS Nelson Piauhy Dourado", cnes: "2518716", tipo: "UBS",
    distritoSanitarioId: "ds-06", equipesSF: 2,
    endereco: { logradouro: "Rua Marquês de Caravelas", numero: "40", bairro: "Barra", cep: "40140-240", distritoSanitarioId: "ds-06" },
  },
];

// ── Classificações de risco ────────────────────────────

export const FATORES_RISCO = [
  "Hipertensão arterial crônica",
  "Diabetes gestacional",
  "Diabetes mellitus prévio",
  "Pré-eclâmpsia em gestação anterior",
  "Anemia falciforme",
  "Cardiopatia",
  "Gestação múltipla",
  "Idade materna ≥ 35 anos",
  "Idade materna ≤ 15 anos",
  "IMC ≥ 30 (obesidade)",
  "Histórico de prematuridade",
  "Histórico de abortos de repetição",
  "Infecção urinária de repetição",
  "Sífilis",
  "HIV positivo",
  "Uso de substâncias",
  "Violência doméstica",
] as const;

// ── Calendário vacinal da gestante ─────────────────────

export const CALENDARIO_VACINAL = [
  { nome: "dTpa (difteria, tétano, coqueluche)", doses: 1, observacao: "A partir da 20ª semana" },
  { nome: "Hepatite B", doses: 3, observacao: "Esquema 0, 1, 6 meses (se não vacinada)" },
  { nome: "Influenza", doses: 1, observacao: "Dose única, qualquer trimestre" },
  { nome: "COVID-19", doses: 1, observacao: "Conforme calendário vigente" },
] as const;

// ── Exames por trimestre ───────────────────────────────

export const EXAMES_PRENATAL = {
  1: [
    "Hemograma completo",
    "Tipagem sanguínea e fator Rh",
    "Coombs indireto",
    "Glicemia de jejum",
    "Teste rápido de sífilis (VDRL)",
    "Teste rápido HIV",
    "Teste rápido Hepatite B (HBsAg)",
    "Toxoplasmose (IgG e IgM)",
    "Urina tipo I (EAS)",
    "Urocultura",
    "Ultrassonografia obstétrica (1º trimestre)",
  ],
  2: [
    "TOTG 75g (24-28 semanas)",
    "Coombs indireto (se Rh negativo)",
    "Hemograma completo",
    "Ultrassonografia morfológica",
  ],
  3: [
    "Hemograma completo",
    "VDRL",
    "HIV",
    "Hepatite B (HBsAg)",
    "Toxoplasmose (IgG e IgM)",
    "Urocultura",
    "Estreptococo grupo B (35-37 semanas)",
    "Ultrassonografia obstétrica (3º trimestre)",
  ],
} as const;

// ── Maternidades de referência ─────────────────────────

export const MATERNIDADES = [
  "Maternidade Albert Sabin",
  "Maternidade Climério de Oliveira (UFBA)",
  "Maternidade Tsylla Balbino",
  "Hospital Geral Roberto Santos",
  "Hospital Santo Amaro",
  "Instituto de Perinatologia da Bahia (IPERBA)",
] as const;
