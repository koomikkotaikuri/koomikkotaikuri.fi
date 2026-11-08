"use server";

import { TYYPIT, type TarjousTila } from "./tarjous";
import {
  kuittausPaalla,
  lahetaIlmoitus,
  lahetaKuittaus,
  type Tarjouspyynto,
} from "./sahkoposti";
import { validoiAlkupera } from "./alkupera";

const YLEINEN_VIRHE =
  "Lähetys ei onnistunut. Kokeile hetken päästä uudelleen tai laita viesti suoraan osoitteeseen jp@koomikkotaikuri.fi.";

/* Nopeampi täyttö kuin tämä on botin merkki. Automaattitäytölläkin ihmiseltä
   menee lomakkeen avaamisesta lähetykseen useampi sekunti. */
const MIN_TAYTTOAIKA_MS = 3000;

function teksti(formData: FormData, kentta: string): string {
  const arvo = formData.get(kentta);
  return typeof arvo === "string" ? arvo.trim() : "";
}

type Validointi =
  | { ok: true; pyynto: Tarjouspyynto }
  | { ok: false; viesti: string };

/* Server Actioniin pääsee myös suoralla POST-pyynnöllä ohi lomakkeen,
   joten selaimen validointiin ei voi luottaa. */
function validoi(formData: FormData): Validointi {
  const nimi = teksti(formData, "nimi");
  const email = teksti(formData, "email");
  const puhelin = teksti(formData, "puhelin");
  const tyyppi = teksti(formData, "tyyppi");
  const pvm = teksti(formData, "pvm");
  const viesti = teksti(formData, "viesti");

  if (nimi.length < 1 || nimi.length > 100) {
    return { ok: false, viesti: "Tarkista nimi." };
  }
  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, viesti: "Tarkista sähköpostiosoite." };
  }
  if (puhelin.length < 5 || puhelin.length > 30 || !/^[+\d][\d\s()-]*$/.test(puhelin)) {
    return { ok: false, viesti: "Tarkista puhelinnumero." };
  }
  if (tyyppi !== "" && !TYYPIT.includes(tyyppi)) {
    return { ok: false, viesti: "Tarkista tilaisuuden tyyppi." };
  }
  if (pvm.length > 100) {
    return { ok: false, viesti: "Ajankohta on liian pitkä." };
  }
  if (viesti.length > 5000) {
    return { ok: false, viesti: "Viesti on liian pitkä." };
  }
  if (formData.get("lupa") !== "on") {
    return {
      ok: false,
      viesti: "Rastita vielä lupa tarjouksen lähettämiseen sähköpostitse.",
    };
  }

  return { ok: true, pyynto: { nimi, email, puhelin, tyyppi, pvm, viesti } };
}

export async function lahetaTarjouspyynto(
  _edellinen: TarjousTila,
  formData: FormData
): Promise<TarjousTila> {
  /* Hunajapurkki: ihminen ei näe kenttää, botti täyttää sen. Puhelimen
     täyttöpalvelu tai salasanamanageri voi kuitenkin täyttää sen oikealle
     ihmiselle nimestä riippumatta (todettu jppirinen.fi:ssä), joten
     täytetty kenttä yksin ei riitä hylkäämiseen: hylätään vain, jos
     lähetys tuli alle MIN_TAYTTOAIKA_MS:ssa avauksesta tai täyttöaika
     puuttuu (suora POST ohi lomakkeen). Hylkäyksestä näytetään virhe,
     jossa on puhelin ja sähköposti (lomake renderöi sen botti-lipusta):
     jos ansa joskus osuu ihmiseen, hän tietää ottaa yhteyttä suoraan
     eikä luule pyynnön menneen perille. */
  const tarkiste = teksti(formData, "kt_tarkiste");
  if (tarkiste !== "") {
    const aika = Number.parseInt(teksti(formData, "kt_aika"), 10);
    const ihmisenTahti = Number.isFinite(aika) && aika >= MIN_TAYTTOAIKA_MS;
    /* Lokiin vain pituus ja aika, ei ansakentän sisältöä. Hylätystä
       myös sähköposti, jotta väärin hylätyn asiakkaan voi tavoittaa.
       JSON.stringify estää rivinvaihdoilla väärennetyt lokirivit. */
    const aikaTeksti = Number.isFinite(aika) ? `${aika} ms` : "puuttuu";
    if (!ihmisenTahti) {
      const email = teksti(formData, "email").slice(0, 254);
      console.warn(
        `Tarjouspyyntö hylätty hunajapurkin takia (kentän pituus ${tarkiste.length}, täyttöaika ${aikaTeksti}, email ${JSON.stringify(email)}).`
      );
      return { ok: false, botti: true };
    }
    console.warn(
      `Hunajapurkki täytetty, mutta täyttöaika ${aikaTeksti} viittaa ihmiseen (automaattitäyttö?). Pyyntö käsitellään normaalisti.`
    );
  }

  const tulos = validoi(formData);
  if (!tulos.ok) {
    return { ok: false, viesti: tulos.viesti };
  }

  /* Alkuperätiedot vain ilmoituksen teknisiin otsakkeisiin; virheelliset
     kentät tyhjennetään, eivätkä ne koskaan estä lähetystä. */
  const alkupera = validoiAlkupera(formData);

  try {
    await lahetaIlmoitus(tulos.pyynto, alkupera);
  } catch (virhe) {
    console.error("Tarjouspyynnön ilmoitus epäonnistui:", virhe);
    return { ok: false, viesti: YLEINEN_VIRHE };
  }

  /* Kuittauksen epäonnistuminen ei saa näkyä asiakkaalle: tieto on jo
     perillä, eikä pyyntöä pidä lähettää uudestaan. Vaiheessa 1 tämä
     haara ei suoriudu lainkaan. */
  if (kuittausPaalla()) {
    try {
      await lahetaKuittaus(tulos.pyynto);
    } catch (virhe) {
      console.error("Tarjouspyynnön kuittaus epäonnistui:", virhe);
    }
  }

  return { ok: true };
}
