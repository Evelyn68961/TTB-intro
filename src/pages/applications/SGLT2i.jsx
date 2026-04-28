import MiniARRChart from '../../components/MiniARRChart';

const SGLT2I_DATA = [
  { arr: 0.002, time: 0.19 },
  { arr: 0.005, time: 0.66 },
  { arr: 0.010, time: 1.74 },
];

function SGLT2i() {
  return (
    <section className="medication-section">
      <h2>SGLT2 Inhibitors for Heart Failure</h2>
      <p className="context">
        SGLT2 inhibitors (empagliflozin, dapagliflozin) have transformed heart
        failure management, reducing hospitalizations and CV death regardless of
        diabetes status.
      </p>
      <MiniARRChart
        data={SGLT2I_DATA}
        unit="months"
        maxTime={3}
        label="ARR over time — CV death or worsening HF"
      />
      <div className="ttb-results">
        <h3>TTB Estimates (CV Death or Worsening HF)</h3>
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
              <td>0.19 months</td>
              <td>0.12 – 0.35 months</td>
            </tr>
            <tr>
              <td>0.5% (1 in 200)</td>
              <td>0.66 months</td>
              <td>0.43 – 1.13 months</td>
            </tr>
            <tr>
              <td>1.0% (1 in 100)</td>
              <td>1.74 months</td>
              <td>1.07 – 2.61 months</td>
            </tr>
          </tbody>
        </table>
        <p className="source">Source: Chen et al., JAMA Network Open 2023</p>
      </div>
      <div className="clinical-implication">
        <strong>Clinical implication:</strong> SGLT2 inhibitors show remarkably 
        rapid benefit — statistical significance at just 26 days, sustained from 
        ~4 months. Appropriate for nearly all HF patients with life expectancy &gt;5 months.
      </div>
    </section>
  );
}

export default SGLT2i;