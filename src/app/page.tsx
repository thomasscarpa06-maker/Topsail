import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Promesses from "@/components/Promesses";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Promesses />
      </main>
      <ScrollReveal />
    </>
  );
}
