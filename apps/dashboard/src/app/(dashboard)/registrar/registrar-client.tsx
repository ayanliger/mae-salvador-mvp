"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import type { Gestante } from "@mae-salvador/shared";

interface RegistrarClientProps {
  gestantes: Gestante[];
}

export default function RegistrarClient({ gestantes }: RegistrarClientProps) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("gestante") ?? "";
  const [gestanteId, setGestanteId] = useState(preselected);
  const [submitted, setSubmitted] = useState(false);

  const gestante = gestantes.find((g) => g.id === gestanteId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function displayName(g: Gestante) {
    return g.nomeCompleto || `Cidadão #${g.id}`;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Registrar Consulta Pré-natal</h1>
        <p className="text-sm text-muted-foreground mt-1">Preencha os dados da consulta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Gestante selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Gestante</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={gestanteId} onValueChange={setGestanteId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a gestante" />
              </SelectTrigger>
              <SelectContent>
                {gestantes.filter((g) => g.ativa).map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {displayName(g)}{g.cpf ? ` — CPF ${g.cpf}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {gestante && (
              <p className="text-xs text-muted-foreground mt-2">
                IG: {gestante.idadeGestacionalSemanas} semanas{gestante.dpp ? ` · DPP: ${new Date(gestante.dpp).toLocaleDateString("pt-BR")}` : ""}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Clinical data */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Dados Clínicos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input id="peso" type="number" step="0.1" placeholder="Ex: 65.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ig">IG na consulta (semanas)</Label>
                <Input id="ig" type="number" placeholder="Ex: 26" defaultValue={gestante?.idadeGestacionalSemanas} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pas">PA Sistólica (mmHg)</Label>
                <Input id="pas" type="number" placeholder="Ex: 120" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pad">PA Diastólica (mmHg)</Label>
                <Input id="pad" type="number" placeholder="Ex: 80" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="au">Altura uterina (cm)</Label>
                <Input id="au" type="number" placeholder="Ex: 25" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bcf">BCF (bpm)</Label>
                <Input id="bcf" type="number" placeholder="Ex: 140" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edema">Edema</Label>
                <Select>
                  <SelectTrigger id="edema">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ausente">Ausente</SelectItem>
                    <SelectItem value="leve">Leve</SelectItem>
                    <SelectItem value="moderado">Moderado</SelectItem>
                    <SelectItem value="grave">Grave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mf">Movimentos fetais</Label>
                <Select>
                  <SelectTrigger id="mf">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Presente</SelectItem>
                    <SelectItem value="nao">Ausente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Avaliação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="queixas">Queixas</Label>
              <Input id="queixas" placeholder="Queixas da gestante nesta consulta" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conduta">Conduta</Label>
              <Input id="conduta" placeholder="Conduta adotada" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="obs">Observações</Label>
              <Input id="obs" placeholder="Observações adicionais" />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          {submitted ? (
            <Button disabled className="bg-emerald-600">
              <Check className="w-4 h-4 mr-1.5" />
              Consulta registrada!
            </Button>
          ) : (
            <Button type="submit" disabled={!gestanteId}>
              Registrar consulta
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
