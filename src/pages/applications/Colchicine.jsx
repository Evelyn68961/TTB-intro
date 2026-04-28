import MiniARRChart from '../../components/MiniARRChart';

const COLCHICINE_DATA = [
  { arr: 0.002, time: 1.9 },
  { arr: 0.005, time: 5.1 },
  { arr: 0.010, time: 11.0 },
];

function Colchicine() {
  return (
    <section className="medication-section">
      <h2>Colchicine for Secondary CV Prevention</h2>
      <p className="context">
        Low-dose colchicine targets inflammation in atherosclerosis and is
        now FDA-approved for secondary prevention in patients with established CVD.
      </p>
      <MiniARRChart
        data={COLCHICINE_DATA}
        unit="months"
        maxTime={15}
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
              <td>1.9 months</td>
              <td>0.3 – 3.6 months</td>
            </tr>
            <tr>
              <td>0.5% (1 in 200)</td>
              <td>5.1 months</td>
              <td>0.5 – 9.8 months</td>
            </tr>
            <tr>
              <td>1.0% (1 in 100)</td>
              <td>11.0 months</td>
              <td>0.6 – 21.3 months</td>
            </tr>
          </tbody>
        </table>
        <p className="source">Source: Zhou et al., Heliyon 2024</p>
      </div>
      <div className="clinical-implication">
        <strong>Clinical implication:</strong> Colchicine reduces nonfatal MACE 
        by ~32% (HR 0.68) but shows no mortality benefit. Wide confidence intervals 
        reflect heterogeneity across trials.
      </div>
    </section>
  );
}

export default Colchicine;