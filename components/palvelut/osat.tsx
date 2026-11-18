import Image from "next/image";

/* Palvelusivun yhteiset rakennuspalat. Osiot käyttävät näitä eri
   asetteluissa, jotta viisi palvelua eivät näytä samalta laatikolta. */

export const leipa: React.CSSProperties = {
  margin: "0 0 18px 0",
  maxWidth: 620,
  fontSize: 17,
  lineHeight: 1.65,
  color: "var(--kt-valo-himmea)",
  textWrap: "pretty",
};

/* Display-fontin oletusvälistys on tiukka (-0.01em, ks. globals.css). Pienissä
   palvelusivun otsikoissa kirjaimet painuivat kapealla näytöllä lähes kiinni
   toisiinsa, joten niille annetaan hieman ilmaa. */
export const h3Tyyli: React.CSSProperties = {
  margin: "0 0 12px 0",
  fontSize: 22,
  lineHeight: 1.25,
  letterSpacing: "0.015em",
};

/* Palvelun nimi ja sen alla kuvaava rivi samassa otsikossa: nimi on se,
   jolla asiakas palvelun tuntee etusivulta, ja kuvaus kertoo hakukoneelle
   ja silmäilijälle, mistä on kyse. */
export function PalveluOtsikko({ nimi, kuvaus }: { nimi: string; kuvaus: string }) {
  return (
    <h2 style={{ margin: "0 0 28px 0", fontSize: "clamp(36px, 4.2vw, 64px)", lineHeight: 1.1 }}>
      {nimi}
      <span
        style={{
          display: "block",
          marginTop: 12,
          fontSize: "clamp(17px, 1.7vw, 23px)",
          lineHeight: 1.3,
          letterSpacing: "0.025em",
          color: "var(--kt-messinki)",
        }}
      >
        {kuvaus}
      </span>
    </h2>
  );
}

export function Kuva({
  src,
  alt,
  ratio,
  sijainti = "center",
  sizes = "(max-width: 767px) 100vw, 640px",
  kuvateksti,
}: {
  src: string;
  alt: string;
  ratio: string;
  sijainti?: string;
  sizes?: string;
  kuvateksti?: string;
}) {
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          aspectRatio: ratio,
          background: "var(--kt-paneeli)",
          border: "1px solid var(--kt-viiva)",
          overflow: "hidden",
        }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "cover", objectPosition: sijainti }} />
      </div>
      {kuvateksti && (
        <figcaption
          style={{
            marginTop: 10,
            fontFamily: "var(--kt-font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--kt-siniharmaa)",
          }}
        >
          {kuvateksti}
        </figcaption>
      )}
    </figure>
  );
}

/* Käytännön tiedot tiiviinä listana: nimi vasemmalla, tieto oikealla. */
export function Faktat({ rivit }: { rivit: { nimi: string; arvo: React.ReactNode }[] }) {
  return (
    <dl className="kt-faktat" style={{ margin: "8px 0 28px 0", maxWidth: 620 }}>
      {rivit.map((r) => (
        <div
          key={r.nimi}
          className="kt-fakta"
          style={{
            display: "grid",
            gridTemplateColumns: "140px 1fr",
            gap: 16,
            padding: "14px 0",
            borderTop: "1px solid var(--kt-viiva)",
          }}
        >
          <dt
            style={{
              fontFamily: "var(--kt-font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--kt-messinki)",
              paddingTop: 3,
            }}
          >
            {r.nimi}
          </dt>
          <dd style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)" }}>{r.arvo}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Pieni huomio juontopalvelusta muiden palveluiden yhteydessä. Lähestyy
   asiaa järjestäjän käytännön tarpeen kautta ja vie Juontajana-osioon. */
export function JuontoVinkki({ children, linkki = "Lue juontamisesta" }: { children: React.ReactNode; linkki?: string }) {
  return (
    <aside
      aria-label="Juonto"
      style={{
        margin: "0 0 32px 0",
        maxWidth: 620,
        padding: "4px 0 4px 20px",
        borderLeft: "2px solid var(--kt-messinki)",
      }}
    >
      <p style={{ margin: "0 0 8px 0", fontSize: 15, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
        {children}
      </p>
      <a href="#kt-p4" className="kt-cta-link">
        {linkki} →
      </a>
    </aside>
  );
}
