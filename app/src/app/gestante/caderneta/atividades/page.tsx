import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function AtividadesPage() {
  const session = await auth()

  const gestante = await prisma.gestante.findUnique({
    where: { id: session!.user.id },
    select: {
      participouAtividadeEducativa: true,
      dataAtividadeEducativa: true,
      realizouVisitaMaternidade: true,
      dataVisitaMaternidade: true,
      maternidadeVinculacao: true,
    },
  })

  const items = [
    {
      titulo: 'Atividade Educativa',
      descricao: 'Participação em grupos ou rodas de conversa sobre gestação, parto e puerpério',
      realizado: gestante?.participouAtividadeEducativa ?? false,
      data: gestante?.dataAtividadeEducativa,
      icone: '📚',
      corRealizado: 'bg-accent-50 border-accent-200',
      corIcone: 'bg-accent-200 text-accent-700',
    },
    {
      titulo: 'Visita à Maternidade',
      descricao: gestante?.maternidadeVinculacao
        ? `Visita à maternidade: ${gestante.maternidadeVinculacao}`
        : 'Visita à maternidade de referência vinculada',
      realizado: gestante?.realizouVisitaMaternidade ?? false,
      data: gestante?.dataVisitaMaternidade,
      icone: '🏥',
      corRealizado: 'bg-blue-50 border-blue-200',
      corIcone: 'bg-blue-200 text-blue-700',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Atividades & Visitas</h1>
        <p className="text-surface-500 mt-1">Atividade educativa e visita à maternidade</p>
      </div>

      {items.map((item, i) => (
        <div
          key={item.titulo}
          className={`animate-fade-in stagger-${i + 1} opacity-0 rounded-2xl p-6 border shadow-sm ${
            item.realizado ? item.corRealizado : 'bg-white border-surface-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
              item.realizado ? item.corIcone : 'bg-surface-100 text-surface-400'
            }`}>
              {item.icone}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-semibold text-surface-800">{item.titulo}</h2>
                {item.realizado && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                    Realizado
                  </span>
                )}
              </div>
              <p className="text-sm text-surface-500 mt-1">{item.descricao}</p>
              {item.realizado && item.data && (
                <p className="text-xs text-surface-400 mt-2">
                  Data: {formatarData(item.data)}
                </p>
              )}
              {!item.realizado && (
                <p className="text-xs text-surface-400 mt-2 italic">
                  Ainda não realizado — fale com seu profissional de saúde
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="animate-fade-in stagger-3 opacity-0 bg-primary-50 rounded-2xl p-5 border border-primary-100">
        <h2 className="font-display font-semibold text-primary-800 mb-2">Por que participar?</h2>
        <p className="text-sm text-primary-700 leading-relaxed">
          As atividades educativas e a visita à maternidade ajudam a gestante a se preparar
          para o parto e os primeiros cuidados com o bebê, conhecer o local onde será atendida,
          tirar dúvidas e se sentir mais segura e acolhida.
        </p>
      </div>
    </div>
  )
}
