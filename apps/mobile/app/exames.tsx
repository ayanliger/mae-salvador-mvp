import { View, Text, StyleSheet, SectionList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { EXAMES } from '@/data';

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

const grouped = [1, 2, 3].map((tri) => ({
  title: `${tri}º Trimestre`,
  data: EXAMES.filter((e) => e.trimestre === tri),
})).filter((s) => s.data.length > 0);

export default function ExamesScreen() {
  return (
    <SectionList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 4 }}
      sections={grouped}
      keyExtractor={(e) => e.id}
      renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
      renderItem={({ item: e }) => {
        const pending = !e.resultado;
        return (
          <View style={styles.card}>
            <View style={[styles.iconWrap, pending && styles.pendingIcon]}>
              <FontAwesome name={pending ? 'clock-o' : 'check-circle'} size={16} color={pending ? Colors.amber : Colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{e.nome}</Text>
              {e.data ? <Text style={styles.date}>{fmt(e.data)}</Text> : <Text style={styles.date}>Pendente</Text>}
              {e.resultado ? (
                <Text style={styles.result}>{e.resultado}</Text>
              ) : (
                <Text style={[styles.result, { color: Colors.amber }]}>Aguardando realização</Text>
              )}
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: Colors.primary, marginTop: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 14, flexDirection: 'row', marginBottom: 8, elevation: 1 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: `${Colors.success}12`, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  pendingIcon: { backgroundColor: `${Colors.amber}15` },
  name: { fontSize: 13, fontWeight: '700', color: Colors.text },
  date: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  result: { fontSize: 12, color: Colors.text, marginTop: 4, fontWeight: '500' },
});
