"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Rule } from "@/components/ui/Rule";

const photos = [
  {
    src: "/images/muotokuva-korttitaika-02-vari.webp",
    file: "jp-pirinen-muotokuva-pysty.webp",
    ratio: "3 / 4",
    title: "Muotokuva, pysty",
    meta: "Studio · Kersti Niglas · painokelpoinen",
  },
  {
    src: "/images/lahikuva-hiiret-03-web.webp",
    file: "jp-pirinen-muotokuva-vaaka.webp",
    ratio: "4 / 3",
    title: "Muotokuva, vaaka",
    meta: "Studio · rekvisiitta mukana",
  },
  {
    src: "/images/lava-esitys-yleiso-01.webp",
    file: "jp-pirinen-lavakuva.webp",
    ratio: "4 / 3",
    title: "Lavalla",
    meta: "Tapahtumakuva · yleisö näkyvissä",
  },
  {
    src: "/images/toiminta-korttiheitto-02-web.webp",
    file: "jp-pirinen-closeup.webp",
    ratio: "4 / 3",
    title: "Vieraiden joukossa",
    meta: "Studio · close-up-taikuutta",
  },
  {
    src: "/images/lava-esitys-yleiso-08.webp",
    file: "jp-pirinen-yleiso.webp",
    ratio: "4 / 3",
    title: "Yleisön reaktio",
    meta: "Tapahtumakuva · Helsinki Magic Show",
  },
  {
    src: "/images/lava-esitys-yleiso-04.webp",
    file: "jp-pirinen-bannerikuva.webp",
    ratio: "16 / 9",
    title: "Bannerikuva",
    meta: "Vaakakuva · nettiin ja näytöille",
  },
];

const bios = [
  {
    id: "lyhyt",
    title: "Lyhyt",
    length: "noin 25 sanaa",
    text: "Koomikkotaikuri JP Pirinen yhdistää stand upin ja taikuuden esitykseksi, joka ensin hämmentää ja sitten naurattaa. Yli 1500 tilaisuutta, 28 vuotta lavalla.",
  },
  {
    id: "keski",
    title: "Keskipitkä",
    length: "noin 55 sanaa",
    text: "Koomikkotaikuri JP Pirinen on esiintynyt yli 1500 tilaisuudessa 28 vuoden aikana. Hän yhdistää stand up -komiikan ja taikuuden yhdeksi esitykseksi, jossa yleisö ensin hämmentyy ja sitten nauraa. Esitys sovitetaan aina etukäteen tilaisuuteen ja luetaan livenä lavalta. Asiakkaina muun muassa NCC, Sokos Hotels, HOAS, Kouvolan kaupunki ja Hämeen Kauppakamari.",
  },
  {
    id: "pitka",
    title: "Pitkä",
    length: "noin 95 sanaa",
    text: "Koomikkotaikuri JP Pirinen aloitti uransa vuonna 1998, 18-vuotiaana, ja on tehnyt sitä ammatikseen 28 vuotta ja yli 1500 tilaisuutta. Hänen esityksensä yhdistää stand up -komiikan ja taikuuden: yleisö hämmentyy, yllättyy, nauraa ja ihmettelee vielä seuraavana päivänä. Pääosa tilaisuuksista on yritystilaisuuksia, joissa yleisönä on työkavereita - siksi materiaali sovitetaan etukäteen ja tunnelma luetaan livenä lavalta. Hänet on nähty muun muassa ohjelmissa Neljän tähden illallinen, Krissen kotibileet, Kaikki vastaan yksi ja LEGO Masters Suomi. JP Pirinen asuu Kouvolassa ja esiintyy ympäri Suomen.",
  },
];

const tech = [
  { label: "Kesto", value: "Lavashow 30-40 min, close-up 30-60 min, juonto koko illan" },
  { label: "Lava", value: "Vähintään 3 x 2 m vapaata tilaa, tasainen alusta" },
  { label: "Ääni", value: "Langaton mikrofoni ja äänentoisto salin kokoon nähden, tarvittaessa oma järjestelmä mukana" },
  { label: "Valo", value: "Esiintyjä valaistuna, sali himmennettynä" },
  { label: "Saapuminen", value: "Paikalla viimeistään tuntia ennen esitystä, soundcheck sovitaan etukäteen" },
  { label: "Muuta", value: "Pukeutumistila tai erillinen huone, pysäköinti kaluston purkua varten" },
];

const downloadBtn: React.CSSProperties = {
  flex: "none",
  fontFamily: "var(--kt-font-body)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  background: "transparent",
  color: "var(--kt-messinki)",
  border: "1px solid var(--kt-viiva)",
  borderRadius: 2,
  padding: "9px 14px",
  cursor: "pointer",
  transition: "all var(--kt-duration-fast) var(--kt-ease)",
};

export function MediaSisalto() {
  const [copied, setCopied] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const statusTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(statusTimer.current);
      clearTimeout(copyTimer.current);
    },
    []
  );

  const say = (msg: string) => {
    setStatus(msg);
    clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(""), 2600);
  };

  const copy = (text: string, key: string) => {
    const done = () => {
      setCopied(key);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(null), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      done();
    }
  };

  const download = (src: string, file: string) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <section className="kt-m-pad-x" style={{ padding: "24px 48px 96px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="KUVAT" right="Painokelpoiset kuvat vapaaseen käyttöön" />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, margin: "32px 0 40px 0" }}>
          <button
            onClick={() => {
              photos.forEach((p, i) => setTimeout(() => download(p.src, p.file), i * 350));
              say("Ladataan kaikki " + photos.length + " kuvaa…");
            }}
            className="kt-btn-primary"
            style={{ padding: "14px 28px", fontSize: 13 }}
          >
            Lataa kaikki kuvat
          </button>
          <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--kt-siniharmaa)" }}>
            {status || `${photos.length} kuvaa · vapaasti käytettävissä kuvaajan nimi mainiten`}
          </span>
        </div>
        <div className="kt-m-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "32px 24px" }}>
          {photos.map((p) => (
            <div key={p.file} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  position: "relative",
                  background: "var(--kt-paneeli)",
                  border: "1px solid var(--kt-viiva)",
                  aspectRatio: p.ratio,
                }}
              >
                <Image src={p.src} alt={p.title} fill sizes="(max-width: 1280px) 33vw, 420px" style={{ objectFit: "cover" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 16,
                  borderTop: "1px solid var(--kt-viiva)",
                  paddingTop: 14,
                  marginTop: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--kt-font-display)",
                      fontWeight: 400,
                      fontSize: 20,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      color: "var(--kt-valo)",
                      lineHeight: 1.25,
                    }}
                  >
                    {p.title}
                  </div>
                  <div style={{ fontFamily: "var(--kt-font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--kt-siniharmaa)", marginTop: 6 }}>
                    {p.meta}
                  </div>
                </div>
                <a href={p.src} download={p.file} style={{ ...downloadBtn, textDecoration: "none" }}>
                  Lataa
                </a>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: "40px 0 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--kt-siniharmaa)", maxWidth: 560 }}>
          Kuvat: Kersti Niglas ja tapahtumakuvaajat. Käyttöehdot: kuvia saa käyttää tilaisuuden
          markkinointiin ja mediassa, kuvaajan nimi mainiten. Rajaus on sallittu, muu muokkaus ei.
        </p>
      </section>

      <section
        style={{
          background: "var(--kt-muste)",
          borderTop: "1px solid var(--kt-viiva)",
          borderBottom: "1px solid var(--kt-viiva)",
          padding: "96px 48px",
        }}
        className="kt-m-pad"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Rule left="ESITTELYTEKSTIT" right="Kopioi suoraan ohjelmaan tai kutsuun" />
          <div
            className="kt-m-stack"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 24,
              marginTop: 56,
              alignItems: "start",
            }}
          >
            {bios.map((b) => (
              <div
                key={b.id}
                style={{
                  background: "var(--kt-paneeli)",
                  border: "1px solid var(--kt-viiva)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 26, lineHeight: 1.25 }}>{b.title}</h3>
                  <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--kt-siniharmaa)" }}>
                    {b.length}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.62, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
                  {b.text}
                </p>
                <button
                  onClick={() => copy(b.text, b.id)}
                  className="kt-btn-secondary"
                  style={{ alignSelf: "flex-start", fontSize: 11, padding: "10px 18px" }}
                >
                  {copied === b.id ? "Kopioitu" : "Kopioi teksti"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kt-m-pad" style={{ padding: "96px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="kt-m-stack kt-m-gap-sm" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 64, alignItems: "start" }}>
          <div>
            <Rule left="LOGOT" right="PNG" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 40 }}>
              {[
                {
                  src: "/images/logo-light.png",
                  bg: "var(--kt-paneeli)",
                  label: "Kerma / tumma tausta",
                  file: "koomikkotaikuri-tunnus-kerma.png",
                  alt: "Tunnus kerma",
                },
                {
                  src: "/images/logo.png",
                  bg: "var(--kt-surface-light)",
                  label: "Muste / vaalea tausta",
                  file: "koomikkotaikuri-tunnus-muste.png",
                  alt: "Tunnus muste",
                },
              ].map((logo) => (
                <div key={logo.file} style={{ border: "1px solid var(--kt-viiva)" }}>
                  <div style={{ background: logo.bg, height: 190, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt={logo.alt} style={{ height: 120, width: 120, objectFit: "contain" }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      borderTop: "1px solid var(--kt-viiva)",
                      padding: "14px 16px",
                    }}
                  >
                    <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--kt-siniharmaa)" }}>
                      {logo.label}
                    </span>
                    <a href={logo.src} download={logo.file} className="kt-cta-link" style={{ fontSize: 11 }}>
                      Lataa
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ margin: "24px 0 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--kt-siniharmaa)" }}>
              Tunnuksen ympärille jätetään vapaata tilaa vähintään neljäsosa sen leveydestä. Väreinä vain
              kerma tai muste.
            </p>
          </div>
          <div>
            <Rule left="TEKNISET TIEDOT" right="Mitä paikalla tarvitaan" />
            <div style={{ marginTop: 40, border: "1px solid var(--kt-viiva)" }}>
              {tech.map((row) => (
                <div
                  key={row.label}
                  className="kt-m-stack kt-m-gap-xs"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px minmax(0, 1fr)",
                    gap: 24,
                    padding: "16px 20px",
                    borderBottom: "1px solid var(--kt-viiva)",
                  }}
                >
                  <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--kt-messinki)" }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: 15, lineHeight: 1.55, color: "var(--kt-valo-himmea)" }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 32 }}>
              <button
                onClick={() => copy(tech.map((t) => `${t.label}: ${t.value}`).join("\n"), "tech")}
                className="kt-btn-secondary"
                style={{ fontSize: 12, padding: "14px 24px" }}
              >
                {copied === "tech" ? "Kopioitu" : "Kopioi tekniset tiedot"}
              </button>
              <a
                href="mailto:jp@koomikkotaikuri.fi"
                className="kt-cta-link"
                style={{ border: "1px solid var(--kt-viiva)", borderRadius: 2, padding: "14px 24px" }}
              >
                Kysy lisää
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
