import './TTBvsNNTVisual.css';

const NAVY = '#1e3a5f';
const BLUE = '#2964c3';
const ACCENT = '#3b82f6';
const MUTED = '#94a3b8';
const MUTED_LINE = '#cbd5e1';
const AXIS_TEXT = '#475569';

const VBOX_W = 340;
const VBOX_H = 220;
const M = { top: 14, right: 16, bottom: 44, left: 52 };
const PL = M.left;
const PR = VBOX_W - M.right;
const PT = M.top;
const PB = VBOX_H - M.bottom;
const PW = PR - PL;
const PH = PB - PT;

const MAX_TIME = 60;
const Y_MAX = 0.025;

const TTBs = [
  { time: 6, arr: 0.005, label: '0.5%', color: '#bfdbfe' },
  { time: 18, arr: 0.010, label: '1.0%', color: '#60a5fa' },
  { time: 48, arr: 0.020, label: '2.0%', color: '#1d4ed8' },
];

const TRIAL_END = 60;
const TRIAL_END_ARR = 0.023;
const NNT_VALUE = Math.round(1 / TRIAL_END_ARR);
const TRIAL_END_PCT = (TRIAL_END_ARR * 100).toFixed(1);

const xToPx = (t) => PL + (t / MAX_TIME) * PW;
const yToPx = (a) => PB - (a / Y_MAX) * PH;

function catmullRomPath(anchors) {
  const ext = [
    [2 * anchors[0][0] - anchors[1][0], 2 * anchors[0][1] - anchors[1][1]],
    ...anchors,
    [
      2 * anchors[anchors.length - 1][0] - anchors[anchors.length - 2][0],
      2 * anchors[anchors.length - 1][1] - anchors[anchors.length - 2][1],
    ],
  ];
  let d = `M ${xToPx(ext[1][0]).toFixed(1)} ${yToPx(ext[1][1]).toFixed(1)}`;
  for (let i = 1; i < ext.length - 2; i++) {
    const p0 = ext[i - 1], p1 = ext[i], p2 = ext[i + 1], p3 = ext[i + 2];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${xToPx(c1x).toFixed(1)} ${yToPx(c1y).toFixed(1)}, ${xToPx(c2x).toFixed(1)} ${yToPx(c2y).toFixed(1)}, ${xToPx(p2[0]).toFixed(1)} ${yToPx(p2[1]).toFixed(1)}`;
  }
  return d;
}

const CURVE_ANCHORS = [
  [0, 0],
  [TTBs[0].time, TTBs[0].arr],
  [TTBs[1].time, TTBs[1].arr],
  [TTBs[2].time, TTBs[2].arr],
  [TRIAL_END, TRIAL_END_ARR],
];

const CURVE_PATH = catmullRomPath(CURVE_ANCHORS);

function PanelFrame({ children, title, subtitle }) {
  return (
    <div className="vs-panel">
      <div className="vs-panel-header">
        <span className="vs-panel-title">{title}</span>
        <span className="vs-panel-subtitle">{subtitle}</span>
      </div>
      <svg viewBox={`0 0 ${VBOX_W} ${VBOX_H}`} className="vs-svg" role="img" aria-label={title}>
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke={MUTED} strokeWidth="0.7" />
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke={MUTED} strokeWidth="0.7" />
        {children}
        <text x={PL + PW / 2} y={PB + 28} fill="#334155" fontSize="11" fontWeight="600" textAnchor="middle">
          Time (months)
        </text>
        <text
          x={14}
          y={PT + PH / 2}
          fill="#334155"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
          transform={`rotate(-90, 14, ${PT + PH / 2})`}
        >
          ARR
        </text>
      </svg>
    </div>
  );
}

function NNTPanel() {
  const xEnd = xToPx(TRIAL_END);
  const yEnd = yToPx(TRIAL_END_ARR);
  return (
    <PanelFrame title="NNT" subtitle="One number at one fixed time">
      <path
        d={CURVE_PATH}
        fill="none"
        stroke={MUTED}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.35"
      />
      <line x1={PL} y1={yEnd} x2={xEnd} y2={yEnd} stroke={ACCENT} strokeWidth="1" strokeDasharray="3 3" opacity="0.85" />
      <line x1={xEnd} y1={yEnd} x2={xEnd} y2={PB} stroke={ACCENT} strokeWidth="1" strokeDasharray="3 3" opacity="0.85" />
      <text x={PL - 6} y={yEnd} fill={ACCENT} fontSize="10" fontWeight="700" textAnchor="end" dominantBaseline="middle">
        {TRIAL_END_PCT}%
      </text>
      <text x={xEnd} y={PB + 14} fill={ACCENT} fontSize="10" fontWeight="700" textAnchor="middle">
        5 yrs
      </text>
      <text x={xToPx(0)} y={PB + 14} fill={AXIS_TEXT} fontSize="10" textAnchor="middle">
        0
      </text>
      <circle cx={xEnd} cy={yEnd} r="5.6" fill="#fff" stroke={ACCENT} strokeWidth="2.6" />
      <rect
        x={xEnd - 110}
        y={yEnd + 16}
        width="100"
        height="50"
        rx="7"
        fill="#eff6ff"
        stroke={ACCENT}
        strokeWidth="1.2"
      />
      <text x={xEnd - 60} y={yEnd + 35} fill={NAVY} fontSize="10.5" fontWeight="600" textAnchor="middle">
        ARR = {TRIAL_END_PCT}% at 5 yrs
      </text>
      <text x={xEnd - 60} y={yEnd + 56} fill={ACCENT} fontSize="17" fontWeight="800" textAnchor="middle">
        NNT = {NNT_VALUE}
      </text>
    </PanelFrame>
  );
}

function TTBPanel() {
  const xTicks = [0, 12, 24, 48, 60];
  return (
    <PanelFrame title="TTB" subtitle="When benefit reaches each threshold">
      {TTBs.map((th) => (
        <line
          key={`th-${th.label}`}
          x1={PL}
          y1={yToPx(th.arr)}
          x2={PR}
          y2={yToPx(th.arr)}
          stroke={th.color}
          strokeWidth="1"
          strokeDasharray="3 2.5"
          opacity="0.85"
        />
      ))}
      <path d={CURVE_PATH} fill="none" stroke={BLUE} strokeWidth="2.4" strokeLinecap="round" />
      {TTBs.map((th) => (
        <g key={`m-${th.label}`}>
          <line
            x1={xToPx(th.time)}
            y1={yToPx(th.arr)}
            x2={xToPx(th.time)}
            y2={PB}
            stroke={th.color}
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0.7"
          />
          <circle cx={xToPx(th.time)} cy={yToPx(th.arr)} r="4.2" fill="#fff" stroke={th.color} strokeWidth="2.2" />
        </g>
      ))}
      {TTBs.map((th) => (
        <text
          key={`tlbl-${th.label}`}
          x={xToPx(th.time)}
          y={PB + 14}
          fill={th.color === '#bfdbfe' ? '#60a5fa' : th.color}
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
        >
          {th.time} mo
        </text>
      ))}
      {xTicks
        .filter((t) => t === 0 || t === 60)
        .map((t) => (
          <text key={`xt-${t}`} x={xToPx(t)} y={PB + 14} fill={AXIS_TEXT} fontSize="10" textAnchor="middle">
            {t}
          </text>
        ))}
    </PanelFrame>
  );
}

export default function TTBvsNNTVisual() {
  return (
    <div className="vs-wrapper">
      <div className="vs-grid">
        <NNTPanel />
        <TTBPanel />
      </div>
      <p className="vs-takeaway">
        Same trial data. <strong>NNT</strong> collapses it to one number at one moment.{' '}
        <strong>TTB</strong> shows the trajectory — when meaningful benefit actually arrives.
      </p>
      <table className="vs-table">
        <thead>
          <tr>
            <th></th>
            <th>NNT</th>
            <th>TTB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Question</th>
            <td>How many to treat?</td>
            <td>How long to treat?</td>
          </tr>
          <tr>
            <th scope="row">Time dimension</th>
            <td>None — fixed at trial end</td>
            <td>Continuous — every time point</td>
          </tr>
          <tr>
            <th scope="row">Clinical use</th>
            <td>Resource allocation</td>
            <td>Initiation &amp; duration decisions</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
