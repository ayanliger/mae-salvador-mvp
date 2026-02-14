import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { ORIENTACOES_MAP, ORIENTACOES } from '@/data/orientacoes';

export default function OrientacaoDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const topic = ORIENTACOES_MAP.get(id ?? '');

  // Find category color for this topic
  const category = ORIENTACOES.find((cat) => cat.topicos.some((t) => t.id === id));
  const color = category?.color ?? Colors.primary;

  if (!topic) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <FontAwesome name="exclamation-circle" size={32} color={Colors.textMuted} />
        <Text style={styles.notFound}>Orientação não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48 }}>
      <View style={[styles.heroCard, { borderTopColor: color }]}>
        <View style={[styles.heroIcon, { backgroundColor: `${color}12` }]}>
          <FontAwesome name={topic.icon as any} size={28} color={color} />
        </View>
        <Text style={styles.heroTitle}>{topic.titulo}</Text>
        <Text style={styles.heroSub}>{topic.resumo}</Text>
      </View>

      {topic.conteudo.map((paragraph, idx) => (
        <View key={idx} style={styles.contentRow}>
          <View style={[styles.bullet, { backgroundColor: color }]} />
          <Text style={styles.paragraph}>{paragraph}</Text>
        </View>
      ))}

      <View style={styles.tipCard}>
        <FontAwesome name="lightbulb-o" size={16} color={Colors.amber} />
        <Text style={styles.tipText}>
          Em caso de dúvidas, converse com sua equipe de saúde na próxima consulta.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  notFound: { fontSize: 14, color: Colors.textMuted, marginTop: 12 },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    marginTop: 12,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  heroIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  heroTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, textAlign: 'center', lineHeight: 24 },
  heroSub: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', marginTop: 6, lineHeight: 18 },
  contentRow: { flexDirection: 'row', marginBottom: 14, paddingRight: 4 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7, marginRight: 12, flexShrink: 0 },
  paragraph: { flex: 1, fontSize: 14, color: Colors.text, lineHeight: 22 },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.amber}12`,
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: `${Colors.amber}25`,
  },
  tipText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
});
