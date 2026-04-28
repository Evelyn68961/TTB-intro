import './PatientComparison.css';

const TTB_MONTHS = 72;

const PATIENTS = [
  {
    name: "Patient A",
    age: 52,
    lifeYears: 30,
    lifeMonths: 360,
    lines: ["52 yrs old", "Life expectancy 30+ yrs"],
    takeaway:
      "Plenty of runway to earn benefit. The 6-year wait is a worthwhile investment.",
  },
  {
    name: "Patient B",
    age: 84,
    lifeYears: 3,
    lifeMonths: 36,
    lines: ["84 yrs old, multimorbid", "Life expectancy ~3 yrs"],
    takeaway:
      "Likely to spend her remaining life on a pill that never helps — only side effects, cost, and burden.",
  },
];

const MAX_YEARS = 32;
const BAR_LEFT = 0;
const BAR_FULL = 560;
const yrsToW = (yrs) => (yrs / MAX_YEARS) * BAR_FULL;

function PatientBar({ patient, barY }) {
  const benefitReached = TTB_MONTHS < patient.lifeMonths;
  const lifeW = yrsToW(patient.lifeYears);
  const ttbW = yrsToW(TTB_MONTHS / 12);
  const benefitW = benefitReached ? lifeW - ttbW : 0;
  const ttbX = BAR_LEFT + ttbW;
  const lifeEndX = BAR_LEFT + lifeW;
  const barH = 36;
  const barR = 6;

  return (
    <g>
      {/* Full-scale faint background */}
      <rect
        x={BAR_LEFT}
        y={barY}
        width={BAR_FULL}
        height={barH}
        rx={barR}
        fill="#e2e8f0"
        opacity={0.35}
      />

      {benefitReached ? (
        <>
          {/* Waiting segment */}
          <rect
            x={BAR_LEFT}
            y={barY}
            width={ttbW}
            height={barH}
            rx={barR}
            fill="#94a3b8"
            opacity={0.4}
          />
          <text
            x={BAR_LEFT + ttbW / 2}
            y={barY + barH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="12"
            fill="#475569"
            fontWeight="500"
          >
            wait
          </text>

          {/* Green benefit segment */}
          <rect
            x={ttbX}
            y={barY}
            width={benefitW}
            height={barH}
            rx={barR}
            fill="#16a34a"
            opacity={0.88}
          />
          <text
            x={ttbX + benefitW / 2}
            y={barY + barH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="14"
            fontWeight="600"
            fill="#dcfce7"
          >
            {Math.round((patient.lifeMonths - TTB_MONTHS) / 12)}+ years of
            benefit
          </text>
        </>
      ) : (
        <>
          {/* Ghost "would-have-been" benefit zone — fills empty post-TTB space */}
          <rect
            x={ttbX}
            y={barY}
            width={BAR_FULL - ttbW}
            height={barH}
            rx={barR}
            fill="#16a34a"
            fillOpacity={0.14}
            stroke="#16a34a"
            strokeOpacity={0.5}
            strokeDasharray="4 3"
            strokeWidth={1.1}
          />
          <text
            x={ttbX + (BAR_FULL - ttbW) / 2}
            y={barY + barH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="12"
            fontWeight="600"
            fill="#15803d"
            fillOpacity={0.75}
            fontStyle="italic"
          >
            benefit zone — never reached
          </text>

          {/* Amber wasted-treatment segment */}
          <rect
            x={BAR_LEFT}
            y={barY}
            width={lifeW}
            height={barH}
            rx={barR}
            fill="#f59e0b"
            opacity={0.75}
          />
          <text
            x={BAR_LEFT + lifeW / 2}
            y={barY + barH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            fontWeight="600"
            fill="#451a03"
          >
            cost
          </text>

          {/* Red life-ends line */}
          <line
            x1={lifeEndX}
            y1={barY - 12}
            x2={lifeEndX}
            y2={barY + barH + 12}
            stroke="#ef4444"
            strokeWidth={2.5}
          />
          <text
            x={lifeEndX}
            y={barY - 18}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#ef4444"
          >
            life ends
          </text>

          {/* "never reached" annotation between life-end and TTB */}
          <line
            x1={lifeEndX + 4}
            y1={barY + barH + 20}
            x2={ttbX - 4}
            y2={barY + barH + 20}
            stroke="#ef4444"
            strokeWidth={1}
            markerStart="url(#arrowL)"
            markerEnd="url(#arrowR)"
          />
          <text
            x={(lifeEndX + ttbX) / 2}
            y={barY + barH + 34}
            textAnchor="middle"
            fontSize="10"
            fontWeight="500"
            fill="#ef4444"
          >
            never reached
          </text>
        </>
      )}

      {/* Dashed TTB marker */}
      <line
        x1={ttbX}
        y1={barY - 12}
        x2={ttbX}
        y2={barY + barH + 12}
        stroke="#1e3a5f"
        strokeWidth={2}
        strokeDasharray="5,3"
      />
      <text
        x={ttbX}
        y={barY - 18}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#1e3a5f"
      >
        TTB: {TTB_MONTHS} mo
      </text>

      {/* Scale ticks */}
      <text
        x={BAR_LEFT}
        y={barY + barH + 16}
        fontSize="8"
        fill="#94a3b8"
      >
        0
      </text>
      {benefitReached && (
        <text
          x={BAR_LEFT + lifeW}
          y={barY + barH + 16}
          textAnchor="end"
          fontSize="8"
          fill="#94a3b8"
        >
          {patient.lifeYears} yr
        </text>
      )}
    </g>
  );
}

export default function PatientComparison() {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        margin: 0,
        padding: 0,
      }}
    >
      {PATIENTS.map((patient, i) => (
        <div
          key={i}
          style={{ marginBottom: i === 0 ? "1.5rem" : "1rem" }}
        >
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "var(--color-text-primary, #1e293b)",
              }}
            >
              {patient.name}
            </div>
            {patient.lines.map((line, j) => (
              <div
                key={j}
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-secondary, #64748b)",
                  lineHeight: 1.4,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "28px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 0", minWidth: 0 }}>
              <svg
                width="100%"
                viewBox="0 0 560 100"
                style={{ overflow: "visible", display: "block" }}
              >
                <defs>
                  <marker
                    id="arrowR"
                    viewBox="0 0 6 6"
                    refX="5"
                    refY="3"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6" fill="#ef4444" />
                  </marker>
                  <marker
                    id="arrowL"
                    viewBox="0 0 6 6"
                    refX="1"
                    refY="3"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M6,0 L0,3 L6,6" fill="#ef4444" />
                  </marker>
                </defs>
                <PatientBar patient={patient} barY={30} />
              </svg>
            </div>

            <div
              style={{
                flex: "0 0 200px",
                fontSize: "0.82rem",
                color: "#475569",
                lineHeight: 1.5,
              }}
            >
              {patient.takeaway}
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          fontSize: "0.9rem",
          color: "#64748b",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "0.9rem",
          marginTop: "1rem",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {[
          { color: "#16a34a", label: "Benefit received" },
          { color: "#f59e0b", label: "Treatment cost, no benefit" },
          { color: "#16a34a", label: "Benefit zone never reached", ghost: true },
        ].map(({ color, label, ghost }) => (
          <span
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: ghost ? "transparent" : color,
                border: ghost ? `1.5px dashed ${color}` : "none",
                display: "inline-block",
                opacity: color === "#f59e0b" ? 0.75 : 0.88,
              }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}


