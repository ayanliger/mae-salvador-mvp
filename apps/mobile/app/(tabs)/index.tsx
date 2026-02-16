import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useAuthStore } from '@/store/auth-store';
import { GESTANTE, CONSULTAS, PROXIMA_CONSULTA, VACINAS, EXAMES, NOTIFICACOES } from '@/data';
import { gerarAlertas, computeIG } from '@/utils/alertas';

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

export default function HomeScreen() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const unread = NOTIFICACOES.filter((n) => !n.lida).length;

  const alertas = useMemo(() => gerarAlertas({
    dum: GESTANTE.dum,
    consultas: CONSULTAS,
    proximaConsulta: PROXIMA_CONSULTA,
    vacinas: VACINAS,
    exames: EXAMES,
  }), []);
  const igAtual = computeIG(GESTANTE.dum);
  const urgentes = alertas.filter((a) => a.severidade === 'urgente');
  const atencao = alertas.filter((a) => a.severidade === 'atencao');

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Olá, {GESTANTE.nomeCompleto.split(' ')[0]}!</Text>
        <Text style={styles.greetingSub}>Semana {igAtual} de gestação</Text>
      </View>

      {/* Alert banners */}
      {urgentes.map((a) => (
        <TouchableOpacity key={a.id} style={styles.alertBannerUrgent} onPress={() => router.push('/notificacoes' as any)} activeOpacity={0.8}>
          <FontAwesome name={a.icone as any} size={15} color={Colors.danger} />
          <View style={{ flex: 1 }}>
            <Text style={styles.alertBannerTitle}>{a.titulo}</Text>
            <Text style={styles.alertBannerMsg}>{a.mensagem}</Text>
          </View>
          <FontAwesome name="chevron-right" size={10} color={Colors.danger} />
        </TouchableOpacity>
      ))}
      {atencao.length > 0 && urgentes.length === 0 && (
        <TouchableOpacity style={styles.alertBannerWarn} onPress={() => router.push('/notificacoes' as any)} activeOpacity={0.8}>
          <FontAwesome name={atencao[0].icone as any} size={15} color={Colors.amber} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.alertBannerTitle, { color: Colors.amber }]}>{atencao.length} alerta{atencao.length > 1 ? 's' : ''}</Text>
            <Text style={styles.alertBannerMsg}>{atencao[0].titulo}{atencao.length > 1 ? ` e mais ${atencao.length - 1}` : ''}</Text>
          </View>
          <FontAwesome name="chevron-right" size={10} color={Colors.amber} />
        </TouchableOpacity>
      )}

      {/* Progress card */}
      <View style={styles.progressCard}>
        <View style={styles.progressRow}>
          <View style={styles.progressItem}><Text style={styles.pVal}>{igAtual}</Text><Text style={styles.pLbl}>semanas</Text></View>
          <View style={styles.divider} />
          <View style={styles.progressItem}><Text style={styles.pVal}>{fmt(GESTANTE.dpp)}</Text><Text style={styles.pLbl}>data provável</Text></View>
          <View style={styles.divider} />
          <View style={styles.progressItem}><Text style={styles.pVal}>5</Text><Text style={styles.pLbl}>consultas</Text></View>
        </View>
        <View style={styles.barBg}><View style={[styles.barFill, { width: `${(igAtual / 40) * 100}%` }]} /></View>
        <Text style={styles.barLabel}>{igAtual}/40 semanas</Text>
      </View>

      {/* Next appointment */}
      <View style={styles.apptCard}>
        <View style={styles.apptIcon}><FontAwesome name="calendar" size={18} color={Colors.primary} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.apptTitle}>Próxima consulta</Text>
          <Text style={styles.apptDetail}>{fmt(PROXIMA_CONSULTA.data)} às {PROXIMA_CONSULTA.hora}</Text>
          <Text style={styles.apptDetail}>{PROXIMA_CONSULTA.local}</Text>
        </View>
      </View>

      {/* Quick actions */}
      <Text style={styles.sectionTitle}>Acesso rápido</Text>
      <View style={styles.grid}>
        {([
          { icon: 'book', label: 'Orientações', route: '/orientacoes' },
          { icon: 'user', label: 'Meus dados', route: '/dados' },
          { icon: 'stethoscope', label: 'Consultas', route: '/consultas' },
          { icon: 'flask', label: 'Exames', route: '/exames' },
          { icon: 'medkit', label: 'Vacinas', route: '/vacinas' },
          { icon: 'eyedropper', label: 'Medicações', route: '/medicacoes' },
          { icon: 'bus', label: 'Cartão Mãe', route: '/cartao' },
        ] as const).map((item) => (
          <TouchableOpacity key={item.label} style={styles.gridItem} onPress={() => router.push(item.route as any)} activeOpacity={0.7}>
            <View style={styles.gridIcon}><FontAwesome name={item.icon as any} size={20} color={Colors.primary} /></View>
            <Text style={styles.gridLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* UBS */}
      <View style={styles.ubsCard}>
        <FontAwesome name="hospital-o" size={16} color={Colors.primary} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.ubsName}>{GESTANTE.ubs}</Text>
          <Text style={styles.ubsDetail}>Maternidade: {GESTANTE.maternidadeReferencia}</Text>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
        <FontAwesome name="sign-out" size={14} color={Colors.danger} />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  greeting: { marginTop: 16, marginBottom: 20 },
  greetingText: { fontSize: 22, fontWeight: '800', color: Colors.text },
  greetingSub: { fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  progressCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 20, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  progressRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  progressItem: { alignItems: 'center' },
  pVal: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  pLbl: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  divider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  barBg: { height: 8, backgroundColor: Colors.border, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  barLabel: { fontSize: 11, color: Colors.textMuted, textAlign: 'center', marginTop: 6 },
  apptCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderLeftWidth: 4, borderLeftColor: Colors.primary },
  apptIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: `${Colors.primary}15`, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  apptTitle: { fontSize: 13, fontWeight: '700', color: Colors.text },
  apptDetail: { fontSize: 12, color: Colors.textSecondary, marginTop: 1 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  gridItem: { width: '31%', backgroundColor: Colors.card, borderRadius: 14, padding: 14, alignItems: 'center', elevation: 1 },
  gridIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: `${Colors.primary}10`, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridLabel: { fontSize: 11, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  ubsCard: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center' },
  ubsName: { fontSize: 13, fontWeight: '700', color: Colors.text },
  ubsDetail: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, paddingVertical: 14 },
  logoutText: { fontSize: 14, color: Colors.danger, fontWeight: '600' },
  // Alert banners
  alertBannerUrgent: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FDE8E8', borderRadius: 12, padding: 14, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: Colors.danger },
  alertBannerWarn: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FEF3E0', borderRadius: 12, padding: 14, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: Colors.amber },
  alertBannerTitle: { fontSize: 13, fontWeight: '700', color: Colors.danger },
  alertBannerMsg: { fontSize: 11, color: Colors.textSecondary, marginTop: 1, lineHeight: 16 },
});
