import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-script text-5xl text-gold">404</p>
      <h1 className="font-serif text-3xl">Halaman tidak ditemukan</h1>
      <p className="text-sm text-ink-soft">
        Link yang kamu buka mungkin salah atau sudah tidak aktif.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gold"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
