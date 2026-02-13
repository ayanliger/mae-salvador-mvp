// Templates de notificações conforme v2 do documento CADERNETA DA GESTANTE DIGITAL

export const NOTIFICACAO_TIPOS = {
  CONSULTA: 'CONSULTA',
  CARTAO: 'CARTAO',
  ALERTA: 'ALERTA',
  INFO: 'INFO',
  BUSCA_ATIVA: 'BUSCA_ATIVA',
  AGENDAMENTO: 'AGENDAMENTO',
  MUDANCA_UNIDADE: 'MUDANCA_UNIDADE',
  SIFILIS: 'SIFILIS',
  NOVA_GESTACAO: 'NOVA_GESTACAO',
} as const

// --- Vinculação e Busca Ativa ---

export function notificacaoBuscaAtivaEquipe(nomeGestante: string) {
  return {
    titulo: 'Nova gestante no território',
    mensagem: `A usuária "${nomeGestante}", que está vinculada ao seu território, se cadastrou no programa mãe salvador e se auto-declarou gestante. Favor fazer busca ativa da mesma para iniciar o pré-natal!`,
    tipo: NOTIFICACAO_TIPOS.BUSCA_ATIVA,
  }
}

export function notificacaoBeneficiosMaeSalvador(nomeUbs: string) {
  return {
    titulo: 'Programa Mãe Salvador',
    mensagem: `Você sabia que o programa mãe salvador tem diversos benefícios, desde que você faça seu acompanhamento regular no Posto de Saúde (Unidade Básica ou Unidade de Saúde da Família) da atenção primária de Salvador. Procure a unidade de saúde "${nomeUbs}" pelo acolhimento à demanda espontânea para iniciar o seu pré-natal e para maiores informações!`,
    tipo: NOTIFICACAO_TIPOS.INFO,
  }
}

// --- Agendamento ---

export function notificacaoAgendamentoConsulta(dataConsulta: string) {
  return {
    titulo: 'Consulta agendada',
    mensagem: `Sua primeira consulta de pré-natal foi agendada na data "${dataConsulta}", favor comparecer a consulta. Caso não possa comparecer, procure a unidade de saúde para realizar remarcação da consulta.`,
    tipo: NOTIFICACAO_TIPOS.AGENDAMENTO,
  }
}

// --- Mudança de Unidade ---

export function notificacaoMudancaUnidadeEquipe(nomeGestante: string) {
  return {
    titulo: 'Gestante mudou de região',
    mensagem: `Usuária "${nomeGestante}" sinalizou que mudou para uma região que é próxima dessa unidade de saúde, necessário fazer busca ativa dessa usuária para dar seguimento ao acompanhamento pré-natal.`,
    tipo: NOTIFICACAO_TIPOS.MUDANCA_UNIDADE,
  }
}

export function notificacaoMudancaUnidadeGestante(nomeUbs: string) {
  return {
    titulo: 'Unidade mais próxima',
    mensagem: `Diante do seu desejo de mudança de unidade, a unidade mais próxima do endereço que você cadastrou é "${nomeUbs}".`,
    tipo: NOTIFICACAO_TIPOS.MUDANCA_UNIDADE,
  }
}

// --- Plano de Saúde ---

export function notificacaoPlanoSaude() {
  return {
    titulo: 'Acompanhamento na atenção primária',
    mensagem: 'Você gostaria de manter o acompanhamento na unidade de atenção primária do município de Salvador?',
    tipo: NOTIFICACAO_TIPOS.INFO,
  }
}

// --- Cartão Mãe Salvador ---

export function notificacaoCartaoAtivo() {
  return {
    titulo: 'Cartão ativo',
    mensagem: 'Seu Cartão Mãe Salvador está ativo e pronto para uso.',
    tipo: NOTIFICACAO_TIPOS.CARTAO,
  }
}

export function notificacaoCreditoEtapa(etapa: number) {
  return {
    titulo: `Crédito da Etapa ${etapa}`,
    mensagem: `O crédito referente à etapa ${etapa} foi creditado no seu cartão.`,
    tipo: NOTIFICACAO_TIPOS.CARTAO,
  }
}

export function notificacaoNecessidadeAtivacao() {
  return {
    titulo: 'Necessidade de ativação',
    mensagem: 'Seu Cartão Mãe Salvador precisa ser ativado. Procure sua unidade de saúde.',
    tipo: NOTIFICACAO_TIPOS.CARTAO,
  }
}

export function notificacaoRiscoBloqueio() {
  return {
    titulo: 'Risco de bloqueio',
    mensagem: 'Seu Cartão Mãe Salvador está em risco de bloqueio. Procure sua unidade de saúde para regularizar.',
    tipo: NOTIFICACAO_TIPOS.CARTAO,
  }
}

export function notificacaoLgpdProfissional() {
  return {
    titulo: 'Termo LGPD',
    mensagem: 'Após impressão do Termo, coletar assinatura da gestante e enviar documento para o Distrito Sanitário de referência.',
    tipo: NOTIFICACAO_TIPOS.CARTAO,
  }
}

// --- Sífilis ---

export function notificacaoProximaDosePenicilina(dataProximaDose: string) {
  return {
    titulo: 'Próxima dose de Penicilina',
    mensagem: `A próxima dose de Penicilina para tratamento da Sífilis está agendada para ${dataProximaDose}. Procure sua unidade de saúde para realizar a aplicação.`,
    tipo: NOTIFICACAO_TIPOS.SIFILIS,
  }
}

export function notificacaoSifilisSemTratamento() {
  return {
    titulo: 'Tratamento de Sífilis pendente',
    mensagem: 'Você teve diagnóstico de Sífilis e ainda não fez uso da penicilina para tratamento. Procure sua unidade de saúde o mais rápido possível.',
    tipo: NOTIFICACAO_TIPOS.SIFILIS,
  }
}

// --- Nova Gestação ---

export function notificacaoNovaGestacaoEquipe(nomeGestante: string) {
  return {
    titulo: 'Nova gestação sinalizada',
    mensagem: `A usuária "${nomeGestante}" sinalizou uma nova gestação. Favor realizar busca ativa para dar seguimento ao acompanhamento pré-natal.`,
    tipo: NOTIFICACAO_TIPOS.NOVA_GESTACAO,
  }
}

// --- Consulta genérica ---

export function notificacaoConsultaRealizada(tipoConsulta: string, data: string) {
  return {
    titulo: 'Consulta registrada',
    mensagem: `Uma consulta de ${tipoConsulta} foi registrada na data ${data}.`,
    tipo: NOTIFICACAO_TIPOS.CONSULTA,
  }
}
