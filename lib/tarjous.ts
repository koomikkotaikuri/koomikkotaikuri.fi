/* All "Pyydä tarjous" controls open the Tarjouslomake modal via this event. */
export const TARJOUS_EVENT = "kt-open-tarjous";

export function openTarjous() {
  window.dispatchEvent(new CustomEvent(TARJOUS_EVENT));
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

export type TarjousTila = { ok: boolean; viesti?: string };
