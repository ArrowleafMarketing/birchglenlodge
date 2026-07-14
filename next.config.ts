import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The legacy WordPress site served URLs with trailing slashes; keep them to
  // preserve indexed URLs (e.g. /about/, /rooms/) for SEO continuity.
  trailingSlash: true,
  async redirects() {
    return [
      // The old contact page lived at /contact-us; permanently point it at /contact.
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
