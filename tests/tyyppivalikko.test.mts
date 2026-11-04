/* Regressiotesti: React nollaa <form action={...}> -lomakkeen DOM:n jokaisen
   actionin jälkeen. Kontrolloitu <select> ei palaa React-tilaan, koska tila
   ei muuttunut, joten valikko näytti eri arvoa kuin lähetettiin (esim.
   "Pikkujoulut", vaikka arvo oli tyhjä). Tarjouslomake käyttää
   useValintaSailyy-hookia, joka palauttaa valinnan; tämä testi ajaa saman
   kuvion oikeassa React DOMissa jsdomin päällä. */
import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/" });
const g = globalThis as Record<string, unknown>;
const GLOBAALIT = ["window", "document", "navigator", "HTMLElement", "Node", "Event", "FormData", "requestAnimationFrame"];
const vanhat = new Map(GLOBAALIT.map((k) => [k, g[k]]));

before(() => {
  for (const k of GLOBAALIT) {
    Object.defineProperty(g, k, {
      configurable: true,
      writable: true,
      value: (dom.window as unknown as Record<string, unknown>)[k],
    });
  }
  g.IS_REACT_ACT_ENVIRONMENT = true;
});

after(() => {
  for (const [k, v] of vanhat) Object.defineProperty(g, k, { configurable: true, writable: true, value: v });
  dom.window.close();
});

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { useValintaSailyy } = await import("../lib/lomakeValinta");
const { createElement: h, useActionState, useRef, useState, act } = React;

type Tila = { kierros: number; saatu?: string };

function Lomake({ alku, korjaus }: { alku: string; korjaus: boolean }) {
  const [tyyppi, setTyyppi] = useState(alku);
  const valintaRef = useRef<HTMLSelectElement>(null);
  /* Sama kuin Tarjouslomakkeessa: action palauttaa joka kerta uuden olion
     (esim. validointivirhe), eikä tyyppi-tila muutu. */
  const [tila, action] = useActionState(
    async (ed: Tila, fd: FormData): Promise<Tila> => ({
      kierros: ed.kierros + 1,
      saatu: String(fd.get("tyyppi")),
    }),
    { kierros: 0 },
  );
  /* Ilman korjausta hook saa tyhjän refin eikä tee mitään. */
  const eiMitaan = useRef<HTMLSelectElement>(null);
  useValintaSailyy(korjaus ? valintaRef : eiMitaan, tyyppi, tila);
  return h(
    "form",
    { action },
    h(
      "select",
      { name: "tyyppi", ref: valintaRef, value: tyyppi, onChange: (e: { target: { value: string } }) => setTyyppi(e.target.value) },
      h("option", { value: "", disabled: true }, "Valitse"),
      h("option", { value: "Pikkujoulut" }, "Pikkujoulut"),
      h("option", { value: "Messut" }, "Messut"),
    ),
    h("output", null, tila.saatu ?? ""),
  );
}

async function lahetaJaLue(alku: string, korjaus: boolean, valitse?: string) {
  const juuri = document.createElement("div");
  document.body.appendChild(juuri);
  const root = createRoot(juuri);
  await act(async () => root.render(h(Lomake, { alku, korjaus })));
  const form = juuri.querySelector("form")!;
  const select = juuri.querySelector("select")!;
  if (valitse !== undefined) {
    await act(async () => {
      select.value = valitse;
      select.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
    });
  }
  await act(async () => form.requestSubmit());
  const tulos = {
    naytetty: select.value,
    lahetetty: juuri.querySelector("output")!.textContent,
  };
  await act(async () => root.unmount());
  juuri.remove();
  return tulos;
}

describe("tyyppivalikko epäonnistuneen lähetyksen jälkeen", () => {
  it("toistaa bugin ilman korjausta (testi mittaa oikeaa asiaa)", async () => {
    const t = await lahetaJaLue("", false);
    assert.equal(t.lahetetty, "");
    assert.notEqual(t.naytetty, t.lahetetty);
  });

  it("tyhjä valinta pysyy tyhjänä eikä näytä Pikkujoulut", async () => {
    const t = await lahetaJaLue("", true);
    assert.deepEqual(t, { naytetty: "", lahetetty: "" });
  });

  it("esivalinta (teemasivu) pysyy", async () => {
    const t = await lahetaJaLue("Pikkujoulut", true);
    assert.deepEqual(t, { naytetty: "Pikkujoulut", lahetetty: "Pikkujoulut" });
  });

  it("käyttäjän vaihtama valinta pysyy eikä palaa esivalintaan", async () => {
    const t = await lahetaJaLue("Pikkujoulut", true, "Messut");
    assert.deepEqual(t, { naytetty: "Messut", lahetetty: "Messut" });
  });
});
