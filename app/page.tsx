import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Naytot } from "@/components/home/Naytot";
import { Paketit } from "@/components/home/Paketit";
import { AsiakkaatKertovat } from "@/components/home/AsiakkaatKertovat";
import { CtaBand } from "@/components/site/CtaBand";
import { Footer } from "@/components/site/Footer";

const marqueeItems = [
  "Kouvolan kaupunki", "NCC", "Orange Advertising", "HOAS", "Hämeen Kauppakamari", "Lemminkäinen",
  "Piikkiön VPK", "Sokos Hotels", "LG", "EK", "Ahlsell", "Viking Line", "Nordea", "Ilmarinen", "Wipak",
  "Kone", "Boliden", "Kotkamills", "CGI", "Visma", "Supercell", "Fazer", "Stockmann", "Stark", "Motonet",
  "Kesko", "S-ryhmä", "Biltema", "Metacore", "Talenom", "Suomen Rakennuskone", "Kaukokiito", "Evidensia",
  "Miseva", "LähiTapiola", "Terveystalo", "Barona", "Accountor", "Castren & Snelman", "Finnpos Systems",
  "K-Hartwall", "Orbis", "Merivaara", "Sitowise", "Scania", "Yara Suomi", "Securitas", "Punos Mobile",
  "Rinta-Jouppi", "Hankintatukku", "Pernod Ricard", "EY", "HOK-Elanto", "JobMeal", "Jaken Pölli",
  "Decoworks", "Voitelukeskus Tonttila", "Koka Oy", "KRNR Consulting", "Autosalpa", "Factornova", "UPM",
  "Tallink Silja", "Nelonen Media",
];

export default function Home() {
  return (
    <div style={{ background: "var(--kt-yo)", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Marquee items={marqueeItems} speed={270} />
      <Naytot />
      <Paketit />
      <AsiakkaatKertovat />
      <CtaBand
        title="Sinä hoidat kutsut."
        accent="Minä sen, että ilta muistetaan."
        sub="ja sinä saat rentoutua"
      />
      <Footer
        links={[
          { label: "Tapahtumaopas", href: "/palvelut" },
          { label: "UKK", href: "/ukk" },
          { label: "Yhteystiedot", href: "/media#yhteystiedot" },
          { label: "Tietosuoja", href: "/" },
        ]}
      />
    </div>
  );
}
