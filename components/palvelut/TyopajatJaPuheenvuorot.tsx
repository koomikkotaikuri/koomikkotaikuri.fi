import { TarjousLink } from "@/components/site/TarjousLink";
import { Kuva, PalveluOtsikko, h3Tyyli, leipa } from "./osat";

/* Työpajat ja puheenvuorot on oma kokonaisuutensa, joka on tarkoitus
   laajentaa myöhemmin omaksi sivukseen. Sisältö on siksi omana
   komponenttinaan ja suunnat datana: uusi sivu voi käyttää samaa listaa
   ja lisätä kullekin suunnalle oman osion. */
export const SUUNNAT = [
  {
    nimi: "Taikatyöpajat",
    teksti:
      "Osallistujat pääsevät itse kokeilemaan ja opettelemaan taikuutta. Katsojista tulee hetkeksi tekijöitä, ja onnistumisen ilo jaetaan yhdessä.",
  },
  {
    nimi: "Ilmapallotyöpajat",
    teksti:
      "Osallistavaa ja luovaa tekemistä ilmapallotaiteen parissa. Jokainen tekee omin käsin, ja lopputuloksille saa nauraa yhdessä.",
  },
  {
    nimi: "Puheenvuorot",
    teksti:
      "Erilaisiin tapahtumiin sopivia puheenvuoroja. Aiheina esimerkiksi itsensä haastaminen, oman potentiaalin löytäminen ja unelmien tavoittelu tai terveys.",
  },
];

export function TyopajatJaPuheenvuorot() {
  return (
    <section id="kt-p5" className="kt-m-pad kt-palvelu" style={{ padding: "112px 48px", borderBottom: "1px solid var(--kt-viiva)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 56 }}
        >
          <div>
            <PalveluOtsikko nimi="Työpajat ja puheenvuorot" kuvaus="Osallistavaa tekemistä ja uusia näkökulmia" />
            <p style={leipa}>
              Joskus paras ohjelma on sellainen, jossa pääsee itse tekemään. Työpajat ja puheenvuorot sopivat
              henkilöstöpäiviin, koulutuksiin ja tapahtumiin, joissa halutaan osallistua, oppia uutta tai katsoa
              tuttuja asioita hieman eri kulmasta.
            </p>
            <p style={{ ...leipa, marginBottom: 0 }}>
              Työpaja tai puheenvuoro sopii päivän ohjelmaan ja toimii yhtä hyvin myös iltatilaisuudessa.
            </p>
          </div>
          <Kuva
            src="/images/koulutus-puheenvuoro-02-web.webp"
            alt="JP Pirinen puhumassa yleisölle pöytien ääressä"
            ratio="3 / 2"
          />
        </div>

        <div
          className="kt-m-stack kt-t-stack"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24, marginBottom: 40 }}
        >
          {SUUNNAT.map((s) => (
            <div
              key={s.nimi}
              style={{
                background: "var(--kt-paneeli)",
                border: "1px solid var(--kt-viiva)",
                borderTop: "3px solid var(--kt-messinki)",
                padding: 28,
              }}
            >
              <h3 style={h3Tyyli}>{s.nimi}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
                {s.teksti}
              </p>
            </div>
          ))}
        </div>

        <p style={{ ...leipa, fontSize: 15 }}>
          Kesto, sisältö ja osallistujamäärä sovitaan aina tilaisuuden mukaan.
        </p>
        <TarjousLink cta="palvelut_paivaohjelma" className="kt-btn-secondary">
          Kysy työpajoista ja puheenvuoroista
        </TarjousLink>
      </div>
    </section>
  );
}
