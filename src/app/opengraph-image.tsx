import { ImageResponse } from "next/og";

export const alt = "Topsail — Votre note Google vous fait perdre des clients. On la fait remonter.";
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
          padding: "72px 80px",
          background: "#FAFAF7",
          color: "#0B1220",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32, fontWeight: 700 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "#F5B400" }} />
          TOPSAIL
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, lineHeight: 1.08, fontWeight: 800 }}>
          <span>Votre note Google vous fait perdre des clients.</span>
          <span style={{ color: "#1D4ED8", marginTop: 8 }}>On la fait remonter.</span>
        </div>
        <div style={{ fontSize: 30, color: "#4B5563" }}>
          Réputation Google · Commerces et artisans du Pays de Grasse
        </div>
      </div>
    ),
    size,
  );
}
