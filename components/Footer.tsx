import Link from "next/link";
import { site, waLink } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div>
            <p className="font-script text-3xl text-gold">{site.brand}</p>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">{site.deskripsi}</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <p className="font-semibold tracking-wide uppercase">Menu</p>
              <Link href="/katalog" className="text-ink-soft hover:text-gold">
                Katalog Desain
              </Link>
              <Link href="/order" className="text-ink-soft hover:text-gold">
                Form Order
              </Link>
              <Link href="/cara-order" className="text-ink-soft hover:text-gold">
                Cara Order & Bayar
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold tracking-wide uppercase">Kontak</p>
              <a
                href={waLink("Halo, saya mau tanya tentang undangan digital.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft hover:text-gold"
              >
                WhatsApp Admin
              </a>
              <span className="text-ink-soft">Balasan 08.00–21.00 WIB</span>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-border/60 pt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} {site.brand}. Dibuat dengan ketelitian untuk
          hari-hari spesial.
          {site.demo && (
            <span className="ml-2 rounded-full border border-gold/40 bg-gold-pale px-2 py-0.5 font-medium text-gold">
              DEMO — konten masih contoh
            </span>
          )}
        </p>
      </div>
    </footer>
  );
}
