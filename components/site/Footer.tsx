import Image from "next/image";
import Link from "next/link";
import { EvasteasetuksetLinkki } from "@/components/site/EvasteasetuksetLinkki";
import { TEEMASIVUT } from "@/lib/teemasivut";

export type FooterLink = { label: string; href: string };

const defaultLinks: FooterLink[] = [
  { label: "Palvelut", href: "/palvelut" },
  { label: "Asiakkaat", href: "/asiakkaat" },
  { label: "UKK", href: "/ukk" },
  { label: "Ehdot", href: "/ehdot" },
  { label: "Yhteystiedot", href: "/media#yhteystiedot" },
];

export function Footer({ links = defaultLinks }: { links?: FooterLink[] }) {
  return (
    <footer
      className="kt-m-pad-x"
      style={{
        background: "var(--kt-muste)",
        borderTop: "1px solid var(--kt-viiva)",
        padding: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Image
          src="/images/logo-light.png"
          alt="Koomikkotaikuri JP Pirinen"
          width={36}
          height={36}
          style={{ height: 36, width: 36, objectFit: "contain" }}
        />
        <span style={{ fontFamily: "var(--kt-font-mono)", fontSize: 12, color: "var(--kt-siniharmaa)" }}>
          © 2026 Koomikkotaikuri JP Pirinen
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px" }}>
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="kt-footer-link" style={{ borderBottom: "none" }}>
              {link.label}
            </Link>
          ))}
          <EvasteasetuksetLinkki />
        </div>
        {/* Teemasivut (lib/teemasivut.ts): ei päävalikossa, mutta linkitetty joka sivulta. */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px 20px" }}>
          <span
            style={{
              fontFamily: "var(--kt-font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--kt-messinki)",
            }}
          >
            Tilaisuudet
          </span>
          {TEEMASIVUT.map((sivu) => (
            <Link key={sivu.href} href={sivu.href} className="kt-footer-link" style={{ borderBottom: "none" }}>
              {sivu.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
