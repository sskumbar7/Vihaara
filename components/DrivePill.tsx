import { MapPin, Navigation } from "lucide-react";

/** The signature amber "X min from you" pill (DESIGN.md §2). When no start
 *  point is set the number is dropped, not faked (CLAUDE.md §3.6). */
export function DrivePill({ mins, area }: { mins: number | null; area: string }) {
  if (mins == null) {
    return (
      <span className="pill pill--teal">
        <MapPin size={12} aria-hidden /> in {area}
      </span>
    );
  }
  return (
    <span className="pill pill--drive">
      <Navigation size={12} aria-hidden /> {mins} min from you
    </span>
  );
}
