import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import {
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  getStructuredDataLanguage,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Practical Hermes Agent Guide',
  description:
    'Build a self-hosted Hermes workflow in 7 days with deployment checklists, persona setup, integrations, and automation patterns.',
  locale: 'en',
  enPath: '/',
  zhPath: '/zh',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: 'A practical learning hub for Hermes Agent builders.',
      inLanguage: getStructuredDataLanguage('en'),
    },
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course`,
      url: SITE_URL,
      name: 'Hermes Agent Practical Sprint',
      description:
        'A seven-lesson sprint focused on shipping a maintainable Hermes workflow from setup to automation.',
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
      availableLanguage: ['en', 'zh-CN'],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who should use this guide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is for makers and developers who want a practical, self-hosted Hermes setup instead of a purely chat-based demo.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need a cloud server on day one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. You can start locally, validate the workflow, then move to a server when you need always-on execution.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does the 7-day path cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The path covers installation, persona design, channel integration, skills usage, automation, and advanced patterns.',
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#roadmap`,
      name: 'Hermes 7-Day Build Roadmap',
      numberOfItems: 7,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Day 1: Meet Hermes Agent',
          url: `${SITE_URL}/day/1`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Day 2: Build Your Assistant in 10 Minutes',
          url: `${SITE_URL}/day/2`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Day 3: Give Your Assistant a Soul',
          url: `${SITE_URL}/day/3`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Day 4: Connect Your Digital Life',
          url: `${SITE_URL}/day/4`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Day 5: Unlock the Skill Tree',
          url: `${SITE_URL}/day/5`,
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Day 6: Make Your Assistant Work Proactively',
          url: `${SITE_URL}/day/6`,
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'Day 7: Advanced Techniques & Future Outlook',
          url: `${SITE_URL}/day/7`,
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage locale="en" />
    </>
  );
}
