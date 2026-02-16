"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/risk-badge";
import { Search, ChevronRight } from "lucide-react";
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

export default function PainelClient({ gestantes, ubsList, ultimaConsultaMap }: PainelClientProps) {
  const [search, setSearch] = useState("");
  const [riscoFilter, setRiscoFilter] = useState<string>("todos");

  const filtered = useMemo(() => {
    return gestantes.filter((g) => {
      const matchSearch =
        search === "" ||
        g.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
        g.cpf.includes(search);
      const matchRisco = riscoFilter === "todos" || g.riscoGestacional === riscoFilter;
      return matchSearch && matchRisco;
    });
  }, [gestantes, search, riscoFilter]);

  function getUbsNome(ubsId: string) {
    return ubsList.find((u) => u.id === ubsId || u.cnes === ubsId)?.nome ?? ubsId;
  }

  function displayName(g: Gestante) {
    return g.nomeCompleto || `Cidadão #${g.id}`;
  }

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
            placeholder="Buscar por nome ou CPF..."
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
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">CPF</TableHead>
                <TableHead>IG (sem)</TableHead>
                <TableHead className="hidden sm:table-cell">DPP</TableHead>
                <TableHead>Risco</TableHead>
                <TableHead className="hidden lg:table-cell">UBS</TableHead>
                <TableHead className="hidden md:table-cell">Situação</TableHead>
                <TableHead className="hidden md:table-cell">Última consulta</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((g) => {
                const info = ultimaConsultaMap[g.id];
                return (
                  <TableRow key={g.id} className="group">
                    <TableCell>
                      <Link href={`/gestante/${g.id}`} className="font-medium hover:text-primary transition-colors">
                        {displayName(g)}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm font-mono">
                      {g.cpf || "—"}
                    </TableCell>
                    <TableCell className="font-semibold">{g.idadeGestacionalSemanas}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {g.dpp ? formatDate(g.dpp) : "—"}
                    </TableCell>
                    <TableCell>
                      <RiskBadge risco={g.riscoGestacional} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {getUbsNome(g.ubsId)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className={`text-xs ${g.ativa ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}
                      >
                        {g.ativa ? "Ativa" : "Concluída"}
                      </Badge>
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
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
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
