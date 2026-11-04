import { Resend } from "resend";
import { alkuperaOtsakkeet, type Alkupera } from "./alkupera";

export type Tarjouspyynto = {
  nimi: string;
  email: string;
  puhelin: string;
  tyyppi: string;
  pvm: string;
  viesti: string;
};

const VASTAANOTTAJA = "jp@koomikkotaikuri.fi";
const OLETUSLAHETTAJA = "Lomake - Koomikkotaikuri <onboarding@resend.dev>";

/* Avain luetaan kutsuhetkellä, ei moduulin latautuessa: muuten pelkkä
   tuonti kaataisi sivuston silloin kun ympäristömuuttuja puuttuu. */
function asiakas(): Resend {
  const avain = process.env.RESEND_API_KEY;
  if (!avain) throw new Error("RESEND_API_KEY puuttuu ympäristömuuttujista.");
  return new Resend(avain);
}

function lahettaja(): string {
  return process.env.TARJOUS_LAHETTAJA || OLETUSLAHETTAJA;
}

/* Vaiheessa 1 pois päältä: Resend torppaa lähetykset tuntemattomiin
   osoitteisiin ennen kuin domain on verifioitu. */
export function kuittausPaalla(): boolean {
  return process.env.TARJOUS_KUITTAUS === "on";
}

function ilmoitusTeksti(p: Tarjouspyynto): string {
  return [
    "Uusi tarjouspyyntö koomikkotaikuri.fi-sivustolta.",
    "",
    `Nimi:       ${p.nimi}`,
    `Sähköposti: ${p.email}`,
    `Puhelin:    ${p.puhelin}`,
    `Tilaisuus:  ${p.tyyppi || "-"}`,
    `Ajankohta:  ${p.pvm || "-"}`,
    "",
    "Viesti:",
    p.viesti || "-",
  ].join("\n");
}

function kuittausTeksti(p: Tarjouspyynto): string {
  return [
    `Hei ${p.nimi},`,
    "",
    "Kiitos viestistä.",
    "",
    "Pyrin vastaamaan seuraavan arkipäivän aikana tarjouksella tai tarkentavilla kysymyksillä.",
    "",
    "Vahvistus vasta, kun olet tyytyväinen.",
    "",
    "Jos tulee mieleen lisätietoja tai kysymyksiä, vastaa vain tähän viestiin, soita tai laita viestiä.",
    "",
    "Pirinen J-P",
    "Koomikkotaikuri",
    "+358 (0) 44 555 6669",
    "jp@koomikkotaikuri.fi",
    "",
    "www.koomikkotaikuri.fi",
  ].join("\n");
}

/* Ilmoituksen Resend-payload. Alkuperätiedot (lib/alkupera.ts) menevät
   VAIN X-Lead-*-otsakkeisiin: runko ja otsikko pysyvät ennallaan, koska ne
   lainautuvat asiakkaalle lähtevään vastaukseen. Gmailissa otsakkeet näkyvät
   kohdasta "Näytä alkuperäinen". */
export function ilmoitusViesti(p: Tarjouspyynto, alkupera?: Alkupera) {
  const headers = alkupera ? alkuperaOtsakkeet(alkupera) : {};
  return {
    from: lahettaja(),
    to: VASTAANOTTAJA,
    replyTo: p.email,
    subject: `Tarjouspyyntö: ${p.tyyppi || "tilaisuus"} – ${p.nimi}`,
    text: ilmoitusTeksti(p),
    ...(Object.keys(headers).length > 0 ? { headers } : {}),
  };
}

/* Kuittaus asiakkaalle: ei koskaan alkuperätietoja eikä otsakkeita. */
export function kuittausViesti(p: Tarjouspyynto) {
  return {
    from: lahettaja(),
    to: p.email,
    replyTo: VASTAANOTTAJA,
    subject: "Kiitos tarjouspyynnöstä",
    text: kuittausTeksti(p),
  };
}

export async function lahetaIlmoitus(p: Tarjouspyynto, alkupera?: Alkupera): Promise<void> {
  const { error } = await asiakas().emails.send(ilmoitusViesti(p, alkupera));
  if (error) throw new Error(`Resend hylkäsi ilmoituksen: ${error.message}`);
}

export async function lahetaKuittaus(p: Tarjouspyynto): Promise<void> {
  const { error } = await asiakas().emails.send(kuittausViesti(p));
  if (error) throw new Error(`Resend hylkäsi kuittauksen: ${error.message}`);
}
