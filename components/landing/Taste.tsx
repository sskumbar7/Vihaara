"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Navigation } from "lucide-react";
import { Card } from "@/components/Card";
import { Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { ACTIVITIES } from "@/lib/activities";
import { buildShortlist } from "@/lib/filterRank";
import { intentsFor } from "@/lib/intents";
import { track } from "@/lib/track";
import type { StartPoint } from "@/lib/types";

/** The real filter/rank engine, running on the real seed data — so the sample
 *  shortlist is the product, not a mockup (LANDING.md §2.2). */
export function Taste({ start, now }: { start: StartPoint; now: Date }) {
  const { quickPicks } = intentsFor();
  const [active, setActive] = useState(quickPicks[1].key); // "Friends night out"

  const pick = quickPicks.find((q) => q.key === active) ?? quickPicks[0];
  /** Capped to 4 so the shortlist stays balanced against the pinned copy column. */
  const TASTE_MAX = 4;
  const { list, note } = useMemo(() => {
    const result = buildShortlist(ACTIVITIES, pick.filters, false, start, now);
    return { ...result, list: result.list.slice(0, TASTE_MAX) };
  }, [pick, start, now]);

  return (
    <section className="l-section l-light" id="taste">
      <div className="l-inner l-taste">
        <div className="l-taste-copy">
          <Reveal>
          <Eyebrow tone="teal">A taste</Eyebrow>
          <h2 className="l-h2 c-ink" style={{ marginTop: "var(--s5)", maxWidth: "16ch" }}>
            This is what you actually get.
          </h2>
          <p className="l-lede c-soft" style={{ marginTop: "var(--s5)" }}>
            Real spots, real ranking. Pick a vibe and watch the shortlist reorder —
            nearest first, each card carrying the date we last checked it.
          </p>

          <div className="l-picker">
            <p className="l-picker-label" id="taste-picker">Pick a vibe</p>
            <div
              className="flex flex-wrap"
              style={{ gap: "var(--s2)", marginTop: "var(--s3)" }}
              role="group"
              aria-labelledby="taste-picker"
            >
              {quickPicks.map((q) => (
                <button
                  key={q.key}
                  type="button"
                  className="chip t-label"
                  aria-pressed={q.key === active}
                  aria-controls="taste-shortlist"
                  onClick={() => {
                    setActive(q.key);
                    track("landing_cta_clicked", { target: "taste_chip", key: q.key });
                  }}
                >
                  {q.label}
                </button>
              ))}
            </div>
            {/* the result of the control above, stated in the control's own language */}
            <p className="l-picker-result">
              <span className="l-picker-arrow" aria-hidden />
              Showing
              <span className="l-picker-echo">{pick.label}</span>
            </p>
            <p className="l-picker-count">{list.length} spots, nearest first</p>
          </div>

          {/* the two facts every card is built around */}
          <div className="l-legend">
            <div className="l-legend-row">
              <span className="pill pill--drive">
                <Navigation size={12} strokeWidth={1.5} aria-hidden /> 9 min from you
              </span>
              <p className="l-body c-soft">
                Real drive time from where you are, on every card — and the order of
                the list.
              </p>
            </div>
            <div className="l-legend-row">
              <span
                className="t-caption c-rust"
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <BadgeCheck size={13} strokeWidth={1.5} aria-hidden /> Verify before you go
              </span>
              <p className="l-body c-soft">
                What a stale card looks like. Past 90 days we say so rather than
                quietly hoping.
              </p>
            </div>
          </div>
          </Reveal>
        </div>

        <Reveal className="l-bezel l-taste-shell" delay={120}><div className="l-core l-core--paper l-taste-col">
          <div className="l-preview-head" style={{ marginBottom: "var(--s3)" }}>
            <span className="l-picker-echo l-picker-echo--head">{pick.label}</span>
            <span
              className="t-caption c-soft"
              style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              <Navigation size={11} strokeWidth={1.5} aria-hidden /> from {start.area}
            </span>
          </div>

          <div
            key={pick.key}
            id="taste-shortlist"
            className="flex flex-col l-taste-swap"
            style={{ gap: "var(--s3)" }}
            aria-live="polite"
          >
            {list.map((v, i) => (
              <Card key={v.id} venue={v} start={start} now={now} rank={i} />
            ))}
          </div>

          {note ? (
            <p className="t-caption c-soft" style={{ marginTop: "var(--s4)" }}>{note}</p>
          ) : null}
        </div></Reveal>
      </div>
    </section>
  );
}
