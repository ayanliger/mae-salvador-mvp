import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import {
  GESTANTE,
  ANTECEDENTES_PESSOAIS,
  ANTECEDENTES_OBSTETRICOS,
  CONDICOES_GESTACAO,
  SIFILIS,
} from '@/data';

const Row = ({ icon, label, value, color }: { icon: string; label: string; value: string; color?: string }) => (
  <View style={styles.row}>
    <FontAwesome name={icon as any} size={14} color={Colors.primary} style={{ width: 22 }} />
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, color ? { color } : null]}>{value}</Text>
  </View>
);

const Badge = ({ text, color, bg }: { text: string; color: string; bg: string }) => (
  <View style={[styles.badge, { backgroundColor: bg }]}>
    <Text style={[styles.badgeText, { color }]}>{text}</Text>
  </View>
);

const EmptyNote = ({ text }: { text: string }) => (
  <Text style={styles.emptyNote}>{text}</Text>
);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

const descobrimentoLabels: Record<string, string> = {
  'teste-rapido': 'Teste rápido',
  'beta-hcg': 'Beta-hCG',
  'atraso-menstrual': 'Atraso menstrual',
};

export default function GestacaoAtualScreen() {
  const ant = ANTECEDENTES_PESSOAIS;
  const obsAnt = ANTECEDENTES_OBSTETRICOS;
  const cond = CONDICOES_GESTACAO;
  const sif = SIFILIS;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Gestação atual resumo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gestação atual</Text>
        <Row icon="calendar" label="DUM" value={formatDate(GESTANTE.dum)} />
        <Row icon="calendar-check-o" label="DPP" value={formatDate(GESTANTE.dpp)} />
        <Row icon="clock-o" label="IG atual" value={`${GESTANTE.idadeGestacionalSemanas} semanas`} />
        <Row icon="search" label="Descobrimento" value={descobrimentoLabels[cond.descobrimentoGestacao] ?? cond.descobrimentoGestacao} />
        <Row icon="stethoscope" label="1ª consulta" value={`${cond.primeiraConsultaIG} semanas`} />
        <View style={styles.row}>
          <FontAwesome name="flag" size={14} color={Colors.primary} style={{ width: 22 }} />
          <Text style={styles.label}>Classificação</Text>
          <Badge
            text={cond.riscoClassificacao === 'habitual' ? 'Risco habitual' : 'Alto risco'}
            color={cond.riscoClassificacao === 'habitual' ? Colors.success : Colors.danger}
            bg={cond.riscoClassificacao === 'habitual' ? `${Colors.success}15` : `${Colors.danger}15`}
          />
        </View>
      </View>

      {/* Fatores de risco / Condições */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Condições e fatores de risco</Text>
        {cond.fatoresRisco.length === 0 && cond.condicoesAtuais.length === 0 ? (
          <View style={styles.okBanner}>
            <FontAwesome name="check-circle" size={16} color={Colors.success} />
            <Text style={styles.okText}>Nenhum fator de risco ou condição identificada</Text>
          </View>
        ) : (
          <>
            {cond.fatoresRisco.map((f) => (
              <View key={f} style={styles.condRow}>
                <FontAwesome name="exclamation-triangle" size={12} color={Colors.amber} />
                <Text style={styles.condText}>{f}</Text>
              </View>
            ))}
            {cond.condicoesAtuais.map((c) => (
              <View key={c} style={styles.condRow}>
                <FontAwesome name="medkit" size={12} color={Colors.danger} />
                <Text style={styles.condText}>{c}</Text>
              </View>
            ))}
          </>
        )}
        {cond.suplementacao.length > 0 && (
          <>
            <View style={styles.divider} />
            <Text style={styles.subTitle}>Suplementação ativa</Text>
            {cond.suplementacao.map((s) => (
              <View key={s} style={styles.condRow}>
                <FontAwesome name="medkit" size={12} color={Colors.primary} />
                <Text style={styles.condText}>{s}</Text>
              </View>
            ))}
          </>
        )}
      </View>

      {/* Antecedentes pessoais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Antecedentes pessoais</Text>
        <Row icon="heartbeat" label="Doenças crônicas" value={ant.doencasCronicas.length > 0 ? ant.doencasCronicas.join(', ') : 'Nenhuma'} />
        <Row icon="warning" label="Alergias" value={ant.alergias.length > 0 ? ant.alergias.join(', ') : 'Nenhuma'} color={ant.alergias.length > 0 ? Colors.amber : undefined} />
        <Row icon="scissors" label="Cirurgias" value={ant.cirurgias.length > 0 ? ant.cirurgias.join(', ') : 'Nenhuma'} />
        <Row icon="ban" label="Tabagismo" value={ant.tabagismo ? 'Sim' : 'Não'} />
        <Row icon="ban" label="Etilismo" value={ant.etilismo ? 'Sim' : 'Não'} />
        <Row icon="ban" label="Drogas ilícitas" value={ant.drogasIlicitas ? 'Sim' : 'Não'} />
        {ant.historicoFamiliar.length > 0 && (
          <>
            <View style={styles.divider} />
            <Text style={styles.subTitle}>Histórico familiar</Text>
            {ant.historicoFamiliar.map((h) => (
              <View key={h} style={styles.condRow}>
                <FontAwesome name="users" size={12} color={Colors.textSecondary} />
                <Text style={styles.condText}>{h}</Text>
              </View>
            ))}
          </>
        )}
      </View>

      {/* Antecedentes obstétricos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Antecedentes obstétricos</Text>
        <View style={styles.obsRow}>
          <View style={styles.obsItem}>
            <Text style={styles.obsNum}>{GESTANTE.gestacoes}</Text>
            <Text style={styles.obsLabel}>Gestações</Text>
          </View>
          <View style={styles.obsDivider} />
          <View style={styles.obsItem}>
            <Text style={styles.obsNum}>{GESTANTE.partos}</Text>
            <Text style={styles.obsLabel}>Partos</Text>
          </View>
          <View style={styles.obsDivider} />
          <View style={styles.obsItem}>
            <Text style={styles.obsNum}>{GESTANTE.abortos}</Text>
            <Text style={styles.obsLabel}>Abortos</Text>
          </View>
          <View style={styles.obsDivider} />
          <View style={styles.obsItem}>
            <Text style={styles.obsNum}>{GESTANTE.filhosVivos}</Text>
            <Text style={styles.obsLabel}>Filhos vivos</Text>
          </View>
        </View>

        {obsAnt.length > 0 && (
          <>
            <View style={styles.divider} />
            <Text style={styles.subTitle}>Gestações anteriores</Text>
            {obsAnt.map((g, i) => (
              <View key={i} style={styles.prevCard}>
                <View style={styles.prevHeader}>
                  <View style={styles.prevYearBadge}>
                    <Text style={styles.prevYearText}>{g.ano}</Text>
                  </View>
                  <Badge
                    text={g.desfecho}
                    color={g.desfecho === 'Nascido vivo' ? Colors.success : Colors.amber}
                    bg={g.desfecho === 'Nascido vivo' ? `${Colors.success}15` : `${Colors.amber}15`}
                  />
                </View>
                <View style={styles.prevDetails}>
                  <Text style={styles.prevDetail}>Parto {g.tipoParto} — {g.idadeGestacionalParto} semanas</Text>
                  <Text style={styles.prevDetail}>RN: {g.sexoRN}, {g.pesoRN}g</Text>
                  {g.complicacoes.length > 0 && (
                    <Text style={[styles.prevDetail, { color: Colors.amber }]}>
                      Complicações: {g.complicacoes.join(', ')}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </>
        )}
      </View>

      {/* Sífilis */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Acompanhamento de sífilis</Text>
        </View>

        <View style={styles.sifTestRow}>
          <View style={styles.sifTestCard}>
            <Text style={styles.sifTestLabel}>Teste rápido 1º tri</Text>
            {sif.testeRapido1Tri ? (
              <>
                <View style={[styles.sifResultBadge, {
                  backgroundColor: sif.testeRapido1Tri.resultado === 'Não reagente' ? `${Colors.success}15` : `${Colors.danger}15`,
                }]}>
                  <FontAwesome
                    name={sif.testeRapido1Tri.resultado === 'Não reagente' ? 'check-circle' : 'exclamation-circle'}
                    size={12}
                    color={sif.testeRapido1Tri.resultado === 'Não reagente' ? Colors.success : Colors.danger}
                  />
                  <Text style={[styles.sifResultText, {
                    color: sif.testeRapido1Tri.resultado === 'Não reagente' ? Colors.success : Colors.danger,
                  }]}>
                    {sif.testeRapido1Tri.resultado}
                  </Text>
                </View>
                <Text style={styles.sifDate}>{formatDate(sif.testeRapido1Tri.data)}</Text>
              </>
            ) : (
              <EmptyNote text="Não realizado" />
            )}
          </View>
          <View style={styles.sifTestCard}>
            <Text style={styles.sifTestLabel}>Teste rápido 3º tri</Text>
            {sif.testeRapido3Tri ? (
              <>
                <View style={[styles.sifResultBadge, {
                  backgroundColor: sif.testeRapido3Tri.resultado === 'Não reagente' ? `${Colors.success}15` : `${Colors.danger}15`,
                }]}>
                  <FontAwesome
                    name={sif.testeRapido3Tri.resultado === 'Não reagente' ? 'check-circle' : 'exclamation-circle'}
                    size={12}
                    color={sif.testeRapido3Tri.resultado === 'Não reagente' ? Colors.success : Colors.danger}
                  />
                  <Text style={[styles.sifResultText, {
                    color: sif.testeRapido3Tri.resultado === 'Não reagente' ? Colors.success : Colors.danger,
                  }]}>
                    {sif.testeRapido3Tri.resultado}
                  </Text>
                </View>
                <Text style={styles.sifDate}>{formatDate(sif.testeRapido3Tri.data)}</Text>
              </>
            ) : (
              <View style={[styles.sifResultBadge, { backgroundColor: `${Colors.textMuted}12` }]}>
                <FontAwesome name="clock-o" size={12} color={Colors.textMuted} />
                <Text style={[styles.sifResultText, { color: Colors.textMuted }]}>Pendente</Text>
              </View>
            )}
          </View>
        </View>

        {sif.casoConfirmado && sif.tratamentoGestante && (
          <>
            <View style={styles.divider} />
            <Text style={styles.subTitle}>Tratamento</Text>
            <Row icon="medkit" label="Esquema" value={sif.tratamentoGestante.esquema} />
            <Row icon="calendar" label="Início" value={formatDate(sif.tratamentoGestante.inicio)} />
            <Row icon="calendar-check-o" label="Conclusão" value={formatDate(sif.tratamentoGestante.conclusao)} />
            {sif.tratamentoParceiro && (
              <>
                <View style={styles.divider} />
                <Text style={styles.subTitle}>Parceiro</Text>
                <Row icon="user" label="Tratamento" value={`${formatDate(sif.tratamentoParceiro.inicio)} — ${formatDate(sif.tratamentoParceiro.conclusao)}`} />
              </>
            )}
          </>
        )}

        {!sif.casoConfirmado && (
          <View style={[styles.okBanner, { marginTop: 12 }]}>
            <FontAwesome name="check-circle" size={16} color={Colors.success} />
            <Text style={styles.okText}>Sem caso de sífilis confirmado</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  section: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, marginTop: 12, elevation: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary, marginBottom: 12 },
  subTitle: { fontSize: 12, fontWeight: '700', color: Colors.text, marginBottom: 8, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  label: { fontSize: 12, color: Colors.textSecondary, width: 110, marginLeft: 8 },
  value: { flex: 1, fontSize: 13, color: Colors.text, fontWeight: '500' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  condRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 5 },
  condText: { fontSize: 13, color: Colors.text, flex: 1 },
  okBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: `${Colors.success}10`, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  okText: { fontSize: 13, color: Colors.success, fontWeight: '600' },
  emptyNote: { fontSize: 12, color: Colors.textMuted, fontStyle: 'italic' },
  // Obstetric summary
  obsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  obsItem: { alignItems: 'center' },
  obsNum: { fontSize: 22, fontWeight: '800', color: Colors.text },
  obsLabel: { fontSize: 10, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.3, marginTop: 2 },
  obsDivider: { width: 1, height: 32, backgroundColor: Colors.border },
  // Previous pregnancies
  prevCard: { backgroundColor: Colors.background, borderRadius: 12, padding: 12, marginBottom: 8 },
  prevHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  prevYearBadge: { width: 48, height: 28, borderRadius: 8, backgroundColor: `${Colors.primary}12`, justifyContent: 'center', alignItems: 'center' },
  prevYearText: { fontSize: 13, fontWeight: '800', color: Colors.primary },
  prevDetails: { gap: 3 },
  prevDetail: { fontSize: 12, color: Colors.textSecondary },
  // Syphilis
  sifTestRow: { flexDirection: 'row', gap: 10 },
  sifTestCard: { flex: 1, backgroundColor: Colors.background, borderRadius: 12, padding: 12, alignItems: 'center', gap: 6 },
  sifTestLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 },
  sifResultBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  sifResultText: { fontSize: 12, fontWeight: '700' },
  sifDate: { fontSize: 10, color: Colors.textMuted },
});
