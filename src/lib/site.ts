/**
 * Single source of truth for brand, company and contact details.
 * Legal pages, the footer and metadata all read from here so the
 * identity stays consistent across the site.
 */
export const site = {
  name: "Sideplate",
  domain: "sideplate.online",
  url: "https://sideplate.online",
  tagline: "Your website on every table",
  description:
    "Sideplate turns every restaurant table into a digital waiter: QR ordering, shared bills, a live kitchen display and one calm dashboard for the whole service.",
  company: "Sideplate", // "Ivents",
  companyLine: "Sideplate", // "Sideplate is a product of Ivents.",
  email: "hello@sideplate.online",
  location: "Lagos, Nigeria",
  lastUpdated: "4 November 2026",
} as const;
