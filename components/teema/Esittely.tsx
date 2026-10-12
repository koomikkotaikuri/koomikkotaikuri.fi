import Image from "next/image";
import Link from "next/link";
import { Rule } from "@/components/ui/Rule";
import { kicker, sectionH2, bodyText } from "./tyylit";

/* "Kuka esiintyy": kasvot ja muutama lause kylmälle kävijälle, linkki
   tarkempaan esittelyyn. Kuva vasemmalla, teksti oikealla. */
export function Esittely({
  rule,
  title,
  kappaleet,
  kuva,
  linkki,
}: {
  rule: string;
  title: React.ReactNode;
  kappaleet: string[];
  kuva: { src: string; alt: string; objectPosition?: string };
  linkki: { href: string; label: string };
}) {
  return (
    <section className="kt-m-pad" style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Rule left={rule} />
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: 64,
            alignItems: "center",
            marginTop: 48,
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
            }}
          >
            <Image
              src={kuva.src}
              alt={kuva.alt}
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
              style={{ objectFit: "cover", objectPosition: kuva.objectPosition ?? "center top" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={kicker}>{rule}</div>
            <h2 style={sectionH2}>{title}</h2>
            {kappaleet.map((k) => (
              <p key={k} style={{ ...bodyText, fontSize: 16, maxWidth: 560 }}>
                {k}
              </p>
            ))}
            <p style={{ ...bodyText, marginTop: 8 }}>
              <Link href={linkki.href} className="kt-cta-link">
                {linkki.label}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
