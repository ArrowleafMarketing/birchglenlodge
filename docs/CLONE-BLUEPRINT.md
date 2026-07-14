# Birch Glen Lodge — Clone Blueprint (source of truth)

Goal: **near-1:1 clone** of https://thebirchglenlodge.com/ as it is now — section order, content,
images, layout — everything except animations. No creative liberties. This doc is the contract the
build must match; verbatim long-form copy lives in the saved page HTML (session scratchpad) and must
be reproduced exactly.

Derived from the live rendered HTML + Elementor CSS (kit `post-15.css` and per-page `post-<id>.css`).

---

## GLOBAL SYSTEM

**Colors** (Elementor kit):
- Primary (buttons, links): `#AF6339`
- Secondary (button hover): `#1F5D6B`
- Text (headings + body): `#252528`
- Accent (cream/beige): `#EBE3D0`
- Off-white bg: `#FAF8F7` · White: `#FFFFFF` · Deep brown: `#6F432B` · Border gray: `#E0E0E0`

**Typography — Manrope for EVERYTHING (headings AND body). No serif site-wide.**
(One exception: the Trails & Rivers body use special classes `small-serif` / `extra-small-serif` /
`small-san-serif` — replicate those locally only.)
- Body: Manrope 400, 18px / 1.65 (17px ≤1024)
- Subhead: Manrope 400, 28px / 1.5 (20px ≤1024)
- H1: 400, 64px / 1.1 (48px ≤1024, 45px ≤767)
- H2: 400, 48px / 1.2 (42/38)
- H3: 400, 38px / 1.2 (35/32)
- H4: 400, 30px / 1.3 (28/26)
- H5: 500, 24px / 1.4 (22/20)
- H6: 600, 18px / 1.5 (footer/eyebrow headings)
- Buttons: Manrope 600, 18px / 1 (17/16)
- Eyebrow/label: Manrope 600, 16px, tracking 0.15px (some uppercase 14px)

**Buttons:** bg `#AF6339`, white text, **border-radius 8px** (NOT pills), padding 20px 50px (16px 40px ≤1024). Hover: bg `#1F5D6B`. Header/hero buttons use the `size-sm` variant.

**Container:** boxed max-width **1280px** (→1024 ≤1024vw, →767 ≤767vw). Widescreen ≥1760. Breakpoints: mobile ≤767, tablet ≤1024.

**Links:** `#AF6339`. **Inputs:** 1px border, radius 0, white bg. **Images:** border-radius 0.

### Header (FIXED, full-width, inner 1280px) — layout: [logo left] [nav center/right] [Book Now right]
- Logo → `/` : **`BIRCH-GLEN-LODGE-1.png`** (663×250)  ← *NOT the wide wordmark*
- Desktop nav (≥1025), exact order + hrefs:
  1. About → /about/
  2. Rooms → /rooms/
  3. Guide To Cascade → /guide-to-cascade/ **(hover dropdown: Trails → /trails/, Rivers, Lakes, Hot Springs → /rivers-lakes-hot-springs/)**
  4. Gallery → /gallery/
  5. Contact Us → /contact-us/
- Book button (right): label **"Book Now"** → https://booking.thebirchglenlodge.com/  ← *not "Book A Room"*
- **No phone shown in desktop header.**
- Mobile/tablet (≤1024): hamburger → off-canvas; same items PLUS `Book A Room → booking...` and `208-382-4238 → tel:2083824238` at the end. Dropdown opens on click (+ icon).
- Floating button widget (bottom-right, id 229): panel "Get In Touch Today!" → Give Us A Call (tel:+12083824238) + Book A Room (booking).

### Footer (inner 1280px): 3 columns, divider, bottom bar
- Col 1: logo **`BIRCH-GLEN-LODGE-LOGO.png`** (800×100) + description: "Located next door to Kelly's Whitewater Park in Cascade, Birch Glen is right in the heart of Valley County with convenient access to outdoor activities including rafting, fishing, golfing, swimming, kayaking, boating, water skiing, hiking, biking, hotsprings, ice fishing, snow skiing, cross-country skiing, snowmobiling, and snowshoeing."
- Col 2 "Contact" (h6): (208) 510-0663 → tel:2085100663 · info@thebirchglenlodge.com → mailto · Book Now → **https://www.hosteeva.com/birchglenlodge**
- Col 3 "Address" (h6): 762 S. Main St. Cascade, ID 83611
- Bottom bar (right-aligned desktop): "2025, Birch Glen Lodge" (plain) · Privacy Policy → /privacy-policy/ · Terms of Service → /terms-of-service/

---

## IMAGE MAP (section → file; real filenames as on disk)

All files exist in `public/wordpress/` (originals) — the used set gets moved to `public/images/`.

**HOME**
- Hero background: `104-River-scaled.jpg`
- Intro 2-col: left (eyebrow "Staying With Us") = `001-Daytime-Aerial-scaled.jpg`; right (H2 + paragraph) = `BIRCH-38.jpg`
- "World's Biggest Perch" section background: `BIRCH-43.jpg`
- "Homestyle Comfort" section background: `BIRCH-71.jpg`
- Rooms carousel (5 cards): Royal King=`BIRCH-44.jpg`, Deluxe Double=`BIRCH-84.jpg`, Single Queen=`BIRCH-63.jpg`, Triple=`BIRCH-99.jpg`, Private Upstairs Suite=`BIRCH-97.jpg`
- Groups & Events: classic background color (no image)
- Final CTA "Book With Birch Glen Today" background: `BIRCH-39.jpg`
- Newsletter: **embedded iframe** `https://api.arrowleafmarketing.com/widget/form/NNtNQ9ALNXtAU1Em5Afs` (GoHighLevel form, height 780)

**ABOUT**
- Hero background: `097-Daytime-Aerial-scaled.jpg`
- Mountain Life 2-col: left = `BIRCH-76.jpg`; right = stats (56 / 270+) + `BIRCH-110.jpg`
- Amenities feature row (portrait imgs): `5.jpg`, `6.jpg`
- "Find Your Perfect Stay" band background: `BIRCH-36.jpg`

**ROOMS**
- Section background present: `Birch-166-scaled.jpg` (container 1dc9aaf6 — confirm placement in QA; likely intro band)
- Carousel hover-swap (main/hover): Royal King `BIRCH-63`/`BIRCH-66`, Deluxe Double `BIRCH-53`/`BIRCH-56`, Single Queen `065-Room-Interior-5-scaled.jpg`/`067-Room-Interior-5-scaled.jpg`, Triple `BIRCH-99`/`BIRCH-101`, Private Upstairs Suite `BIRCH-97`/`BIRCH-100`
- Features portrait imgs: "Each Room Includes" = `BIRCH-80.jpg`; "Lodge Amenities" = `BIRCH-72.jpg`

**GUIDE TO CASCADE**
- Hero background: `104-River-scaled.jpg`
- Slider cards: Trails = `2.jpg` → /trails/ ; Rivers, Lakes, Hot Springs = `1.jpg` → /rivers-lakes-hot-springs/

**TRAILS** — Hero background: `2.jpg`
**RIVERS, LAKES, HOT SPRINGS** — Hero background: `1.jpg`
**GALLERY** — Hero background: `Birch-Glen-Overview.png`
**CONTACT** — Hero background: `BIRCH-33.jpg`

---

## PAGE STRUCTURE (section-by-section, in order)

> Full verbatim copy per section is captured in the workflow output
> (`tasks/w3cqfmdsk.output`) and the saved page HTML in scratchpad. Reproduce EXACTLY,
> including curly quotes, "Worlds" (no apostrophe), and trailing content.

### HOME (`/`)
1. **Hero** — bg `104-River-scaled.jpg`. H1 "Birch Glen Lodge & Motel" (br after "Birch Glen"), subtext "A Serene Mountain Getaway in Cascade, Idaho". CTAs: **Book Now** (booking), **Contact Us** (/contact-us/).
2. **Intro (2-col)** — L: eyebrow "Staying With Us" + aerial. R: H2 "Escape to the Mountains, Stay by the lake" + `BIRCH-38` + paragraph (est. 1968) + **Read More** → /about/.
3. **Why Choose Us** (bg `BIRCH-43`) — centered: eyebrow "Why Choose Us?", H2 "Home of the Worlds Biggest Perch", 1 paragraph.
4. **Homestyle Comfort** (bg `BIRCH-71`) — centered: eyebrow "Homestyle Comfort", H2 "Inside or Outside", 1 paragraph.
5. **Explore our rooms** — header (eyebrow "Picture Your Stay" + H2 "Explore our rooms", right btn **View More** → /rooms/) + **carousel** (5 room cards, image + H5 title, each → /rooms/).
6. **Groups & Events (2-col)** — L: eyebrow "Who Comes To The Birch Glen?", H2 "Perfect for Groups & Events", btn **Book A Stay** (booking). R: **accordion** — Weddings & Receptions (open), Family Reunions, Corporate Retreats, Group Getaways.
7. **Testimonials** — eyebrow "Reviews", H3 "Testimonials from Our Clients", **slider** of 4 quotes (no names).
8. **Newsletter (2-col)** — L: eyebrow "Stay Notified" + H3 "Sign Up For Our Newsletter". R: **iframe form** (GoHighLevel/Arrowleaf).
9. **Final CTA** (bg `BIRCH-39`) — centered H2 "Book With Birch Glen Today" + icon list: email (mailto) + phone (208) 510-0663 (tel).

### ABOUT (`/about/`)
1. **Hero** (bg `097-Daytime-Aerial-scaled`) — H1 "About Us" + subtitle "Nestled In The Heart Of Valley County".
2. **Mountain Life (2-col)** — L: eyebrow "Mountain Life", H2 "Cascade. A Recreational Paradise.", img `BIRCH-76`, paragraph (bold phrase). R: intro paragraph, **stats grid** ("56" / "Years In Business", "270+" / "5 Star Reviews"), img `BIRCH-110`.
3. **Amenities row** — img `5.jpg` | text card H3 "Amenities" + check-list [Game Room] | img `6.jpg` | text card H3 "Feel Like Being Outside?" + check-list [Firepit, BBQ Area].
4. **Adventure Awaits** — header (eyebrow "Your Guide To The Outdoors" + H2 "Adventure Awaits", right btn **Book Today**) + 3-col checklist (Mountain Biking, Trail Riding, Snowmobiling, Bird Watching | Ice-Fishing, Rafting, Skiing, Rodeos | Hiking, Hunting, Golfing, Hot Springs).
5. **Find Your Perfect Stay** band (bg `BIRCH-36`) — H2 + right btn **Browse Rooms** → /rooms/.

### ROOMS (`/rooms/`)
1. **Intro title** — H1 "Our Rooms" + subtitle "Comfort For Your Adventure In The Mountains".
2. **Explore our rooms** — header (eyebrow "Picture Your Stay" + H2 "Explore our rooms", right btn **Book Now**) + **carousel** of 5 hover-swap room cards (mapping above).
3. **Room & Lodge Features** — img `BIRCH-80` | panel H3 "Each Room Includes:" + [Mini Fridge, Microwave, Air Conditioning/Heater, Coffee Maker, Television/Cable/Wifi] | img `BIRCH-72` | panel H3 "Lodge Amenities:" + [Game Room, Sauna, Additional Bathrooms, Additional Showers, Kitchen with Microwave, Toaster, and Coffee Maker].
4. **Group Bookings** — eyebrow "Big Group? We have you covered!", H2 "Group Bookings", paragraph ("Discounts available for groups of 5+ rooms...call our main number...").
5. **Cascade. A Recreational Paradise** — header (eyebrow "Your Guide To The Outdoors" + H2, right btn **Book Today**) + 3-col activities checklist (same 12 as About).

### GUIDE TO CASCADE (`/guide-to-cascade/`)
1. **Intro** (bg) — H1 "Our Guide To Cascade" + paragraph "Beautiful Cascade Idaho has much to offer for the outdoor lover."
2. **Local Favorites** — eyebrow "Local Favorites" + H2 "Explore our beautiful area" + **2-card slider**: Trails (`2.jpg` → /trails/), Rivers, Lakes, Hot Springs (`1.jpg` → /rivers-lakes-hot-springs/).

### TRAILS (`/trails/`)
1. **Hero** (bg `2.jpg`) — H1 "Trails".
2. **Trail guide** (one long text block, verbatim) — H2 "Leave the Road. Take the Trail."; then trail blocks separated by `<hr>`: H4 "OHV Trail Riding" (+ Learn More → fs.usda.gov recid=5026); "Dollar Creek Way Trail #114 –" (6 paras + recid=5154); "East Mountain Trail Way" (8 paras + recid=5155); "Gold Fork North Trail" (8 paras + recid=5156); "Needles Route Trail" (6 paras + recid=5158); "Wilson Creek Trail" (4 paras + recid=5165); H4 "Room for your toys. Room to relax."; closing "We have parking for your big trailers!". Preserve `small-serif`/`extra-small-serif` classes. "Learn More →" are inline links (new tab).

### RIVERS, LAKES, HOT SPRINGS (`/rivers-lakes-hot-springs/`)
1. **Hero** (bg `1.jpg`) — H1 "Rivers, Lakes, Hot Springs".
2. **Body** (one text block, verbatim) — H4 "Rivers, Lakes, Hot Springs" (small-serif) + "We look forward to hearing from you!"; intro paragraph; `<hr>`; H2 "Lake Cascade" (small-serif) + paragraphs (47 sq mi, Idaho's 4th largest, links to Birch Glen + Idaho Fish Planner); bold "Best trout, perch, and smallmouth fishing around!" + "A list of fish..."; **two fish lists** (List 1 observed w/ glyph icons; List 2 full species) — each species links to idfg.idaho.gov/species; closing paragraph.

### GALLERY (`/gallery/`)
1. **Title band** — H1 "Gallery".
2. **Grid** — 3 col desktop / 2 col tablet-mobile, 10px gap, aspect 3:2, hover fade overlay, lightbox slideshow. 33 tiles in EXACT order:
   `BIRCH-40, 43, 45, 47, 48, 50, 51, 53, 54, 55, 58, 59, 61, 62, 63, 64, 65, 66, 67, 70, 72, 75, 84, 87, 79, 78, 97, 99, 100, 95, 92, 91, 107` (note: order is NOT strictly numeric).

### CONTACT (`/contact-us/`)  → new route `/contact/` with 301 from `/contact-us/`
1. **Hero** (bg `BIRCH-33`) — H1 "Contact Us" + subtitle "Escape. Explore. Relax. Your Mountain Getaway Awaits".
2. **Info + Form (2-col)** — L: eyebrow "Get in touch", H2 "We'd Love to Hear From You", icon list: map "Idaho 55 762 S. Main St. Cascade, ID 83611" → Google Maps, email → mailto, phone (208) 510-0663 → tel. R: eyebrow "Let Us Help You On Your Next Adventure", 2 paragraphs, **Metform contact form** (Name/Email/Message/Submit; endpoint TBD → mailto stopgap for now).
3. **Google Map** — iframe `maps.google.com/maps?q=762%20S%20Main%20St%2C%20Cascade%2C%20ID%2083611&z=16&output=embed`.

### PRIVACY POLICY (`/privacy-policy/`) & TERMS OF SERVICE (`/terms-of-service/`)
- H1 title band + single long-form text block, verbatim (captured). Privacy eff. 5/1/25 (9 sections). Terms eff. 12/19/25 (12 sections, `<hr>` between). Reproduce headings, bold, bullet lists exactly.

---

## KEY CORRECTIONS vs. the first (refresh) build
1. Headings must be **Manrope**, not EB Garamond serif.
2. Buttons **8px radius**, not pills; hover → teal.
3. Header logo = `BIRCH-GLEN-LODGE-1.png`; label = **"Book Now"**; **no phone** in desktop header.
4. **Home hero bg = `104-River-scaled.jpg`** (was wrong).
5. Home uses a **room carousel**, an **accordion** for Groups & Events, a **testimonial slider**, and an **embedded Arrowleaf/GoHighLevel newsletter iframe**.
6. Section background photos come from per-page CSS (mapped above).
7. Rooms carousel is **hover-swap** (2 imgs each); Single Queen uses `065/067-Room-Interior-5-scaled.jpg`.
8. Contact has a **Google Map embed** and a **Metform** form; About has a **stats grid** + alternating image/text amenities row.
9. Trails & Rivers are **long-form editorial** pages with inline external links — far more content than v1.
10. All legacy URLs preserved; `/contact-us/` 301 → `/contact/`.
