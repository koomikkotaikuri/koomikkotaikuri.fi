# Tarjouslomakkeen sähköpostilähetys — toteutussuunnitelma

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tarjouslomakkeen lähetys toimittaa pyynnön sähköpostilla osoitteeseen `jp@koomikkotaikuri.fi`, ja kiitosnäkymä näytetään vasta kun lähetys on oikeasti onnistunut.

**Architecture:** React Server Action ottaa vastaan `FormData`-olion, validoi sen palvelimella ja kutsuu erillistä sähköpostimoduulia, joka puhuu Resendin kanssa. Lomakekomponentti kytketään actioniin `useActionState`-koukulla, joka tuo mukanaan `pending`-tilan ja paluuarvon virheilmoitusta varten.

**Tech Stack:** Next.js 16.2.4 (App Router, Server Actions), React 19.2.4, TypeScript, Resend.

**Speksi:** `docs/superpowers/specs/2026-08-25-lomake-sahkoposti-design.md`

## Global Constraints

- **Ei uutta testikehystä.** Projektissa ei ole testejä eikä testiajuria, ja speksi rajaa tämän käsin testattavaksi. Validointi kirjoitetaan silti puhtaana funktiona, jotta yksikkötestit voi lisätä myöhemmin ilman uudelleenkirjoitusta. Tämä poikkeaa writing-plans-skillin TDD-oletuksesta tietoisesti.
- **Kaikki käyttäjälle näkyvä teksti suomeksi.** Myös muuttujien ja funktioiden nimet ovat suomeksi, kuten muualla projektissa (`Tarjouslomake`, `openTarjous`, `lib/ukk.ts`).
- **Tyyleissä käytetään olemassa olevia CSS-muuttujia**, ei kovakoodattuja värejä. Virheväri on `var(--kt-error)`.
- **Vaihe 1:** lähettäjä `onboarding@resend.dev`, asiakaskuittaus pois päältä. Kuittauskoodi kirjoitetaan valmiiksi mutta se ei suoritu ennen kuin `TARJOUS_KUITTAUS=on`.
- **Vastaanottaja `jp@koomikkotaikuri.fi` on koodissa vakiona**, ei ympäristömuuttujassa.
- **`.env.local` on jo olemassa ja täytetty.** Sitä ei committoida (`.gitignore` rivi 34).

## Poikkeama speksistä

Speksi määritteli asiakaskuittauksen lähettäjäksi `JP Pirinen <jp@koomikkotaikuri.fi>`, eri kuin ilmoituksen lähettäjä. Se vaatisi neljännen ympäristömuuttujan. Yksinkertaistus: **molemmat viestit käyttävät samaa `TARJOUS_LAHETTAJA`-osoitetta**, ja kuittauksen `reply-to` osoitetaan JP:lle. Lopputulos asiakkaalle on sama — vastaus menee JP:lle — yhdellä liikkuvalla osalla vähemmän.

## Tiedostorakenne

| Tiedosto | Vastuu |
|----------|--------|
| `lib/sahkoposti.ts` (uusi) | Resend-asiakas ja viestipohjat. Ainoa paikka joka tietää Resendistä. |
| `lib/tarjouspyynto.ts` (uusi) | `"use server"` — Server Action, validointi, roskapostisuodatus. Ei tiedä viestien muotoilusta. |
| `lib/tarjous.ts` (muokataan) | Jaettu data: `TYYPIT` ja `TarjousTila`. Sekä selain- että palvelinpuoli käyttää. |
| `components/site/Tarjouslomake.tsx` (muokataan) | Käyttöliittymä. |
| `app/globals.css` (muokataan) | `.kt-btn-primary:disabled` -tyyli. |

**Miksi kolme lib-tiedostoa kahden sijaan:** `"use server"`-tiedosto saa viedä ulos **vain async-funktioita**. `TYYPIT`-taulukkoa ja `TarjousTila`-tyyppiä ei siis voi viedä actionin tiedostosta, ja lomakekomponentti tarvitsee molempia. Ne menevät olemassa olevaan `lib/tarjous.ts`-tiedostoon, jonka selainkomponentit jo tuovat sisään.

---

### Task 1: Sähköpostimoduuli

Rakentaa lähetyksen ja todistaa erillisellä ajolla, että viesti tulee oikeasti perille — ennen kuin mitään kytketään käyttöliittymään.

**Files:**
- Create: `lib/sahkoposti.ts`
- Create (väliaikainen, poistetaan vaiheessa 7): `scripts/koeposti.mjs`
- Modify: `package.json` (riippuvuus)

**Interfaces:**
- Consumes: ei mitään aiemmista tehtävistä.
- Produces:
  - `type Tarjouspyynto = { nimi: string; email: string; tyyppi: string; pvm: string; viesti: string }`
  - `lahetaIlmoitus(p: Tarjouspyynto): Promise<void>` — heittää poikkeuksen jos Resend hylkää
  - `lahetaKuittaus(p: Tarjouspyynto): Promise<void>` — heittää poikkeuksen jos Resend hylkää
  - `kuittausPaalla(): boolean`

- [ ] **Step 1: Asenna Resend**

```bash
npm install resend
```

- [ ] **Step 2: Varmista kenttänimi `replyTo` asennetusta paketista**

Resendin SDK vaihtoi tämän `reply_to` → `replyTo` versiossa 4. Väärä nimi ei aiheuta virhettä, vaan viesti lähtee **ilman reply-to-otsikkoa** — vika huomattaisiin vasta kun vastaaminen ei toimi. Tarkista tyypeistä:

```bash
grep -rn "replyTo\|reply_to" node_modules/resend/dist/index.d.ts | head
```

Jos tuloksissa näkyy vain `reply_to`, käytä sitä nimeä kaikissa alla olevissa koodeissa.

- [ ] **Step 3: Kirjoita `lib/sahkoposti.ts`**

```ts
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
```

Huomaa: `asiakas()` luetaan kutsuhetkellä eikä moduulin latautuessa. Jos avain luettaisiin ylätasolla, moduulin tuonti kaataisi koko sivuston silloin kun ympäristömuuttuja puuttuu.

- [ ] **Step 4: Kirjoita väliaikainen koeajo `scripts/koeposti.mjs`**

```js
import { lahetaIlmoitus } from "../lib/sahkoposti.ts";

await lahetaIlmoitus({
  nimi: "Koe Testaaja",
  email: "koe@example.com",
  tyyppi: "Pikkujoulut",
  pvm: "joulukuu 2026",
  viesti: "Tämä on koelähetys suunnitelman vaiheesta 1.",
});

console.log("Lähetetty.");
```

- [ ] **Step 5: Aja koeajo**

Node v26 osaa sekä lukea `.env.local`-tiedoston että suorittaa TypeScriptiä suoraan:

```bash
node --env-file=.env.local scripts/koeposti.mjs
```

Odotettu tulos: tulostuu `Lähetetty.` ja viesti saapuu postilaatikkoon `jp@koomikkotaikuri.fi`.

Jos Node valittaa TypeScript-tuonnista, aja sen sijaan `node --env-file=.env.local --experimental-strip-types scripts/koeposti.mjs`.

Jos sekään ei toimi, **älä jää jumiin tähän**: poista koeajo, committaa moduuli sellaisenaan ja siirry eteenpäin. Sama lähetyspolku tulee joka tapauksessa testatuksi tehtävän 3 vaiheessa 11, jolloin sen ajaa Next.js:n oma palvelin. Koeajo on vain aikaisempi ja kapeampi tarkistuspiste, ei välttämättömyys. Siirrä silloin myös vaiheen 6 reply-to-tarkistus tehtävän 3 testeihin.

- [ ] **Step 6: Tarkista saapunut viesti**

Postilaatikossa `jp@koomikkotaikuri.fi`:
- otsikko on `Tarjouspyyntö: Pikkujoulut – Koe Testaaja`
- kentät näkyvät oikein, ääkköset eivät ole rikki
- **paina Vastaa** — vastaanottajaksi täytyy täyttyä `koe@example.com`, ei `onboarding@resend.dev`. Jos täyttyy väärin, `replyTo`-kenttänimi on väärä; palaa vaiheeseen 2.

- [ ] **Step 7: Poista koeajo ja committaa**

```bash
rm scripts/koeposti.mjs
rmdir scripts 2>/dev/null
git add lib/sahkoposti.ts package.json package-lock.json
git commit -m "Add Resend email module for tarjouspyynto delivery"
```

---

### Task 2: Server Action ja validointi

**Files:**
- Create: `lib/tarjouspyynto.ts`
- Modify: `lib/tarjous.ts`

**Interfaces:**
- Consumes: `lahetaIlmoitus`, `lahetaKuittaus`, `kuittausPaalla`, `type Tarjouspyynto` tehtävästä 1.
- Produces:
  - `lahetaTarjouspyynto(edellinen: TarjousTila, formData: FormData): Promise<TarjousTila>` — Server Action, tehtävän 3 lomake kutsuu tätä
  - `TYYPIT: string[]` — tilaisuustyypit, tehtävän 3 valikko renderöi nämä
  - `type TarjousTila = { ok: boolean; viesti?: string }`

- [ ] **Step 1: Lisää jaettu data tiedostoon `lib/tarjous.ts`**

Lisää olemassa olevan sisällön perään, älä poista mitään:

```ts
/* Tilaisuustyypit. Lomake renderöi nämä valikkoon ja Server Action
   tarkistaa lähetetyn arvon tätä listaa vasten. */
export const TYYPIT = [
  "Pikkujoulut",
  "Tuotelanseeraus",
  "Messut",
  "Henkilöstöjuhla",
  "Häät tai synttärit",
  "Muu",
];

export type TarjousTila = { ok: boolean; viesti?: string };
```

Huom: **älä** kirjoita `as const`. Silloin `TYYPIT.includes(tyyppi)` ei käänny, koska `tyyppi` on tyypiltään `string`.

- [ ] **Step 2: Kirjoita `lib/tarjouspyynto.ts`**

```ts
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
  const tyyppi = teksti(formData, "tyyppi");
  const pvm = teksti(formData, "pvm");
  const viesti = teksti(formData, "viesti");

  if (nimi.length < 1 || nimi.length > 100) {
    return { ok: false, viesti: "Tarkista nimi." };
  }
  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, viesti: "Tarkista sähköpostiosoite." };
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

  return { ok: true, pyynto: { nimi, email, tyyppi, pvm, viesti } };
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
```

- [ ] **Step 3: Tarkista että käännös menee läpi**

```bash
npx tsc --noEmit
```

Odotettu tulos: ei virheitä. Yleisin virhe tässä kohtaa on `as const` vaiheessa 1 — silloin `TYYPIT.includes` valittaa.

- [ ] **Step 4: Committaa**

```bash
git add lib/tarjouspyynto.ts lib/tarjous.ts
git commit -m "Add tarjouspyynto server action with validation and honeypot"
```

---

### Task 3: Lomakkeen kytkentä

Suurin ja ainoa käyttäjälle näkyvä muutos. Tämän jälkeen lomake toimii paikallisesti päästä päähän.

**Files:**
- Modify: `components/site/Tarjouslomake.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `lahetaTarjouspyynto`, `TYYPIT`, `type TarjousTila` tehtävästä 2.
- Produces: ei mitään myöhemmille tehtäville.

- [ ] **Step 1: Lisää napin disabled-tyyli tiedostoon `app/globals.css`**

Lisää heti `.kt-btn-primary:hover`-säännön perään (rivi 208):

```css
.kt-btn-primary:disabled {
  opacity: 0.55;
  cursor: default;
}

.kt-btn-primary:disabled:hover {
  background: var(--kt-messinki);
}
```

Jälkimmäinen sääntö estää hover-värin vaihtumisen silloin kun nappi ei ole käytettävissä.

- [ ] **Step 2: Päivitä tuonnit tiedoston `components/site/Tarjouslomake.tsx` alussa**

Korvaa:

```tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TARJOUS_EVENT, openTarjous } from "@/lib/tarjous";
```

tällä:

```tsx
import { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TARJOUS_EVENT, TYYPIT, openTarjous, type TarjousTila } from "@/lib/tarjous";
import { lahetaTarjouspyynto } from "@/lib/tarjouspyynto";

const ALKUTILA: TarjousTila = { ok: false };
```

- [ ] **Step 3: Lisää tilamuuttujat komponentin alkuun**

Etsi rivi `const [lupa, setLupa] = useState(false);` ja lisää heti sen perään:

```tsx
  const [lomakeKey, setLomakeKey] = useState(0);
  const [tila, formAction, pending] = useActionState(lahetaTarjouspyynto, ALKUTILA);
```

- [ ] **Step 4: Näytä kiitosnäkymä vasta onnistuneen lähetyksen jälkeen**

Lisää `useActionState`-rivin perään:

```tsx
  useEffect(() => {
    if (tila.ok) setSent(true);
  }, [tila]);
```

Action palauttaa joka kerta uuden olion, joten riippuvuus `tila` laukaisee efektin jokaisella lähetyksellä myös silloin kun tulos on sama.

- [ ] **Step 5: Nollaa lomake kun modaali avataan uudelleen**

Etsi `onOpen`-funktion sisältä rivi `setSent(false);` ja lisää sen perään:

```tsx
      setLupa(false);
      setLomakeKey((k) => k + 1);
```

`setSent(false)` tyhjentää kiitosnäkymän ja `lomakeKey` irrottaa lomakkeen, jolloin kentät tyhjenevät. `tila` ei nollaudu, mutta se ei haittaa: virheteksti näkyy vain lomakenäkymässä ja korvautuu seuraavalla lähetyksellä.

- [ ] **Step 6: Vaihda lomake käyttämään Server Actionia**

Korvaa:

```tsx
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: 22 }}
                  >
```

tällä:

```tsx
                  <form
                    key={lomakeKey}
                    action={formAction}
                    style={{ display: "flex", flexDirection: "column", gap: 22 }}
                  >
                    {/* Hunajapurkki. Ruudun ulkopuolella eikä display:none,
                        koska osa boteista ohittaa piilotetut kentät. */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: -9999,
                        width: 1,
                        height: 1,
                        overflow: "hidden",
                      }}
                    >
                      <label>
                        Yritys
                        <input name="yritys" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>
```

- [ ] **Step 7: Käytä jaettua tyyppilistaa valikossa**

Korvaa:

```tsx
                          {["Pikkujoulut", "Tuotelanseeraus", "Messut", "Henkilöstöjuhla", "Häät tai synttärit", "Muu"].map(
                            (o) => (
```

tällä:

```tsx
                          {TYYPIT.map(
                            (o) => (
```

Nyt valikon vaihtoehdot ja palvelimen sallittujen arvojen lista eivät voi erkaantua toisistaan.

- [ ] **Step 8: Lisää `name` lupa-valintaruutuun**

Korvaa:

```tsx
                      <input
                        type="checkbox"
                        checked={lupa}
                        onChange={(e) => setLupa(e.target.checked)}
                        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                      />
```

tällä:

```tsx
                      <input
                        type="checkbox"
                        name="lupa"
                        checked={lupa}
                        onChange={(e) => setLupa(e.target.checked)}
                        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                      />
```

Ilman `name`-attribuuttia kenttä ei päädy `FormData`-olioon lainkaan, jolloin palvelin hylkäisi jokaisen lähetyksen.

**Älä lisää `required`-attribuuttia.** Kenttä on visuaalisesti piilotettu (`opacity: 0`), eikä selain osaa näyttää validointikuplaa näkymättömän elementin kohdalla — lähetys estyisi ilman mitään näkyvää palautetta. Palvelin hoitaa tämän tarkistuksen ja palauttaa luettavan virheilmoituksen.

- [ ] **Step 9: Lisää lähetystila ja virheilmoitus**

Korvaa:

```tsx
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
                      <button type="submit" className="kt-btn-primary">
                        Lähetä tarjouspyyntö
                      </button>
                      <span
                        style={{
                          fontFamily: "var(--kt-font-mono)",
                          fontSize: 12,
                          letterSpacing: "0.06em",
                          color: "var(--kt-siniharmaa)",
                        }}
                      >
                        100 % tyytyväisyystakuu
                      </span>
                    </div>
```

tällä:

```tsx
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
                      <button type="submit" className="kt-btn-primary" disabled={pending}>
                        {pending ? "Lähetetään…" : "Lähetä tarjouspyyntö"}
                      </button>
                      <span
                        style={{
                          fontFamily: "var(--kt-font-mono)",
                          fontSize: 12,
                          letterSpacing: "0.06em",
                          color: "var(--kt-siniharmaa)",
                        }}
                      >
                        100 % tyytyväisyystakuu
                      </span>
                    </div>
                    <p
                      aria-live="polite"
                      style={{
                        margin: 0,
                        minHeight: 0,
                        fontFamily: "var(--kt-font-body)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "var(--kt-error)",
                      }}
                    >
                      {!tila.ok && tila.viesti ? tila.viesti : ""}
                    </p>
```

Kappale pidetään aina renderöitynä tyhjänäkin, jotta ruudunlukija ilmoittaa sisällön muuttumisesta. Ehdollinen renderöinti ei laukaisisi `aria-live`-ilmoitusta luotettavasti.

- [ ] **Step 10: Tarkista käännös ja linttaus**

```bash
npx tsc --noEmit && npm run lint
```

Odotettu tulos: ei virheitä kummastakaan.

- [ ] **Step 11: Testaa selaimessa**

Käynnistä kehityspalvelin ja käy läpi koko polku. Käytä preview-työkalua, älä pyydä käyttäjää testaamaan.

1. **Onnistunut lähetys** — avaa lomake, täytä nimi ja sähköposti, valitse tilaisuuden tyyppi, rastita lupa, lähetä. Napin tekstin pitää vaihtua "Lähetetään…", sitten kiitosnäkymän ilmestyä. Viestin pitää saapua postilaatikkoon `jp@koomikkotaikuri.fi`.
2. **Lupa rastittamatta** — täytä muut kentät mutta jätä lupa rastittamatta. Odotettu: punainen teksti "Rastita vielä lupa tarjouksen lähettämiseen sähköpostitse.", ei kiitosnäkymää, ei viestiä.
3. **Hunajapurkki** — täytä lomake oikein, kirjoita selaimen kehitystyökaluilla arvo piilotettuun `yritys`-kenttään ja lähetä. Odotettu: kiitosnäkymä ilmestyy mutta viestiä **ei** saavu.
4. **Uudelleenavaus** — sulje modaali onnistuneen lähetyksen jälkeen ja avaa uudelleen. Odotettu: tyhjä lomake, ei kiitosnäkymää, ei virhetekstiä.
5. **Virhepolku** — vaihda `.env.local`-tiedostoon hetkeksi väärä avain (`RESEND_API_KEY=re_vaara`), käynnistä palvelin uudelleen ja lähetä. Odotettu: punainen virheteksti mailto-osoitteineen, ei kiitosnäkymää. **Palauta oikea avain ja käynnistä palvelin uudelleen.**

- [ ] **Step 12: Committaa**

```bash
git add components/site/Tarjouslomake.tsx app/globals.css
git commit -m "Wire tarjouslomake to server action with pending and error states"
```

---

### Task 4: Vercel-julkaisu

**Vaatii JP:n nimenomaisen luvan ennen aloitusta** — tämä työntää koodia GitHubiin ja julkaisee sivuston. Älä aja tätä tehtävää oma-aloitteisesti.

**Files:** ei koodimuutoksia.

**Interfaces:** ei mitään.

- [ ] **Step 1: Lisää ympäristömuuttujat Verceliin**

Projektin `koomikkotaikuri.fi` asetuksista, kohta Settings → Environment Variables. Kolme muuttujaa, kaikki kolme ympäristöä (Production, Preview, Development):

| Nimi | Arvo |
|------|------|
| `RESEND_API_KEY` | sama avain kuin `.env.local`-tiedostossa |
| `TARJOUS_LAHETTAJA` | `Koomikkotaikuri <onboarding@resend.dev>` |
| `TARJOUS_KUITTAUS` | jätä lisäämättä |

- [ ] **Step 2: Työnnä muutokset**

```bash
git push origin main
```

- [ ] **Step 3: Odota julkaisu ja testaa tuotannossa**

Avaa julkaistu `.vercel.app`-osoite, lähetä oikea tarjouspyyntö lomakkeelta ja varmista että viesti saapuu postilaatikkoon `jp@koomikkotaikuri.fi`.

Jos lähetys epäonnistuu, katso Vercelin runtime-lokeista `console.error`-rivi — se kertoo mitä Resend vastasi. Yleisin syy on puuttuva tai väärin kopioitu ympäristömuuttuja.

---

## Vaihe 2 — myöhemmin, ei tässä suunnitelmassa

Kun domain siirretään ja DNS on hallinnassa:

1. Resendissä Domains → lisää `koomikkotaikuri.fi` → kopioi DKIM- ja SPF-tietueet DNS-hallintaan → odota verifiointi.
2. Vercelissä `TARJOUS_LAHETTAJA` = `Koomikkotaikuri <lomake@koomikkotaikuri.fi>`.
3. Vercelissä `TARJOUS_KUITTAUS` = `on`.
4. Uudelleenjulkaisu. Testaa lomake **muulla kuin omalla osoitteellasi** ja varmista että kuittaus saapuu.

Koodiin ei kosketa.
