import type { Metadata } from "next";
import { Container, Section, SectionHeader } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { trails } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trails",
  description:
    "Leave the road, take the trail. Explore OHV routes and backcountry trails around Cascade, Idaho — with plenty of parking for your big trailers at Birch Glen Lodge.",
};

export default function TrailsPage() {
  return (
    <>
      <PageHero
        eyebrow="Guide To Cascade"
        title="Leave the Road. Take the Trail."
        subtitle="Cascade sits at the doorstep of an enormous network of trails — and we have parking for your big trailers."
        image="/images/birch-glen-walkway.jpg"
        imageAlt="Wooded trail near Birch Glen Lodge"
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Explore"
            title="Trails Near Birch Glen"
            intro="A selection of popular routes in the surrounding national forest. Always check current conditions before you head out."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {trails.map((trail, i) => (
              <article
                key={trail.name}
                className="flex flex-col rounded-card bg-white p-8 shadow-sm ring-1 ring-ink/5"
              >
                <span className="font-display text-4xl font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-2xl font-semibold text-ink">{trail.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{trail.description}</p>
                {trail.href ? (
                  <a
                    href={trail.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    Forest Service info →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Stay & Explore the Trails" />
    </>
  );
}
