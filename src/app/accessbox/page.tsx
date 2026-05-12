import { Metadata } from "next";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { appConfig, siteConfig } from "@/lib/site";
import { FeaturesContent } from "@/components/site/FeaturesContent";

export const metadata: Metadata = {
  title: `${appConfig.accessbox.name} — ${siteConfig.name}`,
  description: `Everything ${appConfig.accessbox.name} can do. Passwords, passkeys, two-factor codes, encrypted backups, and more — built natively for ${appConfig.accessbox.platforms}.`,
  openGraph: {
    title: `${appConfig.accessbox.name} — ${siteConfig.name}`,
    description: `Explore every feature of ${appConfig.accessbox.name}.`,
    siteName: siteConfig.name,
  },
};

export default function AccessboxPage() {
  return (
    <>
      <NavBar />
      <main>
        <FeaturesContent />
      </main>
      <Footer />
    </>
  );
}
