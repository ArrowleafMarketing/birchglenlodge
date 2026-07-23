import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Web app manifest — powers the theme color, install/home-screen name, and icons.
// theme_color matches viewport.themeColor in layout.tsx (brand terracotta).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    description:
      "Established in 1968, Birch Glen Lodge & Motel is a serene mountain getaway in Cascade, Idaho.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#af6339",
    icons: [
      { src: "/meta/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/meta/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
