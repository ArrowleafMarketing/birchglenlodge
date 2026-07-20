import Image from "next/image";
import {
  Container,
  Section,
  SectionHeader,
  ButtonAnchor,
  ArrowRight,
} from "@/components/ui";
import { Hero } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { RoomsCarousel } from "@/components/rooms-marquee";
import { roomsCarousel, roomIncludes, lodgeAmenities, activityColumns } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, roomsJsonLd, JsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Rooms & Suites | Birch Glen Lodge, Cascade ID",
  description:
    "Explore our rooms and suites — Royal King, Deluxe Double, Single Queen, Triple & Private Upstairs Suite. Comfort for your mountain adventure in Cascade, Idaho.",
  path: "/rooms/",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Rooms", path: "/rooms/" },
]);

const roomCards = roomsCarousel.map((room) => ({
  name: room.name,
  image: room.image,
}));

export default function RoomsPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={roomsJsonLd(roomCards, roomIncludes)} />
      {/* 1. Hero / intro title band */}
      <Hero
        image="/images/Birch-166-scaled.jpg"
        imageAlt="Guest room with two beds and slatted wood accent walls at Birch Glen Lodge in Cascade, Idaho"
        title="Our Rooms"
        subtitle="Comfort For Your Adventure In The Mountains"
        priority
      />

      {/* 2. Explore our rooms */}
      <Section>
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader eyebrow="Picture Your Stay" title="Explore our rooms" />
            <ButtonAnchor
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 self-start sm:self-auto"
            >
              Book Now <ArrowRight />
            </ButtonAnchor>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <RoomsCarousel items={roomCards} />
          </Reveal>
        </Container>
      </Section>

      {/* 3. Room & Lodge Features — full-bleed image + dark panel pairs */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Reveal variant="img" className="relative min-h-[420px] md:min-h-[600px]">
          <Image
            src="/images/BIRCH-80.jpg"
            alt="Two beds with black bedding and a nightstand in a remodeled room at Birch Glen Lodge"
            fill
            sizes="(min-width:768px) 25vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="flex flex-col bg-ink p-10 lg:p-14">
          <Reveal as="h2" delay={80} className="h2 text-white">
            Each Room Includes:
          </Reveal>
          <ul className="mt-8 space-y-4">
            {roomIncludes.map((item, j) => (
              <Reveal
                as="li"
                key={item}
                delay={160 + j * 90}
                className="flex items-start gap-3 text-lg text-white"
              >
                <Check />
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal variant="img" className="relative min-h-[420px] md:min-h-[600px]">
          <Image
            src="/images/BIRCH-72.jpg"
            alt="Front of the green A-frame lodge and office building at Birch Glen Lodge in Cascade, Idaho"
            fill
            sizes="(min-width:768px) 25vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="flex flex-col bg-ink p-10 lg:p-14">
          <Reveal as="h2" delay={80} className="h2 text-white">
            Lodge Amenities:
          </Reveal>
          <ul className="mt-8 space-y-4">
            {lodgeAmenities.map((item, j) => (
              <Reveal
                as="li"
                key={item}
                delay={160 + j * 90}
                className="flex items-start gap-3 text-lg text-white"
              >
                <Check />
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Group Bookings */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Big Group? We have you covered!"
              title="Group Bookings"
              intro="Discounts available for groups of 5+ rooms booked at a time. Please call our main number and ask to speak with a manager to plan your next group booking!"
            />
          </Reveal>
        </Container>
      </Section>

      {/* 5. Cascade. A Recreational Paradise */}
      <Section className="pt-0">
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Your Guide To The Outdoors"
              title="Cascade. A Recreational Paradise"
            />
            <ButtonAnchor
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 self-start sm:self-auto"
            >
              Book Today <ArrowRight />
            </ButtonAnchor>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activityColumns.map((column, i) => (
              <Reveal as="ul" key={i} delay={i * 120} className="space-y-3">
                {column.map((activity) => (
                  <li key={activity} className="flex items-start gap-3 text-lg text-ink">
                    <Check />
                    <span>{activity}</span>
                  </li>
                ))}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/** Filled check-circle, matching the live site's FontAwesome check icon. */
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
