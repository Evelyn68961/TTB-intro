import './WhenTTBMatters.css';

const NAVY = '#1e3a5f';
const ACCENT = '#3b82f6';

function ShieldIcon() {
  return (
    <svg viewBox="0 0 48 48" className="when-icon" aria-hidden="true">
      <path
        d="M24 6 L36 11 V22 C36 31 30 38 24 42 C18 38 12 31 12 22 V11 Z"
        fill="#eff6ff"
        stroke={NAVY}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="24" y1="17" x2="24" y2="29" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="18" y1="23" x2="30" y2="23" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg viewBox="0 0 48 48" className="when-icon" aria-hidden="true">
      <line x1="12" y1="8" x2="36" y2="8" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="12" y1="40" x2="36" y2="40" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 8 L24 24 L34 8" fill="none" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 40 L24 24 L34 40" fill="none" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 38 L24 30 L31 38 Z" fill={ACCENT} fillOpacity="0.55" />
      <line x1="24" y1="24" x2="24" y2="30" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19 11 L29 11 L24 18 Z" fill={ACCENT} fillOpacity="0.25" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="when-icon" aria-hidden="true">
      <line x1="24" y1="12" x2="24" y2="40" stroke={NAVY} strokeWidth="2" />
      <line x1="16" y1="40" x2="32" y2="40" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="10" y1="13" x2="38" y2="13" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="10" y1="13" x2="10" y2="20" stroke={NAVY} strokeWidth="1.2" />
      <line x1="38" y1="13" x2="38" y2="20" stroke={NAVY} strokeWidth="1.2" />
      <path d="M5 20 L 15 20 Q 10 27, 5 20 Z" fill="#eff6ff" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M33 20 L 43 20 Q 38 27, 33 20 Z" fill="#eff6ff" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="24" cy="11" r="2.2" fill={ACCENT} />
    </svg>
  );
}

function ConversationIcon() {
  return (
    <svg viewBox="0 0 48 48" className="when-icon" aria-hidden="true">
      <circle cx="14" cy="18" r="5" fill="#eff6ff" stroke={NAVY} strokeWidth="2" />
      <path d="M5 36 Q 14 28, 23 36" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="18" r="5" fill="#eff6ff" stroke={NAVY} strokeWidth="2" />
      <path d="M25 36 Q 34 28, 43 36" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="20" x2="28" y2="20" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="2 2" strokeLinecap="round" />
    </svg>
  );
}

const ITEMS = [
  {
    title: 'Preventive treatments',
    description:
      'Statins, bisphosphonates, antihypertensives — benefit accumulates slowly; patients need time to earn it.',
    Icon: ShieldIcon,
  },
  {
    title: 'Older adults',
    description:
      'When life expectancy is limited, the window to benefit shrinks. A 3-year TTB may not fit a 2-year horizon.',
    Icon: HourglassIcon,
  },
  {
    title: 'High-burden treatments',
    description:
      'Expensive drugs, side effects, complex regimens — the longer the wait, the harder to justify the burden.',
    Icon: ScaleIcon,
  },
  {
    title: 'Shared decision-making',
    description:
      '"This takes about 2 years to help. Given your situation, does that timeline make sense?" — TTB makes the conversation concrete.',
    Icon: ConversationIcon,
  },
];

export default function WhenTTBMatters() {
  return (
    <div className="when-grid">
      {ITEMS.map(({ title, description, Icon }) => (
        <div className="when-card" key={title}>
          <div className="when-icon-wrap">
            <Icon />
          </div>
          <h3 className="when-title">{title}</h3>
          <p className="when-desc">{description}</p>
        </div>
      ))}
    </div>
  );
}
