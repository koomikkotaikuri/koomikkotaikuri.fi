# Hero-slideshow: kuvakierto videon tilalle

**Päivä:** 2026-08-27
**Tila:** Hyväksytty (JP 2026-08-27)

## Tausta

Heron taustavideo (`/videos/hero.mp4`) on vanhentunut — JP ei enää näytä samalta (-45 kg).
Video korvataan kuvapankin uusilla kuvilla rakennetulla crossfade-slideshow'lla, kunnes
uusi promovideo saadaan kuvattua. Silloin slideshow vaihdetaan takaisin videoon
(yhden komponentin swap).

## Ratkaisu

Uusi client-komponentti `components/home/HeroSlideshow.tsx`, joka korvaa `<video>`-elementin
`components/home/Hero.tsx`:ssä samassa paikassa (absoluuttinen sijoitus oikeaan laitaan,
62 % leveys työpöydällä, `kt-hero-video`-luokka mobiilisääntöineen siirtyy kontainerille).

### Kuvakierto (järjestys)

1. `muotokuva-korttitaika-02-vari.webp` — korttiviuhka, vihreä bleiseri
2. `toiminta-korttiheitto-01-web.webp` — hiiret kädellä, sininen bleiseri + punaiset housut
3. `casual-taikuri-08-vari.webp` — poolo, tunnelmallinen pöytäkuva
4. `lava-esitys-yleiso-06.webp` — aito keikkakuva lavalta
5. `muotokuva-kuutiotaika-07-vari.webp` — Rubikin kuutio, tikkaat
6. `muotokuva-studio-tumma-11-web.webp` — muotokuva, sininen bleiseri
7. `muotokuva-korttitaika-05-vari.webp` — kortit suussa
8. `muotokuva-kuutiotaika-01-vari.webp` — kuutio, hymy
9. `casual-taikuri-17-vari.webp` — sininen bleiseri + poolo, istuva

Kaikki `public/images/` -kansiosta; ei uusia asseteja.

### Käyttäytyminen

- Kuva vaihtuu **6 s välein**, ristifeidi **1,5 s** (opacity-transitio).
- **Ken Burns** joka kuvassa: hidas skaalaus 1.0 → 1.06 CSS-keyframeillä,
  zoomin suunta (transform-origin) vuorottelee, jotta liike ei toistu identtisenä.
- **Efektivaihtelu:** joka kolmas vaihto käyttää feidin sijaan yhtä kahdesta varioidusta
  siirtymästä vuorotellen:
  - *Blur-häivytys:* tuleva kuva alkaa kevyesti sumeana (n. 8 px) ja skaalasta 1.1,
    tarkentuu ja asettuu feidin aikana.
  - *Liukuma:* tuleva kuva liukuu muutaman prosentin sivusuunnassa paikalleen feidin aikana.
  - Rytmi on deterministinen (indeksin mukaan), ei satunnainen.
- **`prefers-reduced-motion: reduce`** → ei zoomia eikä efektejä, pelkkä rauhallinen feidi.
- **Lataus:** ensimmäinen kuva ladataan heti (eager/priority, ei tyhjää välähdystä),
  loput esiladataan taustalla heti mountin jälkeen.
- Promovideomodaalin avaaminen ei pysäytä slideshow'ta (videon pause-kytkös poistuu tarpeettomana).

### Muutokset Hero.tsx:ään

- `<video>`-elementti, `videoRef` ja play/pause-logiikka (mount-efekti + `videoOpen`-efekti)
  poistuvat; tilalle `<HeroSlideshow />`.
- Tekstisisällön fit-logiikka (markRow/tagline) säilyy ennallaan.
- "Katso video" -nappi ja YouTube-lightbox (`VideoModal`, `PROMO_VIDEO_ID`) säilyvät ennallaan.
- Gradientti-shadet säilyvät ennallaan.
- `/videos/hero.mp4` jää levylle (palautus helppoa), mutta siihen ei viitata mistään.

### Testaus

- Dev-serveri + selain: työpöytä ja mobiili (375 px), feidit ja efektit silmämääräisesti,
  ei konsolivirheitä, ei layout-hyppyjä.
- `prefers-reduced-motion` tarkistetaan emuloimalla.
- Huom: ennen koodia luetaan projektin Next.js-ohjeet (`node_modules/next/dist/docs/`)
  AGENTS.md:n vaatimuksen mukaisesti.
