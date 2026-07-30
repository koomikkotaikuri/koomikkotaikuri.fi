export function ImagePlaceholder({
  label,
  style,
}: {
  label: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "var(--kt-surface-panel)",
        border: "1px dashed var(--kt-border-default)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 16,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--kt-font-mono)",
          fontSize: 11,
          lineHeight: 1.5,
          color: "var(--kt-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
