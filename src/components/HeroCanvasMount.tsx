"use client";

import dynamic from "next/dynamic";

// Composant client isolé, chargé en dynamic(..., { ssr: false }) — voir BRIEF.md.
// L'import ssr:false doit vivre dans un Client Component (App Router).
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroCanvasMount() {
  return <HeroCanvas />;
}
