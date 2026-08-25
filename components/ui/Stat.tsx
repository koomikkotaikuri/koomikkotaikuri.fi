export function Stat({
  value,
  label,
  size = "md",
}: {
  value: string;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const fontSize =
    size === "lg" ? "clamp(40px, 10vw, 62px)" : size === "sm" ? 30 : "clamp(34px, 8vw, 46px)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--kt-font-body)" }}>
      <div
        style={{
          fontFamily: "var(--kt-font-display)",
          fontWeight: 400,
          fontSize,
          lineHeight: 1,
          letterSpacing: "var(--kt-tracking-display)",
          color: "var(--kt-text-accent)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "var(--kt-tracking-caps)",
          textTransform: "uppercase",
          fontWeight: 500,
          color: "var(--kt-text-muted)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
