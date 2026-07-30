"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToId } from "@/lib/scrollTo";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const markRowRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const tagBaseSize = useRef<number | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const tryPlay = () => video.play().catch(() => {});
      tryPlay();
      video.addEventListener("loadeddata", tryPlay);
      video.addEventListener("canplay", tryPlay);
      window.addEventListener("pointerdown", tryPlay, { once: true });
    }

    const fit = () => {
      const mark = markRowRef.current;
      const tagline = taglineRef.current;
      if (!mark || !tagline || !tagline.offsetWidth || !mark.offsetWidth) return;
      if (tagBaseSize.current === null) {
        tagBaseSize.current = parseFloat(getComputedStyle(tagline).fontSize) || 34;
      }
      tagline.style.fontSize = `${tagBaseSize.current}px`;
      const width = tagline.offsetWidth;
      if (width > 0) {
        tagline.style.fontSize = `${(tagBaseSize.current * mark.offsetWidth) / width}px`;
      }
    };
    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    const timeout = setTimeout(fit, 400);
    window.addEventListener("resize", fit);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", fit);
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const on = !soundOn;
    video.muted = !on;
    if (on) video.currentTime = 0;
    video.play().catch(() => {});
    setSoundOn(on);
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--kt-yo)",
      }}
    >
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        loop
        playsInline
        autoPlay
        muted
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "62%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "66% 50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, #131A26 36%, rgba(19,26,38,0.86) 48%, rgba(19,26,38,0.28) 68%, rgba(19,26,38,0.12) 82%, rgba(19,26,38,0.42) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "22vh",
          background: "linear-gradient(180deg, rgba(19,26,38,0) 0%, #131A26 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "128px 48px 96px 48px",
          maxWidth: "56%",
        }}
      >
        <div
          style={{
            fontFamily: "var(--kt-font-mono)",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--kt-siniharmaa)",
            marginBottom: 28,
          }}
        >
          Stand up · Taikuus · Yritystilaisuudet
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--kt-font-display)",
            fontWeight: 400,
            textTransform: "uppercase",
            color: "var(--kt-valo)",
            fontSize: "clamp(52px, 7vw, 118px)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            <span ref={markRowRef} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              KOOMIKKO<span style={{ color: "var(--kt-messinki)" }}>TAIKURI</span>
            </span>
          </span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            <span style={{ color: "var(--kt-messinki)" }}>TAIKURI</span>KOOMIKKO
          </span>
        </h1>
        <div style={{ lineHeight: 1.08, marginTop: "0.14em" }}>
          <span
            ref={taglineRef}
            style={{
              display: "inline-block",
              fontFamily: "var(--kt-font-display)",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "var(--kt-valo)",
              fontSize: 34,
              lineHeight: 1.08,
              whiteSpace: "nowrap",
            }}
          >
            KAKSI SUUNTAA, <span style={{ color: "var(--kt-messinki)" }}>YKSI KOKONAISUUS</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
          <button
            onClick={toggleSound}
            style={{
              fontFamily: "var(--kt-font-body)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "transparent",
              color: "var(--kt-valo)",
              border: "1px solid var(--kt-valo)",
              borderRadius: 2,
              padding: "16px 32px",
              cursor: "pointer",
              transition: "all var(--kt-duration-fast) var(--kt-ease)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--kt-valo)";
              e.currentTarget.style.color = "var(--kt-muste)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--kt-valo)";
            }}
          >
            {soundOn ? "Mykistä video" : "Katso video"}
          </button>
          <button
            onClick={() => scrollToId("kt-cta-band")}
            style={{
              fontFamily: "var(--kt-font-body)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "var(--kt-messinki)",
              color: "var(--kt-yo)",
              border: "none",
              borderRadius: 2,
              padding: "16px 32px",
              cursor: "pointer",
              transition: "background var(--kt-duration-fast) var(--kt-ease)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--kt-messinki-syva)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--kt-messinki)";
            }}
          >
            Pyydä tarjous
          </button>
        </div>
      </div>
    </section>
  );
}
