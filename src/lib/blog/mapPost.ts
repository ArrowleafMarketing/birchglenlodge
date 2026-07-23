import type { PostRecord } from "./schema";
import type { BlogPost } from "./types";

// Local fallbacks for when a CMS row omits an image, so next/image never gets an
// empty src (which throws). These files exist in /public/images.
const FALLBACK_HERO = "/images/104-River-scaled.jpg";
const FALLBACK_AVATAR = "/images/BIRCH-40.jpg";

/**
 * Convert a DB-style record into the UI-friendly BlogPost shape. This lets the
 * website stay stable while storage evolves (mock -> Supabase -> anything else).
 *
 * Defensive by design: the `posts` table is owned by a separate CMS and read
 * with an untyped `select("*")`, so columns can be null/renamed despite the
 * PostRecord type. We coalesce anything that flows into rendering (content,
 * images, dates) so a malformed row degrades instead of throwing a 500.
 */
export function recordToBlogPost(r: PostRecord): BlogPost {
  const parsed = new Date(r.published_at);
  const validDate = !Number.isNaN(parsed.getTime());
  const publishedAtPretty = validDate
    ? parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC", // format server-side deterministically (no locale/tz drift)
      })
    : "";

  return {
    siteKey: r.site_key as BlogPost["siteKey"],
    slug: r.slug,

    title: r.title,
    excerpt: r.excerpt ?? "",
    publishedAt: publishedAtPretty,
    // Empty (not garbage) when the date is missing/invalid, so <time>, JSON-LD
    // datePublished and OG publishedTime can be omitted rather than emit "Invalid Date".
    publishedAtISO: validDate ? r.published_at : "",
    readTime: r.read_time,
    categoryLabel: r.category_label,

    // Root -> section. The post page renders these and shows the title itself
    // as the current (unlinked) crumb.
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Explore Cascade", href: "/explore-cascade" },
    ],

    author: {
      name: r.author_name ?? "Birch Glen Lodge",
      title: r.author_title ?? "",
      avatarSrc: r.author_avatar_src || FALLBACK_AVATAR,
      avatarAlt: r.author_avatar_alt ?? "",
    },

    heroImage: {
      src: r.hero_image_src || FALLBACK_HERO,
      alt: r.hero_image_alt ?? "",
    },

    content: r.content_md ?? "",
  };
}
