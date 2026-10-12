/* Teemasivut (laskeutumissivut tilaisuustyypeittäin). Footer listaa nämä
   "Tilaisuudet"-ryhmässä; sitemap antaa niille korkean prioriteetin. Uusi
   teemasivu (kick off, kesäjuhlat, gaala...) lisätään tähän listaan. */
export type Teemasivu = { label: string; href: string };

export const TEEMASIVUT: Teemasivu[] = [{ label: "Pikkujoulut", href: "/pikkujoulut" }];
