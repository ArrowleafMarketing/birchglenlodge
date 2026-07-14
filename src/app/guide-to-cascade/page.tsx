import type { Metadata } from "next";
import { Container, Section, SectionHeader } from "@/components/ui";
import { Hero } from "@/components/sections";
import { CardCarousel } from "@/components/card-carousel";
import { guideCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guide To Cascade",
  description: "Beautiful Cascade Idaho has much to offer for the outdoor lover.",
};

export default function GuideToCascadePage() {
  return (
    <>
      {/* 1. Intro hero */}
      <Hero
        image="/images/104-River-scaled.jpg"
        imageAlt="River running through the mountains near Cascade, Idaho"
        title="Our Guide To Cascade"
        subtitle="Beautiful Cascade Idaho has much to offer for the outdoor lover."
        priority
      />

      {/* 2. Local Favorites */}
      <Section>
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Local Favorites"
            title="Explore our beautiful area"
          />
          <div className="mt-12">
            <CardCarousel items={guideCards} perView={2} />
          </div>
        </Container>
      </Section>
    </>
  );
}
