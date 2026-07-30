"use client";

import Image from "next/image";
import { scrollToId } from "@/lib/scrollTo";

const links = [
  { label: "Etusivu", href: "#", active: true },
  { label: "Palvelut", href: "#" },
  { label: "Asiakkaat", href: "#" },
  { label: "JP Pirinen", href: "#" },
];

export function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--kt-yo)",
        borderBottom: "1px solid var(--kt-viiva)",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
      }}
    >
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "var(--kt-valo)",
          borderBottom: "none",
        }}
      >
        <Image
          src="/images/logo-light.png"
          alt="Koomikkotaikuri JP Pirinen"
          width={40}
          height={40}
          style={{ height: 40, width: 40, objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "var(--kt-font-body)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--kt-valo)",
            marginRight: 24,
          }}
        >
          Koomikkotaikuri
        </span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`kt-nav-link${link.active ? " is-active" : ""}`}
            style={{ borderBottom: "none" }}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => scrollToId("kt-cta-band")}
          style={{
            fontFamily: "var(--kt-font-body)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            background: "var(--kt-messinki)",
            color: "var(--kt-yo)",
            border: "none",
            borderRadius: 2,
            padding: "10px 20px",
            cursor: "pointer",
            transition: "background var(--kt-duration-fast) var(--kt-ease)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--kt-messinki-syva)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--kt-messinki)";
          }}
        >
          Pyydä tarjous
        </button>
      </div>
    </nav>
  );
}
