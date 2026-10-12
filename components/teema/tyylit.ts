/* Teemasivujen yhteiset tyylit. Samat arvot kuin /palvelut-sivulla, jotta
   teemasivut näyttävät osalta sivustoa. */
export const kicker: React.CSSProperties = {
  fontFamily: "var(--kt-font-mono)",
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--kt-messinki)",
};

export const sectionH2: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(30px, 3.4vw, 52px)",
  lineHeight: 1.25,
  maxWidth: 900,
};

export const lead: React.CSSProperties = {
  margin: 0,
  maxWidth: 560,
  fontSize: 16,
  lineHeight: 1.6,
  color: "var(--kt-valo-himmea)",
  textWrap: "pretty",
};

export const bodyText: React.CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.6,
  color: "var(--kt-valo-himmea)",
  textWrap: "pretty",
};

export const panel: React.CSSProperties = {
  background: "var(--kt-paneeli)",
  border: "1px solid var(--kt-viiva)",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 16,
};
