export function Marquee({
  items,
  speed = 42,
  separator = "·",
}: {
  items: string[];
  speed?: number;
  separator?: string;
}) {
  const run = items.join(`  ${separator}  `);
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--kt-border-default)",
        borderBottom: "1px solid var(--kt-border-default)",
        padding: "12px 0",
        background: "var(--kt-surface-page)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `kt-marquee ${speed}s linear infinite`,
          fontFamily: "var(--kt-font-body)",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: "var(--kt-tracking-caps)",
          textTransform: "uppercase",
          color: "var(--kt-text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ paddingRight: "3em" }}>{run}</span>
        <span aria-hidden style={{ paddingRight: "3em" }}>
          {run}
        </span>
      </div>
    </div>
  );
}
