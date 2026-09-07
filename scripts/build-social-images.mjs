/**
 * Builds the social images that are posted by hand: Instagram cards (4:5) and
 * the Facebook cover. These are not routes — nothing on the site serves them —
 * so they are rendered here into assets/social/ and uploaded manually.
 *
 * Taglines come from lib/og/config.ts so the wording cannot drift away from the
 * share cards. Same fonts, same colours, same baked-photo approach.
 *
 *   node scripts/build-social-images.mjs
 */
import sharp from 'sharp'
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = process.cwd()
const OUT = join(ROOT, 'assets/social')
const PHOTO = join(ROOT, 'public/images/muotokuva-studio-tumma-08-web-tarkistamaton.webp')

const YO = '#131a26'
const MESSINKI = '#e3b23c'
const VALO = '#f2eada'
const SINIHARMAA = '#9aa7bc'

const { ogCards } = await import('../lib/og/config.ts')

const anton = await readFile(join(ROOT, 'assets/fonts/Anton-Regular.ttf'))
const plexMono = await readFile(join(ROOT, 'assets/fonts/IBMPlexMono-Medium.ttf'))
const fonts = [
  { name: 'Anton', data: anton, style: 'normal', weight: 400 },
  { name: 'IBMPlexMono', data: plexMono, style: 'normal', weight: 500 },
]

/** Minimal React-element factory — satori takes the element shape, not JSX. */
const h = (type, props = {}, ...kids) => ({
  type,
  key: null,
  props: { ...props, ...(kids.length ? { children: kids.length === 1 ? kids[0] : kids } : {}) },
})

/** Same trick as the share cards: bake the darkening in, Satori has no filters. */
async function bakedPhoto({ crop, width, height, brightness, saturation }) {
  const buf = await sharp(PHOTO)
    .extract(crop)
    .resize(width, height, { fit: 'cover' })
    .modulate({ brightness, saturation })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer()
  return `data:image/jpeg;base64,${buf.toString('base64')}`
}

function splitTagline(tagline, accent) {
  const at = tagline.lastIndexOf(accent)
  if (at === -1) return { head: tagline, tail: '' }
  // non-breaking space: satori eats a trailing space between flex children
  return { head: tagline.slice(0, at).replace(/\s+$/, ' '), tail: tagline.slice(at) }
}

async function write(name, element, width, height) {
  const res = new ImageResponse(element, { width, height, fonts })
  await writeFile(join(OUT, name), Buffer.from(await res.arrayBuffer()))
  console.log(`${name}  ${width}x${height}`)
}

const wordmark = (size) => [
  h('div', { style: { display: 'flex', fontFamily: 'Anton', fontSize: size, lineHeight: 1.02, letterSpacing: '-0.01em', color: VALO } },
    h('span', {}, 'KOOMIKKO'),
    h('span', { style: { color: MESSINKI } }, 'TAIKURI')),
  h('div', { style: { display: 'flex', fontFamily: 'Anton', fontSize: size, lineHeight: 1.02, letterSpacing: '-0.01em', color: VALO } },
    h('span', { style: { color: MESSINKI } }, 'TAIKURI'),
    h('span', {}, 'KOOMIKKO')),
]

const brassBar = (width) =>
  h('div', { style: { position: 'absolute', left: 0, bottom: 0, width, height: 8, backgroundColor: MESSINKI } })

// ---------------------------------------------------------------- Instagram
// 1080x1350. Face sits in the upper third and stays clear; the text block is
// anchored to the bottom, over the calmer area of the jacket.
const IG = { w: 1080, h: 1350 }

// source is 2048x1455; full height at 4:5 needs 1164px of width, centred on him
const igPhoto = await bakedPhoto({
  crop: { left: 442, top: 0, width: 1164, height: 1455 },
  width: IG.w, height: IG.h, brightness: 0.86, saturation: 0.6,
})

async function instagram(key) {
  const card = ogCards[key]
  const { head, tail } = splitTagline(card.tagline, card.accent)

  await write(`ig-${key}.png`,
    h('div', { style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: YO, padding: '0 64px 76px 64px', position: 'relative' } },
      h('img', { src: igPhoto, width: IG.w, height: IG.h, style: { position: 'absolute', top: 0, left: 0 } }),
      h('div', { style: { position: 'absolute', top: 0, left: 0, width: IG.w, height: IG.h, background: `linear-gradient(180deg, rgba(19,26,38,.20) 0%, rgba(19,26,38,.42) 40%, rgba(19,26,38,.92) 66%, rgba(19,26,38,.97) 100%)` } }),
      h('div', { style: { display: 'flex', flexDirection: 'column', position: 'relative' } },
        ...wordmark(140),
        h('div', { style: { display: 'flex', marginTop: 22, fontFamily: 'Anton', fontSize: 40, lineHeight: 1.06, color: VALO } },
          h('span', {}, head.toUpperCase()),
          h('span', { style: { color: MESSINKI } }, tail.toUpperCase())),
        h('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 34, fontFamily: 'IBMPlexMono', fontSize: 19 } },
          h('span', { style: { letterSpacing: '0.18em', color: SINIHARMAA } }, '28+ VUOTTA LAVALLA · 1500+ TAPAHTUMAA'),
          h('span', { style: { letterSpacing: '0.12em', color: MESSINKI } }, 'koomikkotaikuri.fi'))),
      brassBar(IG.w)),
    IG.w, IG.h)
}

for (const key of Object.keys(ogCards)) await instagram(key)

// ----------------------------------------------------------- Facebook cover
// 1640x624 (2x of Facebook's 820x312).
//
// Two constraints fight each other here. The wordmark must not sit on JP's
// face — the whole point of the refresh is that people can see who actually
// turns up — so he goes right and the text goes left. But Facebook crops the
// sides on mobile (roughly the middle 78%), so the text cannot hug the left
// edge either. Hence the 190px inset and the smaller wordmark.
const FB = { w: 1640, h: 624 }

const fbPhoto = await bakedPhoto({
  // a 1400px-wide window off the left of the 2048px source puts him at ~73%
  // across instead of dead centre; slight upscale to 1640 is fine from this source
  crop: { left: 0, top: 150, width: 1400, height: 532 },
  width: FB.w, height: FB.h, brightness: 0.9, saturation: 0.62,
})

await mkdir(OUT, { recursive: true })
await write('fb-kansikuva.png',
  h('div', { style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: YO, position: 'relative', paddingLeft: 190 } },
    h('img', { src: fbPhoto, width: FB.w, height: FB.h, style: { position: 'absolute', top: 0, left: 0 } }),
    // heavier on the left where the type sits, lighter over him on the right
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: FB.w, height: FB.h, background: 'linear-gradient(90deg, rgba(19,26,38,.93) 0%, rgba(19,26,38,.88) 42%, rgba(19,26,38,.50) 72%, rgba(19,26,38,.38) 100%)' } }),
    h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' } },
      ...wordmark(112),
      h('div', { style: { display: 'flex', marginTop: 18, fontFamily: 'IBMPlexMono', fontSize: 19, letterSpacing: '0.22em', color: SINIHARMAA } },
        h('span', {}, 'STAND UP · TAIKUUS · YRITYSTILAISUUDET'))),
    brassBar(FB.w)),
  FB.w, FB.h)
