import { NextResponse } from "next/server";
import { updateStatus, STATUS_URUT, type OrderStatus } from "@/lib/orders";
import { site } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body bukan JSON valid" }, { status: 400 });
  }

  const key = String(body.key ?? "");
  if (key !== site.adminKey) {
    return NextResponse.json({ error: "PIN admin salah" }, { status: 401 });
  }

  const id = String(body.id ?? "");
  const status = String(body.status ?? "") as OrderStatus;
  if (!STATUS_URUT.includes(status)) {
    return NextResponse.json({ error: "Status tidak valid" }, { status: 422 });
  }

  const order = await updateStatus(id, status);
  if (!order) {
    return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ order });
}
