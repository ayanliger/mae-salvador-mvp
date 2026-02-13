import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function PNARPage() {
  const session = await auth()
  const encaminhamentos = await prisma.encaminhamentoPNAR.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: { dataEncaminhamento: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Pré-Natal de Alto Risco</h1>
        <p className="text-surface-500 mt-1">Encaminhamentos para PNAR (CIAP W84)</p>
      </div>

      {encaminhamentos.length > 0 ? (
        <div className="space-y-3">
          {encaminhamentos.map((e, i) => (
            <div key={e.id} className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-surface-800">
                    Encaminhamento PNAR
                  </p>
                  <p className="text-xs text-surface-400 mt-0.5">
                    CIAP: {e.ciap} • Encaminhado em {formatarData(e.dataEncaminhamento)}
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  e.consultaRealizada ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {e.consultaRealizada ? 'Consulta realizada' : 'Aguardando'}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {e.dataConsultaPNAR && (
                  <div className="bg-surface-50 rounded-xl p-3">
                    <p className="text-xs text-surface-400">Data da consulta PNAR</p>
                    <p className="text-sm font-semibold text-surface-700">
                      {formatarData(e.dataConsultaPNAR)}
                      {e.horarioConsultaPNAR && ` às ${e.horarioConsultaPNAR}`}
                    </p>
                  </div>
                )}
                {e.retornoRecomendado && (
                  <div className="bg-surface-50 rounded-xl p-3">
                    <p className="text-xs text-surface-400">Retorno recomendado</p>
                    <p className="text-sm font-semibold text-surface-700">{formatarData(e.retornoRecomendado)}</p>
                  </div>
                )}
              </div>

              {e.relatorioTexto && (
                <div className="mt-3 bg-surface-50 rounded-xl p-3">
                  <p className="text-xs text-surface-400 mb-1">Relatório</p>
                  <p className="text-sm text-surface-600">{e.relatorioTexto}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <p className="text-surface-400">Nenhum encaminhamento para PNAR registrado.</p>
        </div>
      )}
    </div>
  )
}
