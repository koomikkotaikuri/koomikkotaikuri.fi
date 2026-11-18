"use client";

import { useEffect, useRef, useState } from "react";
import { PALVELUT } from "@/lib/palvelut";

/* Raja (px ikkunan yläreunasta), jonka kohdalla oleva osio on "luettavana".
   Hieman yläpalkin (64) ja tämän valikon alapuolella. */
const RAJA = 180;

/* Palveluiden välinen valikko. Pysyy yläpalkin alla koko sivun ajan,
   korostaa palvelun, jota luetaan, ja puhelimessa vierittää aktiivisen
   sirun näkyviin. Linkit ovat tavallisia ankkureita, joten ne toimivat
   myös ennen kuin JavaScript on latautunut. */
export function PalveluNav() {
  const [aktiivinen, setAktiivinen] = useState<string | null>(null);
  const rivi = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const laske = () => {
      raf = 0;
      let uusi: string | null = null;
      for (const p of PALVELUT) {
        const el = document.getElementById(p.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= RAJA && r.bottom > RAJA) uusi = p.id;
      }
      setAktiivinen(uusi);
    };
    const ajasta = () => {
      if (!raf) raf = requestAnimationFrame(laske);
    };
    laske();
    window.addEventListener("scroll", ajasta, { passive: true });
    window.addEventListener("resize", ajasta);
    return () => {
      window.removeEventListener("scroll", ajasta);
      window.removeEventListener("resize", ajasta);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Kapealla näytöllä sirut eivät mahdu riville: pidetään aktiivinen näkyvissä. */
  useEffect(() => {
    const c = rivi.current;
    if (!aktiivinen || !c || c.scrollWidth <= c.clientWidth) return;
    const siru = c.querySelector<HTMLElement>(`[data-id="${aktiivinen}"]`);
    if (!siru) return;
    const vahemman = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    c.scrollTo({ left: Math.max(0, siru.offsetLeft - 20), behavior: vahemman ? "auto" : "smooth" });
  }, [aktiivinen]);

  return (
    <nav
      aria-label="Palvelut"
      className="kt-m-pad-x kt-palvelunav"
      style={{
        position: "sticky",
        top: 64,
        zIndex: 40,
        background: "var(--kt-yo)",
        borderTop: "1px solid var(--kt-viiva)",
        borderBottom: "1px solid var(--kt-viiva)",
        padding: "14px 48px",
      }}
    >
      <div
        ref={rivi}
        className="kt-jump-chips"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {PALVELUT.map((p) => (
          <a
            key={p.id}
            data-id={p.id}
            href={`#${p.id}`}
            className="kt-chip"
            aria-current={aktiivinen === p.id ? "location" : undefined}
          >
            {p.nimi}
          </a>
        ))}
      </div>
    </nav>
  );
}
