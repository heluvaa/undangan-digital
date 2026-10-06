import type { MetadataRoute } from "next";
import { designs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://undanganku.example.com";
  const staticRoutes = ["", "/katalog", "/order", "/cara-order"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly" as const,
  }));
  const designRoutes = designs.map((d) => ({
    url: `${base}/undangan/${d.slug}`,
    changeFrequency: "weekly" as const,
  }));
  return [...staticRoutes, ...designRoutes];
}
