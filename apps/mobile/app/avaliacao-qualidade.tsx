import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { AVALIACAO_QUALIDADE, AVALIACOES_USUARIO, GESTANTE } from '@/data';

const atendidos = AVALIACAO_QUALIDADE.filter((c) => c.atendido).length;
const total = AVALIACAO_QUALIDADE.length;
const pct = Math.round((atendidos / total) * 100);

function fmt(iso: string) { return new Date(iso).toLocaleDateString('pt-BR'); }

const Stars = ({ count, size = 18 }: { count: number; size?: number }) => (
  <View style={{ flexDirection: 'row', gap: 3 }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <FontAwesome
        key={n}
        name={n <= count ? 'star' : 'star-o'}
        size={size}
        color={Colors.amber}
      />
    ))}
  </View>
);

const InteractiveStars = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => (
  <View style={{ flexDirection: 'row', gap: 6 }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <TouchableOpacity key={n} onPress={() => onChange(n)} activeOpacity={0.6}>
        <FontAwesome
          name={n <= value ? 'star' : 'star-o'}
          size={28}
          color={Colors.amber}
        />
      </TouchableOpacity>
    ))}
  </View>
);

export default function AvaliacaoQualidadeScreen() {
  const aval = AVALIACOES_USUARIO;
  const currentTrimestre = Math.min(3, Math.ceil(GESTANTE.idadeGestacionalSemanas / 13)) as 1 | 2 | 3;
  const pendingUsf = aval.usf.find((a) => a.estrelas === null);

  const [usfDraft, setUsfDraft] = useState(0);
  const [matDraft, setMatDraft] = useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Score card */}
      <View style={styles.scoreCard}>
        <View style={styles.scoreRing}>
          <Text style={styles.scorePct}>{pct}%</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.scoreTitle}>Qualidade do pré-natal</Text>
          <Text style={styles.scoreSub}>{atendidos} de {total} critérios atendidos</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
          </View>
        </View>
      </View>

      {/* Criteria list */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Critérios de avaliação</Text>
        {AVALIACAO_QUALIDADE.map((c, i) => (
          <View key={i} style={[styles.criterioCard, i > 0 && { borderTopWidth: 1, borderTopColor: Colors.border }]}>
            <View style={[styles.criterioIcon, {
              backgroundColor: c.atendido ? `${Colors.success}12` : `${Colors.amber}15`,
            }]}>
              <FontAwesome
                name={c.atendido ? 'check' : 'clock-o'}
                size={14}
                color={c.atendido ? Colors.success : Colors.amber}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.criterioText}>{c.criterio}</Text>
              <Text style={[styles.criterioDetalhe, {
                color: c.atendido ? Colors.success : Colors.amber,
              }]}>{c.detalhe}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* USF evaluation — trimestral */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sua avaliação da USF</Text>
        <Text style={styles.evalSubtitle}>{GESTANTE.ubs}</Text>

        {aval.usf.map((a) => {
          if (a.estrelas !== null) {
            return (
              <View key={a.trimestre} style={styles.evalCard}>
                <View style={styles.evalHeader}>
                  <View style={styles.triBadge}>
                    <Text style={styles.triText}>{a.trimestre}º tri</Text>
                  </View>
                  <Stars count={a.estrelas} size={16} />
                </View>
                {a.comentario && <Text style={styles.evalComment}>{a.comentario}</Text>}
                {a.data && <Text style={styles.evalDate}>Avaliado em {fmt(a.data)}</Text>}
              </View>
            );
          }

          return (
            <View key={a.trimestre} style={[styles.evalCard, styles.evalPending]}>
              <View style={styles.evalHeader}>
                <View style={styles.triBadge}>
                  <Text style={styles.triText}>{a.trimestre}º tri</Text>
                </View>
                {a.trimestre <= currentTrimestre ? (
                  <InteractiveStars value={usfDraft} onChange={setUsfDraft} />
                ) : (
                  <Text style={styles.evalPendingText}>Disponível no {a.trimestre}º trimestre</Text>
                )}
              </View>
              {a.trimestre <= currentTrimestre && usfDraft > 0 && (
                <TouchableOpacity style={styles.submitBtn} activeOpacity={0.7}>
                  <Text style={styles.submitText}>Enviar avaliação</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

      {/* Maternidade evaluation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sua avaliação da maternidade</Text>
        <Text style={styles.evalSubtitle}>{GESTANTE.maternidadeReferencia}</Text>

        {aval.maternidade.avaliada && aval.maternidade.estrelas ? (
          <View style={styles.evalCard}>
            <Stars count={aval.maternidade.estrelas} />
            {aval.maternidade.comentario && (
              <Text style={styles.evalComment}>{aval.maternidade.comentario}</Text>
            )}
            {aval.maternidade.data && (
              <Text style={styles.evalDate}>Avaliado em {fmt(aval.maternidade.data)}</Text>
            )}
          </View>
        ) : (
          <View style={[styles.evalCard, styles.evalPending]}>
            <InteractiveStars value={matDraft} onChange={setMatDraft} />
            <Text style={styles.evalHint}>Avalie após a visita ou internação</Text>
            {matDraft > 0 && (
              <TouchableOpacity style={styles.submitBtn} activeOpacity={0.7}>
                <Text style={styles.submitText}>Enviar avaliação</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.infoCard}>
        <FontAwesome name="info-circle" size={16} color={Colors.primary} />
        <Text style={styles.infoText}>
          A avaliação de qualidade é baseada nos indicadores do Programa Previne Brasil.
          Sua avaliação pessoal ajuda a melhorar o atendimento para todas as gestantes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  scoreCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 20, marginTop: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  scoreRing: { width: 64, height: 64, borderRadius: 32, borderWidth: 4, borderColor: pct >= 80 ? Colors.success : Colors.amber, justifyContent: 'center', alignItems: 'center' },
  scorePct: { fontSize: 20, fontWeight: '800', color: pct >= 80 ? Colors.success : Colors.amber },
  scoreTitle: { fontSize: 15, fontWeight: '700', color: Colors.text },
  scoreSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  progressTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 3, overflow: 'hidden', marginTop: 10 },
  progressFill: { height: '100%', backgroundColor: pct >= 80 ? Colors.success : Colors.amber, borderRadius: 3 },
  section: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, marginTop: 12, elevation: 1 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary, marginBottom: 4 },
  criterioCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  criterioIcon: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  criterioText: { fontSize: 13, fontWeight: '600', color: Colors.text },
  criterioDetalhe: { fontSize: 11, marginTop: 2 },
  // Evaluation
  evalSubtitle: { fontSize: 12, color: Colors.textSecondary, marginBottom: 12 },
  evalCard: { backgroundColor: Colors.background, borderRadius: 12, padding: 14, marginBottom: 8 },
  evalPending: { borderWidth: 1, borderColor: Colors.border, borderStyle: 'dashed' },
  evalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  triBadge: { backgroundColor: `${Colors.primary}12`, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  triText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  evalComment: { fontSize: 12, color: Colors.textSecondary, marginTop: 8, fontStyle: 'italic', lineHeight: 18 },
  evalDate: { fontSize: 10, color: Colors.textMuted, marginTop: 4 },
  evalPendingText: { fontSize: 12, color: Colors.textMuted, fontStyle: 'italic' },
  evalHint: { fontSize: 12, color: Colors.textMuted, marginTop: 8, textAlign: 'center' },
  submitBtn: { backgroundColor: Colors.primary, borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 10 },
  submitText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  infoCard: { flexDirection: 'row', gap: 10, backgroundColor: `${Colors.primary}08`, borderRadius: 12, padding: 14, marginTop: 16 },
  infoText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
});
