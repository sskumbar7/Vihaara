import type { NextConfig } from "next";

/** GitHub Pages serves a project site from /<repo>/, so every asset and route
 *  needs that prefix. Set NEXT_PUBLIC_BASE_PATH in CI; local dev stays at "/". */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // keep the hand-written CLAUDE.md build rules free of generated content
  agentRules: false,

  // static export — the whole app is client-side and localStorage-backed,
  // so there is nothing for a server to do (CLAUDE.md §2: no backend)
  output: "export",
  basePath,
  // Pages resolves /discover to /discover/index.html
  trailingSlash: true,
  // no server means no on-demand image optimisation
  images: { unoptimized: true },
};

export default nextConfig;
