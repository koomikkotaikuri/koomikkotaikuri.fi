import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Rule } from "@/components/ui/Rule";
import { SITE_NAME } from "@/lib/site-metadata";

/* Ei canonicalia eikä kuvausta: 404-sivua ei kuulu indeksoida, ja Next lisää
   404-vastaukseen itse robots noindex -tagin. */
export const metadata: Metadata = {
  title: `Sivua ei löytynyt — ${SITE_NAME}`,
};

const linkit = [
  { label: "Etusivulle", href: "/" },
  { label: "Palvelut", href: "/palvelut" },
  { label: "Usein kysyttyä", href: "/ukk" },
];

export default function NotFound() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />

      <section className="kt-m-pad-hero" style={{ padding: "152px 48px 120px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <Rule left="404" right="Sivua ei löytynyt" />
        <h1
          style={{
            margin: "32px 0 20px 0",
            fontSize: "clamp(40px, 5.4vw, 84px)",
            lineHeight: 1.25,
            maxWidth: 1000,
          }}
        >
          Sivua ei <span style={{ color: "var(--kt-messinki)" }}>löytynyt</span>
        </h1>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: "var(--kt-valo-himmea)", textWrap: "pretty" }}>
          Etsimääsi sivua ei ole, tai se on siirtynyt uuteen osoitteeseen. Näistä pääset eteenpäin.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 40 }}>
          {linkit.map((l, i) => (
            <Link key={l.href} href={l.href} className={i === 0 ? "kt-btn-primary" : "kt-btn-secondary"}>
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
