import { TeemaOsio } from "./TeemaOsio";
import { bodyText, panel } from "./tyylit";

export type Askel = { title: string; text: string };

/* "Näin se etenee": numeroidut askeleet, sama kortti kuin /palvelut-sivulla. */
export function Askeleet({
  rule,
  title,
  askeleet,
}: {
  rule: string;
  title: React.ReactNode;
  askeleet: Askel[];
}) {
  return (
    <TeemaOsio rule={rule} ruleRight={`${askeleet.length} askelta`} title={title} tumma>
      <ol
        className="kt-m-stack"
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: `repeat(${askeleet.length}, 1fr)`,
          gap: 24,
        }}
      >
        {askeleet.map((askel, i) => (
          <li key={askel.title} style={{ ...panel, gap: 12 }}>
            <div style={{ fontFamily: "var(--kt-font-mono)", fontSize: 34, color: "var(--kt-messinki)", lineHeight: 1 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{ margin: "8px 0 0 0", fontSize: 26, lineHeight: 1.25 }}>{askel.title}</h3>
            <p style={bodyText}>{askel.text}</p>
          </li>
        ))}
      </ol>
    </TeemaOsio>
  );
}
