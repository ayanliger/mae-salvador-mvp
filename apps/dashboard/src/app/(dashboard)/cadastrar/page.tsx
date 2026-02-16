"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, Loader2 } from "lucide-react";
import { UBS_LIST, DISTRITOS_SANITARIOS, MATERNIDADES } from "@mae-salvador/shared";
import type { DescobrimentoGestacao, ProgramaSocial, CadastroGestanteInput } from "@mae-salvador/shared";

export default function CadastrarGestantePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Required fields
  const [cpf, setCpf] = useState("");
  const [cns, setCns] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [temWhatsapp, setTemWhatsapp] = useState(false);

  // Optional identity
  const [nomeSocial, setNomeSocial] = useState("");
  const [identidadeGenero, setIdentidadeGenero] = useState("");
  const [orientacaoSexual, setOrientacaoSexual] = useState("");

  // Address
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [distritoId, setDistritoId] = useState("");

  // Pregnancy info
  const [descobrimento, setDescobrimento] = useState<DescobrimentoGestacao | "">("");
  const [programaSocial, setProgramaSocial] = useState<ProgramaSocial | "">("");
  const [nis, setNis] = useState("");
  const [planoSaude, setPlanoSaude] = useState<"sim" | "nao" | "">("");
  const [manterAcompanhamentoUbs, setManterAcompanhamentoUbs] = useState<"sim" | "nao" | "">("");

  // UBS linkage
  const [ubsId, setUbsId] = useState("");

  // Optional obstetric
  const [dum, setDum] = useState("");
  const [gestacoesPrevias, setGestacoesPrevias] = useState("");
  const [partosCesareo, setPartosCesareo] = useState("");
  const [partosNormal, setPartosNormal] = useState("");
  const [abortos, setAbortos] = useState("");

  // Optional health
  const [alergias, setAlergias] = useState("");
  const [doencasConhecidas, setDoencasConhecidas] = useState("");
  const [medicacoesEmUso, setMedicacoesEmUso] = useState("");

  const ubsOptions = distritoId
    ? UBS_LIST.filter((u) => u.distritoSanitarioId === distritoId)
    : UBS_LIST;

  const hasCpf = cpf.replace(/\D/g, "").length === 11;
  const hasCns = cns.replace(/\D/g, "").length === 15;

  const canSubmit =
    (hasCpf || hasCns) &&
    nomeCompleto.trim() !== "" &&
    telefone.trim() !== "" &&
    logradouro.trim() !== "" &&
    numero.trim() !== "" &&
    bairro.trim() !== "" &&
    cep.trim() !== "" &&
    descobrimento !== "" &&
    programaSocial !== "" &&
    ubsId !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    const payload: CadastroGestanteInput = {
      cpf,
      cns: cns || undefined,
      nomeCompleto,
      nomeSocial: nomeSocial || undefined,
      identidadeGenero: identidadeGenero || undefined,
      orientacaoSexual: orientacaoSexual || undefined,
      dataNascimento: dataNascimento || undefined,
      telefone,
      temWhatsapp,
      logradouro,
      numero,
      complemento: complemento || undefined,
      bairro,
      cep,
      distritoSanitarioId: distritoId || undefined,
      descobrimentoGestacao: descobrimento as DescobrimentoGestacao,
      dum: dum || undefined,
      programaSocial: programaSocial as ProgramaSocial,
      nis: nis || undefined,
      planoSaude: planoSaude as "sim" | "nao" || undefined,
      manterAcompanhamentoUbs: manterAcompanhamentoUbs as "sim" | "nao" || undefined,
      ubsId,
      gestacoesPrevias: gestacoesPrevias ? parseInt(gestacoesPrevias) : undefined,
      partosCesareo: partosCesareo ? parseInt(partosCesareo) : undefined,
      partosNormal: partosNormal ? parseInt(partosNormal) : undefined,
      abortos: abortos ? parseInt(abortos) : undefined,
      alergias: alergias || undefined,
      doencasConhecidas: doencasConhecidas || undefined,
      medicacoesEmUso: medicacoesEmUso || undefined,
      origem: "dashboard",
    };

    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao cadastrar gestante");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro ao cadastrar gestante");
    } finally {
      setSubmitting(false);
    }
  }

  function formatCpf(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function formatCep(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }

  return (
    <div className="max-w-3xl space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Cadastro da Gestante
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Preencha os dados para cadastrar uma nova gestante no programa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Identificação ── */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Identificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">
                  CPF {!hasCns && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  maxLength={14}
                />
                {!hasCpf && !hasCns && (
                  <p className="text-[10px] text-muted-foreground">Preencha CPF ou CNS</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cns">
                  CNS {!hasCpf && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="cns"
                  placeholder="Cartão Nacional de Saúde"
                  value={cns}
                  onChange={(e) => setCns(e.target.value.replace(/\D/g, "").slice(0, 15))}
                  maxLength={15}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">
                Nome completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nome"
                placeholder="Nome completo da gestante"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome-social">Nome social</Label>
              <Input
                id="nome-social"
                placeholder="Nome social (se aplicável)"
                value={nomeSocial}
                onChange={(e) => setNomeSocial(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Identidade de gênero</Label>
                <Select value={identidadeGenero} onValueChange={setIdentidadeGenero}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mulher-cis">Mulher cisgênero</SelectItem>
                    <SelectItem value="mulher-trans">Mulher transgênero</SelectItem>
                    <SelectItem value="homem-trans">Homem transgênero</SelectItem>
                    <SelectItem value="nao-binario">Não-binário</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                    <SelectItem value="prefere-nao-declarar">Prefere não declarar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Orientação sexual</Label>
                <Select value={orientacaoSexual} onValueChange={setOrientacaoSexual}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heterossexual">Heterossexual</SelectItem>
                    <SelectItem value="homossexual">Homossexual</SelectItem>
                    <SelectItem value="bissexual">Bissexual</SelectItem>
                    <SelectItem value="assexual">Assexual</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                    <SelectItem value="prefere-nao-declarar">Prefere não declarar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nascimento">Data de nascimento</Label>
                <Input
                  id="nascimento"
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">
                  Telefone <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="telefone"
                    placeholder="(71) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(formatPhone(e.target.value))}
                    maxLength={15}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setTemWhatsapp(!temWhatsapp)}
                    className={`flex items-center gap-1.5 px-3 rounded-md border text-xs font-medium transition-colors shrink-0 ${
                      temWhatsapp
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Endereço ── */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">
              Endereço <span className="text-red-500 text-xs font-normal">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="logradouro">Logradouro</Label>
                <Input
                  id="logradouro"
                  placeholder="Rua, Avenida..."
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  placeholder="Nº"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  placeholder="Apto, Bloco..."
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(formatCep(e.target.value))}
                  maxLength={9}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Distrito Sanitário</Label>
                <Select value={distritoId} onValueChange={(v) => { setDistritoId(v); setUbsId(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o distrito" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRITOS_SANITARIOS.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  UBS de Vinculação <span className="text-red-500">*</span>
                </Label>
                <Select value={ubsId} onValueChange={setUbsId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a UBS" />
                  </SelectTrigger>
                  <SelectContent>
                    {ubsOptions.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Dados da Gestação ── */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Dados da Gestação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Como descobriu a gestação <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={descobrimento}
                  onValueChange={(v) => setDescobrimento(v as DescobrimentoGestacao)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teste-rapido">Teste rápido</SelectItem>
                    <SelectItem value="beta-hcg">Beta-HCG (Sangue)</SelectItem>
                    <SelectItem value="atraso-menstrual">Atraso Menstrual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dum">Data da última menstruação (DUM)</Label>
                <Input
                  id="dum"
                  type="date"
                  value={dum}
                  onChange={(e) => setDum(e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground">Facultativo</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Programa social <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={programaSocial}
                  onValueChange={(v) => setProgramaSocial(v as ProgramaSocial)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nenhum">Nenhum</SelectItem>
                    <SelectItem value="bolsa-familia">Bolsa Família</SelectItem>
                    <SelectItem value="bpc-loas">BPC/LOAS</SelectItem>
                    <SelectItem value="aluguel-social">Aluguel Social</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {programaSocial === "bolsa-familia" && (
                <div className="space-y-2">
                  <Label htmlFor="nis">
                    NIS <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nis"
                    placeholder="Número de Identificação Social"
                    value={nis}
                    onChange={(e) => setNis(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    maxLength={11}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Plano de saúde ou particular?</Label>
                <Select
                  value={planoSaude}
                  onValueChange={(v) => setPlanoSaude(v as "sim" | "nao")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {planoSaude === "sim" && (
                <div className="space-y-2">
                  <Label>Deseja manter acompanhamento na UBS?</Label>
                  <Select
                    value={manterAcompanhamentoUbs}
                    onValueChange={(v) => setManterAcompanhamentoUbs(v as "sim" | "nao")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Histórico Obstétrico (Facultativo) ── */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm">Histórico Obstétrico</CardTitle>
              <Badge variant="outline" className="text-[10px] font-normal">
                Facultativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gestacoes">Gestações prévias</Label>
                <Input
                  id="gestacoes"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={gestacoesPrevias}
                  onChange={(e) => setGestacoesPrevias(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partos-cesareo">Partos cesáreos</Label>
                <Input
                  id="partos-cesareo"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={partosCesareo}
                  onChange={(e) => setPartosCesareo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partos-normal">Partos normais</Label>
                <Input
                  id="partos-normal"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={partosNormal}
                  onChange={(e) => setPartosNormal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="abortos">Abortos</Label>
                <Input
                  id="abortos"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={abortos}
                  onChange={(e) => setAbortos(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Saúde (Facultativo) ── */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm">Informações de Saúde</CardTitle>
              <Badge variant="outline" className="text-[10px] font-normal">
                Facultativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alergias">Alergias</Label>
              <Input
                id="alergias"
                placeholder="Descreva alergias conhecidas"
                value={alergias}
                onChange={(e) => setAlergias(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doencas">Doenças conhecidas (antecedentes)</Label>
              <Input
                id="doencas"
                placeholder="Diabetes, hipertensão, cardiopatia..."
                value={doencasConhecidas}
                onChange={(e) => setDoencasConhecidas(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicacoes">Medicações em uso</Label>
              <Input
                id="medicacoes"
                placeholder="Medicamentos que faz uso atualmente"
                value={medicacoesEmUso}
                onChange={(e) => setMedicacoesEmUso(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Submit ── */}
        {submitError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {submitError}
          </div>
        )}
        <div className="flex gap-3 justify-end">
          {submitted ? (
            <Button disabled className="bg-emerald-600">
              <Check className="w-4 h-4 mr-1.5" />
              Gestante cadastrada com sucesso!
            </Button>
          ) : (
            <Button type="submit" disabled={!canSubmit || submitting} size="lg">
              {submitting && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />}
              {submitting ? "Cadastrando..." : "Cadastrar Gestante"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
