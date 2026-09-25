"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  EVASTEET_EVENT,
  SUOSTUMUS_MUUTTUI_EVENT,
  asetaSuostumus,
  lueSuostumus,
  trackEvent,
} from "@/lib/gtag";

function kuuntele(muuttui: () => void) {
  window.addEventListener(SUOSTUMUS_MUUTTUI_EVENT, muuttui);
  window.addEventListener("storage", muuttui);
  return () => {
    window.removeEventListener(SUOSTUMUS_MUUTTUI_EVENT, muuttui);
    window.removeEventListener("storage", muuttui);
  };
}

export function Evastebanneri() {
  /* Palvelimella valintaa ei tiedetä ("ssr"), joten banneri renderöityy
     vasta selaimessa eikä hydraatio mene ristiin. */
  const valinta = useSyncExternalStore(kuuntele, lueSuostumus, () => "ssr");
  const [avattu, setAvattu] = useState(false);
  const auki = avattu || valinta === null;

  useEffect(() => {
    const avaa = () => setAvattu(true);
    window.addEventListener(EVASTEET_EVENT, avaa);
    return () => window.removeEventListener(EVASTEET_EVENT, avaa);
  }, []);

  /* Puhelin- ja sähköpostilinkkien klikkaukset seurataan yhdellä
     kuuntelijalla, jolloin uudetkin linkit tulevat mukaan itsestään. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const linkki = (e.target as Element | null)?.closest?.("a[href]");
      const href = linkki?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackEvent("contact_click", { method: "phone" });
      else if (href.startsWith("mailto:")) trackEvent("contact_click", { method: "email" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!auki) return null;

  const valitse = (hyvaksytty: boolean) => {
    asetaSuostumus(hyvaksytty);
    setAvattu(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Evästeasetukset"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 185,
        maxWidth: 560,
        marginLeft: "auto",
        boxSizing: "border-box",
        background: "var(--kt-paneeli)",
        border: "1px solid var(--kt-viiva)",
        borderTop: "4px solid var(--kt-messinki)",
        borderRadius: 2,
        padding: "20px 24px",
        boxShadow: "0 12px 40px rgba(11,15,23,0.55)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--kt-font-mono)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--kt-messinki)",
          marginBottom: 8,
        }}
      >
        Evästeet
      </div>
      <p style={{ margin: "0 0 18px 0", fontSize: 14, lineHeight: 1.6, color: "var(--kt-valo-himmea)" }}>
        Käytän Googlen analytiikka- ja mainosevästeitä, jotta näen mikä sivustolla toimii ja
        tavoitan oikeat tilaajat. Välttämättömät toiminnot toimivat ilman niitäkin.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <button className="kt-btn-primary" style={{ padding: "12px 22px" }} onClick={() => valitse(true)}>
          Hyväksy kaikki
        </button>
        <button className="kt-btn-secondary" style={{ padding: "12px 22px" }} onClick={() => valitse(false)}>
          Vain välttämättömät
        </button>
      </div>
    </div>
  );
}
