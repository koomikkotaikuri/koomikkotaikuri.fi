"use client";

import { useState } from "react";
import type { UkkItem } from "@/lib/ukk";

export function Accordion({ items }: { items: UkkItem[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--kt-font-body)",
        borderTop: "1px solid var(--kt-viiva)",
      }}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} style={{ borderBottom: "1px solid var(--kt-viiva)" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "17px 2px",
                fontFamily: "var(--kt-font-body)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: isOpen ? "var(--kt-messinki)" : "var(--kt-valo)",
                textAlign: "left",
              }}
            >
              {item.title}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isOpen ? "var(--kt-messinki)" : "var(--kt-siniharmaa)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  flex: "none",
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform 260ms var(--kt-ease)",
                }}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 320ms var(--kt-ease)",
              }}
            >
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <div
                  style={{
                    padding: "0 2px 18px",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--kt-valo-himmea)",
                    maxWidth: 560,
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
