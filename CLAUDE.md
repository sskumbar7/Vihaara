# CLAUDE.md — Build Rules

Read this first, every session. It governs **how** to build. The **what** lives in `docs/spec.md`, the **look/feel** in `docs/DESIGN.md`, the **data** in `data/activities.json`, and a working reference in `docs/vihaara-prototype.jsx`. (Inline references below use short names for readability; the files live under `docs/` and `data/`.)

---

## 0. Read order (do this before writing code)
1. `docs/spec.md` — exact behaviour of the slice. The source of truth for *what*.
2. `docs/DESIGN.md` — tokens, type scale, spacing, component states, voice.
3. `data/activities.json` — the data contract. Match its shape exactly.
4. `docs/vihaara-prototype.jsx` — a working reference implementation. **Match it, don't reinvent it.** Its top-of-file `STYLE` block is the design-token layer.

If these disagree, `spec.md` wins on behaviour, `DESIGN.md` wins on appearance. If something is genuinely unspecified, ask or pick the simplest option and note it — don't invent scope.

---

## 1. What we're building (this slice only)
A responsive **web app** that helps Bangalore IT professionals decide where to go out tonight, returning **3–5 verified hangout options ranked by how far they are from the user**. One pillar only: **Hangouts**. Mobile-first, scales to desktop.

**Do not build** the other four pillars, bookings/payments, login/accounts, user reviews, live data ingestion, ML ranking, or multi-city. Those are out of scope (see `spec.md` §1).

---

## 2. Stack & structure
- **Framework:** Next.js (App Router) + React + **TypeScript**. Deploy target: **Vercel**.
- **Styling:** port the prototype's `STYLE` block into `app/globals.css` as the token + component layer (CSS variables + the `.btn`, `.chip`, `.card`, `.pill`, `.t-*`, etc. classes). Use those class names. Tailwind is optional and only for layout primitives (`flex`, `grid`, `gap-*`) — never redefine colours/spacing outside the tokens.
- **No backend for this slice.** Ship `activities.json` with the app (import or `public/`). All user state (start point, saved) in **`localStorage`** — no server, no DB, no auth.
- **Suggested layout:**
  ```
  app/            (routes: / , /discover , /spot/[id] , /saved)
  components/     (Card, Chip, Button, Switch, Pill, Verified, DrivePill, ...)
  lib/            (filterRank.ts, driveTime.ts, openNow.ts, freshness.ts, intents.ts)
  data/           (activities.json)
  app/globals.css (design tokens + component classes)
  ```

---

## 3. Hard rules (do not violate)
1. **Keep the model generic.** Data is a single `Activity` with `category` + a `details` sub-object (`spec.md` §4). Never flatten hangout fields to the top level. Only `category: "hangout"` records exist now.
2. **Keep the four seams generic** (`spec.md` §4.1): the data model, the **config-driven intents** (render quick-pick chips and guided questions from a config object, not hard-coded JSX), the **category-agnostic filter/rank engine**, and routing that could later sit under a category selector. Don't bake the word "hangout" into routes/state in a way that resists a second category.
3. **Drive-time is computed, not stored, and never live.** Use a static area-to-area matrix OR haversine × a fudge factor (as the prototype does). **Do not call Google Directions or any routing API.**
4. **Drive-time is ranking + display, not a hard filter.** Hard filters are only `occasion_tags`, `vibe_tags`, `price_tier`, and `open_now` (when the toggle is on). Rank by drive-time ascending, then `quality_score`.
5. **Never show an empty shortlist.** Apply the relaxation ladder (drop price → drop vibe → nearest good) and label it; fall back to the empty states in `spec.md` §5.7.
6. **The start point never gates the app.** GPS → area list → "not sure" always works; unset = city-center anchor, drop the minutes, soften the label. (`spec.md` §5.0)
7. **Freshness is visible.** Every card shows `Verified [date]`; older than 90 days shows "Verify before you go." (`spec.md` §7)
8. **Desktop keeps the app a centered ~460px column.** Never widen the shortlist into a multi-column grid. Only the landing page goes full-width. (`DESIGN.md` §4)
9. **Accessibility floor is non-negotiable:** WCAG 2.1 AA contrast, visible focus, ≥44px tap targets, `prefers-reduced-motion` respected, aria on icon buttons and the switch.
10. **Voice:** follow `DESIGN.md` §9 — plain, active, calm; empty/error states give direction, not mood.

---

## 4. Data contract
Match `activities.json` exactly. Shared fields at top level; hangout fields under `details`. Extra field present: `quality_score` (number) for the ranking tiebreak. Types are as in `spec.md` §4. Treat the file as read-only content; don't restructure it.

---

## 5. Components & states
Build the set in `DESIGN.md` §8, each with **default / hover / active / focus-visible / disabled** plus its status states (chip selected, heart on, switch on/off, pills open/closed/stale, skeleton loading, empty states). The prototype already implements all of these — reuse its patterns.

---

## 6. Instrumentation
Fire the events in `spec.md` §9 (`start_point_set`, `home_path_chosen`, `quick_pick_chip`, `guided_completed`, `shortlist_shown`, `detail_opened`, `saved_added`, `directions_tapped`, `link_opened`, `time_open_to_shortlist_ms`). Log to console/localStorage for now — **no analytics vendor**. Wrap in one `track(event, payload)` helper so a real sink can be added later.

---

## 7. Definition of done (this slice)
- Cold open → shortlist in **< 2 min, < 5 taps**; both home paths (quick-pick + guided) work end-to-end and are instrumented.
- Every shortlist returns **3–5** relevant, verified venues with a real "X min from you" (or the softened label when no start point).
- Freshness badge, relaxation, and all empty states behave per spec.
- Responsive: focused column on desktop, clean at ~380px.
- **Zero** broken images (branded placeholder instead), empty shortlists, or dead links.
- Accessibility floor met. Type/spacing use tokens only.

## 8. Commands
`npm install` · `npm run dev` (local) · `npm run build` · deploy via Vercel (Git-connected, auto-deploy on push). Keep `.env` empty for this slice — there are no secrets.

---

## 9. When in doubt
Prefer the smallest change that satisfies `spec.md`. Don't add libraries, screens, or fields that aren't required. Don't refactor the data or token system. If a request would break a hard rule in §3, stop and flag it rather than working around it.
