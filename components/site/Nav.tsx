"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { openTarjous } from "@/lib/tarjous";

const links = [
  { label: "Etusivu", href: "/" },
  { label: "Palvelut", href: "/palvelut" },
  { label: "Asiakkaat", href: "/asiakkaat" },
];

const jpLinks = [
  { label: "Kuka on JP Pirinen", href: "/jp-pirinen" },
  { label: "Media", href: "/media" },
  { label: "UKK", href: "/ukk" },
];

export function Nav() {
  const pathname = usePathname();
  const [jpOpen, setJpOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const jpActive = pathname === "/jp-pirinen" || pathname === "/media" || pathname === "/ukk";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className="kt-nav"
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
      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
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
            whiteSpace: "nowrap",
          }}
        >
          Koomikkotaikuri
        </span>
      </Link>
      <div className="kt-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`kt-nav-link${pathname === link.href ? " is-active" : ""}`}
            style={{ borderBottom: "none" }}
          >
            {link.label}
          </Link>
        ))}
        <div
          style={{ position: "relative", paddingBottom: 20, marginBottom: -20 }}
          onMouseEnter={() => setJpOpen(true)}
          onMouseLeave={() => setJpOpen(false)}
        >
          <span
            className={`kt-nav-link${jpActive ? " is-active" : ""}`}
            style={{ cursor: "pointer", whiteSpace: "nowrap" }}
          >
            JP Pirinen
          </span>
          <div
            style={{
              position: "absolute",
              top: "calc(100% - 20px)",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 20,
              background: "var(--kt-paneeli)",
              border: "1px solid var(--kt-viiva)",
              minWidth: 220,
              opacity: jpOpen ? 1 : 0,
              pointerEvents: jpOpen ? "auto" : "none",
              transition: "opacity var(--kt-duration-fast) var(--kt-ease)",
              zIndex: 60,
            }}
          >
            {jpLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setJpOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 20px",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--kt-valo-himmea)",
                  whiteSpace: "nowrap",
                  borderTop: i > 0 ? "1px solid var(--kt-viiva)" : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--kt-messinki)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--kt-valo-himmea)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={openTarjous}
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

      {/* Mobile: burger + full-width dropdown */}
      <button
        className="kt-nav-burger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Sulje valikko" : "Avaa valikko"}
        aria-expanded={menuOpen}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 5,
          width: 44,
          height: 44,
          background: "transparent",
          border: "1px solid var(--kt-viiva)",
          borderRadius: 2,
          cursor: "pointer",
          padding: 0,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 18,
              height: 2,
              background: "var(--kt-valo)",
              transition: "transform 200ms var(--kt-ease), opacity 200ms var(--kt-ease)",
              transform: menuOpen
                ? i === 0
                  ? "translateY(7px) rotate(45deg)"
                  : i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 49,
            background: "var(--kt-yo)",
            borderTop: "1px solid var(--kt-viiva)",
            display: "flex",
            flexDirection: "column",
            padding: "12px 20px 32px 20px",
            overflowY: "auto",
          }}
        >
          {[...links, ...jpLinks].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`kt-nav-link${pathname === link.href ? " is-active" : ""}`}
              style={{
                borderBottom: "1px solid var(--kt-viiva)",
                padding: "18px 2px",
                fontSize: 13,
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              openTarjous();
            }}
            className="kt-btn-primary"
            style={{ marginTop: 28, width: "100%" }}
          >
            Pyydä tarjous
          </button>
        </div>
      )}
    </nav>
  );
}
