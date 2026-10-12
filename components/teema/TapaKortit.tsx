import { Badge } from "@/components/ui/Badge";
import { TarjousLink } from "@/components/site/TarjousLink";
import { TeemaOsio, type OsioLinkki } from "./TeemaOsio";
import { kicker, bodyText, panel } from "./tyylit";

export type Tapa = {
  kickerText: string;
  title: string;
  text: string;
  bullets: string[];
  badge?: string;
  /* Korttikohtainen painiketeksti; oletuksena osion yhteinen ctaLabel. */
  cta?: string;
};

/* "Kolme tapaa rakentaa ilta": kortit, joissa jokaisessa painike lomakkeelle. */
export function TapaKortit({
  rule,
  ruleRight,
  title,
  intro,
  tavat,
  ctaLabel,
  tyyppi,
  lisalinkki,
}: {
  rule: string;
  ruleRight?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tavat: Tapa[];
  ctaLabel: string;
  tyyppi: string;
  lisalinkki?: OsioLinkki;
}) {
  return (
    <TeemaOsio id="tavat" rule={rule} ruleRight={ruleRight} title={title} intro={intro} linkki={lisalinkki}>
      <div
        className="kt-m-stack"
        style={{ display: "grid", gridTemplateColumns: `repeat(${tavat.length}, 1fr)`, gap: 24 }}
      >
        {tavat.map((tapa) => (
          <div
            key={tapa.title}
            style={{
              ...panel,
              borderTop: tapa.badge ? "6px solid var(--kt-messinki)" : panel.border,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={kicker}>{tapa.kickerText}</span>
              {tapa.badge && <Badge variant="brass">{tapa.badge}</Badge>}
            </div>
            <h3 style={{ margin: 0, fontSize: 26, lineHeight: 1.25 }}>{tapa.title}</h3>
            <p style={bodyText}>{tapa.text}</p>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {tapa.bullets.map((b) => (
                <li key={b} style={{ ...bodyText, color: "var(--kt-siniharmaa)" }}>
                  - {b}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "auto", paddingTop: 8 }}>
              <TarjousLink className={tapa.badge ? "kt-btn-primary" : "kt-btn-secondary"} tyyppi={tyyppi}>
                {tapa.cta ?? ctaLabel}
              </TarjousLink>
            </div>
          </div>
        ))}
      </div>
    </TeemaOsio>
  );
}
