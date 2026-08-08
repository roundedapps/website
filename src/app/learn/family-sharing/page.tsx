import { Metadata } from "next";
import { LearnArticle } from "@/components/site/LearnArticle";
import { familySharingCopy, familySharingPath } from "@/content/family-sharing";
import { languageAlternates } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const copy = familySharingCopy.en;

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: {
    canonical: familySharingPath,
    languages: languageAlternates(familySharingPath),
  },
  openGraph: {
    title: copy.metaTitle,
    description: copy.metaDescription,
    siteName: siteConfig.name,
    locale: "en_US",
  },
};

export default function FamilySharingPage() {
  return <LearnArticle copy={copy} />;
}
