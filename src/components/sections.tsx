import Image from "next/image";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative flex min-h-[46vh] items-center overflow-hidden bg-primary-dark">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/60" />
      <Container className="relative py-24 text-center">
        {eyebrow ? (
          <span className="eyebrow text-accent">{eyebrow}</span>
        ) : null}
        <h1 className="font-display mx-auto mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{subtitle}</p>
        ) : null}
      </Container>
    </section>
  );
}

export function CtaBand({
  eyebrow = "Get In Touch Today!",
  title = "Escape. Explore. Relax.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="bg-secondary">
      <Container className="flex flex-col items-center gap-8 py-16 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <span className="eyebrow text-accent">{eyebrow}</span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-secondary transition-colors hover:bg-white"
          >
            Book A Room
          </a>
          <a
            href={site.phonePrimaryHref}
            className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Give Us A Call
          </a>
        </div>
      </Container>
    </section>
  );
}
