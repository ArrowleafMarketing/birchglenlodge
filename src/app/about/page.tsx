import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, SectionHeader, ButtonLink } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { activities } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nestled in the heart of Valley County, Birch Glen Lodge offers a rare combination of privacy, relaxation, and entertainment — next door to Kelly's Whitewater Park in Cascade, Idaho.",
};

const amenities = ["Game Room", "Firepit", "BBQ Area"];

const stats = [
  { value: "56", label: "Years In Business" },
  { value: "270+", label: "5 Star Reviews" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Nestled in the Heart of Valley County"
        subtitle="A rare combination of privacy, relaxation, and entertainment in the Idaho mountains."
        image="/images/BIRCH-76.jpg"
        imageAlt="Birch Glen Lodge exterior in Cascade, Idaho"
      />

      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Mountain Life"
              title="Cascade. A Recreational Paradise."
              intro="Whether you're planning a romantic weekend getaway, a fun-filled family vacation, a corporate retreat, or a reunion, Birch Glen Lodge is the perfect place to make lasting memories."
            />
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Located next door to Kelly&apos;s Whitewater Park in Cascade, Birch Glen is right in the
              heart of Valley County with convenient access to outdoor activities including rafting,
              fishing, golfing, swimming, kayaking, boating, water skiing, hiking, biking, ice
              fishing, snow skiing, cross-country skiing, snowmobiling, and snowshoeing.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Book Today
              </a>
              <ButtonLink href="/rooms" variant="outline">
                Browse Rooms
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image
              src="/images/BIRCH-110.jpg"
              alt="The game room at Birch Glen Lodge"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="bg-primary-dark py-16 text-cream">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-6xl font-semibold text-cream sm:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-accent/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Amenities */}
      <Section>
        <Container>
          <SectionHeader align="center" eyebrow="Amenities" title="Feel Like Being Outside?" />
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            {amenities.map((item) => (
              <div
                key={item}
                className="rounded-card bg-white px-6 py-8 text-center shadow-sm ring-1 ring-ink/5"
              >
                <p className="font-display text-xl font-semibold text-ink">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Activities */}
      <Section className="bg-accent/40">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Your Guide To The Outdoors"
            title="Adventure Awaits"
            intro="From summer on the water to winter in the backcountry, the activities never end in Cascade."
          />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {activities.map((activity) => (
              <div
                key={activity}
                className="rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-ink ring-1 ring-ink/5"
              >
                {activity}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand eyebrow="Find Your Perfect Stay" title="Adventure Awaits at Birch Glen" />
    </>
  );
}
