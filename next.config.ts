import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: ["carnation-budget-jockey.ngrok-free.dev"],
};

export default nextConfig;
