import type { MetadataRoute } from "next";

const BASE_URL = process.env["APP_URL"] ?? "https://sekka.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/styleguide"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
