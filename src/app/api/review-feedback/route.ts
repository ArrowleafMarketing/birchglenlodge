/*
  Private review-feedback intake for /leave-a-review.

  Guests who rate the stay 1–4 stars land on a private form instead of Google;
  this is where that form posts. The whole send path is written and correct but
  DELIVERY IS INERT until the review-specific env vars are set — adding them
  later requires zero code changes here. See docs/leave-a-review-setup.md.

  Channels (independent, both optional):
    - Email via Resend  — needs RESEND_API_KEY + RESEND_FROM + REVIEW_FEEDBACK_TO
    - CRM webhook       — needs REVIEW_FEEDBACK_WEBHOOK_URL

  With NOTHING configured we log the full submission server-side and still
  return 200, so the guest sees the normal thank-you screen rather than an
  error caused by our own missing setup. The response body says so
  (`delivery: "not configured"`) for anyone testing the endpoint directly.

  DELIBERATE: this route reads ONLY the REVIEW_* / RESEND_* vars above. It must
  never fall back to a general contact-form or new-lead address — an unhappy
  guest's complaint landing in the new-inquiry workflow is exactly the failure
  this page exists to prevent. Do not "improve" this into a shared mailer.
*/
import { Resend } from "resend";
import { site } from "@/lib/site";
import { RATING_LABELS, toRating, type ReviewFeedbackPayload } from "@/lib/review";

// Feedback must be delivered per-request; never cached or prerendered.
export const dynamic = "force-dynamic";

/** Trim + cap a free-text field so one bad request can't post a novel. */
function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Minimal shape check — enough to catch a typo'd address, not a validator library. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape guest-supplied text before it goes into the HTML email body. */
function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

type Outcome = { channel: string; ok: boolean; detail?: string };

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed JSON body." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  const rating = toRating(raw.rating);
  const firstName = str(raw.firstName, 100);
  const lastName = str(raw.lastName, 100);
  const email = str(raw.email, 200);
  const phone = str(raw.phone, 50);
  const stayType = str(raw.stayType, 100);
  const feedback = str(raw.feedback, 5000);

  const errors: string[] = [];
  if (rating === null) errors.push("rating must be 1–5");
  if (!firstName) errors.push("firstName is required");
  if (!lastName) errors.push("lastName is required");
  if (!email) errors.push("email is required");
  else if (!looksLikeEmail(email)) errors.push("email is not a valid address");
  if (!feedback) errors.push("feedback is required");

  if (rating !== null && rating === 5) {
    // 5-star guests are sent to Google and never see this form; a 5 here means
    // a hand-crafted or replayed request, not a real submission.
    errors.push("rating 5 does not use this endpoint");
  }

  if (errors.length > 0) {
    return Response.json({ error: errors.join("; ") }, { status: 400 });
  }

  const submission: ReviewFeedbackPayload & {
    ratingLabel: string;
    receivedAt: string;
  } = {
    rating: rating!,
    firstName,
    lastName,
    email,
    phone: phone || undefined,
    stayType: stayType || undefined,
    feedback,
    ratingLabel: RATING_LABELS[rating!],
    receivedAt: new Date().toISOString(),
  };

  const fullName = `${firstName} ${lastName}`;
  const subject = `Client Feedback (${rating} of 5) — ${fullName}`;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.REVIEW_FEEDBACK_TO;
  const webhookUrl = process.env.REVIEW_FEEDBACK_WEBHOOK_URL;

  const emailConfigured = Boolean(apiKey && from && to);
  const webhookConfigured = Boolean(webhookUrl);

  // Nothing wired up yet: log the whole thing so it is at least recoverable
  // from the server logs, and tell the caller plainly that it went nowhere.
  if (!emailConfigured && !webhookConfigured) {
    console.warn(
      "[review-feedback] DELIVERY NOT CONFIGURED — submission logged and discarded. " +
        "Set RESEND_API_KEY, RESEND_FROM and REVIEW_FEEDBACK_TO (see docs/leave-a-review-setup.md).",
      JSON.stringify(submission, null, 2),
    );
    return Response.json({ ok: true, delivery: "not configured" });
  }

  const outcomes: Outcome[] = [];

  if (emailConfigured) {
    const lines = [
      `Rating: ${rating} of 5 — ${submission.ratingLabel}`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Booked: ${stayType || "—"}`,
      `Received: ${submission.receivedAt}`,
      "",
      "What could we have done better?",
      feedback,
    ];

    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#252528">
        <h2 style="font-size:18px;margin:0 0 4px">Private guest feedback — ${rating} of 5</h2>
        <p style="margin:0 0 20px;color:#6f432b">${esc(submission.ratingLabel)}</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
          <tr><td style="padding:4px 16px 4px 0"><strong>Name</strong></td><td style="padding:4px 0">${esc(fullName)}</td></tr>
          <tr><td style="padding:4px 16px 4px 0"><strong>Email</strong></td><td style="padding:4px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td style="padding:4px 16px 4px 0"><strong>Phone</strong></td><td style="padding:4px 0">${esc(phone) || "&mdash;"}</td></tr>
          <tr><td style="padding:4px 16px 4px 0"><strong>Booked</strong></td><td style="padding:4px 0">${esc(stayType) || "&mdash;"}</td></tr>
        </table>
        <p style="margin:0 0 6px"><strong>What could we have done better?</strong></p>
        <p style="margin:0 0 24px;white-space:pre-wrap">${esc(feedback)}</p>
        <p style="margin:0;font-size:13px;color:#252528a0">
          Sent from the private feedback form at ${site.url}/leave-a-review/ — this guest was
          NOT routed to Google. Reply directly to reach them.
        </p>
      </div>
    `;

    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: from!,
        to: [to!],
        replyTo: email,
        subject,
        text: lines.join("\n"),
        html,
      });
      if (error) throw new Error(`${error.name}: ${error.message}`);
      outcomes.push({ channel: "email", ok: true });
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      // Most common cause: RESEND_FROM is on a domain that isn't verified in
      // Resend yet. Nothing is visibly wrong for the guest — only this log.
      console.error(
        `[review-feedback] Email send FAILED for "${subject}". ` +
          `Check that RESEND_FROM (${from}) is on a domain verified in Resend. Reason: ${detail}`,
        JSON.stringify(submission, null, 2),
      );
      outcomes.push({ channel: "email", ok: false, detail });
    }
  }

  if (webhookConfigured) {
    try {
      const res = await fetch(webhookUrl!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "leave-a-review", subject, ...submission }),
      });
      if (!res.ok) throw new Error(`webhook responded ${res.status}`);
      outcomes.push({ channel: "webhook", ok: true });
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      console.error(
        `[review-feedback] Webhook POST FAILED for "${subject}". Reason: ${detail}`,
        JSON.stringify(submission, null, 2),
      );
      outcomes.push({ channel: "webhook", ok: false, detail });
    }
  }

  const delivered = outcomes.filter((o) => o.ok).map((o) => o.channel);
  const failed = outcomes.filter((o) => !o.ok).map((o) => o.channel);

  // Every configured channel failed — the feedback is lost, so say so loudly
  // and let the client surface an error with the phone number as a fallback.
  if (delivered.length === 0) {
    console.error(
      `[review-feedback] ALL configured channels failed (${failed.join(", ")}). ` +
        "The submission above was NOT delivered.",
    );
    return Response.json(
      { error: "We couldn't deliver your feedback.", delivery: "failed", failed },
      { status: 502 },
    );
  }

  // At least one channel got through. Warn about the rest but still succeed —
  // the guest did their part and shouldn't be asked to submit twice.
  if (failed.length > 0) {
    console.warn(
      `[review-feedback] Partial delivery for "${subject}": ` +
        `delivered via ${delivered.join(", ")}; failed via ${failed.join(", ")}.`,
    );
    return Response.json({ ok: true, delivery: "partial", delivered, failed });
  }

  return Response.json({ ok: true, delivery: "sent", delivered });
}
