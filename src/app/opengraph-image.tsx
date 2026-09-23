import { ImageResponse } from "next/og";

export const alt = "Topsail — Vos objets dorment ? On les vend pour vous. Dépôt-vente à domicile à Grasse.";
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
          background:
            "radial-gradient(120% 90% at 88% 8%, #D7E3EA 0%, #F6F1E7 55%), radial-gradient(90% 80% at 0% 100%, #EDE4D3 0%, transparent 60%), #F6F1E7",
          color: "#0E1A2B",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, letterSpacing: 2 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#D98C1F" }} />
          TOPSAIL
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 1.05, fontWeight: 700 }}>
          <span>Vos objets dorment ?</span>
          <span style={{ color: "#1F4E6B" }}>On les vend pour vous.</span>
        </div>
        <div style={{ fontSize: 34, color: "#4A5565" }}>Dépôt-vente à domicile · Grasse et alentours</div>
      </div>
    ),
    size,
  );
}
