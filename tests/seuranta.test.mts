import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { TUOTANTOHOST, onTuotantohost, seurantaSallittu } from "../lib/seuranta";
import { GA_ID, GTAG_ALKU, SUOSTUMUS_AVAIN, asetaSuostumus, trackEvent } from "../lib/gtag";
import { META_PIXEL_ID, lataaMetaPikseli, trackMeta } from "../lib/metaPixel";

const EI_TUOTANTO = [
  "localhost",
  "127.0.0.1",
  "koomikkotaikuri.fi",
  "koomikkotaikurifi-git-feat-pikkujoulut-jp-3117s-projects.vercel.app",
  "koomikkotaikuri-1te6afoqv-jp-3117s-projects.vercel.app",
  "koomikkotaikuri.vercel.app",
  "www.koomikkotaikuri.fi.evil.example",
];

type Kutsu = unknown[];

/* Kevyt selainympäristö: vain ne rajapinnat, joita lib/gtag.ts ja
   lib/metaPixel.ts oikeasti käyttävät. */
function selain(hostname: string, suostumus: string | null = null) {
  const skriptit: { src: string; async: boolean }[] = [];
  const varasto = new Map<string, string>();
  if (suostumus !== null) varasto.set(SUOSTUMUS_AVAIN, suostumus);
  const localStorage = {
    getItem: (k: string) => varasto.get(k) ?? null,
    setItem: (k: string, v: string) => void varasto.set(k, v),
  };
  const document = {
    createElement: () => ({ src: "", async: false }),
    head: { appendChild: (s: { src: string; async: boolean }) => void skriptit.push(s) },
  };
  const window = Object.assign(new EventTarget(), {
    location: { hostname },
    localStorage,
    document,
  }) as unknown as EventTarget & Record<string, unknown>;
  return { window, document, localStorage, skriptit, varasto };
}

function asennaGlobaalit(ymp: ReturnType<typeof selain>) {
  const g = globalThis as Record<string, unknown>;
  g.window = ymp.window;
  g.document = ymp.document;
  g.localStorage = ymp.localStorage;
}

afterEach(() => {
  const g = globalThis as Record<string, unknown>;
  delete g.window;
  delete g.document;
  delete g.localStorage;
});

/* Ajaa GTAG_ALKU-skriptin kuten selain ajaisi sen globaalissa scopessa. */
function ajaAlkuskripti(hostname: string, suostumus: string | null = null) {
  const ymp = selain(hostname, suostumus);
  const konteksti = vm.createContext({
    location: ymp.window.location,
    document: ymp.document,
    localStorage: ymp.localStorage,
  });
  (konteksti as Record<string, unknown>).window = konteksti;
  vm.runInContext(GTAG_ALKU, konteksti);
  const k = konteksti as { dataLayer?: IArguments[]; gtag?: unknown };
  /* dataLayeriin menee arguments-olioita vm:n omasta realmista; JSON-kierros
     tuo ne tämän realmin taulukoiksi, jotta deepEqual vertaa pelkkiä arvoja. */
  const dataLayer: unknown[][] | undefined = k.dataLayer
    ? JSON.parse(JSON.stringify(Array.from(k.dataLayer, (a) => Array.from(a))))
    : undefined;
  return { dataLayer, gtag: k.gtag, skriptit: ymp.skriptit };
}

describe("seurantaSallittu / onTuotantohost", () => {
  it("sallii vain www.koomikkotaikuri.fi:n", () => {
    assert.equal(TUOTANTOHOST, "www.koomikkotaikuri.fi");
    assert.equal(onTuotantohost("www.koomikkotaikuri.fi"), true);
    for (const host of EI_TUOTANTO) assert.equal(onTuotantohost(host), false, host);
  });

  it("palauttaa false palvelimella (ei windowia)", () => {
    assert.equal(seurantaSallittu(), false);
  });

  it("lukee hostin window.locationista", () => {
    asennaGlobaalit(selain(TUOTANTOHOST));
    assert.equal(seurantaSallittu(), true);
    asennaGlobaalit(selain("localhost"));
    assert.equal(seurantaSallittu(), false);
  });
});

describe("GTAG_ALKU (inline-skripti ennen Reactia)", () => {
  it("tuotannossa: sama Consent Mode -järjestys ja gtag.js latautuu", () => {
    const { dataLayer, gtag, skriptit } = ajaAlkuskripti(TUOTANTOHOST);
    assert.equal(typeof gtag, "function");
    assert.deepEqual(
      dataLayer?.map((rivi) => rivi.slice(0, 2)),
      [
        ["consent", "default"],
        ["set", "url_passthrough"],
        ["set", "ads_data_redaction"],
        ["js", dataLayer?.[3][1]],
        ["config", GA_ID],
      ],
    );
    assert.deepEqual(dataLayer?.[0][2], {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });
    assert.equal(skriptit.length, 1);
    assert.equal(skriptit[0].src, `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    assert.equal(skriptit[0].async, true);
  });

  it("tuotannossa: aiempi hyväksyntä päivittää suostumuksen ennen configia", () => {
    const { dataLayer } = ajaAlkuskripti(TUOTANTOHOST, "granted");
    assert.deepEqual(
      dataLayer?.map((rivi) => rivi.slice(0, 2).join(":")).filter((r) => !r.startsWith("js:")),
      [
        "consent:default",
        "set:url_passthrough",
        "set:ads_data_redaction",
        "consent:update",
        `config:${GA_ID}`,
      ],
    );
    assert.deepEqual(dataLayer?.[3][2], {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  });

  for (const host of EI_TUOTANTO) {
    it(`${host}: ei dataLayeria, ei gtagia, ei gtag.js:ää`, () => {
      const { dataLayer, gtag, skriptit } = ajaAlkuskripti(host, "granted");
      assert.equal(dataLayer, undefined);
      assert.equal(gtag, undefined);
      assert.equal(skriptit.length, 0);
    });
  }
});

describe("trackEvent (GA4)", () => {
  function gtagVakoilu(host: string) {
    const ymp = selain(host);
    const kutsut: Kutsu[] = [];
    ymp.window.gtag = (...a: unknown[]) => void kutsut.push(a);
    asennaGlobaalit(ymp);
    return kutsut;
  }

  it("tuotannossa Generate_lead lähtee muuttumattomana", () => {
    const kutsut = gtagVakoilu(TUOTANTOHOST);
    const params = { form_name: "tarjouspyynto", tilaisuus_tyyppi: "Pikkujoulut", transaction_id: "abc" };
    trackEvent("Generate_lead", params);
    assert.deepEqual(kutsut, [["event", "Generate_lead", params]]);
  });

  for (const host of EI_TUOTANTO) {
    it(`${host}: ei lähetä mitään`, () => {
      const kutsut = gtagVakoilu(host);
      trackEvent("Generate_lead", { transaction_id: "abc" });
      trackEvent("contact_click", { method: "phone" });
      assert.deepEqual(kutsut, []);
    });
  }
});

describe("Meta-pikseli", () => {
  it("tuotannossa: lataa fbevents.js:n ja jonottaa init + PageView", () => {
    const ymp = selain(TUOTANTOHOST);
    asennaGlobaalit(ymp);
    lataaMetaPikseli();
    assert.equal(ymp.skriptit.length, 1);
    assert.equal(ymp.skriptit[0].src, "https://connect.facebook.net/en_US/fbevents.js");
    const fbq = ymp.window.fbq as { queue: Kutsu[] };
    assert.deepEqual(fbq.queue, [["init", META_PIXEL_ID], ["track", "PageView"]]);
    /* Tuplalatauksen esto ennallaan. */
    lataaMetaPikseli();
    assert.equal(ymp.skriptit.length, 1);
  });

  it("tuotannossa: Lead lähtee samalla eventID:llä", () => {
    const ymp = selain(TUOTANTOHOST);
    const kutsut: Kutsu[] = [];
    ymp.window.fbq = (...a: unknown[]) => void kutsut.push(a);
    asennaGlobaalit(ymp);
    const params = { content_name: "tarjouspyynto", content_category: "Pikkujoulut" };
    trackMeta("Lead", params, "abc");
    trackMeta("PageView");
    assert.deepEqual(kutsut, [
      ["track", "Lead", params, { eventID: "abc" }],
      ["track", "PageView", undefined, undefined],
    ]);
  });

  for (const host of EI_TUOTANTO) {
    it(`${host}: ei lataa pikseliä eikä lähetä tapahtumia`, () => {
      const ymp = selain(host);
      const kutsut: Kutsu[] = [];
      asennaGlobaalit(ymp);
      lataaMetaPikseli();
      assert.equal(ymp.skriptit.length, 0);
      assert.equal(ymp.window.fbq, undefined);
      assert.equal(ymp.window.__ktMetaLadattu, undefined);
      ymp.window.fbq = (...a: unknown[]) => void kutsut.push(a);
      trackMeta("Lead", {}, "abc");
      assert.deepEqual(kutsut, []);
    });
  }
});

describe("asetaSuostumus (suostumuslogiikka ennallaan)", () => {
  for (const host of [TUOTANTOHOST, "localhost"]) {
    it(`${host}: tallentaa valinnan ja ilmoittaa muutoksesta`, () => {
      const ymp = selain(host);
      const gtagKutsut: Kutsu[] = [];
      ymp.window.gtag = (...a: unknown[]) => void gtagKutsut.push(a);
      asennaGlobaalit(ymp);
      let ilmoitettu = 0;
      ymp.window.addEventListener("kt-evasteet-muuttui", () => ilmoitettu++);

      asetaSuostumus(false);
      assert.equal(ymp.varasto.get(SUOSTUMUS_AVAIN), "denied");
      asetaSuostumus(true);
      assert.equal(ymp.varasto.get(SUOSTUMUS_AVAIN), "granted");
      assert.equal(ilmoitettu, 2);
      assert.deepEqual(gtagKutsut.map((k) => k.slice(0, 2)), [
        ["consent", "update"],
        ["consent", "update"],
      ]);
      /* Pikseli latautuu hyväksynnästä vain tuotannossa. */
      assert.equal(ymp.skriptit.length, host === TUOTANTOHOST ? 1 : 0);
    });
  }
});

describe("testausapu (kt-seuranta-loki)", () => {
  function kaappaa(host: string, lippu: string | null) {
    const ymp = selain(host);
    if (lippu !== null) ymp.varasto.set("kt-seuranta-loki", lippu);
    asennaGlobaalit(ymp);
    const rivit: unknown[][] = [];
    const alkuperainen = console.info;
    console.info = (...a: unknown[]) => void rivit.push(a);
    try {
      trackEvent("Generate_lead", { transaction_id: "abc" });
      trackMeta("Lead", {}, "abc");
    } finally {
      console.info = alkuperainen;
    }
    return rivit;
  }

  it("tuotannossa ei tulosta mitään, vaikka lippu olisi päällä", () => {
    assert.deepEqual(kaappaa(TUOTANTOHOST, "1"), []);
  });

  it("muualla ei tulosta ilman lippua", () => {
    assert.deepEqual(kaappaa("localhost", null), []);
  });

  it("muualla lipun kanssa tulostaa estetyt kutsut", () => {
    const rivit = kaappaa("localhost", "1");
    assert.equal(rivit.length, 2);
    assert.match(String(rivit[0][0]), /GA4 – ei lähetetty/);
  });
});
