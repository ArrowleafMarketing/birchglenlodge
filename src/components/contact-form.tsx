"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/*
  Stopgap submission: builds a mailto to info@thebirchglenlodge.com so the form is
  functional with zero backend. Swap this for a server action / Formspree / Resend
  endpoint once Ryan confirms where inquiries should be delivered.
*/
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Website inquiry from ${name || "a guest"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-none border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Name
        </label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={field} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={field} />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary sm:w-auto"
      >
        Send Message
      </button>
      {sent ? (
        <p className="text-sm text-secondary">
          Thanks! Your email app should open with your message ready to send.
        </p>
      ) : null}
    </form>
  );
}
