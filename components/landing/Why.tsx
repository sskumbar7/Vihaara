import { BadgeCheck, Beer, Navigation, Scissors } from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow, Section } from "./Section";

export function Why() {
  return (
    <Section tone="light" id="why">
      <Reveal>
        <Eyebrow tone="teal">Why vihaara</Eyebrow>
        <h2 className="l-h2 c-ink" style={{ marginTop: "var(--s5)", maxWidth: "19ch" }}>
          Built around the two things you actually ask.
        </h2>
      </Reveal>

      {/* lead differentiator carries the weight — the other two share a lighter row */}
      <Reveal className="l-bezel l-why-shell"><article className="l-core l-why-lead">
        <div style={{ minWidth: 0 }}>
          <span
            className="l-why-icon"
            aria-hidden
            style={{ color: "var(--amber-ink)", background: "#FBF0DC", borderColor: "var(--amber-soft-2)" }}
          >
            <Navigation size={19} strokeWidth={1.5} />
          </span>
          <h3 className="l-h2 c-ink" style={{ marginTop: "var(--s4)", fontSize: 28 }}>
            Distance is the answer, not a filter
          </h3>
          <p className="l-body c-soft" style={{ marginTop: "var(--s4)", maxWidth: "46ch" }}>
            Every other app makes you guess how far something is, then hides it behind
            a radius slider. We put the minutes on the card and sort the whole list by
            them. On a Tuesday in Bangalore, that&rsquo;s the whole decision.
          </p>
        </div>

        {/* a fragment of the real card, so the claim is shown not stated */}
        <div className="l-why-demo" aria-hidden>
          <div className="flex items-center" style={{ gap: "var(--s3)" }}>
            <span
              className="tile"
              style={{
                width: 40, height: 40,
                background: "linear-gradient(148deg,#B07424,#5C3608)",
                color: "#FDF0DC",
              }}
            >
              <Beer size={17} strokeWidth={1.5} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="t-title c-ink">Toit Brewpub</div>
              <div className="t-caption c-soft" style={{ marginTop: 2 }}>Microbrewery · Indiranagar</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--s2)", marginTop: "var(--s3)" }}>
            <span className="pill pill--drive" style={{ fontSize: 13, padding: "6px 12px" }}>
              <Navigation size={13} strokeWidth={1.5} /> 12 min from you
            </span>
            <span className="pill pill--neutral">₹₹ · ₹1,800 for two</span>
          </div>
          <p className="t-caption c-soft" style={{ marginTop: "var(--s3)" }}>
            on every single card
          </p>
        </div>
      </article></Reveal>

      <div className="l-why-pair">
        <Reveal className="l-bezel l-bezel--sm"><article className="l-core l-core--surface l-why-card">
          <span className="l-why-icon" aria-hidden><BadgeCheck size={18} strokeWidth={1.5} /></span>
          <h3 className="l-h3 c-ink" style={{ marginTop: "var(--s4)" }}>
            We check, so you don&rsquo;t have to
          </h3>
          <p className="l-body c-soft" style={{ marginTop: "var(--s3)" }}>
            Every spot carries the date a human last verified it. Older than 90 days and
            the card says so, out loud, instead of quietly sending you to a closed bar.
          </p>
        </article></Reveal>

        <Reveal className="l-bezel l-bezel--sm" delay={110}><article className="l-core l-core--surface l-why-card">
          <span className="l-why-icon" aria-hidden><Scissors size={18} strokeWidth={1.5} /></span>
          <h3 className="l-h3 c-ink" style={{ marginTop: "var(--s4)" }}>
            40 great spots beat 4,000 mediocre ones
          </h3>
          <p className="l-body c-soft" style={{ marginTop: "var(--s3)" }}>
            A curated Bangalore list, not a scrape. Nothing gets in because it paid to,
            and nothing stays in because nobody looked.
          </p>
        </article></Reveal>
      </div>
    </Section>
  );
}
