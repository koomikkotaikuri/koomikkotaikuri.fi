import type { Metadata } from "next";

export const SITE_NAME = "Koomikkotaikuri JP Pirinen";
export const SITE_URL = "https://www.koomikkotaikuri.fi";

/**
 * Next merges metadata *shallowly*: a page that defines `openGraph` at all
 * replaces the layout's whole `openGraph` object, dropping siteName, locale and
 * type. Same for `twitter` and its `card`. So every page builds its social
 * metadata through this helper rather than spelling out a partial object.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "fi_FI",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
    },
    twitter: {
      // without this X renders the small card even though an image is set
      card: "summary_large_image",
      title,
      description,
    },
  };
}
