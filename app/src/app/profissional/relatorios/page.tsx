import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function RelatoriosPage() {
  const session = await auth()

  const [totalGestantes, totalConsultas, gestantesAltoRisco, tratamentosSifilis] = await Promise.all([
    prisma.gestante.count({ where: { ativo: true, statusCaderneta: 'ATIVA' } }),
    prisma.consulta.count(),
    prisma.gestante.count({ where: { ativo: true, riscoGestacional: 'ALTO' } }),
    prisma.tratamentoSifilis.findMany({
      include: { aplicacoes: true },
    }),
  ])

  // Indicadores de Sífilis
  const totalDiagnosticos = tratamentosSifilis.length
  const tratamentoCompleto = tratamentosSifilis.filter((t) => {
    return t.aplicacoes.length >= t.dosesNecessarias
  }).length
  const tratamentoIncompleto = totalDiagnosticos - tratamentoCompleto

  // Consultas por tipo
  const [consultasPreNatal, consultasPuerperio, consultasOdonto] = await Promise.all([
    prisma.consulta.count({ where: { tipo: 'PRE_NATAL' } }),
    prisma.consulta.count({ where: { tipo: 'PUERPERIO' } }),
    prisma.consulta.count({ where: { tipo: 'ODONTOLOGICA' } }),
  ])

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Relatório de Gestão</h1>
        <p className="text-surface-500 mt-1">Indicadores de qualidade e acompanhamento</p>
      </div>

      {/* Indicadores Gerais */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="animate-fade-in stagger-1 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm text-center">
          <p className="text-3xl font-bold font-display text-primary-600">{totalGestantes}</p>
          <p className="text-xs text-surface-500 mt-1">Gestantes ativas</p>
        </div>
        <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm text-center">
          <p className="text-3xl font-bold font-display text-accent-600">{totalConsultas}</p>
          <p className="text-xs text-surface-500 mt-1">Consultas realizadas</p>
        </div>
        <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm text-center">
          <p className="text-3xl font-bold font-display text-red-600">{gestantesAltoRisco}</p>
          <p className="text-xs text-surface-500 mt-1">Alto risco</p>
        </div>
        <div className="animate-fade-in stagger-4 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm text-center">
          <p className="text-3xl font-bold font-display text-surface-600">{totalDiagnosticos}</p>
          <p className="text-xs text-surface-500 mt-1">Diagnósticos sífilis</p>
        </div>
      </div>

      {/* Consultas por Tipo */}
      <div className="animate-fade-in stagger-5 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-4">Consultas por Tipo</h2>
        <div className="space-y-3">
          {[
            { label: 'Pré-Natal', valor: consultasPreNatal, cor: 'bg-primary-500' },
            { label: 'Puerpério', valor: consultasPuerperio, cor: 'bg-purple-500' },
            { label: 'Odontológica', valor: consultasOdonto, cor: 'bg-teal-500' },
          ].map((item) => {
            const max = Math.max(consultasPreNatal, consultasPuerperio, consultasOdonto, 1)
            const pct = (item.valor / max) * 100
            return (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-24 text-sm text-surface-600 shrink-0">{item.label}</span>
                <div className="flex-1 h-6 bg-surface-100 rounded-lg overflow-hidden">
                  <div className={`h-full ${item.cor} rounded-lg flex items-center justify-end pr-2`} style={{ width: `${Math.max(pct, 5)}%` }}>
                    <span className="text-[10px] font-bold text-white">{item.valor}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Indicador de Sífilis */}
      <div className="animate-fade-in bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-4">Indicador de Sífilis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-surface-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-display text-surface-700">{totalDiagnosticos}</p>
            <p className="text-xs text-surface-500 mt-1">Diagnósticos</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
            <p className="text-2xl font-bold font-display text-green-700">{tratamentoCompleto}</p>
            <p className="text-xs text-green-600 mt-1">Tratamento completo</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
            <p className="text-2xl font-bold font-display text-red-700">{tratamentoIncompleto}</p>
            <p className="text-xs text-red-600 mt-1">Tratamento incompleto</p>
          </div>
        </div>
      </div>
    </div>
  )
}
