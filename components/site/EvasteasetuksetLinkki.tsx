"use client";

import { avaaEvasteasetukset } from "@/lib/gtag";

/* Footer on server-komponentti, joten bannerin avaava nappi on oma client-palansa. */
export function EvasteasetuksetLinkki() {
  return (
    <button
      type="button"
      onClick={avaaEvasteasetukset}
      className="kt-footer-link"
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}
    >
      Evästeasetukset
    </button>
  );
}
