import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function AvaliacaoPage() {
  const session = await auth()
  const avaliacoes = await prisma.avaliacao.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: { criadoEm: 'desc' },
  })

  const avalMaternidade = avaliacoes.filter((a) => a.tipo === 'MATERNIDADE')
  const avalPreNatal = avaliacoes.filter((a) => a.tipo === 'PRE_NATAL')

  const renderEstrelas = (nota: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`text-lg ${n <= nota ? 'text-yellow-400' : 'text-surface-200'}`}>★</span>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Avaliação</h1>
        <p className="text-surface-500 mt-1">Avalie seu atendimento na maternidade e pré-natal</p>
      </div>

      {/* Maternidade */}
      <div className="animate-fade-in stagger-1 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Maternidade</h2>
        {avalMaternidade.length > 0 ? (
          <div className="space-y-3">
            {avalMaternidade.map((a) => (
              <div key={a.id} className="flex items-start justify-between p-3 rounded-xl bg-surface-50">
                <div>
                  {renderEstrelas(a.nota)}
                  {a.comentario && <p className="text-sm text-surface-500 mt-1">{a.comentario}</p>}
                </div>
                <span className="text-xs text-surface-400">{formatarData(a.criadoEm)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-surface-400">Nenhuma avaliação da maternidade.</p>
        )}
      </div>

      {/* Pré-Natal */}
      <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Pré-Natal</h2>
        {avalPreNatal.length > 0 ? (
          <div className="space-y-3">
            {avalPreNatal.map((a) => (
              <div key={a.id} className="flex items-start justify-between p-3 rounded-xl bg-surface-50">
                <div>
                  {renderEstrelas(a.nota)}
                  {a.comentario && <p className="text-sm text-surface-500 mt-1">{a.comentario}</p>}
                  {a.consultaId && <p className="text-xs text-surface-300 mt-0.5">Avaliação por consulta</p>}
                </div>
                <span className="text-xs text-surface-400">{formatarData(a.criadoEm)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-surface-400">Nenhuma avaliação do pré-natal.</p>
        )}
      </div>
    </div>
  )
}
