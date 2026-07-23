import type { ReactNode } from "react";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Hero } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { MapEmbed } from "@/components/embeds";
import { site } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Birch Glen Lodge | Cascade, Idaho",
  description:
    "Get in touch with Birch Glen Lodge in Cascade, Idaho. Call 208-382-4238, email info@thebirchglenlodge.com, or send a message — your mountain getaway awaits.",
  path: "/contact/",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact/" },
]);

function MapIcon() {
  return (
    <svg
      viewBox="0 0 576 512"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden
      className="mt-0.5 shrink-0 text-primary"
    >
      <path d="M560.02 32c-1.96 0-3.98.37-5.96 1.16L384.01 96H384L212 35.28A64.252 64.252 0 0 0 191.76 32c-6.69 0-13.37 1.05-19.81 3.14L20.12 87.95A32.006 32.006 0 0 0 0 117.66v346.32C0 473.17 7.53 480 15.99 480c1.96 0 3.97-.37 5.96-1.16L192 416l172 60.71a63.98 63.98 0 0 0 40.05.15l151.83-52.81A31.996 31.996 0 0 0 576 394.34V48.02c0-9.19-7.53-16.02-15.98-16.02zM224 90.42l128 45.19v285.97l-128-45.19V90.42zM48 418.05V129.07l128-44.53v286.2l-.64.23L48 418.05zm480-35.13l-128 44.53V141.26l.64-.24L528 93.95v288.97z" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      viewBox="0 0 512 512"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden
      className="mt-0.5 shrink-0 text-primary"
    >
      <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 320 512"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden
      className="mt-0.5 shrink-0 text-primary"
    >
      <path d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z" />
    </svg>
  );
}

function ContactItem({
  icon,
  href,
  external,
  delay,
  children,
}: {
  icon: ReactNode;
  href: string;
  external?: boolean;
  delay?: number;
  children: ReactNode;
}) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Reveal as="li" delay={delay}>
      <a
        href={href}
        {...linkProps}
        className="flex items-start gap-4 text-lg text-ink transition-colors hover:text-primary"
      >
        {icon}
        <span>{children}</span>
      </a>
    </Reveal>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* 1. Hero */}
      <Hero
        image="/images/BIRCH-33.jpg"
        imageAlt="Kayaker surfing a wave at Kelly's Whitewater Park next to Birch Glen Lodge in Cascade, Idaho"
        title="Contact Us"
        subtitle="Escape. Explore. Relax. Your Mountain Getaway Awaits"
        priority
      />

      {/* 2. Info + Form — 2 column */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* Left: contact info */}
          <div>
            <Reveal>
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="h2 mt-3 text-ink">
                We&#8217;d Love to Hear From You
              </h2>
            </Reveal>

            <ul className="mt-8 space-y-5">
              <ContactItem
                icon={<MapIcon />}
                href={site.mapUrl}
                external
                delay={120}
              >
                {site.address.contactList}
              </ContactItem>
              <ContactItem
                icon={<EnvelopeIcon />}
                href={`mailto:${site.email}`}
                delay={210}
              >
                {site.email}
              </ContactItem>
              <ContactItem
                icon={<PhoneIcon />}
                href={site.phoneSecondaryHref}
                delay={300}
              >
                {site.phoneSecondary}
              </ContactItem>
            </ul>
          </div>

          {/* Right: intro + form */}
          <div>
            <Reveal>
              <Eyebrow>Let Us Help You On Your Next Adventure</Eyebrow>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Right next to Kelly&#8217;s Whitewater Park, Birch Glen Lodge is
                snuggled in the picturesque mountains north of Boise. We offer a
                rare blend of privacy, relaxation, and entertainment.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Birch Glen Lodge is great for romantic weekends, family
                getaways, corporate retreats, reunions or just to get away from
                the hustle and bustle of the city. Birch Glen Lodge is a
                can&#8217;t miss experience!
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3. Google Map — full width */}
      <section>
        <MapEmbed />
      </section>
    </>
  );
}
