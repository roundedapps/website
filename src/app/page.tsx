import { NavBar } from "@/components/site/NavBar";
import { Hero } from "@/components/site/Hero";
import { ReturningUserSection } from "@/components/site/ReturningUserSection";
import { AboutTribute } from "@/components/site/AboutTribute";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <ReturningUserSection />
        <AboutTribute />
      </main>
      <Footer />
    </>
  );
}
