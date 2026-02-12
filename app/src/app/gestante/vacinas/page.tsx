import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function VacinasPage() {
  const session = await auth()
  const vacinas = await prisma.vacina.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: { data: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Vacinas</h1>
        <p className="text-surface-500 mt-1">Cartão de vacinação</p>
      </div>

      {vacinas.length > 0 ? (
        <div className="space-y-3">
          {vacinas.map((v, i) => (
            <div
              key={v.id}
              className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-surface-800">{v.nome}</p>
                  <p className="text-xs text-surface-400 mt-0.5">{v.codigoVacina} • {v.dose}</p>
                </div>
                <p className="text-sm text-surface-500">{formatarData(v.data)}</p>
              </div>
              {(v.lote || v.fabricante || v.localAplicacao) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.lote && (
                    <span className="text-xs bg-surface-100 text-surface-500 px-2.5 py-1 rounded-lg">
                      Lote: {v.lote}
                    </span>
                  )}
                  {v.fabricante && (
                    <span className="text-xs bg-surface-100 text-surface-500 px-2.5 py-1 rounded-lg">
                      {v.fabricante}
                    </span>
                  )}
                  {v.localAplicacao && (
                    <span className="text-xs bg-surface-100 text-surface-500 px-2.5 py-1 rounded-lg">
                      {v.localAplicacao}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <p className="text-surface-400">Nenhuma vacina registrada ainda.</p>
        </div>
      )}
    </div>
  )
}
