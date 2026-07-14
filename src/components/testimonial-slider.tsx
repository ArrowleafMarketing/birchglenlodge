"use client";

import { useState } from "react";

/** One quote at a time with manual prev/next (no autoplay). */
export function TestimonialSlider({ quotes }: { quotes: string[] }) {
  const [i, setI] = useState(0);
  const go = (dir: 1 | -1) => setI((c) => (c + dir + quotes.length) % quotes.length);

  return (
    <div className="mx-auto max-w-3xl text-center">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="mx-auto text-primary/30">
        <path d="M9.5 7C6.5 7 5 9.5 5 12.5V17h5v-5H7.5c0-2 .8-3 2-3V7Zm9 0c-3 0-4.5 2.5-4.5 5.5V17h5v-5H16c0-2 .8-3 2-3V7Z" />
      </svg>
      <blockquote className="mt-4 min-h-[9rem] text-xl leading-relaxed text-ink/80">
        {quotes[i]}
      </blockquote>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-primary hover:text-primary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
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
