import { TicketCTA } from "@/components/ui/TicketCTA";

export function CtaBand({
  title,
  accent,
  sub,
  background = "var(--kt-muste)",
  borderTop = true,
}: {
  title: string;
  accent: string;
  sub?: string;
  background?: string;
  borderTop?: boolean;
}) {
  return (
    <section
      id="kt-cta-band"
      className="kt-m-pad"
      style={{
        background,
        borderTop: borderTop ? "1px solid var(--kt-viiva)" : "none",
        padding: "120px 48px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 48,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--kt-font-display)",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "var(--kt-valo)",
              fontSize: "clamp(34px, 4.6vw, 62px)",
              lineHeight: 1.25,
            }}
          >
            {title}
            <br />
            <span style={{ color: "var(--kt-messinki)" }}>{accent}</span>
          </h2>
          {sub && (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--kt-font-display)",
                fontWeight: 400,
                textTransform: "uppercase",
                color: "var(--kt-valo-himmea)",
                fontSize: "clamp(17px, 1.8vw, 24px)",
                lineHeight: 1.25,
              }}
            >
              {sub}
            </p>
          )}
        </div>
        <TicketCTA
          label="PYYDÄ TARJOUS"
          note="100 % TYYTYVÄISYYSTAKUU — JOS ET OLE TYYTYVÄINEN, LASKUA EI TULE"
          width="min(420px, 100%)"
        />
      </div>
    </section>
  );
}
