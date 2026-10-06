import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Client from "@/components/Client";
import InvitationView from "@/components/InvitationView";
import { undanganDemo } from "@/lib/undangan";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(undanganDemo).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = undanganDemo[slug];
  if (!d) return {};
  const nama = d.tokoh.map((t) => t.nama).join(" & ");
  return {
    title: `${d.judulCover} ${nama}`,
    description: d.salam,
  };
}

export default async function UndanganPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = undanganDemo[slug];
  if (!data) notFound();

  return (
    <>
      <Client />
      <InvitationView data={data} />
    </>
  );
}
