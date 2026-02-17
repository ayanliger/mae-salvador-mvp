import { NextResponse } from "next/server";
import {
  appGetTranscardByGestante,
  appCreateTranscard,
  appUpdateTranscard,
} from "@/lib/app-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const transcard = await appGetTranscardByGestante(id);
    return NextResponse.json(transcard);
  } catch {
    // APP_DATABASE_URL not configured — return null gracefully
    return NextResponse.json(null);
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const { cpf, numeroTranscard } = body as {
    cpf: string;
    numeroTranscard?: string;
  };

  if (!cpf) {
    return NextResponse.json(
      { error: "CPF é obrigatório" },
      { status: 400 },
    );
  }

  const existing = await appGetTranscardByGestante(id);
  if (existing) {
    return NextResponse.json(
      { error: "Gestante já possui vinculação Transcard" },
      { status: 409 },
    );
  }

  const transcard = await appCreateTranscard(id, cpf, numeroTranscard);
  return NextResponse.json(transcard, { status: 201 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const existing = await appGetTranscardByGestante(id);
  if (!existing) {
    return NextResponse.json(
      { error: "Vinculação Transcard não encontrada" },
      { status: 404 },
    );
  }

  const {
    situacao,
    etapaAtual,
    lgpdConsentimento,
    recusouTranscard,
    recusouKitEnxoval,
    encaminhadaCras,
    dataEncaminhamentoCras,
  } = body;

  await appUpdateTranscard(existing.id, {
    situacao,
    etapaAtual,
    lgpdConsentimento,
    recusouTranscard,
    recusouKitEnxoval,
    encaminhadaCras,
    dataEncaminhamentoCras,
  });

  const updated = await appGetTranscardByGestante(id);
  return NextResponse.json(updated);
}
