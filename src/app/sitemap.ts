import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://heizcenter.de";

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/waermepumpe`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/heizung`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sanitaer`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/klimaanlage`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/standorte`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Location pages
  const locations = [
    "augsburg",
    "ulm",
    "memmingen",
    "neu-ulm",
    "friedberg",
    "koenigsbrunn",
    "stadtbergen",
    "gersthofen",
    "neusaess",
    "mindelheim",
    "bad-woerishofen",
    "ottobeuren",
    "laupheim",
    "blaustein",
  ];

  const locationPages = locations.map((location) => ({
    url: `${baseUrl}/standorte/${location}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog categories
  const blogCategories = [
    "waermepumpe",
    "heizung",
    "sanitaer",
    "klimaanlage",
    "foerderung",
  ];

  const categoryPages = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/kategorie/${category}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  // TODO: Add dynamic blog posts from Odoo CMS
  // For now, we'll add placeholder URLs
  const blogPosts = [
    "waermepumpe-kosten-2025",
    "heizungsgesetz-2024",
    "beg-foerderung-2025",
    "waermepumpe-altbau",
    "heizung-wartung",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...mainPages, ...locationPages, ...categoryPages, ...blogPosts];
}
