import type { Metadata } from "next";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import { Tarjouslomake } from "@/components/site/Tarjouslomake";
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
  title: "Koomikkotaikuri JP Pirinen",
  description:
    "Stand up, taikuutta ja juontoa yritystilaisuuksiin. 28+ vuotta lavalla, 1500+ tapahtumaa.",
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
