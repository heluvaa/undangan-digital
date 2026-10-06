// Penyimpanan order & ucapan: file JSON sederhana.
// Catatan: butuh filesystem persisten (VPS / `next start`).
// Kalau deploy serverless (Vercel), ganti ke DB — lihat README.

import { promises as fs } from "fs";
import path from "path";
import { hargaPaket } from "./content";

export type OrderStatus = "baru" | "dibayar" | "dikerjakan" | "selesai";

export const STATUS_URUT: OrderStatus[] = [
  "baru",
  "dibayar",
  "dikerjakan",
  "selesai",
];

export type Order = {
  id: string;
  kode: string;
  dibuat: string; // ISO
  status: OrderStatus;
  paket: string;
  design: string;
  harga: number; // dihitung server dari paket
  nama: string;
  wa: string;
  namaAcara: string;
  tanggalAcara: string;
  lokasi: string;
  mapsUrl: string;
  catatan: string;
};

export type Ucapan = {
  id: string;
  undangan: string;
  nama: string;
  ucapan: string;
  hadir: "hadir" | "tidak" | "ragu";
  dibuat: string;
};

const DATA_DIR = path.resolve(
  process.env.DATA_DIR ?? path.join(process.cwd(), "data"),
);
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const UCAPAN_FILE = path.join(DATA_DIR, "ucapan.json");

let durable: boolean | null = null;

// true  = filesystem persisten (VPS / `next start`) -> order awet.
// false = serverless (Vercel) -> tulisan JSON bisa hilang antar invocation.
export function storeDurable(): boolean {
  if (durable === null) durable = !process.env.VERCEL;
  return durable;
}

async function baca<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function tulis<T>(file: string, data: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function listOrders(): Promise<Order[]> {
  const orders = await baca<Order>(ORDERS_FILE);
  return orders.sort((a, b) => (a.dibuat < b.dibuat ? 1 : -1));
}

export async function createOrder(input: {
  paket: string;
  design: string;
  nama: string;
  wa: string;
  namaAcara: string;
  tanggalAcara: string;
  lokasi: string;
  mapsUrl: string;
  catatan: string;
}): Promise<Order> {
  const orders = await baca<Order>(ORDERS_FILE);
  const now = new Date();
  const kode = `UDN-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(orders.length + 1).padStart(3, "0")}`;
  const order: Order = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kode,
    dibuat: now.toISOString(),
    status: "baru",
    paket: input.paket,
    design: input.design,
    // harga SELALU dihitung ulang dari data paket — input client dibuang
    harga: hargaPaket(input.paket),
    nama: input.nama,
    wa: input.wa,
    namaAcara: input.namaAcara,
    tanggalAcara: input.tanggalAcara,
    lokasi: input.lokasi,
    mapsUrl: input.mapsUrl,
    catatan: input.catatan,
  };
  orders.push(order);
  await tulis(ORDERS_FILE, orders);
  return order;
}

export async function updateStatus(
  id: string,
  status: OrderStatus,
): Promise<Order | null> {
  if (!STATUS_URUT.includes(status)) return null;
  const orders = await baca<Order>(ORDERS_FILE);
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  await tulis(ORDERS_FILE, orders);
  return order;
}

export async function listUcapan(undangan: string): Promise<Ucapan[]> {
  const all = await baca<Ucapan>(UCAPAN_FILE);
  return all
    .filter((u) => u.undangan === undangan)
    .sort((a, b) => (a.dibuat < b.dibuat ? 1 : -1));
}

export async function createUcapan(input: {
  undangan: string;
  nama: string;
  ucapan: string;
  hadir: string;
}): Promise<Ucapan> {
  const all = await baca<Ucapan>(UCAPAN_FILE);
  const hadir: Ucapan["hadir"] =
    input.hadir === "hadir" || input.hadir === "tidak" ? input.hadir : "ragu";
  const u: Ucapan = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    undangan: input.undangan,
    nama: input.nama.slice(0, 80),
    ucapan: input.ucapan.slice(0, 500),
    hadir,
    dibuat: new Date().toISOString(),
  };
  all.push(u);
  await tulis(UCAPAN_FILE, all);
  return u;
}
