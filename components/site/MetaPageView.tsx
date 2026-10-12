"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackMeta } from "@/lib/metaPixel";

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
  return (
    <Suspense fallback={null}>
      <Seuraa />
    </Suspense>
  );
}
