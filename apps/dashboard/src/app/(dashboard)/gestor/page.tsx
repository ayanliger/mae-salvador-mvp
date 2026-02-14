"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Syringe, ClipboardCheck, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from "recharts";
import { MOCK_KPIS, MOCK_DADOS_UBS, MOCK_TENDENCIA_MENSAL, DISTRITOS_SANITARIOS } from "@mae-salvador/shared";

const CHART_COLORS = [
  "oklch(0.55 0.11 185)", // teal
  "oklch(0.67 0.14 30)",  // coral
  "oklch(0.76 0.14 80)",  // amber
  "oklch(0.68 0.11 148)", // sage
  "oklch(0.54 0.07 325)", // mauve
];

const RISK_PIE_DATA = [
  { name: "Habitual", value: MOCK_KPIS.distribuicaoRisco.habitual, fill: "oklch(0.65 0.12 155)" },
  { name: "Alto", value: MOCK_KPIS.distribuicaoRisco.alto, fill: "oklch(0.76 0.14 80)" },
  { name: "Muito Alto", value: MOCK_KPIS.distribuicaoRisco.muitoAlto, fill: "oklch(0.60 0.18 25)" },
];

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

function getDistritoNome(id: string) {
  return DISTRITOS_SANITARIOS.find((d) => d.id === id)?.nome ?? id;
}

export default function GestorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Visão Geral</h1>
        <p className="text-sm text-muted-foreground mt-1">Indicadores do pré-natal — Salvador</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Gestantes Ativas" value={MOCK_KPIS.gestantesAtivas.toLocaleString("pt-BR")} subtitle="cadastradas" icon={Users} />
        <KPICard title="Consultas / Mês" value={MOCK_KPIS.consultasRealizadasMes.toLocaleString("pt-BR")} subtitle="realizadas em fev" icon={Calendar} trend="up" />
        <KPICard title="Início Precoce" value={`${MOCK_KPIS.inicioPrecoce}%`} subtitle="≤12 semanas" icon={ClipboardCheck} trend="up" />
        <KPICard title="dTpa Cobertura" value={`${MOCK_KPIS.coberturaVacinalDtpa}%`} subtitle="vacinadas" icon={Syringe} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Monthly trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Consultas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={MOCK_TENDENCIA_MENSAL}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 85)" />
                <XAxis dataKey="mes" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="consultas" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} name="Consultas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk distribution pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Distribuição de Risco</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={RISK_PIE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name} ${value}%`} fontSize={11}>
                  {RISK_PIE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Previne Brasil Indicators */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Indicadores Previne Brasil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Indicator label="Início precoce (≤12 sem)" value={MOCK_KPIS.inicioPrecoce} target={80} />
            <Indicator label="7+ consultas" value={MOCK_KPIS.seteMaisConsultas} target={70} />
            <Indicator label="Cobertura dTpa" value={MOCK_KPIS.coberturaVacinalDtpa} target={85} />
            <Indicator label="Exames 1º trimestre" value={MOCK_KPIS.examesPrimeiroTrimestre} target={80} />
          </div>
        </CardContent>
      </Card>

      {/* Trend line chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Evolução do Início Precoce</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MOCK_TENDENCIA_MENSAL}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 85)" />
              <XAxis dataKey="mes" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[60, 80]} unit="%" />
              <RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              <Line type="monotone" dataKey="inicioPrecoce" stroke={CHART_COLORS[0]} strokeWidth={2.5} dot={{ r: 4 }} name="Início precoce %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* UBS performance table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Desempenho por UBS</CardTitle>
        </CardHeader>
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
                    <span className={ubs.inicioPrecoce >= 75 ? "text-emerald-700" : ubs.inicioPrecoce >= 65 ? "text-amber-700" : "text-red-700"}>
                      {ubs.inicioPrecoce}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={ubs.coberturaVacinal >= 80 ? "text-emerald-700" : ubs.coberturaVacinal >= 70 ? "text-amber-700" : "text-red-700"}>
                      {ubs.coberturaVacinal}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
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
