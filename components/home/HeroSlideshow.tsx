"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* Väliaikainen kuvakierto heron taustavideon tilalla, kunnes uusi promovideo
   on kuvattu. Vaihto takaisin: korvaa <HeroSlideshow /> videolla Hero.tsx:ssä. */

const SLIDES = [
  "/images/muotokuva-korttitaika-02-vari.webp",
  "/images/toiminta-korttiheitto-01-web.webp",
  "/images/casual-taikuri-08-vari.webp",
  "/images/lava-esitys-yleiso-06.webp",
  "/images/muotokuva-kuutiotaika-07-vari.webp",
  "/images/muotokuva-studio-tumma-11-web.webp",
  "/images/muotokuva-korttitaika-05-vari.webp",
  "/images/muotokuva-kuutiotaika-01-vari.webp",
  "/images/casual-taikuri-17-vari.webp",
];

const SLIDE_MS = 6000;

/* Joka kolmas kuva saapuu erikoisefektillä, vuorotellen blur ja liukuma;
   muut rauhallisella ristifeidillä. Kiinteä rytmi indeksin mukaan. */
function entryClass(index: number): string {
  if (index === 0 || index % 3 !== 2) return "";
  return index % 2 === 0 ? "kt-slide-blur-in" : "kt-slide-drift-in";
}

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="kt-hero-video"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "62%",
        height: "100%",
        overflow: "hidden",
        /* Oma pinontakonteksti, jotta slaidien z-indeksit jäävät
           kt-hero-shade-gradientin alle ja kuva feidautuu taustaan. */
        zIndex: 0,
      }}
    >
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={`kt-slide ${i === active ? entryClass(i) : ""}`}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === active ? 1 : 0,
            zIndex: i === active ? 2 : 1,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="(max-width: 900px) 100vw, 62vw"
            className={i === active ? (i % 2 === 0 ? "kt-kenburns-a" : "kt-kenburns-b") : ""}
            style={{ objectFit: "cover", objectPosition: "50% 8%" }}
          />
        </div>
      ))}
    </div>
  );
}
