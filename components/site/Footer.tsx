import Image from "next/image";
import Link from "next/link";

export type FooterLink = { label: string; href: string };

const defaultLinks: FooterLink[] = [
  { label: "Palvelut", href: "/palvelut" },
  { label: "Asiakkaat", href: "/asiakkaat" },
  { label: "UKK", href: "/ukk" },
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px" }}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} className="kt-footer-link" style={{ borderBottom: "none" }}>
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
