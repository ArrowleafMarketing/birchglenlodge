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

/**
 * "What did you book?" options. Derived from what the lodge actually sells —
 * the five room types in lib/content.ts (roomsCarousel) plus the group/event
 * categories from the home "Perfect for Groups & Events" accordion — so the
 * answer is always something a guest could have booked. Keep in step with
 * content.ts if the room lineup or event list changes.
 */
export const STAY_TYPES = [
  "Royal King",
  "Deluxe Double",
  "Single Queen",
  "Triple",
  "Private Upstairs Suite",
  "Wedding or Reception",
  "Family Reunion",
  "Corporate Retreat",
  "Group Getaway",
  "Other",
] as const;

export type StayType = (typeof STAY_TYPES)[number];

/** The POST body accepted by /api/review-feedback/. */
export type ReviewFeedbackPayload = {
  rating: Rating;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  stayType?: string;
  feedback: string;
};

/** Narrow an unknown number/string to a Rating, or null. */
export function toRating(value: unknown): Rating | null {
  const n = typeof value === "string" ? Number(value) : value;
  return RATINGS.includes(n as Rating) ? (n as Rating) : null;
}
