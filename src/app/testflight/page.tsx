import { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { AppStoreBadge } from "@/components/site/AppStoreBadge";
import { appConfig, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${appConfig.accessbox.name} is on the App Store — ${siteConfig.name}`,
  description: `The ${appConfig.accessbox.name} beta has ended. Download the app on the App Store for ${appConfig.accessbox.platforms}.`,
  openGraph: {
    title: `${appConfig.accessbox.name} is on the App Store`,
    description: `The beta has ended. Download ${appConfig.accessbox.name} for ${appConfig.accessbox.platforms}.`,
    siteName: siteConfig.name,
  },
};

export default function TestFlightPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen px-6 pb-24 pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {appConfig.accessbox.name}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            The beta has ended — {appConfig.accessbox.name} is live.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Thank you to everyone who tested {appConfig.accessbox.name} on
            TestFlight. The app is now available on the App Store for{" "}
            {appConfig.accessbox.platforms}.
          </p>

          <div className="mt-12">
            <AppStoreBadge variant="black" className="mx-auto" />
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-border/50 pt-8 text-sm text-muted-foreground">
            <Link
              href="/accessbox"
              className="transition-colors hover:text-foreground"
            >
              ← Back to Accessbox
            </Link>
            <Link
              href={`mailto:${siteConfig.supportEmail}`}
              className="transition-colors hover:text-foreground"
            >
              Questions? Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
