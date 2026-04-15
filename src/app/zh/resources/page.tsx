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
  title: 'Hermes 资源索引',
  description:
    `收录 ${stats.totalResources} 条 Hermes 相关资料，按官方文档、部署、技能、工具与案例分组检索。`,
  locale: 'zh',
  enPath: '/resources',
  zhPath: '/zh/resources',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/zh/resources#collection`,
  name: 'Hermes 资源索引',
  url: `${SITE_URL}/zh/resources`,
  description: '按主题整理的 Hermes 文档、部署指南、技能与工作流参考。',
  inLanguage: getStructuredDataLanguage('zh'),
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export default function ZhResourcesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourcesPage locale="zh" />
    </main>
  );
}
