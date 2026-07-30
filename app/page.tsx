import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Naytot } from "@/components/home/Naytot";
import { Paketit } from "@/components/home/Paketit";
import { AsiakkaatKertovat } from "@/components/home/AsiakkaatKertovat";
import { CtaBand } from "@/components/home/CtaBand";
import { Footer } from "@/components/home/Footer";

const marqueeItems = [
  "Kouvolan kaupunki",
  "NCC",
  "Orange Advertising",
  "HOAS",
  "Hämeen Kauppakamari",
  "Lemminkäinen",
  "Piikkiön VPK",
  "Sokos Hotels",
  "LG",
  "EK",
];

export default function Home() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Marquee items={marqueeItems} />
      <Naytot />
      <Paketit />
      <AsiakkaatKertovat />
      <CtaBand />
      <Footer />
    </div>
  );
}
