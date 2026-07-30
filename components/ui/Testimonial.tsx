export function Testimonial({
  quote,
  name,
  org,
}: {
  quote: string;
  name: string;
  org?: string;
}) {
  return (
    <figure
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        fontFamily: "var(--kt-font-body)",
        maxWidth: 640,
      }}
    >
      <blockquote
        style={{
          margin: 0,
          fontFamily: "var(--kt-font-display)",
          fontWeight: 400,
          textTransform: "uppercase",
          fontSize: 34,
          lineHeight: "var(--kt-leading-poster)",
          letterSpacing: "var(--kt-tracking-display)",
          color: "var(--kt-text-heading)",
        }}
      >
        {quote}
      </blockquote>
      <figcaption
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "var(--kt-tracking-caps)",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "var(--kt-text-accent)" }}>{name}</span>
        {org && <span style={{ color: "var(--kt-text-muted)" }}>· {org}</span>}
      </figcaption>
    </figure>
  );
}
