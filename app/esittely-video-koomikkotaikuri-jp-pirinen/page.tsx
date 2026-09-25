import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { LogoWall } from "@/components/site/LogoWall";
import { VideoUpotus } from "@/components/site/VideoUpotus";
import { Rule } from "@/components/ui/Rule";
import { Suositukset } from "@/components/asiakkaat/Suositukset";
import { VIDEOT } from "@/lib/videot";

/* Ei navigaatiossa: osoite on vanhalta sivustolta ja sitä jaetaan suoraan
   tilaajille. Lisää videoita tulee lib/videot.ts:n listaan. */
export const metadata: Metadata = pageMetadata({
  title: "Esittelyvideo — Koomikkotaikuri JP Pirinen",
  description:
    "Katso millaisen tunnelman koomikkotaikuri JP Pirinen saa aikaiseksi: esittelyvideo ja tilaajien suositukset yritystilaisuuksista ja juhlista.",
  path: "/esittely-video-koomikkotaikuri-jp-pirinen",
});

export default function EsittelyVideo() {
  const [paavideo, ...muut] = VIDEOT;

  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 96px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="ESITTELYVIDEO" right="Stand up · taikuutta · juontoa" />
        <h1
          style={{
            margin: "32px 0 20px 0",
            fontSize: "clamp(40px, 5.4vw, 84px)",
            lineHeight: 1.25,
            maxWidth: 1000,
          }}
        >
          Millaisen tunnelman
          <br />
          <span style={{ color: "var(--kt-messinki)" }}>JP saa aikaiseksi?</span>
        </h1>
        <p
          style={{
            margin: "0 0 48px 0",
            maxWidth: 560,
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--kt-valo-himmea)",
            textWrap: "pretty",
          }}
        >
          Kuvaus kertoo paljon, mutta video kertoo enemmän. Katso pätkä illasta ja lue alta, mitä
          tilaajat ovat sanoneet omista tilaisuuksistaan.
        </p>
        <VideoUpotus videoId={paavideo.id} title={paavideo.otsikko} />

        {muut.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(360px, 100%), 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {muut.map((v) => (
              <figure key={v.id} style={{ margin: 0 }}>
                <VideoUpotus videoId={v.id} title={v.otsikko} />
                <figcaption style={{ marginTop: 12, fontSize: 15, color: "var(--kt-valo)" }}>
                  {v.otsikko}
                  {v.kuvaus && (
                    <span style={{ display: "block", marginTop: 4, fontSize: 14, color: "var(--kt-valo-himmea)" }}>
                      {v.kuvaus}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section
        className="kt-m-pad"
        style={{ padding: "96px 48px", borderTop: "1px solid var(--kt-viiva)", borderBottom: "1px solid var(--kt-viiva)", background: "var(--kt-muste)" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Suositukset />
        </div>
      </section>

      <section className="kt-m-pad" style={{ padding: "96px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Rule left="TILAAJIA" right="Osa tilaisuuksista" />
          <div style={{ marginTop: 56 }}>
            <LogoWall scale={1.05} gap="48px 72px" />
          </div>
        </div>
      </section>

      <CtaBand title="Tämä tunnelma" accent="teidän tilaisuuteenne?" />

      <Footer />
    </div>
  );
}
