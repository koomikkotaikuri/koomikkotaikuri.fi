import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { Marquee } from "@/components/ui/Marquee";
import { Rule } from "@/components/ui/Rule";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Accordion } from "@/components/site/Accordion";
import { TarjousLink } from "@/components/site/TarjousLink";
import { ukkItems, palvelutUkkTitles } from "@/lib/ukk";

export const metadata: Metadata = {
  title: "Palvelut — Koomikkotaikuri JP Pirinen",
  description:
    "Viisi tapaa tilata: lavashow, close-up-taikuus, täysihoito, juonto sekä puheenvuorot ja workshopit.",
};

const marqueeItems = [
  "NCC", "Sokos Hotels", "LG", "Lemminkäinen", "HOAS", "Orange Advertising",
  "Hämeen Kauppakamari", "Kouvolan kaupunki", "Elinkeinoelämän keskusliitto",
];

const jumpLinks = [
  { id: "kt-p1", label: "Lavalla" },
  { id: "kt-p2", label: "Vieraiden joukossa" },
  { id: "kt-p3", label: "Täysihoito" },
  { id: "kt-p4", label: "Juonto" },
  { id: "kt-p5", label: "Puheenvuorot" },
];

const steps = [
  {
    nr: "01",
    title: "Ota yhteyttä",
    text: "Kerro päivä, paikka, yleisö ja tilaisuuden luonne. Kysyn tarkentavat kysymykset, jos jotain puuttuu.",
  },
  {
    nr: "02",
    title: "Hyväksy tarjous",
    text: "Saat suosituksen sopivasta paketista ja kiinteän hinnan. Sovittu esiintyminen toteutuu aina.",
  },
  {
    nr: "03",
    title: "Tilaisuus toteutuu",
    text: "Saavun ajoissa, sovin tekniikan paikan päällä ja hoidan oman osuuteni. Sinä saat kiitokset.",
  },
];

const kicker: React.CSSProperties = {
  fontFamily: "var(--kt-font-mono)",
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--kt-messinki)",
  marginBottom: 16,
};

const sectionH2: React.CSSProperties = {
  margin: "0 0 16px 0",
  fontSize: "clamp(30px, 3.4vw, 52px)",
  lineHeight: 1.25,
};

const lead: React.CSSProperties = {
  margin: "0 0 20px 0",
  maxWidth: 560,
  fontSize: 16,
  lineHeight: 1.6,
  color: "var(--kt-valo-himmea)",
  textWrap: "pretty",
};

const bulletList: React.CSSProperties = {
  margin: "0 0 28px 0",
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  maxWidth: 560,
};

const bullet: React.CSSProperties = { fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)" };

function PakettiKuva({
  src,
  alt,
  ratio,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  ratio: string;
  objectPosition?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: ratio,
        background: "var(--kt-paneeli)",
        border: "1px solid var(--kt-viiva)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1280px) 50vw, 640px"
        style={{ objectFit: "cover", objectPosition }}
      />
    </div>
  );
}

export default function Palvelut() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 72px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="PALVELUT" right="Show · Close-up · Juonto · Puheenvuorot" />
        <h1
          style={{
            margin: "32px 0 20px 0",
            fontSize: "clamp(40px, 5.4vw, 84px)",
            lineHeight: 1.25,
            maxWidth: 1000,
          }}
        >
          Viisi tapaa tilata,
          <br />
          <span style={{ color: "var(--kt-messinki)" }}>yksi ammattilainen</span>
        </h1>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
          Jokainen tilaisuus on erilainen. Ohjelma sovitetaan etukäteen tilaisuuden luonteen ja yleisön
          mukaan, ja lavalla 28 vuoden kokemus pitää huolen lopusta.
        </p>
      </section>

      <div
        style={{
          position: "sticky",
          top: 64,
          zIndex: 40,
          background: "var(--kt-yo)",
          borderTop: "1px solid var(--kt-viiva)",
          padding: "14px 48px",
        }}
        className="kt-m-pad-x"
      >
        <div className="kt-jump-chips" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 12 }}>
          {jumpLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="kt-chip">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <Marquee items={marqueeItems} />

      <section id="kt-p1" className="kt-m-pad" style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)" }}>
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <div style={kicker}>Paketti 01 · Show 30–40 min</div>
            <h2 style={sectionH2}>Lavalla</h2>
            <p style={lead}>
              Stand upia ja taikuutta lavalta koko salille. Numerot alkavat pienestä ja kasvavat joksikin
              isommaksi, ja yleisö on mukana koko ajan.
            </p>
            <ul style={bulletList}>
              <li style={bullet}>- Sopii pikkujouluihin, juhlaillallisille ja henkilöstöpäiviin</li>
              <li style={bullet}>- Toimii 30 hengen kokouksesta tuhannen hengen saliin</li>
              <li style={bullet}>- Tarvitaan äänentoisto ja valaistu esiintymistila</li>
            </ul>
            <TarjousLink className="kt-cta-link">Pyydä tarjous →</TarjousLink>
          </div>
          <PakettiKuva src="/images/lava-esitys-yleiso-01.webp" alt="JP Pirinen lavalla, yleisö edessä" ratio="4 / 3" />
        </div>
      </section>

      <section
        id="kt-p2"
        className="kt-m-pad"
        style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)", background: "var(--kt-muste)" }}
      >
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <PakettiKuva
            src="/images/lahikuva-hiiret-03-web.webp"
            alt="Close-up-taikuutta käden ulottuvilla"
            ratio="4 / 3"
          />
          <div>
            <div style={kicker}>Paketti 02 · Close-up 30–60 min</div>
            <h2 style={sectionH2}>Vieraiden joukossa</h2>
            <p style={lead}>
              Kiertävä close-up-taikuus pöydissä ja vieraiden keskellä. Ihmeet tapahtuvat käden ulottuvilla,
              omassa seurueessa ja omissa käsissä.
            </p>
            <ul style={bulletList}>
              <li style={bullet}>- Toimii cocktail-osuudessa, ruokailun aikana ja messuosastolla</li>
              <li style={bullet}>- Ei vaadi lavaa, tekniikkaa eikä ohjelmataukoa</li>
              <li style={bullet}>- Murtaa jään, kun vieraat eivät vielä tunne toisiaan</li>
            </ul>
            <TarjousLink className="kt-cta-link">Pyydä tarjous →</TarjousLink>
          </div>
        </div>
      </section>

      <section id="kt-p3" className="kt-m-pad" style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="kt-m-stack kt-m-gap-sm kt-m-pad-sm"
            style={{
              borderTop: "6px solid var(--kt-messinki)",
              background: "var(--kt-paneeli)",
              borderRight: "1px solid var(--kt-viiva)",
              borderBottom: "1px solid var(--kt-viiva)",
              borderLeft: "1px solid var(--kt-viiva)",
              padding: 48,
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <span style={{ ...kicker, marginBottom: 0 }}>Paketti 03 · Koko ilta</span>
                <Badge variant="brass">Suosituin</Badge>
              </div>
              <h2 style={sectionH2}>Täysihoito</h2>
              <p style={lead}>
                Lavashow ja close-up samassa illassa. Tilaat kerran ja koko illan viihde on hoidettu, joten
                sinä ehdit itsekin nauttia omista juhlistasi.
              </p>
              <ul style={bulletList}>
                <li style={bullet}>- Close-up alkuun, lavashow pääohjelmaksi</li>
                <li style={bullet}>- Yksi laskutus, yksi yhteyshenkilö, yksi aikataulu</li>
                <li style={bullet}>- Yhdistettävissä juontoon koko illan kokonaisuudeksi</li>
              </ul>
              <TarjousLink className="kt-btn-primary">Pyydä tarjous</TarjousLink>
            </div>
            <PakettiKuva
              src="/images/lava-esitys-yleiso-08.webp"
              alt="Koko illan tunnelma, täysi sali"
              ratio="4 / 3"
              objectPosition="center 15%"
            />
          </div>
        </div>
      </section>

      <section
        className="kt-m-pad"
        style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)", background: "var(--kt-muste)" }}
      >
        <div
          className="kt-m-stack"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div
            id="kt-p4"
            style={{
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <PakettiKuva
              src="/images/juonto-studiokuva-mustavalko-01-web.webp"
              alt="JP Pirinen, studiokuva mustavalkoisena"
              ratio="16 / 9"
            />
            <div style={{ ...kicker, marginBottom: 0 }}>Paketti 04 · Juonto</div>
            <h3 style={{ margin: 0, fontSize: 26, lineHeight: 1.25 }}>Illan juontaja</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
              Juonnan illan alusta loppuun ja pidän aikataulun kasassa. Ohjelmanumerot, palkitsemiset ja
              tauot kulkevat sujuvasti, ja tunnelma pysyy yllä myös väliaikoina.
            </p>
            <TarjousLink className="kt-cta-link" style={{ marginTop: "auto" }}>
              Pyydä tarjous →
            </TarjousLink>
          </div>
          <div
            id="kt-p5"
            style={{
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <PakettiKuva
              src="/images/koulutus-puheenvuoro-01-web.webp"
              alt="JP Pirinen pitämässä puheenvuoroa yleisölle"
              ratio="16 / 9"
            />
            <div style={{ ...kicker, marginBottom: 0 }}>Paketti 05 · Puheenvuoro tai workshop</div>
            <h3 style={{ margin: 0, fontSize: 26, lineHeight: 1.25 }}>Päiväohjelmaan</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
              Puheenvuoro tai workshop koulutuspäivään ja seminaariin. Aiheina esiintyminen, huomion
              ohjaaminen ja heittäytyminen. Harjoituksia ja nauruja, ei luentokalvoja.
            </p>
            <TarjousLink className="kt-cta-link" style={{ marginTop: "auto" }}>
              Pyydä tarjous →
            </TarjousLink>
          </div>
        </div>
      </section>

      <section className="kt-m-pad" style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Rule left="MITEN TILAUS ETENEE" right="Kolme askelta" />
          <div
            className="kt-m-stack"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 24,
              marginTop: 48,
            }}
          >
            {steps.map((step) => (
              <div
                key={step.nr}
                style={{ background: "var(--kt-paneeli)", border: "1px solid var(--kt-viiva)", padding: 24 }}
              >
                <div style={{ fontFamily: "var(--kt-font-mono)", fontSize: 34, color: "var(--kt-messinki)", lineHeight: 1 }}>
                  {step.nr}
                </div>
                <h3 style={{ margin: "20px 0 12px 0", fontSize: 26, lineHeight: 1.25 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)" }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="ukk"
        className="kt-m-pad"
        style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)", background: "var(--kt-muste)" }}
      >
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: 64,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ ...kicker, marginBottom: 0 }}>Usein kysyttyä</div>
            <h2 style={{ margin: 0, fontSize: 34, lineHeight: 1.25 }}>
              Ennen kuin kysyt <span style={{ color: "var(--kt-messinki)" }}>hintaa</span>
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-siniharmaa)" }}>
              Kerro ensin tilaisuudesta, niin saat suosituksen ja hinnan samassa viestissä.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Accordion items={ukkItems.filter((i) => palvelutUkkTitles.includes(i.title))} />
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--kt-siniharmaa)" }}>
              Jäikö vielä jotain mietityttämään? Tässä yleisimmät viisi kysymystä.{" "}
              <Link href="/ukk">Katso kaikki kysymykset →</Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Kerro tilaisuudestanne." accent="Saat tarjouksen nopeasti." />

      <Footer
        links={[
          { label: "Tapahtumaopas", href: "/palvelut" },
          { label: "UKK", href: "/ukk" },
          { label: "Yhteystiedot", href: "/media#yhteystiedot" },
          { label: "Tietosuoja", href: "/" },
        ]}
      />
    </div>
  );
}
