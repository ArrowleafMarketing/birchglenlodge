/*
  UI-facing blog types. `BlogPost` is what every page/component consumes; it is
  produced from a stored PostRecord by recordToBlogPost (mapPost.ts).
*/

// The tenant key for this site in the shared blog CMS. Kept as a literal so the
// mock content and SITE_KEY can't silently drift apart.
export type SiteKey = "birch-glen-lodge";

export type BlogPost = {
  siteKey: SiteKey;
  slug: string;

  // hero / meta
  title: string;
  excerpt: string; // used on listing cards
  publishedAt: string; // pretty, e.g. "December 9, 2025"
  publishedAtISO: string; // machine date for <time> + JSON-LD, e.g. "2025-12-09"
  readTime?: string; // e.g. "4 min read"
  categoryLabel?: string; // e.g. "GUIDE"

  breadcrumbs: { label: string; href?: string }[];

  author: {
    name: string;
    title: string;
    avatarSrc: string;
    avatarAlt: string;
  };

  heroImage: {
    src: string;
    alt: string;
  };

  // markdown body
  content: string;
};
