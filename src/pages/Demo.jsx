import { useMemo, useState } from 'react';
import './Demo.css';

const NAVY = '#1e3a5f';
const BLUE = '#2964c3';
const ACCENT = '#3b82f6';
const MUTED = '#94a3b8';
const MUTED_LINE = '#cbd5e1';
const AXIS_TEXT = '#475569';

const HR_DEFAULT = 0.75;
const BASELINE_DEFAULT = 0.10;
const SHAPE_DEFAULT = 1.0;
const MAX_TIME = 10;

const THRESHOLDS = [
  { arr: 0.005, label: '0.5%', color: '#60a5fa', nnt: 200 },
  { arr: 0.010, label: '1.0%', color: '#2964c3', nnt: 100 },
  { arr: 0.020, label: '2.0%', color: '#1d4ed8', nnt: 50 },
];

function weibullS(t, lambda, k) {
  if (t <= 0) return 1;
  return Math.exp(-Math.pow(t / lambda, k));
}

function lambdaFromBaseline(baseline, k) {
  return 5 / Math.pow(-Math.log(1 - baseline), 1 / k);
}

function lambdaTreatment(lambdaCtrl, hr, k) {
  return lambdaCtrl * Math.pow(hr, -1 / k);
}

function Slider({ label, min, max, step, value, onChange, format, hint }) {
  return (
    <label className="slider-row">
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className="slider-value">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider-input"
      />
      {hint && <span className="slider-hint">{hint}</span>}
    </label>
  );
}

function SurvivalChart({ curveData, ttbData }) {
  const SVG_W = 520;
  const SVG_H = 300;
  const M = { top: 18, right: 22, bottom: 50, left: 60 };
  const PL = M.left;
  const PR = SVG_W - M.right;
  const PT = M.top;
  const PB = SVG_H - M.bottom;
  const PW = PR - PL;
  const PH = PB - PT;

  const minS = Math.min(...curveData.map((p) => p.sCtrl));
  const yMin = Math.max(0, Math.floor((minS - 0.05) * 10) / 10);
  const yMax = 1;

  const xToPx = (t) => PL + (t / MAX_TIME) * PW;
  const yToPx = (s) => PB - ((s - yMin) / (yMax - yMin)) * PH;

  const ctrlPath = curveData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xToPx(p.t).toFixed(1)} ${yToPx(p.sCtrl).toFixed(1)}`)
    .join(' ');
  const treatPath = curveData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xToPx(p.t).toFixed(1)} ${yToPx(p.sTreat).toFixed(1)}`)
    .join(' ');

  const shadedPath =
    curveData.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xToPx(p.t).toFixed(1)} ${yToPx(p.sTreat).toFixed(1)}`).join(' ') +
    ' ' +
    [...curveData].reverse().map((p) => `L ${xToPx(p.t).toFixed(1)} ${yToPx(p.sCtrl).toFixed(1)}`).join(' ') +
    ' Z';

  const yTicks = [];
  const tickStep = (yMax - yMin) <= 0.4 ? 0.05 : 0.1;
  for (let y = yMin; y <= yMax + 1e-9; y += tickStep) {
    yTicks.push(parseFloat(y.toFixed(2)));
  }
  const xTicks = [0, 2, 4, 6, 8, 10];

  return (
    <div className="chart-card">
      <div className="chart-title">Survival Curves</div>
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="chart-svg" role="img" aria-label="Survival curves">
        {yTicks.map((y) => (
          <line key={`yg-${y}`} x1={PL} y1={yToPx(y)} x2={PR} y2={yToPx(y)} stroke={MUTED_LINE} strokeWidth="0.5" />
        ))}
        <rect x={PL} y={PT} width={PW} height={PH} fill="none" stroke={MUTED} strokeWidth="0.7" />

        <path d={shadedPath} fill={ACCENT} fillOpacity="0.14" />
        <path d={ctrlPath} fill="none" stroke={MUTED} strokeWidth="2.2" strokeDasharray="6 4" strokeLinecap="round" />
        <path d={treatPath} fill="none" stroke={BLUE} strokeWidth="2.4" strokeLinecap="round" />

        {ttbData.map(
          (t) =>
            t.ttb !== null && (
              <line
                key={`ttb-${t.label}`}
                x1={xToPx(t.ttb)}
                y1={PT}
                x2={xToPx(t.ttb)}
                y2={PB}
                stroke={t.color}
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.7"
              />
            )
        )}

        {yTicks.map((y) => (
          <text
            key={`yl-${y}`}
            x={PL - 8}
            y={yToPx(y)}
            fill={AXIS_TEXT}
            fontSize="11"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {y.toFixed(2)}
          </text>
        ))}
        {xTicks.map((t) => (
          <text key={`xl-${t}`} x={xToPx(t)} y={PB + 16} fill={AXIS_TEXT} fontSize="11" textAnchor="middle">
            {t}
          </text>
        ))}

        <text x={PL + PW / 2} y={PB + 36} fill="#334155" fontSize="12" fontWeight="600" textAnchor="middle">
          Time (years)
        </text>
        <text
          x={18}
          y={PT + PH / 2}
          fill="#334155"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
          transform={`rotate(-90, 18, ${PT + PH / 2})`}
        >
          Survival probability
        </text>

        {(() => {
          const lw = 124;
          const lh = 42;
          const lx = PR - lw - 10;
          const ly = PB - lh - 10;
          return (
            <g>
              <rect x={lx} y={ly} width={lw} height={lh} fill="#fff" fillOpacity="0.92" stroke={MUTED_LINE} strokeWidth="0.6" rx="4" />
              <line x1={lx + 10} y1={ly + 14} x2={lx + 38} y2={ly + 14} stroke={BLUE} strokeWidth="2.4" />
              <text x={lx + 44} y={ly + 18} fill="#334155" fontSize="11" fontWeight="500">Treatment</text>
              <line x1={lx + 10} y1={ly + 30} x2={lx + 38} y2={ly + 30} stroke={MUTED} strokeWidth="2.2" strokeDasharray="5 3" />
              <text x={lx + 44} y={ly + 34} fill="#334155" fontSize="11" fontWeight="500">Control</text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

function ARRChart({ curveData, ttbData }) {
  const SVG_W = 520;
  const SVG_H = 300;
  const M = { top: 18, right: 60, bottom: 50, left: 60 };
  const PL = M.left;
  const PR = SVG_W - M.right;
  const PT = M.top;
  const PB = SVG_H - M.bottom;
  const PW = PR - PL;
  const PH = PB - PT;

  const maxArr = Math.max(...curveData.map((p) => p.arr), 0.025);
  const yMaxArr = Math.ceil(maxArr * 100) / 100 + 0.005;

  const xToPx = (t) => PL + (t / MAX_TIME) * PW;
  const yToPx = (a) => PB - (a / yMaxArr) * PH;

  const arrPath = curveData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xToPx(p.t).toFixed(1)} ${yToPx(Math.max(0, p.arr)).toFixed(1)}`)
    .join(' ');

  const xTicks = [0, 2, 4, 6, 8, 10];
  const yTickStep = yMaxArr > 0.04 ? 0.01 : 0.005;
  const yTicks = [];
  for (let y = 0; y <= yMaxArr + 1e-9; y += yTickStep) {
    yTicks.push(parseFloat(y.toFixed(4)));
  }

  return (
    <div className="chart-card">
      <div className="chart-title">Absolute Risk Reduction over Time</div>
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="chart-svg" role="img" aria-label="ARR over time">
        {yTicks.slice(1).map((y) => (
          <line key={`yg-${y}`} x1={PL} y1={yToPx(y)} x2={PR} y2={yToPx(y)} stroke={MUTED_LINE} strokeWidth="0.5" />
        ))}
        <rect x={PL} y={PT} width={PW} height={PH} fill="none" stroke={MUTED} strokeWidth="0.7" />

        {THRESHOLDS.map((th) => (
          <line
            key={`th-${th.label}`}
            x1={PL}
            y1={yToPx(th.arr)}
            x2={PR}
            y2={yToPx(th.arr)}
            stroke={th.color}
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.85"
          />
        ))}

        <path d={arrPath} fill="none" stroke={BLUE} strokeWidth="2.6" strokeLinecap="round" />

        {ttbData.map(
          (t) =>
            t.ttb !== null && (
              <g key={`m-${t.label}`}>
                <line x1={xToPx(t.ttb)} y1={yToPx(t.arr)} x2={xToPx(t.ttb)} y2={PB} stroke={t.color} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
                <circle cx={xToPx(t.ttb)} cy={yToPx(t.arr)} r="4.6" fill="#fff" stroke={t.color} strokeWidth="2.4" />
              </g>
            )
        )}

        {THRESHOLDS.map((th) => (
          <g key={`thlbl-${th.label}`}>
            <text
              x={PR + 6}
              y={yToPx(th.arr)}
              fill={th.color}
              fontSize="11"
              fontWeight="700"
              dominantBaseline="middle"
            >
              {th.label}
            </text>
          </g>
        ))}

        {yTicks.map((y) => (
          <text key={`yl-${y}`} x={PL - 8} y={yToPx(y)} fill={AXIS_TEXT} fontSize="11" textAnchor="end" dominantBaseline="middle">
            {(y * 100).toFixed(y === 0 ? 0 : 1)}%
          </text>
        ))}
        {xTicks.map((t) => (
          <text key={`xl-${t}`} x={xToPx(t)} y={PB + 16} fill={AXIS_TEXT} fontSize="11" textAnchor="middle">
            {t}
          </text>
        ))}

        <text x={PL + PW / 2} y={PB + 36} fill="#334155" fontSize="12" fontWeight="600" textAnchor="middle">
          Time (years)
        </text>
        <text
          x={18}
          y={PT + PH / 2}
          fill="#334155"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
          transform={`rotate(-90, 18, ${PT + PH / 2})`}
        >
          ARR
        </text>
      </svg>
    </div>
  );
}

export default function Demo() {
  const [hr, setHr] = useState(HR_DEFAULT);
  const [baseline, setBaseline] = useState(BASELINE_DEFAULT);
  const [shape, setShape] = useState(SHAPE_DEFAULT);

  const { curveData, ttbData } = useMemo(() => {
    const lambdaCtrl = lambdaFromBaseline(baseline, shape);
    const lambdaTreat = lambdaTreatment(lambdaCtrl, hr, shape);

    const steps = 400;
    const data = [];
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * MAX_TIME;
      const sCtrl = weibullS(t, lambdaCtrl, shape);
      const sTreat = weibullS(t, lambdaTreat, shape);
      data.push({ t, sCtrl, sTreat, arr: sTreat - sCtrl });
    }

    const ttb = THRESHOLDS.map((th) => {
      const point = data.find((p) => p.arr >= th.arr);
      return { ...th, ttb: point ? point.t : null };
    });

    return { curveData: data, ttbData: ttb };
  }, [hr, baseline, shape]);

  const hrHint = hr <= 0.65 ? 'Strong treatment effect' : hr <= 0.85 ? 'Moderate effect' : 'Weak effect';
  const shapeHint = shape < 0.95 ? 'Decreasing hazard' : shape > 1.05 ? 'Increasing hazard' : 'Approximately constant hazard';

  return (
    <div className="demo-page">
      <article className="demo-article">
        <h1>Interactive TTB Calculator</h1>
        <p className="demo-intro">
          Adjust the parameters and watch the survival curves, the gap between them, and the
          time-to-benefit at each threshold update in real time.
        </p>

        <section className="demo-controls">
          <Slider
            label="Hazard Ratio (HR)"
            min={0.5}
            max={1.0}
            step={0.01}
            value={hr}
            onChange={setHr}
            format={(v) => v.toFixed(2)}
            hint={hrHint}
          />
          <Slider
            label="Baseline risk at 5 years"
            min={0.01}
            max={0.30}
            step={0.005}
            value={baseline}
            onChange={setBaseline}
            format={(v) => `${(v * 100).toFixed(1)}%`}
            hint="Risk in the untreated group by 5 years"
          />
          <Slider
            label="Weibull shape (φ)"
            min={0.8}
            max={1.5}
            step={0.01}
            value={shape}
            onChange={setShape}
            format={(v) => v.toFixed(2)}
            hint={shapeHint}
          />
        </section>

        <section className="demo-charts">
          <SurvivalChart curveData={curveData} ttbData={ttbData} />
          <ARRChart curveData={curveData} ttbData={ttbData} />
        </section>

        <section className="ttb-summary">
          <h2>Time-to-Benefit at each threshold</h2>
          <div className="ttb-cards">
            {ttbData.map((t) => (
              <div key={t.label} className="ttb-card" style={{ borderColor: t.color }}>
                <div className="ttb-card-row">
                  <span className="ttb-card-threshold" style={{ color: t.color }}>{t.label}</span>
                  <span className="ttb-card-nnt">NNT = {t.nnt}</span>
                </div>
                <div className="ttb-card-time">
                  {t.ttb !== null ? (
                    <>
                      <span className="ttb-card-num">{t.ttb.toFixed(1)}</span>
                      <span className="ttb-card-unit">yr</span>
                    </>
                  ) : (
                    <span className="ttb-card-na">never reached</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-about">
          <p>
            <strong>Note:</strong> This calculator uses a simple closed-form Weibull model
            (<em>S(t) = exp(−(t/λ)<sup>φ</sup>)</em>) with proportional hazards. It runs entirely
            in your browser. Real TTB analyses use Bayesian Weibull models with credible intervals —
            see the methodology page for details.
          </p>
        </section>
      </article>
    </div>
  );
}
