"use client";

import { useCallback, useEffect, useState } from "react";

const AUTOPLAY_MS = 6000;

/**
 * Right-column testimonial block: a teal quote badge beside the current quote,
 * with copper prev/next arrows. Auto-advances one quote at a time; pauses on
 * hover/focus and resets the timer after any manual navigation.
 */
export function TestimonialSlider({ quotes }: { quotes: string[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback(
    (dir: 1 | -1) => setI((c) => (c + dir + quotes.length) % quotes.length),
    [quotes.length],
  );

  // Autoplay — advance every AUTOPLAY_MS unless paused. Re-arms whenever `i`
  // changes so a manual click restarts the full interval.
  useEffect(() => {
    if (paused || quotes.length <= 1) return;
    const id = setInterval(() => {
      setI((c) => (c + 1) % quotes.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, quotes.length, i]);

  return (
    <div
      className="flex gap-5 sm:gap-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Teal quote badge */}
      <span
        aria-hidden
        className="mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M9.5 7C6.5 7 5 9.5 5 12.5V17h5v-5H7.5c0-2 .8-3 2-3V7Zm9 0c-3 0-4.5 2.5-4.5 5.5V17h5v-5H16c0-2 .8-3 2-3V7Z" />
        </svg>
      </span>

      <div className="flex-1">
        {/*
          All quotes are stacked in the same grid cell (every child pinned to
          row/col 1), so the block always reserves the height of the TALLEST
          quote and never reflows when the active one changes — we just fade
          between them.
        */}
        <div className="grid">
          {quotes.map((quote, idx) => (
            <blockquote
              key={idx}
              aria-hidden={idx !== i}
              className={
                "col-start-1 row-start-1 text-[22px] leading-relaxed text-ink/85 transition-opacity duration-500 sm:text-2xl " +
                (idx === i ? "opacity-100" : "pointer-events-none opacity-0")
              }
            >
              {quote}
            </blockquote>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end gap-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="inline-flex h-11 w-11 items-center justify-center text-primary transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <svg width="34" height="20" viewBox="0 0 34 20" fill="none" aria-hidden>
              <path d="M10 3 3 10l7 7M3 10h28" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="inline-flex h-11 w-11 items-center justify-center text-primary transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <svg width="34" height="20" viewBox="0 0 34 20" fill="none" aria-hidden>
              <path d="M24 3l7 7-7 7M31 10H3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
