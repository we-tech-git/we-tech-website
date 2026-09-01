export default function Logo({ size = 20 }) {
  // Grid mark — 3x3, accent on key positions
  // Pattern creates a recognizable "W" diagonal
  const cells = [
    1, 0, 1,
    1, 1, 0,
    0, 1, 0,
  ];

  const cellSize = size / 3;
  const gap = 1.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {cells.map((active, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const s = cellSize - gap;
        return (
          <rect
            key={i}
            x={col * cellSize + gap / 2}
            y={row * cellSize + gap / 2}
            width={s}
            height={s}
            rx={1}
            fill={active ? "var(--accent, #FF4D00)" : "var(--text-faint, #5A5F6B)"}
            opacity={active ? 1 : 0.35}
          />
        );
      })}
    </svg>
  );
}
