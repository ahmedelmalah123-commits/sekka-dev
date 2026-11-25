import {
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  Readex_Pro,
} from "next/font/google";

export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-sans-arabic",
});

export const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-readex-pro",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const fontVariablesClassName = [
  ibmPlexSansArabic.variable,
  readexPro.variable,
  ibmPlexMono.variable,
].join(" ");
