import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // Anciennes URLs de l'activité précédente → accueil (301 permanentes).
    return [
      { source: "/vendre/:path*", destination: "/", statusCode: 301 },
      { source: "/depot-vente/:path*", destination: "/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
