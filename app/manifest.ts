import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UndanganKu — Undangan Digital",
    short_name: "UndanganKu",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#a16207",
  };
}
