import { Fragment } from "react";
import type { Metadata } from "next";
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
import { aboutAmenities, activityColumns } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nestled in the heart of Valley County, Birch Glen Lodge is a recreational paradise in Cascade, Idaho — next door to Kelly's Whitewater Park, offering a rare combination of privacy, relaxation, and entertainment.",
};

const stats = [
  { value: "56", label: "Years In Business" },
  { value: "270+", label: "5 Star Reviews" },
];

function Check() {
  return (
    <svg
      width="22"
      height="22"
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
            <Eyebrow>Mountain Life</Eyebrow>
            <h2 className="h2 mt-3 text-ink">Cascade. A Recreational Paradise.</h2>
            <div className="relative mt-8 aspect-[3/2] overflow-hidden">
              <Image
                src="/images/BIRCH-76.jpg"
                alt="The mountain landscape surrounding Birch Glen Lodge"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-8 text-lg leading-relaxed text-ink/80">
              Whether you&#8217;re planning a{" "}
              <strong>
                romantic weekend getaway, a fun-filled family vacation, a corporate retreat, or a
                reunion
              </strong>
              , Birch Glen Lodge is the perfect place to make lasting memories. We offer a rare
              combination of privacy, relaxation, and entertainment to ensure your stay is nothing
              short of amazing.
            </p>
          </div>

          <div>
            <p className="text-lg leading-relaxed text-ink/80">
              Located next door to Kelly&#8217;s Whitewater Park in Cascade, Birch Glen is right in
              the heart of Valley County with convenient access to outdoor activities including
              rafting, fishing, golfing, swimming, kayaking, boating, water skiing, hiking, biking,
              ice fishing, snow skiing, cross-country skiing, snowmobiling, and snowshoeing. If hot
              springs are your thing, we have those too!
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="h2 block text-primary">{stat.value}</span>
                  <p className="h6 mt-2 text-ink">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-10 aspect-[3/2] overflow-hidden">
              <Image
                src="/images/BIRCH-110.jpg"
                alt="Inside Birch Glen Lodge in Cascade, Idaho"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Amenities feature row */}
      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutAmenities.map((amenity) => (
              <Fragment key={amenity.title}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={amenity.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center bg-accent p-8">
                  <h3 className="h3 text-ink">{amenity.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {amenity.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-lg text-ink">
                        <Check /> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fragment>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Adventure Awaits */}
      <Section className="pt-0">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Your Guide To The Outdoors</Eyebrow>
              <h2 className="h2 mt-3 text-ink">Adventure Awaits</h2>
            </div>
            <ButtonAnchor
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              Book Today
              <ArrowRight />
            </ButtonAnchor>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activityColumns.map((column, i) => (
              <ul key={i} className="space-y-3">
                {column.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg text-ink">
                    <Check /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Find Your Perfect Stay band */}
      <BgSection image="/images/BIRCH-36.jpg">
        <Container className="py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="h2 text-white">Find Your Perfect Stay</h2>
            <ButtonLink href="/rooms" className="shrink-0">
              Browse Rooms
            </ButtonLink>
          </div>
        </Container>
      </BgSection>
    </>
  );
}
