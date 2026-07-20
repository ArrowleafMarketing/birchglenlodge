import Image from "next/image";
import type { ReactNode } from "react";
import { Container, cx } from "@/components/ui";

/**
 * Full-bleed hero with a background photo + dark overlay and centered content.
 * The site header is fixed + transparent, so heroes pad the top to clear it.
 * `tall` = the home hero (full viewport); default = interior page title band.
 */
export function Hero({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  children,
  tall = false,
  priority = false,
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  tall?: boolean;
  priority?: boolean;
}) {
  return (
    <section
      className={cx(
        "relative flex justify-center overflow-hidden",
        // Home (tall) hero anchors content in the upper half (over the sky/clouds);
        // interior heroes stay vertically centered.
        tall ? "min-h-screen items-start" : "min-h-[58vh] items-center",
      )}
    >
      <Image src={image} alt={imageAlt} fill priority={priority} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-ink/40" />
      <Container
        className={cx(
          "hero-enter relative text-center",
          // max() keeps the title clear of the fixed header on short/landscape viewports
          tall ? "pt-[max(15vh,7rem)] pb-24" : "pt-44 pb-20",
        )}
      >
        {eyebrow ? <p className="eyebrow !text-accent">{eyebrow}</p> : null}
        <h1 className={cx("mx-auto max-w-4xl text-white", tall ? "h1" : "h1 !text-[64px] max-[1024px]:!text-[52px] max-[767px]:!text-[40px]")}>
          {title}
        </h1>
        {subtitle ? (
          <div className="mx-auto mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">{subtitle}</div>
        ) : null}
        {children ? <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">{children}</div> : null}
      </Container>
    </section>
  );
}

/** Full-width section with a background photo + overlay (Home feature/CTA bands). */
export function BgSection({
  image,
  overlay = "bg-ink/55",
  className,
  children,
}: {
  image: string;
  overlay?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cx("relative overflow-hidden", className)}>
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      <div className={cx("absolute inset-0", overlay)} />
      <div className="relative">{children}</div>
    </section>
  );
}
