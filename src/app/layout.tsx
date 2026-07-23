import type { Metadata, Viewport } from "next";
import { Manrope, Lora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { JsonLd, siteJsonLd } from "@/lib/seo";

// Manrope = body/UI; Lora = serif display headings (matches the live site).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Home/default description. Individual pages override the title + description via
// pageMetadata(); this is the fallback and the home page's own copy.
const HOME_TITLE = "Birch Glen Lodge & Motel | Lodging in Cascade, Idaho";
const HOME_DESCRIPTION =
  "Established in 1968, Birch Glen Lodge & Motel is a serene mountain getaway in Cascade, Idaho — steps from Lake Cascade, next to Kelly's Whitewater Park.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: HOME_TITLE,
    // Fallback suffix for any page that sets a bare string title. Pages built
    // with pageMetadata() use title.absolute, so this rarely applies.
    template: "%s | Birch Glen Lodge",
  },
  description: HOME_DESCRIPTION,
  applicationName: site.fullName,
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  publisher: site.fullName,
  keywords: [
    "Birch Glen Lodge",
    "Birch Glen Lodge & Motel",
    "Cascade Idaho lodging",
    "Cascade Idaho motel",
    "Lake Cascade lodging",
    "hotel near Lake Cascade",
    "Kelly's Whitewater Park lodging",
    "Valley County Idaho lodging",
    "ice fishing Cascade Idaho",
    "mountain getaway Idaho",
  ],
  // Explicit tel:/mailto links are used throughout, so suppress iOS auto-linking
  // of plain-text numbers/addresses (avoids inconsistent styling).
  formatDetection: { telephone: false, address: false, email: false },
  // Favicon set lives in /public/meta (generated bundle). The .ico is served
  // from app/favicon.ico via Next's root-favicon convention (covers bare
  // /favicon.ico requests + the legacy `sizes="any"` link); the modern PNGs +
  // apple-touch icon are declared here. Android/PWA icons live in manifest.ts.
  icons: {
    icon: [
      { url: "/meta/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/meta/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/meta/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: `${site.url}/`,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: `${site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Aerial view of Birch Glen Lodge & Motel beside Lake Cascade in Cascade, Idaho",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birch Glen Lodge & Motel",
    description: HOME_DESCRIPTION,
    images: [`${site.url}/og-image.jpg`],
  },
  // Google Search Console / Bing verification tokens can be added here once issued:
  // verification: { google: "…", other: { "msvalidate.01": "…" } },
};

export const viewport: Viewport = {
  themeColor: "#af6339",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${lora.variable} h-full`}>
      {/* Header is fixed + transparent, so content sits underneath it from the top. */}
      <body className="min-h-full flex flex-col bg-white text-ink">
        {/* Site-wide structured data: the LodgingBusiness/Motel entity + WebSite,
            referenced by @id from per-page breadcrumb/room/gallery nodes. */}
        <JsonLd data={siteJsonLd()} />
        {/* Safety net: if JS is disabled, scroll-reveal elements can't be un-hidden,
            so force them visible. (Motion-OK users with JS get the animations;
            reduced-motion users are covered by the media query in globals.css.) */}
        <noscript>
          <style>{`.reveal,.reveal-img{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
