import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { validarCPF } from '@/lib/utils'

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

  const existente = await prisma.gestante.findUnique({ where: { cpf: cpfLimpo } })
  if (existente) {
    return NextResponse.json({ erro: 'CPF já cadastrado.' }, { status: 409 })
  }

  const senhaHash = await hash(senha, 10)

  const gestante = await prisma.gestante.create({
    data: {
      cpf: cpfLimpo,
      nome,
      nomeSocial: body.nomeSocial || null,
      dataNascimento: new Date(dataNascimento),
      telefone,
      email: body.email || null,
      endereco,
      bairro: body.bairro || null,
      cep: body.cep || null,
      senha: senhaHash,
    },
  })

  return NextResponse.json({ id: gestante.id, nome: gestante.nome }, { status: 201 })
}
