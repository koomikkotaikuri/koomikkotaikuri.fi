"use client";

import { openTarjous } from "@/lib/tarjous";

/* A "Pyydä tarjous" control usable from server components — opens the Tarjouslomake modal.
   `tyyppi` esivalitsee tilaisuuden tyypin (ks. lib/tarjous.ts). */
export function TarjousLink({
  className,
  style,
  tyyppi,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  tyyppi?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#tarjous"
      onClick={(e) => {
        e.preventDefault();
        openTarjous(tyyppi ? { tyyppi } : undefined);
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
