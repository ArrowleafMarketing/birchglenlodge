export const site = {
  name: "Birch Glen Lodge",
  fullName: "Birch Glen Lodge & Motel",
  tagline: "A Serene Mountain Getaway in Cascade, Idaho",
  established: 1968,
  bookingUrl: "https://booking.thebirchglenlodge.com/",
  phonePrimary: "(208) 382-4238",
  phoneSecondary: "(208) 510-0663",
  phonePrimaryHref: "tel:+12083824238",
  phoneSecondaryHref: "tel:+12085100663",
  email: "info@thebirchglenlodge.com",
  address: {
    street: "762 S. Main St.",
    city: "Cascade",
    state: "ID",
    zip: "83611",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  {
    label: "Guide To Cascade",
    href: "/guide-to-cascade",
    children: [
      { label: "Trails", href: "/trails" },
      { label: "Rivers, Lakes, Hot Springs", href: "/rivers-lakes-hot-springs" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];
