import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Promesses from "@/components/Promesses";
import Prix from "@/components/Prix";
import RendezVous from "@/components/RendezVous";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Promesses />
        <Prix />
        <RendezVous />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
