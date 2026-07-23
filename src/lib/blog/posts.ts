import { supabase } from "@/lib/supabase/client";
import { posts as mockPosts } from "@/lib/blog/posts.mock";
import type { BlogPost, SiteKey } from "@/lib/blog/types";
import type { PostRecord } from "@/lib/blog/schema";
import { recordToBlogPost } from "@/lib/blog/mapPost";

/*
  Read path for the blog.

  Mock content is ONLY a stand-in for when Supabase is NOT configured (local dev
  / preview before env vars are added) so the pages render populated. Once
  Supabase IS configured, the real table is the sole source of truth:
    - an empty result is a REAL empty state (listing shows "coming soon", unknown
      slugs 404), never silently replaced with mock;
    - a query error is logged and treated as empty, not as mock.
  This is deliberate: substituting fabricated posts on empty/error would mask a
  SITE_KEY mismatch or an unpublished CMS and could get mock URLs indexed.
*/

function mockFallback(siteKey: SiteKey): BlogPost[] {
  return mockPosts.filter((p) => p.siteKey === siteKey);
}

export async function getPosts(siteKey: SiteKey): Promise<BlogPost[]> {
  if (!supabase) return mockFallback(siteKey); // not configured -> dev stand-in

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("site_key", siteKey)
    .eq("status", "published")
    // nullsFirst:false keeps any dateless row from sorting to the very top.
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("Supabase getPosts error:", error.message);
    return []; // configured but errored -> real empty state, never mock
  }

  return (data ?? []).map((r) => recordToBlogPost(r as PostRecord));
}

export async function getPostBySlug(
  siteKey: SiteKey,
  slug: string,
): Promise<BlogPost | null> {
  if (!supabase) {
    return mockFallback(siteKey).find((p) => p.slug === slug) ?? null;
  }

  // limit(1) (not maybeSingle) so a duplicate published slug returns the newest
  // row instead of erroring the whole query.
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("site_key", siteKey)
    .eq("status", "published")
    .eq("slug", slug)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(1);

  if (error) {
    console.error("Supabase getPostBySlug error:", error.message);
    return null; // configured but errored -> 404, never mock
  }

  const row = data?.[0];
  return row ? recordToBlogPost(row as PostRecord) : null;
}
