"use client";

import { useEffect } from "react";
import { asetaTarjousOletus } from "@/lib/tarjous";

/* Asettaa sivukohtaisen esivalinnan tarjouslomakkeelle: myös globaalit
   avauspainikkeet (sivupalkin liuska, mobiilin alapalkki, #tarjous-hash)
   avaavat lomakkeen tämän sivun tilaisuustyypillä. Nollataan kun sivulta
   poistutaan. */
export function TarjousOletus({ tyyppi }: { tyyppi: string }) {
  useEffect(() => {
    asetaTarjousOletus({ tyyppi });
    return () => asetaTarjousOletus(null);
  }, [tyyppi]);
  return null;
}
