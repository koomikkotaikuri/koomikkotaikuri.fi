/* Tilted client-logo wall from the design ("Näytöt" / "Logoseinä" sections). */

type Logo = { src: string; alt: string; height: number; tilt: number };

export const clientLogos: Logo[] = [
  { src: "/images/logo-kouvola-cream.png", alt: "Kouvolan kaupunki", height: 22, tilt: -1.5 },
  { src: "/images/logo-ncc-cream.png", alt: "NCC", height: 40, tilt: 1.2 },
  { src: "/images/logo-tallink.png", alt: "Tallink Silja", height: 30, tilt: -2 },
  { src: "/images/logo-hoas-cream.png", alt: "HOAS", height: 44, tilt: 1.8 },
  { src: "/images/logo-viking-line.png", alt: "Viking Line", height: 28, tilt: -1 },
  { src: "/images/logo-sokos-hotels.png", alt: "Sokos Hotels", height: 26, tilt: 2 },
  { src: "/images/logo-nelonen.png", alt: "Nelonen Media", height: 56, tilt: -2.2 },
  { src: "/images/logo-orange.png", alt: "Orange Advertising", height: 30, tilt: 1 },
  { src: "/images/logo-veturi-kauppakeskus.png", alt: "Kauppakeskus Veturi", height: 44, tilt: -1.4 },
];

export function LogoWall({
  scale = 1,
  gap = "44px 64px",
  tail,
}: {
  scale?: number;
  gap?: string;
  tail?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap,
      }}
    >
      {clientLogos.map((logo) => (
        /* eslint-disable-next-line @next/next/no-img-element -- decorative logos with intrinsic-height sizing */
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          style={{
            height: logo.height * scale,
            width: "auto",
            objectFit: "contain",
            opacity: 0.8,
            transform: `rotate(${logo.tilt}deg)`,
          }}
        />
      ))}
      {tail}
    </div>
  );
}
