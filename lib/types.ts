/** Generic Activity entity — spec.md §4. One shape serves all five pillars,
 *  discriminated by `category`. Pillar-specific fields live under `details`.
 *  Never flatten hangout fields to the top level (CLAUDE.md §3.1). */

export type Category = "hangout" | "getaway" | "dayout" | "family" | "religious";

export type HangoutSubType =
  | "cafe" | "restobar" | "pub_microbrewery"
  | "rooftop_lounge" | "date_spot" | "live_music";

export type PriceTier = "budget" | "mid" | "premium";
export type OccasionTag = "date" | "first_date" | "friends" | "celebration" | "solo";
export type VibeTag = "romantic" | "lively" | "chill" | "rooftop" | "live_music" | "quiet";
export type DayName = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export interface Timings {
  open: string;   // "17:00"
  close: string;  // "01:00" (may wrap past midnight)
  days: DayName[];
}

/** Hangout-only `details` payload. Later pillars add their own shape. */
export interface HangoutDetails {
  cost_for_two: number;
  cover_charge: boolean;
  reservation_required: boolean;
}

export interface Activity<D = HangoutDetails> {
  id: string;
  category: Category;
  name: string;
  sub_type: string;
  area: string;
  lat: number;
  lng: number;
  description: string;
  image_url: string;
  price_tier: PriceTier;
  occasion_tags: OccasionTag[];
  vibe_tags: VibeTag[];
  timings: Timings;
  source_url: string;
  last_verified_date: string; // ISO date
  quality_score: number;
  details: D;
}

export type Hangout = Activity<HangoutDetails>;

/** The user's soft anchor. `null` = unset → city-centre fallback (spec.md §5.0). */
export interface StartPoint {
  method: "gps" | "area";
  area: string;
  lat: number;
  lng: number;
}

export interface GeoPoint { lat: number; lng: number }
