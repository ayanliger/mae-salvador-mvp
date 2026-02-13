'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function MarcarLidaButton({ id }: { id: string }) {
  const router = useRouter()
  const [carregando, setCarregando] = useState(false)

  const marcar = async () => {
    setCarregando(true)
    await fetch('/api/notificacoes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  return (
    <button
      onClick={marcar}
      disabled={carregando}
      className="text-xs text-primary-600 hover:text-primary-800 font-medium whitespace-nowrap disabled:opacity-50"
    >
      {carregando ? '...' : 'Marcar lida'}
    </button>
  )
}
