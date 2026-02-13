import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

export default async function ParceiroPage() {
  const session = await auth()

  const parceiro = await prisma.preNatalParceiro.findUnique({
    where: { gestanteId: session!.user.id },
  })

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Pré-natal do Parceiro</h1>
        <p className="text-surface-500 mt-1">Acompanhamento de saúde do parceiro(a)</p>
      </div>

      <div className={`animate-fade-in stagger-1 opacity-0 rounded-2xl p-6 border shadow-sm ${
        parceiro?.realizado
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-surface-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
            parceiro?.realizado
              ? 'bg-green-200 text-green-700'
              : 'bg-surface-100 text-surface-400'
          }`}>
            {parceiro?.realizado ? '✓' : '♡'}
          </div>
          <div>
            <p className="font-semibold text-lg text-surface-800">
              {parceiro?.realizado ? 'Pré-natal realizado' : 'Pendente'}
            </p>
            <p className="text-sm text-surface-500">
              {parceiro
                ? parceiro.autoReferido
                  ? 'Informação auto-referida pela gestante'
                  : 'Informação registrada no prontuário'
                : 'Nenhum registro de pré-natal do parceiro'}
            </p>
          </div>
        </div>
      </div>

      {/* Informativo */}
      <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">O que é?</h2>
        <p className="text-sm text-surface-600 leading-relaxed">
          O pré-natal do parceiro é um conjunto de exames e consultas de saúde realizados
          pelo(a) parceiro(a) da gestante durante a gravidez. Inclui exames de rotina, testagem
          para ISTs (HIV, Sífilis, Hepatites B e C), verificação do cartão vacinal e orientações
          sobre participação ativa no pré-natal e parto.
        </p>
      </div>

      <div className="animate-fade-in stagger-3 opacity-0 bg-primary-50 rounded-2xl p-5 border border-primary-100">
        <h2 className="font-display font-semibold text-primary-800 mb-3">Exames recomendados</h2>
        <ul className="space-y-2">
          {[
            'Hemograma completo',
            'Glicemia em jejum',
            'Tipagem sanguínea (ABO/Rh)',
            'Teste rápido para HIV',
            'Teste rápido para Sífilis',
            'Hepatite B (HBsAg)',
            'Hepatite C (Anti-HCV)',
            'Atualização do cartão vacinal',
          ].map((exame) => (
            <li key={exame} className="flex items-center gap-2 text-sm text-primary-700">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
              {exame}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
