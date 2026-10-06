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
        <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-bg via-gold-pale/20 to-bg px-4 py-24 sm:px-6">
          {/* Background pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.02]" 
               style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} 
               aria-hidden />
          
          <div
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #fef9ee 0%, transparent 70%)" }}
            aria-hidden
          />

          <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
              </span>
              <span className="text-ink-soft">Dipercaya 200+ klien di Indonesia</span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
              Undangan Digital <br className="hidden sm:inline"/>
              <span className="font-script text-gold">Elegan & Berkesan</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Hadirkan kesan pertama yang tak terlupakan. Undangan interaktif untuk pernikahan, 
              khitanan, akikah, dan acara spesial — mudah dibagikan, ramah lingkungan.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/katalog"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-10 font-medium text-gold-foreground shadow-lg shadow-gold/20 transition-all hover:scale-105 hover:bg-gold/90 hover:shadow-xl"
              >
                Lihat Katalog
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={waLink("Halo, saya mau konsultasi undangan digital")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full border-2 border-gold/30 bg-white/50 px-10 font-medium backdrop-blur-sm transition-all hover:scale-105 hover:border-gold hover:bg-white"
              >
                Konsultasi Gratis
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-ink-soft">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9 dari 5.0</span>
              </div>
              <div className="h-4 w-px bg-gold/20" />
              <span>Respon &lt;24 jam</span>
              <div className="h-4 w-px bg-gold/20" />
              <span>Mulai {rupiah(hargaMulai)}</span>
            </div>
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
