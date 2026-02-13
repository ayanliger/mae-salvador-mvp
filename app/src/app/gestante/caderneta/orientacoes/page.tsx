'use client'

import { useState } from 'react'

const secoes = [
  {
    titulo: 'Conheça seus direitos',
    conteudo: [
      'Direito a 6 consultas de pré-natal, no mínimo, sendo preferencialmente uma no 1º trimestre, duas no 2º trimestre e três no 3º trimestre.',
      'Direito a um acompanhante de sua escolha durante o trabalho de parto, parto e pós-parto imediato (Lei Federal nº 11.108/2005).',
      'Direito à vinculação a uma maternidade de referência para o parto.',
      'Direito a conhecer previamente a maternidade onde será realizado o parto.',
      'Licença-maternidade de 120 dias para trabalhadoras com carteira assinada.',
      'Estabilidade no emprego desde a confirmação da gravidez até 5 meses após o parto.',
      'Direito a dispensa do horário de trabalho para realização de, no mínimo, 6 consultas e demais exames.',
      'Prioridade de atendimento em instituições públicas e privadas.',
      'Em Salvador, o programa Mãe Salvador oferece créditos de transporte para gestantes que realizam o acompanhamento pré-natal na atenção primária.',
    ],
  },
  {
    titulo: 'Pré-natal do parceiro',
    conteudo: [
      'O pré-natal do parceiro é uma estratégia do Ministério da Saúde para inserir o(a) parceiro(a) no acompanhamento da gestação.',
      'O(a) parceiro(a) pode realizar exames como: tipagem sanguínea, hemograma, glicemia, testes rápidos para HIV, Sífilis, Hepatite B e C.',
      'A participação do(a) parceiro(a) nas consultas fortalece o vínculo familiar e contribui para uma gestação mais saudável.',
      'O(a) parceiro(a) também pode atualizar seu cartão vacinal durante esse período.',
      'Procure a unidade de saúde para mais informações sobre como incluir seu(sua) parceiro(a) no pré-natal.',
    ],
  },
]

export default function OrientacoesPage() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Orientações</h1>
        <p className="text-surface-500 mt-1">Informações importantes para a sua gestação</p>
      </div>

      <div className="space-y-3">
        {secoes.map((secao, i) => (
          <div key={secao.titulo} className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden`}>
            <button
              onClick={() => setAberta(aberta === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <h2 className="font-display font-semibold text-surface-800">{secao.titulo}</h2>
              <span className={`text-surface-400 transition-transform ${aberta === i ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {aberta === i && (
              <div className="px-5 pb-5 animate-fade-in">
                <ul className="space-y-3">
                  {secao.conteudo.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm text-surface-600">
                      <span className="text-primary-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
