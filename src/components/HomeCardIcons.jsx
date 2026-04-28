const NAVY = '#1e3a5f';
const BLUE = '#2964c3';
const ACCENT = '#3b82f6';
const MUTED = '#94a3b8';
const LIGHT_BLUE = '#bfdbfe';
const MID_BLUE = '#60a5fa';

const VBOX = '0 0 96 64';

export function WhatIsTTBIcon() {
  return (
    <svg viewBox={VBOX} className="card-icon" aria-hidden="true">
      <line x1="8" y1="54" x2="88" y2="54" stroke={MUTED} strokeWidth="0.6" />
      <line x1="8" y1="6" x2="8" y2="54" stroke={MUTED} strokeWidth="0.6" />
      <path
        d="M 8 8 Q 32 12, 50 22 T 88 38"
        fill="none"
        stroke={BLUE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 8 8 Q 28 18, 50 32 T 88 54"
        fill="none"
        stroke={MUTED}
        strokeWidth="2.2"
        strokeDasharray="3 2.5"
        strokeLinecap="round"
      />
      <line x1="50" y1="10" x2="50" y2="54" stroke={ACCENT} strokeWidth="0.9" strokeDasharray="2 2" opacity="0.7" />
      <line x1="50" y1="22" x2="50" y2="32" stroke="#1e293b" strokeWidth="1.4" />
      <circle cx="50" cy="22" r="2.4" fill={ACCENT} />
      <circle cx="50" cy="32" r="2.4" fill={ACCENT} />
    </svg>
  );
}

export function MethodologyIcon() {
  const cx = [16, 40, 64, 88];
  const cy = 32;
  return (
    <svg viewBox={VBOX} className="card-icon" aria-hidden="true">
      {cx.slice(0, -1).map((x, i) => (
        <g key={`a-${i}`}>
          <line x1={x + 6} y1={cy} x2={cx[i + 1] - 8} y2={cy} stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
          <polygon
            points={`${cx[i + 1] - 9},${cy - 2.8} ${cx[i + 1] - 5},${cy} ${cx[i + 1] - 9},${cy + 2.8}`}
            fill={NAVY}
          />
        </g>
      ))}
      {cx.map((x, i) => (
        <g key={`n-${i}`}>
          <circle cx={x} cy={cy} r="6" fill={i === cx.length - 1 ? ACCENT : NAVY} />
          <text
            x={x}
            y={cy + 0.5}
            fill="#fff"
            fontSize="7"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ApplicationsIcon() {
  return (
    <svg viewBox={VBOX} className="card-icon" aria-hidden="true">
      <line x1="10" y1="54" x2="90" y2="54" stroke={MUTED} strokeWidth="0.6" />
      <line x1="10" y1="6" x2="10" y2="54" stroke={MUTED} strokeWidth="0.6" />
      <line x1="10" y1="44" x2="90" y2="44" stroke={LIGHT_BLUE} strokeWidth="0.9" strokeDasharray="3 2" />
      <line x1="10" y1="32" x2="90" y2="32" stroke={MID_BLUE} strokeWidth="0.9" strokeDasharray="3 2" />
      <line x1="10" y1="20" x2="90" y2="20" stroke="#1d4ed8" strokeWidth="0.9" strokeDasharray="3 2" />
      <path
        d="M 10 54 Q 26 50, 38 44 T 60 32 T 90 14"
        fill="none"
        stroke={BLUE}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="38" cy="44" r="2.6" fill="#fff" stroke={LIGHT_BLUE} strokeWidth="1.6" />
      <circle cx="58" cy="32" r="2.6" fill="#fff" stroke={MID_BLUE} strokeWidth="1.6" />
      <circle cx="78" cy="20" r="2.6" fill="#fff" stroke="#1d4ed8" strokeWidth="1.6" />
    </svg>
  );
}

export function DemoIcon() {
  return (
    <svg viewBox={VBOX} className="card-icon" aria-hidden="true">
      <line x1="14" y1="20" x2="82" y2="20" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="20" x2="58" y2="20" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
      <circle cx="58" cy="20" r="6" fill="#fff" stroke={ACCENT} strokeWidth="2.2" />
      <line x1="14" y1="36" x2="82" y2="36" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="36" x2="34" y2="36" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="36" r="6" fill="#fff" stroke={ACCENT} strokeWidth="2.2" />
      <line x1="14" y1="52" x2="82" y2="52" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="52" x2="68" y2="52" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
      <circle cx="68" cy="52" r="6" fill="#fff" stroke={ACCENT} strokeWidth="2.2" />
    </svg>
  );
}
