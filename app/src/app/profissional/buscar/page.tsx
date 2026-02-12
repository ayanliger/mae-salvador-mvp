'use client'

import { useState } from 'react'
import { formatarCPF, formatarData } from '@/lib/utils'

interface GestanteResultado {
  id: string
  cpf: string
  nome: string
  nomeSocial: string | null
  dataNascimento: string
  telefone: string
  ubsVinculada: string | null
  riscoGestacional: string
  dataUltimaMenstruacao: string | null
  tipoGravidez: string
  _count: { consultas: number; exames: number; vacinas: number }
}

export default function BuscarGestante() {
  const [cpf, setCpf] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [resultado, setResultado] = useState<GestanteResultado | null>(null)
  const [erro, setErro] = useState('')

  const formatarCpfInput = (valor: string) => {
    const limpo = valor.replace(/\D/g, '').slice(0, 11)
    const formatado = limpo
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    setCpf(formatado)
  }

  const buscar = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setResultado(null)
    setCarregando(true)

    const res = await fetch(`/api/gestantes/buscar?cpf=${cpf.replace(/\D/g, '')}`)
    const data = await res.json()
    setCarregando(false)

    if (!res.ok) {
      setErro(data.erro || 'Erro ao buscar.')
      return
    }

    setResultado(data)
  }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Buscar Gestante</h1>
        <p className="text-surface-500 mt-1">Busque por CPF para visualizar a caderneta</p>
      </div>

      <form onSubmit={buscar} className="flex gap-3">
        <input
          type="text"
          value={cpf}
          onChange={(e) => formatarCpfInput(e.target.value)}
          placeholder="000.000.000-00"
          className="flex-1 max-w-xs px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-800 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
        />
        <button
          type="submit"
          disabled={carregando}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent-200 transition-all disabled:opacity-70"
        >
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {erro && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 max-w-md">
          {erro}
        </div>
      )}

      {resultado && (
        <div className="animate-fade-in bg-white rounded-2xl p-6 border border-surface-200 shadow-sm max-w-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold font-display text-surface-800">
                {resultado.nomeSocial || resultado.nome}
              </h2>
              <p className="text-sm text-surface-500">CPF: {formatarCPF(resultado.cpf)}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              resultado.riscoGestacional === 'ALTO'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}>
              Risco {resultado.riscoGestacional === 'ALTO' ? 'Alto' : 'Habitual'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-surface-50 rounded-lg p-3 text-center">
              <p className="text-xs text-surface-400">Nascimento</p>
              <p className="text-sm font-semibold text-surface-700">{formatarData(resultado.dataNascimento)}</p>
            </div>
            <div className="bg-surface-50 rounded-lg p-3 text-center">
              <p className="text-xs text-surface-400">Consultas</p>
              <p className="text-sm font-semibold text-surface-700">{resultado._count.consultas}</p>
            </div>
            <div className="bg-surface-50 rounded-lg p-3 text-center">
              <p className="text-xs text-surface-400">Exames</p>
              <p className="text-sm font-semibold text-surface-700">{resultado._count.exames}</p>
            </div>
            <div className="bg-surface-50 rounded-lg p-3 text-center">
              <p className="text-xs text-surface-400">Vacinas</p>
              <p className="text-sm font-semibold text-surface-700">{resultado._count.vacinas}</p>
            </div>
          </div>

          {resultado.ubsVinculada && (
            <p className="text-xs text-surface-400">UBS: {resultado.ubsVinculada}</p>
          )}
        </div>
      )}
    </div>
  )
}
