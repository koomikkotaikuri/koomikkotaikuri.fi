import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Rule } from "@/components/ui/Rule";
import { MediaSisalto } from "@/components/media/MediaSisalto";

export const metadata: Metadata = pageMetadata({
  title: "Mediapankki — Koomikkotaikuri JP Pirinen",
  description:
    "Painokelpoiset kuvat, valmiit esittelytekstit, logot ja tekniset tiedot toimittajille ja tapahtumajärjestäjille.",
  path: "/media",
});

export default function Media() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 72px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="MEDIAPANKKI" right="Kuvat, tekstit ja tekniset tiedot" />
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
            gap: 64,
            alignItems: "end",
            marginTop: 56,
          }}
        >
          <h1 style={{ margin: 0, fontSize: "clamp(44px, 5.6vw, 88px)", lineHeight: 1.08 }}>
            Ota kaikki
            <br />
            <span style={{ color: "var(--kt-messinki)" }}>mitä tarvitset</span>
          </h1>
          <div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.62, color: "var(--kt-valo-himmea)", maxWidth: 560, textWrap: "pretty" }}>
              Tältä sivulta lataat painokelpoiset kuvat, valmiit esittelytekstit ja tekniset tiedot. Kaikki
              on vapaasti käytettävissä tilaisuuden markkinoinnissa ja mediassa, kun kuvaajan nimi
              mainitaan.
            </p>
            <p style={{ margin: "16px 0 0 0", fontFamily: "var(--kt-font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--kt-siniharmaa)" }}>
              Päivitetty 08/2026
            </p>
          </div>
        </div>
      </section>

      <MediaSisalto />

      <section
        id="yhteystiedot"
        className="kt-m-pad"
        style={{ background: "var(--kt-muste)", borderTop: "1px solid var(--kt-viiva)", padding: "96px 48px" }}
      >
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 20px 0", fontSize: "clamp(30px, 3.4vw, 48px)", lineHeight: 1.25 }}>
              Tarvitsetko jotain,
              <br />
              <span style={{ color: "var(--kt-messinki)" }}>mitä täältä ei löydy?</span>
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.62, color: "var(--kt-valo-himmea)", maxWidth: 560 }}>
              Pyydä suoraan minulta: isommat tiedostot, videomateriaali, haastattelut ja aikataulut hoituvat
              samana päivänä.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "Sähköposti", value: <a href="mailto:jp@koomikkotaikuri.fi" style={{ fontFamily: "var(--kt-font-mono)", fontSize: 15 }}>jp@koomikkotaikuri.fi</a> },
              { label: "Esiintyjänimi", value: <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 15, color: "var(--kt-valo)" }}>Koomikkotaikuri JP Pirinen</span> },
              { label: "Kotipaikka", value: <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 15, color: "var(--kt-valo)" }}>Kouvola, keikat koko Suomeen</span> },
            ].map((row) => (
              <div
                key={row.label}
                className="kt-m-stack kt-m-gap-xs"
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px minmax(0, 1fr)",
                  gap: 24,
                  padding: "14px 0",
                  borderBottom: "1px solid var(--kt-viiva)",
                }}
              >
                <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--kt-siniharmaa)" }}>
                  {row.label}
                </span>
                {row.value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer
        links={[
          { label: "JP Pirinen", href: "/jp-pirinen" },
          { label: "Palvelut", href: "/palvelut" },
          { label: "Asiakkaat", href: "/asiakkaat" },
          { label: "Tietosuoja", href: "/" },
        ]}
      />
    </div>
  );
}
