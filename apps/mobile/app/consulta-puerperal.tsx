import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { CONSULTA_PUERPERAL, GESTANTE } from '@/data';

export default function ConsultaPuerperalScreen() {
  const cp = CONSULTA_PUERPERAL;
  const consultasList = [
    { ...cp.primeiraConsulta, titulo: '1ª Consulta puerperal', icone: 'calendar' },
    { ...cp.segundaConsulta, titulo: '2ª Consulta puerperal', icone: 'calendar-check-o' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Context banner */}
      <View style={styles.banner}>
        <FontAwesome name="info-circle" size={18} color={Colors.primary} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.bannerTitle}>DPP: {new Date(GESTANTE.dpp).toLocaleDateString('pt-BR')}</Text>
          <Text style={styles.bannerSub}>
            As consultas puerperais serão agendadas após o parto
          </Text>
        </View>
      </View>

      {/* Consultation cards */}
      {consultasList.map((c, i) => (
        <View key={i} style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>{c.titulo}</Text>
            <View style={[styles.statusBadge, {
              backgroundColor: c.realizada ? `${Colors.success}15` : `${Colors.textMuted}12`,
            }]}>
              <FontAwesome
                name={c.realizada ? 'check' : 'clock-o'}
                size={10}
                color={c.realizada ? Colors.success : Colors.textMuted}
              />
              <Text style={[styles.statusText, {
                color: c.realizada ? Colors.success : Colors.textMuted,
              }]}>
                {c.realizada ? 'Realizada' : 'Aguardando'}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <FontAwesome name="clock-o" size={14} color={Colors.primary} style={{ width: 22 }} />
            <Text style={styles.label}>Prazo</Text>
            <Text style={styles.value}>{c.prazo}</Text>
          </View>
          {c.data && (
            <View style={styles.row}>
              <FontAwesome name={c.icone as any} size={14} color={Colors.primary} style={{ width: 22 }} />
              <Text style={styles.label}>Data</Text>
              <Text style={styles.value}>{new Date(c.data).toLocaleDateString('pt-BR')}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Orientações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Orientações para o puerpério</Text>
        {cp.orientacoes.map((o, i) => (
          <View key={i} style={styles.orientRow}>
            <View style={styles.bullet}>
              <FontAwesome name="check-circle" size={14} color={Colors.primary} />
            </View>
            <Text style={styles.orientText}>{o}</Text>
          </View>
        ))}
      </View>

      {/* Warning signs */}
      <View style={[styles.section, { borderLeftWidth: 3, borderLeftColor: Colors.amber }]}>
        <Text style={[styles.sectionTitle, { color: Colors.amber }]}>Sinais de alerta</Text>
        {[
          'Febre acima de 38°C',
          'Sangramento vaginal intenso',
          'Dor abdominal forte',
          'Dificuldade para amamentar com dor intensa',
          'Tristeza profunda ou pensamentos negativos persistentes',
        ].map((s, i) => (
          <View key={i} style={styles.orientRow}>
            <View style={styles.bullet}>
              <FontAwesome name="exclamation-triangle" size={12} color={Colors.amber} />
            </View>
            <Text style={styles.orientText}>{s}</Text>
          </View>
        ))}
        <Text style={styles.alertNote}>
          Se apresentar qualquer um destes sinais, procure sua UBS ou maternidade imediatamente.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  banner: { backgroundColor: `${Colors.primary}08`, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: `${Colors.primary}20` },
  bannerTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  bannerSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  section: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, marginTop: 12, elevation: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  label: { fontSize: 12, color: Colors.textSecondary, width: 110, marginLeft: 8 },
  value: { flex: 1, fontSize: 13, color: Colors.text, fontWeight: '500' },
  orientRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 6, gap: 10 },
  bullet: { width: 20, alignItems: 'center', marginTop: 1 },
  orientText: { flex: 1, fontSize: 13, color: Colors.text, lineHeight: 20 },
  alertNote: { fontSize: 12, color: Colors.amber, fontWeight: '600', marginTop: 10, lineHeight: 18 },
});
