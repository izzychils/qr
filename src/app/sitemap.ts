import type { MetadataRoute } from "next";

const publicPaths = [
  "/",
  "/about",
  "/contact",
  "/pricing",
  "/privacy",
  "/products",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: `https://sideplate.online${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
