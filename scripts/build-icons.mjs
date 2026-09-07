/**
 * Builds the site icons from the JP monogram.
 *
 * The full logo has circular lettering that turns to noise below ~64px, so the
 * icons use only the monogram inside the ring. The art is dark ink on
 * transparency, which would vanish on a dark browser tab, so it is recoloured
 * to cream and set on the brand navy.
 *
 * Run by hand when the logo changes:
 *   node scripts/build-icons.mjs
 */
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'public/images/logo.png')

const NAVY = { r: 0x13, g: 0x1a, b: 0x26 }
const CREAM = { r: 0xf2, g: 0xea, b: 0xda }

// the JP ligature inside the wavy ring; source is 445x443
const MONOGRAM = { left: 97, top: 88, width: 250, height: 252 }

/** Recolour the dark logo art to cream by reusing its alpha as a mask. */
async function toCream(input) {
  const img = sharp(input).ensureAlpha()
  const { width, height } = await img.metadata()
  const alpha = await img.clone().extractChannel('alpha').toBuffer()
  return sharp({ create: { width, height, channels: 3, background: CREAM } })
    .joinChannel(alpha)
    .png()
    .toBuffer()
}

async function master() {
  const cropped = await sharp(SRC).extract(MONOGRAM).toBuffer()
  const art = await toCream(cropped)
  const inner = Math.round(512 * 0.72)
  const fitted = await sharp(art)
    .resize(inner, inner, { fit: 'contain', background: { ...NAVY, alpha: 0 } })
    .toBuffer()

  return sharp({ create: { width: 512, height: 512, channels: 4, background: { ...NAVY, alpha: 1 } } })
    .composite([{ input: fitted, gravity: 'center' }])
    .png()
    .toBuffer()
}

/**
 * Packs PNGs into an ICO. The format allows PNG-compressed entries, so no
 * BMP encoding is needed and no extra dependency either.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(pngs.length, 4)

  let offset = 6 + pngs.length * 16
  const entries = []
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // 0 means 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2) // palette size
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // colour planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    offset += data.length
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

const base = await master()

// Next picks these up by file convention and emits the link tags itself
await writeFile(join(ROOT, 'app/icon.png'), base)
await writeFile(
  join(ROOT, 'app/apple-icon.png'),
  await sharp(base).resize(180, 180).png().toBuffer(),
)

// /favicon.ico is still requested directly by some clients
const sizes = [16, 32, 48]
const pngs = await Promise.all(
  sizes.map(async (size) => ({ size, data: await sharp(base).resize(size, size).png().toBuffer() })),
)
await writeFile(join(ROOT, 'app/favicon.ico'), buildIco(pngs))

console.log('app/icon.png 512, app/apple-icon.png 180, app/favicon.ico 16/32/48')
