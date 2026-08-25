import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { Marquee } from "@/components/ui/Marquee";
import { Rule } from "@/components/ui/Rule";
import { Stat } from "@/components/ui/Stat";
import { Badge } from "@/components/ui/Badge";
import { Testimonial } from "@/components/ui/Testimonial";
import { LogoWall } from "@/components/site/LogoWall";
import { Suositukset } from "@/components/asiakkaat/Suositukset";

export const metadata: Metadata = {
  title: "Asiakkaat — Koomikkotaikuri JP Pirinen",
  description:
    "1500 tilaisuutta, nolla peruttua keikkaa. Tilaajien suositukset yritystilaisuuksista, juhlista ja TV:stä.",
};

const marqueeItems = [
  "NCC", "Sokos Hotels", "LG", "Lemminkäinen", "HOAS", "Orange Advertising",
  "Hämeen Kauppakamari", "Kouvolan kaupunki", "Elinkeinoelämän keskusliitto",
];

const tvShows = [
  { channel: "Nelonen", title: "Neljän tähden illallinen" },
  { channel: "Nelonen", title: "Krissen kotibileet" },
  { channel: "MTV3", title: "Kaikki vastaan yksi" },
  { channel: "Nelonen", title: "LEGO Masters Suomi" },
];

export default function Asiakkaat() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 72px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="ASIAKKAAT" right="Yrityksiä · kaupunkeja · hotelleja · juhlia" />
        <h1
          style={{
            margin: "32px 0 20px 0",
            fontSize: "clamp(40px, 5.4vw, 84px)",
            lineHeight: 1.25,
            maxWidth: 1000,
          }}
        >
          1500 tilaisuutta,
          <br />
          <span style={{ color: "var(--kt-messinki)" }}>nolla peruttua keikkaa</span>
        </h1>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
          Suurin osa tilaajista järjestää tilaisuuden kerran vuodessa ja haluaa tietää yhden asian: toimiiko
          tämä varmasti. Alla on 28 vuoden vastaus siihen, tilaajien omin sanoin.
        </p>
        <div
          className="kt-m-stack"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "24px 48px",
            marginTop: 56,
            maxWidth: 900,
          }}
        >
          <Stat value="28" label="vuotta alalla" size="lg" />
          <Stat value="1500+" label="tilaisuutta" size="lg" />
          <Stat value="500" label="hengen yleisö suurimmillaan" size="lg" />
        </div>
      </section>

      <Marquee items={marqueeItems} />

      <section className="kt-m-pad" style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Rule left="TILAAJIA" right="Osa tilaisuuksista" />
          <div style={{ marginTop: 56 }}>
            <LogoWall scale={1.05} gap="48px 72px" />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "12px 20px",
              borderTop: "1px solid var(--kt-viiva)",
              paddingTop: 24,
              marginTop: 64,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--kt-messinki)" }}>
              Lisäksi mm.
            </span>
            <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 13, color: "var(--kt-siniharmaa)", lineHeight: 1.6 }}>
              LG · Lemminkäinen · Hämeen Kauppakamari · Elinkeinoelämän keskusliitto · Piikkiön VPK · sadat
              yksityisjuhlat
            </span>
          </div>
        </div>
      </section>

      <section
        className="kt-m-pad"
        style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)", background: "var(--kt-muste)" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Suositukset />
        </div>
      </section>

      <section className="kt-m-pad" style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)" }}>
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
                <span
                  style={{
                    fontFamily: "var(--kt-font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--kt-messinki)",
                  }}
                >
                  Kouvolan kaupunki · 500 henkeä
                </span>
                <Badge variant="brass">Suurin sali</Badge>
              </div>
              <h2 style={{ margin: "0 0 20px 0", fontSize: "clamp(30px, 3.4vw, 52px)", lineHeight: 1.25 }}>
                Iso sali, sama tunnelma
              </h2>
              <blockquote
                style={{ margin: "0 0 24px 0", maxWidth: 560, fontSize: 20, lineHeight: 1.5, color: "var(--kt-valo)", textWrap: "pretty" }}
              >
                ”Otti yli 500 henkisen yleisön haltuun, hämmästytti ja etenkin nauratti koko porukkaa.”
              </blockquote>
              <div
                style={{
                  fontFamily: "var(--kt-font-display)",
                  fontWeight: 400,
                  fontSize: 22,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--kt-messinki)",
                }}
              >
                Marita Toikka
              </div>
              <div style={{ fontFamily: "var(--kt-font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--kt-siniharmaa)", margin: "6px 0 28px 0" }}>
                Kouvolan kaupunginjohtaja
              </div>
              <Link href="/palvelut" className="kt-cta-link">
                Katso paketit →
              </Link>
            </div>
            <div style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--kt-yo)", border: "1px solid var(--kt-viiva)" }}>
              <Image
                src="/images/lava-esitys-yleiso-01.webp"
                alt="JP Pirinen lavalla, täysi sali edessä"
                fill
                sizes="(max-width: 1280px) 50vw, 640px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="kt-m-pad"
        style={{ padding: "96px 48px", borderBottom: "1px solid var(--kt-viiva)", background: "var(--kt-muste)" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Rule left="NÄHTY TV:SSÄ" right="Neljä ohjelmaa" />
          <div
            className="kt-m-cols-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {tvShows.map((show) => (
              <div
                key={show.title}
                style={{
                  background: "var(--kt-paneeli)",
                  border: "1px solid var(--kt-viiva)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ fontFamily: "var(--kt-font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--kt-messinki)" }}>
                  {show.channel}
                </div>
                <h3 style={{ margin: 0, fontSize: 26, lineHeight: 1.25 }}>{show.title}</h3>
              </div>
            ))}
          </div>
          <div
            className="kt-m-stack"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px 48px",
              marginTop: 48,
            }}
          >
            <Testimonial quote="JP Pirinen taikoo v*ttu oikeesti." name="Kimmo Laiho aka Elastinen" />
            <Testimonial quote="Mitähän helv***tiä just tapahtui? Eihän toi oo mahdollista" name='Jari "Jaajo" Linnonmaa' />
          </div>
        </div>
      </section>

      <CtaBand title="Seuraava suositus" accent="voi olla teidän." />

      <Footer
        links={[
          { label: "Palvelut", href: "/palvelut" },
          { label: "Asiakkaat", href: "/asiakkaat" },
          { label: "Yhteystiedot", href: "/media#yhteystiedot" },
          { label: "Tietosuoja", href: "/" },
        ]}
      />
    </div>
  );
}
