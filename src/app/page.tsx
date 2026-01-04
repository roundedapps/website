import { NavBar } from "@/components/site/NavBar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { AboutTribute } from "@/components/site/AboutTribute";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Features />
        <AboutTribute />
      </main>
      <Footer />
    </>
  );
}




