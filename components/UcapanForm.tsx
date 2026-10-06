"use client";

import { useEffect, useState } from "react";

type Ucapan = {
  id: string;
  nama: string;
  ucapan: string;
  hadir: "hadir" | "tidak" | "ragu";
  dibuat: string;
};

const labelHadir: Record<Ucapan["hadir"], string> = {
  hadir: "Hadir",
  tidak: "Tidak hadir",
  ragu: "Masih ragu",
};

export default function UcapanForm({ undangan }: { undangan: string }) {
  const [items, setItems] = useState<Ucapan[]>([]);
  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [hadir, setHadir] = useState<Ucapan["hadir"]>("hadir");
  const [kirim, setKirim] = useState(false);
  const [sukses, setSukses] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/ucapan?undangan=${encodeURIComponent(undangan)}`)
      .then((r) => r.json())
      .then((d) => setItems(d.ucapan ?? []))
      .catch(() => setItems([]));
  }, [undangan]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setKirim(true);
    setSukses(false);
    try {
      const res = await fetch("/api/ucapan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ undangan, nama, ucapan, hadir }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Gagal mengirim. Coba lagi.");
      } else {
        setItems((prev) => [data.ucapan, ...prev]);
        setNama("");
        setUcapan("");
        setSukses(true);
      }
    } catch {
      setError("Gagal mengirim. Periksa koneksi.");
    } finally {
      setKirim(false);
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
      <form onSubmit={submit} className="space-y-4 text-left">
        <div>
          <label htmlFor="u-nama" className="block text-sm font-medium">
            Nama
          </label>
          <input
            id="u-nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            minLength={2}
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label htmlFor="u-ucapan" className="block text-sm font-medium">
            Ucapan & doa
          </label>
          <textarea
            id="u-ucapan"
            value={ucapan}
            onChange={(e) => setUcapan(e.target.value)}
            required
            minLength={2}
            rows={3}
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm"
          />
        </div>
        <fieldset>
          <legend className="text-sm font-medium">Konfirmasi kehadiran</legend>
          <div className="mt-2 flex gap-2">
            {(["hadir", "ragu", "tidak"] as const).map((h) => (
              <label
                key={h}
                className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition-colors ${
                  hadir === h
                    ? "border-gold bg-gold-pale text-gold"
                    : "border-border bg-white text-ink-soft"
                }`}
              >
                <input
                  type="radio"
                  name="hadir"
                  value={h}
                  checked={hadir === h}
                  onChange={() => setHadir(h)}
                  className="sr-only"
                />
                {labelHadir[h]}
              </label>
            ))}
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={kirim}
          className="w-full rounded-full bg-gold py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {kirim ? "Mengirim…" : "Kirim Ucapan"}
        </button>
        {sukses && (
          <p className="text-center text-sm text-good">Ucapanmu terkirim. Terima kasih!</p>
        )}
        {error && <p className="text-center text-sm text-danger">{error}</p>}
      </form>

      <div className="mt-10 space-y-4">
        {items.length === 0 ? (
          <p className="text-center text-sm text-ink-soft">
            Belum ada ucapan. Jadilah yang pertama.
          </p>
        ) : (
          items.map((u) => (
            <div key={u.id} className="rounded-xl border border-border bg-bg px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{u.nama}</p>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-ink-soft">
                  {labelHadir[u.hadir]}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{u.ucapan}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
