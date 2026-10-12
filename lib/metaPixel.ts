export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1091057302379873";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

declare global {
  interface Window {
    __ktMetaLadattu?: boolean;
  }
}

/* Pikseli ladataan vasta kun kävijä on hyväksynyt evästeet. Metan
   consent-API:a ei käytetä lainkaan: ennen hyväksyntää fbevents.js:ää ei
   edes haeta. Lippu estää tuplalatauksen. Noscript-kuvapikseli on jätetty
   pois, koska se ohittaisi suostumuksen. */
export function lataaMetaPikseli() {
  if (typeof window === "undefined" || window.__ktMetaLadattu) return;
  window.__ktMetaLadattu = true;

  if (!window.fbq) {
    const q: unknown[][] = [];
    /* Sama logiikka kuin Metan virallisessa stubissa: kun fbevents.js on
       latautunut se asettaa callMethodin, ja kutsut ohjataan sille. */
    const fbq = function (...args: unknown[]) {
      const cm = fbq.callMethod as ((...a: unknown[]) => void) | undefined;
      if (cm) cm.apply(fbq, args);
      else q.push(args);
    } as ((...args: unknown[]) => void) & Record<string, unknown>;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = q;
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

export function trackMeta(
  name: string,
  params?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, params, eventId ? { eventID: eventId } : undefined);
  }
}
