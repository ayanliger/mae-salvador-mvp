import { NextRequest, NextResponse } from "next/server";
import { appCreateCadastroGestante, appGetCadastrosGestante } from "@/lib/app-data";
import type { CadastroGestanteInput, StatusCadastro } from "@mae-salvador/shared";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CadastroGestanteInput;

  // Required field validation
  const missing: string[] = [];
  const cpfDigits = (body.cpf ?? "").replace(/\D/g, "");
  const cnsDigits = (body.cns ?? "").replace(/\D/g, "");
  if (cpfDigits.length !== 11 && cnsDigits.length !== 15) missing.push("cpf ou cns");
  if (!body.nomeCompleto?.trim()) missing.push("nomeCompleto");
  if (!body.telefone?.trim()) missing.push("telefone");
  if (!body.logradouro?.trim()) missing.push("logradouro");
  if (!body.numero?.trim()) missing.push("numero");
  if (!body.bairro?.trim()) missing.push("bairro");
  if (!body.cep?.trim()) missing.push("cep");
  if (!body.descobrimentoGestacao) missing.push("descobrimentoGestacao");
  if (!body.programaSocial) missing.push("programaSocial");
  if (!body.ubsId?.trim()) missing.push("ubsId");
  if (!body.origem) missing.push("origem");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Campos obrigatórios faltando", campos: missing },
      { status: 400 },
    );
  }

  try {
    const cadastro = await appCreateCadastroGestante(body);
    return NextResponse.json(cadastro, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro interno";
    // Duplicate CPF or CNS
    if (msg.includes("idx_cadastro_gestante_cpf")) {
      return NextResponse.json(
        { error: "CPF já cadastrado" },
        { status: 409 },
      );
    }
    if (msg.includes("idx_cadastro_gestante_cns")) {
      return NextResponse.json(
        { error: "CNS já cadastrado" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status") as StatusCadastro | null;
  const cadastros = await appGetCadastrosGestante(status ?? undefined);
  return NextResponse.json(cadastros);
}
