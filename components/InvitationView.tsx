// ============================================================
// TEMPLATE UNDANGAN — 3 tema (elegan, floral, khitanan).
// Semua data datang dari lib/undangan.ts. Tampilan konsisten
// antar tema, hanya palet & ornamen yang berubah.
// ============================================================

import Countdown from "./Countdown";
import UcapanForm from "./UcapanForm";
import type { InvitationData } from "@/lib/undangan";

const temaStyle = {
  elegan: {
    coverBg: "bg-[#1c1917]",
    coverInk: "text-[#f5f1e8]",
    accent: "text-[#c9a227]",
    accentHex: "#c9a227",
    sectionBg: "bg-[#fafaf9]",
    panel: "bg-white",
    border: "border-[#d6d3d1]",
    frame: "border-[#c9a227]/40",
    chip: "bg-[#fdf8ec] text-[#a16207]",
    orn: "❦",
  },
  floral: {
    coverBg: "bg-[#f3ece1]",
    coverInk: "text-[#5c4a3d]",
    accent: "text-[#b07d62]",
    accentHex: "#b07d62",
    sectionBg: "bg-[#faf6f0]",
    panel: "bg-white",
    border: "border-[#e5d5c8]",
    frame: "border-[#b07d62]/40",
    chip: "bg-[#f7ede6] text-[#8a5a41]",
    orn: "❀",
  },
  khitanan: {
    coverBg: "bg-[#0f3d33]",
    coverInk: "text-[#f2ead8]",
    accent: "text-[#d4af37]",
    accentHex: "#d4af37",
    sectionBg: "bg-[#f6f4ee]",
    panel: "bg-white",
    border: "border-[#d8d2c2]",
    frame: "border-[#d4af37]/50",
    chip: "bg-[#eef3ef] text-[#0f3d33]",
    orn: "✦",
  },
} as const;

function tglID(iso: string): string {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const d = new Date(`${iso}T00:00:00Z`);
  return `${d.getUTCDate()} ${bulan[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function inisial(nama: string): string {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function InvitationView({ data }: { data: InvitationData }) {
  const t = temaStyle[data.tema];
  const namaUtama = data.tokoh.map((x) => x.nama.split(" ")[0]).join(" & ");

  return (
    <article className="mx-auto max-w-2xl">
      {/* ================= COVER ================= */}
      <section
        className={`grain relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center ${t.coverBg} ${t.coverInk}`}
      >
        <div
          className={`vine pointer-events-none absolute inset-6 border ${t.frame}`}
          aria-hidden
        />
        <p className="relative text-xs font-medium tracking-[0.45em] uppercase">
          {data.judulCover}
        </p>
        <h1 className="relative mt-6 font-script text-6xl leading-tight sm:text-7xl">
          {namaUtama}
        </h1>
        <p className={`relative mt-4 font-serif text-xl ${t.accent}`}>
          {tglID(data.tanggalAcara)}
        </p>
        <p className="relative mt-10 max-w-sm text-sm leading-relaxed opacity-80">
          {data.salam}
        </p>
        <p className={`relative mt-8 text-3xl ${t.accent}`} aria-hidden>
          {t.orn}
        </p>
      </section>

      {/* ================= AYAT / SALAM ================= */}
      {data.ayat && (
        <section className={`px-6 py-14 text-center ${t.sectionBg}`}>
          <div className="ornament mx-auto max-w-xs">
            <span className="text-xs tracking-[0.3em] uppercase">Doa</span>
          </div>
          <p className="mx-auto mt-6 max-w-lg font-serif text-lg leading-relaxed italic">
            {data.ayat}
          </p>
        </section>
      )}

      {/* ================= TOKOH ================= */}
      <section className={`px-6 py-14 ${t.sectionBg}`}>
        <h2 className="text-center font-script text-4xl">Mempelai</h2>
        <div className="mt-10 flex flex-col items-center gap-10">
          {data.tokoh.map((x) => (
            <div key={x.nama} className="flex flex-col items-center text-center">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full border-2 ${t.frame} ${t.panel} font-serif text-2xl ${t.accent}`}
              >
                {inisial(x.nama)}
              </div>
              <p className="mt-4 text-xs tracking-[0.25em] text-ink-soft uppercase">
                {x.label}
              </p>
              <p className="mt-1 font-serif text-3xl">{x.nama}</p>
              {x.ortu && (
                <p className="mt-2 max-w-xs text-sm text-ink-soft">{x.ortu}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= COUNTDOWN ================= */}
      <section className={`border-y ${t.border} px-6 py-14 ${t.panel}`}>
        <p className="text-center text-xs font-medium tracking-[0.3em] text-ink-soft uppercase">
          Menghitung Hari
        </p>
        <h2 className="mt-2 text-center font-script text-4xl">Save The Date</h2>
        <div className="mt-8">
          <Countdown iso={data.tanggalAcara} />
        </div>
      </section>

      {/* ================= DETAIL ACARA + PETA ================= */}
      <section className={`px-6 py-14 ${t.sectionBg}`}>
        <h2 className="text-center font-script text-4xl">Waktu & Tempat</h2>
        <div className="mt-8 space-y-6">
          {data.acara.map((a) => (
            <div
              key={a.nama}
              className={`rounded-2xl border ${t.border} ${t.panel} p-6 text-center shadow-sm`}
            >
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${t.chip}`}>
                {a.nama}
              </span>
              <p className="mt-4 font-serif text-2xl">{tglID(a.tanggal)}</p>
              <p className="mt-1 text-sm text-ink-soft">{a.waktu}</p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed">{a.alamat}</p>
              <a
                href={a.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold-pale"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Buka Google Maps
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ================= KISAH ================= */}
      {data.kisah && data.kisah.length > 0 && (
        <section className={`border-y ${t.border} px-6 py-14 ${t.panel}`}>
          <h2 className="text-center font-script text-4xl">Kisah Kami</h2>
          <ol className="mx-auto mt-8 max-w-md space-y-8">
            {data.kisah.map((k) => (
              <li key={k.tahun + k.judul} className="relative border-l pl-6" style={{ borderColor: t.accentHex }}>
                <span
                  className="absolute -left-[7px] top-1 h-3 w-3 rounded-full"
                  style={{ background: t.accentHex }}
                  aria-hidden
                />
                <p className="text-xs tracking-[0.2em] text-ink-soft">{k.tahun}</p>
                <p className="mt-1 font-serif text-xl">{k.judul}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{k.isi}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ================= GALERI ================= */}
      {data.galeri.length > 0 && (
        <section className={`px-6 py-14 ${t.sectionBg}`}>
          <h2 className="text-center font-script text-4xl">Galeri</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.galeri.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`Galeri ${namaUtama}`}
                loading="lazy"
                className={`aspect-[3/4] w-full rounded-lg border ${t.border} object-cover`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= RSVP / UCAPAN ================= */}
      {data.rsvpBuka && (
        <section className={`border-y ${t.border} px-6 py-14 ${t.panel}`}>
          <h2 className="text-center font-script text-4xl">RSVP & Ucapan</h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-ink-soft">
            Mohon konfirmasi kehadiran dan tinggalkan doa terbaikmu.
          </p>
          <UcapanForm undangan={data.slug} />
        </section>
      )}

      {/* ================= AMPLOP DIGITAL ================= */}
      <section className={`px-6 py-14 ${t.sectionBg}`}>
        <h2 className="text-center font-script text-4xl">Amplop Digital</h2>
        <p className="mx-auto mt-3 max-w-sm text-center text-sm text-ink-soft">
          Bagi yang ingin mengirim tanda kasih, dapat melalui rekening berikut.
        </p>
        <div className="mx-auto mt-8 max-w-md space-y-4">
          {data.amplop.map((a) => (
            <div
              key={a.noRek}
              className={`amplop-btn rounded-2xl border ${t.border} ${t.panel} p-5 text-center`}
            >
              <p className="text-xs font-medium tracking-[0.25em] text-ink-soft uppercase">
                {a.bank}
              </p>
              <p className="mt-2 font-serif text-2xl tracking-widest tabular-nums">{a.noRek}</p>
              <p className="mt-1 text-sm text-ink-soft">a.n. {a.atasNama}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PENUTUP ================= */}
      <section className={`grain relative px-6 py-16 text-center ${t.coverBg} ${t.coverInk}`}>
        <p className={`font-script text-4xl ${t.accent}`}>Terima Kasih</p>
        {data.catatanKaki && (
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed opacity-80">
            {data.catatanKaki}
          </p>
        )}
        <p className="mt-10 text-xs tracking-[0.3em] opacity-60 uppercase">
          {namaUtama} · {tglID(data.tanggalAcara)}
        </p>
      </section>
    </article>
  );
}
