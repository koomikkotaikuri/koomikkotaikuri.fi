/* Palvelusivun osiot ja niiden ankkurit. Etusivun palvelukortit, vanhan
   sivuston uudelleenohjaukset (next.config.ts: /juontaja → #kt-p4) ja
   palveluvalikko käyttävät näitä tunnisteita, joten niitä ei vaihdeta. */
export const PALVELUT = [
  { id: "kt-p1", nimi: "Lavalla" },
  { id: "kt-p2", nimi: "Vieraiden joukossa" },
  { id: "kt-p3", nimi: "Täysihoito" },
  { id: "kt-p4", nimi: "Juontajana" },
  { id: "kt-p5", nimi: "Työpajat ja puheenvuorot" },
] as const;

export type PalveluId = (typeof PALVELUT)[number]["id"];
