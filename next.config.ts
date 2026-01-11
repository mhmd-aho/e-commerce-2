import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enchanted-frog-549.convex.cloud",
        port: "",
      },
    ],
  },
};

export default nextConfig;
