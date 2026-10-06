import Link from "next/link";
import { site, waLink } from "@/lib/content";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-script text-2xl text-gold">U</span>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">
            {site.brand}
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm sm:gap-4">
          <Link
            href="/katalog"
            className="hidden rounded-full px-3 py-2 text-ink-soft transition-colors hover:text-gold sm:block"
          >
            Katalog
          </Link>
          <Link
            href="/cara-order"
            className="hidden rounded-full px-3 py-2 text-ink-soft transition-colors hover:text-gold sm:block"
          >
            Cara Order
          </Link>
          <Link
            href="/order"
            className="rounded-full border border-gold px-4 py-2 font-medium text-gold transition-colors hover:bg-gold-pale"
          >
            Order
          </Link>
          <a
            href={waLink("Halo, saya mau tanya tentang undangan digital.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-4 py-2 font-medium text-white transition-colors hover:bg-gold"
          >
            WhatsApp
          </a>
        </div>
      </nav>
    </header>
  );
}
