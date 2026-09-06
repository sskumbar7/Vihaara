# spec.md — Functional Spec (MVP, Slice 1)

**Product:** Bangalore travel/activities discovery app (working name TBD)
**Scope of this spec:** Pillar 3 — **Hangouts** (couples & social) is the first build slice. Build only hangouts now — but on a data model and UI that already fit all five pillars (see §4.1).
**Status:** Draft for build. Scope is intentionally narrow; the *architecture* is not. Ship hangouts; leave clean seams for getaways, day-outs, family, and religious.
**Companion files:** `activities.json` (seed data + schema), `DESIGN.md` (visual language), `CLAUDE.md` (build rules).

---

## 1. What this spec is (and is not)

This describes the **exact behaviour** of the first shippable slice — one pillar, three flows — so an AI coding tool builds *this product*, not a generic listings app.

**In scope for this slice**
- One category live now: in-city **Hangouts** (cafés, restobars, pubs/microbreweries, rooftop lounges, date spots, live-music venues) — built on a generic, multi-category model (§4.1).
- Two ways into a shortlist: a **Quick-pick** fast path and a **Guided** situational path.
- A ranked **shortlist** (3–5 results), a **detail card**, and **save for later**.
- Start-point anchoring (drive-time shown from where the user is starting tonight — see §5.0).
- A visible **freshness badge** ("Verified [date]").

**Explicitly NOT in scope for this slice**
- The other four pillars (getaways, day-outs, family/kids, religious).
- Bookings, payments, ticketing (link out only).
- User accounts/login, reviews, ratings-by-users, social features.
- Live data ingestion (Instagram, live "open now" via API), personalized ML, itinerary/routing.
- Multi-city. Bangalore only.

---

## 2. Core concept (one paragraph)

The user opens the app in a specific mood ("where do we go tonight?") and wants **3–5 confident options for their exact situation**, not a wall of listings. The app is **intent-first, not map-first**. Its wedge is turning a 40-minute research spiral into a <2-minute decision. Its trust differentiator vs. blog listicles is a **small, curated, verified** catalog that visibly shows how fresh each entry is.

---

## 3. Locked product decisions (do not re-litigate in code)

1. **Hangouts first.** Highest-frequency, easiest to seed with verified in-city data.
2. **Catalog target: ~40–50 verified hangout entries**, concentrated in the going-out belt (Indiranagar, Koramangala, HSR, Church St/MG Road, Whitefield). Small on purpose.
3. **Drive-time is a RANKING and DISPLAY signal, not a hard filter.** With a small catalog, area-as-hard-filter empties result sets. Show the best matches sorted nearest-first, each labelled "X min from [your area]." A great Indiranagar spot still surfaces for an HSR user — with "22 min" attached — and the user decides.
4. **Freshness is a feature.** Every card shows `Verified [date]`. Nobody else does this.
5. **Start-point anchoring, softly.** Anchor drive-time to where the user is *starting from tonight* (GPS or a picked area), not their permanent home. It sharpens ranking but never gates the app — "not sure" is always a valid answer (see §5.0).
6. **Dual home screen.** Quick-pick (fast) and Guided (situational) both feed the same shortlist engine. Ship both to measure which wins.
7. **Narrow scope, extensible bones.** Build hangouts only, but keep the data model, intent config, filter engine, and routing generic so later pillars are additions, not rewrites (§4.1).

---

## 4. Data model — a generic `Activity` entity (data contract)

The app reads from `activities.json`, an array of `Activity` objects. **One entity serves all five pillars**, discriminated by `category`. Shared fields live at the top level; pillar-specific fields live in a `details` sub-object. For this slice, only `category: "hangout"` records exist — but the shape is already the full shape. The seed file must match this exactly.

**Shared fields (every category):**

| Field | Type | Role | Notes |
|---|---|---|---|
| `id` | string | key | e.g. `"hangout_001"` |
| `category` | enum | discriminator | `hangout` (only one live now; later: `getaway`, `dayout`, `family`, `religious`) |
| `name` | string | display | venue name |
| `sub_type` | string | display/filter | for hangouts: `cafe` \| `restobar` \| `pub_microbrewery` \| `rooftop_lounge` \| `date_spot` \| `live_music` |
| `area` | string | display/rank | locality, e.g. `"Indiranagar"` |
| `lat` / `lng` | number | rank | used to compute drive-time from the user's start point |
| `description` | string | display | 1–2 sentences, curated, why-it's-good |
| `image_url` | string | display | one hero image |
| `price_tier` | enum | **hard filter** | `budget` \| `mid` \| `premium` (₹/₹₹/₹₹₹) |
| `occasion_tags` | string[] | **hard filter** | subset of: `date`, `first_date`, `friends`, `celebration`, `solo` |
| `vibe_tags` | string[] | **hard filter** | subset of: `romantic`, `lively`, `chill`, `rooftop`, `live_music`, `quiet` |
| `timings` | object | display + open-now calc | `{ open: "17:00", close: "01:00", days: [...] }` |
| `source_url` | string | link-out | official / Google Maps / Zomato |
| `last_verified_date` | string (ISO date) | display | powers the freshness badge |

**Hangout-specific fields — `details` sub-object (`category: "hangout"`):**

| Field | Type | Role | Notes |
|---|---|---|---|
| `cost_for_two` | number (INR) | display | approx, e.g. `1500` |
| `cover_charge` | boolean | display | |
| `reservation_required` | boolean | display | |

> Later pillars add their own `details` shape (getaways: `nights_recommended`, `stay_options`; day-outs: `entry_fee`, `effort_level`; etc.) without touching shared fields. The UI reads shared fields generically and branches on `details` only per category.

**Computed at runtime (not stored):**
- `drive_time_min` — from the user's start point to the venue. **MVP implementation:** a static **area-to-area drive-time matrix** (~8 areas), OR straight-line distance × a fudge factor. Do **not** call a live routing API in this slice. If the start point is unknown, fall back to a city-center anchor and soften the label (see §5.0).
- `open_now` — derived from `timings` + device clock.

### 4.1 Built to extend (architectural seams — keep these generic)

Slice 1 ships hangouts, but do **not** hard-code hangout-only assumptions. Keep these four seams generic so later pillars are additions, not rewrites:

1. **Data:** the single `Activity` + `category` + `details` model above. Never flatten hangout fields into the top level.
2. **Intents / home screen:** render Quick-pick chips and Guided questions from a **per-category config object**, not hard-coded JSX. Adding a pillar = adding a config entry.
3. **Filter / rank engine:** keep it category-agnostic — it operates on shared fields (`occasion_tags`, `vibe_tags`, `price_tier`, distance). Category-specific filters plug in later.
4. **Routing / navigation:** structure screens so a category selector can sit above the home screen later. For now the category is implicitly `hangout`; don't bake that word into routes/state in a way that resists a second category.

Everything *else* stays narrow. This section is about **shape, not scope**.

---

## 5. Screens & flows

### 5.0 Start point — soft anchor (not a gate)
The anchor is **where the user is starting from tonight**, not their permanent home — someone lives in Whitefield but is already in Koramangala for dinner. It sharpens ranking; it must never block progress.

Offer, in this priority order:
1. **"Use my location"** — one tap, GPS. Most accurate, zero thinking. Preferred.
2. **Pick an area** — fallback list of ~8 corridors: Whitefield, Marathahalli, Sarjapur/ORR, Koramangala, HSR, Electronic City, Indiranagar, Central (MG Rd/Church St).
3. **"Anywhere / not sure"** — always available. Skipping is fine.

Behaviour:
- Store locally (no login). Editable anytime from a header control ("Starting from: Koramangala ▾").
- If set → label reads **"X min from you."**
- If unset / "not sure" → anchor to city center, **drop the minutes** and soften the label to **"in [area],"** rank by a neutral quality order, and show a gentle one-time nudge to set a start point later. Never trap the user on this screen.

### 5.1 Home screen (dual entry)
The home screen presents **both** paths on one screen. It does not force a choice.

**A. Quick-pick (fast path — Option 3)**
- A row/grid of **intent chips** (rendered from the per-category intent config, §4.1), each a preset filter bundle → jumps straight to the shortlist:
  - `Date night` → occasion:`date`, vibe:`romantic`
  - `Friends night out` → occasion:`friends`, vibe:`lively`
  - `Chill café` → sub_type:`cafe`, vibe:`chill`
  - `Rooftop drinks` → vibe:`rooftop`
  - `Live music` → vibe:`live_music`
  - `Celebration` → occasion:`celebration`
- Also present: **"Surprise me"** → one random strong pick from the full catalog (see 5.5).

**B. Guided (situational path — Option 1)**
- A prominent **"Help me decide"** button → launches the 3-question guided flow (5.2).

> **To validate via research (see §9):** which path gets used more, and whether Quick-pick should be the default vs. Guided. Both are instrumented from day one.

### 5.2 Guided situational flow (Option 1)
Up to **3 refining questions — none mandatory.** Questions *refine* an already-live shortlist; they never *gate* it. A **"Show results"** action (plus a **"Skip"** on each question) is present from question one, so the user can bail to results at any point. Skipping an axis = no filter on it. This protects the <2-min promise and makes Guided simply Quick-pick with fewer answers pre-filled. "How far" is intentionally not asked — distance is handled by ranking.

1. **Who's it for?** → `date` / `first_date` / `friends` / `celebration` / `solo`  → `occasion_tags`
2. **What vibe?** → `romantic` / `lively` / `chill` / `rooftop` / `live_music`  → `vibe_tags`
3. **Budget?** → `budget` / `mid` / `premium`  → `price_tier`

- Questions are rendered from the per-category intent config (§4.1), not hard-coded.
- A persistent **"Open now"** toggle (default on in the evening) applies the `open_now` filter.
- "Show results" at any step → shortlist (5.3) with whatever's answered so far. Answer nothing → a solid nearest / highest-quality list.

### 5.3 Shortlist screen (the payoff)
- Shows **3–5 ranked cards** (never a long scroll). If more than 5 match, show the top 5 by ranking.
- **Shortlist card anatomy:**
  - Hero image
  - Name + `sub_type`
  - **`X min from [your area]`** (the differentiator, prominent)
  - `area` · `cost for two ₹___` · price tier
  - 2–3 vibe/occasion tags
  - **`Verified [date]`** badge
  - Save (♡) control
- Tapping a card → detail (5.4).
- **Result-set rules:**
  - Rank by: **drive-time ascending (primary)**, then curation/quality (secondary).
  - If fewer than 3 match after hard filters, **progressively relax** the least-important axis (drop `budget` first, then `vibe`) and label it: "Widened your search to show more."
  - Never show an empty shortlist (see 5.6).

### 5.4 Detail card
- Full-width image, name, `sub_type`, `area`.
- **`X min from [your area]`**, `cost_for_two`, `price_tier`, `cover_charge`, `reservation_required`.
- `timings` + `open now` status.
- Full `description` (the curated "why go").
- All `vibe_tags` + `occasion_tags`.
- **`Verified [date]`** badge.
- Actions: **Save (♡)**, **Get directions** (opens maps to lat/lng), **Open link** (`source_url`). No in-app booking.

### 5.5 "Surprise me"
- One tap → picks one strong match. If the user has an active situation (from a recent guided/quick-pick), bias the pick to it; otherwise pick a high-quality random entry near the user's area. Lands directly on a detail card with a "Show me another" control.

### 5.6 Saved screen
- List of saved venues (local storage, no login).
- Same card anatomy as shortlist, minus the ranking. Remove-from-saved control.

### 5.7 Empty / edge states
- **No matches even after relaxing:** show nearest 3 highly-rated hangouts regardless of vibe, labelled "Nothing exact — here's what's good near you."
- **Nothing open now (with toggle on):** "Nothing open right now — here's what's good for later," toggle off.
- **No start point set / "not sure":** anchor to city center, drop the minutes (show "in [area]"), and gently nudge to set one. Never block.
- **Image missing:** show a branded placeholder, never a broken image.

---

## 6. Filtering & ranking logic (explicit)

**Hard filters** (a venue must satisfy ALL active ones to appear):
`occasion_tags` (any overlap), `vibe_tags` (any overlap), `price_tier` (exact), `open_now` (only if toggle on).

**Ranking** (applied to the filtered set, in order):
1. `drive_time_min` ascending (nearest first).
2. Curation/quality tiebreak (a simple `quality_score` or ordering in the seed file is fine for MVP).

**Relaxation ladder** (only if <3 results): drop `price_tier` → drop `vibe_tags` → widen to nearest good venues. Always tell the user when the search was widened.

---

## 7. Freshness UI (the trust feature)

- Every card (shortlist, detail, saved) shows **`Verified [date]`** derived from `last_verified_date`.
- Format: relative if recent ("Verified 3 days ago"), absolute if older ("Verified Jun 2026").
- If `last_verified_date` is older than a threshold (e.g. 90 days), show a muted "Verify before you go" note. This is a UI signal only; no automation in this slice.

---

## 8. Non-functional / build notes

- **Platform:** mobile-first responsive web (per earlier decision: Next.js on Vercel). Design for a ~380px viewport first.
- **No backend required for this slice:** `activities.json` shipped with the app; all state (area, saved) in local storage.
- **No login, no PII, no analytics vendor lock-in** — but DO instrument the events in §9 (even to console/local for now).
- **Performance:** shortlist must render fast; images lazy-loaded.

---

## 9. Instrumentation (measure the wedge)

Fire and log these events (local/console is fine for MVP):
- `start_point_set` = `gps` | `area` | `skipped`
- `home_path_chosen` = `quick_pick` | `guided` | `surprise`  ← **the key research signal**
- `quick_pick_chip` = which chip
- `guided_completed` (+ which axes were skipped)
- `shortlist_shown` (+ result count, + whether relaxation fired)
- `detail_opened`
- `saved_added`
- `directions_tapped`, `link_opened`
- `time_open_to_shortlist_ms`  ← **the <2-min decision-speed metric**

---

## 10. Success criteria for this slice

- A user can go from cold open → shortlist in **<2 minutes** and **<5 taps**.
- Every shortlist returns **3–5** genuinely relevant, verified hangouts with a real "X min from you."
- Both home paths work end-to-end and are instrumented.
- Zero broken images, zero empty shortlists, zero dead links in the seed set.

---

## 11. Open questions to validate via research (post-build)

1. **Home screen:** does Quick-pick or Guided get used more? Should one be the default? (Both shipped to find out.)
2. **Guided length:** are 3 questions too many? Would 2 (drop budget) convert better?
3. **Start point:** do users prefer GPS or picking an area? How many skip it entirely — and does the softened, minutes-less experience still feel useful for them?
4. **Drive-time approximation:** is the static matrix "good enough," or do users notice inaccuracy vs. real routing?
5. **Catalog size:** is ~40–50 entries enough to feel trustworthy for hangouts, or does it feel thin under filtering?
