import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Shared read-only Supabase client for the blog management system.

  The blog is multi-tenant: every site reads the same `posts` table filtered by
  `site_key` (see SITE_KEY in lib/site.ts). This client uses the public
  ("publishable"/anon) key and is only ever used for SELECTs of published posts.

  If the env vars are missing (e.g. before they've been added to the project),
  we export `null` instead of throwing so the blog degrades gracefully to the
  bundled mock content in lib/blog/posts.mock.tsx. Once the vars are present the
  real posts take over automatically, with no code change required.
*/
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
