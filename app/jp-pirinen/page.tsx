import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { TarjousLink } from "@/components/site/TarjousLink";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { Rule } from "@/components/ui/Rule";
import { Stat } from "@/components/ui/Stat";

export const metadata: Metadata = pageMetadata({
  title: "JP Pirinen — Koomikkotaikuri",
  description:
    "Kuka on koomikkotaikuri JP Pirinen: 28 vuotta lavalla, yli 1500 tilaisuutta, stand up ja taikuus samassa esityksessä.",
  path: "/jp-pirinen",
});

const bodyText: React.CSSProperties = {
  maxWidth: 560,
  fontSize: 18,
  lineHeight: 1.62,
  color: "var(--kt-valo-himmea)",
  margin: "20px 0 0 0",
  textWrap: "pretty",
};

const storyText: React.CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.62,
  color: "var(--kt-valo-himmea)",
  textWrap: "pretty",
};

const storyH2: React.CSSProperties = { margin: "0 0 14px 0", fontSize: 30, lineHeight: 1.25 };

const tyotapa = [
  {
    nr: "01",
    title: "Kysyn tilaisuudesta",
    text: "Ketä paikalla on, mihin aikaan illasta esiinnytään ja mitä juhlitaan. Näiden perusteella tiedän jo, mikä paketti sopii ja mikä ei.",
  },
  {
    nr: "02",
    title: "Sovitan esityksen",
    text: "Rakenne, kesto ja sisältö sovitetaan teidän iltaanne. Sovimme etukäteen myös sen, mistä ei vitsailla.",
  },
  {
    nr: "03",
    title: "Hoidan illan",
    text: "Tulen ajoissa, hoidan tekniikan yhdessä paikan väen kanssa ja luen tunnelman lavalta. Sinä ehdit itsekin nauttia illasta.",
  },
];

const tvSpots = ["Neljän tähden illallinen", "Krissen kotibileet", "Kaikki vastaan yksi", "LEGO Masters Suomi"];

export default function JpPirinen() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 96px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="JP PIRINEN" right="Koomikkotaikuri vuodesta 1998" />
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
            gap: 64,
            alignItems: "start",
            marginTop: 56,
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1.25 }}>
              Ensin yleisö hämmentyy. <span style={{ color: "var(--kt-messinki)" }}>Sitten se nauraa.</span>{" "}
              Illan jälkeen puhutaan siitä esiintyjästä, ei siitä, unohtuiko joku puheenvuoro liian pitkäksi.
            </h1>
            <p style={{ ...bodyText, marginTop: 36 }}>
              Olen koomikkotaikuri Juha-Pekka Pirinen, tuttavallisemmin JP. Yhdistän stand up -komiikan ja
              taikuuden samaan esitykseen sen sijaan, että ne olisivat kaksi erillistä numeroa peräkkäin.
              Taito juontaa juurensa ajalta, jolloin esiinnyin myös stand up -klubeilla yhtenä harvoista
              taikureista, jotka tekivät niin. Se näkyy edelleen tavassani lukea yleisöä lavalla.
            </p>
            <p style={bodyText}>
              Ura alkoi vuonna 1998, kun olin 18-vuotias. Ensin esiinnyin lastenjuhlissa ja Kouvolan
              Tykkimäen huvipuistossa, jossa pidin useita esityksiä päivässä pienelle yleisölle. Ammatikseni
              olen tehnyt tätä vuodesta 2005.
            </p>
            <p style={bodyText}>
              Suurin osa esiintymisistäni on yritysten pikkujouluissa, henkilöstötilaisuuksissa,
              asiakastapahtumissa ja vuosijuhlissa. Tilaajana on yleensä ihminen, joka järjestää tällaisen
              illan kerran vuodessa ja kantaa siitä ison henkilökohtaisen vastuun. Minun tehtäväni on ottaa
              se paino pois hänen harteiltaan.
            </p>
            <p style={bodyText}>Asun Kouvolassa, mutta esiinnyn ympäri Suomen, laivoilla ja tarvittaessa myös ulkomailla.</p>
            <p style={bodyText}>
              Yli 28 vuoden aikana olen esiintynyt yli 1500 tilaisuudessa yrityksille, yhteisöille ja
              yksityisille asiakkaille. Jokaisella esiintymisellä on 100 % tyytyväisyystakuu.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 40 }}>
              <TarjousLink className="kt-btn-primary">Pyydä tarjous</TarjousLink>
              <Link href="/media" className="kt-btn-secondary">
                Mediapankki
              </Link>
            </div>
          </div>
          <div
            className="kt-m-static"
            style={{
              position: "sticky",
              top: 96,
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
              aspectRatio: "3 / 4",
            }}
          >
            <Image
              src="/images/muotokuva-korttitaika-02-vari.webp"
              alt="JP Pirinen, muotokuva korttien kanssa"
              fill
              sizes="(max-width: 1280px) 45vw, 540px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--kt-muste)",
          borderTop: "1px solid var(--kt-viiva)",
          borderBottom: "1px solid var(--kt-viiva)",
          padding: "72px 48px",
        }}
        className="kt-m-pad"
      >
        <div
          className="kt-m-cols-2 kt-m-gap-sm"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          <Stat value="28+" label="vuotta lavalla" size="lg" />
          <Stat value="1500+" label="tilaisuutta" size="lg" />
          <Stat value="100 %" label="tyytyväisyystakuu" size="lg" />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div
              style={{
                fontFamily: "var(--kt-font-display)",
                fontWeight: 400,
                textTransform: "uppercase",
                color: "var(--kt-messinki)",
                fontSize: 28,
                lineHeight: 1.2,
              }}
            >
              SM-finalisti 2010
            </div>
            <div style={{ marginTop: 8, fontFamily: "var(--kt-font-mono)", fontSize: 13, letterSpacing: "0.06em", color: "var(--kt-siniharmaa)" }}>
              Viihdeohjelmien
            </div>
          </div>
        </div>
      </section>

      <section className="kt-m-pad" style={{ padding: "96px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="TARINA" right="Miten tästä tuli ammatti" />
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
            gap: 64,
            marginTop: 56,
            alignItems: "start",
          }}
        >
          <div
            className="kt-m-static"
            style={{
              position: "sticky",
              top: 96,
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
              aspectRatio: "4 / 5",
            }}
          >
            <Image
              src="/images/lava-esitys-yleiso-06.webp"
              alt="JP Pirinen esiintyy tummassa salissa"
              fill
              sizes="(max-width: 1280px) 45vw, 540px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 44, maxWidth: 560 }}>
            <div>
              <h2 style={storyH2}>Ura alkoi 1998, 18-vuotiaana</h2>
              <p style={storyText}>
                Kipinän taikuuteen sain nuorempana nähdessäni kouvolalaisen taikuri Markku Purhon esiintyvän
                Hippo-kilpailussa Kuusankoskella. Ruusut ilmestyivät ja katosivat ilman, että esiintyjä
                näytti koskevan niihin. 18-vuotiaana vuonna 1998 otin sen vakavasti: hain virallisen
                koulutuksen kansalaisopiston kurssilta Jari Santalan opissa ja aloin samalla esiintyä
                lastenjuhlissa ja Kouvolan Tykkimäen huvipuistossa, jossa pidin useita esityksiä päivässä
                pienelle yleisölle.
              </p>
              <p style={{ ...storyText, marginTop: 20 }}>
                Se oli paras mahdollinen koulu. Lapsiyleisö on rehellinen tuomari, ja jos et pidä sen
                mielenkiintoa yllä, opit nopeasti lukemaan yleisöä. Sama taito on edelleen tärkein syy
                siihen, miksi yritykset tilaavat minut esiintymään.
              </p>
            </div>
            <div>
              <h2 style={storyH2}>Taikuus yksin ei riittänyt</h2>
              <p style={storyText}>
                Huomasin, että pelkkä temppu tekee ihmisistä katsojia. Nauru tekee heistä osallistujia.
                Siitä syntyi yhdistelmä, jota teen tänään: stand up -komiikkaa ja taikuutta samassa
                esityksessä, ei kahta erillistä numeroa peräkkäin. Esiinnyin aikanani myös stand up
                -klubeilla yhtenä harvoista taikureista, jotka yhdistivät komiikan ja taikuuden samalla
                lavalla. Se kausi muovasi pysyvästi tapaani lukea yleisöä.
              </p>
            </div>
            <div>
              <h2 style={storyH2}>Yritystilaisuudet ovat oma lajinsa</h2>
              <p style={storyText}>
                Pikkujouluissa yleisö on työkavereita, ja se muuttaa kaiken. Vitsi ei saa nolata ketään
                keskellä omaa porukkaa. Suunnittelen materiaalin aina tilaisuuden mukaan ja viimeistelen sen
                paikan päällä yleisöä lukemalla. Siksi jokainen esitys elää hieman tilanteen mukaan.
              </p>
            </div>
            <div>
              <h2 style={storyH2}>Kouvolasta koko Suomeen</h2>
              <p style={storyText}>
                Asun Kouvolassa ja esiinnyn ympäri Suomen, laivoilla ja tarvittaessa myös ulkomailla – muun
                muassa kahdeksan suurkaupungin kiertueella Euroopassa. Kalusto kulkee mukana, tekniikka
                sovitaan etukäteen ja paikalle tullaan hyvissä ajoin. Sinun ei tarvitse miettiä ohjelman
                rakennetta tai tekniikkaa. Minä huolehdin siitä, että esitys toimii.
              </p>
            </div>
          </div>
        </div>
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
          <Rule left="NÄIN TYÖSKENTELEN" right="Kolme askelta, ei yllätyksiä" />
          <div
            className="kt-m-stack"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 24,
              marginTop: 56,
            }}
          >
            {tyotapa.map((step) => (
              <div
                key={step.nr}
                style={{
                  background: "var(--kt-paneeli)",
                  border: "1px solid var(--kt-viiva)",
                  borderTop: "6px solid var(--kt-messinki)",
                  padding: 24,
                }}
              >
                <div style={{ fontFamily: "var(--kt-font-mono)", fontSize: 12, letterSpacing: "0.2em", color: "var(--kt-messinki)", marginBottom: 12 }}>
                  {step.nr}
                </div>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 26, lineHeight: 1.25 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)" }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kt-m-pad" style={{ padding: "120px 48px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <blockquote style={{ margin: 0, fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.4, color: "var(--kt-valo)", textWrap: "pretty" }}>
          ”Ammattilainen on aina ammattilainen. Tätä muistellaan vielä pitkään!”
        </blockquote>
        <div
          style={{
            marginTop: 28,
            fontFamily: "var(--kt-font-display)",
            fontWeight: 400,
            fontSize: 22,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--kt-messinki)",
          }}
        >
          Susanna Mattsson
        </div>
        <div style={{ marginTop: 6, fontFamily: "var(--kt-font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--kt-siniharmaa)" }}>
          60v juhlat
        </div>
      </section>

      <section
        style={{
          background: "var(--kt-muste)",
          borderTop: "1px solid var(--kt-viiva)",
          borderBottom: "1px solid var(--kt-viiva)",
          padding: "72px 48px",
        }}
        className="kt-m-pad"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Rule left="NÄHTY TV:SSÄ" right="Poimintoja" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px", marginTop: 32 }}>
            {tvSpots.map((show) => (
              <span
                key={show}
                style={{
                  fontFamily: "var(--kt-font-mono)",
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  color: "var(--kt-valo-himmea)",
                  border: "1px solid var(--kt-viiva)",
                  padding: "10px 18px",
                }}
              >
                {show}
              </span>
            ))}
          </div>
          <p style={{ margin: "32px 0 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--kt-siniharmaa)", maxWidth: 560 }}>
            Toimittajille ja tapahtumajärjestäjille: valmiit kuvat, bio-tekstit ja tekniset tiedot löytyvät{" "}
            <Link href="/media">mediapankista</Link>.
          </p>
        </div>
      </section>

      <CtaBand title="Kerro tilaisuudestasi." accent="Loput hoidan minä." background="var(--kt-yo)" borderTop={false} />

      <Footer
        links={[
          { label: "Media", href: "/media" },
          { label: "UKK", href: "/ukk" },
          { label: "Yhteystiedot", href: "/media#yhteystiedot" },
          { label: "Tietosuoja", href: "/" },
        ]}
      />
    </div>
  );
}
