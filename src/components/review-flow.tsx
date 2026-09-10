"use client";

import { useRef, useState } from "react";
import { GOOGLE_REVIEW_URL, site } from "@/lib/site";
import { RATINGS, RATING_LABELS, STAY_TYPES, type Rating } from "@/lib/review";
import { ButtonAnchor } from "@/components/ui";

/*
  The /leave-a-review flow: rate → branch → done.

  A 5-star guest is handed the Google review link; 1–4 stars go to a private
  form that posts to /api/review-feedback/ and is seen only by the lodge. The
  rating is submitted alongside the form data.

  Field/label/button styling is lifted from components/contact-form.tsx so this
  page looks like it always belonged to the site.

  Stars fill in `primary` (the terracotta CTA color) rather than the `accent`
  token — `accent` is the cream background tone (#ebe3d0) and would be all but
  invisible against white.
*/

type Step = "rate" | "google" | "feedback" | "done";

// Copy for the private-feedback branch. A 4-star guest gets the softer ask; a
// 1–3 star guest gets the direct one. Never show "what went wrong" to someone
// who had a good stay.
function feedbackCopy(rating: Rating) {
  if (rating === 4) {
    return {
      heading: "What would have made it five stars?",
      body:
        "Glad it went well overall — but we'd rather hear what fell short so the next one is perfect. This goes straight to our team.",
    };
  }
  return {
    heading: "Tell us what went wrong",
    body:
      "We'd rather hear it directly so we can make it right. This goes straight to our team — tell us what happened and we'll follow up.",
  };
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="44"
      height="44"
      aria-hidden
      className={`transition-colors duration-150 ${
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
    <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden className="shrink-0">
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

// Lifted verbatim from contact-form.tsx.
const field =
  "w-full rounded-none border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

function Required() {
  return (
    <span className="text-primary" aria-hidden>
      {" *"}
    </span>
  );
}

export function ReviewFlow() {
  const [rating, setRating] = useState<Rating | null>(null);
  const [submitted, setSubmitted] = useState(false);
  // Star preview follows the pointer, and keyboard focus, independently.
  const [hovered, setHovered] = useState<Rating | null>(null);
  const [focused, setFocused] = useState<Rating | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const step: Step = submitted
    ? "done"
    : rating === null
      ? "rate"
      : rating === 5
        ? "google"
        : "feedback";

  // What the stars show right now: pointer beats keyboard focus beats committed.
  const preview = hovered ?? focused ?? rating ?? 0;
  const previewLabel = hovered ?? focused ?? rating;

  function resetRating() {
    setRating(null);
    setHovered(null);
    setFocused(null);
    setError(null);
  }

  /** Roving focus across the stars; selection is committed with click/Enter/Space. */
  function handleStarKeyDown(e: React.KeyboardEvent, value: Rating) {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === null) return;
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

  if (step === "done") {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
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
        <h1 className="h3 mt-6 text-ink">Thank you — we hear you.</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink/80">
          Someone from our team will follow up within 1 business day.
        </p>
        <p className="mt-6 text-sm text-ink/70">
          Need us sooner? Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-primary underline underline-offset-2"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  if (step === "google") {
    return (
      <div className="text-center">
        <h1 className="h3 text-ink">We&#8217;re glad you had a good experience!</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
          Reviews are how most people find us — a few words from you helps the next
          family decide where to stay. And hearing it from a real guest means far
          more than anything we could say about ourselves.
        </p>
        <div className="mt-8">
          <ButtonAnchor
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoogleGlyph />
            Leave a Google Review
          </ButtonAnchor>
        </div>
        <p className="mt-6 text-sm text-ink/70">
          Thank you for taking a moment — it genuinely makes a difference.
        </p>
        <button
          type="button"
          onClick={resetRating}
          className="mt-8 text-sm text-ink/60 underline underline-offset-2 transition-colors hover:text-primary"
        >
          Change my rating
        </button>
      </div>
    );
  }

  if (step === "feedback" && rating !== null) {
    const copy = feedbackCopy(rating);
    return (
      <div>
        <h1 className="h3 text-ink">{copy.heading}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/80">{copy.body}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
            <textarea
              id="feedback"
              name="feedback"
              rows={5}
              required
              className={field}
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-none bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
          <button
            type="button"
            onClick={resetRating}
            className="underline underline-offset-2 transition-colors hover:text-primary"
          >
            Change my rating
          </button>
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
      </div>
    );
  }

  // step === "rate"
  return (
    <div className="text-center">
      <h1 className="h3 text-ink">How was your experience with us?</h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
        Your honest feedback helps us get better — it only takes a few seconds.
      </p>

      <div
        role="radiogroup"
        aria-label="Rate your experience from 1 to 5 stars"
        className="mt-10 flex items-center justify-center gap-1 sm:gap-2"
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
            onClick={() => setRating(value)}
            onMouseEnter={() => setHovered(value)}
            onFocus={() => setFocused(value)}
            onBlur={() => setFocused(null)}
            onKeyDown={(e) => handleStarKeyDown(e, value)}
            className="cursor-pointer p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Star filled={value <= preview} />
          </button>
        ))}
      </div>

      {/* Height reserved so revealing the label never shifts the layout. */}
      <div className="mt-3 flex h-7 items-center justify-center">
        <p aria-live="polite" className="text-base font-medium text-primary">
          {previewLabel ? RATING_LABELS[previewLabel] : " "}
        </p>
      </div>
    </div>
  );
}
