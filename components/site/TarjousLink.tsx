"use client";

import { openTarjous } from "@/lib/tarjous";

/* A "Pyydä tarjous" control usable from server components — opens the Tarjouslomake modal. */
export function TarjousLink({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#tarjous"
      onClick={(e) => {
        e.preventDefault();
        openTarjous();
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
