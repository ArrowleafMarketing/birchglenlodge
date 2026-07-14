import type { MetadataRoute } from "next";

const BASE = "https://thebirchglenlodge.com";

const routes = [
  "/",
  "/about/",
  "/rooms/",
  "/guide-to-cascade/",
  "/trails/",
  "/rivers-lakes-hot-springs/",
  "/gallery/",
  "/contact/",
  "/privacy-policy/",
  "/terms-of-service/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
