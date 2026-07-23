import type { PostRecord } from "./schema";
import type { BlogPost } from "./types";
import { recordToBlogPost } from "./mapPost";

/*
  Bundled fallback content for /explore-cascade.

  These render whenever Supabase isn't configured, so the page always looks
  complete. Once real posts exist in the CMS for site_key "birch-glen-lodge",
  they take over automatically and these are no longer shown.

  Images reference files already in /public/images. Replace freely.
*/
export const postRecords: PostRecord[] = [
  {
    id: "mock-1",
    site_key: "birch-glen-lodge",
    slug: "best-time-to-visit-cascade-idaho",
    title: "The Best Time to Visit Cascade, Idaho",
    excerpt:
      "Every season in Cascade has its own personality, from summer on the lake to a frozen, star-filled winter. Here's how to pick the right time for your trip.",
    content_md: `Cascade sits at 4,800 feet in the heart of Idaho's Valley County, wrapped by the West Central Mountains and anchored by Lake Cascade, the fourth-largest reservoir in the state. That combination gives us four genuinely distinct seasons, each worth the drive. Here's what to expect so you can plan the stay that fits you.

## Summer: Long Days on the Water

From late June through early September, Cascade is at its liveliest. Lake Cascade warms up enough for swimming, paddle boarding, and sailing, and the surrounding trails dry out for hiking and mountain biking.

- Daytime highs in the 75 to 85°F range, cool mountain nights
- Peak season for fishing perch, trout, and smallmouth bass
- Kelly's Whitewater Park, right next door to the lodge, runs strong

Book early: summer weekends fill fast, especially around the Fourth of July.

## Fall: Golden Larches and Quiet Trails

September and October are a local favorite. The crowds thin out, the tamaracks turn gold, and the fishing stays excellent while the air turns crisp.

It's the ideal window for photographers, hunters, and anyone who wants the scenery without the summer bustle.

## Winter: Snow, Sauna, and Silence

Once the snow settles in, Cascade becomes a base camp for ice fishing, snowmobiling, and cross-country skiing. Lake Cascade is world-famous for its winter perch.

After a day on the ice, there's nothing better than thawing out in the lodge sauna beside the wood-fired stove.

## Spring: The In-Between Season

Spring is the calmest, and often the best value. Snow gives way to rushing rivers, wildflowers return to the meadows, and wildlife is active. Trails can be muddy, so pack accordingly, but you'll have the place mostly to yourself.

Whenever you come, Birch Glen Lodge & Motel is minutes from the lake and the trailheads. Reach out and we'll help you time your trip.`,
    published_at: "2026-05-14",
    status: "published",
    category_label: "GUIDE",
    read_time: "5 min read",
    hero_image_src: "/images/104-River-scaled.jpg",
    hero_image_alt: "River winding through forested mountains near Cascade, Idaho",
    author_name: "Birch Glen Lodge",
    author_title: "Cascade, Idaho",
    author_avatar_src: "/images/BIRCH-40.jpg",
    author_avatar_alt: "Birch Glen Lodge in Cascade, Idaho",
  },
  {
    id: "mock-2",
    site_key: "birch-glen-lodge",
    slug: "ice-fishing-lake-cascade-beginners-guide",
    title: "Ice Fishing on Lake Cascade: A Beginner's Guide",
    excerpt:
      "Lake Cascade grows some of the biggest yellow perch in the country. Here's what you need to know to land your first catch through the ice.",
    content_md: `Lake Cascade has a national reputation among ice anglers, and for good reason: it regularly produces jumbo yellow perch in the 14- to 16-inch range, plus trout and the occasional smallmouth. If you've never fished through the ice, Cascade is a forgiving, rewarding place to start.

## When to Go

The ice fishing season typically runs from late December through February, once the lake has a safe, consistent layer of ice. Always check current conditions locally before heading out. Ice thickness varies across the reservoir.

- Aim for at least 4 inches of clear, solid ice before walking out
- Mornings and late afternoons tend to fish best
- Weekdays are quieter if you want elbow room

## What to Bring

You don't need much to get started, and a lot of it can be rented in town:

- An auger to drill your holes
- A short ice rod, jigs, and bait (perch love a small jig tipped with a wax worm)
- A sled to haul gear, plus a bucket to sit on
- Layers, waterproof boots, and traction cleats

A portable shelter and a heater make a cold day far more pleasant, but plenty of locals fish the open ice just fine.

## Reading the Lake

Perch travel in schools near the bottom, so start deep and work your jig just off the floor. If you're not getting bites in 20 minutes, move. Mobility is the single biggest difference between a slow day and a cooler full of fillets.

## Warming Up Afterward

When your fingers have had enough, Birch Glen Lodge is a five-minute drive from the water. Our sauna, wood-fired stove, and hot showers are exactly what a day on the ice calls for, and we're happy to point you toward the day's hot spots.`,
    published_at: "2026-01-22",
    status: "published",
    category_label: "FISHING",
    read_time: "6 min read",
    hero_image_src: "/images/1.jpg",
    hero_image_alt: "Snow-covered mountains and water near Cascade, Idaho in winter",
    author_name: "Birch Glen Lodge",
    author_title: "Cascade, Idaho",
    author_avatar_src: "/images/BIRCH-40.jpg",
    author_avatar_alt: "Birch Glen Lodge in Cascade, Idaho",
  },
  {
    id: "mock-3",
    site_key: "birch-glen-lodge",
    slug: "adventures-near-birch-glen-lodge",
    title: "5 Can't-Miss Adventures Near Birch Glen Lodge",
    excerpt:
      "You could fill a week without driving more than 30 minutes. Here are five of our favorite ways to spend a day in and around Cascade.",
    content_md: `One of the best things about staying in Cascade is how much sits right on your doorstep. From the lodge you're minutes from the lake, the whitewater park, and miles of trail. Here are five adventures we send guests on again and again.

## 1. Paddle or Fish Lake Cascade

The reservoir is the centerpiece of the area, with 47 square miles of water for fishing, sailing, paddle boarding, and swimming. Rent a board or bring your own; sunrise on a glassy morning is hard to beat.

## 2. Run Kelly's Whitewater Park

Right next door to Birch Glen, Kelly's Whitewater Park offers rafting and kayaking on the North Fork of the Payette, plus a visitor center and easy riverside walking paths for non-paddlers.

## 3. Soak in a Backcountry Hot Spring

Valley County is dotted with natural hot springs tucked along creeks and forest roads. A soak under the stars after a day outside is a Cascade rite of passage. Ask us for directions to the current favorites.

## 4. Hit the Trails

Whether you're on foot, a mountain bike, or a snowmobile in winter, the trail network around Cascade climbs into genuinely wild country with big views. There's a route for every ability level.

## 5. Slow Down at the Lodge

Not every adventure needs a summit. Some of our guests' best days end at the firepit with a cold drink, a game in the game room, and the sauna warming up. That counts too.

Ready to build your own itinerary? Book a room and we'll help you make the most of every day.`,
    published_at: "2025-11-08",
    status: "published",
    category_label: "THINGS TO DO",
    read_time: "4 min read",
    hero_image_src: "/images/2.jpg",
    hero_image_alt: "Mountain hiking trail through an alpine meadow near Cascade, Idaho",
    author_name: "Birch Glen Lodge",
    author_title: "Cascade, Idaho",
    author_avatar_src: "/images/BIRCH-40.jpg",
    author_avatar_alt: "Birch Glen Lodge in Cascade, Idaho",
  },
];

export const posts: BlogPost[] = postRecords.map(recordToBlogPost);
