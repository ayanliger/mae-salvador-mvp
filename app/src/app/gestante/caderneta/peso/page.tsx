import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

function calcularIMC(peso: number, altura: number): number {
  return peso / (altura * altura)
}

function classificarIMC(imc: number): string {
  if (imc < 18.5) return 'Baixo peso'
  if (imc < 25) return 'Peso adequado'
  if (imc < 30) return 'Sobrepeso'
  return 'Obesidade'
}

export default async function PesoPage() {
  const session = await auth()
  const gestante = await prisma.gestante.findUnique({
    where: { id: session!.user.id },
    include: {
      consultas: {
        where: { pesoKg: { not: null } },
        orderBy: { data: 'asc' },
        select: { data: true, pesoKg: true, semanaGestacional: true },
      },
    },
  })

  if (!gestante) return null

  const pesoPreG = gestante.pesoPreGestacional
  const altura = gestante.alturaM
  const imcPreG = pesoPreG && altura ? calcularIMC(pesoPreG, altura) : null
  const medidas = gestante.consultas.filter((c) => c.pesoKg !== null)

  // Calculate weight range for chart
  const pesos = medidas.map((m) => m.pesoKg!)
  const minPeso = pesos.length > 0 ? Math.min(...pesos, pesoPreG || Infinity) - 2 : 50
  const maxPeso = pesos.length > 0 ? Math.max(...pesos) + 2 : 90

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Ganho de Peso</h1>
        <p className="text-surface-500 mt-1">Acompanhamento do peso durante a gestação</p>
      </div>

      {/* IMC Pré-Gestacional */}
      <div className="animate-fade-in stagger-1 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Dados Pré-Gestacionais</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">Peso pré-gestacional</p>
            <p className="text-lg font-bold font-display text-surface-800">
              {pesoPreG ? `${pesoPreG} kg` : '—'}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">Altura</p>
            <p className="text-lg font-bold font-display text-surface-800">
              {altura ? `${(altura * 100).toFixed(0)} cm` : '—'}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">IMC pré-gestacional</p>
            <p className="text-lg font-bold font-display text-surface-800">
              {imcPreG ? imcPreG.toFixed(1) : '—'}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">Classificação</p>
            <p className={`text-sm font-bold font-display ${
              imcPreG
                ? imcPreG < 18.5 ? 'text-yellow-600' : imcPreG < 25 ? 'text-green-600' : imcPreG < 30 ? 'text-orange-600' : 'text-red-600'
                : 'text-surface-400'
            }`}>
              {imcPreG ? classificarIMC(imcPreG) : '—'}
            </p>
          </div>
        </div>
        {!pesoPreG && (
          <p className="text-xs text-surface-400 mt-3">
            O peso e altura pré-gestacional devem ser inseridos pelo profissional na primeira consulta.
          </p>
        )}
      </div>

      {/* Weight chart (simple CSS bar chart) */}
      <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-4">Evolução do Peso</h2>
        {medidas.length > 0 ? (
          <div className="space-y-2">
            {medidas.map((m, i) => {
              const pct = maxPeso > minPeso ? ((m.pesoKg! - minPeso) / (maxPeso - minPeso)) * 100 : 50
              const ganho = pesoPreG ? (m.pesoKg! - pesoPreG).toFixed(1) : null
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-16 text-right text-xs text-surface-400 shrink-0">
                    {m.semanaGestacional ? `${m.semanaGestacional}ª sem` : formatarData(m.data)}
                  </div>
                  <div className="flex-1 h-7 bg-surface-100 rounded-lg relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg transition-all flex items-center justify-end pr-2"
                      style={{ width: `${Math.max(pct, 8)}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">{m.pesoKg} kg</span>
                    </div>
                  </div>
                  {ganho && (
                    <span className={`text-xs font-medium w-14 text-right ${parseFloat(ganho) >= 0 ? 'text-primary-600' : 'text-blue-600'}`}>
                      {parseFloat(ganho) >= 0 ? '+' : ''}{ganho}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-surface-400 text-center py-4">Nenhuma medida de peso registrada nas consultas.</p>
        )}
      </div>

      {/* Table */}
      {medidas.length > 0 && (
        <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <h2 className="font-display font-semibold text-surface-800 mb-3">Registros</h2>
          <div className="space-y-2">
            {medidas.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-lg font-medium">
                    {m.semanaGestacional ? `${m.semanaGestacional}ª sem` : '—'}
                  </span>
                  <span className="text-sm font-medium text-surface-700">{m.pesoKg} kg</span>
                </div>
                <span className="text-xs text-surface-400">{formatarData(m.data)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
