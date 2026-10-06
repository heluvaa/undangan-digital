// ============================================================
// PENYIMPANAN ORDER — dua backend, dipilih otomatis.
//
// 1. File JSON  -> jalan di VPS / `next start` (filesystem persisten)
// 2. Vercel KV  -> jalan di serverless, aktif kalau env ini ada:
//      KV_REST_API_URL, KV_REST_API_TOKEN
//    (Vercel dashboard: Storage > Create Database > KV)
//
// Kalau dua-duanya tidak ada di serverless, order TIDAK awet —
// makanya status itu dilaporkan lewat storeDurable() dan terlihat
// di panel admin.
// ============================================================

import { promises as fs } from "fs";
import path from "path";
import type { Order, Ucapan } from "./types";

// Vercel serverless: cwd read-only -> tulis ke /tmp (per-instant, tak awet).
// VPS: tetap di data/ dalam direktori proyek.
const DATA_DIR = process.env.VERCEL
  ? path.join(process.env.TMPDIR ?? "/tmp", "undangan-data")
  : path.resolve(process.env.DATA_DIR ?? path.join(process.cwd(), "data"));
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const UCAPAN_FILE = path.join(DATA_DIR, "ucapan.json");

const KV_URL = process.env.KV_REST_API_URL ?? "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN ?? "";
const KV_ON = Boolean(KV_URL && KV_TOKEN);
const K_ORDERS = "orders";
const K_UCAPAN = "ucapan";

// true = tulisan awet; false = serverless tanpa DB (data bisa hilang)
export function storeDurable(): boolean {
  return KV_ON || !process.env.VERCEL;
}

export function storeBackend(): "kv" | "file" {
  return KV_ON ? "kv" : "file";
}

async function kv(action: string, key: string, value?: unknown) {
  const url = `${KV_URL.replace(/\/$/, "")}/${action}/${key}`;
  const res = await fetch(url, {
    method: value === undefined ? "GET" : "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: value === undefined ? undefined : JSON.stringify(value),
  });
  if (!res.ok) throw new Error(`KV ${action} gagal: ${res.status}`);
  return res.json();
}

async function bacaFile<T>(file: string): Promise<T[]> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T[];
  } catch {
    return [];
  }
}

async function tulisFile<T>(file: string, data: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function bacaOrders(): Promise<Order[]> {
  if (KV_ON) {
    const v = await kv("GET", K_ORDERS);
    return (typeof v === "string" ? JSON.parse(v) : v) ?? [];
  }
  return bacaFile<Order>(ORDERS_FILE);
}

export async function simpanOrders(data: Order[]): Promise<void> {
  if (KV_ON) {
    await kv("SET", K_ORDERS, JSON.stringify(data));
    return;
  }
  await tulisFile(ORDERS_FILE, data);
}

export async function bacaUcapan(): Promise<Ucapan[]> {
  if (KV_ON) {
    const v = await kv("GET", K_UCAPAN);
    return (typeof v === "string" ? JSON.parse(v) : v) ?? [];
  }
  return bacaFile<Ucapan>(UCAPAN_FILE);
}

export async function simpanUcapan(data: Ucapan[]): Promise<void> {
  if (KV_ON) {
    await kv("SET", K_UCAPAN, JSON.stringify(data));
    return;
  }
  await tulisFile(UCAPAN_FILE, data);
}
