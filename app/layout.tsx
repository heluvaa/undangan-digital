import type { Metadata, Viewport } from "next";
import { Cormorant_Infant, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const cormorant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});
const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://undanganku.example.com"),
  title: {
    default: `${site.brand} — Jasa Undangan Digital Custom`,
    template: `%s — ${site.brand}`,
  },
  description:
    "Jasa pembuatan undangan digital custom: wedding, khitanan, tasyakuran, ulang tahun. Pilih desain, kami buatkan, kirim link via WhatsApp.",
  openGraph: {
    title: `${site.brand} — Jasa Undangan Digital Custom`,
    description:
      "Undangan digital premium custom. Wedding, khitanan, tasyakuran, ulang tahun. Mulai Rp 50.000.",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${montserrat.variable} ${vibes.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
