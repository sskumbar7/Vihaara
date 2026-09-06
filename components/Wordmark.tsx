import { MapPin } from "lucide-react";

/** Placeholder wordmark (DESIGN.md §11): lowercase "vihaara" + the teal pin. */
export function Wordmark({
  size = 20,
  tone = "teal",
}: {
  size?: number;
  tone?: "teal" | "onDark";
}) {
  const color = tone === "teal" ? "var(--teal)" : "var(--l-on-dark)";
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: 6, color }}
      aria-label="vihaara"
    >
      <MapPin size={Math.round(size * 0.85)} strokeWidth={2.25} aria-hidden />
      <span
        style={{
          font: `800 ${size}px/1 var(--display)`,
          letterSpacing: "-.02em",
          textTransform: "lowercase",
        }}
      >
        vihaara
      </span>
    </span>
  );
}
