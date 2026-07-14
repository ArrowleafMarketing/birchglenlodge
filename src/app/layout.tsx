import type { Metadata } from "next";
import { Manrope, EB_Garamond } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Echoes the serif wordmark in the Birch Glen logo; used for display headings.
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thebirchglenlodge.com"),
  title: {
    default: "Birch Glen Lodge & Motel | A Serene Mountain Getaway in Cascade, Idaho",
    template: "%s | Birch Glen Lodge",
  },
  description:
    "Established in 1968, Birch Glen Lodge & Motel is a serene mountain getaway in Cascade, Idaho — steps from Lake Cascade and next door to Kelly's Whitewater Park.",
  keywords: [
    "Birch Glen Lodge",
    "Cascade Idaho lodging",
    "Lake Cascade motel",
    "Kelly's Whitewater Park",
    "Idaho mountain getaway",
  ],
  openGraph: {
    title: "Birch Glen Lodge & Motel",
    description:
      "A serene mountain getaway in Cascade, Idaho — steps from Lake Cascade and next door to Kelly's Whitewater Park.",
    url: "https://thebirchglenlodge.com",
    siteName: "Birch Glen Lodge",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${ebGaramond.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
