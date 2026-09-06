# DESIGN.md — Design Language (v0.1, starting posture)

**Product:** Bangalore hangouts discovery app (working name **Vihaara**, placeholder)
**Platform:** Responsive **web app** — mobile-first, but designed up to desktop.
**Status:** v0.1. Foundations (type scale, spacing, components, states) are the working system. **Colour is provisional** and expected to change. This doc will mature after the first real build; treat it as guardrails against generic output, not a frozen spec.
**Source of truth:** the token block at the top of `vihaara-prototype.jsx` maps 1:1 to what becomes `globals.css`. Keep them in sync.
**Companion files:** `spec.md` (behaviour), `activities.json` (data).

---

## 1. Principles

1. **Intent-first, not map-first.** Every screen serves the question "where do we go tonight?" and answers with 3–5 confident options, never a wall.
2. **Two registers, one system.** The **landing** page persuades (expressive, brand-forward). The **app** decides (calm, utilitarian). They share one token layer so they feel like one product.
3. **Content over chrome.** The venue and the two facts that matter — *how far from you* and *how fresh* — are the heroes. Decoration that doesn't help a decision gets cut.
4. **Fast and legible.** Under 2 minutes, under 5 taps, on a phone, one-handed. Performance and clarity are design features.
5. **Trustworthy by showing, not claiming.** The visible `Verified [date]` badge is the anti-listicle signal. Freshness is a design element, not fine print.
6. **Mobile-first, responsive up.** Design the ~380px view first; scale up deliberately (§4).

---

## 2. Two surfaces, one system

| | **Landing** (`/`) | **App** (`/discover`, `/spot/[id]`, `/saved`) |
|---|---|---|
| Job | Explain the value, capture intent, route in | Help the user decide and go |
| Register | Expressive, bold type, motion, persuasion | Calm, quiet, dense-but-breathable |
| Width | Full-width sections, content max ~1120px | Centered focused column, max ~460px |
| Boldness | High — one orchestrated hero moment | Low — restraint; the card is the star |
| Shared | Same colour, type scale, spacing, components, voice | ← same |

The signature that carries the brand across both: **the amber "X min from you" pill** and **the teal "Verified [date]" badge**. Wherever a venue appears — landing sample or app card — those two elements look identical and prominent.

---

## 3. Foundations (tokens)

### 3.1 Colour — *provisional*
Direction: warm paper base, a confident pine-teal as primary (reads *fresh / trustworthy*), warm amber used sparingly as the accent. Deliberately **not** purple (also a competitor's colour), not the cream-serif-terracotta or acid-on-black AI defaults.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F7F5F1` | App background |
| `surface` | `#FFFFFF` | Cards, sheets |
| `ink` | `#18201D` | Primary text |
| `ink-soft` | `#5A675F` | Secondary text, meta |
| `line` / `line-strong` | `#E7E3DB` / `#D9D4C9` | Borders, dividers |
| `teal` | `#0F5C4E` | Primary action, brand, trust, verified |
| `teal-700` / `teal-800` | `#0C4B40` / `#0A3F36` | Primary hover / active |
| `teal-soft` | `#E4EFEA` | Teal tint background |
| `amber` / `amber-ink` | `#C77D28` / `#7A4D12` | Accent; **drive-time pill** |
| `amber-soft` / `-2` | `#F8ECD8` / `#F1DFC0` | Accent background / hover |
| `rust` / `rust-soft` | `#A8502E` / `#F3E4DE` | Warning: stale, closed |

Semantic mapping: **primary/brand/trust → teal**, **accent / "min from you" → amber**, **warning (stale / closed now) → rust**. Maintain WCAG AA contrast for all text pairings; re-check whenever colours change.

### 3.2 Typography
- **Display:** Bricolage Grotesque — characteristic, used with restraint. Fallback: `system-ui, sans-serif`.
- **Body / UI:** Inter. Fallback: `system-ui, sans-serif`.

Fixed modular scale (app). Roles, not sizes, are referenced in components:

| Role | Size / line-height | Weight | Tracking | Family | Usage |
|---|---|---|---|---|---|
| `display` | 34 / 1.05 | 800 | −0.02em | Display | App hero ("Where to tonight?") |
| `h1` | 26 / 1.10 | 800 | −0.01em | Display | Screen titles, questions |
| `h2` | 20 / 1.18 | 700 | −0.01em | Display | Section headers, detail name |
| `title` | 16 / 1.25 | 600 | 0 | Display | Venue name on cards |
| `body` | 16 / 1.50 | 400 | 0 | Body | Descriptions, paragraphs |
| `body-sm` | 14 / 1.45 | 400 | 0 | Body | Secondary text |
| `button` | 15 / 1.0 | 600 | 0 | Body | Button labels |
| `label` | 13 / 1.20 | 600 | 0 | Body | Chips; eyebrows (uppercase +0.04em) |
| `caption` | 12 / 1.30 | 500 | 0 | Body | Pills, verified badge, meta |

**Landing overrides:** the app scale is fixed (utility). The **landing** may step the hero display up responsively — ~40px mobile → ~56–64px desktop — since it's a marketing surface. Everything below the hero stays on the shared scale.

### 3.3 Spacing — 8pt grid (4pt half-steps)
`--s1..--s10 = 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40`. All padding, gaps, and margins snap to this scale. Screen side-padding on mobile = 20 (`--s5`). Card internal padding = 12 (`--s3`). Gaps between cards = 12.

### 3.4 Radius, elevation, borders
- Radius: `sm 10` (pills/inputs), `md 14` (buttons/tiles), `lg 18` (cards), `full`.
- Borders: 1px `line` is the default separator; prefer borders over shadows.
- Elevation (use sparingly): cards are flat by default; **hover** raises `0 4px 16px rgba(24,32,29,.06)` + `translateY(-1px)`. Landing may use marginally deeper shadows on feature blocks.

### 3.5 Iconography
`lucide-react`, stroke ~1.75, sizes 12 / 14 / 16 / 18 / 24. Sub-types map to fixed icons (Café→Coffee, Resto-bar→Wine, Microbrewery→Beer, Rooftop→Building2, Date spot→Heart, Live music→Music). Icons support labels; never replace them where a word is clearer.

### 3.6 Motion
- Durations: **150ms** state changes (hover/press/toggle), **260ms** screen enter (fade + 6px rise).
- Easing: `ease` / `ease-out`. Motion is **feedback, not decoration**.
- The landing may have **one** orchestrated hero moment (choreography deferred, §11).
- `prefers-reduced-motion: reduce` disables all animation and transitions. Non-negotiable.

---

## 4. Responsive model

Breakpoints: **mobile** < 640 · **tablet** 640–1024 · **desktop** > 1024.

**App shell** — the deliberate choice: the app stays a **centered focused column** at all widths.
- Mobile: full-bleed, 20px side padding.
- Tablet/desktop: same column, `max-width ≈ 460px`, centered, on the paper background (optionally a subtle side gradient/vignette on very wide screens). A shortlist is *never* widened into a multi-column grid — that would rebuild the "wall of listings" the product exists to avoid.
- The header (wordmark · "Starting from ▾" · saved) sits at the top of the column.

**Landing** — full-width, expressive.
- Sections span the viewport; inner content `max-width ≈ 1120px`, centered.
- Multi-column allowed here (feature rows, sample-spot grids reflowing 1→2→3 columns).
- Generous vertical rhythm (section padding steps up on desktop).

---

## 5. Surfaces & routing

| Route | Surface | Register | Notes |
|---|---|---|---|
| `/` | Landing | Expressive | Hero + how-it-works + differentiators + sample spots + waitlist |
| `/discover` | App home | Calm | Start-point + dual entry (quick-pick + guided) |
| `/spot/[id]` | Detail | Calm | **Shareable URL** (send a spot to a friend); SEO-friendly later |
| `/saved` | Saved | Calm | Local-storage list |

Start-point picker appears as a first-run step / editable header control, not its own route. Guided flow can be a modal/step over `/discover` or a sub-route — implementation's choice; keep the URL sensible.

---

## 6. Landing page

**Goal:** in one screen, make a time-starved Bangalore techie think "yes, that's my Tuesday problem," then either try it or leave an email.

**Hero (thesis, not template):** lead with the actual question and the payoff, not a generic big-number block.
- Headline: the promise — deciding where to go out in Bangalore in ~2 minutes.
- Sub: the anti-listicle line — curated, verified-fresh, ranked by how far it is from you.
- Primary CTA: **"Find a spot tonight"** → `/discover`.
- Secondary: email capture — **"Get launch updates"** (doubles as waitlist / concierge validation).
- Visual: a live-feeling shortlist preview (2–3 real cards showing the min-from-you pill and verified badge) beats a stock hero photo.

**Sections below (in order):**
1. **The problem → the promise.** The 40-minute spiral vs. 3–5 confident options.
2. **How it works** — 3 steps (a real sequence, so numbering is honest): tell us the vibe → get a ranked shortlist → go.
3. **Why it's different** — the three differentiators, each its own beat: *minutes from you*, *verified fresh*, *curated not scraped*.
4. **A taste** — a few sample app cards (reuse the exact app card component).
5. **Waitlist / CTA band** — repeat email capture + "Find a spot tonight."
6. **Footer** — minimal; working-name wordmark, one line, later links.

---

## 7. App

**Shell:** centered column (§4), header = wordmark · "Starting from: [area] ▾" · saved (♡ count). The header's start-point control is the always-available soft anchor.

**Screens** (behaviour lives in `spec.md`): Start-point → Home (quick-pick + guided) → Shortlist (3–5 ranked) → Detail → Saved, plus Surprise.

**Card anatomy** (shortlist & saved) — the product's core object:
- Sub-type icon tile · Name (`title`) · sub-type + area (`caption`)
- **Amber "X min from you" pill** (hero fact) · price + cost-for-two
- 2–3 vibe/occasion tags · **"Verified [date]" badge** · Save (♡)

**Signature elements** (keep identical everywhere): the amber drive-time pill and the teal verified badge. These are the one thing the design is remembered by; keep everything around them quiet.

---

## 8. Components & states

Every interactive control defines: **default · hover · active(pressed) · focus-visible · disabled**, plus its own status states where relevant. Focus-visible is a 2px teal ring at 2px offset on every control.

| Component | Variants | States beyond the base five |
|---|---|---|
| **Button** | primary (teal), secondary (surface+border), accent (amber-soft), ghost (text) | pressed = `translateY(1px)`; disabled = 45% opacity, no pointer |
| **Chip** (guided option) | single | **selected** = teal fill, white text, check icon |
| **Card** (venue) | shortlist / saved | hover lift + shadow; keyboard-activatable (Enter/Space) |
| **Heart / Save** | icon button | **on** = filled teal; aria-pressed |
| **Switch** (Open now) | on / off | thumb slide; aria-checked; on = teal track |
| **Pill** | neutral, teal, drive (amber), open, closed, tag | static, colour encodes status |
| **Input** (email capture) | text | focus ring; error (rust, message below); disabled |
| **Skeleton** | card | shimmer while a shortlist builds (~450ms) |
| **Empty state** | no-match / nothing-open / nothing-saved | distinct copy per case (§9) |

Minimum tap target: **44×44px** for every control.

---

## 9. Voice & content

Copy is design material. Bring the same intent to words as to spacing.
- **Plain over clever, specific over vague.** "Find a spot tonight," not "Begin your journey."
- **Active voice; labels say what happens.** A button that says "Save" produces a "Saved" state — same word through the flow.
- **From the user's side of the screen.** "Starting from," not "set anchor coordinates."
- **Empty and error states give direction, not mood.** "Nothing's open right now — flip off Open now to see what's good for later," not "Oops! Nothing here 😕".
- **Tone:** calm, warm, a little Bangalore-native where it fits, never hype-y. The landing may be warmer/bolder; the app stays quiet.

---

## 10. Accessibility (quality floor, non-negotiable)

- Target **WCAG 2.1 AA**. Verify text contrast on every colour change.
- Visible keyboard focus on all interactive elements; full keyboard operability.
- Tap targets ≥ 44px; hit-areas don't overlap.
- `prefers-reduced-motion` respected everywhere.
- Semantic HTML; aria roles/labels on icon-only buttons, the switch (`role="switch"`), and card buttons.
- Never rely on colour alone (e.g., "Closed now" carries an icon + text, not just rust).

---

## 11. Deferred / not yet decided (on purpose)

- **Real venue photography** — launch illustrative/icon-first; photos are a later ops/verification cost. `image_url` stays placeholder.
- **Final wordmark / logo** — name pending; "vihaara" is a placeholder set in the display face.
- **Dark mode** — out of scope for v1.
- **Landing hero choreography** — one orchestrated moment, to be designed against the built product.
- **Custom illustration / icon set** — using lucide for now.
- **Multi-pillar category switcher UI** — the app is implicitly "hangout"; the design for a category selector above the home screen comes when Pillar 2 does (keep space for it, don't build it).

> When any of the above resolves, or after the first build teaches us where the app feels clunky, revise this doc and bump the version. v0.1 exists to keep the build coherent and un-generic, not to freeze decisions.
