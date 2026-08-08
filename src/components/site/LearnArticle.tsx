import Link from "next/link";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { appConfig, siteConfig } from "@/lib/site";
import type { LearnArticleCopy } from "@/content/family-sharing";

export function LearnArticle({ copy }: { copy: LearnArticleCopy }) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen px-6 pb-24 pt-32">
        <div className="mx-auto max-w-2xl">

          <div className="mb-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {appConfig.accessbox.name} · {copy.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{copy.intro}</p>
          </div>

          <div>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight">
              {copy.stepsHeading}
            </h2>
            <ol className="space-y-8">
              {copy.steps.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 space-y-0 divide-y divide-border/50 border-t border-border/50">
            {copy.sections.map((section) => (
              <div key={section.question} className="py-10">
                <h2 className="mb-4 text-xl font-semibold">
                  {section.question}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {section.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border/50 bg-card/50 p-8">
            <h3 className="text-base font-semibold">{copy.callout.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy.callout.body}
            </p>
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-border/50 pt-8 text-sm text-muted-foreground">
            <Link
              href="/accessbox"
              className="transition-colors hover:text-foreground"
            >
              {copy.backLink}
            </Link>
            <Link
              href={`mailto:${siteConfig.supportEmail}`}
              className="transition-colors hover:text-foreground"
            >
              {copy.contactLink}
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
