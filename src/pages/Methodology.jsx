import PipelineDiagram from '../components/PipelineDiagram';
import './Methodology.css';

export default function Methodology() {
  return (
    <div className="methodology-page">
      <article className="methodology-article">
        <h1>How TTB is Calculated</h1>

        <PipelineDiagram />

        <section>
          <h2>Step 1: Extract Survival Data</h2>
          <p>
            Clinical trials report outcomes using Kaplan-Meier (KM) survival curves. 
            These curves show the probability of remaining event-free over time for 
            both treatment and control groups.
          </p>
          <p>
            Using digitization software (such as WebPlotDigitizer), researchers extract 
            coordinate points from published KM curves. This captures the survival 
            probability at each time point for both groups.
          </p>
          <div className="key-point">
            <strong>Why this matters:</strong> Most trials don't publish raw patient data. 
            Digitizing curves allows researchers to work with the visual data that is published.
          </div>
        </section>

        <section>
          <h2>Step 2: Reconstruct Individual Patient Data</h2>
          <p>
            The digitized curve coordinates are then used to reconstruct approximate 
            individual patient data (IPD). This process uses algorithms that work 
            backwards from the survival curve to estimate when individual patients 
            experienced events or were censored.
          </p>
          <p>
            The reconstruction requires:
          </p>
          <ul>
            <li>Digitized survival coordinates</li>
            <li>Number at risk at reported time points</li>
            <li>Total number of events (if available)</li>
          </ul>
          <p>
            The result is a dataset with one row per patient, containing their 
            follow-up time and event status — similar to what the original 
            researchers had access to.
          </p>
        </section>

        <section>
          <h2>Step 3: Fit Parametric Survival Models</h2>
          <p>
            With reconstructed IPD, we fit parametric survival models. TTB analysis 
            typically uses the <strong>Weibull distribution</strong>, which can 
            capture increasing or decreasing hazard rates over time.
          </p>
          <p>
            The Weibull model has two key parameters:
          </p>
          <dl className="parameter-list">
            <dt>Shape (k)</dt>
            <dd>
              Controls whether hazard increases (k &gt; 1), decreases (k &lt; 1), 
              or stays constant (k = 1) over time
            </dd>
            <dt>Scale (λ)</dt>
            <dd>
              Determines the overall event rate — how quickly events accumulate
            </dd>
          </dl>
          <p>
            Models are fit separately for treatment and control groups, or with a 
            shared shape parameter and separate scales. The fitted models allow us 
            to generate smooth survival curves that extend beyond the trial's 
            follow-up period.
          </p>
        </section>

        <section>
          <h2>Step 4: Calculate Absolute Risk Reduction Over Time</h2>
          <p>
            With parametric models for both groups, we can calculate the 
            <strong> absolute risk reduction (ARR)</strong> at any time point:
          </p>
          <div className="formula">
            ARR(t) = S<sub>treatment</sub>(t) − S<sub>control</sub>(t)
          </div>
          <p>
            Where S(t) is the survival probability at time t. This gives us 
            a curve showing how the absolute benefit grows over time.
          </p>
          <p>
            At the start of a trial, ARR is zero — both curves begin at 100% 
            survival. As time progresses, the curves diverge and ARR increases.
          </p>
        </section>

        <section>
          <h2>Step 5: Determine Time-to-Benefit</h2>
          <p>
            Finally, we identify when ARR crosses clinically meaningful thresholds:
          </p>
          <table>
            <thead>
              <tr>
                <th>ARR Threshold</th>
                <th>Meaning</th>
                <th>TTB Question</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0.5%</td>
                <td>1 in 200 benefit</td>
                <td>When does ARR first reach 0.5%?</td>
              </tr>
              <tr>
                <td>1.0%</td>
                <td>1 in 100 benefit</td>
                <td>When does ARR first reach 1.0%?</td>
              </tr>
              <tr>
                <td>2.0%</td>
                <td>1 in 50 benefit</td>
                <td>When does ARR first reach 2.0%?</td>
              </tr>
            </tbody>
          </table>
          <p>
            The time at which ARR crosses each threshold is the 
            <strong> Time-to-Benefit</strong> for that threshold. Lower thresholds 
            are reached sooner; higher thresholds take longer.
          </p>
        </section>

        <section>
          <h2>Handling Uncertainty</h2>
          <p>
            TTB estimates come with uncertainty. Bayesian methods provide credible 
            intervals by:
          </p>
          <ul>
            <li>Drawing thousands of samples from the posterior distribution of model parameters</li>
            <li>Calculating TTB for each sample</li>
            <li>Reporting the median and 95% credible interval</li>
          </ul>
          <p>
            This captures uncertainty from the original trial data through to the 
            final TTB estimate, giving clinicians a realistic range rather than 
            a single point estimate.
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