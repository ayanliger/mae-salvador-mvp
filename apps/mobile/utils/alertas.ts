// Gestational-age-based alert generation
// Consultation frequency rules (Ministério da Saúde):
//   ≤28 weeks → monthly (every 4 weeks)
//   28–36 weeks → biweekly (every 2 weeks)
//   >36 weeks → weekly

const MS_PER_DAY = 86_400_000;

// ── Gestational age ────────────────────────────────────

export function computeIG(dum: string, ref: Date = new Date()): number {
  const dumDate = new Date(dum + 'T00:00:00');
  const diffDays = Math.floor((ref.getTime() - dumDate.getTime()) / MS_PER_DAY);
  return Math.max(0, Math.floor(diffDays / 7));
}

/** Max days between consultations for a given IG (weeks). */
function intervaloMaximoDias(igSemanas: number): number {
  if (igSemanas <= 28) return 28; // 4 weeks
  if (igSemanas <= 36) return 14; // 2 weeks
  return 7; // weekly
}

function labelIntervalo(igSemanas: number): string {
  if (igSemanas <= 28) return 'mensal';
  if (igSemanas <= 36) return 'quinzenal';
  return 'semanal';
}

// ── Alert types ────────────────────────────────────────

export type AlertaSeveridade = 'urgente' | 'atencao' | 'info';

export interface Alerta {
  id: string;
  titulo: string;
  mensagem: string;
  severidade: AlertaSeveridade;
  icone: string; // FontAwesome icon name
}

// ── Alert generator ────────────────────────────────────

interface AlertaInput {
  dum: string;
  consultas: { data: string; ig: number }[];
  proximaConsulta: { data: string } | null;
  vacinas: { nome: string; dose: string; status: string }[];
  exames: { nome: string; resultado?: string | null }[];
}

export function gerarAlertas(input: AlertaInput): Alerta[] {
  const alertas: Alerta[] = [];
  const hoje = new Date();
  const igAtual = computeIG(input.dum, hoje);

  // 1. Overdue consultation check
  const consultasOrdenadas = [...input.consultas]
    .filter((c) => c.data)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  if (consultasOrdenadas.length > 0) {
    const ultima = consultasOrdenadas[0];
    const dataUltima = new Date(ultima.data + 'T00:00:00');
    const diasDesdeUltima = Math.floor((hoje.getTime() - dataUltima.getTime()) / MS_PER_DAY);
    const maxDias = intervaloMaximoDias(igAtual);
    const diasAtraso = diasDesdeUltima - maxDias;

    if (diasAtraso > 0) {
      alertas.push({
        id: 'alerta-consulta-atrasada',
        titulo: 'Consulta em atraso',
        mensagem: `Sua última consulta foi há ${diasDesdeUltima} dias. No ${igAtual}ª semana, o intervalo recomendado é ${labelIntervalo(igAtual)}. Atraso de ${diasAtraso} dia${diasAtraso > 1 ? 's' : ''}.`,
        severidade: 'urgente',
        icone: 'exclamation-triangle',
      });
    } else if (maxDias - diasDesdeUltima <= 5 && maxDias - diasDesdeUltima >= 0) {
      // Approaching due date (within 5 days)
      const diasRestantes = maxDias - diasDesdeUltima;
      alertas.push({
        id: 'alerta-consulta-proxima',
        titulo: 'Consulta em breve',
        mensagem: diasRestantes === 0
          ? 'Hoje é o último dia do intervalo recomendado para sua próxima consulta.'
          : `Faltam ${diasRestantes} dia${diasRestantes > 1 ? 's' : ''} para o limite do intervalo ${labelIntervalo(igAtual)}.`,
        severidade: 'atencao',
        icone: 'clock-o',
      });
    }
  }

  // 2. Upcoming appointment reminder
  if (input.proximaConsulta) {
    const dataProx = new Date(input.proximaConsulta.data + 'T00:00:00');
    const diasAte = Math.ceil((dataProx.getTime() - hoje.getTime()) / MS_PER_DAY);
    if (diasAte >= 0 && diasAte <= 7) {
      alertas.push({
        id: 'alerta-consulta-agendada',
        titulo: 'Consulta agendada',
        mensagem: diasAte === 0
          ? 'Sua consulta é hoje!'
          : `Sua próxima consulta é em ${diasAte} dia${diasAte > 1 ? 's' : ''}.`,
        severidade: diasAte <= 1 ? 'atencao' : 'info',
        icone: 'calendar-check-o',
      });
    }
  }

  // 3. Frequency change warning (approaching next threshold)
  if (igAtual >= 26 && igAtual < 28) {
    alertas.push({
      id: 'alerta-frequencia-quinzenal',
      titulo: 'Mudança de frequência',
      mensagem: `A partir da semana 28 (em ~${28 - igAtual} semana${28 - igAtual > 1 ? 's' : ''}), suas consultas passam a ser quinzenais.`,
      severidade: 'info',
      icone: 'info-circle',
    });
  } else if (igAtual >= 34 && igAtual < 36) {
    alertas.push({
      id: 'alerta-frequencia-semanal',
      titulo: 'Mudança de frequência',
      mensagem: `A partir da semana 36 (em ~${36 - igAtual} semana${36 - igAtual > 1 ? 's' : ''}), suas consultas passam a ser semanais.`,
      severidade: 'info',
      icone: 'info-circle',
    });
  }

  // 4. Pending vaccines
  const vacinasPendentes = input.vacinas.filter((v) => v.status === 'pendente');
  if (vacinasPendentes.length > 0) {
    alertas.push({
      id: 'alerta-vacinas-pendentes',
      titulo: `Vacina${vacinasPendentes.length > 1 ? 's' : ''} pendente${vacinasPendentes.length > 1 ? 's' : ''}`,
      mensagem: vacinasPendentes.map((v) => `${v.nome} (${v.dose})`).join(', '),
      severidade: 'atencao',
      icone: 'medkit',
    });
  }

  // 5. Pending exams (requested but no result)
  const examesPendentes = input.exames.filter((e) => e.resultado == null);
  if (examesPendentes.length > 0) {
    alertas.push({
      id: 'alerta-exames-pendentes',
      titulo: `Exame${examesPendentes.length > 1 ? 's' : ''} pendente${examesPendentes.length > 1 ? 's' : ''}`,
      mensagem: examesPendentes.map((e) => e.nome).join(', '),
      severidade: 'info',
      icone: 'flask',
    });
  }

  // 6. Minimum consultations check (Previne Brasil: 7 minimum)
  const consultasRealizadas = input.consultas.length;
  if (igAtual >= 36 && consultasRealizadas < 7) {
    alertas.push({
      id: 'alerta-minimo-consultas',
      titulo: 'Mínimo de consultas',
      mensagem: `Você realizou ${consultasRealizadas} de 7 consultas recomendadas. Converse com sua equipe de saúde.`,
      severidade: 'urgente',
      icone: 'exclamation-circle',
    });
  }

  return alertas;
}
