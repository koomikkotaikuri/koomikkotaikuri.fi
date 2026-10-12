import { SITE_NAME, SITE_URL } from "./site-metadata";
import type { UkkItem } from "./ukk";

/* Service-tietue teemasivulle: tarjoaja JP Pirinen / Koomikkotaikuri,
   toimialue Suomi. */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: "fi",
    areaServed: { "@type": "Country", name: "Suomi" },
    audience: { "@type": "BusinessAudience", name: "Yritykset ja yhteisöt" },
    provider: {
      "@type": "Person",
      name: "JP Pirinen",
      alternateName: SITE_NAME,
      jobTitle: "Koomikkotaikuri",
      url: SITE_URL,
      email: "jp@koomikkotaikuri.fi",
    },
  };
}

/* FAQPage samoista kysymyksistä, jotka Accordion näyttää. */
export function faqJsonLd(items: UkkItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: { "@type": "Answer", text: item.content },
    })),
  };
}
