import { Tile } from "@/components/Tile";

/** A non-verbal answer to "what is this?" — the five sub-types the list covers,
 *  drawn with the same crafted marks the venue cards use, so the tile colours
 *  are learned here and decoded later on the cards. */
const CATEGORIES: { subType: string; label: string }[] = [
  { subType: "cafe", label: "Cafés" },
  { subType: "pub_microbrewery", label: "Breweries" },
  { subType: "rooftop_lounge", label: "Rooftops" },
  { subType: "live_music", label: "Live music" },
  { subType: "date_spot", label: "Date spots" },
];

export function CategoryRail() {
  return (
    <ul className="l-cats" aria-label="What the shortlist covers">
      {CATEGORIES.map((c) => (
        <li key={c.subType} className="l-cat">
          <Tile subType={c.subType} size={32} seed={`cat_${c.subType}`} />
          <span className="l-cat-label">{c.label}</span>
        </li>
      ))}
    </ul>
  );
}
