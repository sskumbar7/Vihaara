import type { GeoPoint, StartPoint } from "./types";

/** Bangalore city centre — the anchor used when no start point is set (spec.md §5.0). */
export const CITY_CENTRE: GeoPoint = { lat: 12.9750, lng: 77.6050 };

/** Straight-line km between two points. */
export function haversine(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const r = (d: number) => (d * Math.PI) / 180;
  const dLat = r(b.lat - a.lat);
  const dLng = r(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

/** Computed, never stored, never live (CLAUDE.md §3.3): straight-line km x a
 *  traffic fudge factor. Returns null when the start point is unset, so the UI
 *  can soften the label instead of inventing a number. */
export function driveTime(start: StartPoint | null, to: GeoPoint): number | null {
  if (!start) return null;
  return Math.max(4, Math.round(haversine(start, to) * 2.6));
}

/** Distance used for ranking — always defined, falling back to the city centre
 *  so an unset start point never gates the ordering. */
export function rankDistanceKm(start: StartPoint | null, to: GeoPoint): number {
  return haversine(start ?? CITY_CENTRE, to);
}

/** The eight seed areas offered in the start-point picker. */
export const AREAS: { name: string; lat: number; lng: number }[] = [
  { name: "Indiranagar", lat: 12.9719, lng: 77.6412 },
  { name: "Koramangala", lat: 12.9352, lng: 77.6245 },
  { name: "HSR", lat: 12.9116, lng: 77.6389 },
  { name: "Central", lat: 12.9750, lng: 77.6050 },
  { name: "Whitefield", lat: 12.9698, lng: 77.7500 },
  { name: "Marathahalli", lat: 12.9560, lng: 77.7010 },
  { name: "Sarjapur / ORR", lat: 12.9010, lng: 77.6870 },
  { name: "Electronic City", lat: 12.8452, lng: 77.6602 },
];
