import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { GESTANTE, PROXIMA_CONSULTA, NOTIFICACOES } from '@/data';

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

export default function HomeScreen() {
  const router = useRouter();
  const unread = NOTIFICACOES.filter((n) => !n.lida).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Olá, {GESTANTE.nomeCompleto.split(' ')[0]}!</Text>
        <Text style={styles.greetingSub}>Semana {GESTANTE.idadeGestacionalSemanas} de gestação</Text>
      </View>

      {/* Progress card */}
      <View style={styles.progressCard}>
        <View style={styles.progressRow}>
          <View style={styles.progressItem}><Text style={styles.pVal}>{GESTANTE.idadeGestacionalSemanas}</Text><Text style={styles.pLbl}>semanas</Text></View>
          <View style={styles.divider} />
          <View style={styles.progressItem}><Text style={styles.pVal}>{fmt(GESTANTE.dpp)}</Text><Text style={styles.pLbl}>data provável</Text></View>
          <View style={styles.divider} />
          <View style={styles.progressItem}><Text style={styles.pVal}>5</Text><Text style={styles.pLbl}>consultas</Text></View>
        </View>
        <View style={styles.barBg}><View style={[styles.barFill, { width: `${(GESTANTE.idadeGestacionalSemanas / 40) * 100}%` }]} /></View>
        <Text style={styles.barLabel}>{GESTANTE.idadeGestacionalSemanas}/40 semanas</Text>
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
          { icon: 'user', label: 'Meus dados', route: '/dados' },
          { icon: 'stethoscope', label: 'Consultas', route: '/consultas' },
          { icon: 'flask', label: 'Exames', route: '/exames' },
          { icon: 'medkit', label: 'Vacinas', route: '/vacinas' },
          { icon: 'pills', label: 'Medicações', route: '/medicacoes' },
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
});
