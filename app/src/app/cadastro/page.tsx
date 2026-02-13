'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const etapas = ['Dados Pessoais', 'Gestação', 'Histórico']

export default function CadastroPage() {
  const router = useRouter()
  const [etapaAtual, setEtapaAtual] = useState(0)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [form, setForm] = useState({
    cpf: '',
    cns: '',
    nome: '',
    nomeSocial: '',
    dataNascimento: '',
    telefone: '',
    temWhatsapp: false,
    email: '',
    endereco: '',
    bairro: '',
    cep: '',
    senha: '',
    confirmarSenha: '',
    comoDescobriuGestacao: '',
    programaSocial: [] as string[],
    programaSocialOutro: '',
    temPlanoSaude: false,
    desejaSeguimentoUbs: true,
    dataUltimaMenstruacao: '',
    numGestacoesPrevia: '',
    numPartosNormais: '',
    numPartosCesareos: '',
    numAbortosPrevia: '',
    alergias: '',
    doencasConhecidas: '',
    medicacoesPreExistentes: '',
    desejoContracepcao: '',
  })

  const atualizar = (campo: string, valor: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  const formatarCpfInput = (valor: string) => {
    const limpo = valor.replace(/\D/g, '').slice(0, 11)
    atualizar('cpf', limpo.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'))
  }

  const formatarTelefone = (valor: string) => {
    const limpo = valor.replace(/\D/g, '').slice(0, 11)
    atualizar('telefone', limpo.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2'))
  }

  const toggleProgramaSocial = (prog: string) => {
    const atual = form.programaSocial
    atualizar('programaSocial', atual.includes(prog) ? atual.filter((p) => p !== prog) : [...atual, prog])
  }

  const validarEtapa = (): boolean => {
    setErro('')
    if (etapaAtual === 0) {
      if (!form.nome || !form.cpf || !form.dataNascimento || !form.telefone || !form.endereco || !form.senha) {
        setErro('Preencha todos os campos obrigatórios.')
        return false
      }
      if (form.senha !== form.confirmarSenha) { setErro('As senhas não coincidem.'); return false }
      if (form.senha.length < 6) { setErro('A senha deve ter pelo menos 6 caracteres.'); return false }
    }
    if (etapaAtual === 1 && !form.comoDescobriuGestacao) {
      setErro('Informe como descobriu a gestação.')
      return false
    }
    return true
  }

  const avancar = () => { if (validarEtapa()) setEtapaAtual((p) => p + 1) }
  const voltar = () => { setErro(''); setEtapaAtual((p) => p - 1) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validarEtapa()) return
    setCarregando(true)

    const programas = [...form.programaSocial]
    if (form.programaSocialOutro.trim()) programas.push(form.programaSocialOutro.trim())

    const res = await fetch('/api/gestantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cpf: form.cpf.replace(/\D/g, ''),
        cns: form.cns || null,
        nome: form.nome,
        nomeSocial: form.nomeSocial || null,
        dataNascimento: form.dataNascimento,
        telefone: form.telefone.replace(/\D/g, ''),
        temWhatsapp: form.temWhatsapp,
        email: form.email || null,
        endereco: form.endereco,
        bairro: form.bairro || null,
        cep: form.cep || null,
        senha: form.senha,
        comoDescobriuGestacao: form.comoDescobriuGestacao,
        programaSocial: programas.length > 0 ? programas.join(', ') : null,
        temPlanoSaude: form.temPlanoSaude,
        desejaSeguimentoUbs: form.desejaSeguimentoUbs,
        dataUltimaMenstruacao: form.dataUltimaMenstruacao || null,
        numGestacoesPrevia: form.numGestacoesPrevia ? parseInt(form.numGestacoesPrevia) : null,
        numPartosNormais: form.numPartosNormais ? parseInt(form.numPartosNormais) : null,
        numPartosCesareos: form.numPartosCesareos ? parseInt(form.numPartosCesareos) : null,
        numAbortosPrevia: form.numAbortosPrevia ? parseInt(form.numAbortosPrevia) : null,
        alergias: form.alergias || null,
        doencasConhecidas: form.doencasConhecidas || null,
        medicacoesPreExistentes: form.medicacoesPreExistentes || null,
        desejoContracepcao: form.desejoContracepcao === 'sim' ? true : form.desejoContracepcao === 'nao' ? false : null,
      }),
    })

    const data = await res.json()
    setCarregando(false)
    if (!res.ok) { setErro(data.erro || 'Erro ao criar cadastro.'); return }
    router.push('/login?cadastro=sucesso')
  }

  const ic = 'w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all'
  const lc = 'block text-sm font-medium text-surface-700 mb-1.5'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-8">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-display text-surface-800">Cadastro da Gestante</h1>
          <p className="text-surface-500 mt-1">Preencha seus dados para criar sua caderneta digital</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {etapas.map((nome, i) => (
            <div key={nome} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                i === etapaAtual ? 'bg-primary-500 text-white' : i < etapaAtual ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-surface-400'
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                  {i < etapaAtual ? '✓' : i + 1}
                </span>
                <span className="hidden sm:inline">{nome}</span>
              </div>
              {i < etapas.length - 1 && <div className={`w-6 h-0.5 ${i < etapaAtual ? 'bg-primary-300' : 'bg-surface-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-surface-200/50 border border-surface-100 p-8">
          <form onSubmit={etapaAtual === 2 ? handleSubmit : (e) => { e.preventDefault(); avancar() }}>

            {etapaAtual === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className={lc}>Nome completo *</label>
                  <input type="text" value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} className={ic} required />
                </div>
                <div>
                  <label className={lc}>Nome social</label>
                  <input type="text" value={form.nomeSocial} onChange={(e) => atualizar('nomeSocial', e.target.value)} className={ic} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lc}>CPF *</label>
                    <input type="text" value={form.cpf} onChange={(e) => formatarCpfInput(e.target.value)} placeholder="000.000.000-00" className={ic} required />
                  </div>
                  <div>
                    <label className={lc}>CNS</label>
                    <input type="text" value={form.cns} onChange={(e) => atualizar('cns', e.target.value.replace(/\D/g, '').slice(0, 15))} placeholder="Cartão Nacional de Saúde" className={ic} />
                  </div>
                </div>
                <div>
                  <label className={lc}>Data de nascimento *</label>
                  <input type="date" value={form.dataNascimento} onChange={(e) => atualizar('dataNascimento', e.target.value)} className={ic} required />
                </div>
                <div>
                  <label className={lc}>Telefone *</label>
                  <div className="flex gap-3 items-center">
                    <input type="text" value={form.telefone} onChange={(e) => formatarTelefone(e.target.value)} placeholder="(71) 99999-9999" className={`${ic} flex-1`} required />
                    <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap text-sm text-surface-600">
                      <input type="checkbox" checked={form.temWhatsapp} onChange={(e) => atualizar('temWhatsapp', e.target.checked)} className="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-300" />
                      WhatsApp
                    </label>
                  </div>
                </div>
                <div>
                  <label className={lc}>E-mail</label>
                  <input type="email" value={form.email} onChange={(e) => atualizar('email', e.target.value)} className={ic} />
                </div>
                <div>
                  <label className={lc}>Endereço *</label>
                  <input type="text" value={form.endereco} onChange={(e) => atualizar('endereco', e.target.value)} className={ic} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lc}>Bairro</label>
                    <input type="text" value={form.bairro} onChange={(e) => atualizar('bairro', e.target.value)} className={ic} />
                  </div>
                  <div>
                    <label className={lc}>CEP</label>
                    <input type="text" value={form.cep} onChange={(e) => atualizar('cep', e.target.value)} className={ic} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lc}>Senha *</label>
                    <input type="password" value={form.senha} onChange={(e) => atualizar('senha', e.target.value)} className={ic} required />
                  </div>
                  <div>
                    <label className={lc}>Confirmar senha *</label>
                    <input type="password" value={form.confirmarSenha} onChange={(e) => atualizar('confirmarSenha', e.target.value)} className={ic} required />
                  </div>
                </div>
              </div>
            )}

            {etapaAtual === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className={lc}>Como descobriu a gestação? *</label>
                  <select value={form.comoDescobriuGestacao} onChange={(e) => atualizar('comoDescobriuGestacao', e.target.value)} className={ic} required>
                    <option value="">Selecione...</option>
                    <option value="TESTE_RAPIDO">Teste rápido</option>
                    <option value="BETA_HCG">Beta-HCG (Sangue)</option>
                    <option value="ATRASO_MENSTRUAL">Atraso menstrual</option>
                  </select>
                </div>

                <div>
                  <label className={lc}>Faz parte de algum programa social?</label>
                  <div className="space-y-2 mt-1">
                    {['Bolsa Família', 'BPC/LOAS', 'Aluguel social'].map((prog) => (
                      <label key={prog} className="flex items-center gap-2.5 cursor-pointer text-sm text-surface-700">
                        <input type="checkbox" checked={form.programaSocial.includes(prog)} onChange={() => toggleProgramaSocial(prog)} className="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-300" />
                        {prog}
                      </label>
                    ))}
                    <div className="flex items-center gap-2.5">
                      <input type="checkbox" checked={form.programaSocial.includes('Outro')} onChange={() => toggleProgramaSocial('Outro')} className="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-300" />
                      <input type="text" placeholder="Outro (especifique)" value={form.programaSocialOutro} onChange={(e) => atualizar('programaSocialOutro', e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-surface-200 bg-surface-50 text-sm text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={lc}>Acompanhamento com plano de saúde ou particular?</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-surface-700">
                      <input type="radio" name="plano" checked={form.temPlanoSaude} onChange={() => atualizar('temPlanoSaude', true)} className="text-primary-500 focus:ring-primary-300" /> Sim
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-surface-700">
                      <input type="radio" name="plano" checked={!form.temPlanoSaude} onChange={() => atualizar('temPlanoSaude', false)} className="text-primary-500 focus:ring-primary-300" /> Não
                    </label>
                  </div>
                  {form.temPlanoSaude && (
                    <div className="mt-3 p-3 rounded-xl bg-accent-50 border border-accent-100">
                      <label className="flex items-center gap-2.5 cursor-pointer text-sm text-accent-800">
                        <input type="checkbox" checked={form.desejaSeguimentoUbs} onChange={(e) => atualizar('desejaSeguimentoUbs', e.target.checked)} className="w-4 h-4 rounded border-accent-300 text-accent-500 focus:ring-accent-300" />
                        Deseja ser acompanhada também pela unidade de saúde da atenção primária?
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className={lc}>Data da última menstruação (DUM)</label>
                  <input type="date" value={form.dataUltimaMenstruacao} onChange={(e) => atualizar('dataUltimaMenstruacao', e.target.value)} className={ic} />
                  {form.dataUltimaMenstruacao && (
                    <p className="text-xs text-surface-400 mt-1">
                      DPP estimada: {new Date(new Date(form.dataUltimaMenstruacao).getTime() + 280 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {etapaAtual === 2 && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-sm text-surface-400 bg-surface-50 rounded-lg p-3 mb-2">
                  Estes campos são facultativos. Podem ser preenchidos agora ou atualizados posteriormente.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className={lc}>Gestações</label>
                    <input type="number" min="0" value={form.numGestacoesPrevia} onChange={(e) => atualizar('numGestacoesPrevia', e.target.value)} className={ic} />
                  </div>
                  <div>
                    <label className={lc}>Partos normais</label>
                    <input type="number" min="0" value={form.numPartosNormais} onChange={(e) => atualizar('numPartosNormais', e.target.value)} className={ic} />
                  </div>
                  <div>
                    <label className={lc}>Cesáreos</label>
                    <input type="number" min="0" value={form.numPartosCesareos} onChange={(e) => atualizar('numPartosCesareos', e.target.value)} className={ic} />
                  </div>
                  <div>
                    <label className={lc}>Abortos</label>
                    <input type="number" min="0" value={form.numAbortosPrevia} onChange={(e) => atualizar('numAbortosPrevia', e.target.value)} className={ic} />
                  </div>
                </div>
                <div>
                  <label className={lc}>Alergias</label>
                  <textarea value={form.alergias} onChange={(e) => atualizar('alergias', e.target.value)} rows={2} placeholder="Ex: Dipirona, Penicilina..." className={`${ic} resize-none`} />
                </div>
                <div>
                  <label className={lc}>Doenças conhecidas</label>
                  <textarea value={form.doencasConhecidas} onChange={(e) => atualizar('doencasConhecidas', e.target.value)} rows={2} placeholder="Ex: Hipertensão, Diabetes..." className={`${ic} resize-none`} />
                </div>
                <div>
                  <label className={lc}>Medicações em uso</label>
                  <textarea value={form.medicacoesPreExistentes} onChange={(e) => atualizar('medicacoesPreExistentes', e.target.value)} rows={2} placeholder="Ex: Losartana 50mg..." className={`${ic} resize-none`} />
                </div>
                <div>
                  <label className={lc}>Desejo de contracepção no pós-parto?</label>
                  <div className="flex gap-4 mt-1">
                    {[['sim', 'Sim'], ['nao', 'Não'], ['', 'Não sei']].map(([val, label]) => (
                      <label key={val} className="flex items-center gap-2 cursor-pointer text-sm text-surface-700">
                        <input type="radio" name="contracepcao" value={val} checked={form.desejoContracepcao === val} onChange={(e) => atualizar('desejoContracepcao', e.target.value)} className="text-primary-500 focus:ring-primary-300" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {erro && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 mt-4">{erro}</div>}

            <div className="flex gap-3 mt-6">
              {etapaAtual > 0 && (
                <button type="button" onClick={voltar} className="px-5 py-3 rounded-xl font-medium text-surface-600 bg-surface-100 hover:bg-surface-200 transition-all">Voltar</button>
              )}
              <button type="submit" disabled={carregando} className={`flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-200 transition-all ${carregando ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {carregando ? 'Cadastrando...' : etapaAtual < 2 ? 'Continuar' : 'Criar Cadastro'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-surface-500 mt-5">
            Já tem conta?{' '}
            <Link href="/login" className="text-primary-600 font-medium hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
