import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { OgBackground, OgCard } from "./config";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// brand tokens, mirrored from app/globals.css
const YO = "#131a26";
const MESSINKI = "#e3b23c";
const VALO = "#f2eada";
const SINIHARMAA = "#9aa7bc";

// Satori supports no CSS filters, so the darkening/desaturation is already
// baked into these files by scripts/bake-og-backgrounds.mjs. The veil below
// is a linear-gradient, which Satori does support.
const VEILS: Record<OgBackground, string> = {
  studio:
    "linear-gradient(100deg, rgba(19,26,38,.86) 0%, rgba(19,26,38,.76) 40%, rgba(19,26,38,.40) 72%, rgba(19,26,38,.24) 100%)",
  lava: "linear-gradient(170deg, rgba(19,26,38,.80) 0%, rgba(19,26,38,.74) 48%, rgba(11,15,22,.90) 100%)",
};

const asset = (...parts: string[]) => join(process.cwd(), "assets", ...parts);

/**
 * Splits the tagline into its cream head and brass accent tail. `accent` is
 * expected to be a suffix of `tagline`; if it isn't, the whole line renders
 * cream rather than silently dropping text.
 *
 * The head's trailing space becomes a non-breaking space: the two halves are
 * separate flex children, and Satori collapses a normal trailing space, which
 * would glue the words together ("SUUNTAA,YKSI").
 */
function splitTagline(tagline: string, accent: string) {
  const at = tagline.lastIndexOf(accent);
  if (at === -1) return { head: tagline, tail: "" };
  return {
    head: tagline.slice(0, at).replace(/\s+$/, " "),
    tail: tagline.slice(at),
  };
}

export async function renderOgCard(card: OgCard) {
  const [anton, plexMono, background] = await Promise.all([
    readFile(asset("fonts", "Anton-Regular.ttf")),
    readFile(asset("fonts", "IBMPlexMono-Medium.ttf")),
    readFile(asset("og", `${card.background}.jpg`)),
  ]);

  const { head, tail } = splitTagline(card.tagline, card.accent);
  const photo = `data:image/jpeg;base64,${background.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 72px",
          backgroundColor: YO,
          position: "relative",
        }}
      >
        {/* Satori renders a raster, not a DOM: next/image does not work here and
            alt text would go nowhere. The card's own alt lives in config.ts. */}
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={photo}
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        {/* Satori does not expand the `inset` shorthand — the veil has to state
            its own box or it collapses to zero size and never darkens anything */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: OG_SIZE.width,
            height: OG_SIZE.height,
            background: VEILS[card.background],
          }}
        />

        {/* wordmark — 150px Anton measures 966px wide against 1056px of room */}
        <div
          style={{
            display: "flex",
            fontFamily: "Anton",
            fontSize: 150,
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            color: VALO,
          }}
        >
          <span>KOOMIKKO</span>
          <span style={{ color: MESSINKI }}>TAIKURI</span>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Anton",
            fontSize: 150,
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            color: VALO,
          }}
        >
          <span style={{ color: MESSINKI }}>TAIKURI</span>
          <span>KOOMIKKO</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontFamily: "Anton",
            fontSize: 44,
            lineHeight: 1.06,
            color: VALO,
          }}
        >
          <span>{head.toUpperCase()}</span>
          <span style={{ color: MESSINKI }}>{tail.toUpperCase()}</span>
        </div>

        <div
          style={{
            position: "absolute",
            left: 72,
            right: 72,
            bottom: 52,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "IBMPlexMono",
            fontSize: 21,
          }}
        >
          <span style={{ letterSpacing: "0.2em", color: SINIHARMAA }}>
            28+ VUOTTA LAVALLA · 1500+ TAPAHTUMAA
          </span>
          <span style={{ letterSpacing: "0.14em", color: MESSINKI }}>koomikkotaikuri.fi</span>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 6,
            backgroundColor: MESSINKI,
          }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "IBMPlexMono", data: plexMono, style: "normal", weight: 500 },
      ],
    },
  );
}
