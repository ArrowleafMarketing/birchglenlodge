"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Home newsletter — the live Arrowleaf/GoHighLevel embedded form.
 * The form content is ~820px tall, so we give the iframe enough height (950px)
 * that it never needs an internal scrollbar. form_embed.js + a message listener
 * then snap it to the exact content height in production (trimming whitespace).
 */
export function NewsletterEmbed() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.origin === "string" && !e.origin.includes("arrowleafmarketing.com")) return;
      let height: number | undefined;
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        height = Number(d?.height ?? d?.payload?.height ?? d?.data?.height);
      } catch {
        /* ignore non-JSON messages */
      }
      if (height && height > 300 && height < 4000 && ref.current) {
        ref.current.style.height = `${height}px`;
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <iframe
        ref={ref}
        src={site.newsletterEmbed}
        id="inline-NNtNQ9ALNXtAU1Em5Afs"
        title="Newsletter"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Newsletter"
        data-height="950"
        data-layout-iframe-id="inline-NNtNQ9ALNXtAU1Em5Afs"
        data-form-id="NNtNQ9ALNXtAU1Em5Afs"
        scrolling="no"
        style={{ width: "100%", height: "950px", border: "none", borderRadius: "3px" }}
      />
      <Script src="https://api.arrowleafmarketing.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}

/** Contact page Google Map embed (matches the live iframe). */
export function MapEmbed() {
  return (
    <iframe
      src={site.mapEmbed}
      title="762 S Main St, Cascade, ID 83611"
      aria-label="762 S Main St, Cascade, ID 83611"
      className="h-[450px] w-full border-0"
      loading="lazy"
    />
  );
}
