import { NextResponse } from "next/server";
import { esusGetEquipesByUbs } from "@/lib/esus-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ubsId: string }> },
) {
  const { ubsId } = await params;
  try {
    const equipes = await esusGetEquipesByUbs(ubsId);
    return NextResponse.json(equipes);
  } catch (e: unknown) {
    console.error(`[api/ubs/${ubsId}/equipes] DB error:`, e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 },
    );
  }
}
