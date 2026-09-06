import { EmailCapture } from "@/components/EmailCapture";
import { Cta } from "./Cta";
import { Reveal } from "./Reveal";

export function CtaBand() {
  return (
    <section className="l-section l-cta l-seam" id="waitlist">
      <span className="l-cta-mark" aria-hidden>vihaara</span>
      <Reveal className="l-inner" style={{ maxWidth: 760, textAlign: "center" }}>
        <h2 className="l-h2" style={{ color: "#fff" }}>
          Vihaara is launching soon in Bangalore.
        </h2>
        <p className="l-lede" style={{ margin: "var(--s5) auto 0", color: "rgba(255,255,255,.82)" }}>
          Cafés, breweries, rooftops and date spots across the city — three to five of
          them, ranked by how far they are from you.
        </p>

        {/* the one primary action, on its own */}
        <div style={{ marginTop: "var(--s8)" }}>
          <Cta href="/discover" size="lg">Find a spot tonight</Cta>
          <p className="t-caption" style={{ marginTop: "var(--s3)", color: "rgba(255,255,255,.72)" }}>
            No account needed · works on any phone
          </p>
        </div>

        {/* quieter, clearly separated secondary row */}
        <div className="l-cta-mail">
          <p className="l-cta-mail-label">Not tonight? Get launch updates.</p>
          <div style={{ width: "min(440px,100%)", margin: "0 auto", textAlign: "left" }}>
            <EmailCapture source="cta_band" tone="dark" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
