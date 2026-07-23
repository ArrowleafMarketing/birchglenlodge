import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeader,
  ButtonAnchor,
  ButtonLink,
  ArrowRight,
} from "@/components/ui";
import { Hero, BgSection } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { getPosts } from "@/lib/blog/posts";
import type { BlogPost } from "@/lib/blog/types";
import { SITE_KEY, site } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, JsonLd, absoluteUrl } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title:
    "Explore Cascade | Things to Do, Travel Tips & Local Guides | Birch Glen Lodge",
  description:
    "Local guides and stories from Birch Glen Lodge & Motel: fishing, trails, hot springs, seasons, and things to do in Cascade, Idaho.",
  path: "/explore-cascade/",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Explore Cascade", path: "/explore-cascade/" },
]);

function blogJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Explore Cascade",
    description:
      "Local guides and stories about Cascade, Idaho from Birch Glen Lodge & Motel.",
    url: absoluteUrl("/explore-cascade/"),
    publisher: { "@id": `${site.url}/#lodge` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      ...(p.publishedAtISO ? { datePublished: p.publishedAtISO } : {}),
      url: absoluteUrl(`/explore-cascade/${p.slug}/`),
      image: absoluteUrl(p.heroImage.src),
      author: { "@type": "Organization", name: p.author.name },
    })),
  };
}

export default async function ExploreCascadePage() {
  const posts = await getPosts(SITE_KEY);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {posts.length > 0 ? <JsonLd data={blogJsonLd(posts)} /> : null}

      <Hero
        image="/images/097-Daytime-Aerial-scaled.jpg"
        imageAlt="Aerial view of Cascade, Idaho with Lake Cascade and forested mountains"
        eyebrow="Local Guides & Stories"
        title="Explore Cascade"
        subtitle="Insider tips on fishing, trails, hot springs, and the seasons, straight from the lodge, minutes from Lake Cascade."
        priority
      />

      {posts.length === 0 ? (
        <Section>
          <Container className="text-center">
            <SectionHeader
              align="center"
              eyebrow="Coming soon"
              title="Stories are on the way"
            />
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink/70">
              We&apos;re putting together local guides to Cascade. Check back
              soon.
            </p>
          </Container>
        </Section>
      ) : (
        <>
          {/* Featured */}
          <Section className="bg-cream">
            <Container>
              <Reveal>
                <SectionHeader eyebrow="Latest" title="Fresh from the lodge" />
              </Reveal>

              <div className="mt-12 grid gap-10 lg:grid-cols-2">
                <Reveal variant="img">
                  <FeaturedCard post={posts[0]} />
                </Reveal>

                <div className="flex flex-col gap-6">
                  {posts.slice(1, 4).map((post, i) => (
                    <Reveal key={post.slug} delay={80 * (i + 1)}>
                      <CompactCard post={post} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          {/* All articles */}
          <Section>
            <Container>
              <Reveal>
                <SectionHeader eyebrow="Everything" title="All articles" />
              </Reveal>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={(i % 3) * 90}>
                    <ArticleCard post={post} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* CTA band */}
      <BgSection
        image="/images/001-Daytime-Aerial-scaled.jpg"
        overlay="bg-ink/55"
      >
        <Container className="py-20 text-center sm:py-28">
          <Reveal>
            <SectionHeader
              align="center"
              invert
              eyebrow="Plan your trip"
              title="Base camp for your Cascade adventure"
            />
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonAnchor
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="onDark"
              >
                Book Now <ArrowRight />
              </ButtonAnchor>
              <ButtonLink href="/rooms" variant="outlineLight">
                Explore Rooms <ArrowRight />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </BgSection>
    </>
  );
}

/* ------------------------------- cards ------------------------------- */

function CardMeta({ post }: { post: BlogPost }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-wide text-primary">
      {post.categoryLabel ?? "ARTICLE"}
      {post.readTime ? (
        <span className="text-ink/70"> · {post.readTime}</span>
      ) : null}
    </p>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/explore-cascade/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px]">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-6">
        <CardMeta post={post} />
        <h3 className="h4 mt-2 text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-3 text-[17px] leading-relaxed text-ink/70">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

function CompactCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/explore-cascade/${post.slug}`} className="group flex gap-5">
      <div className="relative h-28 w-36 flex-shrink-0 overflow-hidden rounded-[10px]">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          sizes="144px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="min-w-0">
        <CardMeta post={post} />
        <h3 className="h5 mt-1.5 text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/explore-cascade/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <CardMeta post={post} />
        <h3 className="h5 mt-2 text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
          {post.excerpt}
        </p>
        {post.publishedAt ? (
          <p className="mt-4 text-[13px] text-ink/70">{post.publishedAt}</p>
        ) : null}
      </div>
    </Link>
  );
}
