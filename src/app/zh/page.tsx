import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import {
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  getStructuredDataLanguage,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Hermes Agent 实战路线图',
  description:
    '用 7 天完成一个可持续运行的 Hermes Agent 工作流，覆盖部署、人格设定、技能与自动化。',
  locale: 'zh',
  enPath: '/',
  zhPath: '/zh',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/zh#website`,
      url: `${SITE_URL}/zh`,
      name: SITE_NAME,
      description: '面向实战的 Hermes Agent 学习与资源站。',
      inLanguage: getStructuredDataLanguage('zh'),
    },
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/zh#course`,
      url: `${SITE_URL}/zh`,
      name: 'Hermes Agent 7 天实战冲刺',
      description: '从部署到自动化的七个主题，聚焦可复现的落地流程。',
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'P7D',
      },
      numberOfLessons: 7,
      isAccessibleForFree: true,
      availableLanguage: ['zh-CN', 'en'],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/zh#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '这套内容适合谁？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '适合希望把 Hermes 用在真实工作流中的开发者和进阶用户，而不是只看演示。',
          },
        },
        {
          '@type': 'Question',
          name: '必须先买云服务器吗？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '不需要。可以先本地完成验证，再按需求迁移到云端保持长期在线。',
          },
        },
        {
          '@type': 'Question',
          name: '7 天路线会覆盖哪些内容？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '包括安装、人格配置、渠道接入、技能使用、自动化调度和进阶多 Agent 玩法。',
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/zh#roadmap`,
      name: 'Hermes 7 天实战路线图',
      numberOfItems: 7,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '第 1 天：初识 Hermes Agent',
          url: `${SITE_URL}/zh/day/1`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '第 2 天：10 分钟，搭建你的助手',
          url: `${SITE_URL}/zh/day/2`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: '第 3 天：给助手一个灵魂',
          url: `${SITE_URL}/zh/day/3`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: '第 4 天：接入你的数字生活',
          url: `${SITE_URL}/zh/day/4`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: '第 5 天：解锁技能树',
          url: `${SITE_URL}/zh/day/5`,
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: '第 6 天：让助手主动工作',
          url: `${SITE_URL}/zh/day/6`,
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: '第 7 天：进阶玩法 & 未来展望',
          url: `${SITE_URL}/zh/day/7`,
        },
      ],
    },
  ],
};

export default function ZhHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage locale="zh" />
    </>
  );
}
