"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RiskBadge } from "@/components/risk-badge";
import { Search, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { Gestante, UBS } from "@mae-salvador/shared";
import type { UltimaConsultaMap } from "@/lib/esus-data";

interface PainelClientProps {
  gestantes: Gestante[];
  ubsList: UBS[];
  ultimaConsultaMap: UltimaConsultaMap;
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR");
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

type SortKey = "nome" | "idade" | "ig" | "dpp" | "risco" | "ubs" | "ultimaConsulta";
type SortDir = "asc" | "desc";

const RISCO_ORDER: Record<string, number> = { alto: 0, habitual: 1 };

function SortableHead({ label, sortKey, current, dir, onSort, className }: {
  label: string; sortKey: SortKey; current: SortKey | null; dir: SortDir; onSort: (k: SortKey) => void; className?: string;
}) {
  const active = current === sortKey;
  return (
    <TableHead className={className}>
      <button type="button" onClick={() => onSort(sortKey)} className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
        {label}
        {active ? (dir === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 opacity-40" />}
      </button>
    </TableHead>
  );
}

export default function PainelClient({ gestantes, ubsList, ultimaConsultaMap }: PainelClientProps) {
  const [search, setSearch] = useState("");
  const [riscoFilter, setRiscoFilter] = useState<string>("todos");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    return gestantes.filter((g) => {
      const matchSearch =
        search === "" ||
        g.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
        g.cpf.includes(search) ||
        (g.cns?.includes(search) ?? false);
      const matchRisco = riscoFilter === "todos" || g.riscoGestacional === riscoFilter;
      return matchSearch && matchRisco;
    });
  }, [gestantes, search, riscoFilter]);

  function getUbsNome(ubsId: string) {
    return ubsList.find((u) => u.id === ubsId || u.cnes === ubsId)?.nome ?? ubsId;
  }

  function displayName(g: Gestante) {
    const n = g.nomeCompleto;
    if (!n || /^[0-9a-fA-F]{20,}$/.test(n)) return "";
    return n;
  }

  /** Compare with empties always last, regardless of sort direction. */
  function emptyLast(va: string | number | null | undefined, vb: string | number | null | undefined, cmp: (a: NonNullable<typeof va>, b: NonNullable<typeof vb>) => number, m: number): number {
    const ea = va == null || va === "" || va === 0;
    const eb = vb == null || vb === "" || vb === 0;
    if (ea && eb) return 0;
    if (ea) return 1;
    if (eb) return -1;
    return m * cmp(va!, vb!);
  }

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const m = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "nome":
          return emptyLast(displayName(a), displayName(b), (x, y) => String(x).localeCompare(String(y), "pt-BR"), m);
        case "idade":
          return emptyLast(a.dataNascimento ? getIdade(a.dataNascimento) : null, b.dataNascimento ? getIdade(b.dataNascimento) : null, (x, y) => Number(x) - Number(y), m);
        case "ig":
          return emptyLast(a.ativa ? a.idadeGestacionalSemanas : null, b.ativa ? b.idadeGestacionalSemanas : null, (x, y) => Number(x) - Number(y), m);
        case "dpp":
          return emptyLast(a.dpp || null, b.dpp || null, (x, y) => String(x).localeCompare(String(y)), m);
        case "risco":
          return emptyLast(RISCO_ORDER[a.riscoGestacional] ?? null, RISCO_ORDER[b.riscoGestacional] ?? null, (x, y) => Number(x) - Number(y), m);
        case "ubs":
          return emptyLast(getUbsNome(a.ubsId) || null, getUbsNome(b.ubsId) || null, (x, y) => String(x).localeCompare(String(y), "pt-BR"), m);
        case "ultimaConsulta":
          return emptyLast(ultimaConsultaMap[a.id]?.ultimaConsulta || null, ultimaConsultaMap[b.id]?.ultimaConsulta || null, (x, y) => String(x).localeCompare(String(y)), m);
        default: return 0;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, sortKey, sortDir, ultimaConsultaMap]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Painel de Gestantes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {filtered.length} gestante{filtered.length !== 1 ? "s" : ""} no filtro
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CPF ou CNS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={riscoFilter} onValueChange={setRiscoFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Risco" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os riscos</SelectItem>
            <SelectItem value="habitual">Risco Habitual</SelectItem>
            <SelectItem value="alto">Alto Risco</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHead label="Nome" sortKey="nome" current={sortKey} dir={sortDir} onSort={handleSort} />
                <TableHead className="hidden md:table-cell">CPF</TableHead>
                <TableHead className="hidden md:table-cell">CNS</TableHead>
                <SortableHead label="Idade" sortKey="idade" current={sortKey} dir={sortDir} onSort={handleSort} className="hidden md:table-cell" />
                <SortableHead label="IG (sem)" sortKey="ig" current={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableHead label="DPP" sortKey="dpp" current={sortKey} dir={sortDir} onSort={handleSort} className="hidden sm:table-cell" />
                <SortableHead label="Risco" sortKey="risco" current={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableHead label="UBS" sortKey="ubs" current={sortKey} dir={sortDir} onSort={handleSort} className="hidden lg:table-cell" />
                <SortableHead label="Última consulta" sortKey="ultimaConsulta" current={sortKey} dir={sortDir} onSort={handleSort} className="hidden md:table-cell" />
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((g) => {
                const info = ultimaConsultaMap[g.id];
                return (
                  <TableRow key={g.id} className="group">
                    <TableCell>
                      <Link href={`/gestante/${g.id}`} className="font-medium hover:text-primary transition-colors">
                        {displayName(g) || <span className="text-muted-foreground font-normal">—</span>}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm font-mono">
                      {g.cpf || "—"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm font-mono">
                      {g.cns || "—"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {g.dataNascimento ? getIdade(g.dataNascimento) : "—"}
                    </TableCell>
                    <TableCell className="font-semibold">{g.ativa ? g.idadeGestacionalSemanas : "—"}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {g.dpp ? formatDate(g.dpp) : "—"}
                    </TableCell>
                    <TableCell>
                      <RiskBadge risco={g.riscoGestacional} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {getUbsNome(g.ubsId)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {info ? formatDate(info.ultimaConsulta) : "—"}
                    </TableCell>
                    <TableCell>
                      <Link href={`/gestante/${g.id}`}>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    Nenhuma gestante encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
