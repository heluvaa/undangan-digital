import { NextResponse } from "next/server";
import { createUcapan, listUcapan } from "@/lib/orders";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const undangan = new URL(req.url).searchParams.get("undangan") ?? "";
  if (!undangan) {
    return NextResponse.json({ error: "undangan wajib" }, { status: 400 });
  }
  const ucapan = await listUcapan(undangan);
  return NextResponse.json({ ucapan });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body bukan JSON valid" }, { status: 400 });
  }
  const nama = String(body.nama ?? "").trim();
  const ucapan = String(body.ucapan ?? "").trim();
  if (nama.length < 2 || ucapan.length < 2) {
    return NextResponse.json(
      { error: "Nama dan ucapan minimal 2 karakter" },
      { status: 422 },
    );
  }
  const u = await createUcapan({
    undangan: String(body.undangan ?? ""),
    nama,
    ucapan,
    hadir: String(body.hadir ?? "ragu"),
  });
  return NextResponse.json({ ucapan: u }, { status: 201 });
}
