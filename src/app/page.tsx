import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import {
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  getStructuredDataLanguage,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Master Your AI Assistant in 7 Days',
  description:
    'The definitive guide to building your AI assistant with Hermes Agent. Step-by-step tutorials, curated resources, and practical workflows for your personal AI agent.',
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
      description: 'Master your AI personal assistant in 7 days.',
      inLanguage: getStructuredDataLanguage('en'),
    },
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course`,
      url: SITE_URL,
      name: 'Hermes Agent 7-Day Tutorial',
      description:
        'Learn to build and customize your own AI personal assistant with Hermes Agent in seven practical lessons.',
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
          name: 'What is Hermes Agent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hermes Agent is an open-source AI agent framework for building a self-hosted personal AI assistant that can chat, automate tasks, use tools, and stay online for you.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Hermes Agent free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Hermes Agent is open source and free to use. You only need to cover model API usage and the machine or server where you run it.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does the tutorial take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The tutorial is split into seven focused days so you can learn installation, setup, skills, integrations, and automation step by step.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which AI models does Hermes Agent support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hermes Agent supports Claude, OpenAI models, Google Gemini, xAI Grok, and other providers available through OpenRouter.',
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#tutorial-list`,
      name: 'Hermes Agent 7-Day Learning Path',
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
