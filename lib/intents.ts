import type { Category, OccasionTag, PriceTier, VibeTag } from "./types";

/** Config-driven intents (spec.md §4.1 seam 2): quick-pick chips and guided
 *  questions are DATA, not JSX. Adding a pillar = adding a config entry. */

export interface Axes {
  occasion?: OccasionTag | null;
  vibe?: VibeTag | null;
  price_tier?: PriceTier | null;
  sub_type?: string | null;
}

export interface QuickPick {
  key: string;
  label: string;
  filters: Axes;
}

export interface GuidedQuestion {
  axis: keyof Axes;
  q: string;
  opts: [string, string][];
}

export interface CategoryIntents {
  quickPicks: QuickPick[];
  guided: GuidedQuestion[];
}

const hangout: CategoryIntents = {
  quickPicks: [
    { key: "date",    label: "Date night",        filters: { occasion: "date", vibe: "romantic" } },
    { key: "friends", label: "Friends night out", filters: { occasion: "friends", vibe: "lively" } },
    { key: "cafe",    label: "Chill café",        filters: { sub_type: "cafe", vibe: "chill" } },
    { key: "rooftop", label: "Rooftop drinks",    filters: { vibe: "rooftop" } },
    { key: "music",   label: "Live music",        filters: { vibe: "live_music" } },
    { key: "celeb",   label: "Celebration",       filters: { occasion: "celebration" } },
  ],
  guided: [
    { axis: "occasion", q: "Who's it for?", opts: [["date","Date"],["first_date","First date"],["friends","Friends"],["celebration","Celebration"],["solo","Solo"]] },
    { axis: "vibe", q: "What's the vibe?", opts: [["romantic","Romantic"],["lively","Lively"],["chill","Chill"],["rooftop","Rooftop"],["live_music","Live music"],["quiet","Quiet"]] },
    { axis: "price_tier", q: "Budget?", opts: [["budget","₹ Budget"],["mid","₹₹ Mid"],["premium","₹₹₹ Premium"]] },
  ],
};

export const INTENTS: Partial<Record<Category, CategoryIntents>> = { hangout };

/** The only live category this slice. A selector can sit above this later. */
export const DEFAULT_CATEGORY: Category = "hangout";

export function intentsFor(category: Category = DEFAULT_CATEGORY): CategoryIntents {
  const config = INTENTS[category];
  if (!config) throw new Error(`No intent config for category "${category}"`);
  return config;
}

/** Sub-type presentation map. Icons are resolved in the UI layer. */
export const SUB_TYPE_LABEL: Record<string, string> = {
  cafe: "Café",
  restobar: "Resto-bar",
  pub_microbrewery: "Microbrewery",
  rooftop_lounge: "Rooftop lounge",
  date_spot: "Date spot",
  live_music: "Live music",
};

export const PRICE_LABEL: Record<PriceTier, string> = {
  budget: "₹", mid: "₹₹", premium: "₹₹₹",
};

export function tagLabel(tag: string): string {
  return tag.replace(/_/g, " ");
}
