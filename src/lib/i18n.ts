/**
 * Locale definitions for the site.
 *
 * The set matches the Accessbox app's Localizable.xcstrings catalog so app and
 * web copy stay in step. URL slugs are lowercase; `htmlLang` carries the
 * properly-cased BCP 47 tag used for hreflang.
 *
 * English is served from the unprefixed path (`/learn/x`) and stays canonical;
 * other locales live under `/<locale>/learn/x`. The site is a static export
 * (`output: 'export'`), so there is no middleware and no runtime locale
 * negotiation — every localized path is emitted at build time.
 */

export const locales = ["en", "es", "pt-br", "de", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  es: "es",
  "pt-br": "pt-BR",
  de: "de",
  fr: "fr",
};

/** OpenGraph wants an underscored territory tag, not the BCP 47 one. */
export const localeOgTag: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  "pt-br": "pt_BR",
  de: "de_DE",
  fr: "fr_FR",
};

/** Locales that get a path prefix — everything except the canonical default. */
export const prefixedLocales: Locale[] = locales.filter(
  (locale) => locale !== defaultLocale,
);

export function localizedPath(locale: Locale, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/**
 * hreflang map for `metadata.alternates.languages`. Since the export is static,
 * this is what actually tells search engines which locale to serve.
 */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [
        localeHtmlLang[locale],
        localizedPath(locale, path),
      ]),
    ),
    "x-default": path,
  };
}
