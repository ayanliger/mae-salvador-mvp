"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RiskBadge } from "@/components/risk-badge";
import {
  Users, Calendar, Syringe, ClipboardCheck, TrendingUp, TrendingDown,
  CreditCard, BarChart3, ShieldAlert, Eye,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts";
import {
  MOCK_KPIS, MOCK_DADOS_UBS, MOCK_TENDENCIA_MENSAL, DISTRITOS_SANITARIOS,
  MOCK_GESTANTES, MOCK_TRANSCARD, MOCK_CASOS_SIFILIS, MOCK_INDICADORES_PREVINE,
  UBS_LIST,
} from "@mae-salvador/shared";

const CHART_COLORS = [
  "oklch(0.50 0.16 255)", // blue (primary)
  "oklch(0.67 0.14 30)",  // coral
  "oklch(0.76 0.14 80)",  // amber
  "oklch(0.62 0.12 200)", // sky
  "oklch(0.54 0.07 325)", // mauve
];

const RISK_PIE_DATA = [
  { name: "Risco Habitual", value: MOCK_KPIS.distribuicaoRisco.habitual, fill: "oklch(0.58 0.14 255)" },
  { name: "Alto Risco", value: MOCK_KPIS.distribuicaoRisco.alto, fill: "oklch(0.60 0.18 25)" },
];

/* ── Helpers ─────────────────────────────────────── */

function fmt(iso: string) { return new Date(iso).toLocaleDateString("pt-BR"); }

function getDistritoNome(id: string) {
  return DISTRITOS_SANITARIOS.find((d) => d.id === id)?.nome ?? id;
}

function getUbsNome(id: string) {
  return UBS_LIST.find((u) => u.id === id)?.nome ?? id;
}

function getGestanteNome(id: string) {
  return MOCK_GESTANTES.find((g) => g.id === id)?.nomeCompleto ?? id;
}

function KPICard({ title, value, subtitle, icon: Icon, trend }: {
  title: string; value: string; subtitle: string; icon: React.ElementType; trend?: "up" | "down";
}) {
  return (
    <Card>
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{title}</p>
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

/* ── Computed data ───────────────────────────────── */

// Programa Mãe Salvador
const transcardAtivos = MOCK_TRANSCARD.filter((t) => t.situacao === "ativo").length;
const transcardPendentes = MOCK_TRANSCARD.filter((t) => t.situacao === "pendente").length;
const transcardRecusas = MOCK_TRANSCARD.filter((t) => t.recusouTranscard).length;
const etapaCounts = [1, 2, 3].map((e) => ({
  name: `Etapa ${e}`,
  value: MOCK_TRANSCARD.filter((t) => t.etapaAtual === e).length,
}));
const ETAPA_PIE_COLORS = [CHART_COLORS[0], CHART_COLORS[3], CHART_COLORS[1]];

const gestantesBolsaFamilia = MOCK_GESTANTES.filter((g) => g.bolsaFamilia).length;
const pctBolsaFamilia = Math.round((gestantesBolsaFamilia / MOCK_GESTANTES.length) * 100);
const encaminhadasCras = MOCK_TRANSCARD.filter((t) => t.encaminhadaCras).length;
const recusaramEnxoval = MOCK_TRANSCARD.filter((t) => t.recusouKitEnxoval).length;

// Sífilis
const sifilisRecente = MOCK_CASOS_SIFILIS.filter((c) => c.classificacao === "recente").length;
const sifilisTardia = MOCK_CASOS_SIFILIS.filter((c) => c.classificacao === "tardia").length;
const sifilisIndet = MOCK_CASOS_SIFILIS.filter((c) => c.classificacao === "indeterminada").length;
const tratConcluido = MOCK_CASOS_SIFILIS.filter((c) => c.tratamentoConcluido).length;
const parceiroTratado = MOCK_CASOS_SIFILIS.filter((c) => c.parceiroTratado).length;
const SIFILIS_PIE = [
  { name: "Recente", value: sifilisRecente, fill: CHART_COLORS[0] },
  { name: "Tardia", value: sifilisTardia, fill: CHART_COLORS[1] },
  ...(sifilisIndet > 0 ? [{ name: "Indeterminada", value: sifilisIndet, fill: CHART_COLORS[2] }] : []),
];

// Quadrimestres list
const QUADRIMESTRES = MOCK_INDICADORES_PREVINE[0].valores.map((v) => v.quadrimestre);

/* ── Page ────────────────────────────────────────── */

export default function GestorPage() {
  const [quadrimestre, setQuadrimestre] = useState(QUADRIMESTRES[QUADRIMESTRES.length - 1]);

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
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Gestantes Ativas" value={MOCK_KPIS.gestantesAtivas.toLocaleString("pt-BR")} subtitle="cadastradas" icon={Users} />
            <KPICard title="Consultas / Mês" value={MOCK_KPIS.consultasRealizadasMes.toLocaleString("pt-BR")} subtitle="realizadas em fev" icon={Calendar} trend="up" />
            <KPICard title="Início Precoce" value={`${MOCK_KPIS.inicioPrecoce}%`} subtitle="≤12 semanas" icon={ClipboardCheck} trend="up" />
            <KPICard title="dTpa Cobertura" value={`${MOCK_KPIS.coberturaVacinalDtpa}%`} subtitle="vacinadas" icon={Syringe} />
          </div>

          {/* Charts row */}
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
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
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Distribuição de Risco</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={RISK_PIE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name} ${value}%`} fontSize={11}>
                      {RISK_PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Previne Brasil summary */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Indicadores Previne Brasil</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Indicator label="Início precoce (≤12 sem)" value={MOCK_KPIS.inicioPrecoce} target={80} />
                <Indicator label="7+ consultas" value={MOCK_KPIS.seteMaisConsultas} target={70} />
                <Indicator label="Cobertura dTpa" value={MOCK_KPIS.coberturaVacinalDtpa} target={85} />
                <Indicator label="Exames 1º trimestre" value={MOCK_KPIS.examesPrimeiroTrimestre} target={80} />
              </div>
            </CardContent>
          </Card>

          {/* Trend line */}
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

          {/* UBS table */}
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

          {/* Nominal list */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Lista Nominal de Gestantes</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>IG</TableHead>
                    <TableHead>Risco</TableHead>
                    <TableHead>UBS</TableHead>
                    <TableHead>Distrito</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_GESTANTES.filter((g) => g.ativa).map((g) => (
                    <TableRow key={g.id}>
                      <TableCell className="font-medium">
                        <Link href={`/gestante/${g.id}`} className="hover:underline text-primary">{g.nomeCompleto}</Link>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{g.cpf}</TableCell>
                      <TableCell>{g.idadeGestacionalSemanas} sem</TableCell>
                      <TableCell><RiskBadge risco={g.riscoGestacional} /></TableCell>
                      <TableCell className="text-sm">{getUbsNome(g.ubsId)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{getDistritoNome(g.endereco.distritoSanitarioId)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══════════ TAB 2: Programa Mãe Salvador ══════════ */}
        <TabsContent value="mae-salvador" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Transcards Vinculados" value={String(MOCK_TRANSCARD.length)} subtitle="total" icon={CreditCard} />
            <KPICard title="Ativos" value={String(transcardAtivos)} subtitle={`de ${MOCK_TRANSCARD.length}`} icon={ClipboardCheck} trend="up" />
            <KPICard title="Bolsa Família" value={`${pctBolsaFamilia}%`} subtitle={`${gestantesBolsaFamilia} gestantes`} icon={Users} />
            <KPICard title="Encaminhadas CRAS" value={String(encaminhadasCras)} subtitle="referenciadas" icon={Users} />
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {/* Etapa distribution */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Distribuição por Etapa</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={etapaCounts} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} fontSize={12}>
                      {etapaCounts.map((_, i) => <Cell key={i} fill={ETAPA_PIE_COLORS[i]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Summary stats */}
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Resumo do Programa</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Indicator label="Pendentes" value={Math.round((transcardPendentes / Math.max(MOCK_TRANSCARD.length, 1)) * 100)} target={0} />
                  <Indicator label="Recusas Transcard" value={Math.round((transcardRecusas / Math.max(MOCK_TRANSCARD.length, 1)) * 100)} target={0} />
                  <Indicator label="Recusas Kit Enxoval" value={Math.round((recusaramEnxoval / Math.max(MOCK_TRANSCARD.length, 1)) * 100)} target={0} />
                  <Indicator label="Bolsa Família" value={pctBolsaFamilia} target={100} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nominal list */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Lista Nominal — Vinculações Transcard</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gestante</TableHead>
                    <TableHead>Nº Transcard</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead>Etapa</TableHead>
                    <TableHead>LGPD</TableHead>
                    <TableHead>Vinculação</TableHead>
                    <TableHead>CRAS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_TRANSCARD.map((tc) => (
                    <TableRow key={tc.id}>
                      <TableCell className="font-medium">
                        <Link href={`/gestante/${tc.gestanteId}`} className="hover:underline text-primary">{getGestanteNome(tc.gestanteId)}</Link>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{tc.numeroTranscard}</TableCell>
                      <TableCell>
                        <Badge variant={tc.situacao === "ativo" ? "default" : tc.situacao === "pendente" ? "secondary" : "destructive"} className="text-xs">
                          {tc.situacao.charAt(0).toUpperCase() + tc.situacao.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{tc.etapaAtual}/3</TableCell>
                      <TableCell className="text-xs">
                        {tc.lgpdConsentimento === "pendente" ? <span className="text-amber-700">Pendente</span> : <span className="text-emerald-700">Assinado</span>}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{fmt(tc.dataVinculacao)}</TableCell>
                      <TableCell>{tc.encaminhadaCras ? <Badge variant="outline" className="text-xs">Sim</Badge> : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══════════ TAB 3: Indicadores MS ══════════ */}
        <TabsContent value="indicadores" className="space-y-6">
          {/* Quadrimestre filter */}
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium">Quadrimestre:</p>
            <Select value={quadrimestre} onValueChange={setQuadrimestre}>
              <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
              <SelectContent>
                {QUADRIMESTRES.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Indicators grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOCK_INDICADORES_PREVINE.map((ind) => {
              const val = ind.valores.find((v) => v.quadrimestre === quadrimestre)?.valor ?? 0;
              return <Indicator key={ind.id} label={ind.nome} value={val} target={ind.meta} />;
            })}
          </div>

          {/* Evolution chart */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Evolução dos Indicadores por Quadrimestre</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={QUADRIMESTRES.map((q) => {
                  const row: Record<string, string | number> = { quadrimestre: q };
                  MOCK_INDICADORES_PREVINE.slice(0, 4).forEach((ind) => {
                    row[ind.nome.slice(0, 25)] = ind.valores.find((v) => v.quadrimestre === q)?.valor ?? 0;
                  });
                  return row;
                })}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 250)" />
                  <XAxis dataKey="quadrimestre" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" />
                  <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "11px" }} />
                  {MOCK_INDICADORES_PREVINE.slice(0, 4).map((ind, i) => (
                    <Bar key={ind.id} dataKey={ind.nome.slice(0, 25)} fill={CHART_COLORS[i]} radius={[3, 3, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Full indicator table */}
          <Card>
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
                  {MOCK_INDICADORES_PREVINE.map((ind, idx) => {
                    const val = ind.valores.find((v) => v.quadrimestre === quadrimestre)?.valor ?? 0;
                    const met = val >= ind.meta;
                    return (
                      <TableRow key={ind.id}>
                        <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                        <TableCell className="font-medium text-sm">{ind.nome}</TableCell>
                        <TableCell className="text-right">
                          <span className={met ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>{val}%</span>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{ind.meta}%</TableCell>
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
        </TabsContent>

        {/* ══════════ TAB 4: Sífilis na Gestação ══════════ */}
        <TabsContent value="sifilis" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Casos Detectados" value={String(MOCK_CASOS_SIFILIS.length)} subtitle="gestantes" icon={ShieldAlert} />
            <KPICard title="Tratamento Concluído" value={`${Math.round((tratConcluido / Math.max(MOCK_CASOS_SIFILIS.length, 1)) * 100)}%`} subtitle={`${tratConcluido} de ${MOCK_CASOS_SIFILIS.length}`} icon={ClipboardCheck} trend={tratConcluido === MOCK_CASOS_SIFILIS.length ? "up" : "down"} />
            <KPICard title="Parceiro Tratado" value={`${Math.round((parceiroTratado / Math.max(MOCK_CASOS_SIFILIS.length, 1)) * 100)}%`} subtitle={`${parceiroTratado} de ${MOCK_CASOS_SIFILIS.length}`} icon={Users} />
            <KPICard title="Detecção 1º Tri" value={`${MOCK_CASOS_SIFILIS.filter((c) => c.idadeGestacionalDeteccao <= 12).length}`} subtitle={"≤12 semanas"} icon={Calendar} />
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {/* Classification pie */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Classificação dos Casos</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={SIFILIS_PIE} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} fontSize={12}>
                      {SIFILIS_PIE.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Treatment stats */}
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Indicadores de Tratamento</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Indicator label="Tratamento iniciado" value={Math.round((MOCK_CASOS_SIFILIS.filter((c) => c.tratamentoIniciado).length / Math.max(MOCK_CASOS_SIFILIS.length, 1)) * 100)} target={100} />
                  <Indicator label="Tratamento concluído" value={Math.round((tratConcluido / Math.max(MOCK_CASOS_SIFILIS.length, 1)) * 100)} target={100} />
                  <Indicator label="Parceiro tratado" value={Math.round((parceiroTratado / Math.max(MOCK_CASOS_SIFILIS.length, 1)) * 100)} target={100} />
                  <Indicator label="Detecção precoce" value={Math.round((MOCK_CASOS_SIFILIS.filter((c) => c.idadeGestacionalDeteccao <= 12).length / Math.max(MOCK_CASOS_SIFILIS.length, 1)) * 100)} target={80} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nominal list */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Lista Nominal — Casos de Sífilis</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gestante</TableHead>
                    <TableHead>Classificação</TableHead>
                    <TableHead>IG Detecção</TableHead>
                    <TableHead>Detecção</TableHead>
                    <TableHead>Tratamento</TableHead>
                    <TableHead>Parceiro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_CASOS_SIFILIS.map((c) => {
                    const g = MOCK_GESTANTES.find((g) => g.id === c.gestanteId);
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">
                          <Link href={`/gestante/${c.gestanteId}`} className="hover:underline text-primary">{g?.nomeCompleto ?? c.gestanteId}</Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant={c.classificacao === "recente" ? "default" : "secondary"} className="text-xs capitalize">{c.classificacao}</Badge>
                        </TableCell>
                        <TableCell>{c.idadeGestacionalDeteccao} sem</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{fmt(c.dataDeteccao)}</TableCell>
                        <TableCell>
                          {c.tratamentoConcluido
                            ? <Badge className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200">Concluído</Badge>
                            : c.tratamentoIniciado
                              ? <Badge variant="secondary" className="text-xs">Em curso</Badge>
                              : <Badge variant="destructive" className="text-xs">Não iniciado</Badge>}
                        </TableCell>
                        <TableCell>
                          {c.parceiroTratado
                            ? <span className="text-emerald-700 text-sm">Sim</span>
                            : <span className="text-red-600 text-sm">Não</span>}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
