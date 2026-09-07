import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/card";
import { ogCards } from "@/lib/og/config";

// /ukk has no card of its own, but it does set openGraph for its title — and a
// page that sets openGraph replaces the layout's, image included. So it has to
// re-declare the front page card rather than inherit it.
export const alt = ogCards.etusivu.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard(ogCards.etusivu);
}
