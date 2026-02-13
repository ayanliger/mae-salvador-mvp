import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function OdontologiaPage() {
  const session = await auth()
  const consultas = await prisma.consulta.findMany({
    where: { gestanteId: session!.user.id, tipo: 'ODONTOLOGICA' },
    orderBy: { data: 'desc' },
    include: { profissional: true },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Consulta Odontológica</h1>
        <p className="text-surface-500 mt-1">Acompanhamento odontológico durante a gestação</p>
      </div>

      {consultas.length > 0 ? (
        <div className="space-y-3">
          {consultas.map((c, i) => (
            <div key={c.id} className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block text-xs px-2.5 py-1 rounded-full font-medium bg-teal-100 text-teal-700 mb-2">
                    Odontológica
                  </span>
                  <p className="text-sm font-medium text-surface-700">
                    Dr(a). {c.profissional.nome}
                  </p>
                  <p className="text-xs text-surface-400">{c.profissional.cargo} • {c.ubs || 'UBS não informada'}</p>
                </div>
                <p className="text-sm font-medium text-surface-600">{formatarData(c.data)}</p>
              </div>
              {c.notas && (
                <p className="mt-3 text-sm text-surface-500 bg-surface-50 rounded-lg p-3">{c.notas}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <span className="text-3xl">🦷</span>
          <p className="text-surface-400 mt-2">Nenhuma consulta odontológica registrada.</p>
          <p className="text-xs text-surface-300 mt-1">O acompanhamento odontológico é recomendado durante a gestação.</p>
        </div>
      )}
    </div>
  )
}
