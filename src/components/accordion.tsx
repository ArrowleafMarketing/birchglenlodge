"use client";

import { useState } from "react";
import { cx } from "@/components/ui";

export type AccordionItem = { title: string; body: string[] };

/** ElementsKit-style accordion; first item open by default (matches the live site). */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span
                className={cx(
                  "h5 text-ink transition-colors duration-200 group-hover:text-primary",
                  isOpen && "text-primary"
                )}
              >
                {item.title}
              </span>
              <span className="shrink-0 text-primary" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M12 5v14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={cx(
                      "origin-center transition-transform duration-300 ease-out",
                      isOpen && "scale-y-0"
                    )}
                  />
                </svg>
              </span>
            </button>
            {/* Grid-rows 0fr→1fr animates to the content's exact height — smooth both ways */}
            <div
              className={cx(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cx(
                    "pb-6 transition-opacity duration-300 ease-out",
                    isOpen ? "opacity-100 delay-100" : "opacity-0"
                  )}
                >
                  {item.body.map((p, j) => (
                    <p key={j} className="mb-3 leading-relaxed text-ink/75 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
