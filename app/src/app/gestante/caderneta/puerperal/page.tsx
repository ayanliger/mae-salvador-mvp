import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function PuerperalPage() {
  const session = await auth()

  const consultas = await prisma.consulta.findMany({
    where: { gestanteId: session!.user.id, tipo: 'PUERPERIO' },
    orderBy: { data: 'desc' },
    include: { profissional: true },
  })

  const larcOfertado = consultas.some((c) => c.ofertaLARC)

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Consulta Puerperal</h1>
        <p className="text-surface-500 mt-1">Acompanhamento pós-parto</p>
      </div>

      {/* LARC Status */}
      <div className={`animate-fade-in stagger-1 opacity-0 rounded-2xl p-5 border shadow-sm ${
        larcOfertado
          ? 'bg-purple-50 border-purple-200'
          : 'bg-surface-50 border-surface-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
            larcOfertado ? 'bg-purple-200 text-purple-700' : 'bg-surface-200 text-surface-500'
          }`}>
            {larcOfertado ? '✓' : '—'}
          </div>
          <div>
            <p className="font-semibold text-surface-800">
              LARC (Contracepção Reversível de Longa Duração)
            </p>
            <p className="text-sm text-surface-500">
              {larcOfertado
                ? 'Oferta realizada em consulta puerperal'
                : 'Ainda não ofertado'}
            </p>
          </div>
        </div>
      </div>

      {/* Consultas Puerperais */}
      {consultas.length > 0 ? (
        <div className="space-y-3">
          {consultas.map((c, i) => (
            <div
              key={c.id}
              className={`animate-fade-in stagger-${Math.min(i + 2, 5)} opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-surface-700">
                    Dr(a). {c.profissional.nome}
                  </p>
                  <p className="text-xs text-surface-400">{c.profissional.cargo} • {c.ubs || 'UBS não informada'}</p>
                </div>
                <p className="text-sm font-medium text-surface-600">{formatarData(c.data)}</p>
              </div>

              {(c.pesoKg || c.pressaoArterial) && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {c.pesoKg && (
                    <div className="bg-surface-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-surface-400">Peso</p>
                      <p className="text-sm font-semibold text-surface-700">{c.pesoKg} kg</p>
                    </div>
                  )}
                  {c.pressaoArterial && (
                    <div className="bg-surface-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-surface-400">PA</p>
                      <p className="text-sm font-semibold text-surface-700">{c.pressaoArterial}</p>
                    </div>
                  )}
                </div>
              )}

              {c.ofertaLARC && (
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                  ✓ LARC ofertado
                </div>
              )}

              {c.planoTexto && (
                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-xs text-blue-500 mb-1">Plano</p>
                  <p className="text-sm text-blue-800">{c.planoTexto}</p>
                </div>
              )}

              {c.notas && (
                <p className="mt-3 text-sm text-surface-500 bg-surface-50 rounded-lg p-3">{c.notas}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
          <p className="text-surface-400">Nenhuma consulta puerperal registrada.</p>
        </div>
      )}
    </div>
  )
}
