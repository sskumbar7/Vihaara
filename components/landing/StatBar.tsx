import { Reveal } from "./Reveal";

/** Two levels per stat: the figure, and what it measures. The consequence is
 *  argued elsewhere on the page — repeating it here made the band top-heavy. */
const STATS: { prefix?: string; value: string; unit: string; label: string }[] = [
  {
    prefix: "<",
    value: "2",
    unit: "min",
    label: "Open to shortlist",
  },
  {
    value: "3–5",
    unit: "spots",
    label: "Every shortlist",
  },
  {
    value: "100",
    unit: "%",
    label: "Hand-verified",
  },
];

export function StatBar() {
  return (
    <section className="l-dark l-seam l-statband" aria-label="Vihaara in numbers">
      <div className="l-inner l-stat-row">
        {STATS.map((s, i) => (
          <Reveal key={s.label} className="l-stat" delay={i * 90}>
            <p className="l-stat-figure">
              {"prefix" in s && s.prefix ? (
                <span className="l-stat-prefix">{s.prefix}</span>
              ) : null}
              <span className="l-numeral">{s.value}</span>
              <span className="l-stat-unit">{s.unit}</span>
            </p>
            <p className="l-stat-label">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
