import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarDataHora } from '@/lib/utils'
import { MarcarLidaButton } from './MarcarLidaButton'

const iconesTipo: Record<string, string> = {
  CONSULTA: '📋',
  CARTAO: '💳',
  ALERTA: '⚠️',
  INFO: 'ℹ️',
}

export default async function NotificacoesPage() {
  const session = await auth()
  const notificacoes = await prisma.notificacao.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: { criadoEm: 'desc' },
  })

  const naoLidas = notificacoes.filter((n) => !n.lida)
  const lidas = notificacoes.filter((n) => n.lida)

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Notificações</h1>
        <p className="text-surface-500 mt-1">
          {naoLidas.length > 0 ? `${naoLidas.length} não lida(s)` : 'Todas as notificações lidas'}
        </p>
      </div>

      {naoLidas.length > 0 && (
        <div className="space-y-3">
          {naoLidas.map((n, i) => (
            <div key={n.id} className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border-l-4 border-primary-500 border border-surface-200 shadow-sm`}>
              <div className="flex items-start gap-3">
                <span className="text-xl">{iconesTipo[n.tipo] || 'ℹ️'}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-surface-800">{n.titulo}</p>
                  <p className="text-sm text-surface-600 mt-1">{n.mensagem}</p>
                  <p className="text-xs text-surface-400 mt-2">{formatarDataHora(n.criadoEm)}</p>
                </div>
                <MarcarLidaButton id={n.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      {lidas.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-surface-500 mb-3 text-sm">Anteriores</h2>
          <div className="space-y-2">
            {lidas.map((n) => (
              <div key={n.id} className="bg-white rounded-2xl p-4 border border-surface-200 shadow-sm opacity-60">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{iconesTipo[n.tipo] || 'ℹ️'}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-surface-700">{n.titulo}</p>
                    <p className="text-xs text-surface-500 mt-0.5">{n.mensagem}</p>
                    <p className="text-xs text-surface-400 mt-1">{formatarDataHora(n.criadoEm)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {notificacoes.length === 0 && (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <span className="text-4xl">🔔</span>
          <p className="text-surface-400 mt-2">Nenhuma notificação.</p>
        </div>
      )}
    </div>
  )
}
