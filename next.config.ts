import type { NextConfig } from "next";

/* Vanhan Squarespace-sivuston osoitteet → uudet sivut. */
const VANHAT_OSOITTEET: [string, string][] = [
  ["/tilaisuudet", "/palvelut"],
  ["/juontaja", "/palvelut#kt-p4"],
  ["/referenssit", "/asiakkaat"],
  ["/yhteystiedot", "/media#yhteystiedot"],
  ["/ota-yhteytta", "/#tarjous"],
  ["/tarjouspyynto", "/#tarjous"],
  ["/faq", "/ukk"],
  ["/livestream", "/media"],
  ["/koomikkotaikuri-laskutus-peruutus", "/ehdot"],
  ["/kiitos", "/"],
  ["/koomikkotaikuri-tilaisuudet", "/palvelut"],
  ["/faq-jp-pirinen", "/ukk"],
];

const nextConfig: NextConfig = {
  async redirects() {
    /* Kauttaviivaan päättyvät muodot (/faq/) Next ohjaa ensin ilman
       kauttaviivaa (308), jonka jälkeen nämä säännöt osuvat. */
    return VANHAT_OSOITTEET.map(([vanha, uusi]) => ({
      source: vanha,
      destination: uusi,
      statusCode: 301 as const,
    }));
  },
};

export default nextConfig;
