import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { monogramSvgString } from "@/components/monogram";

const mark = `data:image/svg+xml;base64,${Buffer.from(monogramSvgString({ pad: 90, radius: 120 })).toString("base64")}`;

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
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={64} height={64} alt="" />
          PER CAP PARTNERS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02 }}>Know which shows</div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, color: "#f5a524" }}>actually make money.</div>
        </div>
        <div style={{ fontSize: 30, color: "#b0ada6" }}>Show-level profitability for independent venue groups</div>
      </div>
    ),
    size,
  );
}
