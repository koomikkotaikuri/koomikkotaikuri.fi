"use server";

import { TYYPIT, type TarjousTila } from "./tarjous";
import {
  kuittausPaalla,
  lahetaIlmoitus,
  lahetaKuittaus,
  type Tarjouspyynto,
} from "./sahkoposti";

const YLEINEN_VIRHE =
  "Lähetys ei onnistunut. Kokeile hetken päästä uudelleen tai laita viesti suoraan osoitteeseen jp@koomikkotaikuri.fi.";

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
  /* Hunajapurkki: ihminen ei näe kenttää, botti täyttää sen.
     Näytetään kiitos mutta ei lähetetä — botin ei tarvitse tietää. */
  if (teksti(formData, "yritys") !== "") {
    return { ok: true };
  }

  const tulos = validoi(formData);
  if (!tulos.ok) {
    return { ok: false, viesti: tulos.viesti };
  }

  try {
    await lahetaIlmoitus(tulos.pyynto);
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
