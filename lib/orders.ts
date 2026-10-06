// Domain: order state machine + ucapan. Storage di belakang store.ts.

import { hargaPaket } from "./content";
import {
  bacaOrders,
  simpanOrders,
  bacaUcapan,
  simpanUcapan,
  storeDurable,
  storeBackend,
} from "./store";
import {
  STATUS_URUT,
  type Order,
  type OrderStatus,
  type Ucapan,
} from "./types";

export { storeDurable, storeBackend, STATUS_URUT };
export type { Order, OrderStatus, Ucapan };

export async function listOrders(): Promise<Order[]> {
  const orders = await bacaOrders();
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
  const orders = await bacaOrders();
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
  await simpanOrders(orders);
  return order;
}

export async function updateStatus(
  id: string,
  status: OrderStatus,
): Promise<Order | null> {
  if (!STATUS_URUT.includes(status)) return null;
  const orders = await bacaOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  await simpanOrders(orders);
  return order;
}

export async function listUcapan(undangan: string): Promise<Ucapan[]> {
  const all = await bacaUcapan();
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
  const all = await bacaUcapan();
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
  await simpanUcapan(all);
  return u;
}
