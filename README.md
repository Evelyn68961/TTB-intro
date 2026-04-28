# Time-to-Benefit (TTB) Educational Website

An interactive website introducing Time-to-Benefit analysis — a framework that answers the question: "How long do patients need to take a medication before it helps?"

## What is TTB?

Traditional clinical trials tell us whether a treatment works, but not how long patients must take it before experiencing benefit. TTB analysis fills this gap, helping clinicians and patients make informed decisions, especially for:

- Older adults with limited life expectancy
- Expensive or high-burden medications
- Shared decision-making conversations

## Pages

- **Home** ([/](src/pages/Home.jsx)) — Hero, mission, and a four-card hub with custom SVG icons routing to each section.
- **What is TTB?** ([/what-is-ttb](src/pages/WhatIsTTB.jsx)) — Threshold-driven survival curve diagram, a "1 in N patients" population grid that responds to the selected ARR threshold, a Patient A vs. Patient B timeline comparison with ghost-zone visualization for "benefit never reached," a side-by-side TTB-vs-NNT visual contrasting the two metrics, and four icon cards for "When TTB Matters Most."
- **Methodology** ([/methodology](src/pages/Methodology.jsx)) — A four-stage pipeline diagram (Digitize → Reconstruct → Fit Weibull → Calculate TTB) with mini SVG illustrations at each stage, followed by concise per-step insights.
- **Clinical Applications** ([/applications](src/pages/Applications.jsx)) — Published TTB estimates for five drug classes, each with a custom ARR-over-time mini-chart (Catmull-Rom interpolated through the published threshold-crossing points).
- **Interactive Demo** ([/demo](src/pages/Demo.jsx)) — A live Weibull calculator with HR / baseline-risk / shape sliders driving real-time survival curves, an ARR-over-time chart, and a TTB summary at three thresholds. All math runs client-side; closed-form Weibull, no server.

## Tech stack

- **React 19** with hooks (`useState`, `useMemo`)
- **React Router 7**
- **Vite 7** for dev server and bundling
- **Native SVG** for every chart and diagram (no charting library — keeps bundle small and visual style consistent)

## Run locally

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── pages/
│   ├── Home.jsx               # Hub with feature cards
│   ├── WhatIsTTB.jsx          # Concept explainer
│   ├── Methodology.jsx        # Pipeline + step insights
│   ├── Applications.jsx       # Drug-class results
│   ├── applications/          # Per-drug sub-sections
│   └── Demo.jsx               # Interactive calculator
└── components/
    ├── PipelineDiagram.jsx    # 4-stage methodology flow
    ├── SurvivalCurveDiagram.jsx
    ├── PopulationGrid.jsx     # 1-in-N patient grid
    ├── PatientComparison.jsx  # Patient A vs B timelines
    ├── TTBvsNNTVisual.jsx     # Side-by-side comparison
    ├── WhenTTBMatters.jsx     # 4 icon cards
    ├── MiniARRChart.jsx       # Per-drug ARR curves
    ├── HomeCardIcons.jsx      # Hub-card SVG icons
    └── Navbar.jsx
```

## Design principles

- **Visual over textual.** Every page leads with a diagram, chart, or interactive element. Prose plays a supporting role.
- **Same data, multiple views.** ARR thresholds (0.5%, 1%, 2%) are the spine — they appear as buttons, table rows, threshold lines on charts, marker dots, NNT labels, and population dots, all consistent across pages.
- **Closed-form math, client-side.** No backend, no Bayesian inference in the browser; the demo uses Weibull `S(t) = exp(-(t/λ)^φ)` with proportional hazards.

## References

- Yourman et al., JAMA Internal Medicine 2021 (Statins)
- Deardorff et al., JAMA Internal Medicine 2022 (Bisphosphonates)
- Chen et al., JAMA Internal Medicine 2022 (Intensive BP)
- Chen et al., JAMA Network Open 2023 (SGLT2i)
- Zhou et al., Heliyon 2024 (Colchicine)
- Guyot et al., BMC Medical Research Methodology 2012 (IPD reconstruction algorithm)
