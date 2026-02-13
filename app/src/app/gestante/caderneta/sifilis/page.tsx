import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

function calcularStatusDose(aplicacoes: { data: Date; dose: number }[], dosesNecessarias: number) {
  if (aplicacoes.length === 0) return { status: 'SEM_APLICACAO', proximaDose: null }
  const sorted = [...aplicacoes].sort((a, b) => a.data.getTime() - b.data.getTime())
  const ultima = sorted[sorted.length - 1]

  // Verificar se houve intervalo >9 dias entre doses (necessita retratamento)
  for (let i = 1; i < sorted.length; i++) {
    const diffDias = Math.floor((sorted[i].data.getTime() - sorted[i - 1].data.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDias > 9) {
      return { status: 'RETRATAMENTO', proximaDose: null }
    }
  }

  if (sorted.length >= dosesNecessarias) return { status: 'COMPLETO', proximaDose: null }

  const proxima = new Date(ultima.data.getTime() + 9 * 24 * 60 * 60 * 1000)
  return { status: 'EM_ANDAMENTO', proximaDose: proxima }
}

export default async function SifilisPage() {
  const session = await auth()
  const tratamentos = await prisma.tratamentoSifilis.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: { dataDiagnostico: 'desc' },
    include: {
      aplicacoes: { orderBy: { data: 'asc' } },
    },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Tratamento de Sífilis</h1>
        <p className="text-surface-500 mt-1">Acompanhamento do tratamento e aplicações de penicilina</p>
      </div>

      {tratamentos.length > 0 ? (
        <div className="space-y-4">
          {tratamentos.map((t, idx) => {
            const info = calcularStatusDose(t.aplicacoes, t.dosesNecessarias)
            return (
              <div key={t.id} className={`animate-fade-in stagger-${Math.min(idx + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border shadow-sm ${
                info.status === 'COMPLETO' ? 'border-green-200' :
                info.status === 'RETRATAMENTO' ? 'border-red-200' :
                'border-surface-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-semibold text-surface-800">
                      Sífilis {t.tipo === 'RECENTE' ? 'Recente' : 'Tardia'}
                      {t.subtipo && <span className="text-sm font-normal text-surface-400 ml-1">({t.subtipo.replace('_', ' ').toLowerCase()})</span>}
                    </p>
                    <p className="text-xs text-surface-400 mt-0.5">
                      CID/CIAP: {t.classificacaoCID} • Diagnóstico: {formatarData(t.dataDiagnostico)}
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    info.status === 'COMPLETO' ? 'bg-green-100 text-green-700' :
                    info.status === 'RETRATAMENTO' ? 'bg-red-100 text-red-700' :
                    info.status === 'SEM_APLICACAO' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {info.status === 'COMPLETO' ? 'Completo' :
                     info.status === 'RETRATAMENTO' ? 'Retratamento' :
                     info.status === 'SEM_APLICACAO' ? 'Sem aplicação' :
                     'Em andamento'}
                  </span>
                </div>

                {/* Doses */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-surface-700 mb-2">
                    Doses ({t.aplicacoes.length}/{t.dosesNecessarias})
                  </p>
                  <div className="flex gap-2 mb-3">
                    {Array.from({ length: t.dosesNecessarias }).map((_, i) => (
                      <div key={i} className={`flex-1 h-2 rounded-full ${
                        i < t.aplicacoes.length ? 'bg-primary-500' : 'bg-surface-200'
                      }`} />
                    ))}
                  </div>

                  {t.aplicacoes.length > 0 && (
                    <div className="space-y-2">
                      {t.aplicacoes.map((a) => (
                        <div key={a.id} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-50">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center">
                              {a.dose}
                            </span>
                            <span className="text-sm text-surface-700">{a.dose}ª dose</span>
                          </div>
                          <span className="text-xs text-surface-400">{formatarData(a.data)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {info.proximaDose && (
                    <div className="mt-3 p-3 rounded-xl bg-yellow-50 border border-yellow-100">
                      <p className="text-sm text-yellow-800">
                        <strong>Próxima dose:</strong> até {formatarData(info.proximaDose)}
                      </p>
                      <p className="text-xs text-yellow-600 mt-0.5">Intervalo máximo de 9 dias entre as aplicações.</p>
                    </div>
                  )}

                  {info.status === 'RETRATAMENTO' && (
                    <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-100">
                      <p className="text-sm text-red-800">
                        <strong>Retratamento necessário:</strong> o intervalo entre aplicações excedeu 9 dias. O tratamento precisa ser reiniciado.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <p className="text-surface-400">Nenhum tratamento de sífilis registrado.</p>
        </div>
      )}
    </div>
  )
}
