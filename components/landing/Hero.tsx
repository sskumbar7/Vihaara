import { Navigation } from "lucide-react";
import { Card } from "@/components/Card";
import { CategoryRail } from "./CategoryRail";
import { Cta } from "./Cta";
import { Nav } from "./Nav";
import { Eyebrow } from "./Section";
import type { Hangout, StartPoint } from "@/lib/types";

export function Hero({
  preview,
  start,
  now,
}: {
  preview: Hangout[];
  start: StartPoint;
  now: Date;
}) {
  return (
    <section className="l-dark l-grid-bg" style={{ position: "relative", overflow: "clip" }}>
      <span
        className="l-glow"
        aria-hidden
        style={{ width: 620, height: 620, bottom: -300, left: -180, background: "rgba(15,92,78,.5)" }}
      />

      <Nav />

      <div className="l-section" style={{ paddingTop: "calc(var(--nav-h) + var(--s8))" }}>
        <div className="l-inner l-hero-grid">
          <div style={{ gridArea: "copy" }}>
            <div className="l-seq" style={{ ["--i" as string]: 0 }}>
              <Eyebrow>Bangalore · Tonight</Eyebrow>
            </div>
            <h1 className="l-display l-seq" style={{ marginTop: "var(--s5)", ["--i" as string]: 1 }}>
              Decide where to go out in{" "}
              <span style={{ color: "var(--amber)" }}>2 minutes</span>.
            </h1>
            <p className="l-lede l-soft-dark l-seq" style={{ marginTop: "var(--s6)", ["--i" as string]: 2 }}>
              A short, hand-verified shortlist — ranked by how far each spot is
              from you right now.
            </p>

            <div className="l-seq" style={{ ["--i" as string]: 3 }}>
              <CategoryRail />
            </div>

            <div className="l-seq" style={{ marginTop: "var(--s8)", ["--i" as string]: 5 }}>
              <Cta href="/discover" size="lg">Find a spot tonight</Cta>
              <p className="t-caption l-soft-dark" style={{ marginTop: "var(--s3)" }}>
                No account. Works on any phone.
              </p>
            </div>
          </div>

          {/* product preview — the hero object, in a machined enclosure */}
          <div
            className="l-seq"
            style={{ position: "relative", gridArea: "preview", ["--i" as string]: 3 }}
          >
            <span
              className="l-glow"
              aria-hidden
              style={{
                width: "88%", height: "70%", left: "6%", top: "18%",
                background: "rgba(199,125,40,.20)",
              }}
            />
            <div className="l-float">
              <div className="l-preview-stack">
                <div className="l-bezel l-bezel--dark l-preview">
                  <div className="l-core l-core--paper" style={{ padding: "var(--s4)" }}>
                    <div className="l-preview-head">
                      <span className="t-label c-ink">Tonight&rsquo;s shortlist</span>
                      <span
                        className="t-caption c-soft"
                        style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
                      >
                        <Navigation size={11} strokeWidth={1.5} aria-hidden /> from {start.area}
                      </span>
                    </div>
                    <div className="flex flex-col" style={{ gap: "var(--s3)", marginTop: "var(--s3)" }}>
                      {preview.map((v, i) => (
                        <div key={v.id} className="l-preview-row">
                          <span className="l-rank-mark" aria-hidden>{i + 1}</span>
                          <Card venue={v} start={start} now={now} rank={i} />
                        </div>
                      ))}
                    </div>
                    <p className="t-caption c-soft" style={{ marginTop: "var(--s4)", textAlign: "center" }}>
                      Three good options, not fifty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
