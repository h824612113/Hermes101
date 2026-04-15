import type { Metadata } from 'next';
import ResourcesPage from '@/components/ResourcesPage';
import { stats } from '@/data/resources';
import {
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  getStructuredDataLanguage,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Hermes Resource Index',
  description:
    `Browse ${stats.totalResources} curated Hermes resources across official docs, deployment guides, skills, tooling, and practical use cases.`,
  locale: 'en',
  enPath: '/resources',
  zhPath: '/zh/resources',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/resources#collection`,
  name: 'Hermes Resource Index',
  url: `${SITE_URL}/resources`,
  description:
    'A categorized index of Hermes references: docs, deployment notes, skills, and workflow examples.',
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
