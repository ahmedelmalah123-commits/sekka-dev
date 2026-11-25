import { brandConfig } from "@/config/brand.config";

const BASE_URL =
  process.env["APP_URL"] ?? "https://sekka.app";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandConfig.name.ar,
    alternateName: brandConfig.name.en,
    description: brandConfig.description.ar,
    url: BASE_URL,
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandConfig.name.ar,
    url: BASE_URL,
    inLanguage: "ar",
  };
}

export type FaqItem = { question: string; answer: string };

export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
