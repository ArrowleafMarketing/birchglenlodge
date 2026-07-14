import type { ReactNode } from "react";
import { Container } from "@/components/ui";

export function LegalShell({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-ink/10 bg-accent/40">
        <Container className="py-16 sm:py-20">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-primary">
            Effective Date: {effectiveDate}
          </p>
        </Container>
      </section>
      <Container className="legal-prose max-w-3xl py-16 sm:py-20">{children}</Container>
    </>
  );
}
