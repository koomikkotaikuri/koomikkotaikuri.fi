export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1091057302379873";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/* Metan tavallinen fbq-stub + fbevents.js. Suostumus revokataan ennen initiä,
   joten mitään ei lähde ennen kuin kävijä on hyväksynyt evästeet; jo annettu
   suostumus luetaan localStoragesta heti. Avain on sama kuin SUOSTUMUS_AVAIN
   (lib/gtag.ts), kirjoitettu tähän auki, ettei moduulien välille synny
   kehäriippuvuutta. Noscript-kuvapikseli jätetty pois, koska se ohittaisi
   suostumuksen. */
export const FBQ_ALKU = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('consent', 'revoke');
try {
  if (localStorage.getItem('kt-evasteet') === 'granted') fbq('consent', 'grant');
} catch (e) {}
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`;

export function trackMeta(
  name: string,
  params?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, params, eventId ? { eventID: eventId } : undefined);
  }
}

export function metaSuostumus(hyvaksytty: boolean) {
  if (typeof window !== "undefined") {
    window.fbq?.("consent", hyvaksytty ? "grant" : "revoke");
  }
}
