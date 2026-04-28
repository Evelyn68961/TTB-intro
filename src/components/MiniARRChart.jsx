import { useMemo } from 'react';
import './MiniARRChart.css';

const NAVY = '#1e3a5f';
const BLUE = '#2964c3';
const MUTED_LINE = '#cbd5e1';
const AXIS_TEXT = '#475569';

const SVG_W = 520;
const SVG_H = 240;
const M = { top: 18, right: 96, bottom: 46, left: 56 };
const PLOT_LEFT = M.left;
const PLOT_RIGHT = SVG_W - M.right;
const PLOT_TOP = M.top;
const PLOT_BOTTOM = SVG_H - M.bottom;
const PLOT_W = PLOT_RIGHT - PLOT_LEFT;
const PLOT_H = PLOT_BOTTOM - PLOT_TOP;

const THRESHOLDS = [
  { arr: 0.002, label: '0.2%', color: '#bfdbfe', nnt: 500 },
  { arr: 0.005, label: '0.5%', color: '#60a5fa', nnt: 200 },
  { arr: 0.010, label: '1.0%', color: '#1d4ed8', nnt: 100 },
];

const Y_MAX_ARR = 0.014;

function catmullRomPath(anchors, xToPx, yToPx) {
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
    const p0 = ext[i - 1];
    const p1 = ext[i];
    const p2 = ext[i + 1];
    const p3 = ext[i + 2];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${xToPx(c1x).toFixed(1)} ${yToPx(c1y).toFixed(1)}, ${xToPx(c2x).toFixed(1)} ${yToPx(c2y).toFixed(1)}, ${xToPx(p2[0]).toFixed(1)} ${yToPx(p2[1]).toFixed(1)}`;
  }
  return d;
}

export default function MiniARRChart({ data, unit, maxTime, label }) {
  const { curvePath, xTicks, formatTick } = useMemo(() => {
    const xToPx = (t) => PLOT_LEFT + (t / maxTime) * PLOT_W;
    const yToPx = (arr) => PLOT_BOTTOM - (Math.min(arr, Y_MAX_ARR) / Y_MAX_ARR) * PLOT_H;

    const p2 = data[1];
    const p3 = data[2];
    const tailSlope = (p3.arr - p2.arr) / (p3.time - p2.time);
    const tailExtrapolated = p3.arr + tailSlope * (maxTime - p3.time) * 0.6;

    const anchors = [
      [0, 0],
      [data[0].time, data[0].arr],
      [data[1].time, data[1].arr],
      [data[2].time, data[2].arr],
      [maxTime, Math.max(p3.arr, tailExtrapolated)],
    ];

    const curvePath = catmullRomPath(anchors, xToPx, yToPx);

    const tickCount = 5;
    const xTicks = [];
    for (let i = 0; i <= tickCount; i++) {
      xTicks.push((i / tickCount) * maxTime);
    }

    const formatTick = (t) => {
      if (maxTime <= 5) return t.toFixed(1);
      return Math.round(t).toString();
    };

    return { curvePath, xTicks, formatTick };
  }, [data, maxTime]);

  const xToPx = (t) => PLOT_LEFT + (t / maxTime) * PLOT_W;
  const yToPx = (arr) => PLOT_BOTTOM - (arr / Y_MAX_ARR) * PLOT_H;

  const yTicks = [0, 0.002, 0.005, 0.010];

  return (
    <figure className="mini-arr-figure">
      {label && <figcaption className="mini-arr-caption">{label}</figcaption>}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="mini-arr-svg"
        role="img"
        aria-label={`ARR over time chart${label ? ` for ${label}` : ''}`}
      >
        {yTicks.slice(1).map((y) => (
          <line
            key={`yg-${y}`}
            x1={PLOT_LEFT}
            y1={yToPx(y)}
            x2={PLOT_RIGHT}
            y2={yToPx(y)}
            stroke={MUTED_LINE}
            strokeWidth="0.6"
          />
        ))}

        <rect
          x={PLOT_LEFT}
          y={PLOT_TOP}
          width={PLOT_W}
          height={PLOT_H}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="0.8"
        />

        {THRESHOLDS.map((th) => (
          <line
            key={`th-${th.label}`}
            x1={PLOT_LEFT}
            y1={yToPx(th.arr)}
            x2={PLOT_RIGHT}
            y2={yToPx(th.arr)}
            stroke={th.color}
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.85"
          />
        ))}

        <path d={curvePath} fill="none" stroke={BLUE} strokeWidth="2.4" strokeLinecap="round" />

        {data.map((d, i) => {
          const th = THRESHOLDS[i];
          const cx = xToPx(d.time);
          const cy = yToPx(d.arr);
          return (
            <g key={`m-${i}`}>
              <line x1={cx} y1={cy} x2={cx} y2={PLOT_BOTTOM} stroke={th.color} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
              <circle cx={cx} cy={cy} r="4.2" fill="#fff" stroke={th.color} strokeWidth="2.2" />
            </g>
          );
        })}

        {THRESHOLDS.map((th) => (
          <g key={`thlbl-${th.label}`}>
            <text
              x={PLOT_RIGHT + 8}
              y={yToPx(th.arr)}
              fill={th.color === '#bfdbfe' ? '#60a5fa' : th.color}
              fontSize="11"
              fontWeight="700"
              dominantBaseline="middle"
            >
              {th.label}
            </text>
            <text
              x={PLOT_RIGHT + 8}
              y={yToPx(th.arr) + 12}
              fill="#94a3b8"
              fontSize="9.5"
              fontWeight="500"
              dominantBaseline="middle"
            >
              NNT {th.nnt}
            </text>
          </g>
        ))}

        {yTicks.map((y) => (
          <text
            key={`yl-${y}`}
            x={PLOT_LEFT - 8}
            y={yToPx(y)}
            fill={AXIS_TEXT}
            fontSize="10.5"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {(y * 100).toFixed(y === 0 ? 0 : 1)}%
          </text>
        ))}

        {xTicks.map((t, i) => (
          <text
            key={`xl-${i}`}
            x={xToPx(t)}
            y={PLOT_BOTTOM + 14}
            fill={AXIS_TEXT}
            fontSize="10.5"
            textAnchor="middle"
          >
            {formatTick(t)}
          </text>
        ))}

        <text
          x={PLOT_LEFT + PLOT_W / 2}
          y={PLOT_BOTTOM + 32}
          fill="#334155"
          fontSize="11.5"
          fontWeight="600"
          textAnchor="middle"
        >
          Time ({unit})
        </text>
        <text
          x={16}
          y={PLOT_TOP + PLOT_H / 2}
          fill="#334155"
          fontSize="11.5"
          fontWeight="600"
          textAnchor="middle"
          transform={`rotate(-90, 16, ${PLOT_TOP + PLOT_H / 2})`}
        >
          Absolute Risk Reduction
        </text>
      </svg>
    </figure>
  );
}
