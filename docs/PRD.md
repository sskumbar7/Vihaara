# Product Requirements Document (PRD)

**Working name:** Vihaara *(placeholder — final name to be decided)*
**What it is, in one line:** An app that helps busy people in Bangalore quickly decide where to go out — tonight or this weekend — without the hours of scrolling and second-guessing.
**Audience for this document:** Anyone who wants to understand the project — a friend, a potential teammate, an advisor, or an investor. No technical background needed.
**Status:** Early stage. First version being built.

---

## 1. The idea in a nutshell

Bangalore is full of great places — cafés, breweries, rooftop bars, live-music spots. The problem isn't that there's too little to do; it's that there's *too much*, scattered across too many places, and figuring out the *right* option for tonight takes real effort.

Vihaara turns that 30–40 minute research spiral into a 2-minute decision. You tell it a little about your evening — who you're with, the mood, your budget — and it hands you a short, trustworthy list of 3–5 great options, each already checked and each showing how far it is from where you are right now. No endless scrolling, no outdated blog lists, no wall of 200 restaurants.

Think of it as a knowledgeable local friend who always has three good suggestions ready — instead of a search engine that gives you a thousand.

---

## 2. The problem we're solving

People in Bangalore's tech industry have money and appetite for going out, but very little time and energy to *plan* it. After a long work week, the effort of researching where to go is itself the thing that stops them. The information exists, but it's broken in four ways:

- **It's scattered.** Instagram, WhatsApp groups, Reddit, blog listicles, Google Maps — each holds a piece, and nobody puts it together by what you actually want.
- **It's overwhelming.** You don't want fifty options. You want the three that fit *your* exact situation tonight.
- **It goes stale.** Blog "best of" lists are often outdated, contradictory, or secretly advertisements. Timings, prices, and "is it still good?" change faster than the articles do.
- **It ignores your situation.** Nothing filters for "I only have tonight," "it's a first date," "we're a big group," or "I want somewhere close to me."

The result is decision fatigue: people either default to the same tired spot, or waste an evening researching and still feel unsure.

---

## 3. Who it's for

The first audience is **Bangalore's IT professionals, roughly 22–40 years old** — people living around the tech corridors (Whitefield, Marathahalli, Sarjapur/ORR, Koramangala, HSR, Electronic City, Indiranagar). They have disposable income, they're mobile-first, they value reviews and social proof, and they're short on time and long on decision fatigue.

Within that group, the same person shows up in different moods:

- **Solo or new to the city** — wanting to explore and meet people.
- **Couples** — looking for date spots and easy evenings out.
- **Friend groups and work teams** — needing places that work for a crowd.

*(Families with kids and other needs come later — see the roadmap.)*

---

## 4. What it does (the experience)

You open the app already knowing your *mood*, not a specific place. So instead of showing a map, it asks about your situation and answers with a short, confident shortlist.

A typical journey:

1. **"Where are you starting from tonight?"** — one tap to share your location, or pick your area. (You can skip this; it just makes the suggestions sharper.)
2. **Pick a vibe, or let it ask.** Either tap a quick option like *Date night* or *Friends night out*, or answer up to three quick questions (who it's for, the vibe, the budget). Every question is optional — you can jump to results any time.
3. **Get your shortlist.** 3–5 great spots, ranked by how close they are, each showing the essentials: how many minutes away, roughly what it costs, the vibe, and — importantly — **when it was last verified**.
4. **Open one, and go.** Tap for details, get directions, or save it for later.

Two details make it feel different from everything else:

- **"12 minutes from you."** Every suggestion shows the real travel time from where you are — not just "it's in Bangalore." This is the difference between a friend's recommendation and a generic list.
- **"Verified 3 days ago."** Every place carries a freshness stamp, so you know the information is current. Nobody else in this space shows this.

---

## 5. Why it's different from what exists

- **Google Maps / Search** is great when you already know where you're going, but useless for the open-ended "what should we do tonight?"
- **Blog listicles** (the "20 best cafés in Bangalore" articles) are comprehensive but generic, static, and often outdated or paid.
- **Instagram / Reddit** are fresh and trustworthy but unstructured — you have to dig, and it takes time.
- **Zomato / Dineout** solve *food* discovery, not the broader "where do we hang out" question.
- **AI trip planners** (a newer category) plan multi-day holidays to destinations — a different job entirely from "where do we go out in our own city tonight."

Our edge is being **intent-first and hyperlocal**: a small, carefully curated, *verified* set of places, tuned to the exact constraints of a Bangalore professional — how far it is from your side of town, whether it fits tonight's plan, and whether the info is actually current.

---

## 6. What's in the first version

To ship something genuinely good rather than broad and shallow, the first version is deliberately narrow.

**Included:**

- **One category: hangouts** — cafés, resto-bars, breweries, rooftop lounges, date spots, live-music venues, all within the city.
- **Around 40–50 hand-picked, verified places**, concentrated in the popular going-out areas.
- **Two ways to get a shortlist:** a fast one-tap path and a short guided path.
- **Travel time from you** shown on every suggestion.
- **A visible "last verified" freshness stamp** on every place.
- **Save-for-later**, directions, and a link to each venue.
- Works on the **web, on any phone or laptop**, starting from a simple landing page.

**Deliberately left out of the first version** (to keep it focused and shippable):

- Booking or paying inside the app (we link out instead).
- Accounts, logins, and user reviews.
- The other planned categories (weekend getaways, day-outs, family outings, temples).
- Anything automated or AI-heavy — the first version is human-curated on purpose.

---

## 7. How we'll know it's working

Because the whole promise is "a faster, more confident decision," that's what we measure:

- **Decision speed** — can someone go from opening the app to a shortlist in under two minutes?
- **Engagement** — do people open the details, save places, and tap "get directions"?
- **Return rate** — do they come back the next weekend? (The app should become a small habit.)
- **Which path wins** — do people prefer the fast one-tap route or the guided questions? (We offer both to find out.)

Before building heavily, we can also validate demand cheaply: hand-pick suggestions over WhatsApp for 20–30 real professionals and see if it genuinely helps them.

---

## 8. Where it goes next (roadmap)

The first version proves the idea with hangouts. Once that works, the same foundation extends — the app is built so new categories are *additions*, not rebuilds:

1. **Hangouts** (now) — the highest-frequency, easiest-to-verify need.
2. **Weekend getaways** — trips 100–350 km out (Coorg, Chikmagalur, etc.).
3. **Day-outs** — full-day trips returnable by night (treks, adventure parks).
4. **Family & kids outings** — safe, fun places for children.
5. **Religious & heritage spots** — temples and monuments worth visiting.

Further out: real venue photos, community-submitted updates, smarter personalization, and a considered business model (likely a mix of featured listings and booking referrals — decided later, not built now).

---

## 9. Guiding principles

- **Fewer, better options** beat endless choice.
- **Trust is the product.** Being *verified and current* is worth more than being *comprehensive*.
- **Never block the user.** Every question is skippable; they always reach results.
- **Start narrow, build to extend.** Do one thing genuinely well before adding more.

---

## 10. Open questions still being decided

- The final **name and brand**.
- The exact **freshness routine** — how often each place gets re-checked.
- Which entry path (fast vs. guided) people actually prefer.
- The eventual **business model**.

---

*This document explains the vision and the first version in plain terms. The detailed behaviour, data, and design are captured separately in the project's spec, data, and design files.*
