import type { Metadata } from 'next';
import ResourcesPage from '@/components/ResourcesPage';
import {
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  getStructuredDataLanguage,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Hermes Agent Resource Hub',
  description:
    'Browse 35+ curated Hermes Agent tutorials, deployment guides, videos, and integration resources from Alibaba Cloud, Tencent Cloud, DigitalOcean, Bilibili, IBM, Codecademy, and more.',
  locale: 'en',
  enPath: '/resources',
  zhPath: '/zh/resources',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/resources#collection`,
  name: 'Hermes Agent Resource Hub',
  url: `${SITE_URL}/resources`,
  description:
    'Curated Hermes Agent tutorials, deployment guides, videos, and integration resources in one place.',
  inLanguage: getStructuredDataLanguage('en'),
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export default function EnResourcesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourcesPage locale="en" />
    </main>
  );
}
