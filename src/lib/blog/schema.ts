/*
  Storage shape: one row of the shared `posts` table as written by the blog
  management system. The website only ever reads these; the CMS owns writes.
  `recordToBlogPost` (mapPost.ts) converts this into the UI-friendly BlogPost so
  the pages stay stable even if storage columns change.
*/
export type PostRecord = {
  id: string; // uuid
  site_key: string; // multi-tenant key (must match SITE_KEY in lib/site.ts)

  slug: string;
  title: string;
  excerpt: string;

  // markdown body
  content_md: string;

  // ISO date in storage (UI formats it for display)
  published_at: string; // e.g. "2025-12-09"

  status?: string; // "published" | "draft"; the site only ever queries published

  category_label?: string;
  read_time?: string;

  hero_image_src: string;
  hero_image_alt: string;

  author_name: string;
  author_title: string;
  author_avatar_src: string;
  author_avatar_alt: string;

  created_at?: string;
  updated_at?: string;
};
