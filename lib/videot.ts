/* YouTube-videot. Etusivun promo ja /esittely-video-koomikkotaikuri-jp-pirinen
   lukevat täältä; uudet videot lisätään VIDEOT-listaan. */
export const PROMO_VIDEO_ID = "dQCFbs_GC38";

export type Video = { id: string; otsikko: string; kuvaus?: string };

export const VIDEOT: Video[] = [
  { id: PROMO_VIDEO_ID, otsikko: "Koomikkotaikuri JP Pirinen – esittelyvideo" },
];
