"use client";

import { useState } from "react";
import Image from "next/image";

/* Sivulle upotettu video. Näytetään ensin oma kansikuva ja iframe ladataan
   vasta klikkauksesta, jotta YouTube ei lataa mitään ennen kuin kävijä
   haluaa katsoa. */
export function VideoUpotus({
  videoId,
  title,
  poster = "/images/lava-esitys-yleiso-01.webp",
}: {
  videoId: string;
  title: string;
  poster?: string;
}) {
  const [toistetaan, setToistetaan] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        width: "100%",
        background: "var(--kt-muste)",
        border: "1px solid var(--kt-viiva)",
        overflow: "hidden",
      }}
    >
      {toistetaan ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setToistetaan(true)}
          aria-label={`Toista video: ${title}`}
          className="kt-video-kansi"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: 0, border: "none", background: "none", cursor: "pointer" }}
        >
          <Image src={poster} alt="" fill sizes="(max-width: 1280px) 100vw, 1184px" style={{ objectFit: "cover" }} />
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(19,26,38,0.15) 0%, rgba(11,15,22,0.7) 100%)",
            }}
          />
          <span
            aria-hidden
            className="kt-video-play"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "var(--kt-messinki)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 40px rgba(11,15,22,0.6)",
              transition: "background var(--kt-duration-fast) var(--kt-ease)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--kt-yo)" style={{ marginLeft: 4 }}>
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
