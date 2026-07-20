"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type RoomCard = { name: string; image: string };

/**
 * Stepped, auto-advancing room carousel: shows 3 cards at a time (2 on tablet,
 * 1 on mobile) and shifts ONE card at a time every few seconds with a smooth
 * slide transition — then pauses before the next step. Seamless infinite loop
 * via trailing clones; pauses on hover; respects reduced-motion.
 */
export function RoomsCarousel({ items }: { items: RoomCard[] }) {
  const n = items.length;
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const pausedRef = useRef(false);

  // Responsive cards-per-view
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Auto-advance one slide at a time
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => i + 1);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  // Seamless loop: after sliding into the trailing clones, snap back to 0
  useEffect(() => {
    if (index === n) {
      const t = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 650);
      return () => clearTimeout(t);
    }
    if (!animate) {
      const r = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true)),
      );
      return () => cancelAnimationFrame(r);
    }
  }, [index, n, animate]);

  const step = 100 / perView;
  const slides = [...items, ...items.slice(0, perView)];

  const goNext = () => setIndex((i) => i + 1);
  const goPrev = () => {
    if (index <= 0) {
      setAnimate(false);
      setIndex(n);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(n - 1);
        }),
      );
    } else {
      setIndex((i) => i - 1);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${index * step}%)`,
            transition: animate ? "transform 600ms ease" : "none",
          }}
        >
          {slides.map((room, i) => (
            <div
              key={i}
              className="shrink-0 px-3"
              style={{ flex: `0 0 ${step}%` }}
              aria-hidden={i >= n}
            >
              <Link href="/rooms" className="block" tabIndex={i >= n ? -1 : 0}>
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={room.image}
                    alt={`${room.name} room at Birch Glen Lodge in Cascade, Idaho`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="h5 mt-4 text-center text-ink">{room.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous rooms"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-primary hover:text-primary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next rooms"
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
