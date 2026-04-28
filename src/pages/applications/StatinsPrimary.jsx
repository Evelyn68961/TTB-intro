import MiniARRChart from '../../components/MiniARRChart';

const STATINS_DATA = [
  { arr: 0.002, time: 0.8 },
  { arr: 0.005, time: 1.3 },
  { arr: 0.010, time: 2.5 },
];

function StatinsPrimary() {
  return (
    <section className="medication-section">
      <h2>Statins for Primary Prevention</h2>
      <p className="context">
        Statins are widely prescribed for primary prevention of cardiovascular
        disease in adults aged 50–75 years without known cardiovascular disease.
      </p>
      <MiniARRChart
        data={STATINS_DATA}
        unit="years"
        maxTime={4}
        label="ARR over time — First major adverse CV event"
      />
      <div className="ttb-results">
        <h3>TTB Estimates (First Major Adverse CV Event)</h3>
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
              <td>0.8 years</td>
              <td>0.5 – 1.0 years</td>
            </tr>
            <tr>
              <td>0.5% (1 in 200)</td>
              <td>1.3 years</td>
              <td>1.0 – 1.7 years</td>
            </tr>
            <tr>
              <td>1.0% (1 in 100)</td>
              <td>2.5 years</td>
              <td>1.7 – 3.4 years</td>
            </tr>
          </tbody>
        </table>
        <p className="source">Source: Yourman et al., JAMA Internal Medicine 2021</p>
      </div>
      <div className="clinical-implication">
        <strong>Clinical implication:</strong> For patients with life expectancy 
        less than 2.5 years, the harms of statins may outweigh benefits. Only 1 
        of 8 trials showed mortality benefit.
      </div>
    </section>
  );
}

export default StatinsPrimary;