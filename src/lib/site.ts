export const site = {
  name: "Birch Glen Lodge",
  fullName: "Birch Glen Lodge & Motel",
  // Canonical production origin (no trailing slash) — single source of truth for
  // metadataBase, canonicals, the sitemap, and JSON-LD @id/url values.
  url: "https://thebirchglenlodge.com",
  founded: 1968, // "Established in 1968" — single source of truth for the "Years In Business" stat + copyright
  bookingUrl: "https://booking.thebirchglenlodge.com/",
  hosteevaUrl: "https://www.hosteeva.com/birchglenlodge",
  phonePrimary: "208-382-4238",
  phonePrimaryHref: "tel:2083824238",
  phonePrimaryE164: "+1-208-382-4238", // main line (group bookings) — used in JSON-LD
  phoneSecondary: "(208) 510-0663",
  phoneSecondaryHref: "tel:2085100663",
  phoneSecondaryE164: "+1-208-510-0663",
  email: "info@thebirchglenlodge.com",
  mapUrl: "https://maps.app.goo.gl/x9YmsgLDaofp3f1L8",
  mapEmbed:
    "https://maps.google.com/maps?q=762%20S%20Main%20St%2C%20Cascade%2C%20ID%2083611&t=m&z=16&output=embed&iwloc=near",
  address: {
    line1: "762 S. Main St.",
    cityStateZip: "Cascade, ID 83611",
    full: "762 S. Main St. Cascade, ID 83611",
    contactList: "Idaho 55 762 S. Main St. Cascade, ID 83611",
    // Structured parts for schema.org PostalAddress.
    streetAddress: "762 S. Main St.",
    addressLocality: "Cascade",
    addressRegion: "ID",
    postalCode: "83611",
    addressCountry: "US",
  },
  // Verified coordinates for 762 S. Main St. (resolved from the saved Google Maps place).
  geo: { latitude: 44.5061922, longitude: -116.030522 },
  // Verified first- and third-party profiles for the same business (schema.org sameAs).
  sameAs: [
    "https://www.facebook.com/p/Birch-Glen-Lodge-and-Motel-61585510620148/",
    "https://www.instagram.com/birchglenlodgeandmotel/",
    "https://www.tripadvisor.com/Hotel_Review-g35406-d7145386-Reviews-Birch_Glen_Lodge_Motel-Cascade_Idaho.html",
    "https://www.yelp.com/biz/birch-glen-lodge-and-motel-cascade",
    "https://www.expedia.com/Cascade-Hotels-Birch-Glen-Lodge.h82934118.Hotel-Information",
    "https://www.hotels.com/ho2654891776/birch-glen-lodge-cascade-united-states-of-america/",
    "https://www.hosteeva.com/birchglenlodge",
  ],
  headerLogo: "/images/BIRCH-GLEN-LODGE-1.png", // 663x250
  footerLogo: "/images/BIRCH-GLEN-LODGE-LOGO.png", // 800x100
  newsletterEmbed: "https://api.arrowleafmarketing.com/widget/form/NNtNQ9ALNXtAU1Em5Afs",
} as const;

/*
  Tenant key for the shared blog management system (Supabase `posts.site_key`).
  The blog reads only rows whose site_key matches this value, so it MUST be the
  exact key the CMS stores for Birch Glen. Change it here if the CMS uses a
  different key. Until it matches (or before env vars are set) the blog shows the
  bundled mock content in lib/blog/posts.mock.tsx.
*/
export const SITE_KEY = "birch-glen-lodge" as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// Desktop primary nav (exact order + labels from the live site)
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Explore Cascade", href: "/explore-cascade" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];
