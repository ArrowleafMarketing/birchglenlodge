import type { Metadata } from "next";
import { Container, Section, SectionHeader } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { GalleryGrid } from "@/components/gallery-grid";
import { galleryImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside and around Birch Glen Lodge in Cascade, Idaho — our rooms, grounds, game room, and the surrounding mountains.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-accent/40">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="Gallery"
            title="A Look Around Birch Glen"
            intro="Located next door to Kelly's Whitewater Park in the heart of Valley County, with convenient access to the best of Idaho's outdoors."
          />
        </Container>
      </section>

      <Section>
        <Container>
          <GalleryGrid images={galleryImages} />
        </Container>
      </Section>

      <CtaBand title="See It for Yourself" />
    </>
  );
}
