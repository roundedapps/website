import { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { siteConfig, appConfig } from "@/lib/site";
import { Mail, MessageCircle, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${appConfig.accessbox.name} and other ${siteConfig.name} products.`,
};

export default function SupportPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              How can we help?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re here to help you get the most out of{" "}
              {appConfig.accessbox.name}.
            </p>
          </div>

          {/* Support Options */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Email Support */}
            <Link
              href={`mailto:${siteConfig.supportEmail}`}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-200 hover:border-border hover:bg-card/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                <Mail className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Email Us</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Send us an email and we&apos;ll get back to you as soon as
                possible.
              </p>
              <p className="mt-3 text-sm font-medium text-primary">
                {siteConfig.supportEmail}
              </p>
            </Link>

            {/* FAQ - Placeholder */}
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 opacity-60">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">FAQ</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Frequently asked questions and answers.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Coming soon</p>
            </div>

            {/* Documentation - Placeholder */}
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 opacity-60">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <FileText className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Documentation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Detailed guides and documentation.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 rounded-2xl border border-border/50 bg-card/30 p-8 text-center">
            <h2 className="text-xl font-semibold">Still need help?</h2>
            <p className="mt-2 text-muted-foreground">
              Don&apos;t hesitate to reach out. We typically respond within 24
              hours.
            </p>
            <Link
              href={`mailto:${siteConfig.supportEmail}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}







