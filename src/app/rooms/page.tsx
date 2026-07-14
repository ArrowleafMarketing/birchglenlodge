import type { Metadata } from "next";
import Image from "next/image";
import {
  Container,
  Section,
  SectionHeader,
  ButtonAnchor,
  ArrowRight,
} from "@/components/ui";
import { Hero } from "@/components/sections";
import { CardCarousel } from "@/components/card-carousel";
import { roomsCarousel, roomIncludes, lodgeAmenities, activityColumns } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Comfort for your adventure in the mountains. Explore our rooms — Royal King, Deluxe Double, Single Queen, Triple, and the Private Upstairs Suite — each with a mini fridge, microwave, air conditioning/heater, coffee maker, and television/cable/wifi.",
};

const roomCards = roomsCarousel.map((room) => ({
  image: room.image,
  hover: room.hover,
  title: room.name,
  alt: room.name,
}));

export default function RoomsPage() {
  return (
    <>
      {/* 1. Hero / intro title band */}
      <Hero
        image="/images/Birch-166-scaled.jpg"
        imageAlt="Birch Glen Lodge in Cascade, Idaho"
        title="Our Rooms"
        subtitle="Comfort For Your Adventure In The Mountains"
        priority
      />

      {/* 2. Explore our rooms */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader eyebrow="Picture Your Stay" title="Explore our rooms" />
            <ButtonAnchor
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              Book Now <ArrowRight />
            </ButtonAnchor>
          </div>
          <div className="mt-12">
            <CardCarousel items={roomCards} />
          </div>
        </Container>
      </Section>

      {/* 3. Room & Lodge Features */}
      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative aspect-[851/1280] overflow-hidden">
              <Image
                src="/images/BIRCH-80.jpg"
                alt="A guest room at Birch Glen Lodge"
                fill
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center bg-accent p-8">
              <h3 className="h3 text-ink">Each Room Includes:</h3>
              <ul className="mt-6 space-y-3">
                {roomIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg text-ink">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[851/1280] overflow-hidden">
              <Image
                src="/images/BIRCH-72.jpg"
                alt="Lodge amenities at Birch Glen Lodge"
                fill
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center bg-accent p-8">
              <h3 className="h3 text-ink">Lodge Amenities:</h3>
              <ul className="mt-6 space-y-3">
                {lodgeAmenities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg text-ink">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Group Bookings */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Big Group? We have you covered!"
            title="Group Bookings"
            intro="Discounts available for groups of 5+ rooms booked at a time. Please call our main number and ask to speak with a manager to plan your next group booking! "
          />
        </Container>
      </Section>

      {/* 5. Cascade. A Recreational Paradise */}
      <Section className="pt-0">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Your Guide To The Outdoors"
              title="Cascade. A Recreational Paradise"
            />
            <ButtonAnchor
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              Book Today <ArrowRight />
            </ButtonAnchor>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-3">
            {activityColumns.map((column, i) => (
              <ul key={i} className="space-y-3">
                {column.map((activity) => (
                  <li key={activity} className="flex items-start gap-3 text-lg text-ink">
                    <Check />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
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
