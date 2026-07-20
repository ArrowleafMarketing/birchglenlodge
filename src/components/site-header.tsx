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

  useEffect(() => {
    setOpen(false);
    setGuideOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-5 sm:px-8">
        {/* Logo — the image already has its own white background, so no pill */}
        <Link
          href="/"
          aria-label="Birch Glen Lodge home"
          className="flex h-[50px] items-center"
        >
          <Image
            src={site.headerLogo}
            alt="Birch Glen Lodge"
            width={663}
            height={250}
            priority
            className="h-[50px] w-auto rounded-[8px] shadow-md"
          />
        </Link>

        {/* Desktop nav in a white pill — pushed right to sit beside Book Now */}
        <nav
          aria-label="Primary"
          className="ml-auto hidden h-[50px] items-center rounded-[8px] bg-white px-2 shadow-sm lg:flex"
        >
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative h-full">
                <Link
                  href={item.href}
                  className={cx(
                    "flex h-full items-center gap-1 px-4 text-[15px] font-medium text-ink transition-colors hover:text-primary",
                    pathname.startsWith(item.href) && "text-primary",
                  )}
                >
                  {item.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    aria-hidden
                    className="mt-0.5"
                  >
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full min-w-[220px] pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-[8px] bg-ink py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-sm text-white transition-colors hover:text-accent"
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
                  "flex h-full items-center px-4 text-[15px] font-medium text-ink transition-colors hover:text-primary",
                  pathname === item.href && "text-primary",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Book Now (desktop) */}
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-[50px] items-center rounded-[8px] bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-secondary lg:inline-flex"
        >
          Book Now
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="ml-auto flex h-[50px] w-[50px] items-center justify-center rounded-[8px] bg-white text-ink shadow-sm lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile off-canvas menu */}
      {open ? (
        <div className="mx-5 max-h-[calc(100dvh-90px)] overflow-y-auto rounded-[8px] bg-white p-4 shadow-lg lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {primaryNav.map((item) => (
              <div
                key={item.href}
                className="border-b border-ink/5 last:border-0"
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setGuideOpen((v) => !v)}
                      aria-expanded={guideOpen}
                      className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-ink"
                    >
                      {item.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        aria-hidden
                        className={cx(
                          "transition-transform",
                          guideOpen && "rotate-45",
                        )}
                      >
                        <path
                          d="M6 2v8M2 6h8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                    {guideOpen ? (
                      <div className="pb-2 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-sm text-ink/70"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 rounded-[8px] bg-primary px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Book A Room
            </a>
            <a
              href={site.phonePrimaryHref}
              className="py-3 text-center text-sm font-semibold text-ink"
            >
              {site.phonePrimary}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
