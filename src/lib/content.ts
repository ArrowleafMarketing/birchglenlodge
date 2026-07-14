/*
  Hardcoded site content, transcribed from the existing thebirchglenlodge.com.
  No invented copy — rooms have no descriptions/prices on the live site, so we omit them.
*/

export type Room = {
  name: string;
  images: string[];
};

export const rooms: Room[] = [
  { name: "Royal King", images: ["/images/BIRCH-63.jpg", "/images/BIRCH-66.jpg"] },
  { name: "Deluxe Double", images: ["/images/BIRCH-53.jpg", "/images/BIRCH-56.jpg"] },
  { name: "Single Queen", images: ["/images/BIRCH-80.jpg", "/images/BIRCH-72.jpg"] },
  { name: "Triple", images: ["/images/BIRCH-99.jpg", "/images/BIRCH-101.jpg"] },
  { name: "Private Upstairs Suite", images: ["/images/BIRCH-97.jpg", "/images/BIRCH-100.jpg"] },
];

export const roomIncludes = [
  "Mini Fridge",
  "Microwave",
  "Air Conditioning / Heater",
  "Coffee Maker",
  "Television / Cable / Wifi",
];

export const lodgeAmenities = [
  "Game Room",
  "Sauna",
  "Additional Bathrooms",
  "Additional Showers",
  "Kitchen Facilities",
];

export const groupDiscount =
  "Discounts available for groups of 5+ rooms booked at a time.";

export const activities = [
  "Mountain Biking",
  "Trail Riding",
  "Snowmobiling",
  "Bird Watching",
  "Ice-Fishing",
  "Rafting",
  "Skiing",
  "Rodeos",
  "Hiking",
  "Hunting",
  "Golfing",
  "Hot Springs",
];

export type EventType = { title: string; description: string };

export const events: EventType[] = [
  {
    title: "Weddings & Receptions",
    description:
      "Celebrate your special day in a picturesque mountain setting. Whether you envision an intimate lakeside ceremony or a grand reception with loved ones, our beautiful outdoor spaces and cozy indoor accommodations make for an unforgettable wedding experience.",
  },
  {
    title: "Family Reunions",
    description:
      "Reconnect and create lifelong memories with your family at Birch Glen Lodge. With ample space for gathering, fun outdoor activities, and comfortable accommodations, our lodge is the perfect place to bring everyone together for a stress-free and joy-filled reunion.",
  },
  {
    title: "Corporate Retreats",
    description:
      "Escape the office and inspire your team with a corporate retreat in the mountains. Our spacious lodge offers the perfect blend of relaxation and team-building opportunities, making it an excellent setting for brainstorming sessions, workshops, and bonding activities.",
  },
  {
    title: "Group Getaways",
    description:
      "Whether you're planning a weekend adventure with friends, a church retreat, or a special interest gathering, Birch Glen Lodge provides the perfect environment to relax, explore, and enjoy quality time together. Discounts may be available for large groups and extended stays—just ask!",
  },
];

export const testimonials = [
  "What a great experience we had. Birch Glen is an old school motel with the type of friendly and trusting staff reminiscent of an era gone by. Comfy room, wood paneling, campfire outside - it was lovely.",
  "Had a great time at the lodge, very comfortable! They had everything I needed after a few long days out ice-fishing and snowmobiling. The sauna was very nice, as was the warm wood-fired stove in the lobby. I really enjoyed the proximity to the lake and nearby wilderness trail access.",
  "This lodge is a wonderful find. The staff are very friendly and I love the lobby dogs! I was glad to see the property is pet friendly and we never struggled with parking as they have a very large lot.",
  "The rooms were clean and quiet. The shower had great water pressure and the grounds were eclectic, lodge feeling and fun; not to mention the cutest goat! We will be staying here again very soon. Can't beat the price for the quality of service and amenities.",
];

export type Trail = { name: string; description: string; href?: string };

export const trails: Trail[] = [
  {
    name: "OHV Trail Riding",
    description:
      "Explore the region's extensive network of off-highway-vehicle routes through the surrounding national forest. See the USDA Forest Service for OHV recreation information and current conditions.",
    href: "https://www.fs.usda.gov/recmain/boise/recreation",
  },
  {
    name: "Dollar Creek Way Trail #114",
    description:
      "The initial 3-mile section accommodates all users with gradual climbing that becomes steeper. The remaining 4-mile eastern portion is restricted to non-motorized use. The route connects to Gold Fork North Trail and Needles Route Trail, with five creek crossings including three significant fords.",
  },
  {
    name: "East Mountain Trail Way",
    description:
      "Offers views of Round Valley and Long Valley, passes through forests and meadows, and ends near East Mountain Lookout. Bring extra water — none exists along the route. High-clearance vehicles are suggested for the eroded northern access road.",
  },
  {
    name: "Gold Fork North Trail",
    description:
      "The ford at the northern end is deep and swift for all users. The path ascends through mixed forests and terminates at an old Gold Fork Lookout with panoramic vistas of the Needles, Long Valley, Cascade Reservoir, and Big Creek drainage.",
  },
  {
    name: "Needles Route Trail",
    description:
      "This ridge-following route intersects Dollar Creek Ridge Trail 6 miles from the southern entrance. The initial segment appears passable by vehicle but becomes impassable without four-wheel drive after a quarter-mile.",
  },
  {
    name: "Wilson Creek Trail",
    description:
      "Crosses several creeks, passes through meadows carpeted with wildflowers, and skirts the edge of Rock Lake. Access via the Burnt Wagon Basin–West Mountain jeep trail is recommended.",
  },
];

export const galleryImages = [
  40, 43, 45, 47, 48, 50, 51, 53, 54, 55, 58, 59, 61, 62, 63, 64, 65, 66, 67, 70, 72, 75, 84, 87,
  79, 78, 97, 99, 100, 95, 92, 91, 107,
].map((n) => `/images/BIRCH-${n}.jpg`);

export const fishSpecies = [
  "Rainbow Trout",
  "Brook Trout",
  "Steelhead (Hatchery)",
  "Largemouth Bass",
  "Smallmouth Bass",
  "Kokanee (Early & October Spawner)",
  "Coho Salmon",
  "Tiger Muskie",
  "Black Crappie",
  "White Crappie",
  "Channel Catfish",
  "Bullhead Catfish",
  "Yellow Perch",
  "Bluegill",
  "Pumpkinseed",
  "Mountain Whitefish",
];
