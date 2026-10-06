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
