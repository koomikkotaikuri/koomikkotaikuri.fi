import Image from "next/image";
import { TarjousLink } from "@/components/site/TarjousLink";
import { kicker } from "./tyylit";

/* Teemasivun ensimmäinen ruutu. Työpöydällä teksti vasemmalla ja pystykuva
   oikealla; puhelimessa kuva siirtyy tekstin taakse (globals.css,
   .kt-teema-hero*), jotta otsikko, painike ja luottamusrivi mahtuvat
   ensimmäiseen ruutuun ilman vieritystä. */
export function TeemaHero({
  kickerText,
  title,
  sub,
  ctaLabel,
  tyyppi,
  luottamus,
  kuva,
}: {
  kickerText: string;
  title: string;
  sub: string;
  ctaLabel: string;
  tyyppi: string;
  luottamus: string[];
  kuva: { src: string; alt: string; objectPosition?: string };
}) {
  return (
    <section
      className="kt-teema-hero"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--kt-yo)",
        minHeight: "100svh",
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        alignItems: "center",
        gap: 64,
        padding: "128px 48px 64px 48px",
        maxWidth: 1376,
        margin: "0 auto",
      }}
    >
      <div
        className="kt-teema-hero-teksti"
        style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 24 }}
      >
        <div style={{ ...kicker, color: "var(--kt-siniharmaa)", fontSize: 12 }}>{kickerText}</div>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(38px, 5.2vw, 80px)",
            lineHeight: 1.12,
            maxWidth: 760,
            textWrap: "balance",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 520,
            fontSize: "clamp(16px, 1.4vw, 19px)",
            lineHeight: 1.6,
            color: "var(--kt-valo-himmea)",
            textWrap: "pretty",
          }}
        >
          {sub}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, marginTop: 8 }}>
          <TarjousLink className="kt-btn-primary" tyyppi={tyyppi}>
            {ctaLabel}
          </TarjousLink>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 10px",
            fontFamily: "var(--kt-font-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "var(--kt-siniharmaa)",
          }}
        >
          {luottamus.map((rivi, i) => (
            <span key={rivi} style={{ display: "inline-flex", gap: 10 }}>
              {i > 0 && <span aria-hidden style={{ color: "var(--kt-messinki)" }}>·</span>}
              {rivi}
            </span>
          ))}
        </div>
      </div>
      <div
        className="kt-teema-hero-kuva"
        style={{
          position: "relative",
          aspectRatio: "2 / 3",
          maxHeight: "calc(100svh - 192px)",
          justifySelf: "end",
          width: "100%",
          background: "var(--kt-paneeli)",
          border: "1px solid var(--kt-viiva)",
        }}
      >
        <Image
          src={kuva.src}
          alt={kuva.alt}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 40vw"
          style={{ objectFit: "cover", objectPosition: kuva.objectPosition ?? "center top" }}
        />
      </div>
    </section>
  );
}
