import Link from "next/link";
import { Rule } from "@/components/ui/Rule";
import { TarjousLink } from "@/components/site/TarjousLink";
import { sectionH2, lead, bodyText } from "./tyylit";

export type OsioCta = { label: string; tyyppi: string };
export type OsioLinkki = { href: string; label: string };

/* Teemasivun osio: Rule-otsake, H2 (luonteva hakulause), johdanto, sisältö ja
   valinnainen painikerivi (lomakkeelle vievä nappi ja sisäinen linkki).
   Painike on joka osiossa, koska kävijä ei vieritä loppu-CTA:han asti. */
export function TeemaOsio({
  id,
  rule,
  ruleRight,
  title,
  intro,
  tumma = false,
  cta,
  linkki,
  children,
}: {
  id?: string;
  rule: string;
  ruleRight?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tumma?: boolean;
  cta?: OsioCta;
  linkki?: OsioLinkki;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="kt-m-pad"
      style={{
        padding: "96px 48px",
        borderBottom: "1px solid var(--kt-viiva)",
        background: tumma ? "var(--kt-muste)" : "var(--kt-yo)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Rule left={rule} right={ruleRight} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "32px 0 48px 0" }}>
          <h2 style={sectionH2}>{title}</h2>
          {intro && <p style={lead}>{intro}</p>}
        </div>
        {children}
        {(cta || linkki) && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px 32px",
              marginTop: 40,
            }}
          >
            {cta && (
              <TarjousLink className="kt-btn-primary" tyyppi={cta.tyyppi}>
                {cta.label}
              </TarjousLink>
            )}
            {linkki && (
              <p style={{ ...bodyText, color: "var(--kt-siniharmaa)" }}>
                <Link href={linkki.href} className="kt-cta-link">
                  {linkki.label}
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
