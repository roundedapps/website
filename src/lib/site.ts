/**
 * Site-wide constants and configuration
 */

export const siteConfig = {
  name: "Roundedapps",
  description:
    "Accessbox is a second life for the password manager Rodolfo Vasquez shipped in 2013. Rewritten ground-up for modern iPhone and Mac. Strong passwords, memorable ones.",
  url: "https://www.roundedapps.com",
  ogImage: "/og-image.png",
  supportEmail: "support@roundedapps.com",
  location: "Costa Rica",
};

export const appConfig = {
  accessbox: {
    name: "Accessbox",
    tagline: "Strong passwords you can remember.",
    platforms: "iPhone and Mac",
    // TODO: Replace with actual TestFlight URL when available
    testFlightUrl: "https://testflight.apple.com/join/hAP3CKtt",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/accessbox", label: "Accessbox" },
  { href: "/support", label: "Support" },
];

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];







