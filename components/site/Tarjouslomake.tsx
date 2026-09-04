"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TARJOUS_EVENT, TYYPIT, openTarjous, type TarjousTila } from "@/lib/tarjous";
import { lahetaTarjouspyynto } from "@/lib/tarjouspyynto";

const ALKUTILA: TarjousTila = { ok: false };

const CURVE = "var(--kt-ease)";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--kt-font-body)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--kt-valo)",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "var(--kt-input-bg, var(--kt-paneeli))",
  border: "1px solid var(--kt-viiva)",
  borderRadius: 2,
  padding: "12px 16px",
  fontFamily: "var(--kt-font-body)",
  fontSize: 16,
  color: "var(--kt-valo)",
  outline: "none",
};

const helperStyle: React.CSSProperties = {
  fontFamily: "var(--kt-font-body)",
  fontSize: 11,
  color: "var(--kt-siniharmaa)",
};

function Field({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {helper && <span style={helperStyle}>{helper}</span>}
    </label>
  );
}

const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "var(--kt-messinki)";
  },
  onBlur: (e: React.FocusEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "var(--kt-viiva)";
  },
};

export function Tarjouslomake() {
  const [open, setOpen] = useState(false);
  const [entering, setEntering] = useState(false);
  const [sent, setSent] = useState(false);
  const [lupa, setLupa] = useState(false);
  const [lomakeKey, setLomakeKey] = useState(0);
  /* Kentät ovat kontrolloituja, koska React nollaa kontrolloimattomat
     <form action={...}> -kentät automaattisesti aina actionin jälkeen,
     onnistui lähetys tai ei — muuten epäonnistunut validointi (esim.
     unohtunut lupa-rasti) pyyhkisi koko lomakkeen tyhjäksi. */
  const [nimi, setNimi] = useState("");
  const [email, setEmail] = useState("");
  const [tyyppi, setTyyppi] = useState("");
  const [pvm, setPvm] = useState("");
  const [viesti, setViesti] = useState("");
  const [tila, formAction, pending] = useActionState(lahetaTarjouspyynto, ALKUTILA);
  const [tabVisible, setTabVisible] = useState(false);
  const originRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  /* Kiitosnäkymä vasta kun lähetys onnistui oikeasti. Action palauttaa joka
     kerta uuden olion, joten efekti laukeaa myös peräkkäisillä lähetyksillä. */
  useEffect(() => {
    if (tila.ok) setSent(true);
  }, [tila]);

  useEffect(() => {
    const onScroll = () => setTabVisible(window.scrollY > window.innerHeight * 0.6);
    const onPointer = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onOpen = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const p = pointerRef.current ?? { x: cx, y: cy };
      originRef.current = { x: p.x - cx, y: p.y - cy };
      setSent(false);
      setLupa(false);
      setNimi("");
      setEmail("");
      setTyyppi("");
      setPvm("");
      setViesti("");
      setLomakeKey((k) => k + 1);
      setOpen(true);
      setEntering(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointer, true);
    window.addEventListener(TARJOUS_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointer, true);
      window.removeEventListener(TARJOUS_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const atOrigin = !open || entering;
  const { x: ox, y: oy } = originRef.current;

  return (
    <>
      {/* "Yhteys" side tab */}
      <div
        role="button"
        aria-label="Avaa yhteydenottolomake"
        className="kt-m-hide"
        onClick={openTarjous}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--kt-messinki)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--kt-viiva)";
        }}
        style={{
          position: "fixed",
          left: 0,
          top: "66%",
          zIndex: 180,
          width: 44,
          height: 180,
          overflow: "hidden",
          background: "var(--kt-paneeli)",
          border: "1px solid var(--kt-viiva)",
          borderLeft: "none",
          borderRadius: "0 6px 6px 0",
          cursor: "pointer",
          transform: tabVisible ? "translateY(-50%)" : "translateY(calc(-50% + 56px))",
          opacity: tabVisible ? 1 : 0,
          pointerEvents: tabVisible ? "auto" : "none",
          transition: `transform 220ms ${CURVE}, opacity 220ms ${CURVE}, border-color var(--kt-duration-fast) ${CURVE}`,
        }}
      >
        <Image
          src="/images/toiminta-korttiheitto-02-web.webp"
          alt=""
          fill
          sizes="44px"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(19,26,38,0.2) 0%, rgba(19,26,38,0.72) 100%)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "var(--kt-font-body)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--kt-valo)",
              textShadow: "0 1px 6px rgba(11,15,23,0.7)",
            }}
          >
            Yhteys
          </span>
        </span>
      </div>

      {/* Mobile: bottom-pinned CTA bar, slides in once the hero is scrolled past */}
      <div
        className="kt-m-only"
        style={{
          display: "none",
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 170,
          background: "var(--kt-muste)",
          borderTop: "1px solid var(--kt-viiva)",
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom)) 16px",
          transform: tabVisible ? "translateY(0)" : "translateY(110%)",
          transition: `transform 220ms ${CURVE}`,
        }}
      >
        <button
          onClick={openTarjous}
          className="kt-btn-primary"
          style={{ width: "100%", padding: "14px 24px" }}
        >
          Pyydä tarjous
        </button>
      </div>

      {/* Overlay + ticket dialog */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 190,
          background: "rgba(11,15,23,0.65)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          boxSizing: "border-box",
          opacity: open && !entering ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `opacity 220ms ${CURVE}`,
        }}
      >
        <div
          role="dialog"
          aria-label="Tarjouspyyntö"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(760px, 100%)",
            maxHeight: "calc(100dvh - 32px)",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            position: "relative",
            transform: atOrigin
              ? `translate(${ox}px, ${oy}px) scale(0.12)`
              : "translate(0px, 0px) scale(1)",
            opacity: atOrigin ? 0.4 : 1,
            transition: `transform 260ms ${CURVE}, opacity 260ms ${CURVE}`,
          }}
        >
          <div
            className="kt-lomake-main"
            style={{
              position: "relative",
              zIndex: 1,
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              background: "var(--kt-yo)",
              border: "1px solid var(--kt-viiva)",
              borderRight: "none",
            }}
          >
            <div
              className="kt-lomake-head"
              style={{
                flex: "none",
                padding: "26px 32px 0 32px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--kt-font-display)",
                  fontWeight: 400,
                  fontSize: 30,
                  lineHeight: 1.25,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "var(--kt-valo)",
                }}
              >
                Kerro tilaisuudestanne
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Sulje lomake"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--kt-messinki)";
                  e.currentTarget.style.color = "var(--kt-messinki)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--kt-viiva)";
                  e.currentTarget.style.color = "var(--kt-valo-himmea)";
                }}
                style={{
                  background: "transparent",
                  border: "1px solid var(--kt-viiva)",
                  color: "var(--kt-valo-himmea)",
                  fontFamily: "var(--kt-font-body)",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  padding: "8px 14px",
                  cursor: "pointer",
                  transition: `all var(--kt-duration-fast) ${CURVE}`,
                  whiteSpace: "nowrap",
                }}
              >
                Sulje ×
              </button>
            </div>
            <div className="kt-lomake-body" style={{ padding: "20px 32px 32px 32px", overflowY: "auto", minHeight: 0 }}>
              {sent ? (
                <div
                  style={{
                    background: "var(--kt-paneeli)",
                    border: "1px solid var(--kt-viiva)",
                    borderTop: "6px solid var(--kt-messinki)",
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--kt-font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--kt-messinki)",
                      marginBottom: 10,
                    }}
                  >
                    Kiitos
                  </div>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: 26, lineHeight: 1.25 }}>
                    Tarjouspyyntö lähetetty
                  </h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)" }}>
                    Palaan asiaan mahdollisimman pian. Jos asialla on kiire, laita viesti suoraan
                    osoitteeseen <a href="mailto:jp@koomikkotaikuri.fi">jp@koomikkotaikuri.fi</a>.
                  </p>
                </div>
              ) : (
                <>
                  <p
                    style={{
                      margin: "0 0 26px 0",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--kt-valo-himmea)",
                      maxWidth: 520,
                      textWrap: "pretty",
                    }}
                  >
                    Mitä paremmin tunnen tilaisuutenne, sitä osuvamman kokonaisuuden voin ehdottaa.
                    Vastaus tulee nopeasti - ei myyntipuheluita.
                  </p>
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
                    <div className="kt-m-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <Field label="Nimi">
                        <input
                          name="nimi"
                          required
                          placeholder="Etunimi Sukunimi"
                          style={fieldStyle}
                          value={nimi}
                          onChange={(e) => setNimi(e.target.value)}
                          {...focusHandlers}
                        />
                      </Field>
                      <Field label="Sähköposti">
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="nimi@yritys.fi"
                          style={fieldStyle}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          {...focusHandlers}
                        />
                      </Field>
                      <Field label="Tilaisuuden tyyppi">
                        <select
                          name="tyyppi"
                          value={tyyppi}
                          onChange={(e) => setTyyppi(e.target.value)}
                          style={{ ...fieldStyle, cursor: "pointer" }}
                          {...focusHandlers}
                        >
                          <option value="" disabled>
                            Valitse
                          </option>
                          {TYYPIT.map(
                            (o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            )
                          )}
                        </select>
                      </Field>
                      <Field label="Ajankohta" helper="Arvio riittää">
                        <input
                          name="pvm"
                          placeholder="12.12.2026 tai 'joulukuu'"
                          style={fieldStyle}
                          value={pvm}
                          onChange={(e) => setPvm(e.target.value)}
                          {...focusHandlers}
                        />
                      </Field>
                    </div>
                    <Field
                      label="Kerro tilaisuudestanne"
                      helper="Tilaisuuden luonne, paikkakunta ja arvioitu yleisömäärä"
                    >
                      <textarea
                        name="viesti"
                        rows={4}
                        style={{ ...fieldStyle, resize: "vertical" }}
                        value={viesti}
                        onChange={(e) => setViesti(e.target.value)}
                        {...focusHandlers}
                      />
                    </Field>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                        fontFamily: "var(--kt-font-body)",
                        fontSize: 14,
                        color: "var(--kt-valo-himmea)",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="lupa"
                        checked={lupa}
                        onChange={(e) => setLupa(e.target.checked)}
                        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                      />
                      <span
                        aria-hidden
                        style={{
                          flex: "none",
                          width: 20,
                          height: 20,
                          borderRadius: 2,
                          border: `1px solid ${lupa ? "var(--kt-messinki)" : "var(--kt-viiva)"}`,
                          background: lupa ? "var(--kt-messinki)" : "var(--kt-paneeli)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: `all var(--kt-duration-fast) ${CURVE}`,
                        }}
                      >
                        {lupa && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--kt-yo)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m4 12 6 6 10-12" />
                          </svg>
                        )}
                      </span>
                      Minulle saa lähettää tarjouksen sähköpostitse
                    </label>
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
                    {/* Pidetään aina renderöitynä tyhjänäkin, jotta aria-live
                        ilmoittaa sisällön muuttumisesta. */}
                    <p
                      aria-live="polite"
                      style={{
                        margin: 0,
                        fontFamily: "var(--kt-font-body)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "var(--kt-error)",
                      }}
                    >
                      {!tila.ok && tila.viesti ? tila.viesti : ""}
                    </p>
                  </form>
                </>
              )}
              <div
                style={{
                  marginTop: 28,
                  borderTop: "1px solid var(--kt-viiva)",
                  paddingTop: 16,
                  fontFamily: "var(--kt-font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  color: "var(--kt-siniharmaa)",
                }}
              >
                01 Ota yhteyttä · 02 Hyväksy tarjous · 03 Tilaisuus toteutuu
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="kt-lomake-rail"
            style={{
              flex: "none",
              zIndex: 1,
              width: 24,
              background: "repeating-linear-gradient(var(--kt-messinki) 0 7px, var(--kt-yo) 7px 13px)",
            }}
          />
          <div
            className="kt-lomake-rail"
            style={{
              flex: "none",
              zIndex: 1,
              width: 64,
              background: "var(--kt-messinki)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "24px 0",
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontFamily: "var(--kt-font-display)",
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--kt-yo)",
              }}
            >
              Tarjouspyyntö
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
