"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GOOGLE_REVIEW_URL, site } from "@/lib/site";
import { RATINGS, RATING_LABELS, STAY_TYPES, type Rating } from "@/lib/review";
import { ArrowRight } from "@/components/ui";

/*
  The /leave-a-review gate: rate → branch → done.

  Presented as a full-screen lightbox over the home hero photo rather than a
  plain page — a flat white page reads as skippable, and the dimmed photo puts
  the card on top of the site the way the Arcadia review gate does. The X
  closes by returning home.

  A 5-star guest is handed the Google review link; 1–4 stars go to a private
  form that posts to /api/review-feedback/ and is seen only by the lodge. The
  rating is submitted alongside the form data.

  Brand notes: every corner is square (the site squared all of its buttons and
  inputs), headings are Lora via the .h3/.h4 classes, and the close button
  mirrors the header's white square menu toggle. Field and label styling is
  lifted from components/contact-form.tsx. Stars fill in `primary` (the
  terracotta CTA color) rather than the `accent` token — `accent` is the cream
  background tone (#ebe3d0) and would be invisible on white.
*/

type Step = "rate" | "google" | "feedback" | "done";

// The home hero photo, reused so the gate reads as an overlay on the site.
const BACKDROP = "/images/104-River-scaled.jpg";

// Lifted verbatim from contact-form.tsx.
const field =
  "w-full rounded-none border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

function feedbackCopy(rating: Rating) {
  if (rating === 4) {
    return {
      eyebrow: "Almost",
      heading: "What would have made it five stars?",
      body:
        "Glad it went well overall — but we'd rather hear what fell short so the next one is perfect. This goes straight to our team.",
    };
  }
  return {
    eyebrow: "We're listening",
    heading: "Tell us what went wrong",
    body:
      "We'd rather hear it directly so we can make it right. This goes straight to our team — tell us what happened and we'll follow up.",
  };
}

/** The white panel every step sits in. Square, per the brand. */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-none bg-white px-6 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-12 sm:py-14">
      {children}
    </div>
  );
}

function Required() {
  return (
    <span className="text-primary" aria-hidden>
      {" *"}
    </span>
  );
}

function ChangeRatingLink({
  onChangeRating,
  className,
}: {
  onChangeRating: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onChangeRating}
      className={`inline-flex items-center gap-2 text-sm text-ink/60 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-primary${
        className ? ` ${className}` : ""
      }`}
    >
      <span aria-hidden>←</span> Change my rating
    </button>
  );
}

export function ReviewFlow() {
  const router = useRouter();
  const [rating, setRating] = useState<Rating | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step: Step = submitted
    ? "done"
    : rating === null
      ? "rate"
      : rating === 5
        ? "google"
        : "feedback";

  // The gate covers the page, so keep what's behind it from scrolling, and let
  // Escape dismiss it the way any dialog would.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push("/");
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKey);
    };
  }, [router]);

  function resetRating() {
    setRating(null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === null || pending) return;
    setPending(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/review-feedback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          stayType: data.get("stayType"),
          feedback: data.get("feedback"),
        }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Something went wrong on our end.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong on our end.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="How was your experience with us?"
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
    >
      {/* Dimmed home hero behind the card. Fixed so it stays put while a tall
          card scrolls; the slight blur pushes it behind the content. */}
      <div className="fixed inset-0" aria-hidden>
        <Image
          src={BACKDROP}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-[5px]" />
      </div>

      {/* Mirrors the header's white square menu toggle. Pinned regardless of
          card scroll. */}
      <Link
        href="/"
        aria-label="Close and return to the Birch Glen Lodge home page"
        className="fixed right-4 top-4 z-[110] flex h-[50px] w-[50px] items-center justify-center rounded-none bg-white text-ink shadow-md transition-colors hover:bg-accent sm:right-6 sm:top-6"
      >
        <CloseIcon />
      </Link>

      {/* Centers the card when it fits; scrolls with padding when it doesn't. */}
      <div className="relative flex min-h-full items-center justify-center px-4 py-20 sm:px-6">
        <div className="w-full max-w-[620px]">
          {step === "rate" && <RatingStep onRate={setRating} rating={rating} />}

          {step === "google" && (
            <GoogleStep onChangeRating={resetRating} />
          )}

          {step === "feedback" && rating !== null && (
            <Card>
              <FeedbackStep
                rating={rating}
                pending={pending}
                error={error}
                onSubmit={handleSubmit}
                onChangeRating={resetRating}
              />
            </Card>
          )}

          {step === "done" && <ThankYouStep />}
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 1: the rating ---------- */

function RatingStep({
  rating,
  onRate,
}: {
  rating: Rating | null;
  onRate: (value: Rating) => void;
}) {
  // Pointer beats keyboard focus beats the committed rating, so the row
  // previews before it commits.
  const [hovered, setHovered] = useState<Rating | null>(null);
  const [focused, setFocused] = useState<Rating | null>(null);
  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const preview = hovered ?? focused ?? rating ?? 0;
  const previewLabel = hovered ?? focused ?? rating;

  /** Roving focus across the stars; selection commits on click/Enter/Space. */
  function handleKeyDown(e: React.KeyboardEvent, value: Rating) {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowUp"
        ? Math.min(5, value + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowDown"
          ? Math.max(1, value - 1)
          : e.key === "Home"
            ? 1
            : e.key === "End"
              ? 5
              : null;
    if (next === null) return;
    e.preventDefault();
    setFocused(next as Rating);
    starRefs.current[next - 1]?.focus();
  }

  return (
    <Card>
      <div className="text-center">
        <p className="eyebrow">Your stay</p>
        <h1 className="h3 mt-3 text-ink">How was your experience with us?</h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink/80">
          Your honest feedback helps us get better — it only takes a few
          seconds.
        </p>

        <div
          role="radiogroup"
          aria-label="Rate your experience from 1 to 5 stars"
          className="mt-9 flex items-center justify-center gap-1 sm:gap-2"
          onMouseLeave={() => setHovered(null)}
        >
          {RATINGS.map((value) => (
            <button
              key={value}
              ref={(el) => {
                starRefs.current[value - 1] = el;
              }}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} ${value === 1 ? "star" : "stars"} — ${RATING_LABELS[value]}`}
              tabIndex={(focused ?? rating ?? 1) === value ? 0 : -1}
              onClick={() => onRate(value)}
              onMouseEnter={() => setHovered(value)}
              onFocus={() => setFocused(value)}
              onBlur={() => setFocused(null)}
              onKeyDown={(e) => handleKeyDown(e, value)}
              className="cursor-pointer p-1 transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-1.5"
            >
              <StarIcon filled={value <= preview} />
            </button>
          ))}
        </div>

        {/* Height reserved so revealing the label never shifts the card. */}
        <p
          aria-live="polite"
          className="mt-4 flex min-h-[1.75rem] items-center justify-center text-base font-medium text-primary"
        >
          {previewLabel ? RATING_LABELS[previewLabel] : ""}
        </p>
      </div>
    </Card>
  );
}

/* ---------- Step 2a: five stars → Google ---------- */

function GoogleStep({ onChangeRating }: { onChangeRating: () => void }) {
  return (
    <Card>
      <div className="text-center">
        {/* Reflect the five stars back first, so the ask reads as the other
            half of what they already started. */}
        <div className="flex items-center justify-center gap-1.5">
          {RATINGS.map((value) => (
            <StarIcon key={value} filled className="h-7 w-7" />
          ))}
        </div>

        <p className="eyebrow mt-7">One last step</p>
        <h1 className="h3 mt-3 text-ink">
          We&#8217;re glad you had a good experience!
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink/80">
          Reviews are how most people find us — a few words from you helps the
          next family decide where to stay. And hearing it from a real guest
          means far more than anything we could say about ourselves.
        </p>

        {/* The whole point of this screen: heavier than anything else here. */}
        <div className="mt-9">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-none bg-primary px-6 py-5 text-[17px] font-semibold leading-none text-white shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <GoogleGlyph />
            Leave a Google Review
            <ArrowRight className="hidden sm:block" />
          </a>
          <p className="mt-3.5 text-sm text-ink/55">
            Opens Google in a new tab — takes about 30 seconds
          </p>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-ink/70">
          Thank you for taking a moment — it genuinely makes a difference.
        </p>

        <ChangeRatingLink onChangeRating={onChangeRating} className="mt-6" />
      </div>
    </Card>
  );
}

/* ---------- Step 2b: one to four stars → the private form ---------- */

function FeedbackStep({
  rating,
  pending,
  error,
  onSubmit,
  onChangeRating,
}: {
  rating: Rating;
  pending: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeRating: () => void;
}) {
  const copy = feedbackCopy(rating);

  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1 className="h3 mt-3 text-ink">{copy.heading}</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/80">{copy.body}</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First Name
              <Required />
            </label>
            <input id="firstName" name="firstName" required className={field} />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last Name
              <Required />
            </label>
            <input id="lastName" name="lastName" required className={field} />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
            <Required />
          </label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={field} />
        </div>
        <div>
          <label htmlFor="stayType" className={labelClass}>
            What did you book?
          </label>
          <select id="stayType" name="stayType" defaultValue="" className={field}>
            <option value="">Select one…</option>
            {STAY_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="feedback" className={labelClass}>
            What could we have done better?
            <Required />
          </label>
          <textarea id="feedback" name="feedback" rows={5} required className={field} />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-none bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send Feedback"}
        </button>

        {error ? (
          <p
            role="alert"
            className="border border-primary/40 bg-accent px-4 py-3 text-sm text-ink"
          >
            {error} Please call us at{" "}
            <a
              href={site.phoneSecondaryHref}
              className="text-primary underline underline-offset-2"
            >
              {site.phoneSecondary}
            </a>{" "}
            and we&#8217;ll make it right.
          </p>
        ) : null}
      </form>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-ink/70">
        <ChangeRatingLink onChangeRating={onChangeRating} />
        <span>
          Or talk to us now:{" "}
          <a
            href={site.phoneSecondaryHref}
            className="text-primary underline underline-offset-2"
          >
            {site.phoneSecondary}
          </a>
        </span>
      </div>
    </>
  );
}

/* ---------- Step 3: submitted ---------- */

function ThankYouStep() {
  return (
    <Card>
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden>
            <path
              d="M4 12.5l5 5L20 6.5"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h1 className="h3 mt-7 text-ink">Thank you — we hear you.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink/80">
          Someone from our team will follow up within 1 business day.
        </p>
        <p className="mt-5 text-sm leading-relaxed text-ink/70">
          Need us sooner? Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-primary underline underline-offset-2"
          >
            {site.email}
          </a>
          .
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-none bg-primary px-8 py-4 text-[17px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Back to Birch Glen Lodge
          <ArrowRight />
        </Link>
      </div>
    </Card>
  );
}

/* ---------- Icons (inline SVG, matching the site's convention) ---------- */

function StarIcon({
  filled,
  className = "h-11 w-11",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${className} transition-colors duration-150 ${
        filled ? "text-primary" : "text-ink/20"
      }`}
    >
      <path
        fill="currentColor"
        d="M12 2.6l2.9 5.88 6.5.94-4.7 4.58 1.11 6.47L12 17.4l-5.81 3.07 1.11-6.47-4.7-4.58 6.5-.94L12 2.6z"
      />
    </svg>
  );
}

/** Google's four-color "G", inline so there is no icon library or remote asset. */
function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48" width="22" height="22" aria-hidden className="shrink-0">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
