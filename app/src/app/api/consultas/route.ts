import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'profissional') {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  const body = await req.json()
  const { gestanteId, tipo, data, semanaGestacional, pesoKg, pressaoArterial, alturaUterina, batimentoCardiacoFetal, notas, ubs } = body

  if (!gestanteId || !tipo || !data) {
    return NextResponse.json({ erro: 'Campos obrigatórios: gestanteId, tipo, data.' }, { status: 400 })
  }

  const consulta = await prisma.consulta.create({
    data: {
      gestanteId,
      profissionalId: session.user.id,
      tipo,
      data: new Date(data),
      semanaGestacional: semanaGestacional ? parseInt(semanaGestacional) : null,
      pesoKg: pesoKg ? parseFloat(pesoKg) : null,
      pressaoArterial: pressaoArterial || null,
      alturaUterina: alturaUterina ? parseFloat(alturaUterina) : null,
      batimentoCardiacoFetal: batimentoCardiacoFetal ? parseInt(batimentoCardiacoFetal) : null,
      notas: notas || null,
      ubs: ubs || null,
    },
  })

  return NextResponse.json(consulta, { status: 201 })
}
