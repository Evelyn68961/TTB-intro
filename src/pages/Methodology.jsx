import PipelineDiagram from '../components/PipelineDiagram';
import './Methodology.css';

export default function Methodology() {
  return (
    <div className="methodology-page">
      <article className="methodology-article">
        <h1>How TTB is Calculated</h1>

        <PipelineDiagram />

        <section>
          <h2>Step 1: Digitize KM Curve</h2>
          <div className="key-point">
            <strong>Why this matters:</strong> Most trials don't publish raw patient data —
            only the Kaplan-Meier curves in their figures. Digitization tools (e.g.
            WebPlotDigitizer) extract coordinate points from those published curves so we
            can work with the visual data that <em>is</em> public.
          </div>
        </section>

        <section>
          <h2>Step 2: Reconstruct Patient Data</h2>
          <p>
            The digitized coordinates feed into the <strong>Guyot et al. (2012)</strong>{" "}
            algorithm, which works backwards from the aggregate curve plus the published
            number-at-risk table to recover an approximate individual patient dataset —
            one row per patient, with follow-up time and event status.
          </p>
        </section>

        <section>
          <h2>Step 3: Fit Weibull Model</h2>
          <p>
            We fit a parametric <strong>Weibull</strong> survival model to the reconstructed
            data. Weibull replaces the jagged KM staircase with a smooth, continuous
            curve described by two parameters:
          </p>
          <dl className="parameter-list">
            <dt>Shape (k)</dt>
            <dd>
              Controls whether hazard increases (k &gt; 1), decreases (k &lt; 1),
              or stays constant (k = 1) over time.
            </dd>
            <dt>Scale (λ)</dt>
            <dd>
              Determines the overall event rate — how quickly events accumulate.
            </dd>
          </dl>
        </section>

        <section>
          <h2>Step 4: Calculate ARR Over Time</h2>
          <p>
            With smooth survival curves for both groups, the{" "}
            <strong>absolute risk reduction</strong> at any time point is just the gap
            between them:
          </p>
          <div className="formula">
            ARR(t) = S<sub>treatment</sub>(t) − S<sub>control</sub>(t)
          </div>
        </section>

        <section>
          <h2>Step 5: Find Time-to-Benefit</h2>
          <p>
            <strong>TTB</strong> is the first time ARR(t) crosses a clinically meaningful
            threshold — for example, the time at which 1 in 100 patients has avoided an
            event (ARR = 1%). The interactive demo and the Applications page show this
            crossing in action across multiple drug classes.
          </p>
        </section>

        <section>
          <h2>Handling Uncertainty</h2>
          <p>
            TTB estimates come with uncertainty. <strong>Bayesian</strong> methods produce
            credible intervals by drawing thousands of samples from the posterior
            distribution of the model parameters, computing TTB for each, and reporting
            the median and 95% credible interval. The result: a realistic range rather
            than a single point estimate.
          </p>
        </section>

        <section>
          <h2>Summary</h2>
          <div className="summary-box">
            <p>
              <strong>Input:</strong> Published Kaplan-Meier curves from clinical trials
            </p>
            <p>
              <strong>Process:</strong> Digitize → Reconstruct IPD → Fit Weibull models → Calculate ARR(t)
            </p>
            <p>
              <strong>Output:</strong> Time required to achieve clinically meaningful absolute risk reduction
            </p>
          </div>
        </section>

      </article>
    </div>
  );
}