import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

const SECTIONS = [
  { icon: 'book', label: 'Orientações', desc: '31 temas educativos sobre a gestação', route: '/orientacoes' },
  { icon: 'user', label: 'Dados pessoais', desc: 'Informações pessoais e obstétricas', route: '/dados' },
  { icon: 'stethoscope', label: 'Consultas pré-natal', desc: 'Histórico de consultas realizadas', route: '/consultas' },
  { icon: 'flask', label: 'Exames', desc: 'Resultados de exames laboratoriais', route: '/exames' },
  { icon: 'medkit', label: 'Vacinas', desc: 'Cartão de vacinação gestacional', route: '/vacinas' },
  { icon: 'pills', label: 'Medicações', desc: 'Prescrições e medicamentos', route: '/medicacoes' },
  { icon: 'bus', label: 'Cartão Mãe Salvador', desc: 'Passagens gratuitas para consultas', route: '/cartao' },
] as const;

export default function CadernetaScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.header}>Sua caderneta digital com todos os registros da gestação.</Text>
      {SECTIONS.map((s) => (
        <TouchableOpacity key={s.route} style={styles.card} onPress={() => router.push(s.route as any)} activeOpacity={0.7}>
          <View style={styles.iconWrap}>
            <FontAwesome name={s.icon as any} size={20} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{s.label}</Text>
            <Text style={styles.desc}>{s.desc}</Text>
          </View>
          <FontAwesome name="chevron-right" size={14} color={Colors.textMuted} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  header: { fontSize: 13, color: Colors.textSecondary, marginTop: 12, marginBottom: 16, lineHeight: 18 },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 8, elevation: 1 },
  iconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: `${Colors.primary}10`, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  label: { fontSize: 14, fontWeight: '700', color: Colors.text },
  desc: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
});
