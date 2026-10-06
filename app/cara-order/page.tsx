import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { pembayaran, langkahOrder, waLink, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cara Order & Pembayaran",
  description:
    "Tahapan order undangan digital: pilih desain, isi form, bayar transfer/QRIS, konfirmasi via WhatsApp.",
};

export default function CaraOrder() {
  return (
    <>
      <Nav />
      <main className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <p className="text-xs font-medium tracking-[0.4em] text-gold uppercase">
              Panduan
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              Cara Order & Pembayaran
            </h1>
            <p className="mt-4 text-ink-soft">
              Pembayaran masih manual — aman, simpel, dan bisa langsung ngobrol dengan kami.
            </p>
          </header>

          {/* tahapan */}
          <section className="mt-12">
            <h2 className="font-serif text-2xl">Tahapan Order</h2>
            <ol className="mt-6 space-y-6">
              {langkahOrder.map((l) => (
                <li key={l.no} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-pale font-serif text-lg text-gold">
                    {l.no}
                  </span>
                  <div>
                    <h3 className="font-medium">{l.judul}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{l.isi}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* pembayaran */}
          <section className="mt-14">
            <h2 className="font-serif text-2xl">Cara Pembayaran</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Bayar sesuai nominal paket yang dipilih, lewat QRIS, e-wallet, atau
              transfer bank.
            </p>

            {/* QRIS */}
            <div className="mt-6 rounded-xl border border-gold/40 bg-gold-pale p-6 text-center">
              <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
                QRIS — bisa dari semua e-wallet & m-banking
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pembayaran.qrisImage}
                alt="Kode QRIS pembayaran"
                width={320}
                height={320}
                className="mx-auto mt-4 w-64 rounded-lg border border-border bg-white p-2 sm:w-80"
              />
              <p className="mx-auto mt-4 max-w-sm text-sm">
                {pembayaran.qrisNote}
              </p>
            </div>

            {/* e-wallet */}
            {pembayaran.ewallet.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {pembayaran.ewallet.map((e) => (
                  <div key={e.nama} className="rounded-xl border border-border bg-card p-5 text-center">
                    <p className="text-xs font-medium tracking-[0.25em] text-ink-soft uppercase">
                      Transfer {e.nama}
                    </p>
                    <p className="mt-2 font-serif text-2xl tracking-widest tabular-nums">
                      {e.no}
                    </p>
                    {e.atasNama && (
                      <p className="mt-1 text-sm text-ink-soft">a.n. {e.atasNama}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* rekening bank — hanya tampil kalau sudah diisi */}
            {pembayaran.rekening.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {pembayaran.rekening.map((r) => (
                  <div key={r.bank} className="rounded-xl border border-border bg-card p-5 text-center">
                    <p className="text-xs font-medium tracking-[0.25em] text-ink-soft uppercase">
                      Transfer {r.bank}
                    </p>
                    <p className="mt-2 font-serif text-2xl tracking-widest tabular-nums">
                      {r.noRek}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">a.n. {r.atasNama}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* catatan */}
          <section className="mt-14">
            <h2 className="font-serif text-2xl">Catatan Penting</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {pembayaran.catatan.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-gold" aria-hidden>•</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-2xl bg-ink p-8 text-center text-white">
            <h2 className="font-serif text-2xl">Sudah Bayar? Konfirmasi di Sini</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/70">
              Kirim bukti transfer + kode order (format UDN-YYYYMMDD-XXX) ke WhatsApp
              kami di {site.wa}.
            </p>
            <a
              href={waLink(
                "Halo, saya mau konfirmasi pembayaran undangan digital.\nKode order: \nBukti transfer: (lampirkan foto)",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-gold px-8 py-4 font-medium transition-opacity hover:opacity-90"
            >
              Konfirmasi via WhatsApp
            </a>
          </section>

          <div className="mt-10 text-center">
            <Link
              href="/order"
              className="text-sm font-medium text-gold underline underline-offset-4"
            >
              ← Isi form order dulu kalau belum
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
