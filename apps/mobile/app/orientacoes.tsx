import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { ORIENTACOES } from '@/data/orientacoes';

export default function OrientacoesScreen() {
  const router = useRouter();

  const sections = ORIENTACOES.map((cat) => ({
    title: cat.titulo,
    icon: cat.icon,
    color: cat.color,
    data: cat.topicos,
  }));

  return (
    <SectionList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 4 }}
      sections={sections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <View style={[styles.sectionHeader, { borderLeftColor: section.color }]}>
          <View style={[styles.sectionIconWrap, { backgroundColor: `${section.color}15` }]}>
            <FontAwesome name={section.icon as any} size={16} color={section.color} />
          </View>
          <Text style={[styles.sectionTitle, { color: section.color }]}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item, section }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => router.push({ pathname: '/orientacao-detalhe', params: { id: item.id } } as any)}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${section.color}10` }]}>
            <FontAwesome name={item.icon as any} size={16} color={section.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.topicTitle}>{item.titulo}</Text>
            <Text style={styles.topicDesc}>{item.resumo}</Text>
          </View>
          <FontAwesome name="chevron-right" size={12} color={Colors.textMuted} />
        </TouchableOpacity>
      )}
      ListHeaderComponent={
        <Text style={styles.header}>
          Informações e orientações para acompanhar cada fase da sua gestação.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  header: { fontSize: 13, color: Colors.textSecondary, marginTop: 12, marginBottom: 8, lineHeight: 18 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 10, paddingLeft: 10, borderLeftWidth: 3 },
  sectionIconWrap: { width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  sectionTitle: { fontSize: 14, fontWeight: '800', letterSpacing: 0.3 },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 8, elevation: 1 },
  iconWrap: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  topicTitle: { fontSize: 13, fontWeight: '700', color: Colors.text },
  topicDesc: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, lineHeight: 15 },
});
