export const StatusDot = ({ color, label }) => (
  <span className="inline-flex items-center gap-2" style={{ color }}>
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: color }} />
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
    </span>
    {label}
  </span>
);
