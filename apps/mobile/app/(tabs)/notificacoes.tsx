import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { GESTANTE, CONSULTAS, PROXIMA_CONSULTA, VACINAS, EXAMES, NOTIFICACOES } from '@/data';
import { gerarAlertas, computeIG, type Alerta, type AlertaSeveridade } from '@/utils/alertas';

const TIPO_ICONS: Record<string, string> = { consulta: 'calendar', exame: 'flask', vacina: 'medkit', geral: 'info-circle' };
const TIPO_COLORS: Record<string, string> = { consulta: Colors.primary, exame: Colors.amber, vacina: Colors.coral, geral: Colors.textSecondary };

const SEV_COLORS: Record<AlertaSeveridade, string> = {
  urgente: Colors.danger,
  atencao: Colors.amber,
  info: Colors.primary,
};
const SEV_BG: Record<AlertaSeveridade, string> = {
  urgente: '#FDE8E8',
  atencao: '#FEF3E0',
  info: '#E8F0FE',
};

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

function AlertaCard({ alerta }: { alerta: Alerta }) {
  const cor = SEV_COLORS[alerta.severidade];
  return (
    <View style={[styles.alertCard, { backgroundColor: SEV_BG[alerta.severidade], borderLeftColor: cor }]}>
      <View style={[styles.alertIcon, { backgroundColor: `${cor}20` }]}>
        <FontAwesome name={alerta.icone as any} size={16} color={cor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.alertTitle, { color: cor }]}>{alerta.titulo}</Text>
        <Text style={styles.alertMsg}>{alerta.mensagem}</Text>
      </View>
    </View>
  );
}

export default function NotificacoesScreen() {
  const alertas = useMemo(() => gerarAlertas({
    dum: GESTANTE.dum,
    consultas: CONSULTAS,
    proximaConsulta: PROXIMA_CONSULTA,
    vacinas: VACINAS,
    exames: EXAMES,
  }), []);

  const igAtual = computeIG(GESTANTE.dum);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}>
      {/* IG summary */}
      <View style={styles.igBar}>
        <FontAwesome name="heartbeat" size={13} color={Colors.primary} />
        <Text style={styles.igText}>Semana {igAtual} · Consultas: {igAtual <= 28 ? 'mensais' : igAtual <= 36 ? 'quinzenais' : 'semanais'}</Text>
      </View>

      {/* Dynamic alerts */}
      {alertas.length > 0 && (
        <>
          <Text style={styles.sectionLabel}>Alertas</Text>
          {alertas.map((a) => <AlertaCard key={a.id} alerta={a} />)}
        </>
      )}

      {/* Static notifications */}
      <Text style={[styles.sectionLabel, alertas.length > 0 && { marginTop: 20 }]}>Notificações</Text>
      {NOTIFICACOES.map((n) => (
        <View key={n.id} style={[styles.card, !n.lida && styles.unread]}>
          <View style={[styles.iconWrap, { backgroundColor: `${TIPO_COLORS[n.tipo]}15` }]}>
            <FontAwesome name={TIPO_ICONS[n.tipo] as any} size={16} color={TIPO_COLORS[n.tipo]} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{n.titulo}</Text>
              {!n.lida && <View style={styles.dot} />}
            </View>
            <Text style={styles.msg}>{n.msg}</Text>
            <Text style={styles.date}>{fmt(n.data)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  // IG bar
  igBar: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: `${Colors.primary}10`, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 14 },
  igText: { fontSize: 12, fontWeight: '600', color: Colors.primary },
  // Section
  sectionLabel: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 },
  // Alert cards
  alertCard: { borderRadius: 12, padding: 14, flexDirection: 'row', marginBottom: 8, borderLeftWidth: 3 },
  alertIcon: { width: 34, height: 34, borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  alertTitle: { fontSize: 13, fontWeight: '700' },
  alertMsg: { fontSize: 12, color: Colors.textSecondary, marginTop: 3, lineHeight: 17 },
  // Notification cards
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, flexDirection: 'row', marginBottom: 8, elevation: 1 },
  unread: { borderLeftWidth: 3, borderLeftColor: Colors.primary },
  iconWrap: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { fontSize: 13, fontWeight: '700', color: Colors.text },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.primary },
  msg: { fontSize: 12, color: Colors.textSecondary, marginTop: 3, lineHeight: 17 },
  date: { fontSize: 10, color: Colors.textMuted, marginTop: 4 },
});
