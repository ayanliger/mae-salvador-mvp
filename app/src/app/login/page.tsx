'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [perfil, setPerfil] = useState<'gestante' | 'profissional'>('gestante')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const formatarCpfInput = (valor: string) => {
    const limpo = valor.replace(/\D/g, '').slice(0, 11)
    const formatado = limpo
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    setCpf(formatado)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    const resultado = await signIn(perfil, {
      cpf: cpf.replace(/\D/g, ''),
      senha,
      redirect: false,
    })

    setCarregando(false)

    if (resultado?.error) {
      setErro('CPF ou senha inválidos.')
      return
    }

    router.push(perfil === 'profissional' ? '/profissional/painel' : '/gestante/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white text-2xl font-bold font-display mb-4 shadow-lg shadow-primary-200">
            CG
          </div>
          <h1 className="text-2xl font-bold font-display text-surface-800">
            Caderneta da Gestante
          </h1>
          <p className="text-surface-500 mt-1">Salvador - BA</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-surface-200/50 border border-surface-100 p-8">
          {/* Toggle de Perfil */}
          <div className="flex rounded-xl bg-surface-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setPerfil('gestante')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                perfil === 'gestante'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700'
              }`}
            >
              Gestante
            </button>
            <button
              type="button"
              onClick={() => setPerfil('profissional')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                perfil === 'profissional'
                  ? 'bg-white text-accent-600 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700'
              }`}
            >
              Profissional
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-surface-700 mb-1.5">
                CPF
              </label>
              <input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(e) => formatarCpfInput(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-surface-700 mb-1.5">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                required
              />
            </div>

            {erro && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all shadow-lg ${
                perfil === 'gestante'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-primary-200'
                  : 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-accent-200'
              } ${carregando ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {perfil === 'gestante' && (
            <p className="text-center text-sm text-surface-500 mt-5">
              Ainda não tem conta?{' '}
              <Link href="/cadastro" className="text-primary-600 font-medium hover:underline">
                Cadastre-se
              </Link>
            </p>
          )}
        </div>

        <p className="text-center text-xs text-surface-400 mt-6">
          Secretaria Municipal de Saúde de Salvador
        </p>
      </div>
    </div>
  )
}
