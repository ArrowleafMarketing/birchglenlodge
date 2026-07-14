import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Boxed content column — matches the live site's 1280px max container. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>{children}</div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cx("py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("eyebrow", className)}>{children}</span>;
}

/** Section title block: h6 eyebrow above an h2, matching the live pattern. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={cx(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className={cx("eyebrow", invert && "!text-accent")}>{eyebrow}</p>
      ) : null}
      <h2 className={cx("h2 mt-3", invert ? "text-white" : "text-ink")}>{title}</h2>
      {intro ? (
        <p className={cx("mt-5 text-lg leading-relaxed", invert ? "text-white/85" : "text-ink/80")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "onDark" | "outlineLight";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[8px] px-8 py-4 text-[17px] font-semibold leading-none transition-colors duration-200 sm:px-[50px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const buttonVariants: Record<ButtonVariant, string> = {
  // Live site: primary bg, white text, hover -> secondary (teal)
  primary: "bg-primary text-white hover:bg-secondary",
  onDark: "bg-white text-ink hover:bg-accent",
  // Ghost/outline used for the hero "Contact Us" button over a photo
  outlineLight: "border border-white/70 text-white hover:bg-white hover:text-ink",
};

/** Internal button-link (Next Link). */
export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={cx(buttonBase, buttonVariants[variant], className)} {...props} />;
}

/** External button-anchor (e.g. booking). */
export function ButtonAnchor({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return (
    <a className={cx(buttonBase, buttonVariants[variant], className)} {...props}>
      {children}
    </a>
  );
}

/** The small right-arrow that follows most CTA labels on the live site. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
