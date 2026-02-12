import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function MedicacoesPage() {
  const session = await auth()
  const medicacoes = await prisma.medicacao.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: [{ ativo: 'desc' }, { dataInicio: 'desc' }],
  })

  const ativas = medicacoes.filter((m) => m.ativo)
  const inativas = medicacoes.filter((m) => !m.ativo)

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Medicações</h1>
        <p className="text-surface-500 mt-1">Medicamentos prescritos</p>
      </div>

      {/* Ativas */}
      {ativas.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-surface-700 mb-3">Em uso</h2>
          <div className="space-y-3">
            {ativas.map((m, i) => (
              <div
                key={m.id}
                className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border border-green-200 shadow-sm`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-semibold text-surface-800">{m.medicamento}</p>
                    <p className="text-sm text-surface-500 mt-0.5">{m.dosagem}</p>
                    {m.via && <p className="text-xs text-surface-400 mt-0.5">Via: {m.via}</p>}
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                    Ativo
                  </span>
                </div>
                <p className="text-xs text-surface-400 mt-2">
                  Desde {formatarData(m.dataInicio)}
                  {m.dataFim && ` até ${formatarData(m.dataFim)}`}
                </p>
                {m.observacao && (
                  <p className="mt-2 text-sm text-surface-500 bg-surface-50 rounded-lg p-3">{m.observacao}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inativas */}
      {inativas.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-surface-700 mb-3">Anteriores</h2>
          <div className="space-y-3">
            {inativas.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl p-5 border border-surface-200 shadow-sm opacity-70">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-medium text-surface-600">{m.medicamento}</p>
                    <p className="text-sm text-surface-400">{m.dosagem}</p>
                  </div>
                  <span className="text-xs bg-surface-100 text-surface-400 px-2.5 py-1 rounded-full">
                    Encerrado
                  </span>
                </div>
                <p className="text-xs text-surface-400 mt-2">
                  {formatarData(m.dataInicio)} - {m.dataFim ? formatarData(m.dataFim) : '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {medicacoes.length === 0 && (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <p className="text-surface-400">Nenhuma medicação registrada ainda.</p>
        </div>
      )}
    </div>
  )
}
