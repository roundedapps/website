import { Metadata } from "next";
import { LearnArticle } from "@/components/site/LearnArticle";
import { familySharingCopy, familySharingPath } from "@/content/family-sharing";
import {
  languageAlternates,
  localeOgTag,
  localizedPath,
  prefixedLocales,
  type Locale,
} from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type Params = { locale: Locale };

export function generateStaticParams(): Params[] {
  return prefixedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = familySharingCopy[locale];

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: localizedPath(locale, familySharingPath),
      languages: languageAlternates(familySharingPath),
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      siteName: siteConfig.name,
      locale: localeOgTag[locale],
    },
  };
}

export default async function LocalizedFamilySharingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  return <LearnArticle copy={familySharingCopy[locale]} />;
}
