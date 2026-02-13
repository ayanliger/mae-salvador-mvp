import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData, calcularIdadeGestacional } from '@/lib/utils'
import { PrintButton } from '@/components/PrintButton'

const vacinasEsperadas = [
  { codigo: 'DTPA', nome: 'dTpa (Tríplice Acelular)' },
  { codigo: 'HEPATITE_B', nome: 'Hepatite B' },
  { codigo: 'INFLUENZA', nome: 'Influenza' },
  { codigo: 'COVID_19', nome: 'Covid-19' },
]

export default async function GestacaoAtualPage() {
  const session = await auth()
  const gestante = await prisma.gestante.findUnique({
    where: { id: session!.user.id },
    include: {
      condicoes: { where: { status: 'ATIVO' } },
      vacinas: true,
      consultas: {
        where: { alturaUterina: { not: null } },
        orderBy: { data: 'asc' },
        select: { data: true, alturaUterina: true, semanaGestacional: true },
      },
    },
  })

  if (!gestante) return null

  const ig = gestante.dataUltimaMenstruacao
    ? calcularIdadeGestacional(gestante.dataUltimaMenstruacao)
    : null

  // Verificar vacinas tomadas vs pendentes
  const vacinasStatus = vacinasEsperadas.map((ve) => {
    const tomada = gestante.vacinas.find((v) =>
      v.codigoVacina.toUpperCase().includes(ve.codigo.replace('_', ''))
      || v.nome.toUpperCase().includes(ve.codigo.replace('_', ' '))
    )
    return { ...ve, tomada: !!tomada, data: tomada?.data }
  })

  // Curva de altura uterina
  const medidas = gestante.consultas.filter((c) => c.alturaUterina !== null)
  const alturas = medidas.map((m) => m.alturaUterina!)
  const maxAlt = alturas.length > 0 ? Math.max(...alturas) + 3 : 40
  const minAlt = alturas.length > 0 ? Math.max(Math.min(...alturas) - 3, 0) : 0

  return (
    <div className="space-y-6">
      <div className="animate-fade-in flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-surface-800">Gestação Atual</h1>
          <p className="text-surface-500 mt-1">Informações da gravidez em curso</p>
        </div>
        <PrintButton />
      </div>

      {/* Resumo da Gestação */}
      <div className="animate-fade-in stagger-1 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Dados da Gestação</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">DUM</p>
            <p className="text-sm font-bold font-display text-surface-800">
              {gestante.dataUltimaMenstruacao ? formatarData(gestante.dataUltimaMenstruacao) : '—'}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">DPP</p>
            <p className="text-sm font-bold font-display text-surface-800">
              {gestante.dataProvavelParto ? formatarData(gestante.dataProvavelParto) : '—'}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">IG</p>
            <p className="text-sm font-bold font-display text-surface-800">
              {ig ? `${ig.semanas}s ${ig.dias}d` : '—'}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">Tipo</p>
            <p className="text-sm font-bold font-display text-surface-800">
              {gestante.tipoGravidez === 'MULTIPLA' ? 'Múltipla' : 'Única'}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">Risco</p>
            <p className={`text-sm font-bold font-display ${
              gestante.riscoGestacional === 'ALTO' ? 'text-red-600' : 'text-green-600'
            }`}>
              {gestante.riscoGestacional === 'ALTO' ? 'Alto' : 'Habitual'}
              {gestante.riscoGestacionalCIAP && (
                <span className="text-xs font-normal text-surface-400 ml-1">
                  ({gestante.riscoGestacionalCIAP})
                </span>
              )}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-400">Planejada</p>
            <p className="text-sm font-bold font-display text-surface-800">
              {gestante.gravidezPlanejada === true ? 'Sim' : gestante.gravidezPlanejada === false ? 'Não' : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Condições Ativas (só aparece o que é positivo) */}
      {gestante.condicoes.length > 0 && (
        <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <h2 className="font-display font-semibold text-surface-800 mb-3">Condições Ativas</h2>
          <div className="space-y-2">
            {gestante.condicoes.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-100">
                <div>
                  <p className="text-sm font-medium text-red-800">{c.descricao}</p>
                  <p className="text-xs text-red-500">CID/CIAP: {c.codigoCid}</p>
                </div>
                {c.gravidade && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
                    {c.gravidade}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vacinação */}
      <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Vacinação na Gestação</h2>
        <div className="space-y-2">
          {vacinasStatus.map((v) => (
            <div key={v.codigo} className={`flex items-center justify-between p-3 rounded-xl border ${
              v.tomada ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'
            }`}>
              <div>
                <p className={`text-sm font-medium ${v.tomada ? 'text-green-800' : 'text-yellow-800'}`}>
                  {v.nome}
                </p>
                {v.tomada && v.data && (
                  <p className="text-xs text-green-600 mt-0.5">Aplicada em {formatarData(v.data)}</p>
                )}
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                v.tomada ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {v.tomada ? '✓ Tomada' : 'Pendente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Curva de Altura Uterina */}
      <div className="animate-fade-in stagger-4 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-4">Curva de Altura Uterina</h2>
        {medidas.length > 0 ? (
          <div className="space-y-2">
            {medidas.map((m, i) => {
              const pct = maxAlt > minAlt ? ((m.alturaUterina! - minAlt) / (maxAlt - minAlt)) * 100 : 50
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-16 text-right text-xs text-surface-400 shrink-0">
                    {m.semanaGestacional ? `${m.semanaGestacional}ª sem` : formatarData(m.data)}
                  </div>
                  <div className="flex-1 h-7 bg-surface-100 rounded-lg relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-lg transition-all flex items-center justify-end pr-2"
                      style={{ width: `${Math.max(pct, 8)}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">{m.alturaUterina} cm</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-surface-400 text-center py-4">Nenhuma medida de altura uterina registrada.</p>
        )}
      </div>
    </div>
  )
}
