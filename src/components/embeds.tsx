import { site } from "@/lib/site";

/** Home newsletter — the live Arrowleaf/GoHighLevel embedded form. */
export function NewsletterEmbed() {
  return (
    <iframe
      src={site.newsletterEmbed}
      title="Newsletter"
      className="w-full"
      style={{ height: 780, border: "none", width: "100%" }}
      loading="lazy"
    />
  );
}

/** Contact page Google Map embed (matches the live iframe). */
export function MapEmbed() {
  return (
    <iframe
      src={site.mapEmbed}
      title="762 S Main St, Cascade, ID 83611"
      aria-label="762 S Main St, Cascade, ID 83611"
      className="h-[450px] w-full border-0"
      loading="lazy"
    />
  );
}
