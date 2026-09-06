"use client";

import { useState } from "react";
import { subTypeIcon } from "./SubTypeIcon";

/** Per-sub-type gradient pairs, all drawn from the brand ramp so the tile reads
 *  as a crafted mark rather than a flat pastel square (LANDING.md §2.1). */
export const TILE_MARK: Record<string, { from: string; via: string; to: string; ink: string }> = {
  // hue-separated so a shortlist reads as distinct venues at a glance
  cafe:             { from: "#3E9E84", via: "#1B6D5A", to: "#0B3A31", ink: "#EAF7F1" },
  pub_microbrewery: { from: "#E7AA4A", via: "#B4761C", to: "#5E3B06", ink: "#2A1A04" },
  restobar:         { from: "#CE6A40", via: "#983F24", to: "#411A0F", ink: "#FCEDE5" },
  rooftop_lounge:   { from: "#4B8FAD", via: "#22607C", to: "#0B2C3A", ink: "#E6F3F9" },
  date_spot:        { from: "#C96A89", via: "#8E3552", to: "#3C1523", ink: "#FCE7EE" },
  live_music:       { from: "#7A6DCE", via: "#4B3F96", to: "#1E1A44", ink: "#EDEAFB" },
};

/** Small deterministic hash so every venue's arcs sit differently while the
 *  family stays consistent. Same id always renders the same mark. */
function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 997;
  return h;
}

export function Tile({
  subType,
  size = 56,
  seed = "",
  photo,
  alt = "",
}: {
  subType: string;
  size?: number;
  /** Venue id — varies the arc geometry deterministically. */
  seed?: string;
  /** Optional real photo (landing may use photography; the app stays illustrative). */
  photo?: string;
  alt?: string;
}) {
  const [broken, setBroken] = useState(false);
  const Icon = subTypeIcon(subType);
  const m = TILE_MARK[subType] ?? TILE_MARK.cafe;
  const showPhoto = Boolean(photo) && !broken;
  const h = hash(seed || subType);
  const arc = size * 1.5;

  return (
    <div
      className="tile"
      aria-hidden={alt ? undefined : true}
      style={{
        width: size,
        height: size,
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(152deg, ${m.from} 0%, ${m.via} 46%, ${m.to} 100%)`,
        color: m.ink,
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,.10), inset 0 1px 0 rgba(255,255,255,.22)",
      }}
    >
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={alt}
          onError={() => setBroken(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <>
          {/* two thin arcs — the mark's geometry, seeded per venue */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              width: arc, height: arc, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.16)",
              left: -arc * (0.28 + (h % 13) / 100),
              top: arc * (0.24 + (h % 7) / 100),
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              width: arc * 0.72, height: arc * 0.72, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.10)",
              right: -arc * (0.2 + (h % 11) / 100),
              bottom: -arc * 0.16,
            }}
          />
          {/* light source, top-left */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(70% 60% at 22% 14%, rgba(255,255,255,.26) 0%, transparent 62%)",
            }}
          />
          <Icon
            size={Math.round(size * 0.38)}
            strokeWidth={1.75}
            style={{
              position: "relative",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,.35))",
            }}
          />
        </>
      )}
    </div>
  );
}
