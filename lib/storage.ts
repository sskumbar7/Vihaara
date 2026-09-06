/** All user state is local (CLAUDE.md §2): start point + saved venue ids. */

import type { StartPoint } from "./types";

const START_KEY = "vihaara.startPoint";
const SAVED_KEY = "vihaara.saved";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* best-effort */
  }
}

export function getStartPoint(): StartPoint | null {
  return read<StartPoint | null>(START_KEY, null);
}

export function setStartPoint(start: StartPoint | null): void {
  write(START_KEY, start);
}

export function getSavedIds(): string[] {
  return read<string[]>(SAVED_KEY, []);
}

export function toggleSaved(id: string): string[] {
  const list = getSavedIds();
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  write(SAVED_KEY, next);
  return next;
}
