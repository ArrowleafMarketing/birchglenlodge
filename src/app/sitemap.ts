import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const BASE = site.url;

// Build-time timestamp; refreshed on every deploy (this file is statically
// cached). Swap for per-route dates if pages ever get individual edit times.
const lastModified = new Date();

// trailingSlash:true -> every path MUST end in "/" so each sitemap URL matches
// the canonical, redirect-free form of the route. Priorities are tiered for a
// lodging brochure site (home highest, conversion pages next, legal lowest).
type Entry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

const entries: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/rooms/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/guide-to-cascade/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/trails/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/rivers-lakes-hot-springs/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy-policy/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-service/", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
