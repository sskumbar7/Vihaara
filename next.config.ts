import type { NextConfig } from "next";

/** Two hosts, one source tree.
 *
 *  Vercel (the target in CLAUDE.md §2) gets a normal Next build: server
 *  rendering stays available, and /spot/[id] can serve ids outside the seed
 *  set instead of hard-404ing.
 *
 *  GitHub Pages is static-only, so its workflow sets STATIC_EXPORT=1 and
 *  NEXT_PUBLIC_BASE_PATH=/<repo> to emit a prefixed static bundle. */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // keep the hand-written CLAUDE.md build rules free of generated content
  agentRules: false,

  // consistent URLs across both hosts
  trailingSlash: true,
  basePath,

  ...(isStaticExport
    ? {
        output: "export" as const,
        // no server means no on-demand image optimisation
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
