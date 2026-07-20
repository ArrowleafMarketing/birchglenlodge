import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The legacy WordPress site served URLs with trailing slashes; keep them to
  // preserve indexed URLs (e.g. /about/, /rooms/) for SEO continuity.
  trailingSlash: true,
  images: {
    // Serve smaller, modern formats where the browser supports them (better LCP).
    formats: ["image/avif", "image/webp"],
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
    ];
  },
};

export default nextConfig;
