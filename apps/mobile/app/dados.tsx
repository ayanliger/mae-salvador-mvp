import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { GESTANTE } from '@/data';

function age(dob: string) {
  const d = new Date(dob);
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) a--;
  return a;
}

const Row = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.row}>
    <FontAwesome name={icon as any} size={14} color={Colors.primary} style={{ width: 22 }} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function DadosScreen() {
  const g = GESTANTE;
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Identificação</Text>
        <Row icon="user" label="Nome" value={g.nomeCompleto} />
        <Row icon="id-card" label="CPF" value={g.cpf} />
        <Row icon="barcode" label="CNS" value={g.cns} />
        <Row icon="birthday-cake" label="Idade" value={`${age(g.dataNascimento)} anos`} />
        <Row icon="phone" label="Telefone" value={g.telefone} />
        <Row icon="envelope" label="E-mail" value={g.email} />
        <Row icon="map-marker" label="Endereço" value={g.endereco} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados obstétricos</Text>
        <Row icon="tint" label="Tipo sanguíneo" value={g.tipoSanguineo} />
        <Row icon="heartbeat" label="Gestações" value={String(g.gestacoes)} />
        <Row icon="child" label="Partos" value={String(g.partos)} />
        <Row icon="child" label="Filhos vivos" value={String(g.filhosVivos)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gestação atual</Text>
        <Row icon="calendar" label="DUM" value={new Date(g.dum).toLocaleDateString('pt-BR')} />
        <Row icon="calendar-check-o" label="DPP" value={new Date(g.dpp).toLocaleDateString('pt-BR')} />
        <Row icon="clock-o" label="IG atual" value={`${g.idadeGestacionalSemanas} semanas`} />
        <Row icon="flag" label="Risco" value={g.riscoGestacional.charAt(0).toUpperCase() + g.riscoGestacional.slice(1)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acompanhamento</Text>
        <Row icon="hospital-o" label="UBS" value={g.ubs} />
        <Row icon="plus-square" label="Maternidade ref." value={g.maternidadeReferencia} />
        <Row icon="user-md" label="Profissional" value={g.profissionalResponsavel} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  section: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, marginTop: 12, elevation: 1 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  label: { fontSize: 12, color: Colors.textSecondary, width: 110, marginLeft: 8 },
  value: { flex: 1, fontSize: 13, color: Colors.text, fontWeight: '500' },
});
