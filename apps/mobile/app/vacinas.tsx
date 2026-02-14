import { View, Text, StyleSheet, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { VACINAS } from '@/data';

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

const aplicadas = VACINAS.filter((v) => v.status === 'aplicada').length;

export default function VacinasScreen() {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 4 }}
      ListHeaderComponent={
        <View style={styles.summary}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(aplicadas / VACINAS.length) * 100}%` }]} />
          </View>
          <Text style={styles.summaryText}>{aplicadas} de {VACINAS.length} doses aplicadas</Text>
        </View>
      }
      data={VACINAS}
      keyExtractor={(v) => v.id}
      renderItem={({ item: v }) => {
        const done = v.status === 'aplicada';
        return (
          <View style={styles.card}>
            <View style={[styles.iconWrap, { backgroundColor: done ? `${Colors.success}12` : `${Colors.amber}15` }]}>
              <FontAwesome name={done ? 'check' : 'clock-o'} size={16} color={done ? Colors.success : Colors.amber} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{v.nome}</Text>
              <Text style={styles.dose}>{v.dose}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.status, { color: done ? Colors.success : Colors.amber }]}>
                {done ? 'Aplicada' : 'Pendente'}
              </Text>
              {v.data && <Text style={styles.date}>{fmt(v.data)}</Text>}
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  summary: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, marginTop: 8, marginBottom: 12, elevation: 1 },
  progressTrack: { height: 8, backgroundColor: Colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.success, borderRadius: 4 },
  summaryText: { fontSize: 12, color: Colors.textSecondary, marginTop: 8, textAlign: 'center' },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 8, elevation: 1 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  name: { fontSize: 13, fontWeight: '700', color: Colors.text },
  dose: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  status: { fontSize: 11, fontWeight: '700' },
  date: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
});
