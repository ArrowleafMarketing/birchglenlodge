import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-md">
            <Image
              src={site.footerLogo}
              alt="Birch Glen Lodge"
              width={800}
              height={100}
              className="h-8 w-auto"
            />
            <p className="mt-6 text-[15px] leading-relaxed text-ink/70">
              Located next door to Kelly&apos;s Whitewater Park in Cascade, Birch Glen is right in the
              heart of Valley County with convenient access to outdoor activities including rafting,
              fishing, golfing, swimming, kayaking, boating, water skiing, hiking, biking, hotsprings,
              ice fishing, snow skiing, cross-country skiing, snowmobiling, and snowshoeing.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="h6 text-ink">Contact</h3>
            <ul className="mt-5 space-y-3 text-[15px] text-ink/70">
              <li>
                <a href={site.phoneSecondaryHref} className="transition-colors hover:text-primary">
                  {site.phoneSecondary}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-primary">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.hosteevaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="h6 text-ink">Address</h3>
            <ul className="mt-5 space-y-3 text-[15px] text-ink/70">
              <li>{site.address.full}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[14px] text-ink/60 sm:flex-row sm:items-center sm:justify-end sm:gap-8">
          <p className="sm:mr-auto">2025, Birch Glen Lodge</p>
          <Link href="/privacy-policy" className="transition-colors hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="transition-colors hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
