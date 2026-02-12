import { PrismaClient } from '../src/generated/prisma'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { hash } from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Iniciando seed...')

  // Limpar dados existentes
  await prisma.condicaoClinica.deleteMany()
  await prisma.medicacao.deleteMany()
  await prisma.vacina.deleteMany()
  await prisma.exame.deleteMany()
  await prisma.consulta.deleteMany()
  await prisma.gestante.deleteMany()
  await prisma.profissional.deleteMany()

  const senhaHash = await hash('123456', 10)

  // Profissionais
  const dra = await prisma.profissional.create({
    data: {
      cpf: '11122233344',
      nome: 'Ana Beatriz Costa',
      cargo: 'Médica de Família',
      registroConselho: 'CRM-BA 12345',
      ubs: 'UBS Barra',
      senha: senhaHash,
    },
  })

  const enf = await prisma.profissional.create({
    data: {
      cpf: '55566677788',
      nome: 'Carla Souza Lima',
      cargo: 'Enfermeira',
      registroConselho: 'COREN-BA 67890',
      ubs: 'UBS Barra',
      senha: senhaHash,
    },
  })

  // Gestante 1: Baixo risco, 28 semanas
  const maria = await prisma.gestante.create({
    data: {
      cpf: '12345678909',
      nome: 'Maria da Silva Santos',
      dataNascimento: new Date('1995-03-15'),
      telefone: '71999001122',
      email: 'maria.silva@email.com',
      endereco: 'Rua da Paz, 123 - Barra',
      bairro: 'Barra',
      cep: '40140-000',
      ubsVinculada: 'UBS Barra',
      dataUltimaMenstruacao: new Date('2025-08-01'),
      dataProvavelParto: new Date('2026-05-08'),
      riscoGestacional: 'HABITUAL',
      senha: senhaHash,
    },
  })

  // Gestante 2: Alto risco, diabetes gestacional
  const joana = await prisma.gestante.create({
    data: {
      cpf: '98765432100',
      nome: 'Joana Oliveira Mendes',
      nomeSocial: 'Joana',
      dataNascimento: new Date('1988-11-20'),
      telefone: '71988112233',
      endereco: 'Av. Oceânica, 456 - Ondina',
      bairro: 'Ondina',
      cep: '40170-010',
      ubsVinculada: 'UBS Barra',
      dataUltimaMenstruacao: new Date('2025-06-15'),
      dataProvavelParto: new Date('2026-03-22'),
      riscoGestacional: 'ALTO',
      senha: senhaHash,
    },
  })

  // Gestante 3: Puérpera recente
  const lucia = await prisma.gestante.create({
    data: {
      cpf: '45678912300',
      nome: 'Lúcia Ferreira Alves',
      dataNascimento: new Date('1992-07-08'),
      telefone: '71977334455',
      endereco: 'Rua do Sol, 789 - Pituba',
      bairro: 'Pituba',
      cep: '41810-000',
      ubsVinculada: 'UBS Barra',
      dataUltimaMenstruacao: new Date('2025-03-10'),
      dataProvavelParto: new Date('2025-12-15'),
      riscoGestacional: 'HABITUAL',
      senha: senhaHash,
    },
  })

  // Consultas para Maria (baixo risco)
  const consultasMaria = [
    { data: new Date('2025-10-10'), tipo: 'PRE_NATAL', semana: 10, peso: 62.5, pa: '110/70', au: 10, bcf: null, notas: 'Primeira consulta pré-natal. Gestante em bom estado geral.' },
    { data: new Date('2025-11-14'), tipo: 'PRE_NATAL', semana: 15, peso: 63.8, pa: '115/75', au: 15, bcf: 140, notas: 'BCF presente. Sem queixas.' },
    { data: new Date('2025-12-12'), tipo: 'PRE_NATAL', semana: 19, peso: 65.2, pa: '110/70', au: 19, bcf: 144, notas: 'Solicitada ultrassonografia morfológica.' },
    { data: new Date('2026-01-16'), tipo: 'PRE_NATAL', semana: 24, peso: 67.0, pa: '120/80', au: 24, bcf: 138, notas: 'Resultado do morfológico normal. Tudo bem.' },
    { data: new Date('2026-02-13'), tipo: 'PRE_NATAL', semana: 28, peso: 68.5, pa: '115/75', au: 28, bcf: 142, notas: 'Solicitado TOTG e hemograma.' },
    { data: new Date('2026-03-15'), tipo: 'PRE_NATAL', semana: 32, peso: null, pa: null, au: null, bcf: null, notas: null },
  ]

  for (const c of consultasMaria) {
    await prisma.consulta.create({
      data: {
        gestanteId: maria.id,
        profissionalId: dra.id,
        data: c.data,
        tipo: c.tipo,
        semanaGestacional: c.semana,
        pesoKg: c.peso,
        pressaoArterial: c.pa,
        alturaUterina: c.au,
        batimentoCardiacoFetal: c.bcf,
        notas: c.notas,
        ubs: 'UBS Barra',
      },
    })
  }

  // Consultas para Joana (alto risco)
  const consultasJoana = [
    { data: new Date('2025-08-20'), tipo: 'PRE_NATAL', semana: 9, peso: 78.0, pa: '130/85', au: null, bcf: null, notas: 'Paciente com HAS prévia. Classificada como alto risco.' },
    { data: new Date('2025-09-17'), tipo: 'PRE_NATAL', semana: 13, peso: 79.2, pa: '135/90', au: 13, bcf: 150, notas: 'Encaminhada para pré-natal de alto risco.' },
    { data: new Date('2025-10-15'), tipo: 'PRE_NATAL', semana: 17, peso: 80.5, pa: '130/85', au: 17, bcf: 146, notas: 'TOTG alterado — diabetes gestacional diagnosticada.' },
    { data: new Date('2025-11-12'), tipo: 'PRE_NATAL', semana: 21, peso: 81.0, pa: '125/80', au: 21, bcf: 142, notas: 'Iniciada insulina NPH. Controle glicêmico capilar orientado.' },
    { data: new Date('2025-12-10'), tipo: 'PRE_NATAL', semana: 25, peso: 82.3, pa: '130/85', au: 25, bcf: 140, notas: 'Glicemia capilar com boa resposta à insulina.' },
    { data: new Date('2026-01-14'), tipo: 'PRE_NATAL', semana: 30, peso: 83.5, pa: '135/85', au: 30, bcf: 138, notas: 'Solicitada USG com doppler. Manter acompanhamento quinzenal.' },
    { data: new Date('2026-02-11'), tipo: 'PRE_NATAL', semana: 34, peso: 84.0, pa: '130/80', au: 33, bcf: 140, notas: 'Doppler normal. Agendar parto para 38-39 semanas.' },
  ]

  for (const c of consultasJoana) {
    await prisma.consulta.create({
      data: {
        gestanteId: joana.id,
        profissionalId: dra.id,
        data: c.data,
        tipo: c.tipo,
        semanaGestacional: c.semana,
        pesoKg: c.peso,
        pressaoArterial: c.pa,
        alturaUterina: c.au,
        batimentoCardiacoFetal: c.bcf,
        notas: c.notas,
        ubs: 'UBS Barra',
      },
    })
  }

  // Consultas para Lúcia (puérpera)
  await prisma.consulta.create({
    data: {
      gestanteId: lucia.id,
      profissionalId: enf.id,
      data: new Date('2025-12-22'),
      tipo: 'PUERPERIO',
      notas: 'Puerpério imediato. Aleitamento materno exclusivo. Sem intercorrências.',
      ubs: 'UBS Barra',
    },
  })

  // Exames Maria
  const examesMaria = [
    { tipo: 'HEMOGRAMA', data: new Date('2025-10-15'), resultado: 'Hb 12.5 g/dL, Ht 37%', status: 'RESULTADO_DISPONIVEL', unidade: '' },
    { tipo: 'GLICEMIA JEJUM', data: new Date('2025-10-15'), resultado: '82', status: 'RESULTADO_DISPONIVEL', unidade: 'mg/dL' },
    { tipo: 'TIPAGEM SANGUÍNEA', data: new Date('2025-10-15'), resultado: 'O+', status: 'RESULTADO_DISPONIVEL', unidade: '' },
    { tipo: 'HIV', data: new Date('2025-10-15'), resultado: 'Não reagente', status: 'RESULTADO_DISPONIVEL', unidade: '' },
    { tipo: 'SÍFILIS (VDRL)', data: new Date('2025-10-15'), resultado: 'Não reagente', status: 'RESULTADO_DISPONIVEL', unidade: '' },
    { tipo: 'HEPATITE B (HBsAg)', data: new Date('2025-10-15'), resultado: 'Não reagente', status: 'RESULTADO_DISPONIVEL', unidade: '' },
    { tipo: 'TOXOPLASMOSE IgG/IgM', data: new Date('2025-10-15'), resultado: 'IgG reagente, IgM não reagente', status: 'RESULTADO_DISPONIVEL', unidade: '' },
    { tipo: 'ULTRASSOM OBSTÉTRICO', data: new Date('2025-12-20'), resultado: 'Feto único, cefálico, placenta posterior, ILA normal', status: 'RESULTADO_DISPONIVEL', unidade: '' },
    { tipo: 'TOTG 75g', data: new Date('2026-02-15'), resultado: null, status: 'SOLICITADO', unidade: '' },
    { tipo: 'HEMOGRAMA 3º TRI', data: new Date('2026-02-15'), resultado: null, status: 'SOLICITADO', unidade: '' },
  ]

  for (const e of examesMaria) {
    await prisma.exame.create({
      data: { gestanteId: maria.id, tipo: e.tipo, data: e.data, resultado: e.resultado, status: e.status, unidade: e.unidade || null },
    })
  }

  // Exames Joana
  const examesJoana = [
    { tipo: 'HEMOGRAMA', data: new Date('2025-08-25'), resultado: 'Hb 11.8 g/dL, Ht 35%', status: 'RESULTADO_DISPONIVEL' },
    { tipo: 'GLICEMIA JEJUM', data: new Date('2025-08-25'), resultado: '98', status: 'RESULTADO_DISPONIVEL' },
    { tipo: 'TOTG 75g', data: new Date('2025-10-20'), resultado: 'Jejum: 95 | 1h: 195 | 2h: 162 — ALTERADO', status: 'RESULTADO_DISPONIVEL' },
    { tipo: 'HEMOGLOBINA GLICADA', data: new Date('2025-11-15'), resultado: '6.2%', status: 'RESULTADO_DISPONIVEL' },
    { tipo: 'USG COM DOPPLER', data: new Date('2026-01-20'), resultado: 'Fluxo umbilical e uterino normais. Peso fetal estimado: 1.850g', status: 'RESULTADO_DISPONIVEL' },
  ]

  for (const e of examesJoana) {
    await prisma.exame.create({
      data: { gestanteId: joana.id, tipo: e.tipo, data: e.data, resultado: e.resultado, status: e.status },
    })
  }

  // Vacinas Maria
  const vacinasMaria = [
    { codigo: 'dTpa', nome: 'Tríplice Bacteriana Acelular', data: new Date('2025-11-20'), dose: '1ª dose', lote: 'ABC123', fabricante: 'Sanofi' },
    { codigo: 'INFLUENZA', nome: 'Influenza (Gripe)', data: new Date('2025-10-15'), dose: 'Dose única', lote: 'FLU2025', fabricante: 'Butantan' },
    { codigo: 'HEPATITE_B', nome: 'Hepatite B', data: new Date('2025-10-15'), dose: 'Reforço', lote: 'HB456', fabricante: 'Fiocruz' },
  ]

  for (const v of vacinasMaria) {
    await prisma.vacina.create({
      data: {
        gestanteId: maria.id,
        codigoVacina: v.codigo,
        nome: v.nome,
        data: v.data,
        dose: v.dose,
        lote: v.lote,
        fabricante: v.fabricante,
        localAplicacao: 'UBS Barra',
      },
    })
  }

  // Vacinas Joana
  await prisma.vacina.create({
    data: {
      gestanteId: joana.id,
      codigoVacina: 'dTpa',
      nome: 'Tríplice Bacteriana Acelular',
      data: new Date('2025-09-20'),
      dose: '1ª dose',
      lote: 'DTP789',
      fabricante: 'Sanofi',
      localAplicacao: 'UBS Barra',
    },
  })

  // Medicações Maria
  await prisma.medicacao.create({
    data: {
      gestanteId: maria.id,
      medicamento: 'Ácido Fólico',
      dosagem: '5mg 1x/dia',
      via: 'ORAL',
      dataInicio: new Date('2025-10-10'),
      ativo: true,
      observacao: 'Suplementação durante toda a gestação',
    },
  })

  await prisma.medicacao.create({
    data: {
      gestanteId: maria.id,
      medicamento: 'Sulfato Ferroso',
      dosagem: '40mg Fe elementar 1x/dia',
      via: 'ORAL',
      dataInicio: new Date('2025-11-14'),
      ativo: true,
      observacao: 'Tomar longe das refeições',
    },
  })

  // Medicações Joana
  await prisma.medicacao.create({
    data: {
      gestanteId: joana.id,
      medicamento: 'Insulina NPH',
      dosagem: '10UI manhã + 6UI noite',
      via: 'SUBCUTANEA',
      dataInicio: new Date('2025-11-12'),
      ativo: true,
      observacao: 'Ajustar dose conforme glicemia capilar',
    },
  })

  await prisma.medicacao.create({
    data: {
      gestanteId: joana.id,
      medicamento: 'Metildopa',
      dosagem: '250mg 3x/dia',
      via: 'ORAL',
      dataInicio: new Date('2025-08-20'),
      ativo: true,
      observacao: 'Controle de HAS crônica',
    },
  })

  await prisma.medicacao.create({
    data: {
      gestanteId: joana.id,
      medicamento: 'Ácido Fólico',
      dosagem: '5mg 1x/dia',
      via: 'ORAL',
      dataInicio: new Date('2025-08-20'),
      ativo: true,
    },
  })

  // Condições Clínicas Joana
  await prisma.condicaoClinica.create({
    data: {
      gestanteId: joana.id,
      codigoCid: 'O24.4',
      descricao: 'Diabetes mellitus gestacional',
      dataInicio: new Date('2025-10-15'),
      status: 'ATIVO',
      gravidade: 'MODERADO',
    },
  })

  await prisma.condicaoClinica.create({
    data: {
      gestanteId: joana.id,
      codigoCid: 'O10.0',
      descricao: 'Hipertensão essencial pré-existente complicando a gravidez',
      dataInicio: new Date('2025-08-20'),
      status: 'ATIVO',
      gravidade: 'MODERADO',
    },
  })

  console.log('✅ Seed concluído!')
  console.log('')
  console.log('📋 Credenciais de teste (senha: 123456 para todos):')
  console.log('   Gestante Maria: CPF 123.456.789-09')
  console.log('   Gestante Joana: CPF 987.654.321-00')
  console.log('   Gestante Lúcia: CPF 456.789.123-00')
  console.log('   Dra. Ana (médica): CPF 111.222.333-44')
  console.log('   Carla (enfermeira): CPF 555.666.777-88')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
