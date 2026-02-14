import { View, Text, StyleSheet, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { CONSULTAS, PROXIMA_CONSULTA } from '@/data';

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

export default function ConsultasScreen() {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 4 }}
      ListHeaderComponent={
        <View style={styles.next}>
          <FontAwesome name="calendar-plus-o" size={18} color={Colors.primary} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.nextLabel}>Próxima consulta</Text>
            <Text style={styles.nextDate}>{fmt(PROXIMA_CONSULTA.data)} às {PROXIMA_CONSULTA.hora}</Text>
            <Text style={styles.nextSub}>{PROXIMA_CONSULTA.local} — {PROXIMA_CONSULTA.profissional}</Text>
          </View>
        </View>
      }
      data={[...CONSULTAS].reverse()}
      keyExtractor={(c) => c.id}
      renderItem={({ item: c }) => (
        <View style={styles.card}>
          <View style={styles.igBadge}>
            <Text style={styles.igText}>{c.ig}s</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.date}>{fmt(c.data)}</Text>
            <Text style={styles.prof}>{c.profissional}</Text>
            <View style={styles.vitals}>
              <Text style={styles.vital}>Peso: {c.peso}kg</Text>
              <Text style={styles.vital}>PA: {c.pa}</Text>
              {c.bcf != null && <Text style={styles.vital}>BCF: {c.bcf}bpm</Text>}
            </View>
            <Text style={styles.conduta}>{c.conduta}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  next: { backgroundColor: `${Colors.primary}12`, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 8, borderWidth: 1, borderColor: `${Colors.primary}30` },
  nextLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  nextDate: { fontSize: 15, fontWeight: '700', color: Colors.primary, marginTop: 2 },
  nextSub: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, flexDirection: 'row', marginBottom: 8, elevation: 1 },
  igBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: `${Colors.primary}12`, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  igText: { fontSize: 13, fontWeight: '800', color: Colors.primary },
  date: { fontSize: 13, fontWeight: '700', color: Colors.text },
  prof: { fontSize: 11, color: Colors.textSecondary, marginTop: 1 },
  vitals: { flexDirection: 'row', gap: 10, marginTop: 6 },
  vital: { fontSize: 11, color: Colors.text, backgroundColor: Colors.background, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, overflow: 'hidden' },
  conduta: { fontSize: 11, color: Colors.textSecondary, marginTop: 6, fontStyle: 'italic', lineHeight: 16 },
});
