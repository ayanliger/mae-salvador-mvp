// Validação de CPF
export function validarCPF(cpf: string): boolean {
  const limpo = cpf.replace(/\D/g, '')
  if (limpo.length !== 11) return false
  if (/^(\d)\1{10}$/.test(limpo)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(limpo.charAt(i)) * (10 - i)
  }
  let resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  if (resto !== parseInt(limpo.charAt(9))) return false

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(limpo.charAt(i)) * (11 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  return resto === parseInt(limpo.charAt(10))
}

// Formatar CPF: 123.456.789-00
export function formatarCPF(cpf: string): string {
  const limpo = cpf.replace(/\D/g, '')
  return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Calcular idade gestacional em semanas a partir da DUM
export function calcularIdadeGestacional(dum: Date): { semanas: number; dias: number } {
  const hoje = new Date()
  const diffMs = hoje.getTime() - dum.getTime()
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  return {
    semanas: Math.floor(diffDias / 7),
    dias: diffDias % 7,
  }
}

// Formatar data para exibição pt-BR
export function formatarData(data: Date | string): string {
  const d = typeof data === 'string' ? new Date(data) : data
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Formatar data e hora
export function formatarDataHora(data: Date | string): string {
  const d = typeof data === 'string' ? new Date(data) : data
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Classe utilitária para juntar classNames condicionalmente
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
