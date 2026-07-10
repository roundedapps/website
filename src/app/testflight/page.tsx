import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { appConfig, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Join the ${appConfig.accessbox.name} beta — ${siteConfig.name}`,
  description: `${appConfig.accessbox.name} is free while in beta on TestFlight. Any in-app subscription prompt is for testing only — you are never charged real money.`,
  openGraph: {
    title: `Join the ${appConfig.accessbox.name} beta`,
    description: `Free on TestFlight. Subscription prompts are sandbox-only — no real charges.`,
    siteName: siteConfig.name,
  },
};

export default function TestFlightPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen px-6 pb-24 pt-32">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-12">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {appConfig.accessbox.name} · Beta
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Join the {appConfig.accessbox.name} beta
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {appConfig.accessbox.name} is in open beta on Apple&apos;s
              TestFlight, for iPhone and Mac. It&apos;s free to install and free
              to use while we&apos;re testing.
            </p>
          </div>

          {/* The reassurance — subscriptions are free in TestFlight */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-8">
            <h2 className="text-xl font-semibold">
              About that subscription prompt
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Inside the app you may see an invitation to subscribe to{" "}
              <strong className="font-medium text-foreground">
                {appConfig.accessbox.name} Pro
              </strong>
              . During the beta, that prompt runs in Apple&apos;s TestFlight
              sandbox —{" "}
              <strong className="font-medium text-foreground">
                it is not real money
              </strong>
              . You will never be charged.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              So please feel free to tap through it and &ldquo;subscribe.&rdquo;
              Testing the purchase flow genuinely helps us, and it unlocks the
              Pro features — like unlimited cards — so you can try everything, at
              no cost.
            </p>
          </div>

          {/* The Pro prompt, exactly as testers will see it */}
          <figure className="mt-10">
            <Image
              src="/pro_upsell.png"
              alt="The Unlock Accessbox Pro prompt as shown in the beta, listing Yearly and Monthly options"
              width={738}
              height={1510}
              className="mx-auto h-auto w-full max-w-[18rem]"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              This is the prompt you&apos;ll see — and in the beta, it&apos;s
              free.
            </figcaption>
          </figure>

          {/* CTA — the actual TestFlight link */}
          <div className="mt-12 text-center">
            <a
              href={appConfig.accessbox.testFlightUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continue to TestFlight
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
            <p className="mt-4 text-sm text-muted-foreground">
              Opens in TestFlight. You&apos;ll need Apple&apos;s free TestFlight
              app installed.
            </p>
          </div>

          {/* Footer nav */}
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
