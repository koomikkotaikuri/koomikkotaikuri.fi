import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { Rule } from "@/components/ui/Rule";

export const metadata: Metadata = pageMetadata({
  title: "Laskutus- ja peruutusehdot — Koomikkotaikuri JP Pirinen",
  description:
    "Koomikkotaikuri JP Pirisen peruutusehdot ja laskutusehdot: maksuton peruutus 30 vrk ennen tilaisuutta, laskutus tilaisuuden jälkeen 7 vrk netto.",
  path: "/ehdot",
});

type Kohta = { otsikko: string; teksti: string };

const peruutus: Kohta[] = [
  {
    otsikko: "Yli 30 vrk ennen",
    teksti: "Esityksen voi peruuttaa ilman kuluja viimeistään 30 vuorokautta ennen tilaisuutta.",
  },
  {
    otsikko: "15–30 vrk ennen",
    teksti: "Peruutettaessa laskutetaan puolet sovitun paketin hinnasta.",
  },
  {
    otsikko: "Alle 2 viikkoa ennen",
    teksti: "Peruutettaessa esiintyminen laskutetaan kokonaisuudessaan.",
  },
  {
    otsikko: "Juhlat siirtyvät",
    teksti:
      "Jos juhlat siirtyvät, esityksen voi tilata uudelle päivälle kuuden kuukauden sisällä. Jo laskutettu summa hyvitetään uuden tilaisuuden laskussa.",
  },
  {
    otsikko: "Jos minä joudun perumaan",
    teksti: "Jos joudun perumaan sairauden vuoksi, sitoudun löytämään tilalle yhtä tasokkaan esiintyjän.",
  },
];

const laskutus: Kohta[] = [
  {
    otsikko: "Laskutus",
    teksti: "Esitys laskutetaan tilaisuuden jälkeen seuraavana arkipäivänä.",
  },
  {
    otsikko: "Maksuaika",
    teksti: "7 vrk netto, ellei toisin ole sovittu.",
  },
  {
    otsikko: "Hinta",
    teksti: "Tarjouksen hinta on kokonaishinta, joka sisältää kaikki kulut. Hintaan lisätään alv 13,5 %.",
  },
];

function Lista({ otsikko, kohdat }: { otsikko: string; kohdat: Kohta[] }) {
  return (
    <div style={{ marginBottom: 72 }}>
      <Rule left={otsikko} />
      <dl style={{ margin: 0 }}>
        {kohdat.map((k) => (
          <div
            key={k.otsikko}
            className="kt-m-stack"
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: "8px 32px",
              padding: "22px 0",
              borderBottom: "1px solid var(--kt-viiva)",
            }}
          >
            <dt
              style={{
                fontFamily: "var(--kt-font-mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--kt-messinki)",
                paddingTop: 3,
              }}
            >
              {k.otsikko}
            </dt>
            <dd style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
              {k.teksti}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Ehdot() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 72px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="EHDOT" right="Laskutus · peruutukset" />
        <h1
          style={{
            margin: "32px 0 20px 0",
            fontSize: "clamp(40px, 5.4vw, 84px)",
            lineHeight: 1.25,
            maxWidth: 1000,
          }}
        >
          Laskutus- ja <span style={{ color: "var(--kt-messinki)" }}>peruutusehdot</span>
        </h1>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
          Selkeät pelisäännöt molemmille osapuolille. Jos tilanteesi ei sovi näihin, kerro siitä, niin
          sovitaan erikseen.
        </p>
      </section>

      <section className="kt-m-pad-x" style={{ padding: "0 48px 96px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Lista otsikko="PERUUTUSEHDOT" kohdat={peruutus} />
          <Lista otsikko="LASKUTUSEHDOT" kohdat={laskutus} />
          <p style={{ margin: 0, fontFamily: "var(--kt-font-mono)", fontSize: 13, letterSpacing: "0.06em", color: "var(--kt-siniharmaa)" }}>
            JP Pirinen · <a href="mailto:jp@koomikkotaikuri.fi">jp@koomikkotaikuri.fi</a> ·{" "}
            <a href="tel:+358445556669">+358 44 555 6669</a>
          </p>
        </div>
      </section>

      <CtaBand title="Kerro tilaisuudestasi." accent="Saat tarjouksen nopeasti." />

      <Footer />
    </div>
  );
}
