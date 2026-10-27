export const Logo = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="shrsh logo">
    <rect x="1" y="1" width="30" height="30" rx="7" fill="#0D1117" stroke="#30363D" strokeWidth="1.5" />
    <path d="M8 10.5 L14 16 L8 21.5" stroke="#10B981" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <rect className="logo-caret" x="16" y="19.5" width="8.5" height="2.6" rx="1" fill="#38BDF8" />
    <circle cx="25" cy="8" r="1.8" fill="#C084FC" />
  </svg>
);
