"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { lueSuostumus } from "@/lib/gtag";
import { lataaMetaPikseli, trackMeta } from "@/lib/metaPixel";

function Seuraa() {
  const polku = usePathname();
  const haku = useSearchParams().toString();
  const edellinen = useRef<string | null>(null);

  useEffect(() => {
    const avain = `${polku}?${haku}`;
    /* Ensimmäisen PageView'n lähettää alkuskripti, joten sitä ei lasketa tässä. */
    if (edellinen.current !== null && edellinen.current !== avain) {
      trackMeta("PageView");
    }
    edellinen.current = avain;
  }, [polku, haku]);

  return null;
}

export function MetaPageView() {
  /* Aiemmin hyväksynyt kävijä: pikseli latautuu ja lähettää ensimmäisen
     PageView'n heti. Uusi kävijä lataa sen vasta bannerista (asetaSuostumus). */
  useEffect(() => {
    if (lueSuostumus() === "granted") lataaMetaPikseli();
  }, []);

  return (
    <Suspense fallback={null}>
      <Seuraa />
    </Suspense>
  );
}
