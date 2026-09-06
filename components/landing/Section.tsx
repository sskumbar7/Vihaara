import type { ReactNode } from "react";

/** Full-width band, inner content capped at ~1120px (DESIGN.md §4).
 *  Every band carries grain; dark bands add a horizon seam at the top edge. */
export function Section({
  tone = "light",
  id,
  className = "",
  style,
  children,
}: {
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`l-section ${tone === "dark" ? "l-dark l-seam" : "l-light"} ${className}`}
      style={style}
    >
      <div className="l-inner">{children}</div>
    </section>
  );
}

export function Eyebrow({
  tone = "amber",
  children,
}: {
  tone?: "amber" | "teal";
  children: ReactNode;
}) {
  return <p className={`l-eyebrow l-eyebrow--${tone}`}>{children}</p>;
}
