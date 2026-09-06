import { ArrowRight, ListChecks, Navigation, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Section";

/** Each step carries a miniature of the real screen it describes, so the
 *  section shows the product instead of describing it. */
function PickVibeMini() {
  const chips = ["Date night", "Friends night out", "Chill café", "Rooftop", "Live music"];
  return (
    <div className="l-mini l-mini-panel" aria-hidden>
      <p className="l-mini-label">Quick picks</p>
      <div className="l-mini-chips" style={{ marginTop: "var(--s3)" }}>
        {chips.map((c, i) => (
          <span key={c} className={`l-mini-chip${i === 1 ? " l-mini-chip--on" : ""}`}>{c}</span>
        ))}
      </div>
      <div className="l-mini-divider" />
      <div className="l-mini-alt">
        <span>Not sure? Answer three questions</span>
        <ArrowRight size={13} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function ShortlistMini() {
  const rows = [
    { w: "58%", mins: "4 min" },
    { w: "72%", mins: "9 min" },
    { w: "46%", mins: "12 min" },
  ];
  return (
    <div className="l-mini l-mini-rows" aria-hidden>
      {rows.map((r) => (
        <div key={r.mins} className="l-mini-row">
          <span className="l-mini-bar" style={{ width: r.w, flex: "0 1 auto" }} />
          <span style={{ flex: 1 }} />
          <span className="l-mini-pill">{r.mins}</span>
        </div>
      ))}
    </div>
  );
}

function RouteMini() {
  return (
    <div className="l-mini l-mini-route" aria-hidden>
      <span
        style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--amber)", flex: "none",
        }}
      />
      <span className="l-mini-route-line" />
      <Navigation size={14} strokeWidth={1.5} style={{ color: "var(--amber)" }} />
      <span>Directions</span>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="l-section l-dark l-seam l-grid-bg" id="how">
      <div className="l-inner">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="l-h2" style={{ marginTop: "var(--s5)", maxWidth: "15ch" }}>
            Three steps, and one of them is leaving the house.
          </h2>
        </Reveal>

        <div className="l-steps">
          <Reveal className="l-bezel l-bezel--dark"><article className="l-core l-core--dark l-step l-step--lead">
            <span className="l-ghost" aria-hidden>01</span>
            <span className="l-step-icon" aria-hidden><Sparkles size={19} strokeWidth={1.5} /></span>
            <h3 className="l-h3" style={{ marginTop: "var(--s4)", color: "var(--l-on-dark)" }}>
              Pick your vibe
            </h3>
            <p className="l-body l-soft-dark" style={{ marginTop: "var(--s3)", maxWidth: "34ch" }}>
              Tap one chip — date night, friends, rooftop, live music — or let us ask
              three quick questions. No filters to configure.
            </p>
            <PickVibeMini />
          </article></Reveal>

          <div className="l-steps-stack">
            <Reveal className="l-bezel l-bezel--dark l-bezel--sm" delay={100}><article className="l-core l-core--dark l-step">
              <span className="l-ghost l-step-n-sm" aria-hidden>02</span>
              <span className="l-step-icon" aria-hidden><ListChecks size={18} strokeWidth={1.5} /></span>
              <h3 className="l-h3" style={{ marginTop: "var(--s3)", color: "var(--l-on-dark)" }}>
                Get your shortlist
              </h3>
              <p className="l-body l-soft-dark" style={{ marginTop: "var(--s2)", maxWidth: "38ch" }}>
                Three to five spots, ranked by minutes from you, each with the date we
                last checked it.
              </p>
              <ShortlistMini />
            </article></Reveal>

            <Reveal className="l-bezel l-bezel--dark l-bezel--sm" delay={200}><article className="l-core l-core--dark l-step">
              <span className="l-ghost l-step-n-sm" aria-hidden>03</span>
              <span className="l-step-icon" aria-hidden><Navigation size={18} strokeWidth={1.5} /></span>
              <h3 className="l-h3" style={{ marginTop: "var(--s3)", color: "var(--l-on-dark)" }}>
                Go
              </h3>
              <p className="l-body l-soft-dark" style={{ marginTop: "var(--s2)", maxWidth: "38ch" }}>
                Tap directions and leave. Save the ones you want for next time.
              </p>
              <RouteMini />
            </article></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
