import { TicketCTA } from "@/components/ui/TicketCTA";

export function CtaBand() {
  return (
    <section
      id="kt-cta-band"
      style={{
        background: "var(--kt-muste)",
        borderTop: "1px solid var(--kt-viiva)",
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
          Sinä hoidat kutsut.
          <br />
          <span style={{ color: "var(--kt-messinki)" }}>Me hoidamme sen, että ilta muistetaan.</span>
        </h2>
        <TicketCTA
          label="PYYDÄ TARJOUS"
          note="100 % TYYTYVÄISYYSTAKUU — JOS ET OLE TYYTYVÄINEN, LASKUA EI TULE"
          width="420px"
        />
      </div>
    </section>
  );
}
