/** Freshness is visible on every card (CLAUDE.md §3.7, spec.md §7).
 *  Older than 90 days flips to the "Verify before you go" state. */

export const STALE_AFTER_DAYS = 90;

export interface Freshness {
  label: string;
  stale: boolean;
  days: number;
}

export function freshness(dateStr: string, now: Date): Freshness {
  const d = new Date(dateStr + "T00:00:00");
  const days = Math.floor((now.getTime() - d.getTime()) / 86400000);
  const stale = days > STALE_AFTER_DAYS;
  let label: string;
  if (days <= 0) label = "Verified today";
  else if (days === 1) label = "Verified yesterday";
  else if (days <= 13) label = `Verified ${days} days ago`;
  else if (days <= STALE_AFTER_DAYS) {
    const weeks = Math.round(days / 7);
    label = `Verified ${weeks} week${weeks === 1 ? "" : "s"} ago`;
  } else {
    // absolute month/year is reserved for entries past the staleness cutoff
    label = `Verified ${d.toLocaleString("en-IN", { month: "short", year: "numeric" })}`;
  }
  return { label, stale, days };
}
