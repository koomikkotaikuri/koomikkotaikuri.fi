"use client";

import { useState } from "react";
import Image from "next/image";

type Pkg = {
  id: number;
  title: string;
  short: string;
  desc: string;
  img: string;
  imgAlt: string;
  video?: string;
  wide?: boolean;
  href: string;
};

// Every card links to its own section on /palvelut; none opens the quote form,
// so a visitor can read on before deciding to ask for an offer.
const packages: Pkg[] = [
  {
    id: 0,
    title: "Lavalla",
    short: "30–40 minuuttia komiikkaa, taikuutta ja yhteistä naurua.",
    desc: "Omakohtaisia tarinoita, komiikkaa ja taikuutta, jotka kietoutuvat yhdeksi älyttömän hauskaksi esitykseksi. Noin 30–40 minuuttia naurua, hämmästystä ja yllätyksiä. Myös sille takarivin vakavalle kaverille.",
    img: "/images/lava-esitys-yleiso-06.webp",
    imgAlt: "JP Pirinen lavalla, mikki päässä",
    video: "/videos/lavalla-pysty-video-720p.mp4",
    href: "/palvelut#kt-p1",
  },
  {
    id: 1,
    title: "Vieraiden joukossa",
    short: "Taikuutta aivan silmien edessä ja yllätyksiä keskellä juhlaväkeä.",
    desc: "Kiertävää taikuutta pöydissä ja vieraiden keskellä. Uskomattomia asioita tapahtuu aivan käden ulottuvilla, joskus jopa vieraiden omissa käsissä. Mainio tapa rikkoa jäätä ja saada keskustelut käyntiin.",
    img: "/images/toiminta-korttiheitto-02-web.webp",
    imgAlt: "Close-up-taikuutta käden ulottuvilla",
    href: "/palvelut#kt-p2",
  },
  {
    id: 2,
    title: "Täysihoito",
    short: "Lähitaikuutta ja lavashow samassa illassa. Kaksi tapaa saada vieraat viihtymään.",
    desc: "Taikuutta vieraiden joukossa alkuillasta ja yhteinen lavashow illan kohokohtana. Kokonaisuutta voidaan täydentää myös juonnolla. Sinä nautit juhlista, minä huolehdin viihteestä.",
    img: "/images/lava-esitys-yleiso-08.webp",
    imgAlt: "Koko illan show käynnissä",
    href: "/palvelut#kt-p3",
  },
  {
    id: 3,
    title: "Juontajana",
    short: "Sujuvaa juontoa, sopivasti huumoria ja pilkettä silmäkulmassa.",
    desc: "Pidän illan ohjelman liikkeessä, huolehdin sujuvista siirtymistä ja tuon tilanteisiin sopivasti huumoria. Palkitsemiset, puheenvuorot ja ohjelmanumerot saavat arvoisensa huomion ilman, että tunnelma katoaa niiden välissä.",
    img: "/images/juonto-lavakuva-summerslam-01-web.webp",
    imgAlt: "JP Pirinen juontaa lavalla, mikki päässä",
    wide: true,
    href: "/palvelut#kt-p4",
  },
  {
    id: 4,
    title: "Työpajat ja puheenvuorot",
    short: "Osallistavaa tekemistä, uusia oivalluksia ja hauskoja hetkiä yhdessä.",
    desc: "Taikatyöpajoja, ilmapallotyöpajoja ja erilaisia puheenvuoroja. Vaihtoehtoja henkilöstöpäiviin, koulutuksiin ja tapahtumiin, joissa halutaan osallistua, oppia uutta tai katsoa tuttuja asioita hieman eri kulmasta.",
    img: "/images/koulutus-workshop-01-web.webp",
    imgAlt: "Workshop-tunnelmaa, ryhmä sohvilla läppärien kanssa",
    wide: true,
    href: "/palvelut#kt-p5",
  },
];

export function Paketit() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="kt-m-pad" style={{ padding: "96px 48px", maxWidth: 1280, margin: "0 auto" }}>
      <h2
        style={{
          fontFamily: "var(--kt-font-display)",
          fontWeight: 400,
          textTransform: "uppercase",
          color: "var(--kt-valo)",
          fontSize: "var(--kt-text-2xl)",
          lineHeight: 1.25,
          margin: "0 0 12px 0",
        }}
      >
        Monta tapaa saada <span style={{ color: "var(--kt-messinki)" }}>porukka viihtymään</span>
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
        Lavalla, vieraiden joukossa tai vaikka koko illan mukana. Tässä muutama esimerkki siitä, mitä kaikkea
        voidaan toteuttaa. Mietitään yhdessä, mikä toimisi parhaiten juuri teidän tilaisuudessanne.
      </p>
      <div
        className="kt-m-gap-sm"
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
              className={pkg.wide ? "kt-pkg-card kt-pkg-card-wide" : "kt-pkg-card"}
              onMouseEnter={() => setHovered(pkg.id)}
              onMouseLeave={() => setHovered(null)}
              // keyboard: tabbing to the card's link opens it like a hover does
              onFocus={() => setHovered(pkg.id)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(null);
              }}
              onClick={() => {
                if (window.matchMedia("(hover: none)").matches) {
                  setHovered(isHovered ? null : pkg.id);
                }
              }}
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
                border: "1px solid var(--kt-viiva)",
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
              {pkg.video ? (
                <video
                  src={pkg.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={pkg.imgAlt}
                  className="kt-pkg-media"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  src={pkg.img}
                  alt={pkg.imgAlt}
                  fill
                  className="kt-pkg-media"
                  sizes="(max-width: 1280px) 50vw, 640px"
                  style={{ objectFit: "cover" }}
                />
              )}
              <div
                className="kt-pkg-grad"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(19,26,38,0) 30%, rgba(19,26,38,0.55) 68%, rgba(19,26,38,0.94) 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* extra shade that fades in with the long description so it stays readable */}
              <div
                className="kt-pkg-shade"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(19,26,38,0) 15%, rgba(19,26,38,0.6) 50%, rgba(19,26,38,0.9) 100%)",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 260ms cubic-bezier(.2,0,0,1)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="kt-pkg-text"
                style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2, padding: 24 }}
              >
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
                <p
                  className="kt-pkg-short"
                  style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "var(--kt-valo-himmea)" }}
                >
                  {pkg.short}
                </p>
                <div
                  className="kt-pkg-more"
                  style={{
                    maxHeight: isHovered ? 320 : 0,
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? 12 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 260ms cubic-bezier(.2,0,0,1), opacity 220ms cubic-bezier(.2,0,0,1), margin-top 260ms cubic-bezier(.2,0,0,1)",
                  }}
                >
                  <p
                    className="kt-pkg-long"
                    style={{ margin: "0 0 16px 0", fontSize: 14, lineHeight: 1.6, color: "var(--kt-valo-himmea)" }}
                  >
                    {pkg.desc}
                  </p>
                  <a
                    href={pkg.href}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--kt-messinki)",
                      borderBottom: "none",
                    }}
                  >
                    Tutustu →
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
