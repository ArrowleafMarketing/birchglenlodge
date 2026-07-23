import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { getPostBySlug, getPosts } from "@/lib/blog/posts";
import { extractTocFromMarkdown } from "@/lib/blog/toc";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { SITE_KEY, site } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, JsonLd, absoluteUrl } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts(SITE_KEY);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(SITE_KEY, slug);
  if (!post) return pageMetadata({
    title: "Article not found | Birch Glen Lodge",
    description: "This article could not be found.",
    path: `/explore-cascade/${slug}/`,
  });

  const url = absoluteUrl(`/explore-cascade/${slug}/`);
  const image = absoluteUrl(post.heroImage.src);
  return {
    title: { absolute: `${post.title} | Birch Glen Lodge` },
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_US",
      url,
      title: post.title,
      description: post.excerpt,
      ...(post.publishedAtISO ? { publishedTime: post.publishedAtISO } : {}),
      images: [{ url: image, alt: post.heroImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

function articleJsonLd(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>, slug: string) {
  const url = absoluteUrl(`/explore-cascade/${slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.heroImage.src)],
    ...(post.publishedAtISO
      ? { datePublished: post.publishedAtISO, dateModified: post.publishedAtISO }
      : {}),
    author: { "@type": "Organization", name: post.author.name, url: `${site.url}/` },
    publisher: { "@id": `${site.url}/#lodge` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

export default async function ExploreCascadePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(SITE_KEY, slug);
  if (!post) notFound();

  const tocItems = extractTocFromMarkdown(post.content);
  const shareUrl = absoluteUrl(`/explore-cascade/${slug}/`);
  const facebookUrl = site.sameAs.find((u) => u.includes("facebook.com"));
  const instagramUrl = site.sameAs.find((u) => u.includes("instagram.com"));

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Explore Cascade", path: "/explore-cascade/" },
    { name: post.title, path: `/explore-cascade/${slug}/` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={articleJsonLd(post, slug)} />

      {/* Header band */}
      <section className="bg-cream pt-32 pb-14 sm:pt-40">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-ink/70">
                {post.breadcrumbs.map((b, idx) => (
                  <React.Fragment key={`${b.label}-${idx}`}>
                    {idx > 0 && <span aria-hidden className="text-ink/30">/</span>}
                    {b.href ? (
                      <Link href={b.href} className="transition-colors hover:text-primary">
                        {b.label}
                      </Link>
                    ) : (
                      <span className="text-ink">{b.label}</span>
                    )}
                  </React.Fragment>
                ))}
                <span aria-hidden className="text-ink/30">/</span>
                <span className="text-ink/80">{post.title}</span>
              </nav>

              {post.categoryLabel ? (
                <p className="eyebrow">{post.categoryLabel}{post.readTime ? ` · ${post.readTime}` : ""}</p>
              ) : null}

              <h1 className="h2 mt-3 text-ink">{post.title}</h1>

              <div className="mt-7 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-line">
                  <Image src={post.author.avatarSrc} alt={post.author.avatarAlt} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-ink">{post.author.name}</p>
                  <p className="text-[14px] text-ink/70">
                    {post.author.title}
                    {post.publishedAtISO ? (
                      <>
                        {post.author.title ? (
                          <span className="text-ink/40" aria-hidden> · </span>
                        ) : null}
                        <time dateTime={post.publishedAtISO}>{post.publishedAt}</time>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] shadow-md lg:aspect-[16/11]">
              <Image
                src={post.heroImage.src}
                alt={post.heroImage.alt}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="space-y-9 lg:sticky lg:top-28">
                {/* Share */}
                <div>
                  <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-ink/70">Share</h2>
                  <div className="flex gap-3">
                    <ShareLink
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      label="Share on Facebook"
                    >
                      <FacebookIcon />
                    </ShareLink>
                    <ShareLink
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      label="Share on X"
                    >
                      <XIcon />
                    </ShareLink>
                    <ShareLink
                      href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                      label="Share by email"
                    >
                      <MailIcon />
                    </ShareLink>
                  </div>
                </div>

                {/* Table of contents */}
                {tocItems.length > 0 ? (
                  <nav aria-label="In this article" className="hidden lg:block">
                    <h2 className="text-[13px] font-semibold uppercase tracking-wide text-ink/70">In this article</h2>
                    <hr className="my-4 border-line" />
                    <ul className="space-y-2.5">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-[15px] leading-snug text-ink/70 transition-colors hover:text-primary"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : null}

                {/* Booking CTA card */}
                <div className="rounded-[12px] bg-accent/50 p-6">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[10px]">
                    <Image
                      src="/images/BIRCH-43.jpg"
                      alt="Aerial view of Birch Glen Lodge & Motel in Cascade, Idaho"
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[12px] font-bold uppercase tracking-wide text-primary">Cascade, Idaho</p>
                  <h3 className="h5 mt-1 text-ink">Stay steps from Lake Cascade</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink/70">
                    Birch Glen Lodge &amp; Motel puts you minutes from the lake, the trails, and
                    Kelly&apos;s Whitewater Park, with a sauna and firepit for after.
                  </p>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 block rounded-[8px] bg-primary px-5 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-secondary"
                  >
                    Check Availability
                  </a>
                </div>
              </div>
            </aside>

            {/* Article */}
            <article className="lg:col-span-8">
              <MarkdownContent content={post.content} />

              <div className="mt-12 border-t border-line pt-8">
                <Link href="/explore-cascade" className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-secondary">
                  <span aria-hidden>←</span> Back to Explore Cascade
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}

/* --------------------------- share widgets --------------------------- */

function ShareLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.4C11.8 3 11 4.6 11 6.7v1.8H9V11h2v10h3v-10h2.1l.4-2.5H14Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 2h3.3l-7.2 8.3L23.5 22h-6.6l-5.2-6.8L5.7 22H2.4l7.7-8.8L2 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.3 3.9H5.4L17.7 20Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
