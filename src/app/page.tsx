import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pourquoi from "@/components/Pourquoi";
import Promesses from "@/components/Promesses";
import Deroule from "@/components/Deroule";
import Prix from "@/components/Prix";
import RendezVous from "@/components/RendezVous";
import Questions from "@/components/Questions";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pourquoi />
        <Promesses />
        <Deroule />
        <Prix />
        <RendezVous />
        <Questions />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
