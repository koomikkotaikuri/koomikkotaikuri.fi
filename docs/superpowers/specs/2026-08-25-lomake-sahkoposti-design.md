# Tarjouslomakkeen sähköpostilähetys

Päivämäärä: 2026-08-25

## Ongelma

Sivuston ainoa lomake on `components/site/Tarjouslomake.tsx` — modaali, jonka kaikki
"Pyydä tarjous" -kontrollit avaavat. Sen `onSubmit` kutsuu vain `setSent(true)` ja
näyttää kiitosnäkymän. Mitään ei lähetetä minnekään, eli jokainen tarjouspyyntö katoaa
ja asiakas luulee ottaneensa yhteyttä.

## Tavoite

Lomakkeen lähetys toimittaa tarjouspyynnön sähköpostilla osoitteeseen
`jp@koomikkotaikuri.fi`. Kiitosnäkymä näytetään vasta kun lähetys on oikeasti
onnistunut; epäonnistuminen näkyy käyttäjälle.

## Valitut ratkaisut

- **Lähetyspalvelu:** Resend (ilmainen 3 000 viestiä/kk).
- **Toteutustapa:** React Server Action, ei route handleria. Next 16:n oma
  dokumentaatio (`node_modules/next/dist/docs/01-app/02-guides/forms.md`) ohjaa
  lomakkeet Server Actioniin: vähemmän koodia, `pending`-tila valmiina
  `useActionState`-koukusta, ei käsin kirjoitettua fetchiä.
- **Vaiheistus (vaihtoehto A):** domainia ei verifioida vielä, koska sivusto
  julkaistaan ensin Vercelin omassa aliverkkotunnuksessa ja DNS-asetuksiin
  kosketaan vasta myöhemmin.

## Vaiheistus

Resend sallii ilman verifioitua domainia lähetyksen vain osoitteesta
`onboarding@resend.dev` ja **vain tilin rekisteröintiosoitteeseen**. Siksi:

**Vaihe 1 (tämä toteutus).** Resend-tili rekisteröidään osoitteella
`jp@koomikkotaikuri.fi`. Ilmoitus JP:lle toimii. Asiakkaan automaattikuittaus
kirjoitetaan valmiiksi mutta on pois päältä — se menisi tuntemattomiin osoitteisiin,
jotka Resend torppaa ennen verifiointia.

**Vaihe 2 (myöhemmin, ei tässä).** Domain verifioidaan Resendissä. Kuittaus kytketään
päälle vaihtamalla kaksi ympäristömuuttujaa Vercelin hallinnasta. Koodiin ei kosketa.

Tiedostettu sivuvaikutus: palautekierroksella testaajat eivät näe kuittausviestiä,
joten se polku jää verifioimatta vaiheeseen 2 asti.

## Arkkitehtuuri

Kolme yksikköä, joilla on selvät rajapinnat:

### `lib/tarjouspyynto.ts` — Server Action

`"use server"`-tiedosto. Vie funktion:

```ts
lahetaTarjouspyynto(prevState: Tila, formData: FormData): Promise<Tila>
type Tila = { ok: boolean; viesti?: string }
```

Vastuu: lue `FormData`, validoi, suodata roskaposti, kutsu `lib/sahkoposti.ts`,
palauta tila. Ei tiedä mitään Resendistä eikä viestien muotoilusta.

### `lib/sahkoposti.ts` — lähetys ja viestipohjat

Resend-asiakas ja kaksi funktiota: `lahetaIlmoitus(pyynto)` ja `lahetaKuittaus(pyynto)`.
Erillään actionista, jotta viestien sanamuotoja voi muokata koskematta logiikkaan.

### `components/site/Tarjouslomake.tsx` — käyttöliittymä

`useActionState`-koukku, `<form action={formAction}>`. Nykyinen `onSubmit` +
`setSent(true)` poistuu.

## Validointi

Server Actioniin pääsee myös suoralla POST-pyynnöllä ohi lomakkeen (Next.js:n oma
dokumentaatio varoittaa tästä), joten validointi tehdään palvelimella. Ei uutta
validointikirjastoa — kenttiä on kuusi.

| Kenttä  | Sääntö |
|---------|--------|
| `nimi`  | pakollinen, trimmattu, 1–100 merkkiä |
| `email` | pakollinen, trimmattu, ≤200 merkkiä, yksinkertainen muototarkistus |
| `tyyppi`| valinnainen; jos annettu, oltava yksi lomakkeen tunnetuista arvoista |
| `pvm`   | valinnainen, ≤100 merkkiä |
| `viesti`| valinnainen, ≤5000 merkkiä |
| `lupa`  | **pakollinen** — oltava valittuna |

Virheestä palautetaan yksi yleinen suomenkielinen viesti kenttäkohtaisten sijaan.
Selain hoitaa jo tavalliset virheet `required`- ja `type="email"`-attribuuteilla, joten
palvelinvirhe tarkoittaa käytännössä bottia tai reunatapausta.

`lupa`-valintaruudusta tulee pakollinen. Nyt sen voi ohittaa, vaikka koko idea on että
tarjoukseen saa vastata sähköpostilla.

## Roskapostisuoja

Piilotettu hunajapurkkikenttä `yritys`. Jos se on täytetty, palautetaan `ok: true`
mutta viestiä ei lähetetä — botti ei saa tietää tulleensa torjutuksi.

**Ei captchaa.** Se söisi konversiota tämän kokoisella sivustolla, ja honeypot riittää.
Jos roskapostia alkaa tulla, suoja lisätään silloin. Ei myöskään pyyntörajoitinta:
serverless-ympäristössä muistinvarainen laskuri ei ole luotettava, ja oikea toteutus
vaatisi ulkoisen tallennuksen — ylimitoitettua nykyiseen volyymiin.

## Sähköpostit

**Ilmoitus JP:lle**
- vastaanottaja: `jp@koomikkotaikuri.fi`
- lähettäjä: ympäristömuuttujasta (vaihe 1: `onboarding@resend.dev`)
- **reply-to: asiakkaan sähköposti** — vastaaminen suoraan sähköpostiohjelmasta menee asiakkaalle
- otsikko: `Tarjouspyyntö: {tyyppi} – {nimi}`
- runko: kaikki kentät selkeästi eriteltyinä

**Kuittaus asiakkaalle** (vaihe 2)
- lähettäjä: `JP Pirinen <jp@koomikkotaikuri.fi>`, reply-to sama
- otsikko: `Kiitos tarjouspyynnöstä`
- lyhyt teksti: pyyntö vastaanotettu, palaan pian

## Virhetilanteet

| Tilanne | Käyttäjälle | Palvelimella |
|---------|-------------|--------------|
| Ilmoitus JP:lle epäonnistuu | virheilmoitus + `mailto:`-varalinkki | loki |
| Kuittaus epäonnistuu, ilmoitus meni | onnistuminen | loki |
| Validointi hylkää | yleinen virheilmoitus | – |
| Honeypot täytetty | kiitosnäkymä | ei lähetystä |

Kuittauksen epäonnistuminen ei saa näyttää käyttäjälle virhettä: tieto on jo JP:llä,
eikä asiakkaan pidä lähettää pyyntöä uudestaan. Tämä on myös vaiheen 1 normaalitila.

## Ympäristömuuttujat

| Muuttuja | Vaihe 1 | Vaihe 2 |
|----------|---------|---------|
| `RESEND_API_KEY` | Resendin API-avain | sama |
| `TARJOUS_LAHETTAJA` | `Koomikkotaikuri <onboarding@resend.dev>` | `Koomikkotaikuri <lomake@koomikkotaikuri.fi>` |
| `TARJOUS_KUITTAUS` | asettamatta | `on` |

Vastaanottaja `jp@koomikkotaikuri.fi` on koodissa vakiona — se esiintyy jo muutenkin
sivuston `mailto:`-linkeissä.

Asetetaan sekä Verceliin (Production, Preview, Development) että paikalliseen
`.env.local`-tiedostoon. `.gitignore` sivuuttaa jo `.env*`.

## Käyttöliittymämuutokset

- `useActionState(lahetaTarjouspyynto, { ok: false })`
- Lähetysnappi pois käytöstä ja teksti "Lähetetään…" `pending`-tilassa
- Virheteksti lomakkeen alaosaan `aria-live="polite"`-alueeseen
- Kiitosnäkymä vasta kun action palautti `ok: true`
- **`lupa`-valintaruutuun lisättävä `name="lupa"`** — nykyinen piilotettu `<input>` on
  nimetön, joten se ei päädy `FormData`-olioon lainkaan
- Modaalin uudelleenavaus nollaa näkymän ja tyhjentää kentät: paikallinen kiitostila
  nollataan avattaessa ja lomake irrotetaan `key`-propilla

## Riippuvuudet

`npm install resend` — ainoa uusi paketti.

## Testaus

Käsin, ei automaattitestejä — ainoa lomake, ja arvo on siinä että viesti tulee oikeasti
perille:

1. Paikallisesti `npm run dev`, täytä lomake → viesti saapuu `jp@koomikkotaikuri.fi`
2. Vastaa saapuneeseen viestiin → vastaus menee asiakkaan osoitteeseen (reply-to)
3. Väärä API-avain → virheteksti näkyy lomakkeessa, kiitosnäkymä ei aukea
4. Honeypot täytetty selaimen kehitystyökaluilla → kiitosnäkymä, ei viestiä
5. `lupa` pois päältä ohi selainvalidoinnin → palvelin hylkää
6. Modaali auki uudelleen lähetyksen jälkeen → tyhjä lomake, ei kiitosnäkymää
7. Vercel-julkaisu → sama testi tuotanto-osoitteesta

## Rajaukset

Ei tässä: captcha, pyyntörajoitin, lomakedatan tallennus tietokantaan tai
laskentataulukkoon, tiedostoliitteet, muut lomakkeet (niitä ei ole).
