import { LogoWall, clientLogos, type Logo } from "@/components/site/LogoWall";
import { TeemaOsio, type OsioCta, type OsioLinkki } from "./TeemaOsio";
import { panel } from "./tyylit";

export type Lainaus = { quote: string; name: string; org: string };

/* Todisteet: logoseinä ja asiakaslainaukset. Teemasivu voi rajata logoja
   (esim. Meta-mainonnan vuoksi ilman julkishallintoa). */
export function Todisteet({
  rule,
  title,
  intro,
  logot = clientLogos,
  lainaukset,
  cta,
  lisalinkki,
}: {
  rule: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  logot?: Logo[];
  lainaukset: Lainaus[];
  cta?: OsioCta;
  lisalinkki?: OsioLinkki;
}) {
  return (
    <TeemaOsio rule={rule} title={title} intro={intro} cta={cta} linkki={lisalinkki}>
      <LogoWall logos={logot} scale={0.9} gap="32px 48px" />
      <div
        className="kt-m-stack"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${lainaukset.length}, 1fr)`,
          gap: 24,
          marginTop: 64,
        }}
      >
        {lainaukset.map((l) => (
          <figure key={l.name} style={{ ...panel, margin: 0, gap: 20 }}>
            <blockquote
              style={{
                margin: 0,
                fontFamily: "var(--kt-font-display)",
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(20px, 1.8vw, 24px)",
                lineHeight: 1.25,
                letterSpacing: "var(--kt-tracking-display)",
                color: "var(--kt-valo)",
                textWrap: "pretty",
              }}
            >
              ”{l.quote}”
            </blockquote>
            <figcaption
              style={{
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "var(--kt-tracking-caps)",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "var(--kt-messinki)" }}>{l.name}</span>
              <span style={{ color: "var(--kt-siniharmaa)" }}>{l.org}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </TeemaOsio>
  );
}
