export type UkkItem = { title: string; content: string };

/* Full FAQ list from the UKK design page; the Palvelut page shows the five most common. */
export const ukkItems: UkkItem[] = [
  {
    title: "Millaisiin tilaisuuksiin esiintyminen sopii?",
    content:
      "Ohjelma toimii yritysjuhlissa, henkilöstöpäivillä, pikkujouluissa, aikuisten syntymäpäivillä, häissä ja muissa aikuisyleisön tilaisuuksissa. Esitys ei vaadi lavaa, mutta tila ja valaistus täytyy olla sellaisia, että kaikki näkevät esiintyjän - istumapaikat ovat hyödyllisiä, jos ei ole koroketta.\n\nOlen esiintynyt konserttitaloissa ja kesämökkien laiturilla, joten ohjelma sopeutuu erilaisiin puitteisiin. Sisältö on suunnattu aikuisyleisölle, joten se sopii parhaiten tilaisuuksiin, joissa yleisö on pääosin täysi-ikäistä.",
  },
  {
    title: "Kuinka pitkä esitys on?",
    content:
      "Tyypillinen esitys kestää noin 20-45 minuuttia, mutta pituus räätälöidään aina tilaisuuden aikataulun ja luonteen mukaan. Lyhyempi, tiivis paketti toimii hyvin yllätysnumerona ohjelman lomassa, kun taas pidempi kokonaisuus sopii tilaisuuksiin, joissa toimin illan pääohjelmana tai juontajana. Tarkka kesto sovitaan tarjousvaiheessa.",
  },
  {
    title:
      "Mihin kohtaan ohjelmaa esiintyminen kannattaa sijoittaa - ja voiko sen pitää ruokailun aikana?",
    content:
      "Ohjelma sijoitetaan lähelle virallisen ohjelman loppua, yleensä puheiden perään, pää- ja jälkiruuan väliin tai jälkiruuan jälkeen. Ei liian myöhäiseen aikaan. Jos bändi esiintyy tai on tanssia, esitykseni sijoitetaan ehdottomasti ennen näitä.\n\nVarsinaisen ruokailun aikana esitystä ei kannata pitää, sillä tarjoilu ja keskustelu vievät yleisön huomion - parempi ajankohta on ruokailun tauolla tai heti sen jälkeen. Yllätysnumerona sopivassa kohdassa ohjelma toimii erityisen hyvin.",
  },
  {
    title: "Miten voi tilata esiintymään tilaisuuteemme?",
    content:
      "Täytä yhteydenottolomake päävalikon Yhteys-kohdasta, niin olen henkilökohtaisesti sinuun yhteydessä. Keskustelun aikana saat vinkkejä tapahtuman aikataulutukseen ja rakenteeseen, jotta esitys istuu mahdollisimman hyvin osaksi tilaisuuttanne. Tilaus vahvistetaan vasta sitten, kun olet tyytyväinen kuulemaasi.",
  },
  {
    title: "Mitä tarjouspyyntöön kannattaa sisällyttää?",
    content:
      "Mitä tarkemmat tiedot, sitä nopeammin ja osuvammin tarjous saadaan koottua. Hyvä tarjouspyyntö sisältää tilaisuuden ajankohdan, paikkakunnan ja tilan, arvion vieraiden määrästä, tilaisuuden luonteen (esim. pikkujoulu, henkilöstöpäivä, häät) sekä alustavan aikataulun.\n\nJos tiedossa on jo, mihin kohtaan ohjelmaa esitys sijoittuu tai onko käytössä äänentoisto, näistä kannattaa mainita heti alkuun.",
  },
  {
    title: "Milloin esiintyjä kannattaa varata?",
    content:
      "Sitä ei kannata jättää viime tinkaan, sillä vilkkaimmat ajankohdat, kuten loka-joulukuun juhlakausi ja kesän suosituimmat viikonloput, täyttyvät kalenterista nopeasti. Vapaita ajankohtia kannattaa silti aina kysyä lyhyelläkin varoitusajalla - kalenteriin jää tilaa myös yllättäen.",
  },
  {
    title: "Mitä esiintyminen maksaa ja miten se maksetaan?",
    content:
      "Hintaan vaikuttavat tilaisuuden luonne, ennakkotöiden määrä, ajankohta ja sijainti. Tarjouksessa esitetty hinta on kokonaishinta sisältäen kaikki kulut. Hintaan lisätään alv 13,5 %. Laskutus tapahtuu tilaisuuden jälkeen, maksuaika normaalisti 7 päivää.",
  },
  {
    title: "Miten valmistaudun tilaisuuteen ja mitä se edellyttää tilaajalta?",
    content:
      "Räätälöin esityksen tilaisuuden luonteeseen. Tarvitsen minimissään seuraavat tiedot: tilaisuuden luonne, vieraiden määrä, tila. Noin viikkoa ennen tilaisuutta otan yhteyttä yksityiskohtien varmistamiseksi.\n\nJuontotyöhön valmistaudutaan materiaalin avulla ja puhelinpalaverin tai tapaamisen kautta käsikirjoitusta läpi käymällä.",
  },
  {
    title: "Millaisen äänentoiston esitys vaatii?",
    content:
      "Esitys vaatii äänentoistojärjestelmän, johon voi kiinnittää headset-mikrofonin ja mp3-soittimen. Äänentoisto mitoitetaan kuulijakunnan mukaan puheen ja taustametelille.\n\nAlle 50 hengen tilaisuuksiin äänentoisto on mahdollista järjestää suoraan minun kauttani. Isompiin tilaisuuksiin löytyy tarvittaessa yhteistyökumppaneita, jotka hoitavat tekniikan. Valaistus järjestyy tilaajan puolesta.",
  },
  {
    title: "Esiinnytkö myös englanniksi?",
    content:
      "Kyllä, esiinnyn myös englanniksi. Esitys on kuitenkin alun perin kasattu suomeksi, ja sanaleikit ovat keskeinen osa ohjelmaa, joten sisältöä sovelletaan kielen mukaan. Tästä syystä esityksen pituus voi hieman vaihdella kielen vaihtuessa.\n\nJos yleisössä on kansainvälisiä vieraita, kannattaa mainita asiasta jo tarjouspyynnössä, niin ohjelma voidaan räätälöidä parhaiten palvelemaan tilaisuutta.",
  },
  {
    title: "Miten yleisöä otetaan mukaan esitykseen?",
    content:
      "Osa ohjelmasta rakentuu vuorovaikutukselle yleisön kanssa, mutta kukaan ei joudu esiintymään vasten tahtoaan - osallistuminen on aina vapaaehtoista ja kunnioittavaa. Jos tilaisuudessa on esimerkiksi erityisvieraita tai henkilöitä, joita ei haluta nostaa esiin, tästä kannattaa mainita etukäteen.",
  },
  {
    title: "Voinko hyödyntää sinua tilaisuutemme markkinoinnissa?",
    content: "Kyllä. Media-osiosta löydät painokelpoisia valokuvia markkinointiin.",
  },
  {
    title: "Peruutukset: mitä jos joudun perumaan? Entä jos sinä peruut?",
    content:
      "30 vuorokauden peruutusoikeus molemmilla osapuolilla ilman seuraamuksia. 15-30 päivää ennen: 50 % laskutus. Alle kaksi viikkoa: 100 % laskutus. Sitoudun löytämään yhtä tasokkaan esiintyjän, jos joudun perumaan sairauden vuoksi.",
  },
  {
    title: "Mitä toivot takahuonetoiveista?",
    content:
      "Toivon takahuonetta valmistautumiselle, mutta ilmankin järjestyy. Ruoka- ja juomatoiveissani pyydän ainoastaan vettä.",
  },
];

/* The five shown on the Palvelut page ("Ennen kuin kysyt hintaa"). */
export const palvelutUkkTitles = [
  "Millaisiin tilaisuuksiin esiintyminen sopii?",
  "Kuinka pitkä esitys on?",
  "Miten voi tilata esiintymään tilaisuuteemme?",
  "Mitä esiintyminen maksaa ja miten se maksetaan?",
  "Peruutukset: mitä jos joudun perumaan? Entä jos sinä peruut?",
];
