/** One instrumentation seam (CLAUDE.md §6, spec.md §9).
 *  Logs to console + localStorage. No analytics vendor, no network. */

export type EventName =
  | "start_point_set"
  | "home_path_chosen"
  | "quick_pick_chip"
  | "guided_completed"
  | "shortlist_shown"
  | "detail_opened"
  | "saved_added"
  | "directions_tapped"
  | "link_opened"
  | "time_open_to_shortlist_ms"
  | "landing_cta_clicked"
  | "email_submitted";

export interface TrackedEvent {
  event: EventName;
  payload: Record<string, unknown>;
  ts: string;
}

const EVENTS_KEY = "vihaara.events";
const MAX_EVENTS = 200;

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode, quota) — instrumentation is best-effort */
  }
}

export function track(event: EventName, payload: Record<string, unknown> = {}): void {
  const entry: TrackedEvent = { event, payload, ts: new Date().toISOString() };
  // eslint-disable-next-line no-console
  console.info("[vihaara]", event, payload);
  const log = readJSON<TrackedEvent[]>(EVENTS_KEY, []);
  log.push(entry);
  writeJSON(EVENTS_KEY, log.slice(-MAX_EVENTS));
}

export function getEvents(): TrackedEvent[] {
  return readJSON<TrackedEvent[]>(EVENTS_KEY, []);
}

/* ---------- email capture (no backend, no third party) ---------- */

const EMAILS_KEY = "vihaara.emails";

export interface EmailSubmission {
  email: string;
  source: string;
  ts: string;
}

export type SubmitResult =
  | { ok: true; duplicate: boolean }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Store a launch-updates signup locally and fire the event. */
export function submitEmail(email: string, source: string): SubmitResult {
  const value = email.trim().toLowerCase();
  if (!value) return { ok: false, error: "Enter your email to get launch updates." };
  if (!EMAIL_RE.test(value)) return { ok: false, error: "That doesn't look like an email address." };

  const list = readJSON<EmailSubmission[]>(EMAILS_KEY, []);
  const duplicate = list.some((e) => e.email === value);
  if (!duplicate) {
    list.push({ email: value, source, ts: new Date().toISOString() });
    writeJSON(EMAILS_KEY, list);
  }
  track("email_submitted", { source, duplicate });
  return { ok: true, duplicate };
}

export function getEmails(): EmailSubmission[] {
  return readJSON<EmailSubmission[]>(EMAILS_KEY, []);
}
