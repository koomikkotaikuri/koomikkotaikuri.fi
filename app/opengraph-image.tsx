import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/card";
import { ogCards } from "@/lib/og/config";

export const alt = ogCards.etusivu.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard(ogCards.etusivu);
}
