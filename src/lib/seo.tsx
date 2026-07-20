/*
  Central SEO helpers for the Birch Glen Lodge site.

  - `pageMetadata()` DRYs the per-page Metadata (canonical + Open Graph + Twitter).
    Social share images come from the file-convention opengraph-image.jpg /
    twitter-image.jpg at the app root, which apply to every route automatically.
  - The JSON-LD builders emit schema.org structured data. The site-wide graph
    (a single Motel/LodgingBusiness node + WebSite node) is injected once in the
    root layout; per-page nodes (breadcrumbs, rooms, gallery) are rendered by
    their pages. All URLs are absolute and end in a trailing slash to match
    next.config `trailingSlash: true`.
*/
import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Canonical production origin, e.g. "https://thebirchglenlodge.com" (no trailing slash). */
export const SITE_URL = site.url;

/** Build an absolute URL from a root-relative path (which should include any trailing slash). */
export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

// Shared 1200x630 social share image (Open Graph + Twitter), served from /public
// so a single, consistent card applies to every route.
const OG_IMAGE_PATH = "/og-image.jpg";
const OG_IMAGE_ALT =
  "Aerial view of Birch Glen Lodge & Motel beside Lake Cascade in Cascade, Idaho";

/**
 * Per-page metadata. `path` MUST be the canonical, trailing-slash form of the
 * route ("/", "/rooms/", …). `title` is the full, rendered SERP title and is set
 * via title.absolute so the root title template does not append the brand twice.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl(OG_IMAGE_PATH);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: OG_IMAGE_ALT }],
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD (schema.org) builders
// ---------------------------------------------------------------------------

const LODGE_ID = `${SITE_URL}/#lodge`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Convenience: a plain amenity flag as a schema.org LocationFeatureSpecification. */
function amenity(name: string) {
  return { "@type": "LocationFeatureSpecification", name, value: true } as const;
}

/**
 * The authoritative business entity, referenced everywhere else by @id.
 * Typed as both LodgingBusiness and Motel (a Motel is a LodgingBusiness, which
 * is itself a LocalBusiness → Organization → Place, so this one node carries all
 * of that intent). Facts are drawn only from verified/on-site data — no prices,
 * check-in times, room counts, or ratings are asserted, since none are published.
 */
export function lodgingBusinessNode() {
  return {
    "@type": ["LodgingBusiness", "Motel"],
    "@id": LODGE_ID,
    name: site.fullName,
    alternateName: site.name,
    description:
      "Established in 1968, Birch Glen Lodge & Motel is a serene mountain getaway in Cascade, Idaho — steps from Lake Cascade and next door to Kelly's Whitewater Park.",
    url: `${SITE_URL}/`,
    telephone: site.phonePrimaryE164,
    email: site.email,
    foundingDate: "1968",
    currenciesAccepted: "USD",
    petsAllowed: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      postalCode: site.address.postalCode,
      addressCountry: site.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.mapUrl,
    logo: absoluteUrl(site.headerLogo),
    image: [
      absoluteUrl("/images/104-River-scaled.jpg"),
      absoluteUrl("/images/001-Daytime-Aerial-scaled.jpg"),
      absoluteUrl("/images/097-Daytime-Aerial-scaled.jpg"),
      absoluteUrl("/images/BIRCH-43.jpg"),
    ],
    amenityFeature: [
      amenity("Free WiFi"),
      amenity("Sauna"),
      amenity("Game room"),
      amenity("Firepit"),
      amenity("BBQ area"),
      amenity("Shared kitchen"),
      amenity("Free parking"),
      amenity("Pet friendly"),
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      telephone: site.phoneSecondaryE164,
      email: site.email,
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: site.bookingUrl,
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "LodgingReservation", name: "Book a room at Birch Glen Lodge & Motel" },
    },
    sameAs: [...site.sameAs],
  };
}

/** Site-level entity. Intentionally has NO SearchAction (there is no on-site search). */
export function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: site.fullName,
    inLanguage: "en-US",
    publisher: { "@id": LODGE_ID },
  };
}

/** Site-wide @graph injected once in the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [lodgingBusinessNode(), webSiteNode()],
  };
}

/** A BreadcrumbList for a page. Items are ordered root → current. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** ItemList of HotelRoom nodes for the rooms page (no Offer/price — booking is off-site). */
export function roomsJsonLd(
  rooms: { name: string; image: string; alt?: string }[],
  roomIncludes: readonly string[],
) {
  const roomAmenities = roomIncludes.map((name) => amenity(name));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rooms & Suites at Birch Glen Lodge & Motel",
    itemListElement: rooms.map((room, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "HotelRoom",
        name: room.name,
        image: absoluteUrl(room.image),
        ...(room.alt ? { description: room.alt } : {}),
        containedInPlace: { "@id": LODGE_ID },
        amenityFeature: roomAmenities,
      },
    })),
  };
}

/** ImageGallery node for the gallery page. */
export function imageGalleryJsonLd(images: { src: string; alt: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Birch Glen Lodge & Motel Photo Gallery",
    url: absoluteUrl("/gallery/"),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": LODGE_ID },
    associatedMedia: images.map((im) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(im.src),
      caption: im.alt,
    })),
  };
}

/** Renders a JSON-LD <script>. Safe in Server Components. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
