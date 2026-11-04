import { lataaMetaPikseli } from "@/lib/metaPixel";
import { TUOTANTOHOST, lokitaEstetty, seurantaSallittu } from "@/lib/seuranta";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-1ZWV0T429H";

/* Evästevalinta tallennetaan tähän localStorage-avaimeen: "granted" tai "denied". */
export const SUOSTUMUS_AVAIN = "kt-evasteet";

/* Footerin "Evästeasetukset" avaa bannerin uudelleen tällä eventillä. */
export const EVASTEET_EVENT = "kt-open-evasteet";

/* Laukeaa kun valinta tallennetaan; storage-event ei laukea samassa välilehdessä. */
export const SUOSTUMUS_MUUTTUI_EVENT = "kt-evasteet-muuttui";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/* Consent Mode v2: kaikki kielletty kunnes kävijä hyväksyy. Ajetaan
   inline-skriptinä ennen gtag.js:n latausta. Jos suostumus on annettu jo
   aiemmin, update ajetaan heti samassa skriptissä, jotta jo ensimmäinen
   sivunkatselu lähtee evästeiden kanssa. Muualla kuin tuotantohostilla
   (ks. lib/seuranta.ts) skripti ei tee mitään eikä gtag.js:ää ladata. */
export const GTAG_ALKU = `
if (location.hostname === ${JSON.stringify(TUOTANTOHOST)}) {
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(){dataLayer.push(arguments);};
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', wait_for_update: 500
});
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
try {
  if (localStorage.getItem('${SUOSTUMUS_AVAIN}') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GA_ID}');
var gtagJs = document.createElement('script');
gtagJs.async = true;
gtagJs.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
document.head.appendChild(gtagJs);
}
`;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (seurantaSallittu() && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  } else {
    lokitaEstetty("GA4", name, params);
  }
}

export function asetaSuostumus(hyvaksytty: boolean) {
  const arvo = hyvaksytty ? "granted" : "denied";
  try {
    localStorage.setItem(SUOSTUMUS_AVAIN, arvo);
  } catch {}
  window.dispatchEvent(new CustomEvent(SUOSTUMUS_MUUTTUI_EVENT));
  window.gtag?.("consent", "update", {
    ad_storage: arvo,
    ad_user_data: arvo,
    ad_personalization: arvo,
    analytics_storage: arvo,
  });
  if (hyvaksytty) lataaMetaPikseli();
}

export function lueSuostumus(): string | null {
  try {
    return localStorage.getItem(SUOSTUMUS_AVAIN);
  } catch {
    return null;
  }
}

export function avaaEvasteasetukset() {
  window.dispatchEvent(new CustomEvent(EVASTEET_EVENT));
}
