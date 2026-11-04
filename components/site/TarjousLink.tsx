"use client";

import { openTarjous } from "@/lib/tarjous";

/* A "Pyydä tarjous" control usable from server components — opens the Tarjouslomake modal.
   `tyyppi` esivalitsee tilaisuuden tyypin (ks. lib/tarjous.ts). `cta` on
   painikkeen pysyvä tunniste seurantaa varten (ks. lib/alkupera.ts). */
export function TarjousLink({
  className,
  style,
  tyyppi,
  cta,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  tyyppi?: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#tarjous"
      onClick={(e) => {
        e.preventDefault();
        openTarjous({ lahde: "page_cta", cta }, tyyppi ? { tyyppi } : undefined);
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
