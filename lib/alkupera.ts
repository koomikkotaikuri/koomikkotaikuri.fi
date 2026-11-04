/* Tarjouspyynnön alkuperä: mistä kävijä saapui sivustolle, millä sivulla ja
   millä painikkeella hän avasi lomakkeen ja millä sivulla lähetys tapahtui.

   Tiedot kulkevat kahteen paikkaan:
   - GA4: Generate_lead- ja form_open-tapahtumien parametreina (ei
     henkilötietoja, ei lomakkeen sisältöä).
   - Ilmoitussähköposti: vain teknisinä X-Lead-*-otsakkeina, ei koskaan
     viestirunkoon eikä asiakkaan kuittaukseen. Otsakkeet eivät kopioidu
     vastaukseen, joten asiakas ei näe niitä, kun JP vastaa viestiin.

   Saapumistiedot pidetään pelkässä muistissa (ei localStorage, sessionStorage
   eikä evästeitä), joten ne eivät vaadi suostumusta. Next.js:n sisäinen
   navigointi ei lataa sivua uudelleen, joten tieto säilyy välilehden ajan;
   täysi uudelleenlataus tai uusi välilehti aloittaa alusta. */

/* Avaustapa. "floating" = sivupalkin Yhteys-liuska ja mobiilin alapalkki. */
export const LAHTEET = ["floating", "page_cta", "nav", "url_hash"] as const;
export type Lahde = (typeof LAHTEET)[number];

/* Avauksen tiedot välitetään openTarjous-kutsussa. cta on painikkeen
   pysyvä tunniste (esim. "hero", "cta_band"); sivu tulee polusta. */
export type TarjousAvaus = { lahde: Lahde; cta: string };

export const UTM_AVAIMET = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
type UtmAvain = (typeof UTM_AVAIMET)[number];

export type Saapuminen = {
  laskeutumissivu: string;
  utm: Partial<Record<UtmAvain, string>>;
  viittaaja: string;
  klikkitunnisteet: string[];
};

/* Lomakkeen piilokenttien nimet. Kentät lisätään FormDataan vasta
   lähetyshetkellä (Tarjouslomake), eivät näy DOM:ssa. */
export const KENTAT = {
  liidi: "kt_liidi",
  lahde: "kt_lahde",
  cta: "kt_cta",
  avaussivu: "kt_avaussivu",
  lahetyssivu: "kt_lahetyssivu",
  laskeutumissivu: "kt_laskeutumissivu",
  viittaaja: "kt_viittaaja",
  klikkitunnisteet: "kt_klikki",
  ...Object.fromEntries(UTM_AVAIMET.map((k) => [k, `kt_${k}`])),
} as Record<"liidi" | "lahde" | "cta" | "avaussivu" | "lahetyssivu" | "laskeutumissivu" | "viittaaja" | "klikkitunnisteet" | UtmAvain, string>;

const KLIKKITUNNISTEET = ["gclid", "gbraid", "wbraid", "fbclid", "msclkid"];

/* Puhdas funktio: poimii saapumistiedot URL:stä ja viittaajasta. Klikki-
   tunnisteista tallennetaan vain nimi (esim. "gclid"), ei itse arvoa. */
export function lueSaapuminen(href: string, referrer: string): Saapuminen {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return { laskeutumissivu: "", utm: {}, viittaaja: "", klikkitunnisteet: [] };
  }
  const utm: Saapuminen["utm"] = {};
  for (const avain of UTM_AVAIMET) {
    const arvo = url.searchParams.get(avain);
    if (arvo) utm[avain] = arvo.slice(0, 100);
  }
  let viittaaja = "";
  try {
    const r = new URL(referrer);
    /* Oma sivusto viittaajana ei kerro mitään saapumisesta. */
    if (r.hostname !== url.hostname) viittaaja = r.hostname;
  } catch {}
  return {
    laskeutumissivu: url.pathname,
    utm,
    viittaaja,
    klikkitunnisteet: KLIKKITUNNISTEET.filter((k) => url.searchParams.has(k)),
  };
}

let saapuminen: Saapuminen | null = null;

/* Kutsutaan kerran ensimmäisellä latauksella (Tarjouslomake on juuri-
   layoutissa, joten sen ensimmäinen efekti ajetaan laskeutumissivulla).
   Myöhemmät kutsut eivät ylikirjoita. */
export function kirjaaSaapuminen() {
  if (saapuminen || typeof window === "undefined") return;
  saapuminen = lueSaapuminen(window.location.href, document.referrer);
}

export function haeSaapuminen(): Saapuminen | null {
  return saapuminen;
}

/* Vain testejä varten. */
export function nollaaSaapuminen() {
  saapuminen = null;
}

/* Liittää alkuperätiedot lähetettävään FormDataan. */
export function liitaAlkupera(
  formData: FormData,
  tiedot: {
    liidi: string;
    avaus: TarjousAvaus;
    avaussivu: string;
    lahetyssivu: string;
    saapuminen: Saapuminen | null;
  },
) {
  const s = tiedot.saapuminen;
  formData.set(KENTAT.liidi, tiedot.liidi);
  formData.set(KENTAT.lahde, tiedot.avaus.lahde);
  formData.set(KENTAT.cta, tiedot.avaus.cta);
  formData.set(KENTAT.avaussivu, tiedot.avaussivu);
  formData.set(KENTAT.lahetyssivu, tiedot.lahetyssivu);
  if (!s) return;
  formData.set(KENTAT.laskeutumissivu, s.laskeutumissivu);
  formData.set(KENTAT.viittaaja, s.viittaaja);
  formData.set(KENTAT.klikkitunnisteet, s.klikkitunnisteet.join(","));
  for (const avain of UTM_AVAIMET) {
    const arvo = s.utm[avain];
    if (arvo) formData.set(KENTAT[avain], arvo);
  }
}

/* ---------- Palvelinpuoli ---------- */

export type Alkupera = {
  liidi: string;
  lahde: string;
  cta: string;
  avaussivu: string;
  lahetyssivu: string;
  laskeutumissivu: string;
  viittaaja: string;
  klikkitunnisteet: string;
  utm: Partial<Record<UtmAvain, string>>;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CTA = /^[a-z0-9_]{1,40}$/;
/* location.pathname on valmiiksi prosenttikoodattu, joten sallitaan vain
   URL-polun merkit. Tämä torjuu myös rivinvaihdot (otsakeinjektio). */
const POLKU = /^\/[A-Za-z0-9\-._~%!$&'()*+,;=:@/]{0,199}$/;
const HOST = /^[A-Za-z0-9.-]{1,253}$/;

function arvo(formData: FormData, kentta: string): string {
  const a = formData.get(kentta);
  return typeof a === "string" ? a.trim() : "";
}

function jos(arvo: string, ehto: RegExp): string {
  return ehto.test(arvo) ? arvo : "";
}

/* Lomakkeelta tulevaan dataan ei voi luottaa (Server Actioniin pääsee myös
   suoralla POSTilla). Virheellinen kenttä tyhjennetään eikä se koskaan
   estä lähetystä. */
export function validoiAlkupera(formData: FormData): Alkupera {
  const lahde = arvo(formData, KENTAT.lahde);
  const utm: Alkupera["utm"] = {};
  for (const avain of UTM_AVAIMET) {
    const a = arvo(formData, KENTAT[avain])
      .replace(/[\u0000-\u001f\u007f]/g, "")
      .slice(0, 100);
    if (a) utm[avain] = a;
  }
  return {
    liidi: jos(arvo(formData, KENTAT.liidi), UUID),
    lahde: (LAHTEET as readonly string[]).includes(lahde) ? lahde : "",
    cta: jos(arvo(formData, KENTAT.cta), CTA),
    avaussivu: jos(arvo(formData, KENTAT.avaussivu), POLKU),
    lahetyssivu: jos(arvo(formData, KENTAT.lahetyssivu), POLKU),
    laskeutumissivu: jos(arvo(formData, KENTAT.laskeutumissivu), POLKU),
    viittaaja: jos(arvo(formData, KENTAT.viittaaja), HOST),
    klikkitunnisteet: arvo(formData, KENTAT.klikkitunnisteet)
      .split(",")
      .filter((k) => KLIKKITUNNISTEET.includes(k))
      .join(","),
    utm,
  };
}

/* Otsakkeisiin vain tulostettavaa ASCII:ta. Muut merkit (ääkköset, emojit)
   sekä erottimet ; = % prosenttikoodataan, jotta arvo on yksiselitteinen. */
function otsakearvo(s: string): string {
  return s.replace(/[^\x20-\x7E]|[;=%]/gu, (m) => encodeURIComponent(m));
}

/* Vain ilmoitussähköpostiin (lahetaIlmoitus). Tyhjät jätetään pois. */
export function alkuperaOtsakkeet(a: Alkupera): Record<string, string> {
  const utm = UTM_AVAIMET.filter((k) => a.utm[k])
    .map((k) => `${k.slice(4)}=${otsakearvo(a.utm[k]!)}`)
    .join("; ");
  const rivit: [string, string][] = [
    ["X-Lead-Id", a.liidi],
    ["X-Lead-Source", a.lahde],
    ["X-Lead-Cta", a.cta],
    ["X-Lead-Open-Page", a.avaussivu],
    ["X-Lead-Submit-Page", a.lahetyssivu],
    ["X-Lead-Landing-Page", a.laskeutumissivu],
    ["X-Lead-Referrer", a.viittaaja],
    ["X-Lead-Utm", utm],
    ["X-Lead-Click-Id", a.klikkitunnisteet],
  ];
  return Object.fromEntries(rivit.filter(([, v]) => v !== ""));
}
