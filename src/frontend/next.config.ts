import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // tesseract.js lance ses propres workers et charge ses fichiers depuis node_modules :
  // il doit rester hors du bundle serveur pour fonctionner.
  serverExternalPackages: ["tesseract.js"],
};

export default nextConfig;
