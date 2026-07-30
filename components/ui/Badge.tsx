type BadgeVariant = "brass" | "solid" | "outline" | "success" | "error";

const variants: Record<BadgeVariant, React.CSSProperties> = {
  brass: {
    background: "transparent",
    color: "var(--kt-messinki)",
    border: "1px solid var(--kt-messinki)",
  },
  solid: {
    background: "var(--kt-messinki)",
    color: "var(--kt-text-on-accent)",
    border: "1px solid var(--kt-messinki)",
  },
  outline: {
    background: "transparent",
    color: "var(--kt-text-heading)",
    border: "1px solid var(--kt-border-default)",
  },
  success: {
    background: "transparent",
    color: "var(--kt-success)",
    border: "1px solid var(--kt-success)",
  },
  error: {
    background: "transparent",
    color: "var(--kt-error)",
    border: "1px solid var(--kt-error)",
  },
};

export function Badge({
  variant = "brass",
  children,
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        ...variants[variant],
        borderRadius: 0,
        padding: "5px 10px",
        fontFamily: "var(--kt-font-body)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "var(--kt-tracking-label)",
        textTransform: "uppercase",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
