/* All "Pyydä tarjous" controls open the Tarjouslomake modal via this event. */
export const TARJOUS_EVENT = "kt-open-tarjous";

/* Esivalinta: teemasivu (esim. /pikkujoulut) voi avata lomakkeen niin, että
   tilaisuuden tyyppi on valmiiksi valittu. Välitetään CustomEventin
   detailissa; Tarjouslomake asettaa tyyppi-kentän tällä arvolla. */
export type TarjousEsivalinta = { tyyppi?: string };

/* Sivukohtainen oletus (ks. components/teema/TarjousOletus.tsx): myös
   sivupalkin "Yhteys"-liuska ja mobiilin alapalkki avaavat lomakkeen
   esivalinnalla, vaikka ne eivät tiedä millä sivulla ollaan. */
let oletus: TarjousEsivalinta | null = null;

export function asetaTarjousOletus(esivalinta: TarjousEsivalinta | null) {
  oletus = esivalinta;
}

export function openTarjous(esivalinta?: TarjousEsivalinta) {
  const detail: TarjousEsivalinta = { ...oletus, ...esivalinta };
  window.dispatchEvent(new CustomEvent<TarjousEsivalinta>(TARJOUS_EVENT, { detail }));
}

/* Tilaisuustyypit. Lomake renderöi nämä valikkoon ja Server Action
   tarkistaa lähetetyn arvon tätä listaa vasten. */
export const TYYPIT = [
  "Pikkujoulut",
  "Tuotelanseeraus",
  "Messut",
  "Henkilöstöjuhla",
  "Häät tai synttärit",
  "Muu",
];

/* botti: hunajapurkki laukesi. Kiitos näytetään silti, mutta konversiota
   ei kirjata. */
export type TarjousTila = { ok: boolean; viesti?: string; botti?: boolean };
