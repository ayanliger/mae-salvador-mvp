import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function ExamesPage() {
  const session = await auth()
  const exames = await prisma.exame.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: { data: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Exames</h1>
        <p className="text-surface-500 mt-1">Exames solicitados e resultados</p>
      </div>

      {exames.length > 0 ? (
        <div className="space-y-3">
          {exames.map((e, i) => (
            <div
              key={e.id}
              className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-surface-800">{e.tipo}</p>
                  <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium mt-1 ${
                    e.status === 'RESULTADO_DISPONIVEL' ? 'bg-green-100 text-green-700' :
                    e.status === 'REALIZADO' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {e.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-sm text-surface-500">{formatarData(e.data)}</p>
              </div>
              {e.resultado && (
                <div className="mt-3 bg-surface-50 rounded-xl p-3">
                  <p className="text-xs text-surface-400 mb-1">Resultado</p>
                  <p className="text-sm text-surface-700">{e.resultado} {e.unidade || ''}</p>
                </div>
              )}
              {e.observacao && (
                <p className="mt-2 text-sm text-surface-500">{e.observacao}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <p className="text-surface-400">Nenhum exame registrado ainda.</p>
        </div>
      )}
    </div>
  )
}
