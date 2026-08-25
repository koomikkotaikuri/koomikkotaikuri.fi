import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { Rule } from "@/components/ui/Rule";
import { Accordion } from "@/components/site/Accordion";
import { ukkItems } from "@/lib/ukk";

export const metadata: Metadata = {
  title: "UKK — Koomikkotaikuri JP Pirinen",
  description:
    "Usein kysytyt kysymykset: sopivuus, kesto, hinta, äänentoisto, peruutukset ja kaikki muu mitä tilaajat kysyvät.",
};

export default function Ukk() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 72px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="UKK" right="Usein kysytyt kysymykset" />
        <h1
          style={{
            margin: "32px 0 20px 0",
            fontSize: "clamp(40px, 5.4vw, 84px)",
            lineHeight: 1.25,
            maxWidth: 1000,
          }}
        >
          Kaikki mitä olet <span style={{ color: "var(--kt-messinki)" }}>tullut kysymään</span>
        </h1>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
          Kokosin tälle sivulle vastaukset kaikkiin kysymyksiin, joita tilaajat kysyvät useimmin -
          sopivuudesta hintaan ja peruutuksiin asti. Jos jokin jää vielä askarruttamaan, kerro
          tilaisuudestasi suoraan.
        </p>
      </section>

      <section className="kt-m-pad-x" style={{ padding: "0 48px 96px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Accordion items={ukkItems} />
        </div>
      </section>

      <CtaBand title="Kerro tilaisuudestasi." accent="Saat tarjouksen nopeasti." />

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
