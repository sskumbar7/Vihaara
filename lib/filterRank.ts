import { rankDistanceKm } from "./driveTime";
import type { Axes } from "./intents";
import { isOpenNow } from "./openNow";
import type { Activity, StartPoint } from "./types";

/** Category-agnostic filter + rank engine (spec.md §4.1 seam 3, §6).
 *  Hard filters: occasion_tags, vibe_tags, price_tier, sub_type, open_now.
 *  Drive-time ranks and displays — it is NEVER a hard filter (CLAUDE.md §3.4). */

export const SHORTLIST_MIN = 3;
export const SHORTLIST_MAX = 5;

export interface ShortlistResult<T> {
  list: T[];
  /** Set when the relaxation ladder fired, so the UI can say so. */
  note: string | null;
  /** True when "Open now" alone emptied the result. */
  emptyOpen: boolean;
  relaxed: boolean;
}

function passes<T extends Activity<unknown>>(
  v: T, ax: Axes, openOnly: boolean, now: Date,
): boolean {
  return (
    (!ax.occasion || v.occasion_tags.includes(ax.occasion)) &&
    (!ax.vibe || v.vibe_tags.includes(ax.vibe)) &&
    (!ax.price_tier || v.price_tier === ax.price_tier) &&
    (!ax.sub_type || v.sub_type === ax.sub_type) &&
    (!openOnly || isOpenNow(v.timings, now))
  );
}

/** Drive-time ascending, then quality_score descending. */
export function rank<T extends Activity<unknown>>(list: T[], start: StartPoint | null): T[] {
  return [...list].sort((a, b) => {
    const da = rankDistanceKm(start, a);
    const db = rankDistanceKm(start, b);
    if (da !== db) return da - db;
    return b.quality_score - a.quality_score;
  });
}

/** Relaxation ladder: drop price → drop vibe → nearest good.
 *  Never returns an empty shortlist unless "Open now" is the cause (CLAUDE.md §3.5). */
export function buildShortlist<T extends Activity<unknown>>(
  pool: T[], axesIn: Axes, openOnly: boolean, start: StartPoint | null, now: Date,
): ShortlistResult<T> {
  let ax: Axes = { ...axesIn };
  let res = pool.filter((v) => passes(v, ax, openOnly, now));
  let note: string | null = null;

  if (res.length < SHORTLIST_MIN && ax.price_tier) {
    ax = { ...ax, price_tier: null };
    res = pool.filter((v) => passes(v, ax, openOnly, now));
    note = "Widened your search to show more.";
  }
  if (res.length < SHORTLIST_MIN && ax.vibe) {
    ax = { ...ax, vibe: null };
    res = pool.filter((v) => passes(v, ax, openOnly, now));
    note = "Widened your search to show more.";
  }
  if (res.length < SHORTLIST_MIN && ax.occasion) {
    ax = { ...ax, occasion: null };
    res = pool.filter((v) => passes(v, ax, openOnly, now));
    note = "Nothing matched exactly — here are the nearest good spots.";
  }

  return {
    list: rank(res, start).slice(0, SHORTLIST_MAX),
    note,
    emptyOpen: res.length === 0 && openOnly,
    relaxed: note !== null,
  };
}
