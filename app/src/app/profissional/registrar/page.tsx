'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegistrarConsulta() {
  const router = useRouter()
  const [etapa, setEtapa] = useState<'buscar' | 'formulario'>('buscar')
  const [cpf, setCpf] = useState('')
  const [gestanteId, setGestanteId] = useState('')
  const [nomeGestante, setNomeGestante] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)

  const [form, setForm] = useState({
    tipo: 'PRE_NATAL',
    data: new Date().toISOString().split('T')[0],
    semanaGestacional: '',
    pesoKg: '',
    pressaoArterial: '',
    alturaUterina: '',
    batimentoCardiacoFetal: '',
    notas: '',
    ubs: '',
  })

  const formatarCpfInput = (valor: string) => {
    const limpo = valor.replace(/\D/g, '').slice(0, 11)
    setCpf(limpo.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'))
  }

  const buscarGestante = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    const res = await fetch(`/api/gestantes/buscar?cpf=${cpf.replace(/\D/g, '')}`)
    const data = await res.json()
    setCarregando(false)

    if (!res.ok) {
      setErro(data.erro || 'Gestante não encontrada.')
      return
    }

    setGestanteId(data.id)
    setNomeGestante(data.nomeSocial || data.nome)
    setEtapa('formulario')
  }

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setSucesso('')
    setCarregando(true)

    const res = await fetch('/api/consultas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, gestanteId }),
    })

    const data = await res.json()
    setCarregando(false)

    if (!res.ok) {
      setErro(data.erro || 'Erro ao registrar consulta.')
      return
    }

    setSucesso('Consulta registrada com sucesso!')
    setTimeout(() => router.push('/profissional/painel'), 1500)
  }

  const atualizar = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Registrar Consulta</h1>
        <p className="text-surface-500 mt-1">
          {etapa === 'buscar' ? 'Busque a gestante por CPF' : `Registrando para: ${nomeGestante}`}
        </p>
      </div>

      {etapa === 'buscar' && (
        <form onSubmit={buscarGestante} className="flex gap-3">
          <input
            type="text"
            value={cpf}
            onChange={(e) => formatarCpfInput(e.target.value)}
            placeholder="CPF da gestante"
            className="flex-1 px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
          />
          <button
            type="submit"
            disabled={carregando}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent-200 transition-all disabled:opacity-70"
          >
            {carregando ? '...' : 'Buscar'}
          </button>
        </form>
      )}

      {etapa === 'formulario' && (
        <div className="animate-fade-in bg-white rounded-2xl p-6 border border-surface-200 shadow-sm">
          <form onSubmit={registrar} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Tipo *</label>
                <select
                  value={form.tipo}
                  onChange={(e) => atualizar('tipo', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
                >
                  <option value="PRE_NATAL">Pré-Natal</option>
                  <option value="PUERPERIO">Puerpério</option>
                  <option value="URGENCIA">Urgência</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Data *</label>
                <input
                  type="date"
                  value={form.data}
                  onChange={(e) => atualizar('data', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Semana gestacional</label>
                <input
                  type="number"
                  value={form.semanaGestacional}
                  onChange={(e) => atualizar('semanaGestacional', e.target.value)}
                  placeholder="Ex: 28"
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.pesoKg}
                  onChange={(e) => atualizar('pesoKg', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Pressão arterial</label>
                <input
                  type="text"
                  value={form.pressaoArterial}
                  onChange={(e) => atualizar('pressaoArterial', e.target.value)}
                  placeholder="120/80"
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Altura uterina (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={form.alturaUterina}
                  onChange={(e) => atualizar('alturaUterina', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">BCF (bpm)</label>
                <input
                  type="number"
                  value={form.batimentoCardiacoFetal}
                  onChange={(e) => atualizar('batimentoCardiacoFetal', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">UBS</label>
                <input
                  type="text"
                  value={form.ubs}
                  onChange={(e) => atualizar('ubs', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Observações</label>
              <textarea
                value={form.notas}
                onChange={(e) => atualizar('notas', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setEtapa('buscar'); setGestanteId('') }}
                className="px-5 py-3 rounded-xl font-medium text-surface-600 bg-surface-100 hover:bg-surface-200 transition-all"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={carregando}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent-200 transition-all disabled:opacity-70"
              >
                {carregando ? 'Registrando...' : 'Registrar Consulta'}
              </button>
            </div>
          </form>
        </div>
      )}

      {erro && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">{erro}</div>
      )}
      {sucesso && (
        <div className="text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-4 py-2.5">{sucesso}</div>
      )}
    </div>
  )
}
