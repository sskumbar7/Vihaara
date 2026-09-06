import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow, Section } from "./Section";

const WITHOUT = [
  "Open Instagram. Open Zomato. Open the group chat.",
  "Scroll 200 listings written by people who've never been.",
  "Argue about whether it's too far. Nobody actually knows.",
  "Give up at 8:40 and go to the same place as last time.",
];

const WITH = [
  "Tell us the vibe — or answer three quick questions.",
  "Get three to five spots, ranked by minutes from you.",
  "Each one hand-checked, with the date it was verified.",
  "Tap directions. You're out the door.",
];

export function Problem() {
  return (
    <Section tone="light" id="problem">
      <Reveal>
        <Eyebrow tone="teal">The Tuesday problem</Eyebrow>
        <h2 className="l-h2 c-ink" style={{ marginTop: "var(--s5)", maxWidth: "17ch" }}>
          Forty minutes of research, and you still end up somewhere familiar.
        </h2>
      </Reveal>

      <div className="l-vs">
        <Reveal className="l-bezel">
        <div className="l-core l-vs-panel l-vs-panel--without">
          <span className="l-ghost l-ghost--ink l-vs-ghost" aria-hidden>40</span>
          <p className="t-label c-soft" style={{ textTransform: "uppercase", letterSpacing: ".14em" }}>
            Without vihaara
          </p>
          <p className="l-h3 c-ink" style={{ marginTop: "var(--s3)", fontSize: 24 }}>
            40 minutes researching
          </p>
          <ul className="l-vs-list" style={{ marginTop: "var(--s6)" }}>
            {WITHOUT.map((line) => (
              <li key={line}>
                <span className="l-vs-mark l-vs-mark--x" aria-hidden><X size={12} strokeWidth={1.75} /></span>
                <span className="l-body c-soft">{line}</span>
              </li>
            ))}
          </ul>
        </div>
        </Reveal>

        <div className="l-vs-hinge" aria-hidden>
          <span className="l-vs-hinge-chip">
            <ArrowRight size={13} strokeWidth={1.5} /> 2 min
          </span>
        </div>

        <Reveal className="l-bezel l-bezel--dark" delay={120}>
        <div className="l-core l-vs-panel l-vs-panel--with">
          <span
            className="l-ghost l-vs-ghost"
            aria-hidden
            style={{ WebkitTextStrokeColor: "rgba(199,125,40,.32)" }}
          >
            2
          </span>
          <p className="t-label" style={{ textTransform: "uppercase", letterSpacing: ".14em", color: "var(--amber)" }}>
            With vihaara
          </p>
          <p className="l-h3" style={{ marginTop: "var(--s3)", fontSize: 24, color: "var(--l-on-dark)" }}>
            2 minutes deciding
          </p>
          <ul className="l-vs-list" style={{ marginTop: "var(--s6)" }}>
            {WITH.map((line) => (
              <li key={line}>
                <span className="l-vs-mark l-vs-mark--check" aria-hidden><Check size={12} strokeWidth={1.75} /></span>
                <span className="l-body l-soft-dark">{line}</span>
              </li>
            ))}
          </ul>
        </div>
        </Reveal>
      </div>
    </Section>
  );
}
