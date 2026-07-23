import React from "react";
import ReactMarkdown from "react-markdown";
import GithubSlugger from "github-slugger";

/*
  Renders a post's markdown body in the Birch Glen editorial voice: Lora (serif)
  headings, Manrope body, primary-colored links. H2s get github-slugger ids so
  the sticky table of contents (built by extractTocFromMarkdown) can anchor to
  them.

  The H2 id is computed from the FLATTENED visible text of the heading (see
  nodeToText), not String(children), which would stringify React elements like
  <strong> to "[object Object]" and break the anchor for any formatted heading.
  This matches toc.ts's inlineText normalization, keeping the two in lock-step.

  Server Component: react-markdown renders fine without client JS.
*/

/** Flatten arbitrary React children to their plain text content. */
function nodeToText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (React.isValidElement(node)) {
    return nodeToText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

export function MarkdownContent({ content }: { content: string }) {
  // Separate sluggers: the H2 slugger sees the same H2-only sequence as toc.ts
  // (so duplicate-suffix counting stays in lock-step); H1s get their own.
  const h2Slugger = new GithubSlugger();
  const h1Slugger = new GithubSlugger();
  h2Slugger.reset();
  h1Slugger.reset();

  return (
    <ReactMarkdown
      components={{
        // Author-supplied `#` would otherwise emit a SECOND <h1> next to the
        // post title. Render it as a large serif <h2> so there's one h1 per page.
        h1: ({ children }) => (
          <h2
            id={h1Slugger.slug(nodeToText(children))}
            className="mt-12 mb-5 scroll-mt-28 font-serif text-[40px] font-normal leading-tight text-ink"
          >
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2
            id={h2Slugger.slug(nodeToText(children))}
            className="mt-12 mb-5 scroll-mt-28 font-serif text-[34px] font-normal leading-tight text-ink"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-9 mb-3 font-serif text-[24px] font-medium leading-snug text-ink">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="mt-7 mb-2 font-serif text-[20px] font-medium leading-snug text-ink">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="mb-6 text-[18px] leading-relaxed text-ink/80">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-7 list-disc space-y-2 pl-6 text-[18px] text-ink/80">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-7 list-decimal space-y-2 pl-6 text-[18px] text-ink/80">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-primary underline underline-offset-2 transition-colors hover:text-secondary"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-ink">{children}</strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-8 border-l-4 border-primary/40 pl-5 text-[18px] italic text-ink/70">
            {children}
          </blockquote>
        ),
        img: ({ src, alt }) => (
          // Markdown body images: plain <img> (dimensions unknown → not next/image).
          // Tailwind preflight caps width so it can't overflow the column.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={typeof src === "string" ? src : undefined}
            alt={alt ?? ""}
            className="my-8 h-auto w-full rounded-[10px]"
          />
        ),
        hr: () => <hr className="my-10 border-t border-line" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
