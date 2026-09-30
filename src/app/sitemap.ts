import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/portfolio";
import { getAllPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    ...getAllPosts().map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
