# Build plan — Claude Code

How to turn this kit into a working app. Build **landing first**, but scaffold the real app so everything grows from it.

---

## Slice 1 — kickoff prompt (paste as your first Claude Code message)

```
You are building a responsive web app. Read these files first and treat CLAUDE.md
as authoritative on HOW to build:
  1. CLAUDE.md                      (build rules — governs everything)
  2. docs/spec.md                   (app behaviour)
  3. docs/DESIGN.md                 (design language + tokens)
  4. docs/PRD.md                    (plain-English context)
  5. data/activities.json           (data contract)
  6. docs/vihaara-prototype.jsx     (reference implementation — MATCH it, don't reinvent)

We build in SLICES. This first slice = project scaffold + the marketing landing page
ONLY. Do not build the app flows yet, but DO lay the full foundation so they slot in next.

SLICE 1 TASKS
1. Scaffold a Next.js (App Router) + TypeScript project using the folder structure in
   CLAUDE.md §2 (routes: / , /discover , /spot/[id] , /saved ; plus components/, lib/,
   data/, app/globals.css). Create /discover, /spot/[id], /saved as minimal placeholder
   pages ("coming next") so links resolve and the structure exists.
2. Port the prototype's top-of-file STYLE block into app/globals.css as the SHARED
   design-token + component layer (CSS variables + .btn/.chip/.card/.pill/.t-* classes).
   Both the landing and the future app must use these exact tokens. Do NOT add ShadCN,
   do NOT introduce a second design system, do NOT use arbitrary Tailwind color/spacing.
3. Build the landing page at / per DESIGN.md §6: hero (headline = the ~2-minute
   "where to tonight?" decision promise; sub = curated + verified-fresh + ranked by
   distance; primary CTA "Find a spot tonight" → /discover; secondary email capture
   "Get launch updates"), then problem→promise, how-it-works (3 steps), why-different
   (3 differentiators: minutes-from-you, verified-fresh, curated-not-scraped), a "taste"
   section reusing the venue Card with 2–3 real entries from activities.json, a waitlist
   CTA band, and a minimal footer. Full-width sections, inner content max ~1120px.
4. Build the venue Card as a REAL reusable component (components/Card) matching the
   prototype's anatomy — name, sub-type icon tile, amber "X min from you" pill, price,
   tags, teal "Verified [date]" badge — so the landing and the future app share it.
5. Email capture: store submissions to localStorage + console via one submit()/track()
   helper. No backend, no third-party.
6. Meet the accessibility floor (DESIGN.md §10): WCAG AA, visible focus, ≥44px targets,
   prefers-reduced-motion, aria on icon buttons.

If a landing-page skill is installed: use its conversion STRUCTURE and COPY frameworks
only. Our DESIGN.md tokens and voice win on all visuals; ignore any stack the skill
assumes (e.g. ShadCN, standalone HTML, external image CLIs).

CONSTRAINTS: no backend, no login, no analytics vendor, no live APIs, illustrative
imagery only (icon tiles). Keep "Vihaara" as the placeholder wordmark.

WHEN DONE: run it locally, then give me (a) a short summary of what you built and where,
(b) any decisions you made, (c) the proposed next slice. Stop for my review before
building the app flows.
```

---

## Remaining slices (feed one at a time, review each)

- **Slice 2 — data + engine.** Build `lib/` (filter-rank, drive-time via static matrix / haversine, open-now, freshness, config-driven intents). Build `/discover`: soft start-point picker (GPS → area list → "not sure", never gates) + dual home (quick-pick chips + guided flow). Match spec §5.0–5.2.
- **Slice 3 — the payoff.** Shortlist screen: 3–5 ranked cards, drive-time-then-quality ranking, relaxation ladder, freshness + empty states. Match spec §5.3, §6, §7.
- **Slice 4 — depth.** `/spot/[id]` detail (shareable URL) + save (♡) + `/saved`. "Surprise me". Match spec §5.4–5.6.
- **Slice 5 — finish.** Instrumentation (spec §9), full responsive + accessibility pass, replace remaining placeholders, deploy to Vercel.

---

## Skills — recommended set

Skills install into `.claude/skills/`. **Read each skill's SKILL.md before trusting it** — a skill runs its instructions in your repo. Prefer well-starred, reputable ones, and constrain any skill to this kit (below).

**For the landing slice (now):**
- A **landing-page structure/copy** skill — for the 5-second hero test, section order, CTA psychology, and copy frameworks (PAS / AIDA / BAB). Pick a *copy/structure* skill, **not** one that imposes ShadCN, outputs a standalone HTML file, or needs an external image-generation CLI — those fight this kit's design system.
  - Constraint to add in your prompt: *"Use the skill's structure and copy frameworks only; DESIGN.md tokens and voice win on visuals; ignore any stack it assumes."*

**For build quality (throughout):**
- **Next.js / App Router patterns** — keeps routing, server/client components, and data loading idiomatic.
- **Accessibility (a11y)** — enforces the WCAG AA floor this project commits to.
- **Code review** — a structured review pass (correctness, security, performance) before you merge each slice.

**For shipping (later slices):**
- **Vercel deploy** — environment check, build verification, rollback steps for the deploy.
- **SEO / metadata** — for the landing page and the shareable `/spot/[id]` pages.
- **Test generation** — once the filter/rank engine is stable, lock its behaviour with tests.

**Skip for now:** anything that generates hero imagery via a paid/external CLI (this kit is illustrative-first), and multi-agent "orchestration" mega-packs (overkill for a one-pillar MVP).
