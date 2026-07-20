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
  {
    image: "/images/5.jpg",
    alt: "Game and laundry room with pool table, foosball, air hockey and washer-dryer at Birch Glen Lodge",
    title: "Amenities",
    items: ["Game Room"],
  },
  {
    image: "/images/6.jpg",
    alt: "Outdoor firepit ringed by chairs under pine trees at Birch Glen Lodge in Cascade, Idaho",
    title: "Feel Like Being Outside?",
    items: ["Firepit", "BBQ Area"],
  },
];

// Guide To Cascade cards
export const guideCards = [
  {
    title: "Trails",
    image: "/images/2.jpg",
    alt: "Mountain hiking trail through an alpine meadow with pines and rocky peaks near Cascade, Idaho",
    href: "/trails",
  },
  {
    title: "Rivers, Lakes, Hot Springs",
    image: "/images/1.jpg",
    alt: "Natural rock-lined hot spring pool beside a creek with a footbridge near Cascade, Idaho",
    href: "/rivers-lakes-hot-springs",
  },
];

// Gallery — exact DOM order from the live site (NOT strictly numeric).
// Each image carries descriptive alt text for accessibility + image SEO.
export const galleryImages: { src: string; alt: string }[] = [
  { src: "/images/BIRCH-40.jpg", alt: "Elevated view of the A-frame lodge and office building at Birch Glen Lodge in Cascade, Idaho" },
  { src: "/images/BIRCH-43.jpg", alt: "Aerial view of Birch Glen Lodge and the town of Cascade, Idaho with ponds and forested mountains" },
  { src: "/images/BIRCH-45.jpg", alt: "Guest room with a queen bed, wood-paneled walls, TV and dresser at Birch Glen Lodge" },
  { src: "/images/BIRCH-47.jpg", alt: "Guest bathroom with wood-paneled walls, vanity sink, mirror and tub at Birch Glen Lodge" },
  { src: "/images/BIRCH-48.jpg", alt: "Bathroom with a tub-shower, white curtain, toilet and towels at Birch Glen Lodge" },
  { src: "/images/BIRCH-50.jpg", alt: "Remodeled guest room with two queen beds, black bedding and slatted accent wall at Birch Glen Lodge" },
  { src: "/images/BIRCH-51.jpg", alt: "Guest room with wall-mounted TV, black desk, chair and coffee bar at Birch Glen Lodge" },
  { src: "/images/BIRCH-53.jpg", alt: "Two-queen guest room with black bedding, accent wall and curtained window at Birch Glen Lodge" },
  { src: "/images/BIRCH-54.jpg", alt: "Guest room coffee bar with microwave, luggage rack and arched-mirror vanity at Birch Glen Lodge" },
  { src: "/images/BIRCH-55.jpg", alt: "Bathroom with white subway-tiled walk-in shower and toilet at Birch Glen Lodge" },
  { src: "/images/BIRCH-58.jpg", alt: "Guest room with two beds, wall-mounted TV and dining table at Birch Glen Lodge" },
  { src: "/images/BIRCH-59.jpg", alt: "Guest room with wall-mounted TV, reclaimed-wood dresser and mini fridge at Birch Glen Lodge" },
  { src: "/images/BIRCH-61.jpg", alt: "Guest bathroom vanity with coffee bar, microwave, mirror and towels at Birch Glen Lodge" },
  { src: "/images/BIRCH-62.jpg", alt: "Bathroom with tub-shower, toilet and hanging towels at Birch Glen Lodge" },
  { src: "/images/BIRCH-63.jpg", alt: "Guest room with queen bed, wood-accent headboard and table with two chairs at Birch Glen Lodge" },
  { src: "/images/BIRCH-64.jpg", alt: "Guest room with wall-mounted TV, reclaimed-wood dresser and mini fridge at Birch Glen Lodge" },
  { src: "/images/BIRCH-65.jpg", alt: "Guest room seating nook with bistro table beside a window AC unit at Birch Glen Lodge" },
  { src: "/images/BIRCH-66.jpg", alt: "Guest bathroom vanity with mirror, sink and coffee bar at Birch Glen Lodge" },
  { src: "/images/BIRCH-67.jpg", alt: "Bathroom with tan tub-shower, white curtain and toilet at Birch Glen Lodge" },
  { src: "/images/BIRCH-70.jpg", alt: "Exterior of the single-story motel rooms with covered walkway and birch tree at Birch Glen Lodge" },
  { src: "/images/BIRCH-72.jpg", alt: "Front of the green A-frame lodge and office building at Birch Glen Lodge in Cascade, Idaho" },
  { src: "/images/BIRCH-75.jpg", alt: "Yale keypad smart lock on a guest room door at Birch Glen Lodge" },
  { src: "/images/BIRCH-84.jpg", alt: "Two queen beds with black bedding and slatted accent wall in a remodeled room at Birch Glen Lodge" },
  { src: "/images/BIRCH-87.jpg", alt: "Bedside detail with tripod lamp, digital clock and slatted accent wall at Birch Glen Lodge" },
  { src: "/images/BIRCH-79.jpg", alt: "Wall-mounted body wash, shampoo and conditioner dispensers in a tiled shower at Birch Glen Lodge" },
  { src: "/images/BIRCH-78.jpg", alt: "Renovated bathroom vanity with arched mirror and globe sconce lights at Birch Glen Lodge" },
  { src: "/images/BIRCH-97.jpg", alt: "Pine-paneled lodge living room with sofa, armchairs, mounted TV and kitchen at Birch Glen Lodge" },
  { src: "/images/BIRCH-99.jpg", alt: "Pine-walled bedroom with a queen bed and nightstand at Birch Glen Lodge" },
  { src: "/images/BIRCH-100.jpg", alt: "Pine-paneled kitchenette with sink, open shelving and coffee bar at Birch Glen Lodge" },
  { src: "/images/BIRCH-95.jpg", alt: "Covered wood deck with bistro table and chairs overlooking the grounds at Birch Glen Lodge" },
  { src: "/images/BIRCH-92.jpg", alt: "Coffee bar with single-serve maker and condiments on a wood counter at Birch Glen Lodge" },
  { src: "/images/BIRCH-91.jpg", alt: "Pine-walled bathroom with towel shelf, mirror and vanity sink at Birch Glen Lodge" },
  { src: "/images/BIRCH-107.jpg", alt: "Game room with pool table, air hockey and ice machine at Birch Glen Lodge" },
];
