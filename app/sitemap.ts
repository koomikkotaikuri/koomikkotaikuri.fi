import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";
import { TEEMASIVUT } from "@/lib/teemasivut";

const SIVUT: { polku: string; prioriteetti: number }[] = [
  { polku: "/", prioriteetti: 1 },
  { polku: "/palvelut", prioriteetti: 0.8 },
  { polku: "/asiakkaat", prioriteetti: 0.8 },
  { polku: "/jp-pirinen", prioriteetti: 0.8 },
  { polku: "/media", prioriteetti: 0.8 },
  { polku: "/ukk", prioriteetti: 0.8 },
  { polku: "/ehdot", prioriteetti: 0.8 },
  { polku: "/esittely-video-koomikkotaikuri-jp-pirinen", prioriteetti: 0.8 },
  /* Teemasivut ovat mainosten laskeutumissivuja ja hakusivuja: 0.9. */
  ...TEEMASIVUT.map((t) => ({ polku: t.href, prioriteetti: 0.9 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return SIVUT.map(({ polku, prioriteetti }) => ({
    url: polku === "/" ? SITE_URL : `${SITE_URL}${polku}`,
    changeFrequency: "monthly",
    priority: prioriteetti,
  }));
}
