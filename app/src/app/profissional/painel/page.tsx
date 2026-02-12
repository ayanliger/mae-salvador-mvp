import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'
import Link from 'next/link'

export default async function PainelProfissional() {
  const session = await auth()

  const [totalGestantes, consultasRecentes, profissional] = await Promise.all([
    prisma.gestante.count({ where: { ativo: true } }),
    prisma.consulta.findMany({
      where: { profissionalId: session!.user.id },
      orderBy: { data: 'desc' },
      take: 5,
      include: { gestante: true },
    }),
    prisma.profissional.findUnique({ where: { id: session!.user.id } }),
  ])

  const consultasHoje = await prisma.consulta.count({
    where: {
      profissionalId: session!.user.id,
      data: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">
          Olá, {session!.user.name} 👋
        </h1>
        <p className="text-surface-500 mt-1">
          {profissional?.cargo} • {profissional?.ubs}
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="animate-fade-in stagger-1 opacity-0 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-5 text-white shadow-lg shadow-accent-200">
          <p className="text-accent-100 text-sm">Gestantes Cadastradas</p>
          <p className="text-3xl font-bold font-display mt-1">{totalGestantes}</p>
        </div>
        <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <p className="text-surface-500 text-sm">Consultas Hoje</p>
          <p className="text-3xl font-bold font-display text-surface-800 mt-1">{consultasHoje}</p>
        </div>
        <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <p className="text-surface-500 text-sm">Ações Rápidas</p>
          <div className="flex gap-2 mt-2">
            <Link
              href="/profissional/buscar"
              className="text-xs bg-accent-50 text-accent-700 px-3 py-1.5 rounded-lg font-medium hover:bg-accent-100 transition-all"
            >
              Buscar
            </Link>
            <Link
              href="/profissional/registrar"
              className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg font-medium hover:bg-primary-100 transition-all"
            >
              Registrar
            </Link>
          </div>
        </div>
      </div>

      {/* Consultas Recentes */}
      <div className="animate-fade-in stagger-4 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-4">Consultas Recentes</h2>
        {consultasRecentes.length > 0 ? (
          <div className="space-y-3">
            {consultasRecentes.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-surface-700">{c.gestante.nome}</p>
                  <p className="text-xs text-surface-400">
                    {c.tipo.replace('_', ' ')} {c.semanaGestacional ? `• ${c.semanaGestacional}ª sem` : ''}
                  </p>
                </div>
                <p className="text-xs text-surface-500">{formatarData(c.data)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-surface-400">Nenhuma consulta registrada</p>
        )}
      </div>
    </div>
  )
}
