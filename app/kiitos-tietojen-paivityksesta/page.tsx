import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kiitos | Koomikkotaikuri JP Pirinen",
  robots: { index: false, follow: false },
};

export default function KiitosPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--kt-yo)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        gap: 32,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 220,
          aspectRatio: "1601 / 2400",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--kt-viiva)",
        }}
      >
        <Image
          src="/images/casual-taikuri-01-vari.webp"
          alt="JP Pirinen"
          width={1601}
          height={2400}
          priority
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 8 }}>
        <p
          style={{
            fontFamily: "var(--kt-font-body)",
            fontSize: "var(--kt-text-md)",
            color: "var(--kt-text-heading)",
            lineHeight: "var(--kt-leading-snug)",
          }}
        >
          Kiitokset, tämä tieto on rekisteröity, seuraa sähköpostiasi.
        </p>
        <p
          style={{
            fontFamily: "var(--kt-font-display)",
            fontSize: "var(--kt-text-lg)",
            color: "var(--kt-text-accent)",
            marginTop: 8,
          }}
        >
          JP Pirinen
        </p>
      </div>
    </div>
  );
}
