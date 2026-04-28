import './PipelineDiagram.css';

const NAVY = '#1e3a5f';
const BLUE = '#2964c3';
const MUTED = '#94a3b8';
const ACCENT = '#3b82f6';
const RED = '#dc2626';

function StageKM() {
  return (
    <svg viewBox="0 0 140 90" className="stage-svg" aria-hidden="true">
      <line x1="14" y1="76" x2="132" y2="76" stroke={MUTED} strokeWidth="0.8" />
      <line x1="14" y1="10" x2="14" y2="76" stroke={MUTED} strokeWidth="0.8" />
      <path
        d="M 14 16 L 32 16 L 32 24 L 50 24 L 50 30 L 68 30 L 68 40 L 86 40 L 86 48 L 104 48 L 104 58 L 122 58 L 122 66 L 132 66"
        fill="none"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="24" r="2.2" fill={RED} />
      <circle cx="50" cy="30" r="2.2" fill={RED} />
      <circle cx="68" cy="40" r="2.2" fill={RED} />
      <circle cx="86" cy="48" r="2.2" fill={RED} />
      <circle cx="104" cy="58" r="2.2" fill={RED} />
      <circle cx="122" cy="66" r="2.2" fill={RED} />
    </svg>
  );
}

function StageIPD() {
  const dots = [
    [22, 22], [30, 28], [38, 26], [46, 32], [54, 36], [62, 34],
    [70, 42], [78, 46], [86, 44], [94, 52], [102, 56], [110, 58],
    [118, 64], [126, 62],
    [28, 38], [44, 44], [60, 50], [76, 54], [92, 60], [108, 66], [124, 70],
    [36, 18], [56, 24], [74, 30], [98, 38], [116, 50],
  ];
  return (
    <svg viewBox="0 0 140 90" className="stage-svg" aria-hidden="true">
      <line x1="14" y1="76" x2="132" y2="76" stroke={MUTED} strokeWidth="0.8" />
      <line x1="14" y1="10" x2="14" y2="76" stroke={MUTED} strokeWidth="0.8" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill={BLUE} fillOpacity="0.65" />
      ))}
    </svg>
  );
}

function StageWeibull() {
  return (
    <svg viewBox="0 0 140 90" className="stage-svg" aria-hidden="true">
      <line x1="14" y1="76" x2="132" y2="76" stroke={MUTED} strokeWidth="0.8" />
      <line x1="14" y1="10" x2="14" y2="76" stroke={MUTED} strokeWidth="0.8" />
      <path
        d="M 14 16 L 32 16 L 32 24 L 50 24 L 50 30 L 68 30 L 68 40 L 86 40 L 86 48 L 104 48 L 104 58 L 122 58 L 122 66 L 132 66"
        fill="none"
        stroke={MUTED}
        strokeWidth="1.2"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />
      <path
        d="M 14 14 Q 50 22, 75 38 T 132 70"
        fill="none"
        stroke={NAVY}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StageTTB() {
  const ttbX = 75;
  const ttbYTreat = 26;
  const ttbYCtrl = 44;
  const treatPath = 'M 14 14 Q 50 18, 75 26 T 132 44';
  const ctrlPath = 'M 14 14 Q 45 26, 75 44 T 132 70';
  const gapPath = `${treatPath} L 132 70 Q 105 57, 75 44 Q 45 26, 14 14 Z`;
  return (
    <svg viewBox="0 0 140 90" className="stage-svg" aria-hidden="true">
      <line x1="14" y1="76" x2="132" y2="76" stroke={MUTED} strokeWidth="0.8" />
      <line x1="14" y1="10" x2="14" y2="76" stroke={MUTED} strokeWidth="0.8" />
      <path d={gapPath} fill={ACCENT} fillOpacity="0.12" stroke="none" />
      <path d={treatPath} fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
      <path d={ctrlPath} fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
      <line x1={ttbX} y1="10" x2={ttbX} y2="76" stroke={ACCENT} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <line x1={ttbX} y1={ttbYTreat} x2={ttbX} y2={ttbYCtrl} stroke="#1e293b" strokeWidth="1.6" />
      <circle cx={ttbX} cy={ttbYTreat} r="2.4" fill={ACCENT} />
      <circle cx={ttbX} cy={ttbYCtrl} r="2.4" fill={ACCENT} />
      <text x={ttbX - 5} y={ttbYTreat - 4} fill={NAVY} fontSize="9" fontWeight="700" textAnchor="end">TTB</text>
    </svg>
  );
}

const STAGES = [
  {
    key: 'km',
    title: 'Digitize KM Curve',
    caption: 'Extract data points from the published figure.',
    Visual: StageKM,
  },
  {
    key: 'ipd',
    title: 'Reconstruct Patient Data',
    caption: 'Recover individual-level outcomes from the aggregate curve.',
    Visual: StageIPD,
  },
  {
    key: 'weibull',
    title: 'Fit Weibull Model',
    caption: 'Replace the jagged staircase with a smooth parametric curve.',
    Visual: StageWeibull,
  },
  {
    key: 'ttb',
    title: 'Calculate TTB',
    caption: 'Find when the gap between curves crosses a clinical threshold.',
    Visual: StageTTB,
  },
];

function Arrow() {
  return (
    <div className="pipeline-arrow" aria-hidden="true">
      <svg viewBox="0 0 40 24" className="arrow-svg">
        <line x1="2" y1="12" x2="32" y2="12" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
        <polygon points="30,6 38,12 30,18" fill={NAVY} />
      </svg>
    </div>
  );
}

export default function PipelineDiagram() {
  return (
    <div className="pipeline-wrapper">
      <h2 className="pipeline-heading">The 4-Step Pipeline</h2>
      <p className="pipeline-subheading">
        From a published survival curve to a clinically meaningful timeline.
      </p>
      <div className="pipeline-flow">
        {STAGES.map((stage, i) => (
          <div className="pipeline-row" key={stage.key}>
            <div className="pipeline-stage">
              <div className="stage-number">{i + 1}</div>
              <div className="stage-visual">
                <stage.Visual />
              </div>
              <h3 className="stage-title">{stage.title}</h3>
              <p className="stage-caption">{stage.caption}</p>
            </div>
            {i < STAGES.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </div>
  );
}
