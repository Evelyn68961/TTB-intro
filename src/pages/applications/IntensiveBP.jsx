import MiniARRChart from '../../components/MiniARRChart';

const INTENSIVE_BP_DATA = [
  { arr: 0.002, time: 9.1 },
  { arr: 0.005, time: 19.1 },
  { arr: 0.010, time: 34.4 },
];

function IntensiveBP() {
  return (
    <section className="medication-section">
      <h2>Intensive Blood Pressure Treatment</h2>
      <p className="context">
        Intensive BP treatment (target SBP &lt;140 or &lt;130 mm Hg) reduces
        cardiovascular events in adults ≥60 years, but harms like syncope and
        falls occur immediately while benefits emerge over time.
      </p>
      <MiniARRChart
        data={INTENSIVE_BP_DATA}
        unit="months"
        maxTime={48}
        label="ARR over time — Major adverse CV events"
      />
      <div className="ttb-results">
        <h3>TTB Estimates (Major Adverse CV Events)</h3>
        <table>
          <thead>
            <tr>
              <th>ARR Threshold</th>
              <th>Time-to-Benefit</th>
              <th>95% CI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0.2% (1 in 500)</td>
              <td>9.1 months</td>
              <td>4.0 – 20.6 months</td>
            </tr>
            <tr>
              <td>0.5% (1 in 200)</td>
              <td>19.1 months</td>
              <td>10.9 – 34.2 months</td>
            </tr>
            <tr>
              <td>1.0% (1 in 100)</td>
              <td>34.4 months</td>
              <td>22.7 – 59.8 months</td>
            </tr>
          </tbody>
        </table>
        <p className="source">Source: Chen et al., JAMA Internal Medicine 2022</p>
      </div>
      <div className="clinical-implication">
        <strong>Clinical implication:</strong> Intensive BP treatment may be 
        appropriate for patients with life expectancy &gt;3 years but may not 
        be suitable for those with &lt;1 year. HR 0.79 for MACE across 6 trials 
        with 27,414 participants.
      </div>
    </section>
  );
}

export default IntensiveBP;
