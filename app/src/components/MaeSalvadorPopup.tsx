'use client'

import { useState, useEffect } from 'react'

export function MaeSalvadorPopup({ ubsVinculada }: { ubsVinculada: string | null }) {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const visto = localStorage.getItem('mae-salvador-popup-visto')
    if (!visto) setVisivel(true)
  }, [])

  const fechar = () => {
    localStorage.setItem('mae-salvador-popup-visto', 'true')
    setVisivel(false)
  }

  if (!visivel) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button onClick={fechar} className="absolute top-4 right-4 text-surface-400 hover:text-surface-600 text-xl">✕</button>
        <div className="text-center mb-4">
          <span className="text-4xl">🤱</span>
          <h2 className="text-xl font-bold font-display text-primary-700 mt-2">Programa Mãe Salvador</h2>
        </div>
        <p className="text-sm text-surface-600 leading-relaxed">
          Você sabia que o programa <strong>Mãe Salvador</strong> oferece diversos benefícios para que você
          faça seu acompanhamento regular no Posto de Saúde (Unidade Básica ou Unidade de Saúde da Família)
          da atenção primária de Salvador?
        </p>
        <p className="text-sm text-surface-600 leading-relaxed mt-3">
          Procure a unidade de saúde pelo acolhimento à demanda espontânea para iniciar o pré-natal.
          O acompanhamento regular pode garantir a você uma série de benefícios, dentre eles a
          <strong> liberação dos seus créditos para transporte</strong>.
        </p>
        {ubsVinculada && (
          <div className="mt-4 p-3 rounded-xl bg-primary-50 border border-primary-100">
            <p className="text-xs text-primary-600 font-medium">Sua unidade de saúde:</p>
            <p className="text-sm font-bold text-primary-800">{ubsVinculada}</p>
          </div>
        )}
        <button
          onClick={fechar}
          className="w-full mt-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-200 transition-all hover:from-primary-600 hover:to-primary-700"
        >
          Entendi
        </button>
      </div>
    </div>
  )
}
