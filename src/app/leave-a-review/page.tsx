import type { Metadata } from "next";
import { ReviewFlow } from "@/components/review-flow";

/*
  Private post-stay review link, sent to a guest directly after their stay.

  Intentionally NOT built with pageMetadata(): that helper adds a canonical URL
  and Open Graph/Twitter cards for pages meant to be found and shared, and this
  page is neither. It is unlisted (absent from primaryNav, the footer and
  sitemap.ts) and marked noindex/nofollow — the only way in is the link the
  lodge sends.

  ReviewFlow renders as a full-screen lightbox (fixed, over a dimmed home hero),
  so it needs no Container or header clearance of its own — it covers the site
  chrome, and its X returns home.
*/
export const metadata: Metadata = {
  title: { absolute: "Leave a Review | Birch Glen Lodge" },
  description:
    "Tell us about your stay at Birch Glen Lodge & Motel in Cascade, Idaho.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function LeaveAReviewPage() {
  return <ReviewFlow />;
}
