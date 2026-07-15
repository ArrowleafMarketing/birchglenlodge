"use client";

import Image from "next/image";
import Link from "next/link";

export type MarqueeCard = { name: string; image: string };

/**
 * Continuously shifting room carousel — ~3 cards visible on desktop, seamless
 * loop (the list is duplicated and the track translates -50%). Pauses on hover.
 */
export function RoomsMarquee({ items }: { items: MarqueeCard[] }) {
  const loop = [...items, ...items];
  return (
    <div className="rooms-marquee group relative overflow-hidden">
      {/* soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />
      <ul className="rooms-marquee-track flex w-max group-hover:[animation-play-state:paused]">
        {loop.map((room, i) => (
          <li
            key={i}
            className="mr-6 w-[280px] shrink-0 sm:w-[330px] lg:w-[380px]"
            aria-hidden={i >= items.length}
          >
            <Link href="/rooms" className="block" tabIndex={i >= items.length ? -1 : 0}>
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
              <h5 className="h5 mt-4 text-center text-ink">{room.name}</h5>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
