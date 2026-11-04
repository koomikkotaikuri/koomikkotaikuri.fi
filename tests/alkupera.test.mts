import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  KENTAT,
  alkuperaOtsakkeet,
  liitaAlkupera,
  lueSaapuminen,
  validoiAlkupera,
  type Alkupera,
} from "../lib/alkupera";
import { ilmoitusViesti, kuittausViesti, type Tarjouspyynto } from "../lib/sahkoposti";
import { TARJOUS_EVENT, asetaTarjousOletus, openTarjous } from "../lib/tarjous";

const LIIDI = "3f2c9a1e-7b4d-4c2a-9e8f-1a2b3c4d5e6f";

const PYYNTO: Tarjouspyynto = {
  nimi: "Testi Henkilö",
  email: "testi@example.com",
  puhelin: "040 123 4567",
  tyyppi: "Pikkujoulut",
  pvm: "joulukuu",
  viesti: "Noin 80 henkeä, Kouvola.",
};

function lomake(tiedot: Parameters<typeof liitaAlkupera>[1]) {
  const fd = new FormData();
  liitaAlkupera(fd, tiedot);
  return fd;
}

describe("lueSaapuminen", () => {
  it("poimii laskeutumissivun, UTM:t, viittaajan ja klikkitunnisteiden nimet", () => {
    const s = lueSaapuminen(
      "https://www.koomikkotaikuri.fi/pikkujoulut?utm_source=meta&utm_medium=paid_social&utm_campaign=pj26&fbclid=SALAINEN#tarjous",
      "https://l.facebook.com/",
    );
    assert.deepEqual(s, {
      laskeutumissivu: "/pikkujoulut",
      utm: { utm_source: "meta", utm_medium: "paid_social", utm_campaign: "pj26" },
      viittaaja: "l.facebook.com",
      klikkitunnisteet: ["fbclid"],
    });
    /* Klikkitunnisteen arvoa ei tallenneta mihinkään. */
    assert.ok(!JSON.stringify(s).includes("SALAINEN"));
  });

  it("oma sivusto viittaajana ja puuttuva viittaaja jäävät tyhjiksi", () => {
    assert.equal(lueSaapuminen("https://www.koomikkotaikuri.fi/", "https://www.koomikkotaikuri.fi/palvelut").viittaaja, "");
    assert.equal(lueSaapuminen("https://www.koomikkotaikuri.fi/", "").viittaaja, "");
  });

  it("rikkinäinen URL ei kaada", () => {
    assert.equal(lueSaapuminen("ei-url", "").laskeutumissivu, "");
  });
});

describe("validoiAlkupera (palvelin)", () => {
  it("hyväksyy lomakkeen liittämät kentät sellaisenaan", () => {
    const fd = lomake({
      liidi: LIIDI,
      avaus: { lahde: "floating", cta: "yhteys_liuska" },
      avaussivu: "/palvelut",
      lahetyssivu: "/palvelut",
      saapuminen: lueSaapuminen(
        "https://www.koomikkotaikuri.fi/?utm_source=google&utm_medium=cpc&gclid=x",
        "https://www.google.com/",
      ),
    });
    assert.deepEqual(validoiAlkupera(fd), {
      liidi: LIIDI,
      lahde: "floating",
      cta: "yhteys_liuska",
      avaussivu: "/palvelut",
      lahetyssivu: "/palvelut",
      laskeutumissivu: "/",
      viittaaja: "www.google.com",
      klikkitunnisteet: "gclid",
      utm: { utm_source: "google", utm_medium: "cpc" },
    });
  });

  it("tyhjentää virheelliset ja vihamieliset arvot eikä heitä", () => {
    const fd = new FormData();
    fd.set(KENTAT.liidi, "ei-uuid");
    fd.set(KENTAT.lahde, "keksitty");
    fd.set(KENTAT.cta, "Hero\r\nBcc: hyokkaaja@example.com");
    fd.set(KENTAT.avaussivu, "/sivu\r\nX-Evil: 1");
    fd.set(KENTAT.lahetyssivu, "https://evil.example/");
    fd.set(KENTAT.laskeutumissivu, "/" + "a".repeat(500));
    fd.set(KENTAT.viittaaja, "evil host");
    fd.set(KENTAT.klikkitunnisteet, "gclid,keksitty");
    fd.set(KENTAT.utm_source, "meta\r\nBcc: x@example.com");
    const a = validoiAlkupera(fd);
    assert.equal(a.liidi, "");
    assert.equal(a.lahde, "");
    assert.equal(a.cta, "");
    assert.equal(a.avaussivu, "");
    assert.equal(a.lahetyssivu, "");
    assert.equal(a.laskeutumissivu, "");
    assert.equal(a.viittaaja, "");
    assert.equal(a.klikkitunnisteet, "gclid");
    assert.equal(a.utm.utm_source, "metaBcc: x@example.com");
    for (const v of Object.values(alkuperaOtsakkeet(a))) {
      assert.ok(!/[\r\n]/.test(v), v);
    }
  });

  it("puuttuvat kentät (esim. vanha välimuistisivu) = tyhjät otsakkeet", () => {
    assert.deepEqual(alkuperaOtsakkeet(validoiAlkupera(new FormData())), {});
  });
});

describe("alkuperaOtsakkeet", () => {
  const a: Alkupera = {
    liidi: LIIDI,
    lahde: "page_cta",
    cta: "teema_hero",
    avaussivu: "/pikkujoulut",
    lahetyssivu: "/pikkujoulut",
    laskeutumissivu: "/pikkujoulut",
    viittaaja: "l.facebook.com",
    klikkitunnisteet: "fbclid",
    utm: { utm_source: "meta", utm_campaign: "Pikkujoulut ä; 2026 🎄" },
  };

  it("muodostaa X-Lead-*-otsakkeet ja koodaa ei-ASCII-merkit", () => {
    assert.deepEqual(alkuperaOtsakkeet(a), {
      "X-Lead-Id": LIIDI,
      "X-Lead-Source": "page_cta",
      "X-Lead-Cta": "teema_hero",
      "X-Lead-Open-Page": "/pikkujoulut",
      "X-Lead-Submit-Page": "/pikkujoulut",
      "X-Lead-Landing-Page": "/pikkujoulut",
      "X-Lead-Referrer": "l.facebook.com",
      "X-Lead-Utm": "source=meta; campaign=Pikkujoulut %C3%A4%3B 2026 %F0%9F%8E%84",
      "X-Lead-Click-Id": "fbclid",
    });
    for (const v of Object.values(alkuperaOtsakkeet(a))) {
      assert.ok(/^[\x20-\x7E]*$/.test(v), v);
    }
  });
});

describe("sähköpostit: alkuperä vain ilmoituksen otsakkeisiin", () => {
  const fd = lomake({
    liidi: LIIDI,
    avaus: { lahde: "nav", cta: "nav_desktop" },
    avaussivu: "/ukk",
    lahetyssivu: "/ukk",
    saapuminen: lueSaapuminen("https://www.koomikkotaikuri.fi/?utm_source=newsletter", ""),
  });
  const alkupera = validoiAlkupera(fd);

  it("ilmoituksen runko, otsikko ja vastausosoite ovat ennallaan", () => {
    const ilman = ilmoitusViesti(PYYNTO);
    const kanssa = ilmoitusViesti(PYYNTO, alkupera);
    assert.equal(kanssa.text, ilman.text);
    assert.equal(kanssa.subject, ilman.subject);
    assert.equal(kanssa.replyTo, PYYNTO.email);
    assert.equal(kanssa.to, "jp@koomikkotaikuri.fi");
    assert.equal("headers" in ilman, false);
    for (const arvo of [LIIDI, "nav_desktop", "/ukk", "newsletter", "X-Lead"]) {
      assert.ok(!kanssa.text.includes(arvo), arvo);
      assert.ok(!kanssa.subject.includes(arvo), arvo);
    }
    assert.equal(kanssa.headers?.["X-Lead-Id"], LIIDI);
    assert.equal(kanssa.headers?.["X-Lead-Source"], "nav");
    assert.equal(kanssa.headers?.["X-Lead-Utm"], "source=newsletter");
  });

  it("ilmoituksen runko vastaa täsmälleen nykyistä muotoa", () => {
    assert.equal(
      ilmoitusViesti(PYYNTO, alkupera).text,
      [
        "Uusi tarjouspyyntö koomikkotaikuri.fi-sivustolta.",
        "",
        "Nimi:       Testi Henkilö",
        "Sähköposti: testi@example.com",
        "Puhelin:    040 123 4567",
        "Tilaisuus:  Pikkujoulut",
        "Ajankohta:  joulukuu",
        "",
        "Viesti:",
        "Noin 80 henkeä, Kouvola.",
      ].join("\n"),
    );
  });

  it("asiakkaan kuittauksessa ei ole otsakkeita eikä alkuperätietoja", () => {
    const k = kuittausViesti(PYYNTO);
    assert.equal("headers" in k, false);
    assert.deepEqual(Object.keys(k).sort(), ["from", "replyTo", "subject", "text", "to"]);
    for (const arvo of [LIIDI, "nav_desktop", "/ukk", "newsletter"]) {
      assert.ok(!k.text.includes(arvo), arvo);
    }
  });
});

describe("openTarjous välittää avaustavan", () => {
  afterEach(() => {
    asetaTarjousOletus(null);
    delete (globalThis as Record<string, unknown>).window;
  });

  function kuuntele() {
    const w = new EventTarget();
    (globalThis as Record<string, unknown>).window = w;
    const saadut: unknown[] = [];
    w.addEventListener(TARJOUS_EVENT, (e) => saadut.push((e as CustomEvent).detail));
    return saadut;
  }

  it("avaus kulkee detailissa esivalinnan ja sivun oletuksen kanssa", () => {
    const saadut = kuuntele();
    asetaTarjousOletus({ tyyppi: "Pikkujoulut" });
    openTarjous({ lahde: "floating", cta: "yhteys_liuska" });
    openTarjous({ lahde: "page_cta", cta: "teema_hero" }, { tyyppi: "Messut" });
    assert.deepEqual(saadut, [
      { tyyppi: "Pikkujoulut", avaus: { lahde: "floating", cta: "yhteys_liuska" } },
      { tyyppi: "Messut", avaus: { lahde: "page_cta", cta: "teema_hero" } },
    ]);
  });
});
