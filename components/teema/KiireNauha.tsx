import { TarjousLink } from "@/components/site/TarjousLink";

/* Lyhyt kiirenauha heron alle: yksi lause ja painike lomakkeelle. */
export function KiireNauha({
  teksti,
  ctaLabel,
  tyyppi,
}: {
  teksti: string;
  ctaLabel: string;
  tyyppi: string;
}) {
  return (
    <section
      className="kt-m-pad-x"
      style={{
        background: "var(--kt-muste)",
        borderTop: "1px solid var(--kt-viiva)",
        borderBottom: "1px solid var(--kt-viiva)",
        padding: "28px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px 32px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--kt-font-display)",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            fontSize: "clamp(18px, 2vw, 26px)",
            lineHeight: 1.25,
            color: "var(--kt-valo)",
            textWrap: "balance",
          }}
        >
          {teksti}
        </p>
        <TarjousLink className="kt-btn-secondary" tyyppi={tyyppi}>
          {ctaLabel}
        </TarjousLink>
      </div>
    </section>
  );
}
