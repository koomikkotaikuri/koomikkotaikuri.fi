import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { clientLogos } from "@/components/site/LogoWall";
import { TeemaHero } from "@/components/teema/TeemaHero";
import { KiireNauha } from "@/components/teema/KiireNauha";
import { TapaKortit, type Tapa } from "@/components/teema/TapaKortit";
import { TeemaVideo } from "@/components/teema/TeemaVideo";
import { Todisteet, type Lainaus } from "@/components/teema/Todisteet";
import { Askeleet, type Askel } from "@/components/teema/Askeleet";
import { TeemaUkk } from "@/components/teema/TeemaUkk";
import { TarjousOletus } from "@/components/teema/TarjousOletus";
import Link from "next/link";
import { pageMetadata } from "@/lib/site-metadata";
import { faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { PROMO_VIDEO_ID } from "@/lib/videot";
import type { UkkItem } from "@/lib/ukk";

const POLKU = "/pikkujoulut";
const TYYPPI = "Pikkujoulut";
const CTA = "Kysy vapaata päivää";

const KUVAUS =
  "Pikkujouluohjelma yritykselle: stand up, taikuutta ja juonto samalta esiintyjältä. 28 vuotta, 1500+ tapahtumaa, 100 % tyytyväisyystakuu.";

export const metadata: Metadata = pageMetadata({
  title: "Pikkujouluohjelma 2026 | Stand up ja taikuutta | Koomikkotaikuri JP Pirinen",
  description: KUVAUS,
  path: POLKU,
});

/* Kestot ja sisällöt samat kuin /palvelut-sivulla ja Paketit-komponentissa.
   Hintoja ei näytetä ennen kuin JP on päättänyt asiasta. */
const tavat: Tapa[] = [
  {
    kickerText: "Show lavalla · 30-40 min",
    title: "Show lavalla",
    text: "Stand up ja taikuutta koko yleisölle. Numerot alkavat pienestä ja kasvavat isommiksi, ja koko sali nauraa yhtä aikaa. Myös takarivi.",
    bullets: [
      "Toimii 30 hengen porukasta tuhannen hengen saliin",
      "Tarvitaan äänentoisto ja valaistu esiintymistila",
      "Sijoitetaan puheiden jälkeen, ennen tanssia",
    ],
  },
  {
    kickerText: "Close-up vieraiden joukossa · 30-60 min",
    title: "Close-up vieraiden joukossa",
    text: "Taikuutta pöydissä ja minglauksessa, käden ulottuvilla ja omissa käsissä. Ei vaadi lavaa, tekniikkaa eikä ohjelmataukoa.",
    bullets: [
      "Toimii cocktail-osuudessa ja ruokailun lomassa",
      "Murtaa jään, kun porukka ei vielä tunne toisiaan",
      "Sopii myös pienelle joukolle ja ahtaaseen tilaan",
    ],
  },
  {
    kickerText: "Koko ilta · Show, close-up ja juonto",
    title: "Koko ilta",
    text: "Close-up alkuun, show pääohjelmaksi ja juonto pitämään aikataulun kasassa. Yksi esiintyjä, yksi lasku ja yksi yhteyshenkilö.",
    bullets: [
      "Palkitsemiset, puheet ja tauot kulkevat sujuvasti",
      "Tunnelma pysyy yllä myös väliaikoina",
      "Sinä ehdit itsekin juhlimaan",
    ],
    badge: "Suosituin",
  },
];

/* Vain yritysasiakkaat: ei virkamiehiä eikä kuntia (Meta-mainonnan käytännöt). */
const lainaukset: Lainaus[] = [
  {
    quote: "Harvoin näkee yhden illan aikana noin paljon epäuskoisia ja hämmentyneitä ilmeitä.",
    name: "Jussi Vänttinen",
    org: "Toimitusjohtaja, Orange Advertising · pikkujoulut",
  },
  {
    quote: "Olit aivan mieletön. Jos joskus sai nauraa, niin nyt.",
    name: "Päivi Tick",
    org: "Myyntisihteeri, NCC Rakennus Oy · henkilöstöjuhla",
  },
  {
    quote: "Esitys toi juhlaan juuri sitä ekstraa, mitä kaivattiin.",
    name: "Jennamaria Pennanen",
    org: "Johdon assistentti, HOAS · vuosijuhla",
  },
];

const logot = clientLogos.filter((l) => l.alt !== "Kouvolan kaupunki");

const askeleet: Askel[] = [
  {
    title: "Kerro päivä, paikka ja vieraiden määrä.",
    text: "Lomakkeeseen menee minuutti. Arvio riittää, tarkat tiedot sovitaan myöhemmin.",
  },
  {
    title: "Saat ehdotuksen ja hinnan.",
    text: "Vastaan nopeasti sähköpostilla: suositus sopivasta kokonaisuudesta ja kiinteä hinta. Ei myyntipuheluita.",
  },
  {
    title: "Sinä keskityt juhlimaan.",
    text: "Saavun ajoissa, sovin tekniikan paikan päällä ja hoidan oman osuuteni. Sinä saat kiitokset.",
  },
];

/* Vastaukset pohjautuvat /ukk-sivun vastauksiin (lib/ukk.ts), ei uusia faktoja. */
const ukk: UkkItem[] = [
  {
    title: "Kuinka pitkä pikkujouluohjelma on?",
    content:
      "Show lavalla kestää noin 30-40 minuuttia ja close-up vieraiden joukossa 30-60 minuuttia. Pituus räätälöidään aina tilaisuuden aikataulun mukaan: lyhyempi, tiivis paketti toimii yllätysnumerona ohjelman lomassa, pidempi kokonaisuus silloin, kun toimin illan pääohjelmana tai juontajana. Tarkka kesto sovitaan tarjousvaiheessa.",
  },
  {
    title: "Mitä tekniikkaa ja tilaa esitys tarvitsee?",
    content:
      "Lavashow vaatii äänentoiston, johon voi kiinnittää headset-mikrofonin ja mp3-soittimen. Alle 50 hengen tilaisuuksiin äänentoisto järjestyy suoraan minun kauttani, isompiin löytyy tarvittaessa yhteistyökumppani. Lavaa ei tarvita, mutta tila ja valaistus täytyy olla sellaiset, että kaikki näkevät esiintyjän. Valaistus järjestyy tilaajan puolesta.\n\nClose-up ei vaadi lavaa, tekniikkaa eikä ohjelmataukoa.",
  },
  {
    title: "Sopiiko ohjelma pienelle tai isolle porukalle?",
    content:
      "Kyllä. Lavashow toimii 30 hengen kokouksesta tuhannen hengen saliin, ja close-up toimii myös pienelle joukolle ja ahtaaseen tilaan. Olen esiintynyt konserttitaloissa ja kesämökin laiturilla, joten ohjelma sopeutuu erilaisiin puitteisiin. Sisältö on suunnattu aikuisyleisölle.",
  },
  {
    title: "Mihin kohtaan iltaa ohjelma kannattaa sijoittaa?",
    content:
      "Lähelle virallisen ohjelman loppua: yleensä puheiden perään, pää- ja jälkiruuan väliin tai jälkiruuan jälkeen. Ei liian myöhään. Jos illassa on bändi tai tanssia, esitys sijoitetaan ehdottomasti ennen niitä. Varsinaisen ruokailun aikana esitystä ei kannata pitää, sillä tarjoilu ja keskustelu vievät yleisön huomion.",
  },
  {
    title: "Onnistuuko pikkujouluohjelma englanniksi?",
    content:
      "Kyllä, esiinnyn myös englanniksi. Esitys on alun perin kasattu suomeksi ja sanaleikit ovat keskeinen osa ohjelmaa, joten sisältöä sovelletaan kielen mukaan ja pituus voi hieman vaihdella. Jos yleisössä on kansainvälisiä vieraita, mainitse siitä tarjouspyynnössä.",
  },
  {
    title: "Mitkä ovat peruutusehdot?",
    content:
      "30 vuorokauden peruutusoikeus molemmilla osapuolilla ilman seuraamuksia. 15-30 päivää ennen tilaisuutta laskutetaan 50 %, alle kaksi viikkoa ennen 100 %. Jos joudun itse perumaan sairauden vuoksi, sitoudun löytämään yhtä tasokkaan esiintyjän. Tarkat ehdot löytyvät Ehdot-sivulta.",
  },
  {
    title: "Onko pakko osallistua?",
    content:
      "Ei. Osa ohjelmasta rakentuu vuorovaikutukselle yleisön kanssa, mutta osallistuminen on aina vapaaehtoista ja kunnioittavaa. Ketään ei raahata lavalle vastoin tahtoaan. Jos tilaisuudessa on henkilöitä, joita ei haluta nostaa esiin, mainitse siitä etukäteen.",
  },
];

const jsonLd = [
  serviceJsonLd({
    name: "Pikkujouluohjelma yritykselle",
    serviceType: "Pikkujouluohjelma: stand up, taikuutta ja juonto",
    description: KUVAUS,
    path: POLKU,
  }),
  faqJsonLd(ukk),
];

export default function Pikkujoulut() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <JsonLd data={jsonLd} />
      <TarjousOletus tyyppi={TYYPPI} />
      <Nav />

      <TeemaHero
        kickerText="Pikkujoulut 2026"
        title="Pikkujouluohjelma, josta puhutaan vielä maanantaina."
        sub="Stand up, taikuutta ja juonto samalta esiintyjältä. Sinä hoidat tarjoilut, minä hoidan loput."
        ctaLabel={CTA}
        tyyppi={TYYPPI}
        luottamus={["1500+ tapahtumaa", "28 vuotta lavalla", "100 % tyytyväisyystakuu"]}
        kuva={{
          src: "/images/luumupuku-korttiviuhka-01-web.webp",
          alt: "Koomikkotaikuri JP Pirinen nauraa korttiviuhka kädessä",
          objectPosition: "center 20%",
        }}
      />

      <KiireNauha
        teksti="Joulukuun perjantait menevät ensin. Torstait ovat aliarvostettuja."
        ctaLabel={CTA}
        tyyppi={TYYPPI}
      />

      <TapaKortit
        rule="Ohjelma"
        ruleRight="Show · Close-up · Koko ilta"
        title="Ohjelmaa pikkujouluihin kolmella tavalla"
        intro="Valitse, kuinka iso pala illasta annetaan minulle. Kaikissa vaihtoehdoissa sama esiintyjä, sama huumori ja sama lupaus: yleisö ei jää pelkäksi katsojaksi."
        tavat={tavat}
        ctaLabel={CTA}
        tyyppi={TYYPPI}
        lisalinkki={{ href: "/palvelut", label: "Katso kaikki palvelut ja paketit →" }}
      />

      <TeemaVideo
        rule="Video"
        title="Taikuri vai koomikko pikkujouluihin? Molemmat."
        intro="Koomikko saa salin nauramaan. Taikuri saa sen hetkeksi hiljaiseksi ja sitten nauramaan vielä kovempaa. Kun molemmat tulevat samasta mikistä, iltaa ei tarvitse koota kolmesta eri esiintyjästä. Katso video, niin tiedät mitä tilaat."
        videoId={PROMO_VIDEO_ID}
        videoTitle="Koomikkotaikuri JP Pirinen – esittelyvideo"
        poster="/images/lava-esitys-yleiso-01.webp"
      />

      <Todisteet
        rule="Asiakkaat"
        title="Esiintyjä pikkujouluihin, jonka yritykset muistavat"
        intro="Pikkujouluja, henkilöstöjuhlia ja vuosijuhlia yli 1500 tapahtuman verran. Tässä muutama, jotka kertoivat jälkeenpäin miltä tuntui."
        logot={logot}
        lainaukset={lainaukset}
        lisalinkki={{ href: "/asiakkaat", label: "Lue lisää asiakkaiden kokemuksia →" }}
      />

      <Askeleet rule="Näin se etenee" title="Näin se etenee" askeleet={askeleet} />

      <TeemaUkk
        rule="UKK"
        title="Usein kysyttyä pikkujouluohjelmasta"
        intro="Kesto, tekniikka, kieli ja peruutukset. Jos jokin jää vielä askarruttamaan, kerro tilaisuudestasi suoraan lomakkeella."
        items={ukk}
        alaviite={
          <>
            Tarkat peruutus- ja laskutusehdot ovat <Link href="/ehdot">Ehdot-sivulla</Link>. Kaikki muut
            kysymykset löytyvät <Link href="/ukk">UKK-sivulta</Link>.
          </>
        }
      />

      <CtaBand
        title="Kerro päivä,"
        accent="niin kerron onko se vielä vapaana."
        label={CTA.toUpperCase()}
        tyyppi={TYYPPI}
      />

      <Footer
        links={[
          { label: "Palvelut", href: "/palvelut" },
          { label: "Asiakkaat", href: "/asiakkaat" },
          { label: "UKK", href: "/ukk" },
          { label: "Ehdot", href: "/ehdot" },
          { label: "Yhteystiedot", href: "/media#yhteystiedot" },
        ]}
      />
    </div>
  );
}
