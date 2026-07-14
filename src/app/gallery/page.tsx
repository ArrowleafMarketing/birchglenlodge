import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { Hero } from "@/components/sections";
import { GalleryGrid } from "@/components/gallery-grid";
import { galleryImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore photos of Birch Glen Lodge & Motel in Cascade, Idaho — rooms, amenities, and the serene mountain surroundings of Valley County.",
};

export default function GalleryPage() {
  return (
    <>
      <Hero
        image="/images/Birch-Glen-Overview.png"
        imageAlt="Aerial overview of Birch Glen Lodge"
        title="Gallery"
        priority
      />

      <Section>
        <Container>
          <GalleryGrid images={galleryImages} />
        </Container>
      </Section>
    </>
  );
}
