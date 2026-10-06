"use client";

import { useState } from "react";

type Order = {
  id: string;
  kode: string;
  dibuat: string;
  status: string;
  paket: string;
  design: string;
  harga: number;
  nama: string;
  namaAcara: string;
  tanggalAcara: string;
  lokasi: string;
  mapsUrl: string;
  catatan: string;
};

const STATUS_FLOW = ["baru", "dibayar", "dikerjakan", "selesai"] as const;

const warnaStatus: Record<string, string> = {
  baru: "bg-amber-100 text-amber-800 border-amber-300",
  dibayar: "bg-sky-100 text-sky-800 border-sky-300",
  dikerjakan: "bg-violet-100 text-violet-800 border-violet-300",
  selesai: "bg-green-100 text-green-800 border-green-300",
};

function tglID(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
}

export default function AdminPanel({ pin }: { pin: string }) {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        headers: { "x-admin-key": key },
      });
      if (!res.ok) {
        setError("PIN salah.");
        return;
      }
      const data = await res.json();
      setAuthed(true);
      setOrders(data);
    } catch {
      setError("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }

  async function ubahStatus(id: string, status: string) {
    const res = await fetch("/api/admin/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: pin, id, status }),
    });
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Gagal update status");
      return;
    }
    const { order } = await res.json();
    setOrders((prev) =>
      prev ? prev.map((o) => (o.id === order.id ? { ...o, status: order.status } : o)) : prev,
    );
  }

  if (!authed) {
    return (
      <form
        onSubmit={login}
        className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-8"
      >
        <h2 className="font-serif text-2xl">Login Admin</h2>
        <p className="mt-1 text-sm text-ink-soft">Masukkan PIN admin.</p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="mt-4 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm"
          placeholder="PIN admin"
          aria-label="PIN admin"
        />
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-full bg-ink py-3 font-medium text-white transition-colors hover:bg-gold disabled:opacity-50"
        >
          {loading ? "Memeriksa…" : "Masuk"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">
          Order Masuk{" "}
          {orders && (
            <span className="text-base text-ink-soft">({orders.length})</span>
          )}
        </h2>
        <button
          onClick={() => location.reload()}
          className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold"
        >
          Muat Ulang
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      {!orders ? (
        <p className="mt-8 text-ink-soft">Memuat…</p>
      ) : orders.length === 0 ? (
        <p className="mt-8 text-ink-soft">Belum ada order masuk.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => {
            const idx = STATUS_FLOW.indexOf(o.status as (typeof STATUS_FLOW)[number]);
            return (
              <article key={o.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-serif text-lg">{o.namaAcara}</p>
                    <p className="text-xs text-ink-soft">
                      {o.kode} · masuk {tglID(o.dibuat)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${warnaStatus[o.status] ?? ""}`}
                  >
                    {o.status}
                  </span>
                </div>
                <dl className="mt-4 grid gap-1 text-sm sm:grid-cols-2">
                  <div><dt className="inline text-ink-soft">Pemesan: </dt><dd className="inline">{o.nama}</dd></div>
                  <div><dt className="inline text-ink-soft">Paket: </dt><dd className="inline capitalize">{o.paket} — Rp {o.harga.toLocaleString("id-ID")}</dd></div>
                  <div><dt className="inline text-ink-soft">Desain: </dt><dd className="inline">{o.design}</dd></div>
                  <div><dt className="inline text-ink-soft">Tanggal acara: </dt><dd className="inline">{o.tanggalAcara}</dd></div>
                  <div className="sm:col-span-2"><dt className="inline text-ink-soft">Lokasi: </dt><dd className="inline">{o.lokasi}{o.mapsUrl && <a href={o.mapsUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-gold underline">[maps]</a>}</dd></div>
                  {o.catatan && (
                    <div className="sm:col-span-2"><dt className="inline text-ink-soft">Catatan: </dt><dd className="inline">{o.catatan}</dd></div>
                  )}
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STATUS_FLOW.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => ubahStatus(o.id, s)}
                      disabled={i === idx || i < idx}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                        i === idx
                          ? "bg-ink text-white"
                          : i > idx
                            ? "border border-border text-ink-soft hover:border-gold hover:text-gold"
                            : "border border-border/50 text-ink-soft/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
