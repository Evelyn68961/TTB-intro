# TTB Website — Visual Upgrade Plan

> **Purpose:** A portable roadmap for upgrading the "What is TTB?" page (and beyond) from text-heavy to visually interactive. Reference this in any Claude chat to stay on track.
>
> **Created:** 2026-03-17
> **Project:** ttb-intro-website (React + Vite + React Router, deployed on Vercel)

---

## Current State

The site has 4 working pages: Home, What is TTB?, Methodology, Applications (with 5 drug sub-components). All pages use a consistent design system: `#1e3a5f` navy, `#f8fafc` background, `#fffefb` card surfaces, subtle box shadows, system font stack.

The content is solid but the presentation is all text — white cards with paragraphs. No diagrams, no interactive elements, no visual breaks. This is the main thing to fix.

---

## Phase 1: Visual Components for "What is TTB?" Page

### Component 1: SurvivalCurveDiagram ✅ BUILT

- **File:** `src/components/SurvivalCurveDiagram.jsx` + `.css`
- **What it does:** Pure SVG showing two Weibull survival curves (treatment vs control) with:
  - Shaded ARR gap between curves
  - Clickable threshold buttons (0.5%, 1.0%, 2.0%)
  - TTB marker that shifts when threshold changes
  - Result callout explaining what TTB means at each threshold
- **Tech:** Pure SVG + React useState/useMemo. No external dependencies.
- **Weibull params:** Conceptual (shape=1.08, scale_treatment=120, scale_control=90). NOT real GLP-1 RA data.
- **Where in page:** Inside "What TTB Actually Measures" section, BEFORE the ARR thresholds table.
- **Status:** Component files created. Need to: (1) place files in `src/components/`, (2) import in WhatIsTTB.jsx, (3) test locally.

### Component 2: PatientComparison

- **File:** `src/components/PatientComparison.jsx` + `.css`
- **What it does:** Side-by-side visual cards for Patient A (52yo) vs Patient B (84yo) with:
  - A horizontal timeline bar in each card
  - TTB marker on the timeline (e.g., ~24 months)
  - Life expectancy range shown visually
  - Green/amber color coding: Patient A has plenty of time (green), Patient B may not benefit (amber)
  - Clear visual answer: "Will they live long enough to benefit?"
- **Tech:** HTML/CSS cards with a simple SVG or CSS timeline bar inside each card.
- **Where in page:** Replaces the current "Why Timing Matters" section's paragraph-based Patient A/B comparison.
- **Status:** Not built yet.

### Component 3: ScenarioCards

- **File:** `src/components/ScenarioCards.jsx` + `.css`
- **What it does:** 3-column card grid with icons replacing the current `<dl>` definition list for "When TTB Matters Most":
  1. **Delayed benefit** — Preventive meds in elderly (hourglass icon or similar)
  2. **Expensive treatments** — High-cost drugs, minimum duration for payoff (scale/balance icon)
  3. **Benefit vs harm** — Anticoagulants, harm may emerge before benefit (warning/shield icon)
- **Tech:** CSS grid, similar pattern to the existing guidance-grid on Applications page. Icons can be SVG or emoji initially.
- **Where in page:** Replaces the "When TTB Matters Most" `<dl>` section.
- **Design note:** Match the existing `.guidance-card` pattern from Applications page for consistency.
- **Status:** Not built yet.

### Component 4: TTBvsNNT (visual comparison)

- **File:** `src/components/TTBvsNNT.jsx` + `.css`
- **What it does:** Visual side-by-side comparison of TTB vs NNT. NOT a plain table. Two "concept cards":
  - **NNT card:** "How many to treat?" — static snapshot at trial endpoint, no time dimension
  - **TTB card:** "How long to treat?" — continuous trajectory over time, time IS the output
  - Small visual in each card (NNT: group of people icons; TTB: mini timeline with threshold crossing)
- **Where in page:** Replaces or enhances the "TTB vs. Number Needed to Treat" section.
- **Status:** Not built yet.

---

## Phase 1 Integration: Updated WhatIsTTB.jsx Structure

After all 4 components are built, the page structure will be:

```
<h1>What is Time-to-Benefit?</h1>

Section: "The Question Clinical Trials Don't Answer"
  → Text (keep as-is, it's punchy and short)

Section: "Why Timing Matters"
  → Brief intro text (1-2 sentences)
  → <PatientComparison />          ← COMPONENT 2
  → Brief concluding text

Section: "What TTB Actually Measures"
  → Intro paragraph about ARR
  → <SurvivalCurveDiagram />       ← COMPONENT 1 ✅
  → ARR thresholds table (keep existing)

Section: "TTB vs NNT"
  → <TTBvsNNT />                   ← COMPONENT 4

Section: "When TTB Matters Most"
  → <ScenarioCards />              ← COMPONENT 3

Section: "A Growing Body of Research"
  → Keep as-is (links to Applications page)
```

**Sections to CUT from current page:**
- "The Clinical Reality" section — its content (relative vs absolute risk, benefit timeline) is now shown visually by the SurvivalCurveDiagram
- Trim "TTB vs NNT" text paragraphs — the visual component replaces the lengthy explanation

---

## Phase 2: Other Pages (After Phase 1 is Done)

### Home Page Rewrite
- Trim the "Missing Piece" intro section (too wordy per content plan feedback)
- Keep hero + 3 routing cards + footer links
- Add published studies link at bottom
- Consider: higher-design hero (gradient, animation)

### Interactive Demo (Page 4 — NEW)
- React + Recharts (install `recharts` as dependency)
- Sliders: HR (0.5-1.0), baseline risk at 5yr (1%-30%), shape parameter (0.8-1.5)
- Real-time output: two Weibull curves, ARR curve, TTB at multiple thresholds
- Client-side Weibull math only (no Bayesian/MCMC, no server)
- Route: `/demo`
- **This is the biggest portfolio piece** — shows React interactivity + domain expertise

### Published Examples (Page 5 — NEW, replaces Applications)
- Card layout: one card per published study
- Each card: drug class, outcome, key TTB number, citation, link
- Studies from content plan table (Lee 2021, Deardorff 2021, Lee 2022, Inoue 2023, Zhou 2025)
- Route: `/published-examples` (or update existing `/applications`)

### Methodology Restructure
- Trim to 3-step pipeline visual (IPD → Weibull → TTB)
- Add "Why Bayesian?" one-paragraph section
- Remove anything marked "KEEP SECRET" in content plan
- Add horizontal flow diagram (SVG)

### FAQ (Page 6 — NEW)
- Accordion/expandable Q&A component
- 8 questions from content plan
- Route: `/faq`

### About Me (Page 7 — NEW)
- Simple professional profile
- Route: `/about`

---

## Phase 3: App.jsx & Navbar Updates

When adding new pages, update THREE things in sync:
1. **Route** in `App.jsx` — add `<Route path="/demo" element={<Demo />} />`
2. **Nav link** in `Navbar.jsx` — add `<li><Link to="/demo">Demo</Link></li>`
3. **Page component** file — create `src/pages/Demo.jsx`

Missing any one of these = blank page or broken navigation.

---

## Technical Decisions Made

| Decision | Choice | Why |
|----------|--------|-----|
| Survival curve diagram | Pure SVG | Conceptual diagram, not data-driven. No dependencies needed. Learning SVG is valuable. |
| Interactive Demo charts | Recharts (later) | Data-driven with slider inputs → Recharts is the right tool. Will install when we build Demo page. |
| Interactivity level | Clickable thresholds | More educational than scroll animation. Uses React useState pattern. Reader explores actively. |
| Component architecture | Separate files in `src/components/` | Reusable (e.g., SurvivalCurveDiagram could appear on Demo page), shows good portfolio architecture. |
| D3.js | Not now | Overkill for explanatory diagrams. Save for NMA Website project (force-directed graphs). |

---

## Key Principles (From Past Learnings)

- **Always read files before writing code.** Never assume file structure.
- **Reuse existing CSS patterns.** Check `.guidance-card`, `.highlight-box`, `.medication-section` before creating new classes.
- **Drug/disease names stay in English** in both language versions (if bilingual is added later).
- **Complete files over incremental patches** when under time pressure.
- **Test locally after each component** before moving to the next.

---

## Build Order

1. ~~SurvivalCurveDiagram~~ ✅ Built
2. PatientComparison ← **NEXT**
3. ScenarioCards
4. TTBvsNNT
5. Integrate all 4 into WhatIsTTB.jsx, cut redundant text sections
6. Test & deploy
7. Move to Phase 2 (Demo page, Home rewrite, etc.)
