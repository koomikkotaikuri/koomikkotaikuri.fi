"use client";

import { useEffect, useRef, useState } from "react";
import { Rule } from "@/components/ui/Rule";
import { openTarjous } from "@/lib/tarjous";

const quotes = [
  {
    start: 0.01,
    dur: 0.18,
    quote: "Otti yli 500 henkisen yleisön haltuun, hämmästytti ja etenkin nauratti koko porukkaa.",
    name: "Marita Toikka",
    org: "Kouvolan kaupunginjohtaja",
    left: "5%",
    top: "16%",
    maxWidth: "50vw",
  },
  {
    start: 0.15,
    dur: 0.18,
    quote: "Harvoin näkee yhden illan aikana noin paljon epäuskoisia ja hämmentyneitä ilmeitä.",
    name: "Jussi Vänttinen",
    org: "Toimitusjohtaja, Orange Advertising",
    left: "52%",
    top: "54%",
    maxWidth: "44vw",
  },
  {
    start: 0.29,
    dur: 0.18,
    quote: "Meillä on ollut juhlissa koomikoita, taikureita ja mentalisteja. Tämä yhdistelmä toimi parhaiten.",
    name: "Eelis Pärssinen",
    org: "Piikkiön VPK",
    left: "7%",
    top: "58%",
    maxWidth: "50vw",
  },
  {
    start: 0.43,
    dur: 0.18,
    quote: "Esitys toi juhlaan juuri sitä ekstraa, mitä kaivattiin.",
    name: "Jennamaria Pennanen",
    org: "Johdon assistentti, HOAS",
    left: "50%",
    top: "14%",
    maxWidth: "44vw",
  },
  {
    start: 0.57,
    dur: 0.18,
    quote: "Asukkaat sanoivat, etteivät ole näin hauskoissa harjannostajaisissa ennen käyneet.",
    name: "Mia Siiropää",
    org: "Lemminkäinen",
    left: "12%",
    top: "38%",
    maxWidth: "50vw",
  },
  {
    start: 0.71,
    dur: 0.18,
    quote: "Ammattilainen on aina ammattilainen. Tätä muistellaan vielä pitkään!",
    name: "Susanna Mattsson",
    org: "60v juhlat",
    left: "46%",
    top: "60%",
    maxWidth: "46vw",
  },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function AsiakkaatKertovat({ videoSrc = "/videos/korttipakka-animaatio.mp4" }: { videoSrc?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quoteRefs = useRef<(HTMLElement | null)[]>([]);
  const outroRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const lastSeekRef = useRef<number | undefined>(undefined);
  const pendingRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;

    // On phones the scrub section is display:none (CSS); the swipeable quote
    // cards below are shown instead. Skip the scroll machinery and drop the
    // hidden video's src so it is never downloaded.
    if (window.matchMedia("(max-width: 767px)").matches) {
      if (video) {
        video.preload = "none";
        video.removeAttribute("src");
        video.load();
      }
      return;
    }

    const doSeek = (t: number) => {
      if (!video) return;
      lastSeekRef.current = t;
      try {
        if (typeof video.fastSeek === "function") video.fastSeek(t);
        else video.currentTime = t;
      } catch {
        /* seeking before metadata is loaded is harmless */
      }
    };

    const onSeeked = () => {
      if (pendingRef.current !== undefined) {
        const t = pendingRef.current;
        pendingRef.current = undefined;
        doSeek(t);
      }
    };
    video?.addEventListener("seeked", onSeeked);

    const overlay = (p: number) => {
      quoteRefs.current.forEach((el, i) => {
        if (!el) return;
        const { start, dur } = quotes[i];
        const o = seg(p, start, start + dur * 0.3) * (1 - seg(p, start + dur * 0.72, start + dur));
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translateY(${((1 - o) * 10).toFixed(1)}px)`;
      });
      const oo = seg(p, 0.9, 0.96);
      if (outroRef.current) {
        outroRef.current.style.opacity = oo.toFixed(3);
        outroRef.current.style.transform = `translateY(${((1 - oo) * 10).toFixed(1)}px)`;
        outroRef.current.style.pointerEvents = oo > 0.5 ? "auto" : "none";
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = (1 - seg(p, 0.01, 0.05)).toFixed(3);
      }
    };

    const loop = () => {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const v = videoRef.current;
        const d = targetRef.current - currentRef.current;
        currentRef.current = Math.abs(d) < 0.004 ? targetRef.current : currentRef.current + d * 0.25;
        if (v && v.duration && !isNaN(v.duration)) {
          const scrub = clamp01(seg(currentRef.current, 0.02, 0.99));
          const t = (0.08 + scrub * 0.68) * v.duration;
          if (Math.abs(t - (lastSeekRef.current ?? -1)) > 0.06) {
            if (v.seeking) pendingRef.current = t;
            else doSeek(t);
          }
        }
        if (Math.abs(targetRef.current - currentRef.current) > 0.001) loop();
      });
    };

    const kick = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const p = clamp01(-rect.top / (sec.offsetHeight - window.innerHeight));
      targetRef.current = p;
      overlay(p);
      if (!rafRef.current) loop();
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    const t1 = setTimeout(kick, 300);
    const t2 = setTimeout(kick, 1200);

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      video?.removeEventListener("seeked", onSeeked);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      className="kt-m-hide"
      style={{
        position: "relative",
        height: "520vh",
        background: "var(--kt-yo)",
        borderTop: "1px solid var(--kt-viiva)",
      }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "var(--kt-yo)" }}>
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background: "var(--kt-yo)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(19,26,38,0.55) 0%, rgba(19,26,38,0) 30%, rgba(19,26,38,0) 70%, rgba(19,26,38,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
        <div className="kt-m-pad-x" style={{ position: "absolute", top: 40, left: 0, right: 0, zIndex: 5, padding: "0 48px" }}>
          <Rule left="ASIAKKAAT KERTOVAT" right="28 vuotta · 1500+ tilaisuutta" />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 4 }}>
          {quotes.map((q, i) => (
            <figure
              key={q.name}
              className="kt-quote-card"
              ref={(el) => {
                quoteRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: q.left,
                top: q.top,
                width: 560,
                maxWidth: q.maxWidth,
                margin: 0,
                opacity: 0,
                background: "rgba(19,26,38,0.86)",
                border: "1px solid var(--kt-viiva)",
                borderLeft: "2px solid var(--kt-messinki)",
                padding: "24px 28px",
                boxSizing: "border-box",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontSize: "clamp(18px, 1.7vw, 24px)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: "var(--kt-valo)",
                  textWrap: "pretty",
                }}
              >
                &rdquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 14 }}>
                <div
                  style={{
                    fontFamily: "var(--kt-font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(16px, 1.3vw, 20px)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "var(--kt-messinki)",
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
                    marginTop: 4,
                  }}
                >
                  {q.org}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div
          ref={outroRef}
          style={{
            position: "absolute",
            bottom: "26vh",
            left: 0,
            right: 0,
            zIndex: 4,
            opacity: 0,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 48px",
          }}
        >
          <figure
            className="kt-outro-card"
            style={{
              margin: 0,
              width: 720,
              maxWidth: "60vw",
              background: "rgba(19,26,38,0.86)",
              border: "1px solid var(--kt-viiva)",
              borderLeft: "2px solid var(--kt-messinki)",
              padding: "40px 48px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "var(--kt-font-display)",
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(28px, 2.8vw, 44px)",
                lineHeight: 1.25,
                color: "var(--kt-valo)",
                textWrap: "pretty",
              }}
            >
              Kuvittele mitä <span style={{ color: "var(--kt-messinki)" }}>tapahtuu</span>, kun olen paikan
              päällä.
            </p>
            <a
              href="#tarjous"
              onClick={(e) => {
                e.preventDefault();
                openTarjous();
              }}
              style={{
                display: "inline-block",
                border: "1px solid var(--kt-valo)",
                color: "var(--kt-valo)",
                background: "rgba(19,26,38,0.5)",
                padding: "14px 32px",
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                transition: "all var(--kt-duration-fast) var(--kt-ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--kt-valo)";
                e.currentTarget.style.color = "var(--kt-muste)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(19,26,38,0.5)";
                e.currentTarget.style.color = "var(--kt-valo)";
              }}
            >
              Pyydä tarjous
            </a>
          </figure>
        </div>
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: "5vh",
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "var(--kt-font-mono)",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6B7689",
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          Scrollaa ↓
        </div>
      </div>
    </section>

    {/* Mobile: no scroll scrubbing or video — a horizontal swipe deck of
        quote cards (CSS scroll snap, works without JS) with dot navigation. */}
    <section
      className="kt-m-only"
      style={{
        display: "none",
        background: "var(--kt-yo)",
        borderTop: "1px solid var(--kt-viiva)",
        padding: "64px 20px",
      }}
    >
      <Rule left="ASIAKKAAT KERTOVAT" right="1500+ tilaisuutta" />
      <div
        ref={trackRef}
        className="kt-quote-track"
        onScroll={(e) => {
          const el = e.currentTarget;
          const max = el.scrollWidth - el.clientWidth;
          if (max <= 0) return;
          setQuoteIndex(Math.round((el.scrollLeft / max) * (quotes.length - 1)));
        }}
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          margin: "32px -20px 0 -20px",
          padding: "0 20px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {quotes.map((q) => (
          <figure
            key={q.name}
            style={{
              flex: "0 0 84%",
              scrollSnapAlign: "center",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
              borderLeft: "2px solid var(--kt-messinki)",
              padding: "22px 22px 20px 22px",
            }}
          >
            <blockquote
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.5,
                color: "var(--kt-valo)",
                textWrap: "pretty",
              }}
            >
              &rdquo;{q.quote}&rdquo;
            </blockquote>
            <figcaption style={{ marginTop: "auto", paddingTop: 16 }}>
              <div
                style={{
                  fontFamily: "var(--kt-font-display)",
                  fontWeight: 400,
                  fontSize: 17,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--kt-messinki)",
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
                  marginTop: 4,
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
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 20,
        }}
      >
        {quotes.map((q, i) => (
          <button
            key={q.name}
            aria-label={`Suositus ${i + 1}`}
            onClick={() => {
              trackRef.current?.children[i]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
            }}
            style={{
              width: 8,
              height: 8,
              padding: 0,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background: i === quoteIndex ? "var(--kt-messinki)" : "var(--kt-viiva)",
              transition: "background var(--kt-duration-fast) var(--kt-ease)",
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <p
          style={{
            margin: "0 0 24px 0",
            fontFamily: "var(--kt-font-display)",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: 28,
            lineHeight: 1.25,
            color: "var(--kt-valo)",
            textWrap: "pretty",
          }}
        >
          Kuvittele mitä <span style={{ color: "var(--kt-messinki)" }}>tapahtuu</span>, kun olen
          paikan päällä.
        </p>
        <a
          href="#tarjous"
          onClick={(e) => {
            e.preventDefault();
            openTarjous();
          }}
          className="kt-btn-secondary"
        >
          Pyydä tarjous
        </a>
      </div>
    </section>
    </>
  );
}
