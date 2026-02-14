import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { GESTANTE } from '@/data';

export default function CartaoScreen() {
  const g = GESTANTE;
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40, alignItems: 'center' }}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cartão Mãe Salvador</Text>
          <Text style={styles.headerSub}>Programa de transporte para gestantes</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.avatarWrap}>
            <FontAwesome name="user-circle" size={52} color={Colors.primary} />
          </View>
          <Text style={styles.name}>{g.nomeCompleto}</Text>
          <Text style={styles.cpf}>CPF: {g.cpf}</Text>
          <Text style={styles.cpf}>CNS: {g.cns}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>UBS de referência</Text>
            <Text style={styles.infoValue}>{g.ubs}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>DPP</Text>
            <Text style={styles.infoValue}>{new Date(g.dpp).toLocaleDateString('pt-BR')}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <FontAwesome name="check-circle" size={12} color={Colors.success} />
              <Text style={styles.statusText}>Ativo</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <FontAwesome name="bus" size={14} color="#fff" />
          <Text style={styles.footerText}>Passagens gratuitas em transporte público de Salvador</Text>
        </View>
      </View>

      <Text style={styles.note}>
        Apresente este cartão ao embarcar no transporte público municipal. Em caso de dúvidas, procure sua UBS de referência.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 20 },
  card: { width: '100%', maxWidth: 360, backgroundColor: Colors.card, borderRadius: 20, marginTop: 24, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, overflow: 'hidden' },
  header: { backgroundColor: Colors.primary, paddingVertical: 18, paddingHorizontal: 20 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#fff', letterSpacing: 0.3 },
  headerSub: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  body: { padding: 24, alignItems: 'center' },
  avatarWrap: { marginBottom: 12 },
  name: { fontSize: 16, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  cpf: { fontSize: 12, color: Colors.textSecondary, marginTop: 3 },
  divider: { width: '100%', height: 1, backgroundColor: Colors.border, marginVertical: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 6 },
  infoLabel: { fontSize: 12, color: Colors.textSecondary },
  infoValue: { fontSize: 12, color: Colors.text, fontWeight: '600' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusText: { fontSize: 12, color: Colors.success, fontWeight: '700' },
  footer: { backgroundColor: Colors.primaryLight, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 16 },
  footerText: { fontSize: 11, color: '#fff', fontWeight: '500' },
  note: { fontSize: 11, color: Colors.textMuted, textAlign: 'center', marginTop: 20, lineHeight: 16, paddingHorizontal: 16 },
});
