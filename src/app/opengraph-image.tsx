import { ImageResponse } from "next/og";

export const alt = "Topsail — On vide, on vend, vous encaissez. Dépôt-vente à domicile à Grasse.";
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
          background: "linear-gradient(135deg, #0E1A2B 0%, #16263C 60%, #1F4E6B 100%)",
          color: "#F6F1E7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, letterSpacing: 2 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#D98C1F" }} />
          TOPSAIL
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.05, fontWeight: 700 }}>
          <span>On vide, on vend,</span>
          <span style={{ color: "#D98C1F" }}>vous encaissez.</span>
        </div>
        <div style={{ fontSize: 34, opacity: 0.85 }}>Dépôt-vente à domicile · Grasse et alentours</div>
      </div>
    ),
    size,
  );
}
