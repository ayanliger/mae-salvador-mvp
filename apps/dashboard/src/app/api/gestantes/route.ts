import { NextRequest, NextResponse } from "next/server";
import { getGestantes } from "@/lib/data";
import type { RiscoGestacional } from "@mae-salvador/shared";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const gestantes = await getGestantes({
    search: searchParams.get("search") ?? undefined,
    risco: (searchParams.get("risco") as RiscoGestacional) ?? undefined,
    ubsId: searchParams.get("ubsId") ?? undefined,
    equipeId: searchParams.get("equipeId") ?? undefined,
    ativa: searchParams.has("ativa")
      ? searchParams.get("ativa") === "true"
      : undefined,
  });

  return NextResponse.json(gestantes);
}
