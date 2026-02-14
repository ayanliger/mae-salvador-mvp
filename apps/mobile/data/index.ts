// Mock data for the mobile app — focused on primary gestante (Adriana)
// In production, this comes from the backend via sync

export const GESTANTE = {
  id: 'gest-001',
  nomeCompleto: 'Adriana Conceição Silva',
  cpf: '987.654.321-00',
  cns: '700001234567890',
  dataNascimento: '1995-03-12',
  telefone: '(71) 98812-3456',
  email: 'adriana.silva@email.com',
  endereco: 'Rua da Alegria, 42 — Bairro da Paz',
  tipoSanguineo: 'O+' as const,
  gestacoes: 2,
  partos: 1,
  abortos: 0,
  filhosVivos: 1,
  dum: '2025-08-15',
  dpp: '2026-05-22',
  idadeGestacionalSemanas: 26,
  riscoGestacional: 'habitual' as const,
  fatoresRisco: [] as string[],
  ubs: 'USF Bairro da Paz',
  maternidadeReferencia: 'Maternidade Albert Sabin',
  profissionalResponsavel: 'Enf. Carla Santos Oliveira',
  cartaoMaeSalvador: true,
};

export const CONSULTAS = [
  { id: 'c1', data: '2025-09-25', ig: 6, peso: 62.5, pa: '110/70', bcf: undefined as number | undefined, conduta: 'Orientação alimentar, prescrição de ácido fólico', profissional: 'Enf. Carla Santos Oliveira' },
  { id: 'c2', data: '2025-10-30', ig: 11, peso: 63.1, pa: '115/72', bcf: 152, conduta: 'Solicitação de exames do 1º trimestre', profissional: 'Enf. Carla Santos Oliveira' },
  { id: 'c3', data: '2025-12-04', ig: 16, peso: 64.8, pa: '112/68', bcf: 148, conduta: 'Gestação evoluindo bem', profissional: 'Dra. Ana Beatriz Souza' },
  { id: 'c4', data: '2026-01-08', ig: 21, peso: 66.2, pa: '118/74', bcf: 145, conduta: 'USG morfológica solicitada, vacinação dTpa agendada', profissional: 'Enf. Carla Santos Oliveira' },
  { id: 'c5', data: '2026-02-05', ig: 25, peso: 67.5, pa: '114/70', bcf: 140, conduta: 'Exames normais. Próxima consulta em 2 semanas', profissional: 'Enf. Carla Santos Oliveira' },
];

export const PROXIMA_CONSULTA = { data: '2026-02-19', hora: '09:00', local: 'USF Bairro da Paz', profissional: 'Enf. Carla Santos Oliveira' };

export const EXAMES = [
  { id: 'e1', nome: 'Hemograma completo', data: '2025-11-05', resultado: 'Hb 12.2 g/dL — Normal', trimestre: 1 },
  { id: 'e2', nome: 'Glicemia de jejum', data: '2025-11-05', resultado: '82 mg/dL — Normal', trimestre: 1 },
  { id: 'e3', nome: 'Tipagem sanguínea', data: '2025-11-03', resultado: 'O positivo', trimestre: 1 },
  { id: 'e4', nome: 'Teste rápido HIV', data: '2025-10-30', resultado: 'Não reagente', trimestre: 1 },
  { id: 'e5', nome: 'Teste rápido sífilis', data: '2025-10-30', resultado: 'Não reagente', trimestre: 1 },
  { id: 'e6', nome: 'USG obstétrica 1º tri', data: '2025-11-15', resultado: 'Gestação tópica única, BCF+', trimestre: 1 },
  { id: 'e7', nome: 'TOTG 75g', data: '2026-01-20', resultado: 'Normal', trimestre: 2 },
  { id: 'e8', nome: 'USG morfológica', data: undefined as string | undefined, resultado: undefined as string | undefined, trimestre: 2 },
];

export const VACINAS = [
  { id: 'v1', nome: 'dTpa', dose: 'Dose única', data: '2026-01-15', status: 'aplicada' as const },
  { id: 'v2', nome: 'Influenza', dose: 'Dose única', data: '2025-11-02', status: 'aplicada' as const },
  { id: 'v3', nome: 'Hepatite B', dose: '1ª dose', data: '2025-10-30', status: 'aplicada' as const },
  { id: 'v4', nome: 'Hepatite B', dose: '2ª dose', data: '2025-12-05', status: 'aplicada' as const },
  { id: 'v5', nome: 'Hepatite B', dose: '3ª dose', data: undefined as string | undefined, status: 'pendente' as const },
];

export const MEDICACOES = [
  { id: 'm1', nome: 'Ácido fólico', dosagem: '5mg', frequencia: '1x ao dia', obs: '' },
  { id: 'm2', nome: 'Sulfato ferroso', dosagem: '40mg Fe elementar', frequencia: '1x ao dia', obs: 'Tomar longe das refeições' },
];

export const REGISTROS_PESO = [
  { semana: 6, peso: 62.5 },
  { semana: 11, peso: 63.1 },
  { semana: 16, peso: 64.8 },
  { semana: 21, peso: 66.2 },
  { semana: 25, peso: 67.5 },
];

export const ANTECEDENTES_PESSOAIS = {
  doencasCronicas: [] as string[],
  alergias: ['Dipirona'],
  cirurgias: [] as string[],
  usoMedicamentos: false,
  tabagismo: false,
  etilismo: false,
  drogasIlicitas: false,
  historicoFamiliar: ['Diabetes mellitus (mãe)', 'Hipertensão arterial (pai)'],
};

export const ANTECEDENTES_OBSTETRICOS = [
  {
    ano: 2020,
    tipoParto: 'Normal',
    idadeGestacionalParto: 39,
    pesoRN: 3250,
    sexoRN: 'Masculino',
    complicacoes: [] as string[],
    desfecho: 'Nascido vivo',
  },
];

export const CONDICOES_GESTACAO = {
  fatoresRisco: [] as string[],
  condicoesAtuais: [] as string[],
  riscoClassificacao: 'habitual' as const,
  descobrimentoGestacao: 'teste-rapido' as const,
  primeiraConsultaIG: 6,
  suplementacao: ['Ácido fólico 5mg', 'Sulfato ferroso 40mg'],
};

export const SIFILIS = {
  testeRapido1Tri: { data: '2025-10-30', resultado: 'Não reagente' },
  testeRapido3Tri: null as { data: string; resultado: string } | null,
  casoConfirmado: false,
  tratamentoGestante: null as { inicio: string; conclusao: string; esquema: string } | null,
  tratamentoParceiro: null as { inicio: string; conclusao: string } | null,
};

export const CONSULTA_ODONTOLOGICA = {
  realizada: true,
  data: '2025-11-20',
  profissional: 'Dr. Marcos Vieira (Cirurgião-dentista)',
  local: 'USF Bairro da Paz',
  igSemanas: 14,
  condicaoBucal: 'Boa',
  tratamentoNecessario: false,
  observacoes: 'Sem cáries ativas. Orientações sobre higiene bucal na gestação.',
  proximaConsulta: null as string | null,
};

export const CONSULTA_PUERPERAL = {
  primeiraConsulta: {
    prevista: true,
    data: null as string | null,
    realizada: false,
    prazo: 'Até 10 dias após o parto',
  },
  segundaConsulta: {
    prevista: true,
    data: null as string | null,
    realizada: false,
    prazo: 'Até 42 dias após o parto',
  },
  orientacoes: [
    'Aleitamento materno exclusivo até 6 meses',
    'Cuidados com a cicatriz (se cesárea)',
    'Sinais de alerta: febre, sangramento intenso, dor abdominal',
    'Planejamento reprodutivo',
    'Saúde mental: atenção a sintomas de depressão pós-parto',
  ],
};

export const AVALIACAO_QUALIDADE = [
  { criterio: 'Início precoce do pré-natal (≤12 semanas)', atendido: true, detalhe: 'Primeira consulta na 6ª semana' },
  { criterio: 'Mínimo 7 consultas pré-natal', atendido: false, detalhe: '5 de 7 consultas realizadas' },
  { criterio: 'Exames do 1º trimestre completos', atendido: true, detalhe: 'Todos realizados' },
  { criterio: 'Teste rápido HIV no 1º trimestre', atendido: true, detalhe: 'Não reagente — 30/10/2025' },
  { criterio: 'Teste rápido sífilis no 1º trimestre', atendido: true, detalhe: 'Não reagente — 30/10/2025' },
  { criterio: 'Vacina dTpa aplicada', atendido: true, detalhe: 'Aplicada em 15/01/2026' },
  { criterio: 'Vacina Influenza aplicada', atendido: true, detalhe: 'Aplicada em 02/11/2025' },
  { criterio: 'Consulta odontológica realizada', atendido: true, detalhe: 'Realizada na 14ª semana' },
  { criterio: 'Suplementação de ácido fólico', atendido: true, detalhe: 'Em uso contínuo' },
  { criterio: 'Suplementação de sulfato ferroso', atendido: true, detalhe: 'Em uso contínuo' },
  { criterio: 'Ultrassonografia 1º trimestre', atendido: true, detalhe: 'Realizada em 15/11/2025' },
];

export const AVALIACOES_USUARIO = {
  usf: [
    { trimestre: 1, estrelas: 4, data: '2025-12-10', comentario: 'Bom atendimento, mas a espera foi longa.' },
    { trimestre: 2, estrelas: 5, data: '2026-01-20', comentario: 'Excelente! Equipe muito atenciosa.' },
    { trimestre: 3, estrelas: null as number | null, data: null as string | null, comentario: null as string | null },
  ],
  maternidade: {
    avaliada: false,
    estrelas: null as number | null,
    data: null as string | null,
    comentario: null as string | null,
  },
};

export const NOTIFICACOES = [
  { id: 'n1', titulo: 'Consulta agendada', msg: 'Sua próxima consulta é dia 19/02 às 09:00 na USF Bairro da Paz.', tipo: 'consulta' as const, lida: false, data: '2026-02-14' },
  { id: 'n2', titulo: 'Resultado disponível', msg: 'O resultado do exame TOTG 75g está disponível.', tipo: 'exame' as const, lida: true, data: '2026-01-20' },
  { id: 'n3', titulo: 'Vacina pendente', msg: 'A 3ª dose da Hepatite B está prevista para abril.', tipo: 'vacina' as const, lida: false, data: '2026-02-10' },
  { id: 'n4', titulo: 'Dica da semana', msg: 'Na 26ª semana, seu bebê já consegue abrir os olhos!', tipo: 'geral' as const, lida: false, data: '2026-02-12' },
];
