"use client";

import { useEffect } from "react";

const CURVE = "var(--kt-ease)";

/* Promovideo avautuu lightboxiin. Iframe renderöidään vasta kun modaali on
   auki, jotta YouTube ei lataa mitään ennen kuin käyttäjä painaa nappia. */
export function VideoModal({
  open,
  onClose,
  videoId,
  title = "Promovideo",
}: {
  open: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(11,15,23,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        boxSizing: "border-box",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: `opacity 220ms ${CURVE}`,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "relative",
          width: "min(1100px, 100%)",
          transform: open ? "scale(1)" : "scale(0.96)",
          transition: `transform 260ms ${CURVE}`,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Sulje video"
          style={{
            position: "absolute",
            top: -44,
            right: 0,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            color: "var(--kt-valo)",
            border: "1px solid var(--kt-viiva)",
            borderRadius: 2,
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            transition: `border-color var(--kt-duration-fast) ${CURVE}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--kt-messinki)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--kt-viiva)";
          }}
        >
          ×
        </button>
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            width: "100%",
            maxHeight: "calc(100dvh - 120px)",
            background: "var(--kt-muste)",
            border: "1px solid var(--kt-viiva)",
            overflow: "hidden",
          }}
        >
          {open && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
