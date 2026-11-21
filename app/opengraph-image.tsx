import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 70% at 50% -10%, rgba(245,165,36,0.35), #0b0b0f 70%)",
          color: "#f4f1ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
          <div style={{ width: 34, height: 34, borderRadius: 999, background: "#f5a524" }} />
          PER CAP PARTNERS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, color: "#f5a524" }}>You book the talent.</div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02 }}>We run the numbers.</div>
        </div>
        <div style={{ fontSize: 30, color: "#b0ada6" }}>Fractional CFO and fan intelligence for independent music venues</div>
      </div>
    ),
    size,
  );
}
