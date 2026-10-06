import type { Metadata } from "next";
import Link from "next/link";
import Client from "@/components/Client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { designs, kategoriList, waLink, rupiah, hargaPaket } from "@/lib/content";

export const metadata: Metadata = {
  title: "Katalog Desain",
  description:
    "Galeri template undangan digital: wedding, khitanan, tasyakuran, ulang tahun. Preview langsung, harga transparan.",
};

export default function Katalog() {
  const aktif = designs.filter((d) => d.aktif);

  return (
    <>
      <Client />
      <Nav />
      <main className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <header className="text-center">
            <p className="text-xs font-medium tracking-[0.4em] text-gold uppercase">
              Katalog
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              Pilih Desain Favoritmu
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Semua desain bisa disesuaikan warna & layout di paket Premium ke atas.
              Harga tertera adalah harga paket Basic.
            </p>
          </header>

          {/* filter kategori */}
          <nav
            aria-label="Kategori"
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            <span className="rounded-full border border-gold bg-gold-pale px-4 py-2 text-sm font-medium text-gold">
              Semua ({aktif.length})
            </span>
            {kategoriList.map((k) => {
              const n = aktif.filter((d) => d.kategori === k).length;
              return (
                <span
                  key={k}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-ink-soft"
                >
                  {k} ({n})
                </span>
              );
            })}
          </nav>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aktif.map((d) => (
              <article
                key={d.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-80 overflow-hidden bg-muted">
                  <img
                    src={`/mockup/${d.slug}.svg`}
                    alt={`Preview ${d.nama}`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
                    {d.kategori}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl">{d.nama}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {d.deskripsi}
                  </p>
                  <p className="mt-4 text-sm">
                    <span className="font-semibold text-gold">
                      {rupiah(hargaPaket("basic"))}
                    </span>
                    <span className="text-ink-soft"> — paket Basic</span>
                  </p>
                  <div className="mt-4 flex gap-2">
                    {d.previewLive ? (
                      <Link
                        href={`/undangan/${d.slug}`}
                        className="flex-1 rounded-full border border-ink py-2.5 text-center text-sm font-medium transition-colors hover:bg-ink hover:text-white"
                      >
                        Preview
                      </Link>
                    ) : (
                      <a
                        href={waLink(
                          `Halo, saya mau lihat preview contoh desain "${d.nama}".`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-full border border-ink py-2.5 text-center text-sm font-medium transition-colors hover:bg-ink hover:text-white"
                      >
                        Minta Preview
                      </a>
                    )}
                    <Link
                      href={`/order?design=${d.slug}`}
                      className="flex-1 rounded-full bg-gold py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Order
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
