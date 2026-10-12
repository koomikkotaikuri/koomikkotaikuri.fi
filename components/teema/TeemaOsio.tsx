import { Rule } from "@/components/ui/Rule";
import { sectionH2, lead } from "./tyylit";

/* Teemasivun osio: Rule-otsake, H2 (luonteva hakulause), johdanto ja sisältö. */
export function TeemaOsio({
  id,
  rule,
  ruleRight,
  title,
  intro,
  tumma = false,
  children,
}: {
  id?: string;
  rule: string;
  ruleRight?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tumma?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="kt-m-pad"
      style={{
        padding: "96px 48px",
        borderBottom: "1px solid var(--kt-viiva)",
        background: tumma ? "var(--kt-muste)" : "var(--kt-yo)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Rule left={rule} right={ruleRight} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "32px 0 48px 0" }}>
          <h2 style={sectionH2}>{title}</h2>
          {intro && <p style={lead}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
