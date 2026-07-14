import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";

export const metadata: Metadata = {
  title: "Guide To Cascade",
  description:
    "Beautiful Cascade, Idaho has much to offer for the outdoor lover. Explore our guide to local trails, rivers, lakes, and hot springs.",
};

const guides = [
  {
    title: "Trails",
    href: "/trails",
    image: "/images/birch-glen-walkway.jpg",
    blurb: "OHV routes, backcountry paths, and ridgeline hikes through the national forest.",
  },
  {
    title: "Rivers, Lakes, Hot Springs",
    href: "/rivers-lakes-hot-springs",
    image: "/images/104-River-scaled.jpg",
    blurb: "World-class fishing on Lake Cascade, plus rafting, kayaking, and hot spring soaks.",
  },
];

export default function GuideToCascadePage() {
  return (
    <>
      <PageHero
        eyebrow="Our Guide To Cascade"
        title="Explore Our Beautiful Area"
        subtitle="Beautiful Cascade, Idaho has much to offer for the outdoor lover."
        image="/images/097-Daytime-Aerial-scaled.jpg"
        imageAlt="Aerial view of Cascade, Idaho and the surrounding mountains"
      />

      <Section>
        <Container className="max-w-3xl text-center">
          <SectionHeader
            align="center"
            eyebrow="Local Favorites"
            title="Right in the Heart of Valley County"
            intro="Located next door to Kelly's Whitewater Park in Cascade, Birch Glen offers convenient access to rafting, fishing, golfing, swimming, kayaking, boating, water skiing, hiking, biking, hot springs, ice fishing, snow skiing, cross-country skiing, snowmobiling, and snowshoeing."
          />
        </Container>

        <Container className="mt-14 grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group relative flex min-h-[22rem] items-end overflow-hidden rounded-card"
            >
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="relative p-8">
                <h3 className="font-display text-3xl font-semibold text-white">{guide.title}</h3>
                <p className="mt-3 max-w-sm text-white/85">{guide.blurb}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </Container>
      </Section>

      <CtaBand title="Plan Your Cascade Getaway" />
    </>
  );
}
