import { Fragment } from "react";
import Image from "next/image";
import {
  Container,
  Section,
  Eyebrow,
  ButtonLink,
  ButtonAnchor,
  ArrowRight,
} from "@/components/ui";
import { Hero, BgSection } from "@/components/sections";
import { Reveal, StatCounter } from "@/components/reveal";
import { aboutAmenities, activityColumns } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Birch Glen Lodge | Cascade, Idaho",
  description:
    "Nestled in Valley County, Birch Glen Lodge is a recreational retreat in Cascade, Idaho — next to Kelly's Whitewater Park, offering privacy and relaxation.",
  path: "/about/",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
]);

const stats = [
  // Derived from the founding year so it never goes stale ("Established in 1968").
  { value: `${new Date().getFullYear() - site.founded}`, label: "Years In Business" },
  { value: "270+", label: "5 Star Reviews" },
];

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden
      className="mt-1 shrink-0 text-primary"
    >
      <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* 1. Hero */}
      <Hero
        image="/images/097-Daytime-Aerial-scaled.jpg"
        imageAlt="Aerial view of Birch Glen Lodge in Cascade, Idaho"
        title="About Us"
        subtitle="Nestled In The Heart Of Valley County"
        priority
      />

      {/* 2. Mountain Life — 2 column */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Mountain Life</Eyebrow>
              <h2 className="h2 mt-3 text-ink">Cascade. A Recreational Paradise.</h2>
            </Reveal>
            <Reveal
              variant="img"
              delay={100}
              className="relative mt-8 aspect-[3/2] overflow-hidden"
            >
              <Image
                src="/images/BIRCH-76.jpg"
                alt="The mountain landscape surrounding Birch Glen Lodge"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal as="p" delay={180} className="mt-8 text-lg leading-relaxed text-ink/80">
              Whether you&#8217;re planning a{" "}
              <strong>
                romantic weekend getaway, a fun-filled family vacation, a corporate retreat, or a
                reunion
              </strong>
              , Birch Glen Lodge is the perfect place to make lasting memories. We offer a rare
              combination of privacy, relaxation, and entertainment to ensure your stay is nothing
              short of amazing.
            </Reveal>
          </div>

          <div>
            <Reveal as="p" className="text-lg leading-relaxed text-ink/80">
              Located next door to Kelly&#8217;s Whitewater Park in Cascade, Birch Glen is right in
              the heart of Valley County with convenient access to outdoor activities including
              rafting, fishing, golfing, swimming, kayaking, boating, water skiing, hiking, biking,
              ice fishing, snow skiing, cross-country skiing, snowmobiling, and snowshoeing. If hot
              springs are your thing, we have those too!
            </Reveal>

            <Reveal delay={100} className="mt-8 grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <StatCounter value={stat.value} className="h2 block text-primary" />
                  <p className="h6 mt-2 text-ink">{stat.label}</p>
                </div>
              ))}
            </Reveal>

            <Reveal
              variant="img"
              delay={180}
              className="relative mt-8 aspect-[3/2] overflow-hidden"
            >
              <Image
                src="/images/BIRCH-110.jpg"
                alt="Inside Birch Glen Lodge in Cascade, Idaho"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3. Amenities feature row — full-bleed image + dark panel pairs */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {aboutAmenities.map((amenity) => (
          <Fragment key={amenity.title}>
            <Reveal
              variant="img"
              className="relative min-h-[420px] md:min-h-[600px]"
            >
              <Image
                src={amenity.image}
                alt={amenity.alt}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <div className="flex flex-col bg-ink p-10 lg:p-14">
              <Reveal as="h2" delay={80} className="h2 text-white">
                {amenity.title}
              </Reveal>
              <ul className="mt-8 space-y-4">
                {amenity.items.map((item, j) => (
                  <Reveal
                    as="li"
                    key={item}
                    delay={160 + j * 90}
                    className="flex items-start gap-3 text-lg text-white"
                  >
                    <Check /> <span>{item}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Fragment>
        ))}
      </section>

      {/* 4. Adventure Awaits */}
      <Section>
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Your Guide To The Outdoors</Eyebrow>
              <h2 className="h2 mt-3 text-ink">Adventure Awaits</h2>
            </div>
            <ButtonAnchor
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 self-start sm:self-auto"
            >
              Book Today
              <ArrowRight />
            </ButtonAnchor>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activityColumns.map((column, i) => (
              <Reveal as="ul" key={i} delay={i * 120} className="space-y-3">
                {column.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg text-ink">
                    <Check /> <span>{item}</span>
                  </li>
                ))}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Find Your Perfect Stay band */}
      <BgSection image="/images/BIRCH-36.jpg">
        <Container className="py-20">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="h2 text-white">Find Your Perfect Stay</h2>
            <ButtonLink href="/rooms" className="shrink-0">
              Browse Rooms
            </ButtonLink>
          </Reveal>
        </Container>
      </BgSection>
    </>
  );
}
