"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import { ArrowLeft, ClipboardPlus, Calendar, Droplets, Syringe, Pill, User, CreditCard } from "lucide-react";
import { TranscardTab } from "@/components/transcard-tab";
import { MOCK_GESTANTES, MOCK_CONSULTAS, MOCK_EXAMES, MOCK_VACINAS, MOCK_MEDICACOES, MOCK_PROFISSIONAIS, MOCK_TRANSCARD, UBS_LIST } from "@mae-salvador/shared";

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function getProfNome(id: string) {
  return MOCK_PROFISSIONAIS.find((p) => p.id === id)?.nomeCompleto ?? id;
}

function getUbsNome(id: string) {
  return UBS_LIST.find((u) => u.id === id)?.nome ?? id;
}

export default function GestanteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const g = MOCK_GESTANTES.find((g) => g.id === id);

  if (!g) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Gestante não encontrada.</p>
      </div>
    );
  }

  const consultas = MOCK_CONSULTAS.filter((c) => c.gestanteId === id).sort((a, b) => b.data.localeCompare(a.data));
  const exames = MOCK_EXAMES.filter((e) => e.gestanteId === id).sort((a, b) => b.dataSolicitacao.localeCompare(a.dataSolicitacao));
  const vacinas = MOCK_VACINAS.filter((v) => v.gestanteId === id);
  const medicacoes = MOCK_MEDICACOES.filter((m) => m.gestanteId === id);
  const transcard = MOCK_TRANSCARD.find((t) => t.gestanteId === id);

  const consultasRealizadas = consultas.filter((c) => c.status === "realizada").length;
  const testesRapidosFeitos = exames.some((e) => e.nome.toLowerCase().includes("sífilis") && e.status === "resultado-disponivel")
    && exames.some((e) => e.nome.toLowerCase().includes("hiv") && e.status === "resultado-disponivel");
  const vacinasAtualizadas = vacinas.filter((v) => v.status === "aplicada").length >= 2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link href="/painel" className="mt-1">
            <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{g.nomeCompleto}</h1>
              <RiskBadge risco={g.riscoGestacional} />
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              CPF {g.cpf} · {g.idadeGestacionalSemanas} semanas · DPP {fmt(g.dpp)}
            </p>
          </div>
        </div>
        <Link href={`/registrar?gestante=${id}`}>
          <Button size="sm">
            <ClipboardPlus className="w-4 h-4 mr-1.5" />
            Nova Consulta
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-xs text-muted-foreground">IG / DPP</p>
            <p className="text-lg font-bold">{g.idadeGestacionalSemanas} sem</p>
            <p className="text-xs text-muted-foreground">{fmt(g.dpp)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-xs text-muted-foreground">Consultas</p>
            <p className="text-lg font-bold">{consultas.filter((c) => c.status === "realizada").length}</p>
            <p className="text-xs text-muted-foreground">realizadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-xs text-muted-foreground">Vacinas</p>
            <p className="text-lg font-bold">{vacinas.filter((v) => v.status === "aplicada").length}/{vacinas.length}</p>
            <p className="text-xs text-muted-foreground">aplicadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-xs text-muted-foreground">UBS</p>
            <p className="text-sm font-semibold leading-tight">{getUbsNome(g.ubsId)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed content */}
      <Tabs defaultValue="consultas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dados"><User className="w-3.5 h-3.5 mr-1.5" />Dados</TabsTrigger>
          <TabsTrigger value="consultas"><Calendar className="w-3.5 h-3.5 mr-1.5" />Consultas</TabsTrigger>
          <TabsTrigger value="exames"><Droplets className="w-3.5 h-3.5 mr-1.5" />Exames</TabsTrigger>
          <TabsTrigger value="vacinas"><Syringe className="w-3.5 h-3.5 mr-1.5" />Vacinas</TabsTrigger>
          <TabsTrigger value="medicacoes"><Pill className="w-3.5 h-3.5 mr-1.5" />Medicações</TabsTrigger>
          <TabsTrigger value="transcard"><CreditCard className="w-3.5 h-3.5 mr-1.5" />Transcard</TabsTrigger>
        </TabsList>

        {/* Dados pessoais */}
        <TabsContent value="dados">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Dados Pessoais</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row label="Nome" value={g.nomeCompleto} />
                <Row label="Data de nascimento" value={fmt(g.dataNascimento)} />
                <Row label="CPF" value={g.cpf} />
                <Row label="CNS" value={g.cns ?? "—"} />
                <Row label="Telefone" value={g.telefone} />
                <Row label="Tipo sanguíneo" value={g.tipoSanguineo ?? "—"} />
                <Row label="Endereço" value={`${g.endereco.logradouro}, ${g.endereco.numero} — ${g.endereco.bairro}`} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Dados Obstétricos</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row label="Gestações" value={String(g.gestacoes)} />
                <Row label="Partos" value={String(g.partos)} />
                <Row label="Abortos" value={String(g.abortos)} />
                <Row label="DUM" value={fmt(g.dum)} />
                <Row label="DPP" value={fmt(g.dpp)} />
                <Row label="Maternidade de referência" value={g.maternidadeReferencia} />
                <Row label="Cartão Mãe Salvador" value={g.cartaoMaeSalvador ? "Sim" : "Não"} />
                {g.fatoresRisco.length > 0 && (
                  <div>
                    <p className="text-muted-foreground">Fatores de risco</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {g.fatoresRisco.map((f) => (
                        <Badge key={f} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">{f}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Consultas */}
        <TabsContent value="consultas">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>IG</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">PA</TableHead>
                    <TableHead className="hidden md:table-cell">Peso</TableHead>
                    <TableHead className="hidden lg:table-cell">BCF</TableHead>
                    <TableHead className="hidden lg:table-cell">Profissional</TableHead>
                    <TableHead className="hidden xl:table-cell">Conduta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultas.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{fmt(c.data)}</TableCell>
                      <TableCell>{c.idadeGestacionalSemanas} sem</TableCell>
                      <TableCell>
                        <Badge variant={c.status === "realizada" ? "default" : c.status === "agendada" ? "secondary" : "destructive"} className="text-xs">
                          {c.status === "realizada" ? "Realizada" : c.status === "agendada" ? "Agendada" : "Faltou"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {c.pressaoSistolica ? `${c.pressaoSistolica}/${c.pressaoDiastolica}` : "—"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {c.pesoKg ? `${c.pesoKg} kg` : "—"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {c.bcf ? `${c.bcf} bpm` : "—"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        {getProfNome(c.profissionalId)}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-muted-foreground max-w-xs truncate">
                        {c.conduta ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exames */}
        <TabsContent value="exames">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exame</TableHead>
                    <TableHead>Trimestre</TableHead>
                    <TableHead>Solicitação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Resultado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exames.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{e.nome}</TableCell>
                      <TableCell>{e.trimestre}º</TableCell>
                      <TableCell className="text-sm">{fmt(e.dataSolicitacao)}</TableCell>
                      <TableCell>
                        <Badge variant={e.status === "resultado-disponivel" ? "default" : "secondary"} className="text-xs">
                          {e.status === "resultado-disponivel" ? "Resultado" : e.status === "coletado" ? "Coletado" : "Solicitado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-sm truncate">
                        {e.resultado ?? "Aguardando"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vacinas */}
        <TabsContent value="vacinas">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vacina</TableHead>
                    <TableHead>Dose</TableHead>
                    <TableHead>Data prevista</TableHead>
                    <TableHead>Aplicação</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vacinas.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium">{v.nome}</TableCell>
                      <TableCell>{v.dose}</TableCell>
                      <TableCell className="text-sm">{fmt(v.dataPrevista)}</TableCell>
                      <TableCell className="text-sm">{v.dataAplicacao ? fmt(v.dataAplicacao) : "—"}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            v.status === "aplicada" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            v.status === "atrasada" ? "bg-red-50 text-red-700 border-red-200" :
                            "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {v.status === "aplicada" ? "Aplicada" : v.status === "atrasada" ? "Atrasada" : "Pendente"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medicações */}
        <TabsContent value="medicacoes">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Dosagem</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead className="hidden md:table-cell">Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicacoes.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.nome}</TableCell>
                      <TableCell>{m.dosagem}</TableCell>
                      <TableCell>{m.frequencia}</TableCell>
                      <TableCell className="text-sm">{fmt(m.dataInicio)}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {m.observacoes ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transcard */}
        <TabsContent value="transcard">
          <TranscardTab
            gestante={g}
            vinculacao={transcard}
            consultasRealizadas={consultasRealizadas}
            testesRapidosFeitos={testesRapidosFeitos}
            vacinasAtualizadas={vacinasAtualizadas}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
