"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { DrivePill } from "./DrivePill";
import { Tile } from "./Tile";
import { Verified } from "./Verified";
import { driveTime } from "@/lib/driveTime";
import { PRICE_LABEL, SUB_TYPE_LABEL, tagLabel } from "@/lib/intents";
import type { Hangout, StartPoint } from "@/lib/types";

/** Rank accent colours for the coloured left edge on a ranked shortlist. */
const RANK_COLOR = ["var(--amber)", "var(--teal)", "var(--rust)"];

export interface CardProps {
  venue: Hangout;
  start: StartPoint | null;
  now: Date;
  /** 0-based position in a shortlist; draws the coloured rank edge. */
  rank?: number;
  saved?: boolean;
  onSave?: (venue: Hangout) => void;
  /** Fires before navigation — used for `detail_opened`. */
  onOpen?: (venue: Hangout) => void;
  /** Landing only: a real photo in the tile. The app stays illustrative. */
  photo?: string;
  elevated?: boolean;
}

/** The product's core object (DESIGN.md §7). Shared by the landing and the app —
 *  the amber drive-time pill and teal verified badge look identical in both. */
export function Card({
  venue, start, now, rank, saved = false, onSave, onOpen, photo, elevated,
}: CardProps) {
  const mins = driveTime(start, venue);
  const subLabel = SUB_TYPE_LABEL[venue.sub_type] ?? venue.sub_type;
  const tags = [...venue.vibe_tags, ...venue.occasion_tags].slice(0, 3);
  const ranked = typeof rank === "number";

  return (
    <article
      className={`card${ranked ? " l-ranked" : ""}${elevated ? " card--elevated" : ""}`}
      style={ranked ? ({ ["--rank" as string]: RANK_COLOR[rank % RANK_COLOR.length] }) : undefined}
    >
      <div className="flex" style={{ gap: "var(--s3)" }}>
        <Tile subType={venue.sub_type} size={56} seed={venue.id} photo={photo} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between" style={{ gap: "var(--s2)" }}>
            <Link
              href={`/spot/${venue.id}`}
              className="card-link"
              onClick={() => onOpen?.(venue)}
            >
              <span className="t-title c-ink block truncate">{venue.name}</span>
              <span className="t-caption c-soft block" style={{ marginTop: 2 }}>
                {subLabel} · {venue.area}
              </span>
            </Link>

            {onSave ? (
              <button
                type="button"
                className={`heart ${saved ? "heart--on" : ""}`}
                aria-label={saved ? `Remove ${venue.name} from saved` : `Save ${venue.name}`}
                aria-pressed={saved}
                style={{ position: "relative", zIndex: 1, flex: "none" }}
                onClick={() => onSave(venue)}
              >
                <Heart size={15} fill={saved ? "#fff" : "none"} aria-hidden />
              </button>
            ) : null}
          </div>

          {/* pills on a single 8pt-aligned rhythm */}
          <div className="flex flex-wrap items-center" style={{ gap: "var(--s2)", marginTop: "var(--s3)" }}>
            <DrivePill mins={mins} area={venue.area} />
            <span className="pill pill--neutral">
              {PRICE_LABEL[venue.price_tier]} · ₹{venue.details.cost_for_two.toLocaleString("en-IN")} for two
            </span>
          </div>

          <div className="flex flex-wrap items-center" style={{ gap: "var(--s2)", marginTop: "var(--s2)" }}>
            {tags.map((t) => (
              <span key={t} className="pill pill--tag">{tagLabel(t)}</span>
            ))}
          </div>

          <div style={{ marginTop: "var(--s2)" }}>
            <Verified dateStr={venue.last_verified_date} now={now} />
          </div>
        </div>
      </div>
    </article>
  );
}
