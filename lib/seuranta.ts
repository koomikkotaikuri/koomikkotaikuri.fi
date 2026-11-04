/* GA4 ja Meta-pikseli toimivat vain tuotantohostilla. localhost, Vercelin
   previewt ja tuotantodeploymentin omat *.vercel.app-osoitteet eivät lataa
   seurantaa eivätkä lähetä mitään tuotannon GA4-propertyyn tai pikseliin.
   Apex (koomikkotaikuri.fi) ohjataan 308:lla www:hen, joten sitä ei
   tarvitse sallia. Sama tarkistus on myös lib/gtag.ts:n GTAG_ALKU-skriptissä,
   joka ajetaan ennen Reactia; se käyttää tätä samaa vakiota. */
export const TUOTANTOHOST = "www.koomikkotaikuri.fi";

export function onTuotantohost(host: string): boolean {
  return host === TUOTANTOHOST;
}

export function seurantaSallittu(): boolean {
  return typeof window !== "undefined" && onTuotantohost(window.location.hostname);
}

/* Testausta varten: muualla kuin tuotannossa tapahtumat voi tulostaa
   konsoliin lähettämättä mitään. Kytketään päälle käsin selaimen
   konsolista: localStorage.setItem("kt-seuranta-loki", "1").
   Tuotannossa ei koskaan tulosteta mitään. */
export const LOKI_AVAIN = "kt-seuranta-loki";

export function lokitaEstetty(kohde: string, ...args: unknown[]) {
  if (typeof window === "undefined" || onTuotantohost(window.location.hostname)) return;
  try {
    if (window.localStorage?.getItem(LOKI_AVAIN) !== "1") return;
  } catch {
    return;
  }
  console.info(`[seuranta: ${kohde} – ei lähetetty]`, ...args);
}
