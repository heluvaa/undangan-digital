"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  designs,
  paket,
  rupiah,
  hargaPaket,
  waLink,
} from "@/lib/content";

type OrderDone = {
  kode: string;
  nama: string;
  paket: string;
  design: string;
  harga: number;
};

const desainAktif = designs.filter((d) => d.aktif);

export default function OrderForm() {
  const params = useSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    design: params.get("design") ?? desainAktif[0].slug,
    paket: params.get("paket") ?? paket[0].id,
    nama: "",
    wa: "",
    namaAcara: "",
    tanggalAcara: "",
    lokasi: "",
    mapsUrl: "",
    catatan: "",
  });
  const [kirim, setKirim] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState<OrderDone | null>(null);

  const harga = hargaPaket(form.paket);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setKirim(true);
    setErrors([]);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? [data.error ?? "Gagal mengirim order."]);
      } else {
        const o: OrderDone = data.order;
        setDone(o);
        router.refresh();
      }
    } catch {
      setErrors(["Gagal mengirim. Periksa koneksi lalu coba lagi."]);
    } finally {
      setKirim(false);
    }
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm";
  const labelCls = "block text-sm font-medium";

  // ---------- SELESAI ----------
  if (done) {
    const desain = designs.find((d) => d.slug === done.design)?.nama ?? done.design;
    const pesanWA = `Halo, saya baru saja order undangan digital.\n\nKode order: ${done.kode}\nNama: ${done.nama}\nDesain: ${desain}\nPaket: ${done.paket}\nTotal: ${rupiah(done.harga)}\n\nSaya mau kirim data lengkap & bukti pembayaran.`;
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
        <p className="font-script text-5xl text-gold">Terima kasih!</p>
        <h2 className="mt-4 font-serif text-2xl">Order kamu sudah tercatat</h2>
        <div className="mt-6 rounded-xl bg-gold-pale p-5">
          <p className="text-xs tracking-[0.25em] text-ink-soft uppercase">Kode Order</p>
          <p className="mt-1 font-serif text-3xl text-gold">{done.kode}</p>
        </div>
        <ul className="mt-6 space-y-1 text-sm text-ink-soft">
          <li>Desain: <span className="text-ink">{desain}</span></li>
          <li>Paket: <span className="text-ink capitalize">{done.paket}</span> — {rupiah(done.harga)}</li>
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-ink-soft">
          Langkah selanjutnya: bayar sesuai nominal, lalu konfirmasi ke WhatsApp
          kami sambil kirim kode order & bukti bayar.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={waLink(pesanWA)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold py-3.5 font-medium text-white transition-opacity hover:opacity-90"
          >
            Konfirmasi via WhatsApp
          </a>
          <a
            href="/cara-order"
            className="rounded-full border border-ink py-3.5 font-medium transition-colors hover:bg-ink hover:text-white"
          >
            Lihat Cara Bayar
          </a>
        </div>
        <p className="mt-4 text-xs text-ink-soft">
          Simpan kode order-mu: {done.kode}
        </p>
      </div>
    );
  }

  // ---------- FORM ----------
  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      {errors.length > 0 && (
        <div className="mb-6 rounded-lg border border-danger/40 bg-red-50 p-4" role="alert">
          <p className="text-sm font-medium text-danger">Perlu diperbaiki:</p>
          <ul className="mt-1 list-inside list-disc text-sm text-danger">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* pilih desain */}
      <fieldset>
        <legend className={labelCls}>Pilih desain</legend>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {desainAktif.map((d) => (
            <label
              key={d.slug}
              className={`cursor-pointer rounded-lg border px-4 py-3 text-sm transition-colors ${
                form.design === d.slug
                  ? "border-gold bg-gold-pale"
                  : "border-border bg-white hover:border-gold/50"
              }`}
            >
              <input
                type="radio"
                name="design"
                value={d.slug}
                checked={form.design === d.slug}
                onChange={() => set("design", d.slug)}
                className="sr-only"
              />
              <span className="font-medium">{d.nama}</span>
              <span className="block text-xs text-ink-soft">{d.kategori}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* pilih paket */}
      <fieldset className="mt-6">
        <legend className={labelCls}>Pilih paket</legend>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {paket.map((p) => (
            <label
              key={p.id}
              className={`cursor-pointer rounded-lg border px-4 py-3 text-center text-sm transition-colors ${
                form.paket === p.id
                  ? "border-gold bg-gold-pale"
                  : "border-border bg-white hover:border-gold/50"
              }`}
            >
              <input
                type="radio"
                name="paket"
                value={p.id}
                checked={form.paket === p.id}
                onChange={() => set("paket", p.id)}
                className="sr-only"
              />
              <span className="font-medium capitalize">{p.nama}</span>
              <span className="block text-xs text-ink-soft">{rupiah(p.harga)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* data diri */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="o-nama" className={labelCls}>Nama pemesan *</label>
          <input id="o-nama" required minLength={2} className={inputCls}
            value={form.nama} onChange={(e) => set("nama", e.target.value)} />
        </div>
        <div>
          <label htmlFor="o-wa" className={labelCls}>No. WhatsApp *</label>
          <input id="o-wa" required type="tel" placeholder="08xxxxxxxxxx" className={inputCls}
            value={form.wa} onChange={(e) => set("wa", e.target.value)} />
        </div>
      </div>

      {/* data acara */}
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">Data acara</legend>
        <div className="mt-3 grid gap-4">
          <div>
            <label htmlFor="o-acara" className={labelCls}>Nama acara *</label>
            <input id="o-acara" required minLength={2} placeholder="Pernikahan Rina & Dimas" className={inputCls}
              value={form.namaAcara} onChange={(e) => set("namaAcara", e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="o-tgl" className={labelCls}>Tanggal acara *</label>
              <input id="o-tgl" required type="date" className={inputCls}
                value={form.tanggalAcara} onChange={(e) => set("tanggalAcara", e.target.value)} />
            </div>
            <div>
              <label htmlFor="o-lokasi" className={labelCls}>Lokasi acara *</label>
              <input id="o-lokasi" required minLength={3} placeholder="Gedung Serbaguna, Jakarta" className={inputCls}
                value={form.lokasi} onChange={(e) => set("lokasi", e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="o-maps" className={labelCls}>Link Google Maps <span className="text-ink-soft font-normal">(opsional)</span></label>
            <input id="o-maps" type="url" placeholder="https://maps.app.goo.gl/..." className={inputCls}
              value={form.mapsUrl} onChange={(e) => set("mapsUrl", e.target.value)} />
          </div>
          <div>
            <label htmlFor="o-catatan" className={labelCls}>Catatan / request khusus <span className="text-ink-soft font-normal">(opsional)</span></label>
            <textarea id="o-catatan" rows={3} placeholder="Warna favorit, teks khusus, jumlah foto, dll." className={inputCls}
              value={form.catatan} onChange={(e) => set("catatan", e.target.value)} />
          </div>
        </div>
      </fieldset>

      {/* ringkasan */}
      <div className="mt-6 flex items-center justify-between rounded-lg bg-bg px-4 py-3 text-sm">
        <span className="text-ink-soft">Total bayar</span>
        <span className="font-serif text-2xl text-gold">{rupiah(harga)}</span>
      </div>

      <button
        type="submit"
        disabled={kirim}
        className="mt-6 w-full rounded-full bg-gold py-4 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {kirim ? "Mengirim…" : "Kirim Order"}
      </button>
      <p className="mt-3 text-center text-xs text-ink-soft">
        Data foto & detail menyusul via WhatsApp setelah order terkirim.
      </p>
    </form>
  );
}
