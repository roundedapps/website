import { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { appConfig, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Import your passwords into Accessbox — Accessbox",
  description:
    "How to move your passwords, passkeys, and verification codes into Accessbox directly from Apple Passwords or another password manager.",
  openGraph: {
    title: "Import your passwords into Accessbox — Accessbox",
    description:
      "How to move your passwords, passkeys, and verification codes into Accessbox directly from Apple Passwords or another password manager.",
    siteName: siteConfig.name,
  },
};

const steps = [
  {
    question: "1. Open Passwords",
    answer:
      "On your iPhone, iPad, or Mac, open Settings (or the standalone Passwords app), go to Passwords, then select an item or your whole list, and choose \"Move to another app.\"",
  },
  {
    question: "2. Choose Accessbox",
    answer:
      `${appConfig.accessbox.name} will appear as one of the destination apps. Select it, and authenticate with Face ID, Touch ID, or your passcode when prompted — this happens twice: once to release the data from Passwords, and once when ${appConfig.accessbox.name} reads it.`,
  },
  {
    question: "3. Review before anything is imported",
    answer:
      `${appConfig.accessbox.name} opens with a checklist of everything it received — nothing is saved to your vault yet. Turn off anything you don't want, then tap Import. Items that already exist in your vault are flagged and left unchecked by default, so re-importing never creates duplicates.`,
  },
];

export default function ImportPasswordsPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen px-6 pb-24 pt-32">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="mb-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {appConfig.accessbox.name} · Getting Started
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Import your passwords
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              On iOS 26, iPadOS 26, and macOS 26 or later, {appConfig.accessbox.name}{" "}
              can receive your passwords, passkeys, and verification codes
              directly from Apple Passwords — or from any other password
              manager that supports Apple&apos;s credential exchange feature,
              like 1Password or Bitwarden. No file exports, no copy-pasting.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-0 divide-y divide-border/50">
            {steps.map((step) => (
              <div key={step.question} className="py-10">
                <h2 className="mb-4 text-xl font-semibold">
                  {step.question}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {step.answer}
                </p>
              </div>
            ))}
          </div>

          {/* What gets imported */}
          <div className="mt-12 rounded-2xl border border-border/50 bg-card/50 p-8">
            <h3 className="text-base font-semibold">
              What gets imported
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Passwords, passkeys, and verification codes (2FA) all come
              across. A few less common item types — notes, credit cards,
              identity documents, and a handful of others — aren&apos;t
              supported by {appConfig.accessbox.name} yet; those are clearly
              marked as unsupported in the review screen rather than silently
              skipped.
            </p>
          </div>

          {/* Privacy callout */}
          <div className="mt-12 rounded-2xl border border-border/50 bg-card/30 p-8">
            <h3 className="text-base font-semibold">
              Nothing leaves your device
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              This transfer happens entirely on-device, app to app — there
              are no servers involved, and {appConfig.accessbox.name} only
              writes to your vault after you&apos;ve reviewed the checklist
              and tapped Import.
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
