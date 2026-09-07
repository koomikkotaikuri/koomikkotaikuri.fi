/**
 * Per-page OG card content.
 *
 * Every tagline here is copy that already exists on the site or in JP's own
 * sales emails — nothing is written fresh for the share cards. `accent` is the
 * trailing part of the tagline rendered in brass; it must be a suffix of
 * `tagline` or the split won't render.
 */
export type OgBackground = "studio" | "lava";

export type OgCard = {
  tagline: string;
  accent: string;
  background: OgBackground;
  alt: string;
};

export const ogCards = {
  // hero, components/home/Hero.tsx
  etusivu: {
    tagline: "Kaksi suuntaa, yksi kokonaisuus",
    accent: "yksi kokonaisuus",
    background: "studio",
    alt: "Koomikkotaikuri JP Pirinen — kaksi suuntaa, yksi kokonaisuus",
  },
  // recurs near-verbatim across six of JP's sales emails; singular "pelkäksi
  // katsojaksi" is the form used there, and matches "yleisö" being singular
  palvelut: {
    tagline: "Yleisö ei jää pelkäksi katsojaksi",
    accent: "pelkäksi katsojaksi",
    // the only card on the audience photo: this line is literally about them
    background: "lava",
    alt: "Koomikkotaikurin palvelut — yleisö ei jää pelkäksi katsojaksi",
  },
  // the page's own CtaBand
  asiakkaat: {
    tagline: "Seuraava suositus voi olla teidän",
    accent: "voi olla teidän",
    background: "studio",
    alt: "Koomikkotaikurin asiakkaat — seuraava suositus voi olla teidän",
  },
  // the page's own CtaBand
  jpPirinen: {
    tagline: "Kerro tilaisuudestasi. Loput hoidan minä.",
    accent: "Loput hoidan minä.",
    background: "studio",
    alt: "JP Pirinen — kerro tilaisuudestasi, loput hoidan minä",
  },
} as const satisfies Record<string, OgCard>;
