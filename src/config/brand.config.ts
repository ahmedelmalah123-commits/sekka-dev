export type ThemeTokens = {
  bg: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  gridLine: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  primaryContrast: string;
  terracottaDecor: string;
  highlight: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
};

export type NavLink = {
  key: "home" | "howItWorks" | "features" | "pricing" | "faq" | "contact";
  href: string;
};

/**
 * Single source of truth for SEKKA / سِكّة brand identity, design tokens, and W1 navigation.
 * Renaming the product is a one-file change here (paired with translation keys reading from this config).
 */
export const brandConfig = {
  id: "sekka",
  name: {
    ar: "سِكّة",
    en: "SEKKA",
    latinTitle: "Sekka",
  },
  tagline: {
    ar: "من الفكرة.. للسِكّة الصح.",
    en: "Build what you believe in.",
  },
  description: {
    ar: "سِكّة شريك مؤسس بالذكاء الاصطناعي بيمشي معاك من الفكرة لحد التأسيس والإطلاق، وبيفتكر كل قرار خدته.",
  },
  locale: {
    default: "ar" as const,
    supported: ["ar"] as const,
    dir: "rtl" as const,
    numberFormatLocale: "ar-EG-u-nu-latn",
    currency: {
      code: "EGP",
      symbolAr: "ج.م",
    },
    weekStartsOn: "saturday" as const,
  },
  legalDraftNotice: {
    ar: "مسودة — بانتظار المراجعة القانونية",
    en: "Draft — Pending legal review",
  },
  tokens: {
    light: {
      bg: "#F4EEE2",
      surface: "#FBF8F1",
      surfaceMuted: "#EAE2D2",
      border: "#D8D0BE",
      borderStrong: "#6F827E",
      gridLine: "#B9C9C3",
      text: "#0E3B3A",
      textMuted: "#4F6563",
      primary: "#B5472F",
      primaryHover: "#9A3B26",
      primaryContrast: "#FFFFFF",
      terracottaDecor: "#C8553D",
      highlight: "#D8B98A",
      success: "#1F7A44",
      warning: "#8A5A00",
      danger: "#B3261E",
      info: "#245C8A",
    } satisfies ThemeTokens,
    dark: {
      bg: "#0A1C1B",
      surface: "#102726",
      surfaceMuted: "#163230",
      border: "#274543",
      borderStrong: "#6E908B",
      gridLine: "#1E3A38",
      text: "#F1EADB",
      textMuted: "#A9B8B3",
      primary: "#E8795E",
      primaryHover: "#F08C72",
      primaryContrast: "#0A1C1B",
      terracottaDecor: "#C8553D",
      highlight: "#E2C79A",
      success: "#5CC28A",
      warning: "#E0A84A",
      danger: "#F07A70",
      info: "#7FB2E0",
    } satisfies ThemeTokens,
    typography: {
      maxWeightsPerFamily: 3,
      families: {
        sans: "IBM Plex Sans Arabic",
        display: "Readex Pro",
        mono: "IBM Plex Mono",
      },
    },
    spacingPx: [4, 8, 12, 16, 24, 32, 48, 64, 96] as const,
    radiusPx: {
      sm: 2,
      md: 4,
      lg: 8,
    },
    containersPx: {
      marketing: 1200,
      app: 1440,
      reading: 720,
    },
    motionMs: {
      micro: 150,
      layout: 250,
    },
  },
  navigation: {
    header: [
      { key: "home", href: "/" },
      { key: "howItWorks", href: "/how-it-works" },
      { key: "features", href: "/features" },
      { key: "pricing", href: "/pricing" },
      { key: "faq", href: "/faq" },
      { key: "contact", href: "/contact" },
    ] satisfies readonly NavLink[],
    primaryCta: {
      href: "/waitlist",
    },
    footer: {
      product: [
        { key: "home", href: "/" },
        { key: "howItWorks", href: "/how-it-works" },
        { key: "features", href: "/features" },
        { key: "pricing", href: "/pricing" },
      ],
      company: [
        { key: "faq", href: "/faq" },
        { key: "contact", href: "/contact" },
        { key: "waitlist", href: "/waitlist" },
      ],
      legal: [
        { key: "terms", href: "/terms" },
        { key: "privacy", href: "/privacy" },
      ],
    },
  },
} as const;
