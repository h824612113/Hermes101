import type { Metadata } from 'next';
import ThoughtsPage from '@/components/ThoughtsPage';
import { getAllThoughts } from '@/lib/thoughts';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'My Thoughts on Hermes',
  description:
    'Personal insights, lessons learned, and creative ideas from daily Hermes usage.',
  locale: 'en',
  enPath: '/thoughts',
  zhPath: '/zh/thoughts',
});

export default function EnThoughtsPage() {
  const thoughts = getAllThoughts().map((t) => ({
    slug: t.slug,
    title: t.frontmatter.title,
    date: t.frontmatter.date,
    summary: t.frontmatter.summary,
    tags: t.frontmatter.tags,
    content: t.content,
  }));

  return <ThoughtsPage locale="en" thoughts={thoughts} />;
}
