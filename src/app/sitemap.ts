import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://basewilmington.com";
  const paths = [
    "",
    "/spaces",
    "/map",
    "/walkthrough",
    "/book",
    "/use-cases",
    "/about",
    "/impact",
    "/partner",
    "/gallery",
    "/contact",
  ];
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
