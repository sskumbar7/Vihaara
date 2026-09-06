import raw from "@/data/activities.json";
import type { Hangout } from "./types";

/** The seed content, shipped with the app. Treat as read-only (CLAUDE.md §4). */
export const ACTIVITIES = raw as unknown as Hangout[];

export function getActivity(id: string): Hangout | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}

export function byCategory(category: string): Hangout[] {
  return ACTIVITIES.filter((a) => a.category === category);
}
