import { Accordion } from "@/components/site/Accordion";
import type { UkkItem } from "@/lib/ukk";
import { TeemaOsio } from "./TeemaOsio";
import { bodyText } from "./tyylit";

/* Teemasivun UKK. Samat kysymykset syötetään FAQPage-JSON-LD:hen sivulla. */
export function TeemaUkk({
  rule,
  title,
  intro,
  items,
  alaviite,
}: {
  rule: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  items: UkkItem[];
  alaviite?: React.ReactNode;
}) {
  return (
    <TeemaOsio id="ukk" rule={rule} title={title} intro={intro}>
      <div style={{ maxWidth: 900 }}>
        <Accordion items={items} />
        {alaviite && <p style={{ ...bodyText, marginTop: 24, color: "var(--kt-siniharmaa)" }}>{alaviite}</p>}
      </div>
    </TeemaOsio>
  );
}
