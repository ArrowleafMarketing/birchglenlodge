import type { Metadata } from "next";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Birch Glen Lodge in Cascade, Idaho. Call, email, or send us a message and let us help plan your next mountain getaway.",
};

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=762+S+Main+St+Cascade+ID+83611";

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-accent/40">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="Contact Us"
            title="Your Mountain Getaway Awaits"
            intro="Snuggled in the picturesque mountains north of Boise, Birch Glen Lodge offers a rare blend of privacy, relaxation, and entertainment. We'd love to hear from you."
          />
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Get In Touch</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-semibold text-ink">
              Let Us Help You On Your Next Adventure
            </h2>

            <ul className="mt-8 space-y-6">
              <ContactRow label="Phone">
                <a href={site.phonePrimaryHref} className="hover:text-primary">
                  {site.phonePrimary}
                </a>
                <span className="px-2 text-ink/30">·</span>
                <a href={site.phoneSecondaryHref} className="hover:text-primary">
                  {site.phoneSecondary}
                </a>
              </ContactRow>
              <ContactRow label="Email">
                <a href={`mailto:${site.email}`} className="hover:text-primary">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow label="Address">
                {site.address.street}, {site.address.city}, {site.address.state}{" "}
                {site.address.zip}
                <br />
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  Get Directions →
                </a>
              </ContactRow>
            </ul>

            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Book A Room
            </a>
          </div>

          <div className="rounded-card bg-white p-8 shadow-sm ring-1 ring-ink/5 sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-ink">Get In Touch Today!</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Send us a message and we&apos;ll get back to you soon.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{label}</p>
      <p className="mt-1.5 text-lg text-ink">{children}</p>
    </li>
  );
}
