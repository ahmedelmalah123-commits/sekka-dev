import { ImageResponse } from "next/og";
import { brandConfig } from "@/config/brand.config";

export const alt = `${brandConfig.name.ar} — ${brandConfig.tagline.ar}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Fetch IBM Plex Sans Arabic TTF from Google Fonts for Satori shaping test
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/ibmplexsansarabic/v11/Qw3CZRtWPQCuHme67tEYUIx3Kh0PHR9N6Y6-.ttf",
  )
    .then((res) => (res.ok ? res.arrayBuffer() : null))
    .catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: brandConfig.tokens.light.bg,
          color: brandConfig.tokens.light.text,
          border: `8px solid ${brandConfig.tokens.light.border}`,
          fontFamily: fontData ? '"IBM Plex Sans Arabic"' : "sans-serif",
          direction: "rtl",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: brandConfig.tokens.light.terracottaDecor,
              fontWeight: 600,
            }}
          >
            {brandConfig.name.en} · FIG. 00
          </span>
          <span
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: brandConfig.tokens.light.text,
            }}
          >
            {brandConfig.name.ar}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.3,
              color: brandConfig.tokens.light.text,
            }}
          >
            {brandConfig.tagline.ar}
          </div>
          <div
            style={{
              fontSize: 28,
              color: brandConfig.tokens.light.textMuted,
            }}
          >
            {brandConfig.tagline.en}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${brandConfig.tokens.light.border}`,
            paddingTop: "24px",
            fontSize: 20,
            color: brandConfig.tokens.light.textMuted,
          }}
        >
          <span>AI Co-founder</span>
          <span>من الفكرة للتأسيس والإطلاق</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "IBM Plex Sans Arabic",
                data: fontData,
                style: "normal",
                weight: 600,
              },
            ],
          }
        : {}),
    },
  );
}
