import Image from "next/image";

const links = ["Tapahtumaopas", "UKK", "Yhteystiedot", "Tietosuoja"];

export function Footer() {
  return (
    <footer
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
      <div style={{ display: "flex", gap: 28 }}>
        {links.map((label) => (
          <a key={label} href="#" className="kt-footer-link" style={{ borderBottom: "none" }}>
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
