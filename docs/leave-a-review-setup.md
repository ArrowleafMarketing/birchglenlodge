# Leave a Review — setup & handover

The private post-stay review link: **`/leave-a-review/`**

A guest rates their stay 1–5 stars. Five stars gets the Google review link; one
through four gets a private feedback form that only the lodge sees. The page is
unlisted — it is `noindex, nofollow`, absent from the nav, the footer and the
sitemap. The only way in is the link you send.

---

## 1. Current state — read this first

**The page is live and the form works. The feedback is being thrown away.**

Email delivery is not configured, so when a guest submits the private feedback
form the server writes the whole submission to its log and discards it. The
guest still sees the normal "Thank you — we hear you." screen, so nothing looks
broken to them. Nobody at the lodge is notified.

**Anyone who submits feedback today is lost.** Until the steps in section 2 are
done — in production, not just locally — do not send the link to guests.

The Google side (five stars) works right now and needs no configuration.

---

## 2. Turning on email

### 2a. Create a Resend account

Go to <https://resend.com> and sign up. The free tier is far more than this
page needs.

### 2b. Add and verify the sending domain — this is the step that gates everything

In Resend: **Domains → Add Domain**, and enter `thebirchglenlodge.com`.

Resend then shows a set of **DNS records** (a DKIM `TXT` record, an SPF/`MX`
pair for the sending subdomain, and usually a DMARC `TXT`). These must be added
wherever the domain's DNS is hosted, then verified back in Resend.

**Nothing works until this is done and shows "Verified".** An API key alone is
not enough — Resend will accept the key and then refuse to send from an
unverified domain. Expect DNS propagation to take anywhere from a few minutes
to a few hours.

> If you would rather not touch DNS yet, you can test with Resend's sandbox
> sender `onboarding@resend.dev`, which sends **only to the account owner's own
> email address**. That is fine for proving the wiring works, but it is not a
> production setup — real guest feedback needs the verified domain.

### 2c. Generate an API key

**API Keys → Create API Key**. Sending permission is all it needs. Copy the
key (`re_...`) immediately — Resend shows it once.

### 2d. Set the three variables

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | The `re_...` key from step 2c |
| `RESEND_FROM` | Sender address, **must be on the verified domain** — e.g. `Birch Glen Lodge <feedback@thebirchglenlodge.com>` |
| `REVIEW_FEEDBACK_TO` | The inbox that should receive guest feedback — e.g. `info@thebirchglenlodge.com` |

All three are required. If any one is missing, email stays off and the route
falls back to log-and-discard.

`REVIEW_FEEDBACK_WEBHOOK_URL` is optional. Set it to a CRM or automation
webhook (Zapier, Make, GoHighLevel) and each submission is POSTed there as JSON
in addition to the email. Leave it blank to skip.

### Why these are separate from any contact-form variables

These variables are used **only** by the review page. This is deliberate: an
unhappy guest's complaint must not drop into the general new-inquiry workflow
where it gets treated as a sales lead. The route handler reads no other mail
variables and has no fallback recipient. Please don't "simplify" it into a
shared mailer.

---

## 3. Where to set them

You must do this in **two** places.

**Locally** — in `.env.local` at the project root (create it if missing; copy
`.env.example` as a starting point). Restart `npm run dev` afterwards; env vars
are read at server start, not per request.

**In production** — in the hosting dashboard. The site deploys on Vercel, so:
**Project → Settings → Environment Variables**, add all three to the
Production environment (and Preview if you want previews to send), then
**redeploy**. Vercel does not apply new environment variables to an existing
deployment.

> **`.env.local` is never deployed.** It is git-ignored and stays on your
> machine. Setting the variables locally makes it work locally and changes
> nothing on the live site — **production stays in log-and-discard mode until
> the variables are added to the host too.** This is the single most common way
> this setup gets half-finished.

---

## 4. The Google review link

The link lives in `src/lib/site.ts` as the exported constant
`GOOGLE_REVIEW_URL`:

```ts
export const GOOGLE_REVIEW_URL = "https://g.page/r/CS_RePJEGSIWEBM/review";
```

It is kept there — not inline in the component — so any future review CTA
(a post-stay email, a QR card in the rooms) can import the same value.

The current value is the lodge's **real** Business Profile review link, not a
placeholder. It opens Google's star/review composer directly.

To re-issue or verify it: sign in to
[Google Business Profile](https://business.google.com) as the lodge → select
the Birch Glen Lodge listing → **Ask for reviews** (or **Read reviews → Get
more reviews**) → copy the short link. It looks like
`https://g.page/r/<id>/review`. Paste it into the constant above.

To sanity-check the current one, open it in a private window: it should load
the Birch Glen Lodge & Motel review composer, not a search page or a
"not found" error.

---

## 5. How to verify it works

1. Confirm the three variables are set in the environment you're testing.
2. Open `/leave-a-review/` and click **4 stars**.
3. Fill the form with your own name and email and submit.
4. You should see "Thank you — we hear you."
5. Check `REVIEW_FEEDBACK_TO`. Within a minute you should have an email with
   the subject **`Client Feedback (4 of 5) — Your Name`**. Replying to it
   replies to the guest, because reply-to is set to their address.
6. Also test **5 stars** and confirm the **Leave a Google Review** button opens
   the Google composer in a new tab.

**When a submission doesn't arrive, look at the server logs** — that is where
every outcome is recorded. On Vercel: **Project → Logs** (or
`vercel logs <deployment>`), filtered to the `/api/review-feedback` function.
Locally it is the terminal running `npm run dev`. Every log line from this
route is prefixed `[review-feedback]`:

| Log line | Meaning |
| --- | --- |
| `DELIVERY NOT CONFIGURED — submission logged and discarded` | One or more of the three variables is missing in *this* environment. The full submission is printed right after it, so you can recover that guest by hand. |
| `Email send FAILED …` | Resend rejected it. The reason is on the same line — usually an unverified domain. |
| `Webhook POST FAILED …` | The CRM webhook URL is wrong or the endpoint errored. |
| `Partial delivery …` | One channel worked, another didn't. The guest was told it succeeded, which is correct — at least one copy got through. |
| `ALL configured channels failed` | Nothing got through. The guest saw an error with the phone number. |

Also check Resend's own **Emails** log — it shows accepted, delivered, bounced
and complained per message, which distinguishes "we never sent it" from "we
sent it and their mail server bounced it".

---

## 6. Failure modes worth knowing

**An unverified sending domain fails silently to the guest.** If `RESEND_FROM`
is on a domain that isn't verified in Resend, the send throws, but the guest
still sees the "Thank you — we hear you." screen. This is on purpose: at that
point the guest has done everything right and the fault is ours, so blaming
them with an error would be worse. But it means **a broken email setup looks
exactly like a working one from the outside.** The only evidence is the
`Email send FAILED` line in the server logs. Verify the setup with a real test
submission (section 5) rather than assuming.

The same applies to the unconfigured state: log-and-discard also shows the
guest a normal thank-you screen.

**Half-configured email is off, not partly on.** Two of the three variables set
is the same as zero — the route requires all three before it will try to send.

**Feedback is logged, not stored.** There is no database behind this page. If
delivery is off or failing, the log is the only copy, and logs are retained for
a limited window (about a day on Vercel's free plan). Turn delivery on before
sending the link out.

**The 5-star branch never posts anything.** Five stars only renders the Google
link, so it doesn't touch the API route and needs no email configuration. The
route rejects a rating of 5 outright.

---

## Files involved

| Path | What it is |
| --- | --- |
| `src/app/leave-a-review/page.tsx` | The route + its `noindex` metadata |
| `src/components/review-flow.tsx` | Star rating, the branch, both forms, the states |
| `src/app/api/review-feedback/route.ts` | Validation + email/webhook delivery |
| `src/lib/review.ts` | Rating labels and the "What did you book?" options |
| `src/lib/site.ts` | `GOOGLE_REVIEW_URL`, phone, email |
| `.env.example` | The variable names, with empty values |

The "What did you book?" dropdown lists the five room types plus the four
group/event categories the site sells. If the room lineup changes in
`src/lib/content.ts`, update `STAY_TYPES` in `src/lib/review.ts` to match.

---

## A note on the gate

Only 5-star guests are shown the Google link. This is review gating, which
Google's review policy discourages; it was chosen deliberately and is not a
bug. Don't "fix" it without asking Ryan.
