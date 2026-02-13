import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { validarCPF } from '@/lib/utils'
import { notificacaoBeneficiosMaeSalvador } from '@/lib/notificacoes-templates'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { cpf, nome, dataNascimento, telefone, endereco, senha } = body

  const cpfLimpo = cpf?.replace(/\D/g, '')

  if (!cpfLimpo || !validarCPF(cpfLimpo)) {
    return NextResponse.json({ erro: 'CPF inválido.' }, { status: 400 })
  }

  if (!nome || !dataNascimento || !telefone || !endereco || !senha) {
    return NextResponse.json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' }, { status: 400 })
  }

  if (!body.comoDescobriuGestacao) {
    return NextResponse.json({ erro: 'Informe como descobriu a gestação.' }, { status: 400 })
  }

  const existente = await prisma.gestante.findUnique({ where: { cpf: cpfLimpo } })
  if (existente) {
    return NextResponse.json({ erro: 'CPF já cadastrado.' }, { status: 409 })
  }

  const senhaHash = await hash(senha, 10)

  const dpp = body.dataUltimaMenstruacao
    ? new Date(new Date(body.dataUltimaMenstruacao).getTime() + 280 * 24 * 60 * 60 * 1000)
    : null

  const gestante = await prisma.gestante.create({
    data: {
      cpf: cpfLimpo,
      cns: body.cns || null,
      nome,
      nomeSocial: body.nomeSocial || null,
      dataNascimento: new Date(dataNascimento),
      telefone,
      temWhatsapp: body.temWhatsapp ?? false,
      email: body.email || null,
      endereco,
      bairro: body.bairro || null,
      cep: body.cep || null,
      comoDescobriuGestacao: body.comoDescobriuGestacao,
      programaSocial: body.programaSocial || null,
      temPlanoSaude: body.temPlanoSaude ?? false,
      desejaSeguimentoUbs: body.desejaSeguimentoUbs ?? true,
      dataUltimaMenstruacao: body.dataUltimaMenstruacao ? new Date(body.dataUltimaMenstruacao) : null,
      dataProvavelParto: dpp,
      numGestacoesPrevia: body.numGestacoesPrevia ?? null,
      numPartosNormais: body.numPartosNormais ?? null,
      numPartosCesareos: body.numPartosCesareos ?? null,
      numAbortosPrevia: body.numAbortosPrevia ?? null,
      alergias: body.alergias || null,
      doencasConhecidas: body.doencasConhecidas || null,
      medicacoesPreExistentes: body.medicacoesPreExistentes || null,
      desejoContracepcao: body.desejoContracepcao ?? null,
      senha: senhaHash,
    },
  })

  // Criar notificação de boas-vindas com benefícios do Mãe Salvador
  const ubsNome = gestante.ubsVinculada || 'sua unidade de saúde mais próxima'
  const notif = notificacaoBeneficiosMaeSalvador(ubsNome)
  await prisma.notificacao.create({
    data: {
      gestanteId: gestante.id,
      titulo: notif.titulo,
      mensagem: notif.mensagem,
      tipo: notif.tipo,
    },
  })

  return NextResponse.json({ id: gestante.id, nome: gestante.nome }, { status: 201 })
}
