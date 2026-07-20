import Link from "next/link";
import { Container } from "@/components/ui";
import { Hero } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lake Cascade Fishing, Rivers & Hot Springs",
  description:
    "Fishing, rafting, kayaking, paddle boarding & hot springs in Cascade, Idaho. Lake Cascade offers world-class perch and ice fishing near Birch Glen Lodge.",
  path: "/rivers-lakes-hot-springs/",
});

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guide To Cascade", path: "/guide-to-cascade/" },
  { name: "Rivers, Lakes, Hot Springs", path: "/rivers-lakes-hot-springs/" },
]);

type Fish = { name: string; sci: string; href: string };

// List 1 — species observed in Lake Cascade (with search glyph on the live site)
const fishListOne: Fish[] = [
  { name: "Bluegill / Pumpkinseed / Sunfish", sci: "Lepomis spp.", href: "https://idfg.idaho.gov/species/taxa/7257" },
  { name: "Bullhead Catfish", sci: "Ameiurus spp.", href: "https://idfg.idaho.gov/species/taxa/7391" },
  { name: "Coho Salmon", sci: "Oncorhynchus kisutch", href: "https://idfg.idaho.gov/species/taxa/17203" },
  { name: "Crappie", sci: "Pomoxis spp.", href: "https://idfg.idaho.gov/species/taxa/19841" },
  { name: "Kokanee", sci: "Oncorhynchus nerka", href: "https://idfg.idaho.gov/species/taxa/16015" },
  { name: "Largemouth Bass", sci: "Micropterus salmoides", href: "https://idfg.idaho.gov/species/taxa/16488" },
  { name: "Mountain Whitefish", sci: "Prosopium williamsoni", href: "https://idfg.idaho.gov/species/taxa/18744" },
  { name: "Rainbow Trout", sci: "Oncorhynchus mykiss", href: "https://idfg.idaho.gov/species/taxa/19083" },
  { name: "Smallmouth Bass", sci: "Micropterus dolomieu", href: "https://idfg.idaho.gov/species/taxa/18815" },
  { name: "Yellow Perch", sci: "Perca flavescens", href: "https://idfg.idaho.gov/species/taxa/17482" },
];

// List 2 — full observed species list
const fishListTwo: Fish[] = [
  { name: "Black Crappie", sci: "Pomoxis nigromaculatus", href: "https://idfg.idaho.gov/species/taxa/17591" },
  { name: "Brook Trout", sci: "Salvelinus fontinalis", href: "https://idfg.idaho.gov/species/taxa/18219" },
  { name: "Channel Catfish", sci: "Ictalurus punctatus", href: "https://idfg.idaho.gov/species/taxa/19986" },
  { name: "Coho Salmon", sci: "Oncorhynchus kisutch", href: "https://idfg.idaho.gov/species/taxa/17203" },
  { name: "Kokanee (Early Spawner)", sci: "Oncorhynchus nerka", href: "https://idfg.idaho.gov/species/taxa/16015" },
  { name: "Kokanee (October Spawner)", sci: "Oncorhynchus nerka", href: "https://idfg.idaho.gov/species/taxa/16015" },
  { name: "Largemouth Bass", sci: "Micropterus salmoides", href: "https://idfg.idaho.gov/species/taxa/16488" },
  { name: "Mountain Whitefish", sci: "Prosopium williamsoni", href: "https://idfg.idaho.gov/species/taxa/18744" },
  { name: "Pumpkinseed", sci: "Lepomis gibbosus", href: "https://idfg.idaho.gov/species/taxa/19003" },
  { name: "Rainbow Trout", sci: "Oncorhynchus mykiss", href: "https://idfg.idaho.gov/species/taxa/19083" },
  { name: "Rainbow Trout (Hatchery)", sci: "Oncorhynchus mykiss", href: "https://idfg.idaho.gov/species/taxa/19083" },
  { name: "Smallmouth Bass", sci: "Micropterus dolomieu", href: "https://idfg.idaho.gov/species/taxa/18815" },
  { name: "Steelhead (Hatchery)", sci: "Oncorhynchus mykiss", href: "https://idfg.idaho.gov/species/taxa/79812" },
  { name: "Tiger Muskie", sci: "Esox masquinongy x lucius", href: "https://idfg.idaho.gov/species/taxa/78495" },
  { name: "White Crappie", sci: "Pomoxis annularis", href: "https://idfg.idaho.gov/species/taxa/19841" },
  { name: "Yellow Perch", sci: "Perca flavescens", href: "https://idfg.idaho.gov/species/taxa/17482" },
];

function FishLink({ fish }: { fish: Fish }) {
  return (
    <a title={`${fish.sci} species profile.`} href={fish.href}>
      {fish.name}
    </a>
  );
}

export default function RiversLakesHotSpringsPage() {
  return (
    <>
      <Hero
        image="/images/1.jpg"
        imageAlt="Rivers, lakes, and hot springs near Cascade, Idaho"
        title="Rivers, Lakes, Hot Springs"
        priority
      />

      <JsonLd data={breadcrumb} />
      <Container className="prose-body max-w-3xl py-16 text-ink/80 sm:py-20">
        <Reveal>
          <h2 className="small-serif">
            <strong>Rivers, Lakes, Hot Springs</strong>
          </h2>
          <p className="small-san-serif">We look forward to hearing from you!</p>
          <p>
            Cascade and Valley County are filled with some of the best fishing and water-based
            recreation in Idaho. We have you covered from rafting and kayaking to fishing and paddle
            boarding. We have hot springs for soaking and some of the best ice fishing in the world.
          </p>
        </Reveal>
        <hr />
        <Reveal as="h2" className="small-serif">
          <b>Lake Cascade</b>
        </Reveal>
        <p>
          Located less than 2 minutes from{" "}
          <Link href="/">Birch Glen Lodge and Motel</Link> on the North Fork of
          the Payette river it has a surface area of 47 square miles. Lake Cascade is the fourth
          largest lake or reservoir in the state. The closest cities are Cascade and Donnelly.
        </p>
        <p>
          For stocking, seasonal rules and licenses Check out{" "}
          <a href="https://idfg.idaho.gov/ifwis/fishingPlanner/water/?id=13043">
            Idaho Fish Planner
          </a>
        </p>
        <p>
          <strong>Best trout, perch, and smallmouth fishing around!</strong>
          <br />A list of fish that have been observed in Lake Cascade.
        </p>
        <Reveal as="ul">
          {fishListOne.map((fish, i) => (
            <li key={`one-${i}`}>
              <FishLink fish={fish} /> (<em>{fish.sci}</em>)
            </li>
          ))}
        </Reveal>
        <Reveal as="ul" delay={80}>
          {fishListTwo.map((fish, i) => (
            <li key={`two-${i}`}>
              <FishLink fish={fish} /> (<em>{fish.sci}</em>)
            </li>
          ))}
        </Reveal>
        <p>
          If fishing isn’t what you’re here for then take a dip, relax on the shore, and watch the
          sailboats. So many options on Lake Cascade.
        </p>
      </Container>
    </>
  );
}
