import { CtaBand } from "@/components/landing/CtaBand";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Problem } from "@/components/landing/Problem";
import { StatBar } from "@/components/landing/StatBar";
import { Taste } from "@/components/landing/Taste";
import { Why } from "@/components/landing/Why";
import { ACTIVITIES } from "@/lib/activities";
import { AREAS } from "@/lib/driveTime";
import { buildShortlist } from "@/lib/filterRank";
import { intentsFor } from "@/lib/intents";
import type { StartPoint } from "@/lib/types";

/** The landing renders its preview from a fixed demo anchor so the signature
 *  amber "X min from you" pill is visible before the user sets anything. */
const DEMO_START: StartPoint = {
  method: "area",
  area: AREAS[1].name,
  lat: AREAS[1].lat,
  lng: AREAS[1].lng,
};

export default function LandingPage() {
  const now = new Date();
  const friends = intentsFor().quickPicks[1];
  const preview = buildShortlist(ACTIVITIES, friends.filters, false, DEMO_START, now)
    .list.slice(0, 3);

  return (
    <div className="l-page">
      <span className="l-grain-plane" aria-hidden />
      <Hero preview={preview} start={DEMO_START} now={now} />
      <StatBar />
      <Problem />
      <HowItWorks />
      <Why />
      <Taste start={DEMO_START} now={now} />
      <CtaBand />
      <Footer />
    </div>
  );
}
