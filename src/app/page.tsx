import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHeader, Eyebrow, ButtonLink } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { rooms, events, testimonials } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <Image
          src="/images/001-Daytime-Aerial-scaled.jpg"
          alt="Aerial view of Birch Glen Lodge in Cascade, Idaho"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/30" />
        <Container className="relative py-32">
          <div className="max-w-2xl">
            <Eyebrow className="text-accent">Cascade, Idaho · Est. 1968</Eyebrow>
            <h1 className="font-display mt-4 text-5xl font-semibold text-white sm:text-6xl md:text-7xl">
              Birch Glen Lodge &amp; Motel
            </h1>
            <p className="mt-6 max-w-xl text-xl text-white/90">
              A serene mountain getaway in Cascade, Idaho.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Book Now
              </a>
              <ButtonLink href="/contact" variant="light">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Escape to the Mountains */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src="/images/BIRCH-38.jpg"
              alt="Birch Glen Lodge grounds near Lake Cascade"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="Staying With Us"
              title="Escape to the Mountains, Stay by the Lake"
              intro="Tucked away in the stunning mountains of Cascade, Idaho, just steps from Lake Cascade and next door to Kelly's Whitewater Park, we offer a peaceful retreat for adventurers, families, and anyone seeking a break from the hustle and bustle of city life. Established in 1968, our charming lodge has been a home away from home for visitors looking to experience the best of Idaho's great outdoors."
            />
            <ButtonLink href="/about" variant="outline" className="mt-8">
              Read More
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us — feature blocks */}
      <Section className="bg-accent/40 py-16 sm:py-24">
        <Container>
          <SectionHeader align="center" eyebrow="Why Choose Us?" title="More Than a Place to Stay" />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <FeatureBlock
              image="/images/BIRCH-44.jpg"
              title="Home of the World's Biggest Perch"
              body="The biggest Perch in the world live right here in Lake Cascade. During the winter, ice-fishing is the community's hottest sport, and documented world-record caliber Perch are caught on this lake weekly. Catch and clean your trophies onsite — our indoor DIY fish cleaning and processing room in the back of the lodge is free and open to all guests."
            />
            <FeatureBlock
              image="/images/BIRCH-84.jpg"
              title="Homestyle Comfort — Inside or Outside"
              body="Choose between the peace and quiet of your room or the wide range of activities at your doorstep. Inside, relax in our lodge with pool tables, sitting areas, large screen TVs, and card tables. Outside, you'll find a barbecue area, a fire pit with plenty of seating, and a large grassy area. We view our guests as family and want you to feel as comfortable here as you do at home."
            />
          </div>
        </Container>
      </Section>

      {/* Room preview */}
      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader eyebrow="Picture Your Stay" title="Explore Our Rooms" />
            <ButtonLink href="/rooms" variant="outline">
              View More
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <Link
                key={room.name}
                href="/rooms"
                className="group overflow-hidden rounded-card bg-white shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={`${room.name} at Birch Glen Lodge`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                  <h3 className="font-display text-xl font-semibold text-ink">{room.name}</h3>
                  <span className="text-sm font-medium text-primary">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Groups & Events */}
      <Section className="bg-secondary text-white">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Who Comes To The Birch Glen?"
            title={<span className="text-white">Perfect for Groups &amp; Events</span>}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <div key={event.title} className="rounded-card bg-white/10 p-8 ring-1 ring-white/15">
                <h3 className="font-display text-2xl font-semibold text-white">{event.title}</h3>
                <p className="mt-4 leading-relaxed text-white/85">{event.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-cream px-8 py-4 text-sm font-semibold text-secondary transition-colors hover:bg-white"
            >
              Book A Stay
            </a>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section>
        <Container>
          <SectionHeader align="center" eyebrow="Reviews" title="Testimonials from Our Guests" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {testimonials.map((quote, i) => (
              <blockquote
                key={i}
                className="rounded-card bg-white p-8 shadow-sm ring-1 ring-ink/5"
              >
                <div className="flex gap-1 text-primary" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} />
                  ))}
                </div>
                <p className="mt-4 leading-relaxed text-ink-soft">{quote}</p>
              </blockquote>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section className="bg-accent/40">
        <Container className="max-w-xl text-center">
          <Eyebrow>Stay Notified</Eyebrow>
          <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            Sign Up For Our Newsletter
          </h2>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
              className="w-full flex-1 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm text-ink outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Subscribe
            </button>
          </form>
        </Container>
      </Section>

      <CtaBand title="Book With Birch Glen Today" />
    </>
  );
}

function FeatureBlock({
  image,
  title,
  body,
}: {
  image: string;
  title: string;
  body: string;
}) {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-sm ring-1 ring-ink/5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={image} alt={title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="p-8">
        <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
        <p className="mt-4 leading-relaxed text-ink-soft">{body}</p>
      </div>
    </div>
  );
}

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 21l1.2-6.5L2.5 9.9l6.6-.9L12 2.5z" />
    </svg>
  );
}
