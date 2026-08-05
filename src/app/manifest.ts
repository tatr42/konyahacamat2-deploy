import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: "Hacamat ve sülük terapisi eğitim programları — Ebusadullah Akademi",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7fb",
    theme_color: "#0b2545",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
