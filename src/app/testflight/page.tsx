import { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
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
            <a
              href={appConfig.accessbox.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Download on the App Store
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
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
