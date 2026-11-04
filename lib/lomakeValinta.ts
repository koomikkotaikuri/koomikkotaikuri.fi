import { useEffect, type RefObject } from "react";

/* React nollaa <form action={...}> -lomakkeen DOM:n jokaisen actionin
   jälkeen (form.reset()). Kontrolloitu <select> ei palaa React-tilaan,
   koska tila ei muuttunut, joten valikko näyttäisi ensimmäisen valittavan
   vaihtoehdon (esim. "Pikkujoulut"), vaikka lähetettävä arvo on tyhjä.
   Palautetaan näkyvä valinta tilasta aina, kun action on palannut.
   Regressiotesti: tests/tyyppivalikko.test.mts. */
export function useValintaSailyy(
  ref: RefObject<HTMLSelectElement | null>,
  arvo: string,
  actionTila: unknown,
) {
  useEffect(() => {
    if (ref.current && ref.current.value !== arvo) ref.current.value = arvo;
  }, [ref, arvo, actionTila]);
}
