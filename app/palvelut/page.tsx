import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { Marquee } from "@/components/ui/Marquee";
import { Accordion } from "@/components/site/Accordion";
import { TarjousLink } from "@/components/site/TarjousLink";
import { PalveluNav } from "@/components/palvelut/PalveluNav";
import { Faktat, JuontoVinkki, Kuva, PalveluOtsikko, h3Tyyli, leipa } from "@/components/palvelut/osat";
import { TyopajatJaPuheenvuorot } from "@/components/palvelut/TyopajatJaPuheenvuorot";
import { ukkItems, palvelutUkkTitles } from "@/lib/ukk";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Palvelut yritystilaisuuksiin | Koomikkotaikuri JP Pirinen",
  description:
    "Lavashow, lähitaikuutta vieraiden joukossa, juontoa sekä työpajoja ja puheenvuoroja yritystilaisuuksiin. Katso, mitä teidän tilaisuudessanne voisi tapahtua.",
  path: "/palvelut",
});

const marqueeItems = [
  "NCC", "Sokos Hotels", "LG", "Lemminkäinen", "HOAS", "Orange Advertising",
  "Hämeen Kauppakamari", "Kouvolan kaupunki", "Elinkeinoelämän keskusliitto",
];

const steps = [
  {
    nr: "01",
    title: "Kerro tilaisuudesta",
    text: "Päivä, paikka, vieraiden määrä ja millainen ilta on tulossa. Ohjelmatoive voi olla vielä avoin. Soitan usein perään, niin yksityiskohdat saadaan kuntoon yhdellä puhelulla.",
  },
  {
    nr: "02",
    title: "Hyväksy tarjous",
    text: "Saat ehdotuksen siitä, mikä toimisi juuri teidän tilaisuudessanne, ja kiinteän hinnan. Sovittu esiintyminen toteutuu aina.",
  },
  {
    nr: "03",
    title: "Tilaisuus toteutuu",
    text: "Saavun ajoissa, sovin tekniikan paikan päällä ja hoidan oman osuuteni. Sinä saat kiitokset.",
  },
];

const osio = (tausta: string): React.CSSProperties => ({
  padding: "112px 48px",
  borderBottom: "1px solid var(--kt-viiva)",
  background: tausta,
});

const kehys: React.CSSProperties = { maxWidth: 1280, margin: "0 auto" };

export default function Palvelut() {
  return (
    <div className="kt-palvelut" style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 72px 48px", ...kehys }}>
        <h1
          style={{
            margin: "0 0 28px 0",
            fontSize: "clamp(40px, 5.4vw, 84px)",
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          Ohjelmaa, joka saa
          <br />
          <span style={{ color: "var(--kt-messinki)" }}>porukan viihtymään</span>
        </h1>
        <p style={{ ...leipa, maxWidth: 640 }}>
          Henkilöstöjuhla, asiakastilaisuus tai koko päivän tapahtuma. Ohjelman voi rakentaa monella tavalla:
          yhteinen lavashow, taikuutta vieraiden joukossa, juontoa tai osallistavaa tekemistä.
        </p>
        <p style={{ ...leipa, maxWidth: 640, marginBottom: 0 }}>
          Alla tarkemmin, mitä kaikkea voidaan toteuttaa. Sopivan kokonaisuuden voimme miettiä yhdessä:
          kerro tilaisuudesta, niin ehdotan, mikä toimisi teillä parhaiten.
        </p>
      </section>

      <PalveluNav />

      <Marquee items={marqueeItems} />

      {/* ---- Lavalla ---- */}
      <section id="kt-p1" className="kt-m-pad kt-palvelu" style={osio("var(--kt-yo)")}>
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{ ...kehys, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}
        >
          <div>
            <PalveluOtsikko nimi="Lavalla" kuvaus="Koomikkotaikurin lavashow koko yleisölle" />
            <p style={leipa}>
              Lavashow on noin 30–40 minuutin yhteinen esitys, jossa koko sali nauraa ja hämmästelee
              samaan aikaan.
            </p>
            <p style={leipa}>
              Kerron tarinoita omasta elämästäni, perheestäni ja vuosista esiintyjänä. Omakohtaiset
              tarinat, komiikka, taikuus ja yleisön kanssa siinä hetkessä syntyvät tilanteet kietoutuvat
              yhdeksi esitykseksi, jossa nauru ja hämmästys kulkevat käsi kädessä.
            </p>
            <p style={leipa}>
              Hämmästyttäviä hetkiä tulee, mutta tärkeintä on, että yleisöllä on älyttömän hauskaa. Huumori
              on hyväntuulista ja yleisöä kunnioittavaa, eikä ketään nolata. Lavalle kutsutusta
              vapaaehtoisesta tulee illan sankari. Huumorin terävin kärki osuu useimmiten taikuriin itseensä.
            </p>
            <p style={{ ...leipa, marginBottom: 28 }}>
              Esitys rakentuu omalle materiaalilleni, ja se sovitetaan aina tilaisuuden luonteeseen ja
              yleisöön.
            </p>

            <h3 style={h3Tyyli}>Käytännössä</h3>
            <Faktat
              rivit={[
                { nimi: "Kesto", arvo: "Noin 30–40 minuuttia, sovitetaan illan aikatauluun." },
                { nimi: "Yleisö", arvo: "Toimii 30 hengen kokouksesta tuhannen hengen saliin." },
                {
                  nimi: "Sopii",
                  arvo: "Pikkujouluihin, juhlaillallisille, kick-offeihin, henkilöstöpäiville ja asiakastilaisuuksiin.",
                },
                {
                  nimi: "Ajoitus",
                  arvo: "Parhaiten puheiden jälkeen tai ruokailun tauolla. Jos illassa on bändi tai tanssia, esitys ennen niitä.",
                },
                {
                  nimi: "Tekniikka",
                  arvo: "Äänentoisto, johon voi liittää headset-mikrofonin ja musiikin, sekä valaistu esiintymispaikka. Alle 50 hengen tilaisuuksiin äänentoisto järjestyy tarvittaessa minun kauttani.",
                },
              ]}
            />

            <JuontoVinkki>
              Lavashow on yksi illan ohjelmanumeroista, mutta myös kaiken muun pitää edetä sujuvasti: puheet,
              palkitsemiset ja siirtymät. Voin hoitaa samalla illan juonnot ja pitää aikataulun kasassa.
            </JuontoVinkki>

            <TarjousLink cta="palvelut_lavalla" className="kt-btn-primary">
              Pyydä tarjous lavashow’sta
            </TarjousLink>
          </div>

          <div
            className="kt-m-static kt-m-first"
            style={{ position: "sticky", top: 160, display: "flex", flexDirection: "column", gap: 24 }}
          >
            <Kuva
              src="/images/lava-esitys-yleiso-02.webp"
              alt="JP Pirinen lavalla kädet levällään yleisön edessä"
              ratio="4 / 3"
              sijainti="60% center"
            />
            <div className="kt-m-hide" style={{ width: "72%", alignSelf: "flex-end" }}>
              <Kuva
                src="/images/lava-esitys-yleiso-07a.webp"
                alt="Vapaaehtoinen yleisön joukosta mukana esityksessä lavalla"
                ratio="3 / 2"
                sizes="460px"
                kuvateksti="Yleisö ei jää pelkäksi katsojaksi"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Vieraiden joukossa ---- */}
      <section id="kt-p2" className="kt-m-pad kt-palvelu" style={osio("var(--kt-muste)")}>
        <div style={kehys}>
          <div
            className="kt-m-stack kt-m-gap-sm"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", marginBottom: 72 }}
          >
            <Kuva
              src="/images/lahikuva-hiiret-04-web.webp"
              alt="JP Pirinen hämmästelee kämmenellään olevia vaahtomuovihiiriä"
              ratio="4 / 3"
              sijainti="40% center"
            />
            <div>
              <PalveluOtsikko nimi="Vieraiden joukossa" kuvaus="Lähitaikuutta aivan silmien edessä" />
              <p style={leipa}>
                Lähitaikuudessa esitys tuodaan vieraiden luo. Liikun yleisön joukossa ja teen taikuutta
                pienille ryhmille pöydissä tai siellä, missä vieraat seurustelevat.
              </p>
              <p style={{ ...leipa, marginBottom: 0 }}>
                Taikuus tapahtuu käden ulottuvilla, joskus jopa vieraiden omissa käsissä. Se on aivan erilainen
                kokemus kuin lavalta katsottu esitys.
              </p>
            </div>
          </div>

          <div
            className="kt-m-stack kt-m-gap-sm"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}
          >
            <div>
              <h3 style={h3Tyyli}>Miltä se tuntuu vieraasta</h3>
              <p style={leipa}>
                Kaikki tapahtuu puolen metrin päässä, joskus vieraan omassa kädessä. Vieressä seisova kollega
                näkee saman, ja kumpikin jää ihmettelemään, miten se oli mahdollista.
              </p>
              <p style={leipa}>
                Siitä syntyy juuri se hetki, jota lähitaikuudelta haetaan: yhteistä ihmettelyä, naurua ja
                keskustelua, joka jatkuu vielä, kun olen jo siirtynyt seuraavaan pöytään.
              </p>
              <p style={{ ...leipa, marginBottom: 0 }}>
                Siksi lähitaikuus rikkoo jäätä niin hyvin. Kun vieraat eivät vielä tunne toisiaan, yhteinen
                hämmästys antaa heti jotain puhuttavaa.
              </p>
            </div>
            <div>
              <h3 style={h3Tyyli}>Missä kohtaa iltaa</h3>
              <Faktat
                rivit={[
                  { nimi: "Kesto", arvo: "Tyypillisesti 30–60 minuuttia, tarvittaessa useammassa osassa." },
                  {
                    nimi: "Sopii",
                    arvo: "Vieraiden saapumiseen, cocktail-osuuteen, ruokailun ympärille, verkostoitumiseen ja messuosastolle.",
                  },
                  { nimi: "Tekniikka", arvo: "Onnistuu siellä, missä vieraat ovat, ilman lavaa, tekniikkaa tai ohjelmataukoa." },
                  {
                    nimi: "Yhdistä",
                    arvo: (
                      <>
                        Toimii omana palvelunaan tai yhdessä lavashow’n kanssa, jolloin kokonaisuus on{" "}
                        <a href="#kt-p3">Täysihoito</a>.
                      </>
                    ),
                  },
                ]}
              />
              <JuontoVinkki>
                Kun vieraat viihtyvät, jonkun pitää samalla huolehtia, että tilaisuus etenee: kuulutukset,
                siirtymät ja seuraavan ohjelman käynnistys. Sen voi hoitaa sama ihminen.
              </JuontoVinkki>
              <TarjousLink cta="palvelut_vieraiden_joukossa" className="kt-btn-primary">
                Pyydä tarjous lähitaikuudesta
              </TarjousLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Täysihoito ---- */}
      <section id="kt-p3" className="kt-m-pad kt-palvelu" style={osio("var(--kt-yo)")}>
        <div style={kehys}>
          <div
            className="kt-m-pad-sm"
            style={{
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
              borderTop: "6px solid var(--kt-messinki)",
              padding: 56,
            }}
          >
            <div
              className="kt-m-stack kt-m-gap-sm"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 48 }}
            >
              <PalveluOtsikko nimi="Täysihoito" kuvaus="Kaksi erilaista kokemusta samassa tilaisuudessa" />
              <div>
                <p style={leipa}>
                  Täysihoidossa samaan tilaisuuteen tulevat sekä lavashow että lähitaikuus. Kaksi erilaista
                  esiintymistapaa täydentävät toisiaan ja muodostavat kokonaisuuden, joka kantaa tunnelmaa koko
                  tilaisuuden ajan.
                </p>
              </div>
            </div>

            <div
              className="kt-m-stack kt-m-gap-sm"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 56 }}
            >
              <Kuva
                src="/images/lava-esitys-yleiso-01.webp"
                alt="JP Pirinen lavalla, yleisö katsomassa salissa"
                ratio="3 / 2"
                kuvateksti="Lavalla koko sali yhdessä"
              />
              <Kuva
                src="/images/lava-esitys-yleiso-05.webp"
                alt="JP Pirinen tekee taikuutta vieraalle aivan läheltä"
                ratio="3 / 2"
                sijainti="center 30%"
                kuvateksti="Lähitaikuudessa aivan silmien edessä"
              />
            </div>

            <div
              className="kt-m-stack kt-m-gap-sm kt-t-stack"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 40, marginBottom: 56 }}
            >
              <div>
                <h3 style={h3Tyyli}>Kaksi erilaista kokemusta</h3>
                <p style={{ ...leipa, fontSize: 16 }}>
                  Lavashow kokoaa koko yleisön yhteisen naurun ja hämmästyksen äärelle. Lähitaikuudessa kokemus
                  muuttuu henkilökohtaiseksi, kun taikuus ja hauskuus tapahtuvat aivan lähellä. Yhdessä ne
                  tarjoavat enemmän vaihtelua kuin kumpikaan yksinään.
                </p>
              </div>
              <div>
                <h3 style={h3Tyyli}>Ohjelmaa illan eri vaiheisiin</h3>
                <p style={{ ...leipa, fontSize: 16 }}>
                  Lähitaikuutta voi sijoittaa vieraiden saapumiseen, seurusteluhetkiin tai illan rauhallisempiin
                  kohtiin. Turha odottelu vähenee ja tunnelma pysyy yllä myös lavaohjelman ulkopuolella.
                  Viihde joustaa ja elää tilaisuuden mukana.
                </p>
              </div>
              <div>
                <h3 style={h3Tyyli}>Yksi esiintyjä, yhtenäinen kokonaisuus</h3>
                <p style={{ ...leipa, fontSize: 16 }}>
                  Kun sama esiintyjä on mukana pidempään, viihteen eri vaiheet voidaan suunnitella tukemaan koko
                  tilaisuuden kulkua. Sinulle se tarkoittaa yhtä yhteyshenkilöä, yhtä aikataulua ja yhtä
                  laskua.
                </p>
              </div>
            </div>

            <h3 style={h3Tyyli}>Järjestys on vapaa</h3>
            <p style={{ ...leipa, fontSize: 16 }}>
              Täysihoidon voi toteuttaa kummin päin tahansa. Teidän aikataulunne ja tilaisuuden luonne ratkaisevat.
            </p>
            <div
              className="kt-m-stack kt-m-gap-sm"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, margin: "8px 0 20px 0" }}
            >
              {[
                {
                  vaiheet: ["Lähitaikuus", "Lavashow"],
                  teksti:
                    "Vieraat kokevat ensin taikuutta henkilökohtaisesti, ja myöhemmin koko yleisö kokoontuu yhteisen esityksen ääreen.",
                },
                {
                  vaiheet: ["Lavashow", "Lähitaikuus"],
                  teksti:
                    "Yhteinen esitys käynnistää tunnelman, ja sen jälkeen taikuus ja hauskuus jatkuvat kohtaamisina vieraiden joukossa.",
                },
              ].map((j) => (
                <div
                  key={j.vaiheet.join("-")}
                  style={{ border: "1px solid var(--kt-viiva)", background: "var(--kt-yo)", padding: 24 }}
                >
                  <div
                    aria-label={`Ensin ${j.vaiheet[0].toLowerCase()}, sitten ${j.vaiheet[1].toLowerCase()}`}
                    style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
                  >
                    <span className="kt-vaihe">{j.vaiheet[0]}</span>
                    <span aria-hidden style={{ flex: 1, height: 1, background: "var(--kt-messinki)", opacity: 0.6 }} />
                    <span className="kt-vaihe">{j.vaiheet[1]}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)" }}>{j.teksti}</p>
                </div>
              ))}
            </div>
            <p style={{ ...leipa, fontSize: 16, marginBottom: 48 }}>
              Lähitaikuutta voi myös jakaa useampaan sopivaan kohtaan tilaisuutta.
            </p>

            <div
              className="kt-m-stack kt-m-gap-sm"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}
            >
              <div>
                <h3 style={h3Tyyli}>Laajempi räätälöinti</h3>
                <p style={{ ...leipa, fontSize: 16 }}>
                  Täysihoitoa voi täydentää juonnolla tai tapahtuman teemaan suunnitelluilla ohjelmallisilla
                  osuuksilla. Räätälöity toteutus vaatii enemmän valmistelua, ja se hinnoitellaan erikseen.
                </p>
              </div>
              <JuontoVinkki linkki="Näin juonto toimii">
                Järjestäjä on usein se, joka vahtii kelloa koko illan. Kun sama ammattilainen huolehtii viihteen
                lisäksi sovitusti juonnoista ja illan kulusta, sinäkin ehdit nauttia omista juhlistasi.
              </JuontoVinkki>
            </div>

            <TarjousLink cta="palvelut_taysihoito" className="kt-btn-primary">
              Pyydä tarjous Täysihoidosta
            </TarjousLink>
          </div>
        </div>
      </section>

      {/* ---- Juontajana ---- */}
      <section id="kt-p4" className="kt-m-pad kt-palvelu" style={osio("var(--kt-muste)")}>
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{ ...kehys, display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 72, alignItems: "start" }}
        >
          <div className="kt-m-static" style={{ position: "sticky", top: 160 }}>
            <Kuva
              src="/images/juonto-lavakuva-summerslam-01-web.webp"
              alt="JP Pirinen juontamassa tapahtumaa mikrofoni ja kortit kädessä"
              ratio="4 / 5"
              sijainti="35% center"
            />
          </div>
          <div>
            <PalveluOtsikko nimi="Juontajana" kuvaus="Persoonallista juontoa ja sujuva tapahtuma" />
            <p style={leipa}>
              Moni järjestäjä on suunnitellut ohjelmaa viikkoja ja huomaa sitten itse vahtivansa aikataulua,
              esiintyjiä ja käytännön asioita koko tilaisuuden ajan. Juontaja voi ottaa siitä vastuuta sovitussa
              laajuudessa, jolloin järjestäjäkin ehtii keskittyä vieraisiin.
            </p>
            <p style={{ ...leipa, marginBottom: 32 }}>
              Ohjelmanumeroiden esittelyn lisäksi juontaja pitää huolen tilaisuuden rytmistä ja siitä, että
              ilta pysyy hallinnassa. Usein toimin samalla osittain
              myös tapahtuman kulkua koordinoivassa roolissa.
            </p>

            <h3 style={h3Tyyli}>Mitä juontajan työhön voi kuulua</h3>
            <ul className="kt-tehtavat kt-m-stack" style={{ margin: "8px 0 28px 0", padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px", maxWidth: 680 }}>
              {[
                "Ohjelman juontaminen ja eri osuuksien esittely",
                "Aikataulun seuraaminen ja ohjelman etenemisestä huolehtiminen",
                "Yhteistyö esiintyjien ja puhujien kanssa",
                "Yhteydenpito keittiöön, tapahtumapaikan henkilökuntaan ja muihin toteuttajiin",
                "Muuttuvien tilanteiden hallinta ja sujuvat siirtymät",
                "Huumoria, tilannetajua ja halutessanne myös taikuutta juontoihin",
              ].map((t) => (
                <li
                  key={t}
                  style={{
                    padding: "12px 0 12px 20px",
                    borderTop: "1px solid var(--kt-viiva)",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--kt-valo-himmea)",
                    position: "relative",
                  }}
                >
                  <span aria-hidden style={{ position: "absolute", left: 0, top: 19, width: 8, height: 8, background: "var(--kt-messinki)" }} />
                  {t}
                </li>
              ))}
            </ul>
            <p style={{ ...leipa, fontSize: 15 }}>
              Juonnon ja koordinoinnin laajuus sovitaan aina tilaisuuden mukaan. Valmistaudun käsikirjoituksen ja
              ohjelman pohjalta, ja käymme ne yhdessä läpi puhelimessa tai tapaamisessa.
            </p>

            <h3 style={{ ...h3Tyyli, marginTop: 36 }}>Yksin tai yhdessä muun ohjelman kanssa</h3>
            <p style={{ ...leipa, marginBottom: 32 }}>
              Juonnon voi tilata omana palvelunaan tai yhdistää <a href="#kt-p1">lavashow’hun</a>,{" "}
              <a href="#kt-p2">lähitaikuuteen</a> tai <a href="#kt-p3">Täysihoitoon</a>. Silloin sama ihminen
              pitää illan käynnissä ja tuo siihen myös oman ohjelmansa.
            </p>

            <TarjousLink cta="palvelut_juontaja" className="kt-btn-primary">
              Pyydä tarjous juonnosta
            </TarjousLink>
          </div>
        </div>
      </section>

      {/* ---- Työpajat ja puheenvuorot ---- */}
      <TyopajatJaPuheenvuorot />

      {/* ---- Näin tilaus etenee ---- */}
      <section className="kt-m-pad" style={osio("var(--kt-muste)")}>
        <div style={kehys}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "clamp(30px, 3.4vw, 52px)", lineHeight: 1.2 }}>
            Näin tilaus <span style={{ color: "var(--kt-messinki)" }}>etenee</span>
          </h2>
          <p style={leipa}>
            Tilaisuuden yksityiskohdista on helpointa jutella suoraan. Siksi soitan usein tarjouspyynnön jälkeen
            itse, niin ohjelma saadaan istumaan juuri teidän aikatauluunne.
          </p>
          <div
            className="kt-m-stack"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 40 }}
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

      <section id="ukk" className="kt-m-pad" style={osio("var(--kt-yo)")}>
        <div
          className="kt-m-stack kt-m-gap-sm"
          style={{ ...kehys, display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
              Jäikö vielä jotain mietityttämään?{" "}
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
