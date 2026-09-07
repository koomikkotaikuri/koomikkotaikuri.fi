/**
 * Bakes the OG card background photos.
 *
 * Satori (which powers next/og) supports no CSS filters, so the darkening and
 * desaturation have to be baked into the file rather than applied at render
 * time. The gradient veil on top of these stays in lib/og/card.tsx, since
 * linear-gradient IS supported.
 *
 * Run by hand whenever the source photos or the crops change:
 *   node scripts/bake-og-backgrounds.mjs
 */
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'public/images')
const OUT = join(ROOT, 'assets/og')

const WIDTH = 1200
const HEIGHT = 630

const backgrounds = [
  {
    name: 'studio',
    src: join(SRC, 'muotokuva-studio-tumma-08-web-tarkistamaton.webp'),
    // Source is 2048x1455. Cropping only the left 1500px puts JP at ~68% across,
    // leaving the left third near-black for the wordmark.
    // top:270 raises him in frame so his eyes land at output y~105 — above the
    // first wordmark line, which starts at y=125.
    crop: { left: 0, top: 270, width: 1500, height: 787 },
    modulate: { brightness: 0.82, saturation: 0.55 },
  },
  {
    name: 'lava',
    src: join(SRC, 'lava-esitys-yleiso-01.webp'),
    // Source is 2400x1600. Full width keeps the audience silhouettes along the
    // bottom edge, which is the whole point of this one.
    crop: { left: 0, top: 250, width: 2400, height: 1260 },
    // Saturation crushed hard: the purple stage wash otherwise fights the brass.
    modulate: { brightness: 0.58, saturation: 0.16 },
    tint: { r: 150, g: 165, b: 200 },
  },
]

await mkdir(OUT, { recursive: true })

for (const bg of backgrounds) {
  let pipeline = sharp(bg.src)
    .extract(bg.crop)
    .resize(WIDTH, HEIGHT, { fit: 'cover' })
    .modulate(bg.modulate)

  if (bg.tint) pipeline = pipeline.tint(bg.tint)

  const out = join(OUT, `${bg.name}.jpg`)
  await pipeline.jpeg({ quality: 72, mozjpeg: true }).toFile(out)

  const { size } = await stat(out)
  console.log(`${bg.name}.jpg  ${(size / 1024).toFixed(1)} KB`)
}
