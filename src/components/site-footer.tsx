import Link from "next/link";
import { primaryNav, site } from "@/lib/site";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="bg-primary-dark text-accent/90">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-display text-2xl tracking-wide text-cream">BIRCH GLEN LODGE</p>
            <p className="mt-5 text-sm leading-relaxed text-accent/80">
              Located next door to Kelly&apos;s Whitewater Park in Cascade, Birch Glen is right in
              the heart of Valley County with convenient access to rafting, fishing, golfing,
              hiking, biking, hot springs, skiing, snowmobiling, and more.
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex rounded-full bg-cream px-6 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-white"
            >
              Book Now
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-accent/80 transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-accent/80">
              <li>
                <a href={site.phonePrimaryHref} className="transition-colors hover:text-cream">
                  {site.phonePrimary}
                </a>
              </li>
              <li>
                <a href={site.phoneSecondaryHref} className="transition-colors hover:text-cream">
                  {site.phoneSecondary}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
                  {site.email}
                </a>
              </li>
              <li className="pt-2 leading-relaxed">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-sm text-accent/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.fullName}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-cream">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-cream">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
