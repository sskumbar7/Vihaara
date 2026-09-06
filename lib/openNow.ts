import type { DayName, Timings } from "./types";

const DAYS: DayName[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

/** Derived from `timings` + the device clock. Handles past-midnight closing. */
export function isOpenNow(timings: Timings, now: Date): boolean {
  if (!timings.days.includes(DAYS[now.getDay()])) return false;
  const cur = now.getHours() * 60 + now.getMinutes();
  const open = toMin(timings.open);
  const close = toMin(timings.close);
  return close < open ? cur >= open || cur <= close : cur >= open && cur <= close;
}
