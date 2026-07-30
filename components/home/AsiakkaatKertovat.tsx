"use client";

import { useEffect, useRef } from "react";
import { Rule } from "@/components/ui/Rule";

const frames = [
  "MUOTOKUVA 01 — Katse alaviistoon, vakava. Sama kohtaus, sama valo, kasvot samassa koossa joka kuvassa.",
  "MUOTOKUVA 02 — Katse kääntyy sivulle. Sama kohtaus, sama valo, kasvot samassa koossa joka kuvassa.",
  "MUOTOKUVA 03 — Katse nousee kohti. Sama kohtaus, sama valo, kasvot samassa koossa joka kuvassa.",
  "MUOTOKUVA 04 — Katse suoraan kameraan. Sama kohtaus, sama valo, kasvot samassa koossa joka kuvassa.",
  "MUOTOKUVA 05 — Kulmakarvat ylös, yllättynyt. Sama kohtaus, sama valo, kasvot samassa koossa joka kuvassa.",
  "MUOTOKUVA 06 — Leveä hymy suoraan kameraan. Sama kohtaus, sama valo, kasvot samassa koossa joka kuvassa.",
];

const quotes = [
  {
    start: 0,
    quote: "Otti yli 500 henkisen yleisön haltuun, hämmästytti ja etenkin nauratti koko porukkaa.",
    name: "Marita Toikka",
    org: "Kouvolan kaupunginjohtaja",
    left: "4%",
    top: "12%",
  },
  {
    start: 0.145,
    quote: "Harvoin näkee yhden illan aikana noin paljon epäuskoisia ja hämmentyneitä ilmeitä.",
    name: "Jussi Vänttinen",
    org: "Toimitusjohtaja, Orange Advertising",
    left: "48%",
    top: "46%",
  },
  {
    start: 0.29,
    quote: "Meillä on ollut juhlissa koomikoita, taikureita ja mentalisteja. Tämä yhdistelmä toimi parhaiten.",
    name: "Eelis Pärssinen",
    org: "Piikkiön VPK",
    left: "6%",
    top: "62%",
  },
  {
    start: 0.435,
    quote: "Esitys toi juhlaan juuri sitä ekstraa, mitä kaivattiin.",
    name: "Jennamaria Pennanen",
    org: "Johdon assistentti, HOAS",
    left: "46%",
    top: "10%",
  },
  {
    start: 0.58,
    quote: "Asukkaat sanoivat, etteivät ole näin hauskoissa harjannostajaisissa ennen käyneet.",
    name: "Mia Siiropää",
    org: "Lemminkäinen",
    left: "16%",
    top: "40%",
  },
  {
    start: 0.725,
    quote: "Ammattilainen on aina ammattilainen. Tätä muistellaan vielä pitkään!",
    name: "Susanna Mattsson",
    org: "60v juhlat",
    left: "38%",
    top: "64%",
  },
];

const DUR = 0.275;
const FACE_DIM = 0.72;

export function AsiakkaatKertovat() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRefs = useRef<(HTMLElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const sec = sectionRef.current;
        const pin = pinRef.current;
        if (!sec || !pin) return;
        const rect = sec.getBoundingClientRect();
        const range = sec.offsetHeight - window.innerHeight;
        const offset = Math.min(Math.max(0, -rect.top), range);
        pin.style.transform = `translateY(${offset}px)`;
        const progress = range > 0 ? offset / range : 0;
        const idx = progress * (frames.length - 1);

        frameRefs.current.forEach((frame, i) => {
          if (!frame) return;
          const o = Math.max(0, 1 - Math.abs(idx - i));
          frame.style.opacity = o.toFixed(3);
          frame.style.pointerEvents = o > 0.5 ? "auto" : "none";
        });

        quoteRefs.current.forEach((el, i) => {
          if (!el) return;
          const start = quotes[i].start;
          const t = (progress - start) / DUR;
          if (t <= 0 || t >= 1) {
            el.style.opacity = "0";
            return;
          }
          const inn = Math.min(1, t / 0.22);
          const out = Math.max(0, (t - 0.7) / 0.3);
          el.style.opacity = (inn * (1 - out)).toFixed(3);
          el.style.transform = `translateY(${(26 * (1 - inn) - 30 * out).toFixed(1)}px) scale(${(
            0.86 +
            0.16 * t +
            0.16 * out
          ).toFixed(3)})`;
          el.style.filter = `blur(${(10 * (1 - inn) + 16 * out).toFixed(1)}px)`;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "360vh", background: "var(--kt-yo)" }}>
      <div
        ref={pinRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          overflow: "hidden",
          willChange: "transform",
          background: "var(--kt-paneeli)",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          {frames.map((label, i) => (
            <div
              key={label}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  background: "var(--kt-surface-panel)",
                  border: "1px dashed var(--kt-border-default)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 32,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--kt-font-mono)",
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "var(--kt-text-muted)",
                    maxWidth: 420,
                  }}
                >
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(19,26,38,${FACE_DIM})`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "absolute", top: 40, left: 48, right: 48, zIndex: 5 }}>
          <Rule left="ASIAKKAAT KERTOVAT" right="28 vuotta, 1500+ tilaisuutta" />
        </div>

        <div style={{ position: "absolute", inset: 0, zIndex: 4 }}>
          {quotes.map((q, i) => (
            <figure
              key={q.name}
              ref={(el) => {
                quoteRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: q.left,
                top: q.top,
                width: 620,
                maxWidth: "46vw",
                margin: 0,
                padding: 0,
                textAlign: "center",
                opacity: 0,
                willChange: "transform, opacity, filter",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: "var(--kt-font-body)",
                  fontSize: "clamp(20px, 2.1vw, 30px)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: "var(--kt-valo)",
                  textShadow: "0 2px 28px rgba(0,0,0,0.85)",
                }}
              >
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 20 }}>
                <div
                  style={{
                    fontFamily: "var(--kt-font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(18px, 1.5vw, 24px)",
                    lineHeight: 1.25,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "var(--kt-messinki)",
                    textShadow: "0 2px 24px rgba(0,0,0,0.8)",
                  }}
                >
                  {q.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--kt-font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "var(--kt-valo-himmea)",
                    marginTop: 6,
                    textShadow: "0 2px 18px rgba(0,0,0,0.85)",
                  }}
                >
                  {q.org}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 48,
            right: 48,
            zIndex: 5,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <a href="#" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Tutustu JP:hen →
          </a>
          <span
            style={{
              fontFamily: "var(--kt-font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--kt-siniharmaa)",
            }}
          >
            Jatka rullaamista, niin katse kääntyy sinuun
          </span>
        </div>
      </div>
    </section>
  );
}
