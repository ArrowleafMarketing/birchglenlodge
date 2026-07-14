/*
  Clone content transcribed verbatim from the live thebirchglenlodge.com.
  See docs/CLONE-BLUEPRINT.md for the section-by-section spec.
*/

// HOME "Explore our rooms" carousel — single image per card (home mapping)
export const homeRoomCards = [
  { name: "Royal King", image: "/images/BIRCH-44.jpg" },
  { name: "Deluxe Double", image: "/images/BIRCH-84.jpg" },
  { name: "Single Queen", image: "/images/BIRCH-63.jpg" },
  { name: "Triple", image: "/images/BIRCH-99.jpg" },
  { name: "Private Upstairs Suite", image: "/images/BIRCH-97.jpg" },
];

// ROOMS page carousel — hover-swap (main -> hover) image pairs
export const roomsCarousel = [
  { name: "Royal King", image: "/images/BIRCH-63.jpg", hover: "/images/BIRCH-66.jpg" },
  { name: "Deluxe Double", image: "/images/BIRCH-53.jpg", hover: "/images/BIRCH-56.jpg" },
  {
    name: "Single Queen",
    image: "/images/065-Room-Interior-5-scaled.jpg",
    hover: "/images/067-Room-Interior-5-scaled.jpg",
  },
  { name: "Triple", image: "/images/BIRCH-99.jpg", hover: "/images/BIRCH-101.jpg" },
  { name: "Private Upstairs Suite", image: "/images/BIRCH-97.jpg", hover: "/images/BIRCH-100.jpg" },
];

export const roomIncludes = [
  "Mini Fridge",
  "Microwave",
  "Air Conditioning/Heater",
  "Coffee Maker",
  "Television/Cable/Wifi",
];

export const lodgeAmenities = [
  "Game Room",
  "Sauna",
  "Additional Bathrooms",
  "Additional Showers",
  "Kitchen with Microwave, Toaster, and Coffee Maker",
];

// Home "Perfect for Groups & Events" accordion (first item open by default)
export const events = [
  {
    title: "Weddings & Receptions",
    body: [
      "Celebrate your special day in a picturesque mountain setting. Whether you envision an intimate lakeside ceremony or a grand reception with loved ones, our beautiful outdoor spaces and cozy indoor accommodations make for an unforgettable wedding experience.",
    ],
  },
  {
    title: "Family Reunions",
    body: [
      "Reconnect and create lifelong memories with your family at Birch Glen Lodge. With ample space for gathering, fun outdoor activities, and comfortable accommodations, our lodge is the perfect place to bring everyone together for a stress-free and joy-filled reunion.",
    ],
  },
  {
    title: "Corporate Retreats",
    body: [
      "Escape the office and inspire your team with a corporate retreat in the mountains. Our spacious lodge offers the perfect blend of relaxation and team-building opportunities, making it an excellent setting for brainstorming sessions, workshops, and bonding activities.",
    ],
  },
  {
    title: "Group Getaways",
    body: [
      "Whether you're planning a weekend adventure with friends, a church retreat, or a special interest gathering, Birch Glen Lodge provides the perfect environment to relax, explore, and enjoy quality time together.",
      "Discounts may be available for large groups and extended stays—just ask!",
    ],
  },
];

// Home testimonials slider (verbatim, no author names on the live site)
export const testimonials = [
  "What a great experience we had. Birch Glen is an old school motel with the type of friendly and trusting staff reminiscent of an era gone by. Comfy room, wood paneling, campfire outside - it was lovely.",
  "Had a great time at the lodge, very comfortable! They had everything I needed after a few long days out ice-fishing and snowmobiling. The sauna was very nice, as was the warm wood-fired stove in the lobby. I really enjoyed the proximity to the lake and nearby wilderness trail access.",
  "This lodge is a wonderful find. The staff are very friendly and I love the lobby dogs! I was glad to see the property is pet friendly and we never struggled with parking as they have a very large lot.",
  "The rooms were clean and quiet. The shower had great water pressure and the grounds were eclectic, lodge feeling and fun; not to mention the cutest goat! We will be staying here again very soon. Can't beat the price for the quality of service and amenities.",
];

// "Adventure Awaits" / "Cascade. A Recreational Paradise" — 3 columns of 4
export const activityColumns = [
  ["Mountain Biking", "Trail Riding", "Snowmobiling", "Bird Watching"],
  ["Ice-Fishing", "Rafting", "Skiing", "Rodeos"],
  ["Hiking", "Hunting", "Golfing", "Hot Springs"],
];

// About page amenities feature row (image + text card pairs)
export const aboutAmenities = [
  { image: "/images/5.jpg", title: "Amenities", items: ["Game Room"] },
  { image: "/images/6.jpg", title: "Feel Like Being Outside?", items: ["Firepit", "BBQ Area"] },
];

// Guide To Cascade cards
export const guideCards = [
  { title: "Trails", image: "/images/2.jpg", href: "/trails" },
  {
    title: "Rivers, Lakes, Hot Springs",
    image: "/images/1.jpg",
    href: "/rivers-lakes-hot-springs",
  },
];

// Gallery — exact DOM order from the live site (NOT strictly numeric)
export const galleryImages = [
  40, 43, 45, 47, 48, 50, 51, 53, 54, 55, 58, 59, 61, 62, 63, 64, 65, 66, 67, 70, 72, 75, 84, 87,
  79, 78, 97, 99, 100, 95, 92, 91, 107,
].map((n) => `/images/BIRCH-${n}.jpg`);
