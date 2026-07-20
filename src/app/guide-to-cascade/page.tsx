import { Container, Section, SectionHeader } from "@/components/ui";
import { Hero } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { CardCarousel } from "@/components/card-carousel";
import { guideCards } from "@/lib/content";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guide to Cascade, Idaho | Things to Do",
  description:
    "Your local guide to Cascade, Idaho — Lake Cascade, Kelly's Whitewater Park, trails, hot springs and fishing, all minutes from Birch Glen Lodge & Motel.",
  path: "/guide-to-cascade/",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guide To Cascade", path: "/guide-to-cascade/" },
]);

export default function GuideToCascadePage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
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
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Local Favorites"
              title="Explore our beautiful area"
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <CardCarousel items={guideCards} perView={2} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
