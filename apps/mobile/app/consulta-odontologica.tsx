import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { CONSULTA_ODONTOLOGICA } from '@/data';

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

const Row = ({ icon, label, value, color }: { icon: string; label: string; value: string; color?: string }) => (
  <View style={styles.row}>
    <FontAwesome name={icon as any} size={14} color={Colors.primary} style={{ width: 22 }} />
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, color ? { color } : null]}>{value}</Text>
  </View>
);

export default function ConsultaOdontologicaScreen() {
  const c = CONSULTA_ODONTOLOGICA;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Status banner */}
      <View style={[styles.banner, {
        backgroundColor: c.realizada ? `${Colors.success}10` : `${Colors.amber}10`,
        borderColor: c.realizada ? `${Colors.success}30` : `${Colors.amber}30`,
      }]}>
        <FontAwesome
          name={c.realizada ? 'check-circle' : 'clock-o'}
          size={20}
          color={c.realizada ? Colors.success : Colors.amber}
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={[styles.bannerTitle, { color: c.realizada ? Colors.success : Colors.amber }]}>
            {c.realizada ? 'Consulta realizada' : 'Consulta pendente'}
          </Text>
          <Text style={styles.bannerSub}>
            {c.realizada
              ? `Realizada na ${c.igSemanas}ª semana de gestação`
              : 'Agende sua consulta odontológica'}
          </Text>
        </View>
      </View>

      {/* Details */}
      {c.realizada && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes da consulta</Text>
          <Row icon="calendar" label="Data" value={fmt(c.data)} />
          <Row icon="clock-o" label="IG na consulta" value={`${c.igSemanas} semanas`} />
          <Row icon="user-md" label="Profissional" value={c.profissional} />
          <Row icon="hospital-o" label="Local" value={c.local} />
          <Row icon="heartbeat" label="Condição bucal" value={c.condicaoBucal} />
          <Row
            icon="medkit"
            label="Tratamento"
            value={c.tratamentoNecessario ? 'Necessário' : 'Não necessário'}
            color={c.tratamentoNecessario ? Colors.amber : Colors.success}
          />
          {c.observacoes && (
            <>
              <View style={styles.divider} />
              <Text style={styles.obsLabel}>Observações</Text>
              <Text style={styles.obsText}>{c.observacoes}</Text>
            </>
          )}
        </View>
      )}

      {c.proximaConsulta && (
        <View style={[styles.section, { borderLeftWidth: 3, borderLeftColor: Colors.primary }]}>
          <Text style={styles.sectionTitle}>Próxima consulta</Text>
          <Row icon="calendar-plus-o" label="Data" value={fmt(c.proximaConsulta)} />
        </View>
      )}

      {/* Info card */}
      <View style={styles.infoCard}>
        <FontAwesome name="info-circle" size={16} color={Colors.primary} />
        <Text style={styles.infoText}>
          A consulta odontológica é recomendada durante o pré-natal para prevenir infecções
          bucais que podem afetar a gestação. O ideal é realizá-la no 1º trimestre.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  banner: { borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', marginTop: 12, borderWidth: 1 },
  bannerTitle: { fontSize: 14, fontWeight: '700' },
  bannerSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  section: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, marginTop: 12, elevation: 1 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  label: { fontSize: 12, color: Colors.textSecondary, width: 110, marginLeft: 8 },
  value: { flex: 1, fontSize: 13, color: Colors.text, fontWeight: '500' },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  obsLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 4 },
  obsText: { fontSize: 13, color: Colors.text, lineHeight: 20 },
  infoCard: { flexDirection: 'row', gap: 10, backgroundColor: `${Colors.primary}08`, borderRadius: 12, padding: 14, marginTop: 16 },
  infoText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
});
