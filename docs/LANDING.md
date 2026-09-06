# LANDING.md — Landing page art direction & build brief (v0.1)

**Purpose:** the expressive companion to `DESIGN.md`. `DESIGN.md` governs the **app** (strict, calm, utilitarian). This governs the **landing** (expressive, bolder, more crafted). They **share brand tokens** so it's unmistakably one product.
**Use with:** the vetted `landing-page-design` skill — but **only** as described in §4.

---

## 0. Decisions locked

- **One direction:** the **dark-teal expressive set** (Figma images 2–6). Drop the light, near-empty v1. Shipping two personalities is itself a sign of immaturity — commit to the braver one. (It also gives good contrast: dark, bold *front door* → calm, light *tool*.)
- **Brand coherence — do NOT change these** (they tie the landing to the app):
  - Colours: teal `#0F5C4E`, amber `#C77D28` (accent), paper `#F7F5F1`, ink `#18201D`, plus the dark sections already in the set.
  - Wordmark: "vihaara" with the teal pin mark.
  - Type: Bricolage Grotesque (display) + Inter (body).
- **Latitude:** the landing may go bolder than the app — dark sections, depth/texture, larger display sizes, real photography, one signature motion moment. The **app stays calm** regardless.

---

## 1. What's already working — keep it

- **Hero shows the product** (the floating "Tonight's Shortlist" card stack). This is the single best thing in the set — keep it front and centre.
- **Concrete problem section** (WITHOUT / WITH Vihaara; "40 minutes researching → somewhere familiar"). Product-truthful, not filler.
- **Differentiators up front**, strong copy, and the stat bar (`<2 min` / `3–5` / `100%`).

---

## 2. Maturity upgrades (priority order — this is what closes the "feels basic" gap)

1. **Craft the venue card — it's your hero object.** The card carries the two differentiators ("min from you" + "verified"), so it must feel obsessed-over, not like a list row.
   - Replace the flat pastel square + generic icon (the most "AI-default" element in the set) with a crafted tile: a real venue photo *or* a richer illustrated mark. On the landing, real photos are allowed.
   - Align the pills to a grid; give the card considered depth (one real shadow) and keep the coloured rank border from image 6.
   - Tighten internal spacing to the 8pt grid.

2. **Break the triple 3-card rhythm.** How-it-works, Why, and A-Taste are all three-across — three identical rhythms reads as a template. Vary it: make the WITHOUT/WITH contrast a large signature centrepiece; let one section go asymmetric or full-bleed; let the "taste" shortlist feel almost interactive.

3. **Tune the secondary layer.** The big Bricolage headlines already sing; everything *below* them is default (grey body, flat hierarchy). Maturity lives here: tighter body leading, a real eyebrow treatment, a distinctive numeral style for the stats and the 01/02/03 markers.

4. **Add depth + one signature moment.** Extend the faint dot-grid instinct from the hero (subtle texture/depth instead of flat fills). Then give the page **one** unexpected, memorable beat — e.g. the big rank numbers (#1/#2/#3) used as an oversized design device, or a single well-timed hero animation. Most AI landings have zero; one is enough to feel crafted.

---

## 3. Section-by-section

- **Hero (dark teal):** keep the shortlist preview. Headline "Decide where to go out in 2 minutes"; sub = curated, verified-fresh, ranked by distance. Primary CTA (amber) "Find a spot tonight" → `/discover`; secondary email capture. Add subtle depth behind the preview.
- **Stat bar (dark):** `<2 min from open to shortlist` · `3–5 options, not 200` · `100% hand-verified`. Give the numerals a distinctive treatment.
- **Problem (light):** the WITHOUT/WITH comparison — make this the signature centrepiece, larger and more art-directed than a plain two-column.
- **How it works (dark):** 01 Pick your vibe · 02 Get your shortlist · 03 Go. Keep the oversized ghost numerals; vary card sizing so it isn't a flat 3-up.
- **Why (light):** three differentiators (Distance is the answer not a filter · We check so you don't have to · 40 great spots beat 4,000 mediocre). Tinted cards are fine here; vary their weight so it doesn't echo How-it-works exactly.
- **A taste (light):** the real shortlist using the crafted Card — this is where card craft matters most. Include the stale "Verify before you go" state (it's a differentiator, not an error).
- **CTA band (dark teal):** "Vihaara is launching soon in Bangalore." Email capture. "No account needed · works on any phone."
- **Footer:** minimal — wordmark, one line, © .

---

## 4. Using the skill (landing only)

Use the `landing-page-design` skill for **section composition, copy frameworks, and craft** — **not** for aesthetics.

- **Skip "Vibe Discovery" entirely.** The vibe is locked (§0). Do not let it invent a new palette/fonts.
- **Keep** the skill's copy strategy (objection → headline → CTA-narrative), section order, the 50%-on-the-hero rule, and the anti-generic instincts.
- **Ignore** its font/icon prescriptions where they conflict — we keep Bricolage + Inter and our brand marks.
- **Scope:** the skill touches the **landing route only**. It must never influence the app's `DESIGN.md` tokens or screens.

Constraint line to paste when generating/building:
```
Use the landing-page-design skill for section composition, copy, and craft ONLY.
Do NOT run Vibe Discovery — the vibe is locked in LANDING.md (dark-teal, amber
accent, Bricolage + Inter, "vihaara" wordmark). Keep those brand tokens exactly.
Apply only to the landing route; do not touch the app or DESIGN.md.
```

---

## 5. Anti-generic checklist (tailored)

- [ ] No empty hero half — the preview fills the space with the product.
- [ ] The venue card tile is crafted (photo or rich mark), not a flat pastel + generic icon.
- [ ] Section rhythm varies — not three identical 3-card rows.
- [ ] One signature moment exists (rank numbers as device / one hero animation).
- [ ] Secondary type is tuned (leading, eyebrows, numerals), not default grey.
- [ ] Brand tokens intact (teal/amber/paper, Bricolage/Inter, wordmark) — landing still reads as the same product as the app.
- [ ] Real photos, if used, are landing-only; the app stays illustrative.

---

## 6. Build handoff (Claude Code)

Once you've regenerated a landing visual you're happy with, build it as the real page:

```
Build the marketing landing page as the Next.js `/` route, following LANDING.md and
matching the approved visual [attach/screenshot]. Use the shared design tokens in
app/globals.css (teal/amber/paper, Bricolage + Inter) — landing may add dark sections,
depth, and larger display sizes, but the tokens and wordmark stay identical to the app.
Reuse the shared venue Card component. Keep /discover, /spot/[id], /saved as stubs.
Primary CTA "Find a spot tonight" → /discover; email capture stored via the track()/
submit() helper (no backend). Meet the accessibility floor. Use the landing-page-design
skill per LANDING.md §4 (no Vibe Discovery).
```

> This brief is v0.1 and expressive-by-design. When you art-direct further, update it — but keep §0 brand coherence fixed so the landing and app never drift apart.
