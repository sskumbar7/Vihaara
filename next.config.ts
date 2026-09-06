import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // keep the hand-written CLAUDE.md build rules free of generated content
  agentRules: false,
};

export default nextConfig;
