import { View, Text, StyleSheet, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { NOTIFICACOES } from '@/data';

const TIPO_ICONS: Record<string, string> = { consulta: 'calendar', exame: 'flask', vacina: 'medkit', geral: 'info-circle' };
const TIPO_COLORS: Record<string, string> = { consulta: Colors.primary, exame: Colors.amber, vacina: Colors.coral, geral: Colors.textSecondary };

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

export default function NotificacoesScreen() {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
      data={NOTIFICACOES}
      keyExtractor={(n) => n.id}
      renderItem={({ item: n }) => (
        <View style={[styles.card, !n.lida && styles.unread]}>
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
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, flexDirection: 'row', marginBottom: 8, elevation: 1 },
  unread: { borderLeftWidth: 3, borderLeftColor: Colors.primary },
  iconWrap: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { fontSize: 13, fontWeight: '700', color: Colors.text },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.primary },
  msg: { fontSize: 12, color: Colors.textSecondary, marginTop: 3, lineHeight: 17 },
  date: { fontSize: 10, color: Colors.textMuted, marginTop: 4 },
});
