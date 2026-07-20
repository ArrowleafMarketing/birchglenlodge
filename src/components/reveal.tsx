"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-into-view wrapper. Renders `children` hidden (via the .reveal /
 * .reveal-img classes in globals.css) and flips data-shown="true" the first
 * time the element enters the viewport, then stops observing so it never
 * re-animates on scroll-up. Falls back to visible immediately when
 * IntersectionObserver is unavailable, and reduced-motion users get the final
 * state with no transition (handled in CSS).
 *
 *   <Reveal>…</Reveal>                       // fade-up text/block
 *   <Reveal variant="img">…</Reveal>         // image fade + gentle settle
 *   <Reveal delay={90}>…</Reveal>            // stagger siblings with a delay
 *   <Reveal as="li">…</Reveal>               // keep valid list semantics
 */
export function Reveal({
  children,
  as,
  variant = "text",
  delay = 0,
  className,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "text" | "img";
  delay?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      // No observer support: reveal on the next frame so nothing is stranded.
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const base = variant === "img" ? "reveal-img" : "reveal";
  return (
    <Tag
      ref={ref as never}
      className={className ? `${base} ${className}` : base}
      data-shown={shown ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Count-up number for stat blocks. Server-renders the final value (correct
 * without JS and for reduced-motion), then — for motion-OK visitors — counts
 * up from 0 the first time it scrolls into view. Preserves any non-numeric
 * suffix like the "+" in "270+".
 */
export function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const match = /^(\d[\d,]*)(.*)$/.exec(value.trim());
  const hasMatch = match !== null;
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[2] : value;
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasMatch) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        io.disconnect();
        // Count up from 0 → target; the first frame lands at ~0 so no reset flash.
        const duration = 1300;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, hasMatch]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
