import MiniARRChart from '../../components/MiniARRChart';

const BISPHOSPHONATES_DATA = [
  { arr: 0.002, time: 3.3 },
  { arr: 0.005, time: 6.5 },
  { arr: 0.010, time: 12.4 },
];

function Bisphosphonates() {
  return (
    <section className="medication-section">
      <h2>Bisphosphonates for Osteoporosis</h2>
      <p className="context">
        Bisphosphonates reduce fracture risk in postmenopausal women with
        osteoporosis but involve burdens like GI side effects and administration requirements.
      </p>
      <MiniARRChart
        data={BISPHOSPHONATES_DATA}
        unit="months"
        maxTime={18}
        label="ARR over time — Nonvertebral fracture prevention"
      />
      <div className="ttb-results">
        <h3>TTB Estimates (Nonvertebral Fracture Prevention)</h3>
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
              <td>3.3 months</td>
              <td>0.2 – 6.5 months</td>
            </tr>
            <tr>
              <td>0.5% (1 in 200)</td>
              <td>6.5 months</td>
              <td>2.2 – 10.9 months</td>
            </tr>
            <tr>
              <td>1.0% (1 in 100)</td>
              <td>12.4 months</td>
              <td>6.3 – 18.4 months</td>
            </tr>
          </tbody>
        </table>
        <p className="source">Source: Deardorff et al., JAMA Internal Medicine 2022</p>
      </div>
      <div className="clinical-implication">
        <strong>Clinical implication:</strong> Most postmenopausal women with 
        osteoporosis and life expectancy &gt;12 months would benefit. Hip fracture 
        prevention takes longer (20.3 months at ARR 0.5%).
      </div>
    </section>
  );
}

export default Bisphosphonates;