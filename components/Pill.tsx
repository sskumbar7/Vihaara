import type { ReactNode } from "react";

export type PillTone = "neutral" | "teal" | "drive" | "open" | "closed" | "tag";

export function Pill({ tone = "neutral", children }: { tone?: PillTone; children: ReactNode }) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}
