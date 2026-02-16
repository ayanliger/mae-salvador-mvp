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
  // ── Adolescentes (≤17 anos) ──────────────────────────────
  {
    id: "gest-007", nomeCompleto: "Gabriela Nascimento Reis", cpf: "321.098.765-66",
    dataNascimento: "2010-06-15", telefone: "(71) 98432-1098",
    endereco: { logradouro: "Rua das Flores", numero: "22", bairro: "Itapuã", cep: "41610-020", distritoSanitarioId: "ds-08" },
    tipoSanguineo: "O+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-12-01", dpp: "2026-09-07", idadeGestacionalSemanas: 11,
    riscoGestacional: "alto", fatoresRisco: ["Idade materna ≤ 15 anos"],
    ubsId: "ubs-001", maternidadeReferencia: MATERNIDADES[0], profissionalResponsavelId: "prof-002",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-002",
    dataCadastro: "2026-01-05", ativa: true,
  },
  {
    id: "gest-008", nomeCompleto: "Helena Souza Martins", cpf: "210.987.654-77",
    dataNascimento: "2009-03-22", telefone: "(71) 99321-0987",
    endereco: { logradouro: "Travessa São Jorge", numero: "8", bairro: "Subúrbio", cep: "40710-050", distritoSanitarioId: "ds-11" },
    tipoSanguineo: "A+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-11-15", dpp: "2026-08-22", idadeGestacionalSemanas: 13,
    riscoGestacional: "alto", fatoresRisco: ["Idade materna ≤ 15 anos", "Violência doméstica"],
    ubsId: "ubs-007", maternidadeReferencia: MATERNIDADES[2], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "parda", equipeId: "eq-010",
    dataCadastro: "2025-12-20", ativa: true,
  },
  // ── Gestação múltipla (gêmeos) ──────────────────────────
  {
    id: "gest-009", nomeCompleto: "Isabela Carvalho Mendes", cpf: "109.876.543-88",
    dataNascimento: "1992-08-10", telefone: "(71) 98210-9876",
    endereco: { logradouro: "Av. Oceânica", numero: "450", bairro: "Barra", cep: "40140-130", distritoSanitarioId: "ds-06" },
    tipoSanguineo: "B-", gestacoes: 2, partos: 1, abortos: 0, filhosVivos: 1,
    dum: "2025-09-20", dpp: "2026-06-27", idadeGestacionalSemanas: 21,
    riscoGestacional: "alto", fatoresRisco: ["Gestação múltipla"],
    ubsId: "ubs-008", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "branca", equipeId: "eq-011",
    dataCadastro: "2025-10-25", ativa: true,
  },
  // ── HIV positivo ────────────────────────────────────────
  {
    id: "gest-010", nomeCompleto: "Juliana Pereira da Silva", cpf: "098.765.432-99",
    dataNascimento: "1994-12-03", telefone: "(71) 99109-8765",
    endereco: { logradouro: "Rua do Comércio", numero: "112", bairro: "São Caetano", cep: "40390-020", distritoSanitarioId: "ds-03" },
    tipoSanguineo: "O+", gestacoes: 3, partos: 2, abortos: 0, filhosVivos: 2,
    dum: "2025-08-01", dpp: "2026-05-08", idadeGestacionalSemanas: 28,
    riscoGestacional: "alto", fatoresRisco: ["HIV positivo"],
    ubsId: "ubs-007", maternidadeReferencia: MATERNIDADES[1], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-010",
    dataCadastro: "2025-09-01", ativa: true,
  },
  // ── Obesidade (IMC ≥ 30) ────────────────────────────────
  {
    id: "gest-011", nomeCompleto: "Karla Batista Rocha", cpf: "987.654.321-10",
    dataNascimento: "1996-05-18", telefone: "(71) 98987-6543",
    endereco: { logradouro: "Rua Principal", numero: "78", bairro: "Brotas", cep: "40285-010", distritoSanitarioId: "ds-05" },
    tipoSanguineo: "A+", gestacoes: 2, partos: 1, abortos: 0, filhosVivos: 1,
    dum: "2025-10-10", dpp: "2026-07-17", idadeGestacionalSemanas: 18,
    riscoGestacional: "alto", fatoresRisco: ["IMC ≥ 30 (obesidade)", "Diabetes gestacional"],
    ubsId: "ubs-003", maternidadeReferencia: MATERNIDADES[2], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "parda", equipeId: "eq-005",
    dataCadastro: "2025-11-15", ativa: true,
  },
  // ── Histórico de prematuridade ──────────────────────────
  {
    id: "gest-012", nomeCompleto: "Larissa Teixeira Gomes", cpf: "876.543.210-21",
    dataNascimento: "1991-11-25", telefone: "(71) 99876-5432",
    endereco: { logradouro: "Av. San Martin", numero: "320", bairro: "Itapagipe", cep: "40420-000", distritoSanitarioId: "ds-02" },
    tipoSanguineo: "AB+", gestacoes: 4, partos: 3, abortos: 0, filhosVivos: 3,
    dum: "2025-07-25", dpp: "2026-05-01", idadeGestacionalSemanas: 29,
    riscoGestacional: "alto", fatoresRisco: ["Histórico de prematuridade", "Idade materna ≥ 35 anos"],
    ubsId: "ubs-002", maternidadeReferencia: MATERNIDADES[1], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-004",
    dataCadastro: "2025-08-20", ativa: true,
  },
  // ── Abortos de repetição ────────────────────────────────
  {
    id: "gest-013", nomeCompleto: "Mariana Costa Freitas", cpf: "765.432.109-32",
    dataNascimento: "1989-02-14", telefone: "(71) 98765-4321",
    endereco: { logradouro: "Rua Chile", numero: "55", bairro: "Centro Histórico", cep: "40020-000", distritoSanitarioId: "ds-01" },
    tipoSanguineo: "O-", gestacoes: 5, partos: 1, abortos: 3, filhosVivos: 1,
    dum: "2025-09-10", dpp: "2026-06-17", idadeGestacionalSemanas: 23,
    riscoGestacional: "alto", fatoresRisco: ["Histórico de abortos de repetição", "Idade materna ≥ 35 anos"],
    ubsId: "ubs-003", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "branca", equipeId: "eq-005",
    dataCadastro: "2025-10-01", ativa: true,
  },
  // ── Cardiopatia ─────────────────────────────────────────
  {
    id: "gest-014", nomeCompleto: "Natália Rodrigues Pinto", cpf: "654.321.098-43",
    dataNascimento: "1998-07-30", telefone: "(71) 99654-3210",
    endereco: { logradouro: "Rua do Uruguai", numero: "190", bairro: "Uruguai", cep: "40450-020", distritoSanitarioId: "ds-02" },
    tipoSanguineo: "B+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-12-05", dpp: "2026-09-11", idadeGestacionalSemanas: 10,
    riscoGestacional: "alto", fatoresRisco: ["Cardiopatia"],
    ubsId: "ubs-004", maternidadeReferencia: MATERNIDADES[3], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "parda", equipeId: "eq-007",
    dataCadastro: "2026-01-10", ativa: true,
  },
  // ── Uso de substâncias ──────────────────────────────────
  {
    id: "gest-015", nomeCompleto: "Olivia Santos Barbosa", cpf: "543.210.987-54",
    dataNascimento: "1999-09-08", telefone: "(71) 98543-2109",
    endereco: { logradouro: "Rua da Mangueira", numero: "33", bairro: "Valéria", cep: "41301-110", distritoSanitarioId: "ds-03" },
    tipoSanguineo: "A-", gestacoes: 2, partos: 0, abortos: 1, filhosVivos: 0,
    dum: "2025-10-25", dpp: "2026-08-01", idadeGestacionalSemanas: 16,
    riscoGestacional: "alto", fatoresRisco: ["Uso de substâncias"],
    ubsId: "ubs-007", maternidadeReferencia: MATERNIDADES[2], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: false, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-010",
    dataCadastro: "2025-11-20", ativa: true,
  },
  // ── Infecção urinária de repetição ──────────────────────
  {
    id: "gest-016", nomeCompleto: "Patrícia Lima Vieira", cpf: "432.109.876-65",
    dataNascimento: "1995-01-12", telefone: "(71) 99432-1098",
    endereco: { logradouro: "Rua Nova Esperança", numero: "67", bairro: "Boca do Rio", cep: "41706-710", distritoSanitarioId: "ds-07" },
    tipoSanguineo: "O+", gestacoes: 3, partos: 2, abortos: 0, filhosVivos: 2,
    dum: "2025-08-20", dpp: "2026-05-27", idadeGestacionalSemanas: 25,
    riscoGestacional: "alto", fatoresRisco: ["Infecção urinária de repetição"],
    ubsId: "ubs-005", maternidadeReferencia: MATERNIDADES[4], profissionalResponsavelId: "prof-002",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "parda", equipeId: "eq-008",
    dataCadastro: "2025-09-15", ativa: true,
  },
  // ── Diabetes mellitus prévio ────────────────────────────
  {
    id: "gest-017", nomeCompleto: "Raquel Fernandes Moura", cpf: "321.098.765-76",
    dataNascimento: "1987-04-05", telefone: "(71) 98321-0987",
    endereco: { logradouro: "Av. Paralela", numero: "1500", bairro: "Pau da Lima", cep: "41235-100", distritoSanitarioId: "ds-10" },
    tipoSanguineo: "A+", gestacoes: 3, partos: 2, abortos: 0, filhosVivos: 2,
    dum: "2025-06-15", dpp: "2026-03-22", idadeGestacionalSemanas: 35,
    riscoGestacional: "alto", fatoresRisco: ["Diabetes mellitus prévio", "Idade materna ≥ 35 anos"],
    ubsId: "ubs-004", maternidadeReferencia: MATERNIDADES[3], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-006",
    dataCadastro: "2025-07-20", ativa: true,
  },
  // ── Indígena ────────────────────────────────────────────
  {
    id: "gest-018", nomeCompleto: "Raíssa Tupinambá", cpf: "210.987.654-87",
    dataNascimento: "2001-12-20", telefone: "(71) 99210-9876",
    endereco: { logradouro: "Aldeia Pataxó", numero: "s/n", bairro: "Itapuã", cep: "41635-150", distritoSanitarioId: "ds-08" },
    tipoSanguineo: "O+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-11-10", dpp: "2026-08-17", idadeGestacionalSemanas: 14,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-001", maternidadeReferencia: MATERNIDADES[0], profissionalResponsavelId: "prof-002",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "indigena", equipeId: "eq-001",
    dataCadastro: "2025-12-15", ativa: true,
  },
  // ── 3º Trimestre (próximas do parto) ────────────────────
  {
    id: "gest-019", nomeCompleto: "Sandra Oliveira Cruz", cpf: "109.876.543-98",
    dataNascimento: "1993-06-28", telefone: "(71) 98109-8765",
    endereco: { logradouro: "Rua do Farol", numero: "200", bairro: "Barra", cep: "40140-200", distritoSanitarioId: "ds-06" },
    tipoSanguineo: "B+", gestacoes: 2, partos: 1, abortos: 0, filhosVivos: 1,
    dum: "2025-05-20", dpp: "2026-02-24", idadeGestacionalSemanas: 39,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-008", maternidadeReferencia: MATERNIDADES[4], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "branca", equipeId: "eq-011",
    dataCadastro: "2025-06-25", ativa: true,
  },
  {
    id: "gest-020", nomeCompleto: "Tatiana Ramos Santana", cpf: "098.765.432-09",
    dataNascimento: "1990-10-15", telefone: "(71) 99098-7654",
    endereco: { logradouro: "Rua das Palmeiras", numero: "88", bairro: "Cajazeiras", cep: "41340-030", distritoSanitarioId: "ds-12" },
    tipoSanguineo: "AB+", gestacoes: 4, partos: 3, abortos: 0, filhosVivos: 3,
    dum: "2025-05-10", dpp: "2026-02-14", idadeGestacionalSemanas: 40,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-002", maternidadeReferencia: MATERNIDADES[1], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-003",
    dataCadastro: "2025-06-15", ativa: true,
  },
  // ── 1º Trimestre (início recente) ───────────────────────
  {
    id: "gest-021", nomeCompleto: "Úrsula Dias Fonseca", cpf: "987.654.321-20",
    dataNascimento: "1997-03-08", telefone: "(71) 98987-6543",
    endereco: { logradouro: "Rua da Saúde", numero: "45", bairro: "Centro Histórico", cep: "40020-100", distritoSanitarioId: "ds-01" },
    tipoSanguineo: "O+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-12-20", dpp: "2026-09-26", idadeGestacionalSemanas: 8,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-003", maternidadeReferencia: MATERNIDADES[2], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "parda", equipeId: "eq-005",
    dataCadastro: "2026-01-20", ativa: true,
  },
  {
    id: "gest-022", nomeCompleto: "Valentina Moreira Campos", cpf: "876.543.210-31",
    dataNascimento: "2000-08-22", telefone: "(71) 99876-5432",
    endereco: { logradouro: "Rua Direita da Piedade", numero: "120", bairro: "Brotas", cep: "40285-020", distritoSanitarioId: "ds-05" },
    tipoSanguineo: "A-", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2026-01-05", dpp: "2026-10-12", idadeGestacionalSemanas: 6,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-006", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: false, bolsaFamilia: false, racaCor: "branca", equipeId: "eq-009",
    dataCadastro: "2026-02-01", ativa: true,
  },
  // ── Gestante inativa (alta/transferência) ───────────────
  {
    id: "gest-023", nomeCompleto: "Wanessa Alves Pinheiro", cpf: "765.432.109-42",
    dataNascimento: "1994-05-10", telefone: "(71) 98765-4321",
    endereco: { logradouro: "Rua do Sol", numero: "77", bairro: "Rio Vermelho", cep: "41940-340", distritoSanitarioId: "ds-06" },
    tipoSanguineo: "B+", gestacoes: 2, partos: 2, abortos: 0, filhosVivos: 2,
    dum: "2025-03-01", dpp: "2025-12-06", idadeGestacionalSemanas: 40,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-008", maternidadeReferencia: MATERNIDADES[4], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "parda", equipeId: "eq-011",
    dataCadastro: "2025-04-01", ativa: false,
  },
  // ── Transcard recusado ──────────────────────────────────
  {
    id: "gest-024", nomeCompleto: "Ximena Brito Araújo", cpf: "654.321.098-53",
    dataNascimento: "1996-11-30", telefone: "(71) 99654-3210",
    endereco: { logradouro: "Rua Carlos Gomes", numero: "300", bairro: "Federação", cep: "40231-030", distritoSanitarioId: "ds-05" },
    tipoSanguineo: "O-", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-09-25", dpp: "2026-07-02", idadeGestacionalSemanas: 20,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-006", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: false, bolsaFamilia: false, racaCor: "branca", equipeId: "eq-009",
    dataCadastro: "2025-10-30", ativa: true,
  },
  // ── Sífilis detectada ───────────────────────────────────
  {
    id: "gest-025", nomeCompleto: "Yasmin Conceição Almeida", cpf: "543.210.987-64",
    dataNascimento: "1998-02-18", telefone: "(71) 98543-2109",
    endereco: { logradouro: "Rua do Pero Vaz", numero: "50", bairro: "Pero Vaz", cep: "40330-010", distritoSanitarioId: "ds-04" },
    tipoSanguineo: "A+", gestacoes: 2, partos: 1, abortos: 0, filhosVivos: 1,
    dum: "2025-08-05", dpp: "2026-05-12", idadeGestacionalSemanas: 27,
    riscoGestacional: "alto", fatoresRisco: ["Sífilis"],
    ubsId: "ubs-006", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-009",
    dataCadastro: "2025-09-05", ativa: true,
  },
  // ── Mulher mais velha (40+) ─────────────────────────────
  {
    id: "gest-026", nomeCompleto: "Zilda Maria dos Santos", cpf: "432.109.876-75",
    dataNascimento: "1984-09-12", telefone: "(71) 99432-1098",
    endereco: { logradouro: "Rua do Gravatá", numero: "180", bairro: "Cabula", cep: "41150-050", distritoSanitarioId: "ds-09" },
    tipoSanguineo: "AB-", gestacoes: 5, partos: 4, abortos: 0, filhosVivos: 4,
    dum: "2025-07-01", dpp: "2026-04-07", idadeGestacionalSemanas: 32,
    riscoGestacional: "alto", fatoresRisco: ["Idade materna ≥ 35 anos", "Hipertensão arterial crônica"],
    ubsId: "ubs-005", maternidadeReferencia: MATERNIDADES[4], profissionalResponsavelId: "prof-002",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-008",
    dataCadastro: "2025-08-01", ativa: true,
  },
  // ── Primigesta jovem sem risco ──────────────────────────
  {
    id: "gest-027", nomeCompleto: "Ana Clara Ramos", cpf: "321.098.765-86",
    dataNascimento: "2002-04-25", telefone: "(71) 98321-0987",
    endereco: { logradouro: "Rua da Independência", numero: "95", bairro: "Itapagipe", cep: "40420-100", distritoSanitarioId: "ds-02" },
    tipoSanguineo: "O+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-10-01", dpp: "2026-07-08", idadeGestacionalSemanas: 19,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-001", maternidadeReferencia: MATERNIDADES[0], profissionalResponsavelId: "prof-002",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "parda", equipeId: "eq-002",
    dataCadastro: "2025-11-01", ativa: true,
  },
  // ── Multípara sem risco ─────────────────────────────────
  {
    id: "gest-028", nomeCompleto: "Bianca Ferreira Lopes", cpf: "210.987.654-97",
    dataNascimento: "1992-12-08", telefone: "(71) 99210-9876",
    endereco: { logradouro: "Rua Thomaz Gonzaga", numero: "42", bairro: "Liberdade", cep: "40325-030", distritoSanitarioId: "ds-04" },
    tipoSanguineo: "A+", gestacoes: 4, partos: 3, abortos: 0, filhosVivos: 3,
    dum: "2025-09-15", dpp: "2026-06-22", idadeGestacionalSemanas: 22,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-006", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-009",
    dataCadastro: "2025-10-15", ativa: true,
  },
  // ── Asiática (amarela) ──────────────────────────────────
  {
    id: "gest-029", nomeCompleto: "Chen Wei Oliveira", cpf: "109.876.543-08",
    dataNascimento: "1995-07-14", telefone: "(71) 98109-8765",
    endereco: { logradouro: "Rua da Ajuda", numero: "68", bairro: "Centro", cep: "40060-000", distritoSanitarioId: "ds-01" },
    tipoSanguineo: "B-", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-11-20", dpp: "2026-08-27", idadeGestacionalSemanas: 12,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-003", maternidadeReferencia: MATERNIDADES[2], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "amarela", equipeId: "eq-005",
    dataCadastro: "2025-12-25", ativa: true,
  },
  // ── Múltiplos fatores de risco ──────────────────────────
  {
    id: "gest-030", nomeCompleto: "Débora Cristina Matos", cpf: "098.765.432-19",
    dataNascimento: "1986-03-30", telefone: "(71) 99098-7654",
    endereco: { logradouro: "Rua do Curuzu", numero: "220", bairro: "Curuzu", cep: "40330-080", distritoSanitarioId: "ds-04" },
    tipoSanguineo: "O+", gestacoes: 6, partos: 3, abortos: 2, filhosVivos: 3,
    dum: "2025-08-10", dpp: "2026-05-17", idadeGestacionalSemanas: 27,
    riscoGestacional: "alto", fatoresRisco: ["Idade materna ≥ 35 anos", "Hipertensão arterial crônica", "Diabetes gestacional", "Histórico de abortos de repetição"],
    ubsId: "ubs-006", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-009",
    dataCadastro: "2025-09-10", ativa: true,
  },
  // ── Sem Bolsa Família, sem Transcard ────────────────────
  {
    id: "gest-031", nomeCompleto: "Eduarda Vasconcelos", cpf: "987.654.321-30",
    dataNascimento: "1999-01-05", telefone: "(71) 98987-6543",
    endereco: { logradouro: "Rua Visconde de Mauá", numero: "350", bairro: "Barra", cep: "40140-300", distritoSanitarioId: "ds-06" },
    tipoSanguineo: "A+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-10-15", dpp: "2026-07-22", idadeGestacionalSemanas: 17,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-008", maternidadeReferencia: MATERNIDADES[4], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: false, bolsaFamilia: false, racaCor: "branca", equipeId: "eq-011",
    dataCadastro: "2025-11-20", ativa: true,
  },
  // ── Grande multípara ────────────────────────────────────
  {
    id: "gest-032", nomeCompleto: "Francisca de Jesus Silva", cpf: "876.543.210-41",
    dataNascimento: "1985-08-18", telefone: "(71) 99876-5432",
    endereco: { logradouro: "Rua Nova Constituinte", numero: "180", bairro: "Nova Constituinte", cep: "40720-000", distritoSanitarioId: "ds-11" },
    tipoSanguineo: "O+", gestacoes: 8, partos: 7, abortos: 0, filhosVivos: 7,
    dum: "2025-09-05", dpp: "2026-06-12", idadeGestacionalSemanas: 23,
    riscoGestacional: "alto", fatoresRisco: ["Idade materna ≥ 35 anos"],
    ubsId: "ubs-007", maternidadeReferencia: MATERNIDADES[2], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "preta", equipeId: "eq-010",
    dataCadastro: "2025-10-05", ativa: true,
  },
  // ── Endereço em área rural/difícil acesso ───────────────
  {
    id: "gest-033", nomeCompleto: "Graziela Nascimento", cpf: "765.432.109-52",
    dataNascimento: "1997-06-22", telefone: "(71) 98765-4321",
    endereco: { logradouro: "Estrada da Derba", numero: "km 5", bairro: "Coutos", cep: "40750-000", distritoSanitarioId: "ds-11" },
    tipoSanguineo: "B+", gestacoes: 2, partos: 1, abortos: 0, filhosVivos: 1,
    dum: "2025-10-30", dpp: "2026-08-06", idadeGestacionalSemanas: 15,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-007", maternidadeReferencia: MATERNIDADES[2], profissionalResponsavelId: "prof-003",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "parda", equipeId: "eq-010",
    dataCadastro: "2025-12-01", ativa: true,
  },
  // ── Rh negativo (necessita Coombs) ──────────────────────
  {
    id: "gest-034", nomeCompleto: "Heloísa Santana Melo", cpf: "654.321.098-63",
    dataNascimento: "1994-10-08", telefone: "(71) 99654-3210",
    endereco: { logradouro: "Rua Piauí", numero: "135", bairro: "Pituba", cep: "41830-270", distritoSanitarioId: "ds-07" },
    tipoSanguineo: "A-", gestacoes: 2, partos: 1, abortos: 0, filhosVivos: 1,
    dum: "2025-09-08", dpp: "2026-06-15", idadeGestacionalSemanas: 23,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-005", maternidadeReferencia: MATERNIDADES[4], profissionalResponsavelId: "prof-002",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "branca", equipeId: "eq-008",
    dataCadastro: "2025-10-08", ativa: true,
  },
  // ── Consultas atrasadas ─────────────────────────────────
  {
    id: "gest-035", nomeCompleto: "Ivone Pereira Souza", cpf: "543.210.987-74",
    dataNascimento: "1993-02-28", telefone: "(71) 98543-2109",
    endereco: { logradouro: "Rua São Domingos", numero: "89", bairro: "Engenho Velho", cep: "40240-000", distritoSanitarioId: "ds-05" },
    tipoSanguineo: "O+", gestacoes: 3, partos: 2, abortos: 0, filhosVivos: 2,
    dum: "2025-07-20", dpp: "2026-04-26", idadeGestacionalSemanas: 30,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-006", maternidadeReferencia: MATERNIDADES[5], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: true, racaCor: "parda", equipeId: "eq-009",
    dataCadastro: "2025-08-25", ativa: true,
  },
  // ── Início tardio do pré-natal (>12 semanas) ────────────
  {
    id: "gest-036", nomeCompleto: "Joana Dark Mendes", cpf: "432.109.876-85",
    dataNascimento: "1998-11-15", telefone: "(71) 99432-1098",
    endereco: { logradouro: "Rua da Gratidão", numero: "210", bairro: "Fazenda Grande", cep: "41330-000", distritoSanitarioId: "ds-12" },
    tipoSanguineo: "AB+", gestacoes: 1, partos: 0, abortos: 0, filhosVivos: 0,
    dum: "2025-08-25", dpp: "2026-06-01", idadeGestacionalSemanas: 25,
    riscoGestacional: "habitual", fatoresRisco: [],
    ubsId: "ubs-002", maternidadeReferencia: MATERNIDADES[1], profissionalResponsavelId: "prof-001",
    cartaoMaeSalvador: true, bolsaFamilia: false, racaCor: "preta", equipeId: "eq-004",
    dataCadastro: "2025-12-10", ativa: true,
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
  // Gabriela (adolescente) — 1 consulta
  {
    id: "cons-040", gestanteId: "gest-007", profissionalId: "prof-002", ubsId: "ubs-001",
    data: "2026-01-15", idadeGestacionalSemanas: 7, status: "realizada",
    pesoKg: 48.5, pressaoSistolica: 100, pressaoDiastolica: 60,
    conduta: "Primeira consulta. Encaminhamento para acompanhamento psicossocial. Ácido fólico prescrito",
  },
  // Juliana (HIV) — 4 consultas
  {
    id: "cons-050", gestanteId: "gest-010", profissionalId: "prof-003", ubsId: "ubs-007",
    data: "2025-09-15", idadeGestacionalSemanas: 6, status: "realizada",
    pesoKg: 60.0, pressaoSistolica: 108, pressaoDiastolica: 68,
    conduta: "Início TARV, exames do 1º trimestre solicitados",
  },
  {
    id: "cons-051", gestanteId: "gest-010", profissionalId: "prof-003", ubsId: "ubs-007",
    data: "2025-11-10", idadeGestacionalSemanas: 14, status: "realizada",
    pesoKg: 61.2, pressaoSistolica: 110, pressaoDiastolica: 70, bcf: 150,
    conduta: "Carga viral indetectável. Manter TARV",
  },
  {
    id: "cons-052", gestanteId: "gest-010", profissionalId: "prof-003", ubsId: "ubs-007",
    data: "2026-01-05", idadeGestacionalSemanas: 22, status: "realizada",
    pesoKg: 63.0, pressaoSistolica: 112, pressaoDiastolica: 72, alturaUterinaСm: 22, bcf: 146,
    movimentosFetais: true, conduta: "Gestação evoluindo bem. Adesão à TARV satisfatória",
  },
  {
    id: "cons-053", gestanteId: "gest-010", profissionalId: "prof-003", ubsId: "ubs-007",
    data: "2026-02-15", idadeGestacionalSemanas: 28, status: "realizada",
    pesoKg: 64.5, pressaoSistolica: 110, pressaoDiastolica: 70, alturaUterinaСm: 28, bcf: 142,
    movimentosFetais: true, conduta: "Exames do 3º trimestre solicitados",
  },
  // Raquel (diabetes prévio, 35 sem) — 7 consultas
  {
    id: "cons-060", gestanteId: "gest-017", profissionalId: "prof-003", ubsId: "ubs-004",
    data: "2025-07-28", idadeGestacionalSemanas: 6, status: "realizada",
    pesoKg: 72.0, pressaoSistolica: 120, pressaoDiastolica: 78,
    conduta: "Início pré-natal. Controle glicêmico rigoroso",
  },
  {
    id: "cons-061", gestanteId: "gest-017", profissionalId: "prof-003", ubsId: "ubs-004",
    data: "2025-09-08", idadeGestacionalSemanas: 12, status: "realizada",
    pesoKg: 73.0, pressaoSistolica: 118, pressaoDiastolica: 76, bcf: 155,
    conduta: "Glicemia controlada com insulina",
  },
  {
    id: "cons-062", gestanteId: "gest-017", profissionalId: "prof-003", ubsId: "ubs-004",
    data: "2025-10-20", idadeGestacionalSemanas: 18, status: "realizada",
    pesoKg: 74.5, pressaoSistolica: 122, pressaoDiastolica: 78, alturaUterinaСm: 18, bcf: 148,
    conduta: "USG morfológica solicitada",
  },
  {
    id: "cons-063", gestanteId: "gest-017", profissionalId: "prof-003", ubsId: "ubs-004",
    data: "2025-11-25", idadeGestacionalSemanas: 23, status: "realizada",
    pesoKg: 76.0, pressaoSistolica: 120, pressaoDiastolica: 76, alturaUterinaСm: 23, bcf: 145,
    movimentosFetais: true, conduta: "Bom controle glicêmico",
  },
  {
    id: "cons-064", gestanteId: "gest-017", profissionalId: "prof-003", ubsId: "ubs-004",
    data: "2025-12-22", idadeGestacionalSemanas: 27, status: "realizada",
    pesoKg: 77.5, pressaoSistolica: 124, pressaoDiastolica: 80, alturaUterinaСm: 27, bcf: 140,
    movimentosFetais: true, conduta: "Exames do 3º trimestre",
  },
  {
    id: "cons-065", gestanteId: "gest-017", profissionalId: "prof-003", ubsId: "ubs-004",
    data: "2026-01-15", idadeGestacionalSemanas: 30, status: "realizada",
    pesoKg: 78.8, pressaoSistolica: 126, pressaoDiastolica: 82, alturaUterinaСm: 30, bcf: 138,
    movimentosFetais: true, conduta: "Programação do parto a partir de 38 semanas",
  },
  {
    id: "cons-066", gestanteId: "gest-017", profissionalId: "prof-003", ubsId: "ubs-004",
    data: "2026-02-10", idadeGestacionalSemanas: 34, status: "realizada",
    pesoKg: 80.0, pressaoSistolica: 128, pressaoDiastolica: 82, alturaUterinaСm: 33, bcf: 136,
    movimentosFetais: true, conduta: "CTG fetal solicitada",
  },
  // Sandra (39 sem, próxima do parto) — 8 consultas
  {
    id: "cons-070", gestanteId: "gest-019", profissionalId: "prof-001", ubsId: "ubs-008",
    data: "2025-07-05", idadeGestacionalSemanas: 7, status: "realizada",
    pesoKg: 58.0, pressaoSistolica: 108, pressaoDiastolica: 66,
    conduta: "Primeira consulta. Exames solicitados",
  },
  {
    id: "cons-071", gestanteId: "gest-019", profissionalId: "prof-001", ubsId: "ubs-008",
    data: "2025-08-15", idadeGestacionalSemanas: 13, status: "realizada",
    pesoKg: 59.0, pressaoSistolica: 110, pressaoDiastolica: 68, bcf: 155,
    conduta: "Exames normais",
  },
  {
    id: "cons-072", gestanteId: "gest-019", profissionalId: "prof-001", ubsId: "ubs-008",
    data: "2025-09-25", idadeGestacionalSemanas: 18, status: "realizada",
    pesoKg: 60.5, pressaoSistolica: 112, pressaoDiastolica: 70, alturaUterinaСm: 18, bcf: 148,
    conduta: "Gestação evoluindo bem",
  },
  {
    id: "cons-073", gestanteId: "gest-019", profissionalId: "prof-001", ubsId: "ubs-008",
    data: "2025-10-30", idadeGestacionalSemanas: 23, status: "realizada",
    pesoKg: 62.0, pressaoSistolica: 110, pressaoDiastolica: 68, alturaUterinaСm: 23, bcf: 145,
    movimentosFetais: true, conduta: "TOTG normal",
  },
  {
    id: "cons-074", gestanteId: "gest-019", profissionalId: "prof-001", ubsId: "ubs-008",
    data: "2025-11-27", idadeGestacionalSemanas: 27, status: "realizada",
    pesoKg: 63.5, pressaoSistolica: 112, pressaoDiastolica: 70, alturaUterinaСm: 27, bcf: 142,
    movimentosFetais: true, conduta: "dTpa aplicada",
  },
  {
    id: "cons-075", gestanteId: "gest-019", profissionalId: "prof-001", ubsId: "ubs-008",
    data: "2025-12-22", idadeGestacionalSemanas: 31, status: "realizada",
    pesoKg: 65.0, pressaoSistolica: 114, pressaoDiastolica: 72, alturaUterinaСm: 31, bcf: 140,
    movimentosFetais: true, conduta: "Exames do 3º trimestre",
  },
  {
    id: "cons-076", gestanteId: "gest-019", profissionalId: "prof-001", ubsId: "ubs-008",
    data: "2026-01-15", idadeGestacionalSemanas: 34, status: "realizada",
    pesoKg: 66.0, pressaoSistolica: 110, pressaoDiastolica: 68, alturaUterinaСm: 34, bcf: 138,
    movimentosFetais: true, conduta: "Apresentação cefálica. Plano de parto discutido",
  },
  {
    id: "cons-077", gestanteId: "gest-019", profissionalId: "prof-001", ubsId: "ubs-008",
    data: "2026-02-05", idadeGestacionalSemanas: 37, status: "realizada",
    pesoKg: 67.0, pressaoSistolica: 112, pressaoDiastolica: 70, alturaUterinaСm: 36, bcf: 136,
    movimentosFetais: true, conduta: "Gestação a termo. Orientações sobre sinais de trabalho de parto",
  },
  // Ivone (consultas atrasadas) — 2 consultas e 1 falta
  {
    id: "cons-080", gestanteId: "gest-035", profissionalId: "prof-001", ubsId: "ubs-006",
    data: "2025-09-10", idadeGestacionalSemanas: 8, status: "realizada",
    pesoKg: 65.0, pressaoSistolica: 112, pressaoDiastolica: 70,
    conduta: "Primeira consulta. Exames solicitados",
  },
  {
    id: "cons-081", gestanteId: "gest-035", profissionalId: "prof-001", ubsId: "ubs-006",
    data: "2025-11-05", idadeGestacionalSemanas: 15, status: "faltou",
  },
  {
    id: "cons-082", gestanteId: "gest-035", profissionalId: "prof-001", ubsId: "ubs-006",
    data: "2025-12-10", idadeGestacionalSemanas: 20, status: "realizada",
    pesoKg: 67.5, pressaoSistolica: 118, pressaoDiastolica: 74, alturaUterinaСm: 20, bcf: 148,
    conduta: "Busca ativa realizada. Retornou ao pré-natal",
  },
  // Joana (início tardio) — 1 consulta
  {
    id: "cons-090", gestanteId: "gest-036", profissionalId: "prof-001", ubsId: "ubs-002",
    data: "2025-12-15", idadeGestacionalSemanas: 16, status: "realizada",
    pesoKg: 57.0, pressaoSistolica: 110, pressaoDiastolica: 68,
    conduta: "Início tardio do pré-natal. Todos os exames do 1º e 2º trimestre solicitados de uma vez",
  },
  // Débora (múltiplos riscos) — 4 consultas
  {
    id: "cons-100", gestanteId: "gest-030", profissionalId: "prof-001", ubsId: "ubs-006",
    data: "2025-09-20", idadeGestacionalSemanas: 6, status: "realizada",
    pesoKg: 88.0, pressaoSistolica: 142, pressaoDiastolica: 92,
    conduta: "Alto risco confirmado. Encaminhamento imediato ao pré-natal de alto risco",
    riscoAtualizado: "alto",
  },
  {
    id: "cons-101", gestanteId: "gest-030", profissionalId: "prof-001", ubsId: "ubs-006",
    data: "2025-11-15", idadeGestacionalSemanas: 14, status: "realizada",
    pesoKg: 89.5, pressaoSistolica: 138, pressaoDiastolica: 88, bcf: 152,
    conduta: "PA em controle com medicação. Glicemia monitorada",
  },
  {
    id: "cons-102", gestanteId: "gest-030", profissionalId: "prof-001", ubsId: "ubs-006",
    data: "2026-01-05", idadeGestacionalSemanas: 21, status: "realizada",
    pesoKg: 91.0, pressaoSistolica: 134, pressaoDiastolica: 86, alturaUterinaСm: 21, bcf: 146,
    movimentosFetais: true, conduta: "Estável. Manter acompanhamento quinzenal",
  },
  {
    id: "cons-103", gestanteId: "gest-030", profissionalId: "prof-001", ubsId: "ubs-006",
    data: "2026-02-10", idadeGestacionalSemanas: 26, status: "realizada",
    pesoKg: 92.5, pressaoSistolica: 136, pressaoDiastolica: 88, alturaUterinaСm: 26, bcf: 142,
    movimentosFetais: true, conduta: "TOTG solicitado",
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
  // Juliana (HIV)
  { id: "vac-030", gestanteId: "gest-010", nome: "dTpa", dose: "Dose única", dataAplicacao: "2025-12-20", dataPrevista: "2025-12-15", status: "aplicada" },
  { id: "vac-031", gestanteId: "gest-010", nome: "Influenza", dose: "Dose única", dataAplicacao: "2025-09-20", dataPrevista: "2025-09-15", status: "aplicada" },
  // Raquel (7+ consultas)
  { id: "vac-032", gestanteId: "gest-017", nome: "dTpa", dose: "Dose única", dataAplicacao: "2025-12-01", dataPrevista: "2025-11-25", status: "aplicada" },
  { id: "vac-033", gestanteId: "gest-017", nome: "Influenza", dose: "Dose única", dataAplicacao: "2025-08-15", dataPrevista: "2025-08-10", status: "aplicada" },
  // Sandra (39 sem)
  { id: "vac-034", gestanteId: "gest-019", nome: "dTpa", dose: "Dose única", dataAplicacao: "2025-11-27", dataPrevista: "2025-11-20", status: "aplicada" },
  { id: "vac-035", gestanteId: "gest-019", nome: "Influenza", dose: "Dose única", dataAplicacao: "2025-07-10", dataPrevista: "2025-07-05", status: "aplicada" },
  // Tatiana (40 sem)
  { id: "vac-036", gestanteId: "gest-020", nome: "dTpa", dose: "Dose única", dataAplicacao: "2025-10-10", dataPrevista: "2025-10-01", status: "aplicada" },
  { id: "vac-037", gestanteId: "gest-020", nome: "Influenza", dose: "Dose única", dataAplicacao: "2025-06-20", dataPrevista: "2025-06-15", status: "aplicada" },
  // Ivone (atrasada)
  { id: "vac-038", gestanteId: "gest-035", nome: "dTpa", dose: "Dose única", dataPrevista: "2025-12-20", status: "atrasada" },
  { id: "vac-039", gestanteId: "gest-035", nome: "Influenza", dose: "Dose única", dataPrevista: "2025-10-01", status: "atrasada" },
  // Gabriela (adolescente)
  { id: "vac-040", gestanteId: "gest-007", nome: "dTpa", dose: "Dose única", dataPrevista: "2026-04-10", status: "pendente" },
  { id: "vac-041", gestanteId: "gest-007", nome: "Influenza", dose: "Dose única", dataPrevista: "2026-02-15", status: "pendente" },
  // Débora (múltiplos riscos)
  { id: "vac-042", gestanteId: "gest-030", nome: "dTpa", dose: "Dose única", dataAplicacao: "2026-01-10", dataPrevista: "2026-01-05", status: "aplicada" },
  { id: "vac-043", gestanteId: "gest-030", nome: "Influenza", dose: "Dose única", dataPrevista: "2025-10-15", status: "atrasada" },
  // Helena (adolescente, violência doméstica)
  { id: "vac-044", gestanteId: "gest-008", nome: "dTpa", dose: "Dose única", dataPrevista: "2026-04-01", status: "pendente" },
  { id: "vac-045", gestanteId: "gest-008", nome: "Influenza", dose: "Dose única", dataPrevista: "2026-02-01", status: "atrasada" },
  // Zilda (40+)
  { id: "vac-046", gestanteId: "gest-026", nome: "dTpa", dose: "Dose única", dataAplicacao: "2025-12-05", dataPrevista: "2025-12-01", status: "aplicada" },
  { id: "vac-047", gestanteId: "gest-026", nome: "Influenza", dose: "Dose única", dataAplicacao: "2025-09-01", dataPrevista: "2025-08-25", status: "aplicada" },
];

// ── Medicações ─────────────────────────────────────────

export const MOCK_MEDICACOES: Medicacao[] = [
  { id: "med-001", gestanteId: "gest-001", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-09-25", ativa: true },
  { id: "med-002", gestanteId: "gest-001", nome: "Sulfato ferroso", dosagem: "40mg Fe elementar", frequencia: "1x ao dia", dataInicio: "2025-09-25", ativa: true, observacoes: "Tomar longe das refeições" },
  { id: "med-003", gestanteId: "gest-002", nome: "Metildopa", dosagem: "250mg", frequencia: "3x ao dia", dataInicio: "2025-08-10", ativa: true, observacoes: "Controle de hipertensão" },
  { id: "med-004", gestanteId: "gest-002", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-07-20", ativa: true },
  { id: "med-005", gestanteId: "gest-003", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-11-20", ativa: true },
  { id: "med-006", gestanteId: "gest-003", nome: "Sulfato ferroso", dosagem: "40mg Fe elementar", frequencia: "1x ao dia", dataInicio: "2025-11-20", ativa: true },
  // Gabriela (adolescente)
  { id: "med-007", gestanteId: "gest-007", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2026-01-15", ativa: true },
  // Juliana (HIV)
  { id: "med-008", gestanteId: "gest-010", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-09-15", ativa: true },
  { id: "med-009", gestanteId: "gest-010", nome: "Sulfato ferroso", dosagem: "40mg Fe elementar", frequencia: "1x ao dia", dataInicio: "2025-09-15", ativa: true },
  // Raquel (diabetes prévio)
  { id: "med-010", gestanteId: "gest-017", nome: "Insulina NPH", dosagem: "20UI", frequencia: "2x ao dia", dataInicio: "2025-07-28", ativa: true, observacoes: "Diabetes mellitus prévio" },
  { id: "med-011", gestanteId: "gest-017", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-07-28", ativa: true },
  // Isabela (gestação múltipla)
  { id: "med-012", gestanteId: "gest-009", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-10-25", ativa: true },
  { id: "med-013", gestanteId: "gest-009", nome: "Sulfato ferroso", dosagem: "40mg Fe elementar", frequencia: "1x ao dia", dataInicio: "2025-10-25", ativa: true },
  // Zilda (40+, hipertensão)
  { id: "med-014", gestanteId: "gest-026", nome: "Metildopa", dosagem: "500mg", frequencia: "3x ao dia", dataInicio: "2025-08-01", ativa: true, observacoes: "Controle de hipertensão" },
  { id: "med-015", gestanteId: "gest-026", nome: "AAS", dosagem: "100mg", frequencia: "1x ao dia", dataInicio: "2025-08-01", ativa: true, observacoes: "Prevenção de pré-eclâmpsia" },
  { id: "med-016", gestanteId: "gest-026", nome: "Cálcio", dosagem: "1g", frequencia: "1x ao dia", dataInicio: "2025-08-01", ativa: true },
  // Débora (múltiplos riscos)
  { id: "med-017", gestanteId: "gest-030", nome: "Metildopa", dosagem: "250mg", frequencia: "3x ao dia", dataInicio: "2025-09-20", ativa: true },
  { id: "med-018", gestanteId: "gest-030", nome: "Insulina NPH", dosagem: "15UI", frequencia: "2x ao dia", dataInicio: "2025-09-20", ativa: true },
  { id: "med-019", gestanteId: "gest-030", nome: "AAS", dosagem: "100mg", frequencia: "1x ao dia", dataInicio: "2025-09-20", ativa: true },
  // Sandra (perto do parto)
  { id: "med-020", gestanteId: "gest-019", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-07-05", ativa: true },
  { id: "med-021", gestanteId: "gest-019", nome: "Sulfato ferroso", dosagem: "40mg Fe elementar", frequencia: "1x ao dia", dataInicio: "2025-07-05", ativa: true },
  // Patrícia (ITU de repetição)
  { id: "med-022", gestanteId: "gest-016", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-09-15", ativa: true },
  // Bianca (multípara habitual)
  { id: "med-023", gestanteId: "gest-028", nome: "Ácido fólico", dosagem: "5mg", frequencia: "1x ao dia", dataInicio: "2025-10-15", ativa: true },
  { id: "med-024", gestanteId: "gest-028", nome: "Sulfato ferroso", dosagem: "40mg Fe elementar", frequencia: "1x ao dia", dataInicio: "2025-10-15", ativa: true },
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
  // Gabriela (adolescente, bolsa família)
  {
    id: "tc-005", gestanteId: "gest-007", numeroTranscard: "TC-001-0045", cpf: "321.098.765-66",
    situacao: "ativo", dataVinculacao: "2026-01-10", etapaAtual: 1,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2026-01-15",
  },
  // Helena (adolescente, violência doméstica)
  {
    id: "tc-006", gestanteId: "gest-008", numeroTranscard: "TC-007-0015", cpf: "210.987.654-77",
    situacao: "ativo", dataVinculacao: "2025-12-25", etapaAtual: 1,
    lgpdConsentimento: "assinado-fisico", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2026-01-05",
  },
  // Juliana (HIV)
  {
    id: "tc-007", gestanteId: "gest-010", numeroTranscard: "TC-007-0016", cpf: "098.765.432-99",
    situacao: "ativo", dataVinculacao: "2025-09-15", etapaAtual: 2,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2025-10-01",
  },
  // Larissa (histórico prematuridade)
  {
    id: "tc-008", gestanteId: "gest-012", numeroTranscard: "TC-002-0031", cpf: "876.543.210-21",
    situacao: "ativo", dataVinculacao: "2025-09-01", etapaAtual: 2,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
  // Raíssa (indígena)
  {
    id: "tc-009", gestanteId: "gest-018", numeroTranscard: "TC-001-0046", cpf: "210.987.654-87",
    situacao: "ativo", dataVinculacao: "2025-12-20", etapaAtual: 1,
    lgpdConsentimento: "assinado-fisico", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2026-01-10",
  },
  // Sandra (39 sem, perto do parto)
  {
    id: "tc-010", gestanteId: "gest-019", numeroTranscard: "TC-008-0008", cpf: "109.876.543-98",
    situacao: "ativo", dataVinculacao: "2025-07-10", etapaAtual: 3,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
  // Tatiana (40 sem)
  {
    id: "tc-011", gestanteId: "gest-020", numeroTranscard: "TC-002-0032", cpf: "098.765.432-09",
    situacao: "ativo", dataVinculacao: "2025-06-25", etapaAtual: 3,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
  // Ximena (recusou transcard)
  {
    id: "tc-012", gestanteId: "gest-024", numeroTranscard: "", cpf: "654.321.098-53",
    situacao: "recusado", dataVinculacao: "2025-11-05", etapaAtual: 1,
    lgpdConsentimento: "pendente", recusouTranscard: true, recusouKitEnxoval: true,
    encaminhadaCras: false,
  },
  // Yasmin (sífilis)
  {
    id: "tc-013", gestanteId: "gest-025", numeroTranscard: "TC-006-0037", cpf: "543.210.987-64",
    situacao: "ativo", dataVinculacao: "2025-09-15", etapaAtual: 2,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2025-10-20",
  },
  // Zilda (40+, hipertensão)
  {
    id: "tc-014", gestanteId: "gest-026", numeroTranscard: "TC-005-0021", cpf: "432.109.876-75",
    situacao: "ativo", dataVinculacao: "2025-08-15", etapaAtual: 3,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2025-11-01",
  },
  // Bianca (multípara habitual)
  {
    id: "tc-015", gestanteId: "gest-028", numeroTranscard: "TC-006-0038", cpf: "210.987.654-97",
    situacao: "ativo", dataVinculacao: "2025-10-25", etapaAtual: 2,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
  // Débora (múltiplos riscos)
  {
    id: "tc-016", gestanteId: "gest-030", numeroTranscard: "TC-006-0039", cpf: "098.765.432-19",
    situacao: "ativo", dataVinculacao: "2025-09-20", etapaAtual: 2,
    lgpdConsentimento: "assinado-fisico", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2025-12-01",
  },
  // Francisca (grande multípara, subúrbio)
  {
    id: "tc-017", gestanteId: "gest-032", numeroTranscard: "TC-007-0016", cpf: "876.543.210-41",
    situacao: "inconsistencia", dataVinculacao: "2025-10-15", etapaAtual: 1,
    lgpdConsentimento: "assinado-fisico", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: true, dataEncaminhamentoCras: "2025-11-10",
  },
  // Olivia (uso de substâncias) — recusou kit enxoval
  {
    id: "tc-018", gestanteId: "gest-015", numeroTranscard: "TC-007-0016", cpf: "543.210.987-54",
    situacao: "ativo", dataVinculacao: "2025-12-01", etapaAtual: 1,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: true,
    encaminhadaCras: true, dataEncaminhamentoCras: "2025-12-15",
  },
  // Raquel (diabetes, 35 sem)
  {
    id: "tc-019", gestanteId: "gest-017", numeroTranscard: "TC-004-0058", cpf: "321.098.765-76",
    situacao: "ativo", dataVinculacao: "2025-08-01", etapaAtual: 3,
    lgpdConsentimento: "assinado-digital", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
  // Joana (início tardio) — pendente
  {
    id: "tc-020", gestanteId: "gest-036", numeroTranscard: "TC-002-0033", cpf: "432.109.876-85",
    situacao: "pendente", dataVinculacao: "2025-12-15", etapaAtual: 1,
    lgpdConsentimento: "pendente", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
  // Ivone (consultas atrasadas)
  {
    id: "tc-021", gestanteId: "gest-035", numeroTranscard: "TC-006-0040", cpf: "543.210.987-74",
    situacao: "inconsistencia", dataVinculacao: "2025-09-01", etapaAtual: 1,
    lgpdConsentimento: "assinado-fisico", recusouTranscard: false, recusouKitEnxoval: false,
    encaminhadaCras: false,
  },
];

// ── Casos de Sífilis ───────────────────────────────────

export const MOCK_CASOS_SIFILIS: CasoSifilis[] = [
  { id: "sif-001", gestanteId: "gest-002", classificacao: "recente", dataDeteccao: "2025-09-12", idadeGestacionalDeteccao: 14, tratamentoIniciado: true, tratamentoConcluido: true, parceiroTratado: true },
  { id: "sif-002", gestanteId: "gest-004", classificacao: "tardia", dataDeteccao: "2025-08-20", idadeGestacionalDeteccao: 6, tratamentoIniciado: true, tratamentoConcluido: false, parceiroTratado: false },
  { id: "sif-003", gestanteId: "gest-006", classificacao: "recente", dataDeteccao: "2025-12-15", idadeGestacionalDeteccao: 7, tratamentoIniciado: true, tratamentoConcluido: true, parceiroTratado: true },
  // Yasmin — sífilis recente, tratamento adequado
  { id: "sif-004", gestanteId: "gest-025", classificacao: "recente", dataDeteccao: "2025-09-20", idadeGestacionalDeteccao: 7, tratamentoIniciado: true, tratamentoConcluido: true, parceiroTratado: true },
  // Débora — sífilis indeterminada, em tratamento, parceiro não tratado
  { id: "sif-005", gestanteId: "gest-030", classificacao: "indeterminada", dataDeteccao: "2025-10-05", idadeGestacionalDeteccao: 8, tratamentoIniciado: true, tratamentoConcluido: false, parceiroTratado: false },
  // Olivia (uso de substâncias) — sífilis tardia, não iniciou tratamento
  { id: "sif-006", gestanteId: "gest-015", classificacao: "tardia", dataDeteccao: "2025-12-01", idadeGestacionalDeteccao: 5, tratamentoIniciado: false, tratamentoConcluido: false, parceiroTratado: false },
  // Francisca (grande multípara) — sífilis recente, tratamento concluído mas parceiro não
  { id: "sif-007", gestanteId: "gest-032", classificacao: "recente", dataDeteccao: "2025-10-20", idadeGestacionalDeteccao: 7, tratamentoIniciado: true, tratamentoConcluido: true, parceiroTratado: false },
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
