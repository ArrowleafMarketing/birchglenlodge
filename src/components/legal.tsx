import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";

/** Title band + long-form prose wrapper for Privacy / Terms. Clears the fixed header. */
export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-accent/40 pt-36 pb-14 sm:pt-40 sm:pb-16">
        <Container>
          <Reveal
            as="h1"
            className="h1 !text-[56px] text-ink max-[767px]:!text-[40px]"
          >
            {title}
          </Reveal>
        </Container>
      </section>
      <Container className="prose-body max-w-3xl py-16 text-ink/80 sm:py-20">{children}</Container>
    </>
  );
}
