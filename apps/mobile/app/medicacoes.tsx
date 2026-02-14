import { View, Text, StyleSheet, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { MEDICACOES } from '@/data';

export default function MedicacoesScreen() {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 8 }}
      data={MEDICACOES}
      keyExtractor={(m) => m.id}
      renderItem={({ item: m }) => (
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <FontAwesome name="eyedropper" size={16} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{m.nome}</Text>
            <Text style={styles.dosagem}>{m.dosagem} — {m.frequencia}</Text>
            {!!m.obs && <Text style={styles.obs}>{m.obs}</Text>}
          </View>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <FontAwesome name="check-circle" size={32} color={Colors.textMuted} />
          <Text style={styles.emptyText}>Nenhuma medicação prescrita</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, flexDirection: 'row', marginBottom: 8, elevation: 1 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: `${Colors.primary}10`, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  name: { fontSize: 14, fontWeight: '700', color: Colors.text },
  dosagem: { fontSize: 12, color: Colors.textSecondary, marginTop: 3 },
  obs: { fontSize: 11, color: Colors.amber, marginTop: 4, fontStyle: 'italic' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 13, color: Colors.textMuted, marginTop: 12 },
});
