import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ReviewFlow } from "@/components/review-flow";

/*
  Private post-stay review link, sent to a guest directly after their stay.

  Intentionally NOT built with pageMetadata(): that helper adds a canonical URL
  and Open Graph/Twitter cards for pages meant to be found and shared, and this
  page is neither. It is unlisted (absent from primaryNav, the footer and
  sitemap.ts) and marked noindex/nofollow — the only way in is the link the
  lodge sends.
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
  return (
    // The site header is fixed and transparent, so clear it with top padding
    // the way Hero does (pt-44) — scaled down since there is no hero image.
    <Container className="max-w-[720px] pb-20 pt-32 sm:pt-40">
      <ReviewFlow />
    </Container>
  );
}
