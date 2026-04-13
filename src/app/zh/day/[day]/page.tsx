import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DayContent from '@/components/DayContent';
import { getDayContent, getDayStaticParams } from '@/lib/days';
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildPageMetadata,
  getStructuredDataLanguage,
} from '@/lib/seo';

interface Props {
  params: {
    day: string;
  };
}

export function generateStaticParams() {
  return getDayStaticParams();
}

export function generateMetadata({ params }: Props): Metadata {
  const data = getDayContent('zh', params.day);

  if (!data) {
    return {
      title: 'Not Found',
    };
  }

  return buildPageMetadata({
    title: data.frontmatter.title,
    description: data.frontmatter.description,
    locale: 'zh',
    enPath: `/day/${params.day}`,
    zhPath: `/zh/day/${params.day}`,
    type: 'article',
  });
}

export default function DayPage({ params }: Props) {
  const data = getDayContent('zh', params.day);

  if (!data) {
    notFound();
  }

  const dayNumber = Number(params.day);
  const prevDay = dayNumber > 1 ? dayNumber - 1 : null;
  const nextDay = dayNumber < 7 ? dayNumber + 1 : null;
  const url = absoluteUrl(`/zh/day/${params.day}`);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: data.frontmatter.title,
    description: data.frontmatter.description,
    url,
    inLanguage: getStructuredDataLanguage('zh'),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    dateModified: data.lastModified,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DayContent
        day={dayNumber}
        content={data.content}
        frontmatter={data.frontmatter}
        prevDay={prevDay}
        nextDay={nextDay}
        locale="zh"
      />
    </main>
  );
}
