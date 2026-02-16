import { NextResponse } from "next/server";
import { getEquipesByUbs } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ubsId: string }> },
) {
  const { ubsId } = await params;
  const equipes = await getEquipesByUbs(ubsId);
  return NextResponse.json(equipes);
}
