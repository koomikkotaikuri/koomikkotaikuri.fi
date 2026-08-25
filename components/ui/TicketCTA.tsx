"use client";

import { useState } from "react";
import { openTarjous } from "@/lib/tarjous";

export function TicketCTA({
  label = "Pyydä tarjous",
  note = "Vastaus nopeasti · Et pety!",
  onClick,
  width,
}: {
  label?: string;
  note?: string;
  onClick?: () => void;
  width?: string;
}) {
  const [hover, setHover] = useState(false);
  const brass = hover ? "var(--kt-action-primary-hover)" : "var(--kt-action-primary)";
  return (
    <button
      onClick={onClick ?? openTarjous}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "stretch",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        width: width || "auto",
        textAlign: "left",
        transition: "opacity var(--kt-duration-fast) var(--kt-ease)",
      }}
    >
      <span
        style={{
          flex: 1,
          background: brass,
          color: "var(--kt-text-on-accent)",
          padding: "18px 22px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6,
          transition: "background var(--kt-duration-fast) var(--kt-ease)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--kt-font-display)",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
        {note && (
          <span
            style={{
              fontFamily: "var(--kt-font-body)",
              fontWeight: 500,
              fontSize: 10,
              lineHeight: 1.3,
              letterSpacing: "var(--kt-tracking-label)",
              textTransform: "uppercase",
            }}
          >
            {note}
          </span>
        )}
      </span>
      <span
        aria-hidden
        style={{
          width: 24,
          flex: "none",
          background: `repeating-linear-gradient(${
            hover ? "var(--kt-messinki-syva)" : "var(--kt-messinki)"
          } 0 7px, var(--kt-surface-page) 7px 13px)`,
        }}
      />
    </button>
  );
}
