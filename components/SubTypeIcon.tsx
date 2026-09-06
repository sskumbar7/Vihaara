import { Beer, Building2, Coffee, Heart, Music, Wine, type LucideIcon } from "lucide-react";

/** Sub-type → fixed icon (DESIGN.md §3.5). */
export const SUB_TYPE_ICON: Record<string, LucideIcon> = {
  cafe: Coffee,
  restobar: Wine,
  pub_microbrewery: Beer,
  rooftop_lounge: Building2,
  date_spot: Heart,
  live_music: Music,
};

export function subTypeIcon(subType: string): LucideIcon {
  return SUB_TYPE_ICON[subType] ?? Coffee;
}
