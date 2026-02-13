import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

const etapasInfo = [
  { num: 1, titulo: '1ª Consulta Pré-Natal', desc: 'Primeira consulta de pré-natal registrada.' },
  { num: 2, titulo: 'Consultas + Exames', desc: '2ª consulta em diante + testes rápidos (HIV, Sífilis, Hep B, Hep C) ou resultado de sorologias.' },
  { num: 3, titulo: '4 Consultas + Vacinas', desc: '4 consultas realizadas + cartão vacinal atualizado com vacinas da gestação.' },
]

const problemas = [
  'Cartão não ativa',
  'Crédito não foi creditado',
  'Cartão bloqueado',
  'Número do cartão incorreto',
  'Perdi meu cartão',
]

export default async function CartaoPage() {
  const session = await auth()
  const gestante = await prisma.gestante.findUnique({
    where: { id: session!.user.id },
    include: { cartaoMaeSalvador: true },
  })

  if (!gestante) return null

  const cartao = gestante.cartaoMaeSalvador

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Cartão Mãe Salvador</h1>
        <p className="text-surface-500 mt-1">Acompanhe seu cartão de transporte e benefícios</p>
      </div>

      {/* Card Status */}
      <div className="animate-fade-in stagger-1 opacity-0">
        {cartao ? (
          <div className={`rounded-2xl p-6 text-white shadow-lg ${
            cartao.status === 'ATIVO' ? 'bg-gradient-to-br from-accent-500 to-accent-600 shadow-accent-200'
            : cartao.status === 'BLOQUEADO' ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-200'
            : 'bg-gradient-to-br from-surface-500 to-surface-600 shadow-surface-200'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Status do Cartão</p>
                <p className="text-2xl font-bold font-display mt-1">
                  {cartao.status === 'ATIVO' ? 'Ativo' : cartao.status === 'BLOQUEADO' ? 'Bloqueado' : 'Pendente'}
                </p>
              </div>
              <span className="text-4xl">💳</span>
            </div>
            {cartao.numeroTranscard && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-white/70 text-xs">Número TransCard</p>
                <p className="text-lg font-mono font-bold tracking-wider">{cartao.numeroTranscard}</p>
              </div>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-white/70 text-xs">LGPD:</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${cartao.termoLgpdAceito ? 'bg-white/20' : 'bg-yellow-400/30 text-yellow-100'}`}>
                {cartao.termoLgpdAceito ? 'Termo aceito' : 'Pendente'}
              </span>
              {cartao.lgpdMetodoAssinatura && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
                  via {cartao.lgpdMetodoAssinatura === 'WHATSAPP' ? 'WhatsApp' : cartao.lgpdMetodoAssinatura === 'APP_GOV' ? '.gov' : 'PDF impresso'}
                </span>
              )}
            </div>
            {cartao.ubsVinculacao && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-white/70 text-xs">Vinculado na UBS</p>
                <p className="text-sm font-semibold">{cartao.ubsVinculacao}</p>
                {cartao.dataVinculacao && (
                  <p className="text-white/60 text-xs mt-0.5">em {formatarData(cartao.dataVinculacao)}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl p-6 bg-surface-100 border-2 border-dashed border-surface-300 text-center">
            <span className="text-4xl">💳</span>
            <p className="text-surface-600 font-semibold mt-2">Cartão ainda não vinculado</p>
            <p className="text-surface-400 text-sm mt-1">Procure sua unidade de saúde para vincular seu Cartão Mãe Salvador.</p>
          </div>
        )}
      </div>

      {/* Etapas */}
      <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-6 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-4">Etapas do Programa</h2>
        <div className="space-y-4">
          {etapasInfo.map((etapa) => {
            const concluida = cartao ? cartao.etapaAtual >= etapa.num : false
            const atual = cartao ? cartao.etapaAtual + 1 === etapa.num : etapa.num === 1
            return (
              <div key={etapa.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    concluida ? 'bg-accent-500 text-white' : atual ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-300' : 'bg-surface-100 text-surface-400'
                  }`}>
                    {concluida ? '✓' : etapa.num}
                  </div>
                  {etapa.num < 3 && <div className={`w-0.5 h-8 mt-1 ${concluida ? 'bg-accent-300' : 'bg-surface-200'}`} />}
                </div>
                <div className="flex-1 pb-4">
                  <p className={`text-sm font-semibold ${concluida ? 'text-accent-700' : atual ? 'text-surface-800' : 'text-surface-400'}`}>
                    {etapa.titulo}
                  </p>
                  <p className="text-xs text-surface-400 mt-0.5">{etapa.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mensagens do Cartão */}
      {cartao && (
        <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-6 border border-surface-200 shadow-sm">
          <h2 className="font-display font-semibold text-surface-800 mb-4">Informações</h2>
          <div className="space-y-3">
            {cartao.status === 'ATIVO' && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                <span className="text-lg">✅</span>
                <div>
                  <p className="text-sm font-medium text-green-800">Cartão ativo</p>
                  <p className="text-xs text-green-600">Seu cartão está ativo e pronto para uso.</p>
                </div>
              </div>
            )}
            {cartao.etapaAtual > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-lg">💰</span>
                <div>
                  <p className="text-sm font-medium text-blue-800">Crédito da Etapa {cartao.etapaAtual}</p>
                  <p className="text-xs text-blue-600">O crédito referente à etapa {cartao.etapaAtual} foi creditado no seu cartão.</p>
                </div>
              </div>
            )}
            {cartao.status === 'PENDENTE' && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-50 border border-yellow-100">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Necessidade de ativação</p>
                  <p className="text-xs text-yellow-600">Procure sua unidade de saúde para ativar seu cartão.</p>
                </div>
              </div>
            )}
            {cartao.status === 'BLOQUEADO' && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                <span className="text-lg">🚫</span>
                <div>
                  <p className="text-sm font-medium text-red-800">Risco de bloqueio / Cartão bloqueado</p>
                  <p className="text-xs text-red-600">Procure sua unidade de saúde para regularizar a situação.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Posso ajudar */}
      <div className="animate-fade-in stagger-4 opacity-0 bg-white rounded-2xl p-6 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Posso ajudar?</h2>
        <p className="text-sm text-surface-500 mb-4">Selecione o problema que está enfrentando com seu cartão:</p>
        <div className="space-y-2">
          {problemas.map((p) => (
            <button key={p} className="w-full text-left px-4 py-3 rounded-xl border border-surface-200 text-sm text-surface-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all">
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
