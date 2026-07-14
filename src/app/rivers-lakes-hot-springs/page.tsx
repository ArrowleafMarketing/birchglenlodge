import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { fishSpecies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rivers, Lakes & Hot Springs",
  description:
    "Cascade and Valley County are filled with some of the best fishing and water-based recreation in Idaho — including Lake Cascade, the state's fourth-largest lake.",
};

export default function RiversLakesHotSpringsPage() {
  return (
    <>
      <PageHero
        eyebrow="Guide To Cascade"
        title="Rivers, Lakes & Hot Springs"
        subtitle="Some of the best fishing and water-based recreation in all of Idaho."
        image="/images/104-River-scaled.jpg"
        imageAlt="River near Cascade, Idaho"
      />

      <Section>
        <Container className="max-w-3xl text-center">
          <SectionHeader
            align="center"
            eyebrow="On The Water"
            title="Rafting, Kayaking, Fishing & More"
            intro="Cascade and Valley County are filled with some of the best fishing and water-based recreation in Idaho — rafting, kayaking, fishing, paddle boarding, hot spring soaking, and, come winter, world-class ice fishing."
          />
        </Container>
      </Section>

      {/* Lake Cascade feature */}
      <Section className="bg-accent/40">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src="/images/BIRCH-44.jpg"
              alt="Lake Cascade near Birch Glen Lodge"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>Just 2 Minutes Away</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Lake Cascade
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Located just under 2 minutes from the lodge on the North Fork of the Payette River,
              this 47-square-mile body of water ranks as Idaho&apos;s fourth-largest lake or
              reservoir. The nearest towns are Cascade and Donnelly.
            </p>
            <p className="font-display mt-6 text-2xl font-semibold text-primary">
              Best trout, perch, and smallmouth fishing around!
            </p>
          </div>
        </Container>
      </Section>

      {/* Fish species */}
      <Section>
        <Container>
          <SectionHeader align="center" eyebrow="What's Biting" title="Fish Species in Lake Cascade" />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {fishSpecies.map((fish) => (
              <div
                key={fish}
                className="rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-ink ring-1 ring-ink/5"
              >
                {fish}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Cast a Line at Birch Glen" />
    </>
  );
}
