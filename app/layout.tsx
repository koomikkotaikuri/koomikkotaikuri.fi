import type { Metadata } from "next";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Tarjouslomake } from "@/components/site/Tarjouslomake";
import { Evastebanneri } from "@/components/site/Evastebanneri";
import { MetaPageView } from "@/components/site/MetaPageView";
import { GA_ID, GTAG_ALKU } from "@/lib/gtag";
import { SITE_NAME, SITE_URL } from "@/lib/site-metadata";
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
  verification: { google: "K8himcPubuI_ob732kWRKItX_pcH51OdVyiyZcJf7Hw" },
  // Only site-wide defaults here. Title, description and canonical belong to
  // each page (the home page's are in app/page.tsx); anything set here would
  // leak into routes without their own, such as the 404 and the thank-you page.
  openGraph: { type: "website", locale: "fi_FI", siteName: SITE_NAME },
  twitter: { card: "summary_large_image" },
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
        {/* Consent Mode -oletukset ennen gtag.js:ää, ks. lib/gtag.ts */}
        <Script id="gtag-alku" strategy="beforeInteractive">
          {GTAG_ALKU}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <MetaPageView />
        {children}
        <Tarjouslomake />
        <Evastebanneri />
      </body>
    </html>
  );
}
