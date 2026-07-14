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
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="h5 text-ink">{item.title}</span>
              <span className="shrink-0 text-primary" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M12 5v14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={cx("origin-center transition-transform", isOpen && "scale-y-0")}
                  />
                </svg>
              </span>
            </button>
            <div className={cx("overflow-hidden transition-all", isOpen ? "max-h-[600px] pb-6" : "max-h-0")}>
              {item.body.map((p, j) => (
                <p key={j} className="mb-3 leading-relaxed text-ink/75 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
