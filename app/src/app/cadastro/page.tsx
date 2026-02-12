'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CadastroPage() {
  const router = useRouter()
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [form, setForm] = useState({
    cpf: '',
    nome: '',
    nomeSocial: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    endereco: '',
    bairro: '',
    cep: '',
    senha: '',
    confirmarSenha: '',
  })

  const atualizar = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  const formatarCpfInput = (valor: string) => {
    const limpo = valor.replace(/\D/g, '').slice(0, 11)
    const formatado = limpo
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    atualizar('cpf', formatado)
  }

  const formatarTelefone = (valor: string) => {
    const limpo = valor.replace(/\D/g, '').slice(0, 11)
    const formatado = limpo
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
    atualizar('telefone', formatado)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }
    if (form.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setCarregando(true)

    const res = await fetch('/api/gestantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        cpf: form.cpf.replace(/\D/g, ''),
        telefone: form.telefone.replace(/\D/g, ''),
      }),
    })

    const data = await res.json()
    setCarregando(false)

    if (!res.ok) {
      setErro(data.erro || 'Erro ao criar cadastro.')
      return
    }

    router.push('/login?cadastro=sucesso')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-8">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-display text-surface-800">
            Cadastro da Gestante
          </h1>
          <p className="text-surface-500 mt-1">Preencha seus dados para criar sua caderneta digital</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-surface-200/50 border border-surface-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Nome completo *</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => atualizar('nome', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Nome social</label>
                <input
                  type="text"
                  value={form.nomeSocial}
                  onChange={(e) => atualizar('nomeSocial', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">CPF *</label>
                <input
                  type="text"
                  value={form.cpf}
                  onChange={(e) => formatarCpfInput(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Data de nascimento *</label>
                <input
                  type="date"
                  value={form.dataNascimento}
                  onChange={(e) => atualizar('dataNascimento', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Telefone *</label>
                <input
                  type="text"
                  value={form.telefone}
                  onChange={(e) => formatarTelefone(e.target.value)}
                  placeholder="(71) 99999-9999"
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => atualizar('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Endereço *</label>
                <input
                  type="text"
                  value={form.endereco}
                  onChange={(e) => atualizar('endereco', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Bairro</label>
                <input
                  type="text"
                  value={form.bairro}
                  onChange={(e) => atualizar('bairro', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">CEP</label>
                <input
                  type="text"
                  value={form.cep}
                  onChange={(e) => atualizar('cep', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Senha *</label>
                <input
                  type="password"
                  value={form.senha}
                  onChange={(e) => atualizar('senha', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Confirmar senha *</label>
                <input
                  type="password"
                  value={form.confirmarSenha}
                  onChange={(e) => atualizar('confirmarSenha', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                  required
                />
              </div>
            </div>

            {erro && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-200 transition-all ${
                carregando ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {carregando ? 'Cadastrando...' : 'Criar Cadastro'}
            </button>
          </form>

          <p className="text-center text-sm text-surface-500 mt-5">
            Já tem conta?{' '}
            <Link href="/login" className="text-primary-600 font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
