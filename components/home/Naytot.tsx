import { Rule } from "@/components/ui/Rule";
import { Stat } from "@/components/ui/Stat";
import { Testimonial } from "@/components/ui/Testimonial";
import { LogoWall } from "@/components/site/LogoWall";

const stats = [
  { value: "28+", label: "vuotta lavalla" },
  { value: "1500+", label: "tapahtumaa" },
];

const testimonials = [
  { quote: "JP Pirinen taikoo v*ttu oikeesti.", name: "Kimmo Laiho aka Elastinen" },
  { quote: 'Mitähän helv***tiä just tapahtui? Eihän toi oo mahdollista', name: 'Jari "Jaajo" Linnonmaa' },
  {
    quote: "Olit aivan mieletön. Jos joskus sai nauraa, niin nyt.",
    name: "Päivi Tick",
    org: "Myyntisihteeri, NCC Rakennus Oy",
  },
  {
    quote: "Interaktiot yleisön kanssa ovat komiikkasi helmi.",
    name: "Tomi Karvinen",
    org: "Toimistosihteeri, Hämeen Kauppakamari",
  },
];

export function Naytot() {
  return (
    <section
      className="kt-m-pad"
      style={{
        background: "var(--kt-muste)",
        borderTop: "1px solid var(--kt-viiva)",
        borderBottom: "1px solid var(--kt-viiva)",
        padding: "96px 48px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="NÄYTÖT" right="Poimintoja 28 vuoden varrelta" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            margin: "56px 0 72px 0",
          }}
        >
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} size="lg" />
          ))}
        </div>

        <div
          className="kt-m-stack"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px 48px",
            marginBottom: 72,
          }}
        >
          {testimonials.map((t) => (
            <Testimonial key={t.name} quote={t.quote} name={t.name} org={"org" in t ? t.org : undefined} />
          ))}
        </div>

        <div style={{ padding: "8px 0 12px 0", marginBottom: 48 }}>
          <LogoWall
            tail={
              <span
                style={{
                  fontFamily: "var(--kt-font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--kt-siniharmaa)",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                ja 1500+
                <br />
                muuta tilaisuutta
              </span>
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "12px 20px",
            borderTop: "1px solid var(--kt-viiva)",
            paddingTop: 24,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--kt-messinki)",
            }}
          >
            Nähty TV:ssä
          </span>
          <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 13, color: "var(--kt-siniharmaa)" }}>
            Neljän tähden illallinen · Krissen kotibileet · Kaikki vastaan yksi · LEGO Masters Suomi
          </span>
        </div>
      </div>
    </section>
  );
}
