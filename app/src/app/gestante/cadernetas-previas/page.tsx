import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'
import { NovaGestacaoButton } from './NovaGestacaoButton'

export default async function CadernetasPreviasPage() {
  const session = await auth()
  const gestante = await prisma.gestante.findUnique({
    where: { id: session!.user.id },
  })

  if (!gestante) return null

  // Buscar cadernetas arquivadas por CPF (mesma pessoa, gestações anteriores)
  const arquivadas = await prisma.gestante.findMany({
    where: {
      cpf: gestante.cpf,
      statusCaderneta: 'ARQUIVADA',
    },
    orderBy: { dataDesfecho: 'desc' },
    include: {
      consultas: { select: { id: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Cadernetas</h1>
        <p className="text-surface-500 mt-1">Caderneta atual e gestações anteriores</p>
      </div>

      {/* Caderneta Atual */}
      <div className="animate-fade-in stagger-1 opacity-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-5 text-white shadow-lg shadow-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium">Caderneta Atual</p>
            <p className="text-xl font-bold font-display mt-1">
              {gestante.statusCaderneta === 'ATIVA' ? 'Ativa' : 'Arquivada'}
            </p>
            {gestante.dataUltimaMenstruacao && (
              <p className="text-primary-100 text-xs mt-1">
                DUM: {formatarData(gestante.dataUltimaMenstruacao)}
              </p>
            )}
          </div>
          <span className="text-4xl">📋</span>
        </div>
      </div>

      {/* Cadernetas Anteriores */}
      <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-6 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-4">Gestações Anteriores</h2>
        {arquivadas.length > 0 ? (
          <div className="space-y-3">
            {arquivadas.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 border border-surface-100">
                <div>
                  <p className="text-sm font-medium text-surface-700">
                    Gestação {a.dataDesfecho ? `— Desfecho em ${formatarData(a.dataDesfecho)}` : ''}
                  </p>
                  <p className="text-xs text-surface-400 mt-0.5">
                    {a.consultas.length} consulta(s) registrada(s)
                  </p>
                  {a.dataUltimaMenstruacao && (
                    <p className="text-xs text-surface-400">
                      DUM: {formatarData(a.dataUltimaMenstruacao)}
                    </p>
                  )}
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-surface-200 text-surface-600 font-medium">
                  Arquivada
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-surface-400">Nenhuma gestação anterior registrada.</p>
        )}
      </div>

      {/* Nova Gestação */}
      {gestante.statusCaderneta === 'ARQUIVADA' && (
        <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-6 border border-surface-200 shadow-sm text-center">
          <span className="text-4xl">🤰</span>
          <p className="text-surface-700 font-semibold mt-2">Nova Gestação?</p>
          <p className="text-sm text-surface-400 mt-1">
            Se você está grávida novamente, sinalize aqui para abrir uma nova caderneta.
          </p>
          <NovaGestacaoButton gestanteId={gestante.id} />
        </div>
      )}
    </div>
  )
}
