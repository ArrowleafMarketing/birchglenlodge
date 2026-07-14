import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

type SectionProps = {
  className?: string;
  children: ReactNode;
  id?: string;
};

export function Section({ className, children, id }: SectionProps) {
  return (
    <section id={id} className={cx("py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cx("eyebrow text-primary", className)}>{children}</span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "outline" | "light";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  outline: "border border-ink/20 text-ink hover:border-primary hover:text-primary",
  light: "bg-white/95 text-ink hover:bg-white",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cx(buttonBase, buttonVariants[variant], className)} {...props} />
  );
}

export { cx };
