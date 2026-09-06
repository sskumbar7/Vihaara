import { BadgeCheck } from "lucide-react";
import { freshness } from "@/lib/freshness";

/** The teal trust badge. Older than 90 days flips to the rust stale state —
 *  a differentiator, not an error (spec.md §7). */
export function Verified({ dateStr, now }: { dateStr: string; now: Date }) {
  const { label, stale } = freshness(dateStr, now);
  return (
    <span
      className={`t-caption ${stale ? "c-rust" : "c-teal"}`}
      style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
      suppressHydrationWarning
    >
      <BadgeCheck size={13} aria-hidden />
      {stale ? "Verify before you go" : label}
    </span>
  );
}
