# Vihaara — build starter kit

*(Working name — Vihaara is a placeholder.)*

A responsive web app that helps Bangalore's IT professionals decide **where to go out tonight** — 3–5 verified hangout options, ranked by how far each is from you. This folder is the **build kit**: the documents an AI coding tool (Claude Code) reads to generate the app.

This kit does **not** contain the built app yet — Claude Code scaffolds the Next.js project for you (see `docs/build-plan.md`). Don't pre-create `app/`, `package.json`, etc.

## What's here

```
CLAUDE.md                     build rules — Claude Code reads this at repo root automatically
README.md                     this file
.gitignore                    standard Next.js / Node ignores
docs/
  PRD.md                      plain-English product overview (for anyone)
  spec.md                     functional spec — Pillar 3 (Hangouts) slice
  DESIGN.md                   design language + tokens (v0.1, colours provisional)
  vihaara-prototype.jsx       working reference implementation — match it, don't reinvent
  build-plan.md               Claude Code kickoff prompt + slice sequence + skill notes
data/
  activities.json             seed catalog (18 hangout entries) — the data contract
```

## Getting started

1. Install **Node.js (LTS)**, **Git**, and **Claude Code** (see docs.claude.com for the current install command).
2. *(Optional)* install landing-page skills into `.claude/skills/` — see `docs/build-plan.md`.
3. In this folder, run `claude`, then paste the **kickoff prompt** from `docs/build-plan.md`.
4. Build in **slices** (landing → data/engine → shortlist → detail → finish), reviewing each.
5. Connect Git + **Vercel** for a live URL.

## Important notes

- **Volatile data is placeholder.** Venue hours, prices, and coordinates in `activities.json` are plausible placeholders pending a real **verification pass** — which is the product's core ritual, not busywork.
- **Colours are provisional** in `DESIGN.md` (v0.1); the type scale and spacing are the working system.
- When the real **name** is chosen, it's a find-and-replace for "Vihaara" across these files.
