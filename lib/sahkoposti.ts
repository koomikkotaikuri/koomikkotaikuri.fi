import { Resend } from "resend";

export type Tarjouspyynto = {
  nimi: string;
  email: string;
  tyyppi: string;
  pvm: string;
  viesti: string;
};

const VASTAANOTTAJA = "jp@koomikkotaikuri.fi";
const OLETUSLAHETTAJA = "Koomikkotaikuri <onboarding@resend.dev>";

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
    `Tilaisuus:  ${p.tyyppi || "-"}`,
    `Ajankohta:  ${p.pvm || "-"}`,
    "",
    "Viesti:",
    p.viesti || "-",
    "",
    "--",
    "Vastaa tähän viestiin, niin vastaus menee suoraan asiakkaalle.",
  ].join("\n");
}

function kuittausTeksti(p: Tarjouspyynto): string {
  return [
    `Hei ${p.nimi},`,
    "",
    "kiitos tarjouspyynnöstä. Sain viestisi ja palaan asiaan mahdollisimman pian.",
    "",
    "Jos asialla on kiire, voit vastata suoraan tähän viestiin.",
    "",
    "Ystävällisin terveisin,",
    "JP Pirinen",
    "Koomikkotaikuri",
    "jp@koomikkotaikuri.fi",
  ].join("\n");
}

export async function lahetaIlmoitus(p: Tarjouspyynto): Promise<void> {
  const { error } = await asiakas().emails.send({
    from: lahettaja(),
    to: VASTAANOTTAJA,
    replyTo: p.email,
    subject: `Tarjouspyyntö: ${p.tyyppi || "tilaisuus"} – ${p.nimi}`,
    text: ilmoitusTeksti(p),
  });
  if (error) throw new Error(`Resend hylkäsi ilmoituksen: ${error.message}`);
}

export async function lahetaKuittaus(p: Tarjouspyynto): Promise<void> {
  const { error } = await asiakas().emails.send({
    from: lahettaja(),
    to: p.email,
    replyTo: VASTAANOTTAJA,
    subject: "Kiitos tarjouspyynnöstä",
    text: kuittausTeksti(p),
  });
  if (error) throw new Error(`Resend hylkäsi kuittauksen: ${error.message}`);
}
