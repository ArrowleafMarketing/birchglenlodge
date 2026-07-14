"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, site } from "@/lib/site";
import { cx } from "@/components/ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setGuideOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="Birch Glen Lodge home">
          <Image
            src="/images/BIRCH-GLEN-LODGE-LOGO.png"
            alt="Birch Glen Lodge"
            width={800}
            height={100}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cx(
                    "flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-primary",
                    pathname.startsWith(item.href) && "text-primary",
                  )}
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="mt-0.5">
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lg shadow-ink/5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-3 text-sm text-ink transition-colors hover:bg-accent/50 hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "text-sm font-medium text-ink transition-colors hover:text-primary",
                  pathname === item.href && "text-primary",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phonePrimaryHref}
            className="hidden items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-primary xl:flex"
          >
            <PhoneIcon />
            {site.phonePrimary}
          </a>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:inline-flex"
          >
            Book A Room
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-ink/10 bg-cream lg:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-5 py-4 sm:px-8">
            {primaryNav.map((item) => (
              <div key={item.href} className="border-b border-ink/5 last:border-0">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setGuideOpen((v) => !v)}
                      className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-ink"
                    >
                      {item.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        aria-hidden
                        className={cx("transition-transform", guideOpen && "rotate-180")}
                      >
                        <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                    {guideOpen ? (
                      <div className="pb-2 pl-4">
                        <Link href={item.href} className="block py-2 text-sm text-ink-soft">
                          Overview
                        </Link>
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href} className="block py-2 text-sm text-ink-soft">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link href={item.href} className="block py-3 text-base font-medium text-ink">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Book A Room
              </a>
              <a
                href={site.phonePrimaryHref}
                className="flex items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink"
              >
                <PhoneIcon />
                {site.phonePrimary}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 3h2l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v2a2 2 0 0 1-2 2A15 15 0 0 1 4.5 5a2 2 0 0 1 2-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
