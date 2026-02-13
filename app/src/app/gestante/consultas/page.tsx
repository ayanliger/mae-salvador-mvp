import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function ConsultasPage() {
  const session = await auth()
  const consultas = await prisma.consulta.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: { data: 'desc' },
    include: { profissional: true },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Consultas</h1>
        <p className="text-surface-500 mt-1">Histórico de consultas pré-natal</p>
      </div>

      {consultas.length > 0 ? (
        <div className="space-y-3">
          {consultas.map((c, i) => (
            <div
              key={c.id}
              className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${
                      c.tipo === 'PRE_NATAL' ? 'bg-primary-100 text-primary-700' :
                      c.tipo === 'PUERPERIO' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {c.tipo.replace('_', ' ')}
                    </span>
                    {c.semanaGestacional && (
                      <span className="text-xs text-surface-400">
                        {c.semanaGestacional}ª semana
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-surface-700 mt-2">
                    Dr(a). {c.profissional.nome}
                  </p>
                  <p className="text-xs text-surface-400">{c.profissional.cargo} • {c.ubs || 'UBS não informada'}</p>
                </div>
                <p className="text-sm font-medium text-surface-600">{formatarData(c.data)}</p>
              </div>

              {/* Dados clínicos */}
              {(c.pesoKg || c.pressaoArterial || c.alturaUterina || c.batimentoCardiacoFetal || c.imcConsulta || c.movimentacaoFetal) && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {c.pesoKg && (
                    <div className="bg-surface-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-surface-400">Peso</p>
                      <p className="text-sm font-semibold text-surface-700">{c.pesoKg} kg</p>
                    </div>
                  )}
                  {c.imcConsulta && (
                    <div className="bg-surface-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-surface-400">IMC</p>
                      <p className="text-sm font-semibold text-surface-700">{c.imcConsulta.toFixed(1)}</p>
                    </div>
                  )}
                  {c.pressaoArterial && (
                    <div className="bg-surface-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-surface-400">PA</p>
                      <p className="text-sm font-semibold text-surface-700">{c.pressaoArterial}</p>
                    </div>
                  )}
                  {c.alturaUterina && (
                    <div className="bg-surface-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-surface-400">AU</p>
                      <p className="text-sm font-semibold text-surface-700">{c.alturaUterina} cm</p>
                    </div>
                  )}
                  {c.batimentoCardiacoFetal && (
                    <div className="bg-surface-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-surface-400">BCF</p>
                      <p className="text-sm font-semibold text-surface-700">{c.batimentoCardiacoFetal} bpm</p>
                    </div>
                  )}
                  {c.movimentacaoFetal && (
                    <div className="bg-surface-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-surface-400">Mov. Fetal</p>
                      <p className="text-sm font-semibold text-surface-700">{c.movimentacaoFetal}</p>
                    </div>
                  )}
                </div>
              )}

              {c.planoTexto && (
                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-xs text-blue-500 mb-1">Plano</p>
                  <p className="text-sm text-blue-800">{c.planoTexto}</p>
                </div>
              )}

              {c.tipo === 'PUERPERIO' && c.ofertaLARC && (
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                  ✓ LARC ofertado
                </div>
              )}

              {c.notas && (
                <p className="mt-3 text-sm text-surface-500 bg-surface-50 rounded-lg p-3">
                  {c.notas}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <p className="text-surface-400">Nenhuma consulta registrada ainda.</p>
        </div>
      )}
    </div>
  )
}
