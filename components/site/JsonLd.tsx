/* Rakenteinen data hakukoneille (schema.org). Renderöidään <script>-tagina
   sivun sisällä, ks. node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
   "<" korvataan, jotta sisältöön päätynyt tagi ei pääse HTML:ään. */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
