import type { Metadata } from 'next';

export type SiteLocale = 'en' | 'zh';

export const SITE_NAME = 'Hermes 101';
export const SITE_URL = 'https://hermes101.dev';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_SITE_DESCRIPTION =
  'Free 7-day tutorial to master Hermes Agent. Learn to build your own AI personal assistant with installation guides, curated resources, automation tips, and step-by-step workflows.';

export const SITE_KEYWORDS = [
  'Hermes Agent',
  'Hermes Agent tutorial',
  'Hermes Agent guide',
  'Hermes Agent 教程',
  'Nous Research Hermes',
  'AI assistant',
  'AI Agent',
  'personal AI',
  'Telegram bot',
  'self-hosted AI',
  'open source AI',
  'AI automation',
  'Hermes Agent skills',
  'Hermes Agent installation',
  'Hermes Agent setup',
  '7 day AI tutorial',
  'AI助理',
  'AI私人助手',
  '开源AI',
];

const localeConfig: Record<
  SiteLocale,
  { ogLocale: string; alternateOgLocale: string; languageCode: string }
> = {
  en: {
    ogLocale: 'en_US',
    alternateOgLocale: 'zh_CN',
    languageCode: 'en',
  },
  zh: {
    ogLocale: 'zh_CN',
    alternateOgLocale: 'en_US',
    languageCode: 'zh-CN',
  },
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function absoluteUrl(pathname: string = '/'): string {
  const normalizedPath = normalizePath(pathname);
  return new URL(normalizedPath, SITE_URL).toString();
}

export function getAlternateLanguageLinks(enPath: string, zhPath: string) {
  return {
    en: absoluteUrl(enPath),
    'zh-CN': absoluteUrl(zhPath),
    'x-default': absoluteUrl(enPath),
  };
}

interface PageMetadataOptions {
  title: string;
  description: string;
  locale: SiteLocale;
  enPath: string;
  zhPath: string;
  type?: 'website' | 'article';
}

export function buildPageMetadata({
  title,
  description,
  locale,
  enPath,
  zhPath,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const canonicalPath = locale === 'zh' ? zhPath : enPath;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const { ogLocale, alternateOgLocale } = localeConfig[locale];

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: getAlternateLanguageLinks(enPath, zhPath),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: ogLocale,
      alternateLocale: [alternateOgLocale],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function getStructuredDataLanguage(locale: SiteLocale): string {
  return localeConfig[locale].languageCode;
}
