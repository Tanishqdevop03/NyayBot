const AshokaChakra = ({ className = "" }) => {
  const spokes = 24;
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="2" opacity="0.15" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
      <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.08" />
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i * 360) / spokes;
        const rad = (angle * Math.PI) / 180;
        const x2 = 100 + 78 * Math.cos(rad);
        const y2 = 100 + 78 * Math.sin(rad);
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.1"
          />
        );
      })}
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = ((i + 0.5) * 360) / spokes;
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + 88 * Math.cos(rad);
        const cy = 100 + 88 * Math.sin(rad);
        return <circle key={`dot-${i}`} cx={cx} cy={cy} r="2" fill="currentColor" opacity="0.08" />;
      })}
    </svg>
  );
};

export default AshokaChakra;
