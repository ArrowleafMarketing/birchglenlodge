import GithubSlugger from "github-slugger";

export type TocItem = { id: string; label: string };

/**
 * Reduce a markdown heading to the plain, visible text a reader sees, the same
 * text react-markdown ends up rendering, so the slug computed here matches the
 * id MarkdownContent puts on the <h2>. Strips inline emphasis/code and unwraps
 * links & images to their text/alt.
 */
function inlineText(md: string): string {
  return md
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // image -> alt text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // link -> link text
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // italic
    .replace(/~~(.*?)~~/g, "$1") // strikethrough
    .trim();
}

/**
 * Build a table of contents from the H2 headings (`## `) of a markdown string.
 * Uses github-slugger for stable, collision-safe ids.
 *
 * IMPORTANT: this slugs the VISIBLE text of each H2 (via inlineText), exactly as
 * MarkdownContent does when it flattens the rendered h2 children. The two must
 * stay in lock-step (only H2s, same text normalization), or the sidebar anchors
 * will point at ids that don't exist.
 */
export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  slugger.reset();

  const items: TocItem[] = [];

  for (const line of markdown.split("\n")) {
    if (!line.startsWith("## ")) continue; // H2 only (not H3+, not "###")
    const label = inlineText(line.replace(/^##\s+/, ""));
    if (!label) continue;
    items.push({ id: slugger.slug(label), label });
  }

  return items;
}
