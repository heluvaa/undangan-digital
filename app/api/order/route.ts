import { NextResponse } from "next/server";
import { createOrder, listOrders, storeDurable } from "@/lib/orders";
import { paket, designs, site } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // daftar order berisi data customer — hanya boleh dibaca admin
  // PIN lewat header (jangan query string: URL ikut masuk log server)
  const key =
    req.headers.get("x-admin-key") ??
    new URL(req.url).searchParams.get("key") ??
    "";
  if (key !== site.adminKey) {
    return NextResponse.json({ error: "PIN admin diperlukan" }, { status: 401 });
  }
  const orders = await listOrders();
  // jangan bocorkan nomor WA customer ke publik
  return NextResponse.json(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    orders.map(({ wa: _wa, ...tanpaWa }) => tanpaWa),
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body bukan JSON valid" }, { status: 400 });
  }

  const str = (k: string) => String(body[k] ?? "").trim();

  const input = {
    paket: str("paket"),
    design: str("design"),
    nama: str("nama"),
    wa: str("wa"),
    namaAcara: str("namaAcara"),
    tanggalAcara: str("tanggalAcara"),
    lokasi: str("lokasi"),
    mapsUrl: str("mapsUrl"),
    catatan: str("catatan"),
  };

  const errors: string[] = [];
  if (!paket.some((p) => p.id === input.paket)) errors.push("Paket tidak valid");
  if (!designs.some((d) => d.slug === input.design))
    errors.push("Desain tidak valid");
  if (input.nama.length < 2) errors.push("Nama wajib diisi");
  if (!/^(\+?62|0)8\d{7,13}$/.test(input.wa.replace(/[\s-]/g, "")))
    errors.push("Nomor WhatsApp tidak valid");
  if (input.namaAcara.length < 2) errors.push("Nama acara wajib diisi");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.tanggalAcara))
    errors.push("Tanggal acara wajib diisi (yyyy-mm-dd)");
  if (input.lokasi.length < 3) errors.push("Lokasi acara wajib diisi");
  if (errors.length > 0) return NextResponse.json({ errors }, { status: 422 });

  // normalisasi WA ke format 62
  input.wa = input.wa.replace(/[\s-]/g, "").replace(/^\+/, "").replace(/^0/, "62");

  const order = await createOrder(input);
  return NextResponse.json(
    { order, persisten: storeDurable() },
    { status: 201 },
  );
}
