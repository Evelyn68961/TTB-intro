# TTB Website — Visual Upgrade Plan

> **Purpose:** A portable roadmap for upgrading the "What is TTB?" page (and beyond) from text-heavy to visually interactive. Reference this in any Claude chat to stay on track.
>
> **Created:** 2026-03-17  
> **Last updated:** 2026-03-17  
> **Project:** ttb-intro-website (React + Vite + React Router, deployed on Vercel)

---

## Current State

The site has 4 working pages: Home, What is TTB?, Methodology, Applications (with 5 drug sub-components). All pages use a consistent design system: `#1e3a5f` navy, `#f8fafc` background, `#fffefb` card surfaces, subtle box shadows, system font stack.

The "What is TTB?" page now has two visual components integrated: SurvivalCurveDiagram (interactive threshold exploration) and PatientComparison (segmented timeline bars showing benefit vs cost for two patient profiles). Two more components remain for Phase 1.

---

## Phase 1: Visual Components for "What is TTB?" Page

### Component 1: SurvivalCurveDiagram ✅ COMPLETE, INTEGRATED & CLEANED UP

- **Files:** `src/components/SurvivalCurveDiagram.jsx` + `.css`
- **What it does:** Pure SVG showing two Weibull survival curves (treatment vs control) with:
  - Treatment = solid blue (`#2964c3`) line (upper), Control = dashed grey (`#94a3b8`) line (lower)
  - Shaded blue ARR gap between the full length of both curves
  - Clickable threshold buttons (0.5%, 1.0%, 2.0%) — all in a blue gradient (light → deep blue)
  - TTB marker + ARR bracket that shifts when threshold changes
  - Result callout moved to parent's right column (state lifted)
- **Tech:** Pure SVG + React useMemo. No external dependencies. `useState` removed from component (state lives in parent).
- **Weibull params:** Conceptual (shape=1.15, scale_treatment=105, scale_control=72, max_time=8, y_range=0.90-1.00). NOT real GLP-1 RA data.
- **State lifting:** `selectedIdx` and `setSelectedIdx` live in `WhatIsTTB.jsx`, passed as props. THRESHOLDS exported from `SurvivalCurveDiagram.jsx` via `export const THRESHOLDS` and imported in parent via `import SurvivalCurveDiagram, { THRESHOLDS } from ...` — single source of truth.
- **Layout:** Flex layout (`ttb-measure-layout` class in WhatIsTTB.css) — diagram on left (60%), table + callout on right (35%). Table shows ARR thresholds, callout dynamically updates with selected threshold info. Right column has `padding-top: 80px` and `padding-right: 40px`.
- **Colors:** Threshold buttons use blue gradient: `#93c5fd` (0.5%), `#60a5fa` (1.0%), `#3b82f6` (2.0%)
- **Status:** ✅ Fully built, integrated, styled, and code cleaned up.

**Code cleanup completed:**
- Removed trailing space in `#60a5fa` color value (was `'#60a5fa '`)
- Removed unused `useState` import from SurvivalCurveDiagram.jsx
- THRESHOLDS exported as named export — single source of truth across files
- Outdated comments updated

**Lessons learned during build:**
- S(t) labels at the ARR bracket were unreadable at small thresholds (0.5%) — removed them, kept only ARR label
- ARR label position: use `y={ttbYTreat - 8}` (above treatment curve) instead of midpoint between curves to avoid cramping
- Weibull params needed tuning: closer scale values (105 vs 72) with shorter x-axis (8 months) and tighter y-range (0.90-1.00) to fill the plot area
- SVG legend lines: `y1` and `y2` must match for horizontal lines (accidentally made them diagonal)
- State lifting pattern: THRESHOLDS array must be defined BEFORE `const selected = THRESHOLDS[selectedIdx]` — order matters with `const`
- Use CSS classes over inline styles (can add media queries, keeps JSX clean), except for dynamic values from React state
- Use DevTools to experiment with spacing/sizing values before writing them into CSS
- Named exports (`export const`) allow importing both default and named from same file
- Watch for trailing spaces in string values — `'#60a5fa '` vs `'#60a5fa'` can cause subtle bugs

### Component 2: PatientComparison ✅ BUILT

- **Files:** `src/components/PatientComparison.jsx` + `.css`
- **What it does:** Stacked comparison of Patient A (52yo, 30+ yr life expectancy) vs Patient B (84yo, ~3 yr life expectancy) with segmented SVG timeline bars:
  - **Patient A (benefit reached):** gray "wait" segment (0→TTB) + green "X+ years of benefit" segment (TTB→life end)
  - **Patient B (benefit NOT reached):** amber "cost" segment (0→life end) + red "life ends" marker + dashed TTB marker past life end + red "never reached" annotation with arrows
  - Dashed TTB marker on both bars at the same x-position (same scale)
  - Legend at bottom: green = benefit received, amber = treatment cost no benefit, red = TTB not reached before death
- **Tech:** `PatientBar` sub-component handles SVG logic. Conditional rendering (`benefitReached ? ... : ...`) drives which segments/markers appear. Inline styles (not CSS classes). Self-contained — no props from parent.
- **Key constants:** `TTB_MONTHS = 72`, `MAX_YEARS = 32`, `BAR_FULL = 560`, scaling function `yrsToW()`.
- **Layout:** Stacked (text above bar, not side-by-side). SVG uses `width="100%"` with `viewBox` for responsive scaling. `overflow: "visible"` to allow labels outside SVG bounds.
- **Where in page:** Inside "Why Timing Matters" section. Old paragraph-based Patient A/B text still below — needs to be removed in integration step.
- **Status:** ✅ Built and rendering. Still needs: remove old text paragraphs, remove `fontFamily` inline style to match page design system.

**Design decisions made during build:**
- Fixed TTB (not interactive) — simpler, clearer teaching point. Interactivity lives in SurvivalCurveDiagram instead.
- Same scale for both bars (both measured against MAX_YEARS=32) — Patient B's bar is dramatically short, showing the contrast.
- Fictional TTB value (72 months) chosen for visual drama — clearly past Patient B's 36-month life expectancy.
- Three-color system (green/amber/red) with legend, inspired by mockup reference.

**Lessons learned during build:**
- SVG `viewBox` and `BAR_FULL` must be coordinated — if bars extend past viewBox, they get clipped (unless `overflow: visible`).
- `maxWidth` on parent container constrains HTML elements (legend line) but SVG with `overflow: visible` can bleed past — causes mismatched widths.
- Conditional rendering in `.map()` requires curly braces `{}` not parentheses `()` when you need a `const` before the `return`.
- Inline styles inside components are harder to override from parent CSS — consider converting to CSS classes later for consistency.

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

Section: "Why Timing Matters"                ✅ DONE
  → Brief intro text (1-2 sentences)
  → <PatientComparison />          ← COMPONENT 2 ✅
  → Brief concluding text

Section: "What TTB Actually Measures"         ✅ DONE
  → Intro paragraph about ARR
  → Flex layout: <SurvivalCurveDiagram /> (left) + table & callout (right)
  → Closing paragraph about threshold choice

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
| CSS over inline styles | CSS classes in `.css` files | Supports media queries for responsive, keeps JSX clean. Inline only for dynamic state-driven values. |
| State lifting | `selectedIdx` in parent | Allows callout in right column to react to threshold clicks in diagram. Same pattern as Arrhythmia Guide language toggle. |
| Named exports | `export const THRESHOLDS` | Single source of truth. Import in parent via `import Component, { THRESHOLDS } from ...`. Avoids duplicate data across files. |

---

## Key Principles (From Past Learnings)

- **Always read files before writing code.** Never assume file structure.
- **Reuse existing CSS patterns.** Check `.guidance-card`, `.highlight-box`, `.medication-section` before creating new classes.
- **Drug/disease names stay in English** in both language versions (if bilingual is added later).
- **Complete files over incremental patches** when under time pressure.
- **Test locally after each component** before moving to the next.
- **Use DevTools to experiment with CSS values** before writing them into files.
- **`const` declaration order matters** — can't reference a variable before it's defined.
- **SVG lines need matching y1/y2 for horizontal** — different values = diagonal line.
- **Watch for trailing spaces in string values** — `'#60a5fa '` vs `'#60a5fa'` can cause subtle bugs.
- **Named exports for shared constants** — `export const` from source file, import via `{ name }` in consumers.

---

## Build Order

1. ~~SurvivalCurveDiagram~~ ✅ Complete, integrated & cleaned up
2. ~~PatientComparison~~ ✅ Built & rendering. Needs: remove old text, style cleanup.
3. ScenarioCards ← **NEXT**
4. TTBvsNNT
5. Integrate all 4 into WhatIsTTB.jsx, cut redundant text sections
6. Test & deploy
7. Move to Phase 2 (Demo page, Home rewrite, etc.)
