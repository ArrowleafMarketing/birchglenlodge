import type { MetadataRoute } from "next";
import { site, SITE_KEY } from "@/lib/site";
import { getPosts } from "@/lib/blog/posts";

const BASE = site.url;

// Build-time timestamp; refreshed on every deploy (this file is statically
// cached). Swap for per-route dates if pages ever get individual edit times.
const lastModified = new Date();

// trailingSlash:true -> every path MUST end in "/" so each sitemap URL matches
// the canonical, redirect-free form of the route. Priorities are tiered for a
// lodging brochure site (home highest, conversion pages next, legal lowest).
// NOTE: /guide-to-cascade/, /trails/ and /rivers-lakes-hot-springs/ were retired
// and now 30x-redirect to /explore-cascade/, so they are intentionally absent.
type Entry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

const entries: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/rooms/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/explore-cascade/", priority: 0.7, changeFrequency: "weekly" },
  { path: "/gallery/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy-policy/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-service/", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = entries.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${BASE}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  // Blog posts are dynamic (Supabase, ISR). Enumerate the currently published
  // ones so each has a canonical sitemap entry. Returns [] when the CMS is
  // configured with no posts yet.
  const posts = await getPosts(SITE_KEY);
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/explore-cascade/${p.slug}/`,
    lastModified: p.publishedAtISO ? new Date(p.publishedAtISO) : lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
