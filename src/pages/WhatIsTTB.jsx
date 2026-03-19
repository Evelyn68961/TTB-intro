import { useState } from 'react';
import PatientComparison from '../components/PatientComparison';
import SurvivalCurveDiagram, { THRESHOLDS } from '../components/SurvivalCurveDiagram';
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
            <p>
            <strong>Patient A</strong> is 52 years old with a life expectancy of 30+ years.
            If the medication takes 6 years to show benefit, that's a worthwhile investment.
            </p>
            <p>
            <strong>Patient B</strong> is 84 years old with multiple health conditions and
            a life expectancy of 3 years. If the same medication takes 6 years to help,
            she may spend most of her remaining life taking a pill that never benefits
            her — while experiencing side effects, costs, and the daily burden of one
            more medication.
            </p>
            <p>
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
                    <p>Common ARR thresholds used in TTB research:</p>
                    <table>
                    <thead>
                        <tr>
                        <th>Threshold</th>
                        <th>Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>0.5% ARR</td>
                        <td>1 in 200 patients benefits</td>
                        </tr>
                        <tr>
                        <td>1.0% ARR</td>
                        <td>1 in 100 patients benefits</td>
                        </tr>
                        <tr>
                        <td>2.0% ARR</td>
                        <td>1 in 50 patients benefits</td>
                        </tr>
                    </tbody>
                    </table>
                    <div className="ttb-result-callout" style={{ borderColor: selected.color, marginTop: '40px' }}>
                        <p>
                            At the <strong style={{ color: selected.color }}>{selected.label} ARR</strong> threshold,
                            treatment prevents 1 event per {selected.nnt} patients.
                        </p>
                    </div>
                    <div style={{marginTop: '40px'}}>
                       <p>
                            The choice of threshold depends on the clinical context — how serious is
                            the outcome being prevented? What are the treatment burdens?
                       </p> 
                    </div>
                </div>
            </div>

        </section>

        <section>
            <h2>TTB vs. Number Needed to Treat (NNT)</h2>
            <p>
            You may be familiar with <strong>NNT (Number Needed to Treat)</strong> —
            another way to express treatment benefit. How does TTB differ?
            </p>
            <p>
            <strong>NNT</strong> tells you: "We need to treat 50 patients for 5 years
            to prevent one event."
            </p>
            <p>
            <strong>TTB</strong> tells you: "Patients need to take this treatment for
            at least 18 months before meaningful benefit emerges."
            </p>
            <p>
            NNT is calculated at a fixed time point (often the end of a trial). It
            treats benefit as if it accumulates evenly over time — which it doesn't.
            In reality, survival curves for treatment and control groups start together
            and gradually diverge. TTB captures this <em>trajectory</em> of benefit.
            </p>
            <p>Think of it this way:</p>
            <ul>
            <li>NNT answers: "How many people do we treat?"</li>
            <li>TTB answers: "How long must each person wait?"</li>
            </ul>
            <p>
            Both are useful. But for individual patient decisions — especially when
            life expectancy is limited — TTB provides the missing piece.
            </p>
        </section>

        <section>
            <h2>When TTB Matters Most</h2>
            <p>TTB analysis is especially valuable for:</p>
            <dl>
            <dt><strong>Preventive treatments</strong></dt>
            <dd>
                Medications taken by healthy people to prevent future events (statins
                for heart disease, bisphosphonates for fractures). Benefits accumulate
                slowly; patients need time to "earn" them.
            </dd>

            <dt><strong>Older adults</strong></dt>
            <dd>
                With limited life expectancy, the window to benefit shrinks. A treatment
                requiring 3 years to help may not make sense for someone with 2 years
                to live.
            </dd>

            <dt><strong>High-burden treatments</strong></dt>
            <dd>
                Expensive medications, those with significant side effects, or complex
                regimens. The longer patients must wait for benefit, the harder to
                justify the burden.
            </dd>

            <dt><strong>Shared decision-making</strong></dt>
            <dd>
                When clinicians and patients weigh treatment options together, TTB
                provides concrete information: "This medication typically takes about
                2 years to help. Given your situation, does that timeline make sense
                for you?"
            </dd>
            </dl>
        </section>

        <section>
            <h2>The Clinical Reality</h2>
            <p>
            Without TTB information, clinicians often rely on intuition or trial
            endpoints that don't translate to individual decisions. A patient might
            be told "this medication reduces your risk by 20%" without understanding
            that:
            </p>
            <ul>
            <li>
                That 20% relative reduction might mean going from 5% to 4% absolute risk
            </li>
            <li>
                The benefit doesn't appear immediately — it emerges over months to years
            </li>
            <li>
                Their personal time horizon determines whether they'll ever experience
                that benefit
            </li>
            </ul>
            <p>TTB makes these conversations concrete and honest.</p>
        </section>

        <section>
            <h2>A Growing Body of Research</h2>
            <p>TTB analysis has been applied to several major medication classes:</p>
            <ul>
            <li><strong>Statins</strong> for cardiovascular prevention</li>
            <li><strong>Bisphosphonates</strong> for fracture prevention in osteoporosis</li>
            <li><strong>Colchicine</strong> for cardiovascular disease</li>
            <li><strong>Direct oral anticoagulants</strong> for atrial fibrillation</li>
            <li><strong>GLP-1 receptor agonists</strong> for cardiovascular protection (emerging research)</li>
            </ul>
            <p>
            Each analysis provides clinicians with practical timelines to guide
            prescribing decisions, particularly for older patients or those with
            limited life expectancy.
            </p>
        </section>
        </article>          
    </div>
  );
}