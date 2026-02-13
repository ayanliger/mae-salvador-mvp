import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calcularIdadeGestacional, formatarData } from '@/lib/utils'
import Link from 'next/link'
import { MaeSalvadorPopup } from '@/components/MaeSalvadorPopup'

export default async function DashboardGestante() {
  const session = await auth()
  const gestante = await prisma.gestante.findUnique({
    where: { id: session!.user.id },
    include: {
      consultas: { orderBy: { data: 'desc' }, take: 3, include: { profissional: true } },
      exames: { orderBy: { data: 'desc' }, take: 3 },
      vacinas: { orderBy: { data: 'desc' }, take: 3 },
      medicacoes: { where: { ativo: true } },
      condicoes: { where: { status: 'ATIVO' } },
      cartaoMaeSalvador: true,
    },
  })

  if (!gestante) return null

  const idadeGestacional = gestante.dataUltimaMenstruacao
    ? calcularIdadeGestacional(gestante.dataUltimaMenstruacao)
    : null

  const proximaConsulta = await prisma.consulta.findFirst({
    where: { gestanteId: gestante.id, data: { gte: new Date() } },
    orderBy: { data: 'asc' },
    include: { profissional: true },
  })

  const cartao = gestante.cartaoMaeSalvador

  return (
    <div className="space-y-6">
      <MaeSalvadorPopup ubsVinculada={gestante.ubsVinculada} />

      {/* Saudação */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">
          Olá, {gestante.nomeSocial || gestante.nome.split(' ')[0]} 👋
        </h1>
        <p className="text-surface-500 mt-1">Acompanhe sua gestação</p>
      </div>

      {/* UBS e Maternidade */}
      {(gestante.ubsVinculada || gestante.maternidadeVinculacao) && (
        <div className="animate-fade-in bg-white rounded-2xl p-5 border border-surface-200 shadow-sm flex flex-wrap gap-6">
          {gestante.ubsVinculada && (
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏥</span>
              <div>
                <p className="text-xs text-surface-400">Unidade de Saúde</p>
                <p className="text-sm font-semibold text-surface-800">{gestante.ubsVinculada}</p>
              </div>
            </div>
          )}
          {gestante.maternidadeVinculacao && (
            <div className="flex items-center gap-3">
              <span className="text-2xl">👶</span>
              <div>
                <p className="text-xs text-surface-400">Maternidade de Vinculação</p>
                <p className="text-sm font-semibold text-surface-800">{gestante.maternidadeVinculacao}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Idade Gestacional */}
        <div className="animate-fade-in stagger-1 opacity-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-5 text-white shadow-lg shadow-primary-200">
          <p className="text-primary-100 text-sm font-medium">Idade Gestacional</p>
          {idadeGestacional ? (
            <p className="text-3xl font-bold font-display mt-1">
              {idadeGestacional.semanas}<span className="text-lg font-normal">s</span>{' '}
              {idadeGestacional.dias}<span className="text-lg font-normal">d</span>
            </p>
          ) : (
            <p className="text-lg mt-1 text-primary-100">Não informada</p>
          )}
          {gestante.dataProvavelParto && (
            <p className="text-primary-100 text-xs mt-2">
              DPP: {formatarData(gestante.dataProvavelParto)}
            </p>
          )}
        </div>

        {/* Próxima Consulta */}
        <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <p className="text-surface-500 text-sm font-medium">Próxima Consulta</p>
          {proximaConsulta ? (
            <>
              <p className="text-xl font-bold font-display text-surface-800 mt-1">
                {formatarData(proximaConsulta.data)}
              </p>
              <p className="text-surface-500 text-xs mt-1">
                {proximaConsulta.profissional.nome} • {proximaConsulta.tipo.replace('_', ' ')}
              </p>
            </>
          ) : (
            <p className="text-surface-400 text-sm mt-1">Nenhuma agendada</p>
          )}
        </div>

        {/* Risco Gestacional */}
        <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <p className="text-surface-500 text-sm font-medium">Classificação de Risco</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-block w-3 h-3 rounded-full ${
              gestante.riscoGestacional === 'ALTO' ? 'bg-red-500' : 'bg-green-500'
            }`} />
            <p className="text-lg font-semibold font-display text-surface-800">
              Risco {gestante.riscoGestacional === 'ALTO' ? 'Alto' : 'Habitual'}
            </p>
          </div>
          {gestante.condicoes.length > 0 && (
            <p className="text-surface-400 text-xs mt-1">
              {gestante.condicoes.length} condição(ões) ativa(s)
            </p>
          )}
        </div>
      </div>

      {/* Cartão Mãe Salvador */}
      {cartao && (
        <Link href="/gestante/cartao" className="block animate-fade-in stagger-4 opacity-0">
          <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-5 text-white shadow-lg shadow-accent-200 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-100 text-sm font-medium">Cartão Mãe Salvador</p>
                <p className="text-lg font-bold font-display mt-1">
                  {cartao.status === 'ATIVO' ? 'Ativo' : cartao.status === 'BLOQUEADO' ? 'Bloqueado' : 'Pendente'}
                </p>
                <p className="text-accent-100 text-xs mt-1">Etapa {cartao.etapaAtual} de 3</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-1">
                  {[1, 2, 3].map((e) => (
                    <div key={e} className={`w-8 h-2 rounded-full ${e <= cartao.etapaAtual ? 'bg-white' : 'bg-white/30'}`} />
                  ))}
                </div>
                <span className="text-accent-100 text-[10px] mt-1">Ver detalhes →</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Seções Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Últimas Consultas */}
        <div className="animate-fade-in stagger-4 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-surface-800">Últimas Consultas</h2>
            <Link href="/gestante/consultas" className="text-xs text-primary-600 font-medium hover:underline">
              Ver todas
            </Link>
          </div>
          {gestante.consultas.length > 0 ? (
            <div className="space-y-3">
              {gestante.consultas.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-surface-700">{c.tipo.replace('_', ' ')}</p>
                    <p className="text-xs text-surface-400">{c.profissional.nome}</p>
                  </div>
                  <p className="text-xs text-surface-500">{formatarData(c.data)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-surface-400">Nenhuma consulta registrada</p>
          )}
        </div>

        {/* Exames Recentes */}
        <div className="animate-fade-in stagger-5 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-surface-800">Exames Recentes</h2>
            <Link href="/gestante/exames" className="text-xs text-primary-600 font-medium hover:underline">
              Ver todos
            </Link>
          </div>
          {gestante.exames.length > 0 ? (
            <div className="space-y-3">
              {gestante.exames.map((e) => (
                <div key={e.id} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-surface-700">{e.tipo}</p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                      e.status === 'RESULTADO_DISPONIVEL' ? 'bg-green-100 text-green-700' :
                      e.status === 'REALIZADO' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {e.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-surface-500">{formatarData(e.data)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-surface-400">Nenhum exame registrado</p>
          )}
        </div>
      </div>

      {/* Medicações Ativas */}
      {gestante.medicacoes.length > 0 && (
        <div className="animate-fade-in bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <h2 className="font-display font-semibold text-surface-800 mb-4">Medicações em Uso</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gestante.medicacoes.map((m) => (
              <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface-50">
                <span className="text-lg">💊</span>
                <div>
                  <p className="text-sm font-medium text-surface-700">{m.medicamento}</p>
                  <p className="text-xs text-surface-400">{m.dosagem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
