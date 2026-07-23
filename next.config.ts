import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The legacy WordPress site served URLs with trailing slashes; keep them to
  // preserve indexed URLs (e.g. /about/, /rooms/) for SEO continuity.
  trailingSlash: true,
  images: {
    // Serve smaller, modern formats where the browser supports them (better LCP).
    formats: ["image/avif", "image/webp"],
    // Blog hero/author images come from the shared Supabase Storage (public
    // bucket) — same project host used across the Arrowleaf sites. If the CMS
    // ever serves images from a different host or a non-public path, add it here.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gnabrudmjsvjrvznwcfv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      // The old contact page lived at /contact-us; point it straight at the
      // trailing-slash target so it resolves in a single 308 hop.
      {
        source: "/contact-us",
        destination: "/contact/",
        permanent: true,
      },
      // "Guide To Cascade" was renamed to the "Explore Cascade" blog hub.
      // Permanent (308) so the rename passes SEO equity to the new URL.
      {
        source: "/guide-to-cascade",
        destination: "/explore-cascade/",
        permanent: true,
      },
      // The two old guide sub-pages fold into the blog hub FOR NOW as temporary
      // (307) redirects — they'll be repointed to their own published posts
      // (e.g. /explore-cascade/<slug>/) once those exist in the CMS, and a 307
      // won't get hard-cached the way a 308 would.
      {
        source: "/trails",
        destination: "/explore-cascade/",
        permanent: false,
      },
      {
        source: "/rivers-lakes-hot-springs",
        destination: "/explore-cascade/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
