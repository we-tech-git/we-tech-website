export default function Logo({ size = 22 }) {
  const pattern = [
    "muted",
    "accent",
    "muted",
    "accent",
    "accent",
    "muted",
    "muted",
    "accent",
    "muted",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      {pattern.map((kind, i) => (
        <span
          key={i}
          style={{
            background:
              kind === "accent" ? "#C87D2F" : "rgba(240,244,248,0.18)",
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}
