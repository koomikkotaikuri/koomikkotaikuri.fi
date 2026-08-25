"use client";

import { useState } from "react";
import { Rule } from "@/components/ui/Rule";

type Item = {
  cat: "yritys" | "yksityis" | "tv";
  kicker: string;
  meta: string;
  quote: string;
  name: string;
  org: string;
};

const items: Item[] = [
  {
    cat: "yritys",
    kicker: "Yritysjuhla",
    meta: "500 henkeä",
    quote: "”Otti yli 500 henkisen yleisön haltuun, hämmästytti ja etenkin nauratti koko porukkaa.”",
    name: "Marita Toikka",
    org: "Kouvolan kaupunginjohtaja",
  },
  {
    cat: "yritys",
    kicker: "Pikkujoulut",
    meta: "Yritysilta",
    quote: "”Harvoin näkee yhden illan aikana noin paljon epäuskoisia ja hämmentyneitä ilmeitä.”",
    name: "Jussi Vänttinen",
    org: "Toimitusjohtaja, Orange Advertising",
  },
  {
    cat: "yritys",
    kicker: "Henkilöstöjuhla",
    meta: "NCC Rakennus",
    quote: "”Olit aivan mieletön. Jos joskus sai nauraa, niin nyt.”",
    name: "Päivi Tick",
    org: "Myyntisihteeri, NCC Rakennus Oy",
  },
  {
    cat: "yritys",
    kicker: "Jäsentilaisuus",
    meta: "Kauppakamari",
    quote: "”Interaktiot yleisön kanssa ovat komiikkasi helmi.”",
    name: "Tomi Karvinen",
    org: "Toimistosihteeri, Hämeen Kauppakamari",
  },
  {
    cat: "yritys",
    kicker: "Vuosijuhla",
    meta: "HOAS",
    quote: "”Esitys toi juhlaan juuri sitä ekstraa, mitä kaivattiin.”",
    name: "Jennamaria Pennanen",
    org: "Johdon assistentti, HOAS",
  },
  {
    cat: "yritys",
    kicker: "Harjannostajaiset",
    meta: "Lemminkäinen",
    quote: "”Asukkaat sanoivat, etteivät ole näin hauskoissa harjannostajaisissa ennen käyneet.”",
    name: "Mia Siiropää",
    org: "Lemminkäinen",
  },
  {
    cat: "yksityis",
    kicker: "Merkkipäivä",
    meta: "60v juhlat",
    quote: "”Ammattilainen on aina ammattilainen. Tätä muistellaan vielä pitkään!”",
    name: "Susanna Mattsson",
    org: "60v juhlat",
  },
  {
    cat: "yksityis",
    kicker: "Yhdistysjuhla",
    meta: "Piikkiön VPK",
    quote: "”Meillä on ollut juhlissa koomikoita, taikureita ja mentalisteja. Tämä yhdistelmä toimi parhaiten.”",
    name: "Eelis Pärssinen",
    org: "Piikkiön VPK",
  },
  {
    cat: "tv",
    kicker: "TV ja artistit",
    meta: "Nelonen Media",
    quote: "”JP Pirinen taikoo v*ttu oikeesti.”",
    name: "Kimmo Laiho aka Elastinen",
    org: "Artisti",
  },
  {
    cat: "tv",
    kicker: "TV ja artistit",
    meta: "Radio Nova",
    quote: "”Mitähän helv***tiä just tapahtui? Eihän toi oo mahdollista”",
    name: 'Jari "Jaajo" Linnonmaa',
    org: "Juontaja",
  },
];

const filters = [
  { id: "kaikki", label: "Kaikki" },
  { id: "yritys", label: "Yritystilaisuudet" },
  { id: "yksityis", label: "Juhlat ja yhdistykset" },
  { id: "tv", label: "TV ja artistit" },
] as const;

export function Suositukset() {
  const [filter, setFilter] = useState<string>("kaikki");
  const visible = filter === "kaikki" ? items : items.filter((i) => i.cat === filter);

  return (
    <>
      <Rule left="MITÄ TILAAJAT SANOVAT" right={`${visible.length} / ${items.length} suositusta`} />
      <h2 style={{ margin: "40px 0 12px 0", fontSize: "clamp(30px, 3.4vw, 52px)", lineHeight: 1.25 }}>
        Katso oman
        <br />
        <span style={{ color: "var(--kt-messinki)" }}>tilaisuutesi kaltaiset</span>
      </h2>
      <p
        style={{
          margin: "0 0 40px 0",
          maxWidth: 560,
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--kt-valo-himmea)",
          textWrap: "pretty",
        }}
      >
        Valitse tilaisuustyyppi, niin näet suositukset juuri sellaisista tilaisuuksista.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                fontFamily: "var(--kt-font-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                borderRadius: 2,
                padding: "10px 16px",
                cursor: "pointer",
                transition: "all var(--kt-duration-fast) var(--kt-ease)",
                background: active ? "var(--kt-messinki)" : "transparent",
                color: active ? "var(--kt-yo)" : "var(--kt-siniharmaa)",
                border: active ? "1px solid var(--kt-messinki)" : "1px solid var(--kt-viiva)",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
          gap: 24,
        }}
      >
        {visible.map((t) => (
          <figure
            key={t.name}
            style={{
              margin: 0,
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <span
                style={{
                  fontFamily: "var(--kt-font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--kt-messinki)",
                }}
              >
                {t.kicker}
              </span>
              <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--kt-siniharmaa)" }}>
                {t.meta}
              </span>
            </div>
            <blockquote style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "var(--kt-valo)", textWrap: "pretty" }}>
              {t.quote}
            </blockquote>
            <figcaption style={{ marginTop: "auto", borderTop: "1px solid var(--kt-viiva)", paddingTop: 16 }}>
              <div
                style={{
                  fontFamily: "var(--kt-font-display)",
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: 1.25,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--kt-valo)",
                }}
              >
                {t.name}
              </div>
              <div style={{ fontFamily: "var(--kt-font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--kt-siniharmaa)", marginTop: 6 }}>
                {t.org}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
