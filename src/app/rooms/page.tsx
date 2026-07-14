import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { rooms, roomIncludes, lodgeAmenities, groupDiscount } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Rooms",
  description:
    "Comfort for your adventure in the mountains. Explore Birch Glen Lodge's room types — Royal King, Deluxe Double, Single Queen, Triple, and the Private Upstairs Suite.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHeroRooms />

      <Section>
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Picture Your Stay"
            title="Comfort for Your Adventure in the Mountains"
          />

          <div className="mt-14 space-y-8">
            {rooms.map((room, i) => (
              <div
                key={room.name}
                className="grid items-center gap-6 overflow-hidden rounded-card bg-white shadow-sm ring-1 ring-ink/5 lg:grid-cols-2"
              >
                <div
                  className={`grid grid-cols-2 gap-1 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  {room.images.map((src, idx) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={src}
                        alt={`${room.name} at Birch Glen Lodge, photo ${idx + 1}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="px-8 py-8 lg:px-10">
                  <Eyebrow>Room</Eyebrow>
                  <h3 className="font-display mt-2 text-3xl font-semibold text-ink">{room.name}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {roomIncludes.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-accent/50 px-3.5 py-1.5 text-xs font-medium text-primary-dark"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Every room includes */}
      <Section className="bg-accent/40">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="In Every Room" title="Each Room Includes" />
            <ul className="mt-8 space-y-3">
              {roomIncludes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg text-ink">
                  <Check /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="On The Property" title="Lodge Amenities" />
            <ul className="mt-8 space-y-3">
              {lodgeAmenities.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg text-ink">
                  <Check /> {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Group discount */}
      <Section>
        <Container className="max-w-3xl text-center">
          <Eyebrow>Traveling Together?</Eyebrow>
          <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            Group Bookings
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{groupDiscount}</p>
        </Container>
      </Section>

      <CtaBand title="Reserve Your Room Today" />
    </>
  );
}

function PageHeroRooms() {
  return (
    <section className="relative flex min-h-[46vh] items-center overflow-hidden bg-primary-dark">
      <Image
        src="/images/BIRCH-63.jpg"
        alt="A guest room at Birch Glen Lodge"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/60" />
      <Container className="relative py-24 text-center">
        <span className="eyebrow text-accent">Our Rooms</span>
        <h1 className="font-display mx-auto mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
          Rest Well Between Adventures
        </h1>
      </Container>
    </section>
  );
}

function Check() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-primary"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
