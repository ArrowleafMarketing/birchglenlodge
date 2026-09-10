/*
  Shared vocabulary for the /leave-a-review flow.

  Both the client component (src/components/review-flow.tsx) and the server
  route handler (src/app/api/review-feedback/route.ts) import from here so the
  rating labels and stay-type options can never drift apart between the form a
  guest fills in and the email the lodge receives.
*/

/** The only ratings the flow accepts. 5 routes to Google; 1–4 route to the private form. */
export const RATINGS = [1, 2, 3, 4, 5] as const;
export type Rating = (typeof RATINGS)[number];

/** The live label under the stars, keyed by rating. */
export const RATING_LABELS: Record<Rating, string> = {
  1: "Very disappointed",
  2: "Disappointed",
  3: "It was okay",
  4: "Happy with it",
  5: "Couldn't be happier",
};

/** The POST body accepted by /api/review-feedback/. */
export type ReviewFeedbackPayload = {
  rating: Rating;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  feedback: string;
};

/** Narrow an unknown number/string to a Rating, or null. */
export function toRating(value: unknown): Rating | null {
  const n = typeof value === "string" ? Number(value) : value;
  return RATINGS.includes(n as Rating) ? (n as Rating) : null;
}
