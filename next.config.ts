import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'travelblog.skillbox.cc',
        port: '',
        pathname: '/images/**',
      },
    ],
  }
};

export default nextConfig;
