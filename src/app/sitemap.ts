import type { MetadataRoute } from "next";

const BASE_URL = process.env["APP_URL"] ?? "https://sekka.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const marketingRoutes = [
    { path: "/", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/how-it-works", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/features", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/pricing", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/faq", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFreq: "yearly" as const },
    { path: "/waitlist", priority: 0.9, changeFreq: "weekly" as const },
    // terms and privacy are noindex but still in sitemap for discovery
    { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
  ];

  return marketingRoutes.map(({ path, priority, changeFreq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }));
}
