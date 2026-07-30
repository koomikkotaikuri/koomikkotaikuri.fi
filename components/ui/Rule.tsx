export function Rule({ left, right }: { left: string; right?: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 24,
        borderBottom: "1px solid var(--kt-border-default)",
        paddingBottom: 10,
        fontFamily: "var(--kt-font-body)",
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: "var(--kt-tracking-caps)",
        textTransform: "uppercase",
        color: "var(--kt-text-muted)",
      }}
    >
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}
