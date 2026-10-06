# UndanganKu — Jasa Undangan Digital

Website bisnis jasa pembuatan undangan digital custom. Customer pilih desain dari
katalog, isi form order, bayar transfer/QRIS, lalu pemilik buatkan undangannya
manual dan kirim link via WhatsApp.

## Stack

- Next.js 15 (App Router) + Tailwind 4 + TypeScript strict
- Tanpa UI kit, tanpa payment gateway — order disimpan di `data/*.json`
- Pembayaran manual (transfer/QRIS + konfirmasi WhatsApp)

## Jalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Butuh filesystem persisten (`data/orders.json`). Kalau deploy serverless
(Vercel/Netlify), ganti `lib/orders.ts` ke database (Postgres/SQLite).

## Route

| Route | Isi |
| --- | --- |
| `/` | Landing: hero, contoh, harga, cara order, testimoni, CTA WA |
| `/katalog` | Galeri desain (wedding, khitanan, tasyakuran, ulang tahun) |
| `/order` | Form order → tersimpan → kode order → CTA konfirmasi WA |
| `/cara-order` | Tahapan + rekening/QRIS + konfirmasi |
| `/undangan/[slug]` | Preview 3 template: `wedding-elegan`, `wedding-floral`, `khitanan` |
| `/admin` | Daftar order + toggle status (baru/dibayar/dikerjakan/selesai) |

## EDIT PER ORDER (kerjaan utama)

Semua data undangan ada di **`lib/undangan.ts`** — nama, tanggal, foto, lokasi,
rekening, dsb. Untuk order pelanggan baru:

1. Salin satu blok `undanganDemo["wedding-elegan"]` → ubah jadi `undangan["kode-order"]`
   (atau cukup timpa isinya untuk sekarang).
2. Ganti field `tokoh`, `tanggalAcara`, `acara`, `amplop`, dll.
3. Foto: taruh di `public/foto/` lalu isi `galeri: ["/foto/nama.jpg"]`.
   Kalau `galeri` dikosongkan, tampil monogram inisial.
4. Tambah slug-nya di `generateStaticParams` atau ubah jadi fetch dinamis.

Teks situs, harga, paket, nomor WA, rekening: **`lib/content.ts`**.

## WAJIB GANTI SEBELUM LIVE

- [ ] `lib/content.ts` → `site.wa` (nomor WhatsApp bisnis)
- [ ] `lib/content.ts` → `site.adminKey` (PIN `/admin` — jangan pakai default)
- [ ] `lib/content.ts` → `pembayaran.rekening` (nomor rekening asli)
- [ ] `lib/content.ts` → `site.demo = false` setelah testimoni diganti data asli
- [ ] `app/layout.tsx` → `metadataBase` + `app/robots.ts` + `app/sitemap.ts`
      (ganti `https://undanganku.example.com` dengan domain asli)
- [ ] `public/foto/` → ganti SVG placeholder dengan foto asli
- [ ] Testimoni di `lib/content.ts` masih CONTOH — minta izin klien dulu
      sebelum pakai nama asli.

## Keamanan

- `GET /api/order` sengaja TIDAK mengekspos nomor WA customer.
- Harga dihitung ULANG server-side dari `lib/content.ts` — input harga client dibuang.
- PIN admin client-side hanya untuk UX; ganti ke session/cookie auth kalau
  sudah dipakai publik.
- `/admin` + `/api/*` di-`disallow` di `robots.ts`.
