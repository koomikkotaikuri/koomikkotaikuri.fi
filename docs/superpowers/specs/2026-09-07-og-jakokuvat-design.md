# Sivukohtaiset OG-jakokuvat

Päivämäärä: 2026-09-07
Tila: hyväksytty visuaalinen suunta, odottaa speksin hyväksyntää

## Ongelma

Sivusto ei jaa tällä hetkellä mitään kuvaa sosiaaliseen mediaan. Tarkistettu
livestä Facebookin botin user-agentilla: `<head>`istä löytyy vain `<title>` ja
`<meta name="description">`, ei yhtään `og:`- tai `twitter:`-tagia. Sama koodissa —
`app/layout.tsx` määrittelee vain otsikon ja kuvauksen, eikä yhdelläkään sivulla
ole `openGraph`-lohkoa.

Seuraukset:

- LinkedIn ja WhatsApp näyttävät pelkän tekstikortin ilman kuvaa.
- Facebook arvaa kuvan sivulta. Se voi napata hero-kuvan tai yhtä hyvin
  asiakaslogon, koska niitä on preloadattu heti sivun alussa.
- Jokainen alasivu jakautuu identtisellä otsikolla "Koomikkotaikuri JP Pirinen",
  koska alasivujen omat otsikot eivät päädy OG-tageihin.

## Tavoite

Neljä sivukohtaista jakokuvaa, jotka generoidaan koodista Next 16:n
`ImageResponse`illa, plus metatietojen perustyö niin että kortit ja otsikot
todella päätyvät jaettuun linkkiin.

## Kortin anatomia

Koko 1200×630. Kaikki mitat validoitu selaimessa oikeilla fonteilla.

| Elementti | Määrittely |
|---|---|
| Tausta | yösininen `#131a26` + leivottu valokuva + liukuväripeite |
| Wordmark | Anton 150px, versaalit, `line-height 1.02`, `letter-spacing -0.01em` |
| Wordmarkin sisältö | rivi 1 `KOOMIKKO` + `TAIKURI`, rivi 2 `TAIKURI` + `KOOMIKKO` |
| Wordmarkin värit | kerma `#f2eada`, korostus messinki `#e3b23c`, vuorottelee riveittäin |
| Iskulause | Anton 44px, versaalit, `margin-top 26px`, loppuosa messingillä |
| Todiste | IBM Plex Mono 500, 21px, `letter-spacing .2em`, siniharmaa `#9aa7bc` |
| Domain | IBM Plex Mono 500, 21px, messinki, samalla rivillä oikeassa reunassa |
| Alaviiva | 6px messinkipalkki kortin alareunassa |
| Marginaalit | 72px sivuilla, alarivi 52px pohjasta |

Mitatut reunaehdot:

- Wordmark on 150px:llä **966px leveä** kun tilaa on 1056px. Mahtuu 90px:n
  marginaalilla, joten iskulauseen ei tarvitse pienentää sitä.
- Tekstilohko on pystysuunnassa keskitetty. Korkeus 379px, joten ylin
  tekstirivi alkaa kohdasta **y = 125**.
- Kaikki neljä iskulausetta mahtuvat yhdelle riville 44px:llä. Pisin on
  `/jp-pirinen` 41 merkkiä ≈ 793px.

## Sivukohtainen jako

Kaikki iskulauseet ovat sivuston tai JP:n sähköpostien **olemassa olevaa,
hyväksyttyä copyä**. Uusia lauseita ei keksitä.

| Sivu | Iskulause | Messinkiosa | Tausta |
|---|---|---|---|
| `/` | KAKSI SUUNTAA, YKSI KOKONAISUUS | `YKSI KOKONAISUUS` | studio |
| `/palvelut` | YLEISÖ EI JÄÄ PELKÄKSI KATSOJAKSI | `PELKÄKSI KATSOJAKSI` | lava |
| `/asiakkaat` | SEURAAVA SUOSITUS VOI OLLA TEIDÄN | `VOI OLLA TEIDÄN` | studio |
| `/jp-pirinen` | KERRO TILAISUUDESTASI. LOPUT HOIDAN MINÄ. | `LOPUT HOIDAN MINÄ.` | studio |

`/ukk`, `/media` ja `/kiitos-tietojen-paivityksesta` käyttävät etusivun kortin
sisältöä.

**Toteutuksessa paljastunut mutka:** perintä toimii vain niin kauan kuin sivu ei
määrittele omaa `openGraph`iaan. Koska `/ukk` ja `/media` asettavat oman
otsikkonsa `openGraph`in kautta, ne korvaavat layoutin `openGraph`in kokonaan —
myös sieltä perityn kuvan. Verifioinnissa niiltä puuttui `og:image` kokonaan.
Siksi myös ne saavat oman `opengraph-image`-tiedoston, joka vain käyttää
etusivun korttia uudelleen. `/kiitos-tietojen-paivityksesta` ei aseta
`openGraph`ia, joten se perii kortin normaalisti.

Iskulauseiden lähteet:

- `/` — hero, `components/home/Hero.tsx`
- `/palvelut` — toistuu lähes sanatarkkana kuudessa JP:n myyntisähköpostissa.
  Muoto on yksikkö (`pelkäksi katsojaksi`), koska niin se on korpuksessa ja
  koska `yleisö` on yksikkösana.
- `/asiakkaat` ja `/jp-pirinen` — kyseisten sivujen omat CTA-bändit

`/palvelut` saa lavakuvan, koska sen iskulause puhuu kirjaimellisesti yleisöstä
ja kuvassa näkyy yleisö. Muut käyttävät studiokuvaa. Tämä on tietoinen poikkeus
yhdenmukaisuudesta; jos kortit halutaan täysin identtisiksi, studio käy kaikkiin.

## Kuvien esikäsittely

Satori **ei tue CSS-suodattimia**, joten tummennus ja värinpoisto on leivottava
tiedostoon. Liukuväripeite sen sijaan on Satorin tukemaa CSS:ää ja jää koodiin.

Leivonta tehdään `sharp`illa (jo projektin riippuvuutena) skriptillä, joka
committoidaan `scripts/bake-og-backgrounds.mjs`. Tulokset menevät kansioon
`assets/og/`. Ne luetaan vain buildissa levyltä, joten niiden ei tarvitse olla julkisesti tarjoiltavia.

### studio

- Lähde: `public/images/muotokuva-studio-tumma-08-web-tarkistamaton.webp` (2048×1455)
- Rajaus: `left 0, top 270, width 1500, height 787` → skaalaus 1200×630 (kerroin 0.8)
- `modulate: { brightness: 0.82, saturation: 0.55 }`
- Tulos noin 26 KB

Rajaus on valittu niin, että JP on 68 % kohdalla vaakasuunnassa ja vasen
kolmannes jää lähes mustaksi tekstille. `top 270` nostaa silmät kohtaan
**y ≈ 105**, eli ylimmän tekstirivin (y = 125) yläpuolelle. Hiusrajasta jää
noin 15px kuvan ulkopuolelle; taustakuvassa se on hyväksyttävää.

Peite: `linear-gradient(100deg, rgba(19,26,38,.86) 0%, rgba(19,26,38,.76) 40%,
rgba(19,26,38,.40) 72%, rgba(19,26,38,.24) 100%)`

### lava

- Lähde: `public/images/lava-esitys-yleiso-01.webp` (2400×1600)
- Rajaus: `left 0, top 250, width 2400, height 1260`
- `modulate: { brightness: 0.58, saturation: 0.16 }`, `tint: rgb(150,165,200)`
- Tulos noin 33 KB

Saturaatio on painettu alas rankasti, koska alkuperäinen violetti lavavalo
riitelee messingin kanssa. Tuloksena kylmä sinisävy, joka istuu palettiin.

Peite: `linear-gradient(170deg, rgba(19,26,38,.80) 0%, rgba(19,26,38,.74) 48%,
rgba(11,15,22,.90) 100%)`

## Tiedostorakenne

```
scripts/bake-og-backgrounds.mjs   leivontaskripti, ajetaan käsin kun kuvat vaihtuvat
assets/og/studio.jpg              leivottu tausta, ~26 KB
assets/og/lava.jpg                leivottu tausta, ~33 KB
assets/fonts/Anton-Regular.ttf    vendoroitu, OFL
assets/fonts/IBMPlexMono-Medium.ttf  vendoroitu, OFL

lib/og/card.tsx                   jaettu renderöijä, palauttaa ImageResponsen
lib/og/config.ts                  sivukohtaiset iskulauseet ja taustat
app/opengraph-image.tsx           etusivun kortti
app/twitter-image.tsx             sama kortti X:lle
app/palvelut/opengraph-image.tsx     (+ twitter-image.tsx)
app/asiakkaat/opengraph-image.tsx    (+ twitter-image.tsx)
app/jp-pirinen/opengraph-image.tsx   (+ twitter-image.tsx)
```

Sivukohtainen tiedosto on ohut: se tuo renderöijän, valitsee konfiguraation ja
vie `alt`, `size`, `contentType` ja oletusfunktion. Koko piirtologiikka asuu
yhdessä paikassa, joten kortin ulkoasun muuttaminen on yhden tiedoston muutos.

## Metatiedot

`app/layout.tsx`:

- `metadataBase: new URL("https://www.koomikkotaikuri.fi")` — www, koska se on
  kanoninen domain. Ilman tätä suhteelliset kuvapolut kaatavat buildin.
- `openGraph`: `type website`, `locale fi_FI`, `siteName`, `url`, otsikko ja kuvaus
- `twitter`: `card: "summary_large_image"` — muuten X näyttää pienen kortin
  vaikka kuva olisi määritelty

Jokaiselle neljälle sivulle lisätään `openGraph.title` ja `openGraph.description`,
jotta jaettu linkki ei näytä kaikilla sivuilla samaa otsikkoa. Sivuilla on jo
`metadata`-vienti, joten tämä on lisäys olemassa olevaan.

**`opengraph-image` tuottaa vain `og:image`-tagit.** X vaatii erillisen
`twitter-image`-tiedoston. Siksi jokaiselle kortille tehdään molemmat, missä
`twitter-image.tsx` on ohut uudelleenvienti samasta renderöijästä.

## Reunaehdot ja riskit

**500 KB:n bundle-raja.** Koskee JSX:ää, CSS:ää, fontteja ja kuvia yhteensä.
Arvio: Anton ~180 KB + Plex Mono ~120 KB + tausta ~33 KB ≈ 333 KB. Mahtuu, mutta
mitataan buildissa. Jos raja kiristyy, fontit karsitaan käytettyihin merkkeihin
(versaalit, numerot, `+ · . ,` ja skandit) `fonttools`in `pyftsubset`illa.

**Satorin CSS-osajoukko.** Vain flexbox, ei gridiä, ei suodattimia. Kortin
asettelu on jo suunniteltu tämän mukaan: pystysuora flex-pino ja yksi absoluuttisesti
sijoitettu alarivi.

**Fonttiformaatti.** Satori lukee vain `ttf`, `otf` ja `woff`. `next/font` ei anna
tiedostoa käyttöön, joten fontit vendoroidaan repoon. Molemmat ovat OFL-lisensoituja,
joten se on sallittua.

**Taustakuvan hyväksyntä.** Etusivun kuvan tiedostonimessä on pääte
`-tarkistamaton`. Kysytty kahdesti, ei vielä vastausta. Speksi etenee oletuksella
että kuva on käyttökelpoinen. Jos ei ole, vaihdetaan lähde ja ajetaan leivonta
uudelleen — se on yhden rivin muutos skriptissä, ei uudelleensuunnittelu.

**HMS-logo lavakuvassa.** Lavakuvan taustakankaassa lukee "Helsinki Magic Show".
Täysikokoisena sen erottaa, jakokoossa ei käytännössä lainkaan. Koskee vain
`/palvelut`-korttia. Jos tämä ei käy, `/palvelut` siirtyy studiokuvaan.

## Verifiointi

1. `npm run build` menee läpi ilman bundle-varoituksia, ja kortit generoituvat.
2. Kaikki neljä korttia haetaan dev-palvelimelta ja katsotaan silmällä: wordmark
   ei ylivuoda, iskulause mahtuu yhdelle riville, silmät jäävät tekstin yläpuolelle.
3. `curl`illa tarkistetaan että jokaisen sivun `<head>` sisältää `og:image`,
   `og:title`, `og:description`, `twitter:image` ja `twitter:card`, ja että
   otsikot eroavat sivuittain.
4. Julkaisun jälkeen kortit ajetaan LinkedInin Post Inspectorin ja Facebookin
   Sharing Debuggerin läpi, jotta välimuistit päivittyvät.

## Rajattu ulkopuolelle

- Muiden sivujen omat kortit. Ne perivät etusivun, ja lisääminen myöhemmin on
  yksi konfiguraatiorivi.
- Dynaamiset, esimerkiksi tapahtumakohtaiset kortit.
- OG-kuvien A/B-testaus.
