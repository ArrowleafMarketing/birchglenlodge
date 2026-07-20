import Image from "next/image";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  ButtonLink,
  ButtonAnchor,
  ArrowRight,
} from "@/components/ui";
import { Hero, BgSection } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { RoomsCarousel } from "@/components/rooms-marquee";
import { Accordion } from "@/components/accordion";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { NewsletterEmbed } from "@/components/embeds";
import { homeRoomCards, events, testimonials } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Birch Glen Lodge & Motel | Lodging in Cascade, Idaho",
  description:
    "Established in 1968, Birch Glen Lodge & Motel is a serene mountain getaway in Cascade, Idaho — steps from Lake Cascade, next to Kelly's Whitewater Park.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        tall
        priority
        image="/images/104-River-scaled.jpg"
        imageAlt="The river running through Cascade, Idaho near Birch Glen Lodge"
        title={
          <>
            Birch Glen
            <br />
            Lodge &amp; Motel
          </>
        }
        subtitle={
          <>
            A Serene Mountain Getaway in <br /> Cascade, Idaho
          </>
        }
      >
        <ButtonAnchor
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
        >
          Book Now
        </ButtonAnchor>
        <ButtonLink href="/contact" variant="outlineLight">
          Contact Us
        </ButtonLink>
      </Hero>

      {/* 2. Intro (2-col) */}
      <Section>
        <Container className="grid items-stretch gap-12 lg:grid-cols-2">
          <div className="flex flex-col">
            <Reveal>
              <Eyebrow>Staying With Us</Eyebrow>
            </Reveal>
            <Reveal
              variant="img"
              delay={120}
              className="relative mt-6 aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-0 lg:flex-1"
            >
              <Image
                src="/images/001-Daytime-Aerial-scaled.jpg"
                alt="Daytime aerial view of Birch Glen Lodge and Lake Cascade"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
          <div>
            <Reveal as="h2" className="h2 text-ink">
              Escape to the Mountains, Stay by the Lake
            </Reveal>
            <Reveal
              variant="img"
              delay={100}
              className="relative mt-6 aspect-[21/9] w-full overflow-hidden"
            >
              <Image
                src="/images/BIRCH-38.jpg"
                alt="Birch Glen Lodge grounds near Lake Cascade"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-base leading-relaxed text-ink">
                Tucked away in the stunning mountains of Cascade, Idaho, just
                steps from Lake Cascade and next door to Kelly&rsquo;s
                Whitewater Park, we offer a peaceful retreat for adventurers,
                families, and anyone seeking a break from the hustle and bustle
                of city life. Established in 1968, our charming lodge has been a
                home away from home for visitors looking to experience the best
                of Idaho&rsquo;s great outdoors.
              </p>
              <ButtonLink href="/about" className="mt-8">
                Read More
                <ArrowRight />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3. Why Choose Us — World's Biggest Perch (text left, image right) */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Why Choose Us?</Eyebrow>
              <h2 className="h2 mt-3 text-ink">
                Home of the World&rsquo;s Biggest Perch
              </h2>
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="mt-6 text-lg leading-relaxed text-ink/80"
            >
              The biggest Perch in the world live right here in Lake Cascade.
              During the winter, ice-fishing is the community&rsquo;s hottest
              sport. Documented world-record caliber Perch are caught on this
              lake weekly. Catch and clean your trophies onsite. During the
              winter season we have an indoor DIY fish cleaning and processing
              room in the back of the lodge. It&rsquo;s free and open to all
              guests.
            </Reveal>
          </div>
          <Reveal
            variant="img"
            className="relative aspect-[3/2] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[440px]"
          >
            <Image
              src="/images/BIRCH-43.jpg"
              alt="Aerial view of Birch Glen Lodge beside Lake Cascade"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </Container>
      </Section>

      {/* 4. Homestyle Comfort — Inside or Outside (dark band, image left, text right) */}
      <Section className="bg-ink text-white">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal
            variant="img"
            className="relative aspect-[3/2] w-full overflow-hidden lg:order-1 lg:aspect-auto lg:h-full lg:min-h-[440px]"
          >
            <Image
              src="/images/BIRCH-71.jpg"
              alt="Guests relaxing at Birch Glen Lodge"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div className="lg:order-2">
            <Reveal>
              <Eyebrow className="!text-accent">Homestyle Comfort</Eyebrow>
              <h2 className="h2 mt-3 text-white">Inside or Outside</h2>
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="mt-6 text-lg leading-relaxed text-white/80"
            >
              You can choose between the peace and quiet of your room or
              exploring the wide range of activities at your doorstep. Rather be
              inside? Come relax in our lodge with accommodations that range
              from pool tables, sitting areas, large screen TVs, and card
              tables. Outside, you will find a barbecue area, a fire pit with
              plenty of seating, and a large grassy area to make any gathering a
              success. We view our guests as family and want you to feel as
              comfortable here as you do at home.
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 5. Explore our rooms */}
      <Section>
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Picture Your Stay"
              title="Explore our rooms"
            />
            <ButtonLink
              href="/rooms"
              className="shrink-0 self-start sm:self-auto"
            >
              View More
              <ArrowRight />
            </ButtonLink>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <RoomsCarousel items={homeRoomCards} />
          </Reveal>
        </Container>
      </Section>

      {/* 6. Groups & Events (2-col) */}
      <Section className="bg-cream">
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow="Who Comes To The Birch Glen?"
              title="Perfect for Groups & Events"
            />
            <ButtonAnchor
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-8"
            >
              Book A Stay
            </ButtonAnchor>
          </Reveal>
          {/* Reserve a fixed height so opening/closing panels doesn't reflow the section */}
          <Reveal delay={120} className="min-h-[460px] sm:min-h-[520px]">
            <Accordion items={events} />
          </Reveal>
        </Container>
      </Section>

      {/* 7. Testimonials */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow>Reviews</Eyebrow>
            <h3 className="h3 mt-3 text-ink">Testimonials from Our Clients</h3>
          </Reveal>
          <TestimonialSlider quotes={testimonials} />
        </Container>
      </Section>

      {/* 8. Newsletter (2-col) */}
      <Section className="bg-cream">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <Eyebrow>Stay Notified</Eyebrow>
            <h3 className="h3 mt-3 text-ink">Sign Up For Our Newsletter</h3>
          </Reveal>
          <div>
            <NewsletterEmbed />
          </div>
        </Container>
      </Section>

      {/* 9. Final CTA */}
      <BgSection image="/images/BIRCH-39.jpg" overlay="bg-ink/25">
        <div>
          <Container className="py-30 text-center">
            <Reveal
              as="h2"
              className="h2 text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
            >
              Book With Birch Glen Today
            </Reveal>
          </Container>
          <div className="bg-primary px-6 py-8 sm:py-10">
            <ul className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-16">
              <Reveal as="li">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 break-words text-lg text-white transition-colors hover:text-accent sm:text-xl lg:text-2xl"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    />
                    <path
                      d="M4 7l8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {site.email}
                </a>
              </Reveal>
              <Reveal as="li" delay={100}>
                <a
                  href={site.phoneSecondaryHref}
                  className="inline-flex items-center gap-3 break-words text-lg text-white transition-colors hover:text-accent sm:text-xl lg:text-2xl"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2Z"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {site.phoneSecondary}
                </a>
              </Reveal>
            </ul>
          </div>
        </div>
      </BgSection>
    </>
  );
}
