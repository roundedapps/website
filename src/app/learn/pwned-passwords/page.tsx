import { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { appConfig, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "What is a breached password? — Accessbox",
  description:
    "Learn what it means when Accessbox flags a password as breached, how the privacy-preserving check works, and what you should do about it.",
  openGraph: {
    title: "What is a breached password? — Accessbox",
    description:
      "Learn what it means when Accessbox flags a password as breached, how the check works, and what to do.",
    siteName: siteConfig.name,
  },
};

const sections = [
  {
    question: "What happened?",
    answer:
      "When companies get hacked, stolen data — including passwords — gets compiled into large public databases. Cybercriminals use these lists to automatically try breaking into accounts across the internet. This is called a credential stuffing attack, and it's one of the most common ways accounts get taken over.",
  },
  {
    question: "Was I hacked?",
    answer:
      "No. Seeing this warning does not mean your device, Accessbox, or this specific account was compromised. It means the same password appeared in data stolen from some other service — possibly years ago — or it's common enough that attackers already have it on their lists. Your device is safe.",
  },
  {
    question: "How does the check work?",
    answer:
      "Accessbox uses a technique called k-anonymity. Only a short coded fragment of your password is ever sent to the server — never the password itself. The server returns a list of matches, and all the comparison happens locally on your device. This is an industry-standard method used by all major password managers.",
  },
  {
    question: "Your action is needed",
    answer:
      "Generate a new unique password for this account. If you used the same password on other sites, update it there too. Every account should have its own password — that way, a breach on one site can't affect the others.",
  },
];

export default function PwnedPasswordsPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen px-6 pb-24 pt-32">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="mb-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {appConfig.accessbox.name} · Security
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              What is a breached password?
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {appConfig.accessbox.name} flagged one of your passwords as
              exposed. Here&apos;s what that means, why it&apos;s not your
              fault, and what to do about it.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-0 divide-y divide-border/50">
            {sections.map((section) => (
              <div key={section.question} className="py-10">
                <h2 className="mb-4 text-xl font-semibold">
                  {section.question}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Privacy callout */}
          <div className="mt-12 rounded-2xl border border-border/50 bg-card/50 p-8">
            <h3 className="text-base font-semibold">
              Your password never leaves your device
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              The breach check sends only a 5-character fragment of a one-way
              hash — mathematically impossible to reverse back into your
              password. Even if the check server were compromised, your actual
              password would remain safe.
            </p>
          </div>

          {/* CTA — check email on HIBP */}
          <div className="mt-12 rounded-2xl border border-border/50 bg-card/30 p-8">
            <h3 className="text-base font-semibold">
              Want to see which breaches affected your email?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Have I Been Pwned is a free, trusted service that lets you check
              whether your email address appeared in any known data breaches.
              Seeing the specific breach (e.g., &quot;LinkedIn 2012&quot;) makes
              it clear the leak came from that company — not from your device or{" "}
              {appConfig.accessbox.name}.
            </p>
            <a
              href="https://haveibeenpwned.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Check my email on HaveIBeenPwned.com
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
