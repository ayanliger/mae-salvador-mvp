"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RiskBadge } from "@/components/risk-badge";
import { MockSection, MockBadge } from "@/components/mock-badge";
import {
  Users, Calendar, Syringe, ClipboardCheck, TrendingUp, TrendingDown,
  CreditCard, BarChart3, ShieldAlert, Eye, Pill, HeartPulse, Baby, AlertTriangle,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts";
import {
  MOCK_TENDENCIA_MENSAL, MOCK_DADOS_UBS, MOCK_TRANSCARD, MOCK_GESTANTES,
  MOCK_INDICADORES_PREVINE, MOCK_CONSULTAS, MOCK_MEDICACOES, MOCK_VACINAS,
  DISTRITOS_SANITARIOS, EQUIPES, RACAS_CORES, UBS_LIST,
} from "@mae-salvador/shared";
import type { Gestante, UBS, CasoSifilis } from "@mae-salvador/shared";
import type { IndicadoresSnapshot, UltimaConsultaMap } from "@/lib/esus-data";

/* ── Constants ─────────────────────────────────────── */

const CHART_COLORS = [
  "oklch(0.50 0.16 255)", // blue
  "oklch(0.67 0.14 30)",  // coral
  "oklch(0.76 0.14 80)",  // amber
  "oklch(0.62 0.12 200)", // sky
  "oklch(0.54 0.07 325)", // mauve
];
const TRI_COLORS = [CHART_COLORS[0], CHART_COLORS[3], CHART_COLORS[1]];
const ETAPA_PIE_COLORS = [CHART_COLORS[0], CHART_COLORS[3], CHART_COLORS[1]];

/* ── Props ─────────────────────────────────────────── */

interface GestorClientProps {
  gestantes: Gestante[];
  ubsList: UBS[];
  casosSifilis: CasoSifilis[];
  indicadoresSnapshot: IndicadoresSnapshot;
  ultimaConsultaMap: UltimaConsultaMap;
}

/* ── Helpers ───────────────────────────────────────── */

function fmt(iso: string) { return iso ? new Date(iso).toLocaleDateString("pt-BR") : "—"; }

function getTrimestre(ig: number): 1 | 2 | 3 {
  if (ig <= 13) return 1;
  if (ig <= 27) return 2;
  return 3;
}

function getIdade(dataNascimento: string): number {
  if (!dataNascimento) return 0;
  const today = new Date();
  const birth = new Date(dataNascimento);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getRacaLabel(v: string) {
  return RACAS_CORES.find((r) => r.value === v)?.label ?? v;
}

function displayName(g: Gestante) {
  return g.nomeCompleto || `Cidadão #${g.id}`;
}

/* ── Mock helpers (Programa Mãe Salvador tab only) ── */

function getDistritoNome(id: string) {
  return DISTRITOS_SANITARIOS.find((d) => d.id === id)?.nome ?? id;
}
function getMockUbsNome(id: string) {
  return UBS_LIST.find((u) => u.id === id)?.nome ?? id;
}
function getMockGestanteNome(id: string) {
  return MOCK_GESTANTES.find((g) => g.id === id)?.nomeCompleto ?? id;
}
function getEquipeNome(id: string) {
  return EQUIPES.find((e) => e.id === id)?.nome ?? id;
}
function getIgAtDate(dum: string, date: string): number {
  return Math.round((new Date(date).getTime() - new Date(dum).getTime()) / (7 * 24 * 60 * 60 * 1000));
}
function getVacStatus(gestanteId: string, nomeVacina: string): string {
  const vac = MOCK_VACINAS.find((v) => v.gestanteId === gestanteId && v.nome === nomeVacina);
  if (!vac) return "—";
  if (vac.status === "aplicada") return "✓";
  if (vac.status === "atrasada") return "⚠";
  return "⏳";
}
function getProfilaxia(gestanteId: string): string[] {
  const meds = MOCK_MEDICACOES.filter((m) => m.gestanteId === gestanteId && m.ativa);
  const p: string[] = [];
  if (meds.some((m) => m.nome.toLowerCase().includes("fólico"))) p.push("Ác. Fólico");
  if (meds.some((m) => m.nome.toLowerCase().includes("ferroso"))) p.push("Sulf. Ferroso");
  return p;
}

/* ── Reusable sub-components ───────────────────────── */

function KPICard({ title, value, subtitle, icon: Icon, trend, mock }: {
  title: string; value: string; subtitle: string; icon: React.ElementType; trend?: "up" | "down"; mock?: boolean;
}) {
  return (
    <Card>
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{title} {mock && <MockBadge />}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <div className="flex items-center gap-1 mt-0.5">
              {trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-600" />}
              {trend === "down" && <TrendingDown className="w-3 h-3 text-red-500" />}
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Indicator({ label, value, target }: { label: string; value: number; target: number }) {
  const met = value >= target;
  return (
    <div className="text-center p-3 rounded-lg bg-muted/50">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-xl font-bold ${met ? "text-emerald-700" : "text-amber-700"}`}>{value}%</p>
      <p className="text-[10px] text-muted-foreground">meta: {target}%</p>
    </div>
  );
}

/* ── Static mock computations (Programa Mãe Salvador) */

const transcardAtivos = MOCK_TRANSCARD.filter((t) => t.situacao === "ativo").length;
const transcardPendentes = MOCK_TRANSCARD.filter((t) => t.situacao === "pendente").length;
const etapaCounts = [1, 2, 3].map((e) => ({ name: `Etapa ${e}`, value: MOCK_TRANSCARD.filter((t) => t.etapaAtual === e).length }));

/* ── Page Component ────────────────────────────────── */

export default function GestorClient({
  gestantes,
  ubsList,
  casosSifilis,
  indicadoresSnapshot,
  ultimaConsultaMap,
}: GestorClientProps) {

  // UBS lookup (real data — matches CNES from gestantes)
  const ubsMap = useMemo(() => {
    const map = new Map<string, string>();
    ubsList.forEach((u) => { map.set(u.id, u.nome); map.set(u.cnes, u.nome); });
    return map;
  }, [ubsList]);
  function getUbsNome(id: string) { return ubsMap.get(id) ?? id; }

  // Gestante lookup (real data)
  const gestanteMap = useMemo(() => {
    const map = new Map<string, Gestante>();
    gestantes.forEach((g) => map.set(g.id, g));
    return map;
  }, [gestantes]);

  // ══════════ Visão Geral state + computations ══════════

  const [vgUnidade, setVgUnidade] = useState("todos");
  const [vgTrimestre, setVgTrimestre] = useState("todos");
  const [vgRaca, setVgRaca] = useState("todos");

  const vg = useMemo(() => {
    return gestantes.filter((g) => {
      if (!g.ativa) return false;
      if (vgUnidade !== "todos" && g.ubsId !== vgUnidade) return false;
      if (vgTrimestre !== "todos" && getTrimestre(g.idadeGestacionalSemanas) !== Number(vgTrimestre)) return false;
      if (vgRaca !== "todos" && g.racaCor !== vgRaca) return false;
      return true;
    });
  }, [gestantes, vgUnidade, vgTrimestre, vgRaca]);

  const vgN = Math.max(vg.length, 1);
  const vgMenores18 = vg.filter((g) => getIdade(g.dataNascimento) < 18).length;
  const vg35mais = vg.filter((g) => getIdade(g.dataNascimento) >= 35).length;
  const vgAltoRisco = Math.round((vg.filter((g) => g.riscoGestacional === "alto").length / vgN) * 100);
  const vgCom7 = vg.filter((g) => (ultimaConsultaMap[g.id]?.totalConsultas ?? 0) >= 7).length;
  const vgComConsulta = vg.filter((g) => (ultimaConsultaMap[g.id]?.totalConsultas ?? 0) > 0).length;

  const vgTriData = [1, 2, 3].map((t) => ({ name: `${t}° Tri`, value: vg.filter((g) => getTrimestre(g.idadeGestacionalSemanas) === t).length }));
  const vgRiskPie = [
    { name: "Risco Habitual", value: vg.filter((g) => g.riscoGestacional !== "alto").length, fill: "oklch(0.58 0.14 255)" },
    { name: "Alto Risco", value: vg.filter((g) => g.riscoGestacional === "alto").length, fill: "oklch(0.60 0.18 25)" },
  ];
  const vgRacaData = RACAS_CORES.map((r) => ({ name: r.label, count: vg.filter((g) => g.racaCor === r.value).length })).filter((d) => d.count > 0);

  const vgUbsData = useMemo(() => {
    const counts: Record<string, number> = {};
    vg.forEach((g) => { counts[g.ubsId] = (counts[g.ubsId] ?? 0) + 1; });
    return Object.entries(counts)
      .map(([id, count]) => ({ name: getUbsNome(id).length > 25 ? getUbsNome(id).slice(0, 25) + "…" : getUbsNome(id), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vg, ubsMap]);

  const vgConsultaDist = useMemo(() => {
    const c = vg.map((g) => ultimaConsultaMap[g.id]?.totalConsultas ?? 0);
    return [
      { range: "0", count: c.filter((n) => n === 0).length },
      { range: "1–3", count: c.filter((n) => n >= 1 && n <= 3).length },
      { range: "4–6", count: c.filter((n) => n >= 4 && n <= 6).length },
      { range: "7+", count: c.filter((n) => n >= 7).length },
    ];
  }, [vg, ultimaConsultaMap]);

  // ══════════ Indicadores MS computations ══════════

  const snap = indicadoresSnapshot;
  const snapN = Math.max(snap.totalGestantes, 1);
  const indValues = [
    { label: "Início precoce (≤12 sem)", value: Math.round((snap.inicioPrecoce / snapN) * 100), target: 80 },
    { label: "6+ consultas", value: Math.round((snap.com6Consultas / snapN) * 100), target: 60 },
    { label: "7+ consultas", value: Math.round((snap.com7Consultas / snapN) * 100), target: 70 },
    { label: "Cobertura dTpa", value: Math.round((snap.coberturaDtpa / snapN) * 100), target: 85 },
    { label: "Cobertura Influenza", value: Math.round((snap.coberturaInfluenza / snapN) * 100), target: 80 },
  ];

  // Quadrimestre list (mock — for historical chart)
  const QUADRIMESTRES = MOCK_INDICADORES_PREVINE[0].valores.map((v) => v.quadrimestre);
  const [quadrimestre, setQuadrimestre] = useState(QUADRIMESTRES[QUADRIMESTRES.length - 1]);

  // ══════════ Sífilis state + computations ══════════

  const [sifUnidade, setSifUnidade] = useState("todos");
  const [sifTrimestre, setSifTrimestre] = useState("todos");
  const [sifRaca, setSifRaca] = useState("todos");

  const sif = useMemo(() => {
    return casosSifilis.filter((c) => {
      const g = gestanteMap.get(c.gestanteId);
      if (!g) return false;
      if (sifUnidade !== "todos" && g.ubsId !== sifUnidade) return false;
      if (sifTrimestre !== "todos" && getTrimestre(g.idadeGestacionalSemanas) !== Number(sifTrimestre)) return false;
      if (sifRaca !== "todos" && g.racaCor !== sifRaca) return false;
      return true;
    });
  }, [casosSifilis, gestanteMap, sifUnidade, sifTrimestre, sifRaca]);

  const sifClassPie = [
    { name: "Recente", value: sif.filter((c) => c.classificacao === "recente").length, fill: CHART_COLORS[0] },
    { name: "Tardia", value: sif.filter((c) => c.classificacao === "tardia").length, fill: CHART_COLORS[1] },
    { name: "Indeterminada", value: sif.filter((c) => c.classificacao === "indeterminada").length, fill: CHART_COLORS[2] },
  ].filter((d) => d.value > 0);

  const sifUbsCounts: Record<string, number> = {};
  sif.forEach((c) => { const g = gestanteMap.get(c.gestanteId); if (g) sifUbsCounts[g.ubsId] = (sifUbsCounts[g.ubsId] ?? 0) + 1; });
  const sifTopUbs = Object.entries(sifUbsCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, count]) => ({ name: getUbsNome(id), count }));

  // ══════════ Programa Mãe Salvador state (mock) ══════════

  const [msDistrito, setMsDistrito] = useState("todos");
  const [msUnidade, setMsUnidade] = useState("todos");
  const [msEquipe, setMsEquipe] = useState("todos");
  const [msStatus, setMsStatus] = useState("todos");

  const msUbsOpts = msDistrito !== "todos" ? UBS_LIST.filter((u) => u.distritoSanitarioId === msDistrito) : UBS_LIST;
  const msEqOpts = msUnidade !== "todos" ? EQUIPES.filter((e) => e.ubsId === msUnidade) : msDistrito !== "todos" ? EQUIPES.filter((e) => msUbsOpts.some((u) => u.id === e.ubsId)) : EQUIPES;

  const ms = useMemo(() => {
    return MOCK_TRANSCARD.filter((tc) => {
      const g = MOCK_GESTANTES.find((x) => x.id === tc.gestanteId);
      if (!g) return false;
      if (msDistrito !== "todos" && g.endereco.distritoSanitarioId !== msDistrito) return false;
      if (msUnidade !== "todos" && g.ubsId !== msUnidade) return false;
      if (msEquipe !== "todos" && g.equipeId !== msEquipe) return false;
      if (msStatus !== "todos" && tc.situacao !== msStatus) return false;
      return true;
    });
  }, [msDistrito, msUnidade, msEquipe, msStatus]);

  const msN = Math.max(ms.length, 1);
  const msAtivos = ms.filter((t) => t.situacao === "ativo").length;
  const msInconsistencias = ms.filter((t) => t.situacao === "inconsistencia").length;
  const msSemCpf = Math.round((ms.filter((t) => !t.cpf || t.cpf.trim() === "").length / msN) * 100);
  const msRecusaTc = Math.round((ms.filter((t) => t.recusouTranscard).length / msN) * 100);
  const msRecusaEnx = Math.round((ms.filter((t) => t.recusouKitEnxoval).length / msN) * 100);
  const msBolsaFam = ms.filter((t) => MOCK_GESTANTES.find((x) => x.id === t.gestanteId)?.bolsaFamilia).length;
  const msCras = ms.filter((t) => t.encaminhadaCras).length;
  const msVinc180 = ms.filter((t) => (new Date().getTime() - new Date(t.dataVinculacao).getTime()) / 86400000 < 180).length;
  const msEtapaCounts = [1, 2, 3].map((e) => ({ name: `Etapa ${e}`, value: ms.filter((t) => t.etapaAtual === e).length }));

  // ══════════ RENDER ══════════

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-sm text-muted-foreground mt-1">Indicadores e relatórios do pré-natal — Salvador</p>
      </div>

      <Tabs defaultValue="visao-geral" className="space-y-6">
        <TabsList>
          <TabsTrigger value="visao-geral"><Eye className="w-3.5 h-3.5 mr-1.5" />Visão Geral</TabsTrigger>
          <TabsTrigger value="mae-salvador"><CreditCard className="w-3.5 h-3.5 mr-1.5" />Programa Mãe Salvador</TabsTrigger>
          <TabsTrigger value="indicadores"><BarChart3 className="w-3.5 h-3.5 mr-1.5" />Indicadores MS</TabsTrigger>
          <TabsTrigger value="sifilis"><ShieldAlert className="w-3.5 h-3.5 mr-1.5" />Sífilis na Gestação</TabsTrigger>
        </TabsList>

        {/* ══════════ TAB 1: Visão Geral ══════════ */}
        <TabsContent value="visao-geral" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={vgUnidade} onValueChange={setVgUnidade}>
              <SelectTrigger className="w-[170px] h-9 text-xs"><SelectValue placeholder="Unidade" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Unidades</SelectItem>
                {ubsList.map((u) => <SelectItem key={u.cnes} value={u.cnes}>{u.nome}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={vgTrimestre} onValueChange={setVgTrimestre}>
              <SelectTrigger className="w-[140px] h-9 text-xs"><SelectValue placeholder="Trimestre" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="1">1° Trimestre</SelectItem>
                <SelectItem value="2">2° Trimestre</SelectItem>
                <SelectItem value="3">3° Trimestre</SelectItem>
              </SelectContent>
            </Select>
            <Select value={vgRaca} onValueChange={setVgRaca}>
              <SelectTrigger className="w-[130px] h-9 text-xs"><SelectValue placeholder="Raça/Cor" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                {RACAS_CORES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* KPI Cards Row 1 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Gestantes Ativas" value={vg.length.toLocaleString("pt-BR")} subtitle="no filtro atual" icon={Users} />
            <KPICard title="Gestantes < 18 anos" value={String(vgMenores18)} subtitle="menores de idade" icon={Baby} />
            <KPICard title="Gestantes ≥ 35 anos" value={String(vg35mais)} subtitle="idade avançada" icon={Users} />
            <KPICard title="Com 7+ Consultas" value={String(vgCom7)} subtitle={`de ${vg.length} gestantes`} icon={ClipboardCheck} />
          </div>

          {/* KPI Cards Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Alto Risco" value={`${vgAltoRisco}%`} subtitle="classificadas" icon={HeartPulse} />
            <KPICard title="Com Consulta" value={`${Math.round((vgComConsulta / vgN) * 100)}%`} subtitle={`${vgComConsulta} gestantes`} icon={Calendar} />
            <KPICard title="Bolsa Família" value="—" subtitle="dados indisponíveis" icon={Users} mock />
            <KPICard title="Transcard Ativo" value="—" subtitle="dados indisponíveis" icon={CreditCard} mock />
          </div>

          {/* Charts: Trimestre pie + UBS bar */}
          <div className="grid lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Gestações por Trimestre</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={vgTriData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} fontSize={11}>
                      {vgTriData.map((_, i) => <Cell key={i} fill={TRI_COLORS[i]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Gestações por UBS (Top 10)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={vgUbsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 250)" />
                    <XAxis type="number" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" fontSize={10} tickLine={false} axisLine={false} width={160} />
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} name="Gestantes" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts: Raça bar + Consultas distribution */}
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Gestações por Raça/Cor</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={vgRacaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 250)" />
                    <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="count" fill={CHART_COLORS[3]} radius={[4, 4, 0, 0]} name="Gestantes" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Distribuição por N° de Consultas Pré-natal</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={vgConsultaDist}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 250)" />
                    <XAxis dataKey="range" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="count" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} name="Gestantes" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Consultas/Mês + Risco pie */}
          <div className="grid lg:grid-cols-3 gap-4">
            <MockSection className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Consultas por Mês</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={MOCK_TENDENCIA_MENSAL}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 250)" />
                      <XAxis dataKey="mes" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                      <Bar dataKey="consultas" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} name="Consultas" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </MockSection>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Distribuição de Risco</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={vgRiskPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name} ${value}`} fontSize={11}>
                      {vgRiskPie.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Previne Brasil summary (real from indicadoresSnapshot) */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Indicadores Previne Brasil (Snapshot Atual)</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {indValues.map((iv) => <Indicator key={iv.label} label={iv.label} value={iv.value} target={iv.target} />)}
              </div>
            </CardContent>
          </Card>

          {/* Trend line (mock-tagged) */}
          <MockSection>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Evolução do Início Precoce</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={MOCK_TENDENCIA_MENSAL}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 250)" />
                    <XAxis dataKey="mes" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[60, 80]} unit="%" />
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                    <Line type="monotone" dataKey="inicioPrecoce" stroke={CHART_COLORS[0]} strokeWidth={2.5} dot={{ r: 4 }} name="Início precoce %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </MockSection>

          {/* UBS table (mock-tagged) */}
          <MockSection>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Desempenho por UBS</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>UBS</TableHead>
                      <TableHead>Distrito</TableHead>
                      <TableHead className="text-right">Gestantes</TableHead>
                      <TableHead className="text-right">Consultas/mês</TableHead>
                      <TableHead className="text-right">Início precoce</TableHead>
                      <TableHead className="text-right">Cobertura vacinal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_DADOS_UBS.map((ubs) => (
                      <TableRow key={ubs.ubsId}>
                        <TableCell className="font-medium">{ubs.ubsNome}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{getDistritoNome(ubs.distrito)}</TableCell>
                        <TableCell className="text-right">{ubs.gestantesAtivas}</TableCell>
                        <TableCell className="text-right">{ubs.consultasMes}</TableCell>
                        <TableCell className="text-right">
                          <span className={ubs.inicioPrecoce >= 75 ? "text-emerald-700" : ubs.inicioPrecoce >= 65 ? "text-amber-700" : "text-red-700"}>{ubs.inicioPrecoce}%</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={ubs.coberturaVacinal >= 80 ? "text-emerald-700" : ubs.coberturaVacinal >= 70 ? "text-amber-700" : "text-red-700"}>{ubs.coberturaVacinal}%</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </MockSection>

          {/* Nominal list (real) */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Lista Nominal de Gestantes</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden lg:table-cell">UBS</TableHead>
                    <TableHead>Raça/Cor</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead>IG</TableHead>
                    <TableHead>Risco</TableHead>
                    <TableHead className="hidden md:table-cell">Consultas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vg.map((g) => (
                    <TableRow key={g.id}>
                      <TableCell className="font-medium">
                        <Link href={`/gestante/${g.id}`} className="hover:underline text-primary">{displayName(g)}</Link>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{getUbsNome(g.ubsId)}</TableCell>
                      <TableCell className="text-sm">{getRacaLabel(g.racaCor)}</TableCell>
                      <TableCell className="text-sm">{getIdade(g.dataNascimento)}</TableCell>
                      <TableCell>{g.idadeGestacionalSemanas} sem</TableCell>
                      <TableCell><RiskBadge risco={g.riscoGestacional} /></TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-center">{ultimaConsultaMap[g.id]?.totalConsultas ?? 0}</TableCell>
                    </TableRow>
                  ))}
                  {vg.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhuma gestante encontrada para os filtros selecionados.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══════════ TAB 2: Programa Mãe Salvador (fully mock) ══════════ */}
        <TabsContent value="mae-salvador" className="space-y-6">
          <MockSection>
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={msDistrito} onValueChange={(v) => { setMsDistrito(v); setMsUnidade("todos"); setMsEquipe("todos"); }}>
                <SelectTrigger className="w-[170px] h-9 text-xs"><SelectValue placeholder="Distrito" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Distritos</SelectItem>
                  {DISTRITOS_SANITARIOS.map((d) => <SelectItem key={d.id} value={d.id}>{d.nome}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={msUnidade} onValueChange={(v) => { setMsUnidade(v); setMsEquipe("todos"); }}>
                <SelectTrigger className="w-[170px] h-9 text-xs"><SelectValue placeholder="Unidade" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Unidades</SelectItem>
                  {msUbsOpts.map((u) => <SelectItem key={u.id} value={u.id}>{u.nome}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={msEquipe} onValueChange={setMsEquipe}>
                <SelectTrigger className="w-[170px] h-9 text-xs"><SelectValue placeholder="Equipe" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Equipes</SelectItem>
                  {msEqOpts.map((e) => <SelectItem key={e.id} value={e.id}>{e.nome}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={msStatus} onValueChange={setMsStatus}>
                <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="Status Cartão" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="inconsistencia">Inconsistência</SelectItem>
                  <SelectItem value="recusado">Recusado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <KPICard title="Transcards Vinculados" value={String(ms.length)} subtitle="no filtro" icon={CreditCard} />
              <KPICard title="Ativos" value={String(msAtivos)} subtitle={`de ${ms.length}`} icon={ClipboardCheck} trend="up" />
              <KPICard title="Inconsistências" value={String(msInconsistencias)} subtitle="cartões" icon={AlertTriangle} />
              <KPICard title="Nova Vinc. < 180 dias" value={String(msVinc180)} subtitle="vinculações recentes" icon={Calendar} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              <KPICard title="Sem CPF" value={`${msSemCpf}%`} subtitle="dos vinculados" icon={Users} />
              <KPICard title="Recusaram Transcard" value={`${msRecusaTc}%`} subtitle="das gestantes" icon={CreditCard} />
              <KPICard title="Recusaram Kit Enxoval" value={`${msRecusaEnx}%`} subtitle="das gestantes" icon={Baby} />
              <KPICard title="Bolsa Família" value={String(msBolsaFam)} subtitle={`de ${ms.length}`} icon={Users} />
              <KPICard title="Encaminhadas CRAS" value={String(msCras)} subtitle="referenciadas" icon={Users} />
            </div>

            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Distribuição por Etapa</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={msEtapaCounts} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} fontSize={12}>
                        {msEtapaCounts.map((_, i) => <Cell key={i} fill={ETAPA_PIE_COLORS[i]} />)}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-sm">Resumo do Programa</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Indicator label="Pendentes" value={Math.round((ms.filter((t) => t.situacao === "pendente").length / msN) * 100)} target={0} />
                    <Indicator label="Recusas Transcard" value={msRecusaTc} target={0} />
                    <Indicator label="Recusas Kit Enxoval" value={msRecusaEnx} target={0} />
                    <Indicator label="Bolsa Família" value={Math.round((msBolsaFam / msN) * 100)} target={100} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nominal list */}
            <Card className="mt-4">
              <CardHeader className="pb-3"><CardTitle className="text-sm">Lista Nominal — Vinculações Transcard</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gestante</TableHead>
                      <TableHead className="hidden md:table-cell">CPF</TableHead>
                      <TableHead className="hidden md:table-cell">Distrito</TableHead>
                      <TableHead className="hidden lg:table-cell">Unidade</TableHead>
                      <TableHead className="hidden lg:table-cell">Equipe</TableHead>
                      <TableHead>Nº Transcard</TableHead>
                      <TableHead>Situação</TableHead>
                      <TableHead>Etapa</TableHead>
                      <TableHead className="hidden md:table-cell">Vinculação</TableHead>
                      <TableHead className="hidden lg:table-cell">CRAS (IG)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ms.map((tc) => {
                      const g = MOCK_GESTANTES.find((x) => x.id === tc.gestanteId);
                      return (
                        <TableRow key={tc.id}>
                          <TableCell className="font-medium">{getMockGestanteNome(tc.gestanteId)}</TableCell>
                          <TableCell className="hidden md:table-cell font-mono text-xs">{tc.cpf || "—"}</TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{g ? getDistritoNome(g.endereco.distritoSanitarioId) : "—"}</TableCell>
                          <TableCell className="hidden lg:table-cell text-sm">{g ? getMockUbsNome(g.ubsId) : "—"}</TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{g ? getEquipeNome(g.equipeId) : "—"}</TableCell>
                          <TableCell className="font-mono text-sm">{tc.numeroTranscard}</TableCell>
                          <TableCell>
                            <Badge variant={tc.situacao === "ativo" ? "default" : tc.situacao === "pendente" ? "secondary" : "destructive"} className="text-xs">
                              {tc.situacao === "inconsistencia" ? "Inconsistente" : tc.situacao.charAt(0).toUpperCase() + tc.situacao.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{tc.etapaAtual}/3</TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{fmt(tc.dataVinculacao)}</TableCell>
                          <TableCell className="hidden lg:table-cell text-sm">
                            {tc.encaminhadaCras
                              ? <span>{g && tc.dataEncaminhamentoCras ? `Sim (${getIgAtDate(g.dum, tc.dataEncaminhamentoCras)} sem)` : "Sim"}</span>
                              : "—"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {ms.length === 0 && (
                      <TableRow><TableCell colSpan={10} className="text-center py-8 text-muted-foreground">Nenhuma vinculação encontrada para os filtros selecionados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </MockSection>
        </TabsContent>

        {/* ══════════ TAB 3: Indicadores MS ══════════ */}
        <TabsContent value="indicadores" className="space-y-6">
          {/* Current snapshot (real) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {indValues.map((iv) => <Indicator key={iv.label} label={iv.label} value={iv.value} target={iv.target} />)}
          </div>

          {/* Historical evolution chart (mock-tagged) */}
          <MockSection>
            <div className="flex flex-wrap gap-3 mb-4">
              <Select value={quadrimestre} onValueChange={setQuadrimestre}>
                <SelectTrigger className="w-52 h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {QUADRIMESTRES.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Evolução dos Indicadores por Quadrimestre</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={QUADRIMESTRES.map((q) => {
                    const row: Record<string, string | number> = { quadrimestre: q };
                    MOCK_INDICADORES_PREVINE.slice(0, 4).forEach((ip) => {
                      row[ip.nome.slice(0, 25)] = ip.valores.find((v) => v.quadrimestre === q)?.valor ?? 0;
                    });
                    return row;
                  })}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 250)" />
                    <XAxis dataKey="quadrimestre" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" />
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "11px" }} />
                    {MOCK_INDICADORES_PREVINE.slice(0, 4).map((ip, i) => (
                      <Bar key={ip.id} dataKey={ip.nome.slice(0, 25)} fill={CHART_COLORS[i]} radius={[3, 3, 0, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detail table */}
            <Card className="mt-4">
              <CardHeader className="pb-3"><CardTitle className="text-sm">Detalhamento — {quadrimestre}</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Indicador</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Meta</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_INDICADORES_PREVINE.map((ip, idx) => {
                      const val = ip.valores.find((v) => v.quadrimestre === quadrimestre)?.valor ?? 0;
                      const met = val >= ip.meta;
                      return (
                        <TableRow key={ip.id}>
                          <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                          <TableCell className="font-medium text-sm">{ip.nome}</TableCell>
                          <TableCell className="text-right">
                            <span className={met ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>{val}%</span>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">{ip.meta}%</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={met ? "default" : "secondary"} className="text-xs">{met ? "Atingida" : "Abaixo"}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </MockSection>

          {/* Nominal list (real — simplified) */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Lista Nominal — Indicadores por Gestante</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden lg:table-cell">UBS</TableHead>
                    <TableHead>IG</TableHead>
                    <TableHead>Cons. PN</TableHead>
                    <TableHead className="hidden md:table-cell">Risco</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gestantes.filter((g) => g.ativa).slice(0, 200).map((g) => (
                    <TableRow key={g.id}>
                      <TableCell className="font-medium">
                        <Link href={`/gestante/${g.id}`} className="hover:underline text-primary">{displayName(g)}</Link>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{getUbsNome(g.ubsId)}</TableCell>
                      <TableCell className="text-sm">{g.idadeGestacionalSemanas} sem</TableCell>
                      <TableCell className="text-sm text-center">{ultimaConsultaMap[g.id]?.totalConsultas ?? 0}</TableCell>
                      <TableCell className="hidden md:table-cell"><RiskBadge risco={g.riscoGestacional} /></TableCell>
                    </TableRow>
                  ))}
                  {gestantes.filter((g) => g.ativa).length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhuma gestante encontrada.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══════════ TAB 4: Sífilis na Gestação ══════════ */}
        <TabsContent value="sifilis" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={sifUnidade} onValueChange={setSifUnidade}>
              <SelectTrigger className="w-[170px] h-9 text-xs"><SelectValue placeholder="Unidade" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Unidades</SelectItem>
                {ubsList.map((u) => <SelectItem key={u.cnes} value={u.cnes}>{u.nome}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sifTrimestre} onValueChange={setSifTrimestre}>
              <SelectTrigger className="w-[140px] h-9 text-xs"><SelectValue placeholder="Trimestre" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="1">1° Trimestre</SelectItem>
                <SelectItem value="2">2° Trimestre</SelectItem>
                <SelectItem value="3">3° Trimestre</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sifRaca} onValueChange={setSifRaca}>
              <SelectTrigger className="w-[130px] h-9 text-xs"><SelectValue placeholder="Raça/Cor" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                {RACAS_CORES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-4">
            <KPICard title="Casos Detectados" value={String(sif.length)} subtitle="no filtro" icon={ShieldAlert} />
            <KPICard title="Detecção 1º Tri" value={`${sif.filter((c) => c.idadeGestacionalDeteccao <= 12).length}`} subtitle="≤12 semanas" icon={Calendar} />
            <KPICard title="Tratamento Concluído" value="—" subtitle="dados indisponíveis no DW" icon={ClipboardCheck} mock />
          </div>

          {/* Classification pie (real) + Treatment pie (mock) */}
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Classificação dos Casos</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                {sifClassPie.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={sifClassPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} fontSize={12}>
                        {sifClassPie.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-muted-foreground py-12">Nenhum caso no filtro.</p>
                )}
              </CardContent>
            </Card>
            <MockSection>
              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-sm">Indicadores de Tratamento</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Indicator label="Tratamento iniciado" value={85} target={100} />
                    <Indicator label="Tratamento concluído" value={71} target={100} />
                    <Indicator label="Parceiro tratado" value={57} target={100} />
                    <Indicator label="Detecção precoce" value={Math.round((sif.filter((c) => c.idadeGestacionalDeteccao <= 12).length / Math.max(sif.length, 1)) * 100)} target={80} />
                  </div>
                </CardContent>
              </Card>
            </MockSection>
          </div>

          {/* Top UBS (real) */}
          {sifTopUbs.length > 0 && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Top Unidades — Mais Casos</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sifTopUbs.map((u, i) => (
                    <div key={u.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}°</span>
                        <span className="text-sm">{u.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{u.count} caso{u.count > 1 ? "s" : ""}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Nominal list (real) */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Lista Nominal — Casos de Sífilis</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gestante</TableHead>
                    <TableHead className="hidden md:table-cell">CPF</TableHead>
                    <TableHead className="hidden lg:table-cell">UBS</TableHead>
                    <TableHead>Classificação</TableHead>
                    <TableHead>IG Det.</TableHead>
                    <TableHead className="hidden md:table-cell">Detecção</TableHead>
                    <TableHead>Raça/Cor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sif.map((c) => {
                    const g = gestanteMap.get(c.gestanteId);
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">
                          <Link href={`/gestante/${c.gestanteId}`} className="hover:underline text-primary">{g ? displayName(g) : c.gestanteId}</Link>
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs">{g?.cpf ?? "—"}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">{g ? getUbsNome(g.ubsId) : "—"}</TableCell>
                        <TableCell>
                          <Badge variant={c.classificacao === "recente" ? "default" : "secondary"} className="text-xs capitalize">{c.classificacao}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{c.idadeGestacionalDeteccao} sem</TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{fmt(c.dataDeteccao)}</TableCell>
                        <TableCell className="text-sm">{g ? getRacaLabel(g.racaCor) : "—"}</TableCell>
                      </TableRow>
                    );
                  })}
                  {sif.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhum caso encontrado para os filtros selecionados.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
