import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ erro: 'ID obrigatório.' }, { status: 400 })
  }

  await prisma.notificacao.update({
    where: { id, gestanteId: session.user.id },
    data: { lida: true },
  })

  return NextResponse.json({ ok: true })
}
