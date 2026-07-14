export const site = {
  name: "Birch Glen Lodge",
  fullName: "Birch Glen Lodge & Motel",
  bookingUrl: "https://booking.thebirchglenlodge.com/",
  hosteevaUrl: "https://www.hosteeva.com/birchglenlodge",
  phonePrimary: "208-382-4238",
  phonePrimaryHref: "tel:2083824238",
  phoneSecondary: "(208) 510-0663",
  phoneSecondaryHref: "tel:2085100663",
  email: "info@thebirchglenlodge.com",
  mapUrl: "https://maps.app.goo.gl/x9YmsgLDaofp3f1L8",
  mapEmbed:
    "https://maps.google.com/maps?q=762%20S%20Main%20St%2C%20Cascade%2C%20ID%2083611&t=m&z=16&output=embed&iwloc=near",
  address: {
    line1: "762 S. Main St.",
    cityStateZip: "Cascade, ID 83611",
    full: "762 S. Main St. Cascade, ID 83611",
    contactList: "Idaho 55 762 S. Main St. Cascade, ID 83611",
  },
  headerLogo: "/images/BIRCH-GLEN-LODGE-1.png", // 663x250
  footerLogo: "/images/BIRCH-GLEN-LODGE-LOGO.png", // 800x100
  newsletterEmbed: "https://api.arrowleafmarketing.com/widget/form/NNtNQ9ALNXtAU1Em5Afs",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// Desktop primary nav (exact order + labels from the live site)
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
