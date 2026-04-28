import { useState } from 'react';
import PatientComparison from '../components/PatientComparison';
import SurvivalCurveDiagram, { THRESHOLDS } from '../components/SurvivalCurveDiagram';
import TTBvsNNTVisual from '../components/TTBvsNNTVisual';
import PopulationGrid from '../components/PopulationGrid';
import WhenTTBMatters from '../components/WhenTTBMatters';
import './WhatIsTTB.css';

export default function WhatIsTTB() {
    const [selectedIdx, setSelectedIdx] = useState(1);
    const selected = THRESHOLDS[selectedIdx];
  return (
    <div className="ttb-page">
        <article className="ttb-article">
        <h1>What is Time-to-Benefit?</h1>

        <section>
            <h2>The Question Clinical Trials Don't Answer</h2>
            <p>
            When a medication is proven effective, we're told it "works." Clinical trials
            report that Drug X reduces heart attacks by 15%, or that Treatment Y cuts
            fractures by 30%. These numbers answer an important question: <em>Does it work?</em>
            </p>
            <p>
            But they leave out something crucial:{" "}
            <em>How long do I need to take it before it helps me?</em>
            </p>
            <p>
            This is the question <strong>Time-to-Benefit (TTB)</strong> analysis answers.
            </p>
        </section>

        <section>
            <h2>Why Timing Matters</h2>
            <p>Consider two patients starting the same medication:</p>
            <PatientComparison selectedIdx={selectedIdx} />
            <p style={{ marginTop: '1.5rem' }}>
            The treatment "works" for both patients in a clinical trial sense. But only
            TTB analysis tells us whether it makes sense for <em>this particular person</em>{" "}
            given their time horizon.
            </p>
        </section>

        <section>
            <h2>What TTB Actually Measures</h2>
            <p>
            TTB estimates the time required for a treatment to achieve a clinically
            meaningful benefit — typically defined as an{" "}
            <strong>absolute risk reduction (ARR)</strong> threshold.
            </p>
            <p>
            For example: "Patients must take this statin for approximately 2.5 years
            before 1 in 100 patients will have avoided a cardiovascular event they
            would have otherwise experienced."
            </p>
            <div className="ttb-measure-layout">
                <div>
                    <SurvivalCurveDiagram 
                        selectedIdx={selectedIdx} 
                        setSelectedIdx={setSelectedIdx} 
                    />
                </div>
                <div>
                    <PopulationGrid nnt={selected.nnt} color={selected.color} />
                    <div className="ttb-result-callout" style={{ borderColor: selected.color }}>
                        <p>
                            At the <strong style={{ color: selected.color }}>{selected.label} ARR</strong> threshold,
                            treatment prevents 1 event per {selected.nnt} patients.
                        </p>
                    </div>
                </div>
            </div>

        </section>

        <section>
            <h2>TTB vs. Number Needed to Treat (NNT)</h2>
            <TTBvsNNTVisual />
        </section>

        <section>
            <h2>When TTB Matters Most</h2>
            <WhenTTBMatters />
        </section>

        </article>
    </div>
  );
}