import { Container, Section } from "@/components/ui";
import { Hero } from "@/components/sections";
import { GalleryGrid } from "@/components/gallery-grid";
import { galleryImages } from "@/lib/content";
import { pageMetadata, breadcrumbJsonLd, imageGalleryJsonLd, JsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photo Gallery | Birch Glen Lodge, Cascade ID",
  description:
    "Browse photos of Birch Glen Lodge & Motel in Cascade, Idaho — guest rooms, amenities and the serene mountain surroundings of Valley County.",
  path: "/gallery/",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery/" },
]);

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={imageGalleryJsonLd(galleryImages)} />
      <Hero
        image="/images/Birch-Glen-Overview.png"
        imageAlt="Aerial overview of Birch Glen Lodge and Lake Cascade in Cascade, Idaho"
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
