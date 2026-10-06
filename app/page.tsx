import Link from "next/link";
import Client from "@/components/Client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  site,
  paket,
  designs,
  langkahOrder,
  testimoni,
  rupiah,
  waLink,
} from "@/lib/content";

export default function Home() {
  const unggulan = designs.filter((d) => d.aktif).slice(0, 3);
  const hargaMulai = Math.min(...paket.map((p) => p.harga));

  return (
    <>
      <Client />
      <Nav />

      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-bg px-4 py-20 sm:px-6 sm:py-28">
          <div
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #fef9ee 0%, transparent 70%)" }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-xs font-medium tracking-[0.4em] text-gold uppercase">
              {site.brand} · {site.tagline}
            </p>
            <h1 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
              Undangan Digital yang
              <span className="font-script text-gold"> Berkesan</span> untuk
              Hari Spesialmu
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Pilih desain dari katalog, isi data acara, kami yang buatkan.
              Link undangan premium dikirim langsung ke WhatsApp-mu — tanpa
              cetak, tanpa ribet.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/katalog"
                className="w-full rounded-full bg-ink px-8 py-4 font-medium text-white transition-colors hover:bg-gold sm:w-auto"
              >
                Lihat Katalog Desain
              </Link>
              <a
                href={waLink("Halo, saya mau tanya tentang undangan digital.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full border border-gold px-8 py-4 font-medium text-gold transition-colors hover:bg-gold-pale sm:w-auto"
              >
                Tanya via WhatsApp
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Mulai <span className="font-semibold text-gold">{rupiah(hargaMulai)}</span> ·
              jadi 1–3 hari · revisi sampai puas
            </p>
          </div>
        </section>

        {/* ============ CONTOH UNDANGAN ============ */}
        <section className="reveal bg-card px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-serif text-3xl sm:text-4xl">
              Contoh Undangan
            </h2>
            <p className="mt-3 text-center text-ink-soft">
              Klik untuk lihat preview langsung — persis seperti yang pelangganmu terima.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {unggulan.map((d) => (
                <Link
                  key={d.slug}
                  href={d.previewLive ? `/undangan/${d.slug}` : "/katalog"}
                  className="group rounded-2xl border border-border bg-bg p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`flex h-40 items-center justify-center rounded-xl ${
                      d.tema === "elegan"
                        ? "bg-[#1c1917] text-[#c9a227]"
                        : d.tema === "floral"
                          ? "bg-[#f3ece1] text-[#b07d62]"
                          : "bg-[#0f3d33] text-[#d4af37]"
                    }`}
                  >
                    <span className="font-script text-5xl">{d.nama.split(" ")[0]}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl group-hover:text-gold">
                    {d.nama}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{d.kategori}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HARGA / PAKET ============ */}
        <section id="harga" className="reveal px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-serif text-3xl sm:text-4xl">
              Daftar Harga
            </h2>
            <p className="mt-3 text-center text-ink-soft">
              Tiga paket, satu kualitas. Bayar sekali di awal, tanpa biaya tersembunyi.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {paket.map((p) => (
                <div
                  key={p.id}
                  className={`relative flex flex-col rounded-2xl border bg-card p-8 ${
                    p.populer ? "border-gold shadow-lg" : "border-border"
                  }`}
                >
                  {p.populer && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-semibold tracking-wide text-white">
                      Paling Diminati
                    </span>
                  )}
                  <h3 className="font-serif text-2xl">{p.nama}</h3>
                  <p className="mt-3 font-serif text-4xl text-gold">
                    {rupiah(p.harga)}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {p.revisi} · jadi {p.jadi}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {p.fitur.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-gold" aria-hidden>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/order?paket=${p.id}`}
                    className={`mt-8 rounded-full py-3 text-center font-medium transition-colors ${
                      p.populer
                        ? "bg-gold text-white hover:opacity-90"
                        : "border border-ink text-ink hover:bg-ink hover:text-white"
                    }`}
                  >
                    Pilih {p.nama}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CARA ORDER ============ */}
        <section className="reveal bg-card px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-serif text-3xl sm:text-4xl">
              Cara Order
            </h2>
            <p className="mt-3 text-center text-ink-soft">
              Empat langkah sederhana, selesai.
            </p>
            <ol className="mt-10 space-y-8">
              {langkahOrder.map((l) => (
                <li key={l.no} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-pale font-serif text-xl text-gold">
                    {l.no}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl">{l.judul}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{l.isi}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 text-center">
              <Link
                href="/cara-order"
                className="text-sm font-medium text-gold underline underline-offset-4 hover:text-gold-soft"
              >
                Detail cara order & pembayaran →
              </Link>
            </div>
          </div>
        </section>

        {/* ============ TESTIMONI (hanya tampil kalau ada testimoni asli) ============ */}
        {testimoni.length > 0 && (
        <section className="reveal px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-serif text-3xl sm:text-4xl">
              Kata Mereka
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {testimoni.map((t) => (
                <figure
                  key={t.nama}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <span className="font-script text-3xl text-gold" aria-hidden>“</span>
                  <blockquote className="mt-2 text-sm leading-relaxed">
                    {t.isi}
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-medium">{t.nama}</span>
                    <span className="block text-ink-soft">{t.acara}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* ============ CTA ============ */}
        <section className="reveal bg-ink px-4 py-20 text-center text-white sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl">
            Siap Bikin Undanganmu?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            Chat sekarang, atau langsung isi form order. Kami balas jam 08.00–21.00 WIB.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink("Halo, saya mau order undangan digital.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-gold px-8 py-4 font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Chat WhatsApp Sekarang
            </a>
            <Link
              href="/order"
              className="w-full rounded-full border border-white/40 px-8 py-4 font-medium transition-colors hover:bg-white/10 sm:w-auto"
            >
              Isi Form Order
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
