import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow Google profile photos and Maps static assets used by Places API
    domains: ["lh3.googleusercontent.com", "maps.googleapis.com", "maps.gstatic.com"],
  },
};

export default nextConfig;
