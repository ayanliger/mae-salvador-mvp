import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'profissional') {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  const cpf = req.nextUrl.searchParams.get('cpf')?.replace(/\D/g, '')
  if (!cpf) {
    return NextResponse.json({ erro: 'CPF é obrigatório.' }, { status: 400 })
  }

  const gestante = await prisma.gestante.findUnique({
    where: { cpf },
    select: {
      id: true,
      cpf: true,
      nome: true,
      nomeSocial: true,
      dataNascimento: true,
      telefone: true,
      ubsVinculada: true,
      riscoGestacional: true,
      dataUltimaMenstruacao: true,
      dataProvavelParto: true,
      tipoGravidez: true,
      _count: {
        select: { consultas: true, exames: true, vacinas: true },
      },
    },
  })

  if (!gestante) {
    return NextResponse.json({ erro: 'Gestante não encontrada.' }, { status: 404 })
  }

  return NextResponse.json(gestante)
}
