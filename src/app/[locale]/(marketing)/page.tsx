import type { Metadata } from "next";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/json-ld";
import { brandConfig } from "@/config/brand.config";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProblemSplit } from "@/components/marketing/problem-split";
import { HowItWorksTimeline } from "@/components/marketing/how-it-works-timeline";
import { JourneyTimeline } from "@/components/marketing/journey-timeline";
import { WorkspaceShowcase } from "@/components/marketing/workspace-showcase";
import { AiCapabilitiesPreview } from "@/components/marketing/ai-capabilities-preview";
import { EgyptLegalDemo } from "@/components/marketing/egypt-legal-demo";
import { TrustCommitments } from "@/components/marketing/trust-commitments";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { FaqSection } from "@/components/marketing/faq-section";
import { ClosingCta } from "@/components/marketing/closing-cta";

export const metadata: Metadata = {
  title: `${brandConfig.name.ar} — ${brandConfig.tagline.ar}`,
  description: brandConfig.description.ar,
  openGraph: {
    title: `${brandConfig.name.ar} — ${brandConfig.tagline.ar}`,
    description: brandConfig.description.ar,
    locale: "ar_EG",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const orgJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebSiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Section 1 is in layout (SiteHeader) */}
      {/* Section 2: Hero */}
      <HeroSection />
      {/* Section 3: Problem */}
      <ProblemSplit />
      {/* Section 4: How it works */}
      <HowItWorksTimeline />
      {/* Section 5: Journey */}
      <JourneyTimeline />
      {/* Section 6: Workspace */}
      <WorkspaceShowcase />
      {/* Section 7: AI capabilities */}
      <AiCapabilitiesPreview />
      {/* Section 8: Egypt legal demo */}
      <EgyptLegalDemo />
      {/* Section 9: Trust */}
      <TrustCommitments />
      {/* Section 10: Pricing */}
      <PricingTeaser />
      {/* Section 11: FAQ */}
      <FaqSection />
      {/* Section 12: Closing CTA */}
      <ClosingCta />
      {/* Section 13 is in layout (SiteFooter) */}
    </>
  );
}
