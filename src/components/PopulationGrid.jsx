import './PopulationGrid.css';

const MUTED_DOT = '#cbd5e1';

const VBOX_W = 280;
const VBOX_H = 180;

const LAYOUTS = {
  50: { cols: 10, rows: 5 },
  100: { cols: 10, rows: 10 },
  200: { cols: 20, rows: 10 },
};

export default function PopulationGrid({ nnt, color }) {
  const layout = LAYOUTS[nnt] || { cols: 10, rows: Math.ceil(nnt / 10) };
  const cell = Math.min(VBOX_W / layout.cols, VBOX_H / layout.rows);
  const gridW = cell * layout.cols;
  const gridH = cell * layout.rows;
  const offX = (VBOX_W - gridW) / 2;
  const offY = (VBOX_H - gridH) / 2;
  const dotR = cell * 0.32;
  const highlightR = Math.min(cell * 0.46, dotR + 2.4);
  const highlightIdx = Math.floor(layout.cols / 2) + Math.floor(layout.rows / 2) * layout.cols;

  const dots = [];
  for (let i = 0; i < nnt; i++) {
    const r = Math.floor(i / layout.cols);
    const c = i % layout.cols;
    const cx = offX + c * cell + cell / 2;
    const cy = offY + r * cell + cell / 2;
    const isHighlight = i === highlightIdx;
    dots.push(
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={isHighlight ? highlightR : dotR}
        fill={isHighlight ? color : MUTED_DOT}
        opacity={isHighlight ? 1 : 0.7}
      />
    );
  }

  return (
    <div className="pop-grid-wrapper">
      <div className="pop-grid-caption">
        <span className="pop-grid-num" style={{ color }}>1</span>
        <span className="pop-grid-of"> in </span>
        <span className="pop-grid-num">{nnt}</span>
        <span className="pop-grid-of"> patients benefits</span>
      </div>
      <svg
        viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
        className="pop-grid-svg"
        role="img"
        aria-label={`1 in ${nnt} patients benefits`}
      >
        {dots}
      </svg>
    </div>
  );
}
