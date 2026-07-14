import type { Metadata } from "next";
import { Manrope, Lora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://thebirchglenlodge.com"),
  title: {
    default: "Birch Glen Lodge & Motel | A Serene Mountain Getaway in Cascade, Idaho",
    template: "%s - Birch Glen Lodge",
  },
  description:
    "Established in 1968, Birch Glen Lodge & Motel is a serene mountain getaway in Cascade, Idaho — steps from Lake Cascade and next door to Kelly's Whitewater Park.",
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
    <html lang="en" className={`${manrope.variable} ${lora.variable} h-full`}>
      {/* Header is fixed + transparent, so content sits underneath it from the top. */}
      <body className="min-h-full flex flex-col bg-white text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
