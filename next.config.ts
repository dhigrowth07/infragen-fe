import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker: bundles a self-contained server.js
  // so the runner stage doesn't need node_modules at runtime.
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
