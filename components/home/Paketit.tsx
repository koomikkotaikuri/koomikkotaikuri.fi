"use client";

import { useState } from "react";
import { Rule } from "@/components/ui/Rule";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { scrollToId } from "@/lib/scrollTo";

type Pkg = {
  id: number;
  kicker: string;
  title: string;
  short: string;
  long: string;
  cta: string;
  badge?: boolean;
  wide?: boolean;
  scrollTarget?: string;
};

const packages: Pkg[] = [
  {
    id: 0,
    kicker: "PAKETTI 01",
    title: "Lavalla",
    short: "Stand up ja taikuutta koko salille.",
    long: "Stand upia ja taikuutta lavalta, noin 30–40 minuuttia. Koko sali nauraa yhtä aikaa — myös ne, jotka istuvat takarivissä kädet puuskassa.",
    cta: "Katso lisää →",
  },
  {
    id: 1,
    kicker: "PAKETTI 02",
    title: "Vieraiden joukossa",
    short: "Kiertävä close-up-taikuus pöydissä.",
    long: "Kiertävä close-up-taikuus pöydissä ja vieraiden keskellä, 30–60 minuuttia. Ihmeet tapahtuvat käden ulottuvilla, keskellä omaa seuruetta.",
    cta: "Katso lisää →",
  },
  {
    id: 2,
    kicker: "PAKETTI 03",
    title: "Täysihoito",
    short: "Lavashow ja close-up samassa illassa.",
    long: "Lavashow ja close-up samassa illassa. Tilaat kerran, ja koko illan viihde on hoidettu — sinä ehdit itsekin nauttia omista juhlistasi.",
    cta: "Pyydä tarjous →",
    badge: true,
    scrollTarget: "kt-cta-band",
  },
  {
    id: 3,
    kicker: "PAKETTI 04",
    title: "Juonto",
    short: "Illan juontaja, joka pitää aikataulun kasassa.",
    long: "Juonnan illan alusta loppuun ja pidän aikataulun kasassa. Ohjelmanumerot, palkitsemiset ja tauot kulkevat sujuvasti, ja tunnelma pysyy yllä myös väliaikoina.",
    cta: "Katso lisää →",
    wide: true,
  },
  {
    id: 4,
    kicker: "PAKETTI 05",
    title: "Puheenvuorot & workshopit",
    short: "Puheenvuoro tai workshop päivän teemaan.",
    long: "Puheenvuoro tai workshop koulutuspäivään ja seminaariin. Aiheina esiintyminen, huomion ohjaaminen ja heittäytyminen. Harjoituksia ja nauruja, ei luentokalvoja.",
    cta: "Katso lisää →",
    wide: true,
  },
];

export function Paketit() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ padding: "96px 48px", maxWidth: 1280, margin: "0 auto" }}>
      <Rule left="MITEN SE TOIMII" right="Viisi tapaa tilata" />
      <h2
        style={{
          fontFamily: "var(--kt-font-display)",
          fontWeight: 400,
          textTransform: "uppercase",
          color: "var(--kt-valo)",
          fontSize: "var(--kt-text-2xl)",
          lineHeight: 1.25,
          margin: "40px 0 12px 0",
        }}
      >
        Valitse paketti, <span style={{ color: "var(--kt-messinki)" }}>loput on hoidettu</span>
      </h2>
      <p
        style={{
          maxWidth: 560,
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--kt-valo-himmea)",
          margin: "0 0 56px 0",
        }}
      >
        Jokainen esitys sovitetaan etukäteen juuri teidän tilaisuuteenne ja luetaan livenä lavalta. Hinnat
        kerromme tarjouksessa, kun tiedämme mitä olette järjestämässä.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: "72px 56px",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px 0",
        }}
      >
        {packages.map((pkg) => {
          const isHovered = hovered === pkg.id;
          return (
            <div
              key={pkg.id}
              onMouseEnter={() => setHovered(pkg.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 22,
                cursor: "pointer",
                height: pkg.wide ? 360 : 520,
                width: "100%",
                justifySelf: "center",
                gridColumn: pkg.wide ? "span 3" : "span 2",
                transform: isHovered ? (pkg.wide ? "scale(1.05)" : "scale(1.09)") : "scale(1)",
                border: pkg.badge ? "2px solid var(--kt-messinki)" : "1px solid var(--kt-viiva)",
                transformOrigin: "center center",
                zIndex: isHovered ? 3 : 1,
                boxShadow: isHovered
                  ? "0 40px 80px -20px rgba(0,0,0,0.75), 0 0 44px rgba(227,178,60,0.20)"
                  : "0 26px 50px -18px rgba(0,0,0,0.65), 0 0 24px rgba(227,178,60,0.07)",
                transition:
                  "transform 280ms cubic-bezier(.2,0,0,1), box-shadow 280ms cubic-bezier(.2,0,0,1)",
                background: "var(--kt-paneeli)",
              }}
            >
              {pkg.badge && (
                <div style={{ position: "absolute", top: 16, right: 16, zIndex: 4 }}>
                  <Badge variant="brass">Suosituin</Badge>
                </div>
              )}
              <ImagePlaceholder label="Kuva tai video paketista" />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(19,26,38,0) 30%, rgba(19,26,38,0.55) 68%, rgba(19,26,38,0.94) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2, padding: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--kt-font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--kt-messinki)",
                    marginBottom: 8,
                  }}
                >
                  {pkg.kicker}
                </div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontFamily: "var(--kt-font-display)",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    color: "var(--kt-valo)",
                    fontSize: 26,
                    lineHeight: 1.2,
                  }}
                >
                  {pkg.title}
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "var(--kt-valo-himmea)" }}>
                  {pkg.short}
                </p>
                <div
                  style={{
                    maxHeight: isHovered ? 320 : 0,
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? 12 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 260ms cubic-bezier(.2,0,0,1), opacity 220ms cubic-bezier(.2,0,0,1), margin-top 260ms cubic-bezier(.2,0,0,1)",
                  }}
                >
                  <p style={{ margin: "0 0 16px 0", fontSize: 14, lineHeight: 1.6, color: "var(--kt-valo-himmea)" }}>
                    {pkg.long}
                  </p>
                  <a
                    href={pkg.scrollTarget ? undefined : "#"}
                    onClick={(e) => {
                      if (pkg.scrollTarget) {
                        e.preventDefault();
                        scrollToId(pkg.scrollTarget);
                      }
                    }}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--kt-messinki)",
                      borderBottom: "none",
                    }}
                  >
                    {pkg.cta}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
