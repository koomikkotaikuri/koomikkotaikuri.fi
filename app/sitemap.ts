import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";

const SIVUT = [
  "/",
  "/palvelut",
  "/asiakkaat",
  "/jp-pirinen",
  "/media",
  "/ukk",
  "/ehdot",
  "/esittely-video-koomikkotaikuri-jp-pirinen",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return SIVUT.map((polku) => ({
    url: polku === "/" ? SITE_URL : `${SITE_URL}${polku}`,
    changeFrequency: "monthly",
    priority: polku === "/" ? 1 : 0.8,
  }));
}
