import type { Metadata } from "next";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import { Tarjouslomake } from "@/components/site/Tarjouslomake";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/site-metadata";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // www is the canonical host; without metadataBase the generated card URLs
  // stay relative and the build fails
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: SITE_NAME,
    description:
      "Stand up, taikuutta ja juontoa yritystilaisuuksiin. 28+ vuotta lavalla, 1500+ tapahtumaa.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fi"
      className={`${anton.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
        <Tarjouslomake />
      </body>
    </html>
  );
}
