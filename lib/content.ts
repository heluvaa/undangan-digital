// ============================================================
// KONTEN UTAMA — semua teks, harga, dan data ada di file ini.
// Edit di sini, tidak perlu sentuh komponen.
// ============================================================

export const site = {
  brand: "Undangkan Aja",
  tagline: "Undangan Digital Custom",
  wa: "6281913711189", // ganti dengan nomor WhatsApp bisnis (format 62...)
  // PIN admin dibaca dari env ADMIN_KEY (tidak ikut ter-commit ke GitHub).
  // Set di .env.local (lokal) atau Vercel Project Settings > Environment Variables.
  adminKey: process.env.ADMIN_KEY ?? "",
  demo: false, // true = tampil badge DEMO di footer kalau ada konten contoh/karangan.
  deskripsi:
    "Jasa pembuatan undangan digital custom. Pilih desain favoritmu, kami buatkan, link jadinya dikirim via WhatsApp.",
};

export function waLink(pesan: string): string {
  return `https://wa.me/${site.wa}?text=${encodeURIComponent(pesan)}`;
}

// ---------- PAKET ----------
export type Paket = {
  id: "basic" | "premium" | "eksklusif";
  nama: string;
  harga: number; // rupiah, integer
  revisi: string;
  jadi: string;
  fitur: string[];
  populer?: boolean;
};

export const paket: Paket[] = [
  {
    id: "basic",
    nama: "Basic",
    harga: 50_000,
    revisi: "1x revisi",
    jadi: "1–3 hari",
    fitur: [
      "1 template pilihan dari katalog",
      "Data standar (nama, tanggal, lokasi, peta)",
      "Countdown, galeri foto, RSVP & ucapan",
      "Amplop digital",
      "Link undangan aktif 3 bulan",
    ],
  },
  {
    id: "premium",
    nama: "Premium",
    harga: 100_000,
    revisi: "3x revisi",
    jadi: "1–3 hari",
    populer: true,
    fitur: [
      "Custom warna & layout dari template",
      "Semua fitur paket Basic",
      "Musik latar (opsional)",
      "Galeri foto lebih banyak",
      "Link undangan aktif 6 bulan",
    ],
  },
  {
    id: "eksklusif",
    nama: "Eksklusif",
    harga: 150_000,
    revisi: "Revisi sampai cocok",
    jadi: "1–3 hari",
    fitur: [
      "Desain semi-custom sesuai request",
      "Konsultasi konsep via WhatsApp",
      "Semua fitur paket Premium",
      "Nama tamu personal (optional)",
      "Link undangan aktif 1 tahun",
    ],
  },
];

export function hargaPaket(id: string): number {
  return paket.find((p) => p.id === id)?.harga ?? 0;
}

export function rupiah(n: number): string {
  // format manual, tanpa locale
  const s = String(n);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ".";
    out += s[i];
  }
  return `Rp ${out}`;
}

// ---------- KATALOG DESAIN ----------
export type Kategori = "Wedding" | "Khitanan" | "Tasyakuran" | "Ulang Tahun";
export type Tema = "elegan" | "floral" | "khitanan";

export type Design = {
  slug: string;
  nama: string;
  kategori: Kategori;
  tema: Tema;
  deskripsi: string;
  previewLive: boolean; // true = ada halaman preview lengkap /undangan/[slug]
  aktif: boolean;
};

export const designs: Design[] = [
  {
    slug: "wedding-elegan",
    nama: "Wedding Elegan",
    kategori: "Wedding",
    tema: "elegan",
    deskripsi:
      "Nuansa charcoal & emas, tipografi serif klasik. Cocok untuk resepsi formal & mewah.",
    previewLive: true,
    aktif: true,
  },
  {
    slug: "wedding-floral",
    nama: "Wedding Floral",
    kategori: "Wedding",
    tema: "floral",
    deskripsi:
      "Latar krem lembut dengan ornamen bunga. Hangat, romantis, cocok untuk garden & intimate wedding.",
    previewLive: true,
    aktif: true,
  },
  {
    slug: "khitanan",
    nama: "Khitanan Islami",
    kategori: "Khitanan",
    tema: "khitanan",
    deskripsi:
      "Hijau zamrud & emas dengan ornamen geometri islami. Elegan untuk walimatul khitan.",
    previewLive: true,
    aktif: true,
  },
  {
    slug: "tasyakuran",
    nama: "Tasyakuran Klasik",
    kategori: "Tasyakuran",
    tema: "elegan",
    deskripsi:
      "Desain simpel berwibawa untuk aqiqah, syukuran, dan pengajian. Preview contoh via WhatsApp.",
    previewLive: false,
    aktif: true,
  },
  {
    slug: "ulang-tahun",
    nama: "Ulang Tahun Ceria",
    kategori: "Ulang Tahun",
    tema: "floral",
    deskripsi:
      "Warna pastel ceria untuk pesta ulang tahun anak & dewasa. Preview contoh via WhatsApp.",
    previewLive: false,
    aktif: true,
  },
];

export const kategoriList: Kategori[] = [
  "Wedding",
  "Khitanan",
  "Tasyakuran",
  "Ulang Tahun",
];

// ---------- CARA ORDER ----------
export const langkahOrder = [
  {
    no: "1",
    judul: "Pilih desain & paket",
    isi: "Lihat katalog, tentukan desain favorit dan paket yang sesuai kebutuhanmu.",
  },
  {
    no: "2",
    judul: "Isi form order",
    isi: "Isi data acara: nama, tanggal, lokasi, link Google Maps, dan request lainnya.",
  },
  {
    no: "3",
    judul: "Bayar & konfirmasi",
    isi: "Transfer atau scan QRIS sesuai nominal paket, lalu konfirmasi bukti bayar via WhatsApp.",
  },
  {
    no: "4",
    judul: "Terima link undangan",
    isi: "Kami buatkan 1–3 hari. Link undangan digitalmu dikirim via WhatsApp, siap dibagikan.",
  },
];

// ---------- PEMBAYARAN (manual) ----------
// REKENING BANK: isi dengan data asli. SELAGI KOSONG, tidak ditampilkan —
// tidak ada uang customer yang nyasar ke nomor palsu.
//   { bank: "BCA", noRek: "1234567890", atasNama: "Nama Sesuai Rekening" },
// E-WALLET: nomor tujuan transfer (DANA, GoPay, OVO, ShopeePay).
// QRIS: file gambar hasil crop di public/qris.png.
export const pembayaran = {
  rekening: [] as { bank: string; noRek: string; atasNama: string }[],
  ewallet: [{ nama: "DANA", no: "081615680060", atasNama: "" }],
  qrisImage: "/qris.png",
  qrisNote:
    "Scan kode QRIS di atas dengan aplikasi bank/e-wallet apa pun. Periksa nama penerima sebelum bayar. Mau versi gambar via WhatsApp? Chat kami.",
  catatan: [
    "Pembayaran dilakukan di awal, sebelum undangan dikerjakan.",
    "Kirim bukti transfer via WhatsApp, disertai kode order dari form.",
    "Revisi mengikuti paket yang dipilih. Tambah revisi di luar paket bisa dibicarakan.",
  ],
};

// ---------- TESTIMONI ----------
// ISI DENGAN TESTIMONI ASLI dari pelangganmu — dan minta izin dulu sebelum
// pakai nama asli mereka. SELAGI KOSONG, bagian testimoni tidak tampil sama
// sekali. Menampilkan testimoni karangan di website jualan = iklan menyesatkan
// (UU ITE / UU Perlindungan Konsumen), jangan pernah isi dengan karangan.
//   { nama: "Rina & Dimas", acara: "Wedding, Bandung", isi: "…" },
export const testimoni = [] as {
  nama: string;
  acara: string;
  isi: string;
}[];
