import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { GESTANTE, REGISTROS_PESO } from '@/data';

// Pre-gestational data (in production, from first consultation)
const PESO_PRE = 61.0;
const ALTURA = 1.62;
const IMC_PRE = PESO_PRE / (ALTURA * ALTURA);

function imcCategory(imc: number): { label: string; color: string; minGain: number; maxGain: number } {
  if (imc < 18.5) return { label: 'Baixo peso', color: '#3B82F6', minGain: 12.5, maxGain: 18.0 };
  if (imc < 25.0) return { label: 'Adequado', color: '#059669', minGain: 11.5, maxGain: 16.0 };
  if (imc < 30.0) return { label: 'Sobrepeso', color: '#D97706', minGain: 7.0, maxGain: 11.5 };
  return { label: 'Obesidade', color: '#DC2626', minGain: 5.0, maxGain: 9.0 };
}

const cat = imcCategory(IMC_PRE);

// Chart dimensions
const CHART_W = 300;
const CHART_H = 180;
const PAD_L = 40;
const PAD_B = 28;
const PLOT_W = CHART_W - PAD_L - 8;
const PLOT_H = CHART_H - PAD_B - 8;

// Axes
const WEEK_MIN = 0;
const WEEK_MAX = 40;
const allWeights = REGISTROS_PESO.map((r) => r.peso);
const WEIGHT_MIN = Math.floor(Math.min(PESO_PRE, ...allWeights) - 2);
const WEIGHT_MAX = Math.ceil(Math.max(PESO_PRE + cat.maxGain, ...allWeights) + 2);

function xPos(week: number) {
  return PAD_L + ((week - WEEK_MIN) / (WEEK_MAX - WEEK_MIN)) * PLOT_W;
}
function yPos(weight: number) {
  return 8 + PLOT_H - ((weight - WEIGHT_MIN) / (WEIGHT_MAX - WEIGHT_MIN)) * PLOT_H;
}

// Reference band endpoints (linear interpolation from week 0 to 40)
const bandPoints = [0, 10, 20, 30, 40].map((w) => {
  const frac = w / 40;
  return {
    week: w,
    low: PESO_PRE + cat.minGain * frac,
    high: PESO_PRE + cat.maxGain * frac,
  };
});

// Current gain
const currentWeight = REGISTROS_PESO[REGISTROS_PESO.length - 1]?.peso ?? PESO_PRE;
const totalGain = currentWeight - PESO_PRE;
const expectedGainAtWeek = (GESTANTE.idadeGestacionalSemanas / 40) * ((cat.minGain + cat.maxGain) / 2);
const gainStatus = totalGain < (GESTANTE.idadeGestacionalSemanas / 40) * cat.minGain
  ? 'abaixo'
  : totalGain > (GESTANTE.idadeGestacionalSemanas / 40) * cat.maxGain
    ? 'acima'
    : 'adequado';

export default function GanhoPesoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* IMC card */}
      <View style={styles.imcCard}>
        <View style={styles.imcRow}>
          <View style={styles.imcItem}>
            <Text style={styles.imcLabel}>Peso pré-gestacional</Text>
            <Text style={styles.imcVal}>{PESO_PRE.toFixed(1)} kg</Text>
          </View>
          <View style={styles.imcDivider} />
          <View style={styles.imcItem}>
            <Text style={styles.imcLabel}>Altura</Text>
            <Text style={styles.imcVal}>{ALTURA.toFixed(2)} m</Text>
          </View>
          <View style={styles.imcDivider} />
          <View style={styles.imcItem}>
            <Text style={styles.imcLabel}>IMC pré-gestacional</Text>
            <Text style={styles.imcVal}>{IMC_PRE.toFixed(1)}</Text>
          </View>
        </View>
        <View style={[styles.imcBadge, { backgroundColor: `${cat.color}15` }]}>
          <View style={[styles.imcDot, { backgroundColor: cat.color }]} />
          <Text style={[styles.imcBadgeText, { color: cat.color }]}>
            {cat.label} — ganho recomendado: {cat.minGain}–{cat.maxGain} kg
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Curva de ganho de peso</Text>
        <View style={{ width: CHART_W, height: CHART_H, alignSelf: 'center' }}>
          {/* Y-axis labels */}
          {[WEIGHT_MIN, Math.round((WEIGHT_MIN + WEIGHT_MAX) / 2), WEIGHT_MAX].map((w) => (
            <Text key={w} style={[styles.axisLabel, { position: 'absolute', left: 0, top: yPos(w) - 6 }]}>
              {w}
            </Text>
          ))}

          {/* X-axis labels */}
          {[0, 10, 20, 30, 40].map((w) => (
            <Text key={w} style={[styles.axisLabel, { position: 'absolute', left: xPos(w) - 8, top: CHART_H - 20 }]}>
              {w}s
            </Text>
          ))}

          {/* Grid lines */}
          {[WEIGHT_MIN, Math.round((WEIGHT_MIN + WEIGHT_MAX) / 2), WEIGHT_MAX].map((w) => (
            <View key={`g-${w}`} style={{
              position: 'absolute', left: PAD_L, top: yPos(w),
              width: PLOT_W, height: 1, backgroundColor: Colors.border, opacity: 0.5,
            }} />
          ))}

          {/* Reference band */}
          {bandPoints.map((bp, i) => {
            if (i === 0) return null;
            const prev = bandPoints[i - 1];
            const x1 = xPos(prev.week);
            const x2 = xPos(bp.week);
            const width = x2 - x1;
            const topY = Math.min(yPos(prev.high), yPos(bp.high));
            const botY = Math.max(yPos(prev.low), yPos(bp.low));
            return (
              <View key={`band-${i}`} style={{
                position: 'absolute', left: x1, top: topY,
                width, height: botY - topY,
                backgroundColor: `${cat.color}12`, borderRadius: 2,
              }} />
            );
          })}

          {/* Data line segments */}
          {REGISTROS_PESO.map((pt, i) => {
            if (i === 0) return null;
            const prev = REGISTROS_PESO[i - 1];
            const x1 = xPos(prev.semana);
            const y1 = yPos(prev.peso);
            const x2 = xPos(pt.semana);
            const y2 = yPos(pt.peso);
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            return (
              <View key={`line-${i}`} style={{
                position: 'absolute', left: x1, top: y1,
                width: len, height: 2.5,
                backgroundColor: Colors.primary, borderRadius: 1,
                transformOrigin: 'left center',
                transform: [{ rotate: `${angle}deg` }],
              }} />
            );
          })}

          {/* Data points */}
          {REGISTROS_PESO.map((pt) => (
            <View key={pt.semana} style={{
              position: 'absolute',
              left: xPos(pt.semana) - 5,
              top: yPos(pt.peso) - 5,
              width: 10, height: 10, borderRadius: 5,
              backgroundColor: Colors.primary,
              borderWidth: 2, borderColor: Colors.card,
              elevation: 2,
            }} />
          ))}

          {/* Axis lines */}
          <View style={{ position: 'absolute', left: PAD_L, top: 8, width: 1, height: PLOT_H, backgroundColor: Colors.border }} />
          <View style={{ position: 'absolute', left: PAD_L, top: 8 + PLOT_H, width: PLOT_W, height: 1, backgroundColor: Colors.border }} />
        </View>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
            <Text style={styles.legendText}>Peso registrado</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: `${cat.color}40` }]} />
            <Text style={styles.legendText}>Faixa recomendada</Text>
          </View>
        </View>
      </View>

      {/* Status card */}
      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Peso atual</Text>
            <Text style={styles.statVal}>{currentWeight.toFixed(1)} kg</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Ganho total</Text>
            <Text style={[styles.statVal, { color: gainStatus === 'adequado' ? Colors.success : Colors.amber }]}>
              +{totalGain.toFixed(1)} kg
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Situação</Text>
            <View style={[styles.statusBadge, {
              backgroundColor: gainStatus === 'adequado' ? `${Colors.success}15` : `${Colors.amber}15`,
            }]}>
              <FontAwesome
                name={gainStatus === 'adequado' ? 'check-circle' : 'exclamation-circle'}
                size={12}
                color={gainStatus === 'adequado' ? Colors.success : Colors.amber}
              />
              <Text style={[styles.statusBadgeText, {
                color: gainStatus === 'adequado' ? Colors.success : Colors.amber,
              }]}>
                {gainStatus === 'adequado' ? 'Adequado' : gainStatus === 'abaixo' ? 'Abaixo' : 'Acima'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Weight history */}
      <Text style={styles.histTitle}>Histórico de pesagens</Text>
      {REGISTROS_PESO.map((r, i) => {
        const gain = r.peso - PESO_PRE;
        return (
          <View key={r.semana} style={styles.histCard}>
            <View style={styles.histWeekBadge}>
              <Text style={styles.histWeekText}>{r.semana}s</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.histPeso}>{r.peso.toFixed(1)} kg</Text>
              <Text style={styles.histGain}>+{gain.toFixed(1)} kg desde o início</Text>
            </View>
            {i > 0 && (
              <Text style={[styles.histDelta, { color: r.peso > REGISTROS_PESO[i - 1].peso ? Colors.amber : Colors.success }]}>
                {r.peso > REGISTROS_PESO[i - 1].peso ? '+' : ''}{(r.peso - REGISTROS_PESO[i - 1].peso).toFixed(1)}
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16 },
  imcCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 18, marginTop: 12, elevation: 2 },
  imcRow: { flexDirection: 'row', justifyContent: 'space-around' },
  imcItem: { alignItems: 'center' },
  imcLabel: { fontSize: 10, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.3 },
  imcVal: { fontSize: 17, fontWeight: '800', color: Colors.text, marginTop: 2 },
  imcDivider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  imcBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 14 },
  imcDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  imcBadgeText: { fontSize: 12, fontWeight: '600' },
  chartCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 18, marginTop: 12, elevation: 2 },
  chartTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 14, textAlign: 'center' },
  axisLabel: { fontSize: 9, color: Colors.textMuted, fontWeight: '600' },
  legendRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: Colors.textSecondary },
  statusCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 18, marginTop: 12, elevation: 2 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statLabel: { fontSize: 10, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.3 },
  statVal: { fontSize: 18, fontWeight: '800', color: Colors.text, marginTop: 2 },
  statDivider: { width: 1, height: 36, backgroundColor: Colors.border },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 4 },
  statusBadgeText: { fontSize: 12, fontWeight: '700' },
  histTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginTop: 20, marginBottom: 10 },
  histCard: { backgroundColor: Colors.card, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 8, elevation: 1 },
  histWeekBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: `${Colors.primary}12`, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  histWeekText: { fontSize: 13, fontWeight: '800', color: Colors.primary },
  histPeso: { fontSize: 14, fontWeight: '700', color: Colors.text },
  histGain: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  histDelta: { fontSize: 12, fontWeight: '700' },
});
