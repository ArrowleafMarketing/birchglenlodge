"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cx } from "@/components/ui";

export type CarouselItem = {
  image: string;
  hover?: string;
  title?: string;
  href?: string;
  alt?: string;
};

/**
 * Horizontal card carousel with manual prev/next (no autoplay — per "everything
 * except animations"). ~2 cards per view on desktop, matching the live sliders.
 */
export function CardCarousel({
  items,
  perView = 2,
  aspect = "aspect-[3/2]",
}: {
  items: CarouselItem[];
  perView?: number;
  aspect?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCards(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  const basis =
    perView === 2
      ? "basis-[85%] sm:basis-[calc(50%-12px)]"
      : "basis-[85%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]";

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const card = (
            <>
              <div className={cx("relative w-full overflow-hidden", aspect)}>
                <Image
                  src={item.image}
                  alt={item.alt ?? item.title ?? "Birch Glen Lodge"}
                  fill
                  sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 85vw"
                  className={cx("object-cover", item.hover && "transition-opacity duration-300 group-hover:opacity-0")}
                />
                {item.hover ? (
                  <Image
                    src={item.hover}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 85vw"
                    className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                ) : null}
              </div>
              {item.title ? (
                <h5 className="h5 mt-4 text-center text-ink">{item.title}</h5>
              ) : null}
            </>
          );
          return (
            <div key={i} data-card className={cx("group shrink-0 snap-start", basis)}>
              {item.href ? (
                <Link href={item.href} className="block">
                  {card}
                </Link>
              ) : (
                card
              )}
            </div>
          );
        })}
      </div>

      {/* Prev / next — only when there are more cards than fit in view */}
      <div className={cx("mt-6 flex justify-center gap-3", items.length <= perView && "hidden")}>
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-primary hover:text-primary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-primary hover:text-primary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
