'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function NovaGestacaoButton({ gestanteId }: { gestanteId: string }) {
  const router = useRouter()
  const [carregando, setCarregando] = useState(false)

  const handleNovaGestacao = async () => {
    if (!confirm('Tem certeza que deseja sinalizar uma nova gestação? Isso abrirá uma nova caderneta.')) return
    setCarregando(true)

    const res = await fetch('/api/gestantes/nova-gestacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gestanteId }),
    })

    setCarregando(false)
    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <button
      onClick={handleNovaGestacao}
      disabled={carregando}
      className="mt-4 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-200 transition-all disabled:opacity-70"
    >
      {carregando ? 'Sinalizando...' : 'Sinalizar Nova Gestação'}
    </button>
  )
}
