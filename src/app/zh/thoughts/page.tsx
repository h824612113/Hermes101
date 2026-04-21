import type { Metadata } from 'next';
import ThoughtsPage from '@/components/ThoughtsPage';
import { getAllThoughts } from '@/lib/thoughts';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '我的思考 — Hermes 使用心得',
  description: '日常使用 Hermes 过程中的心得、教训和创意想法。',
  locale: 'zh',
  enPath: '/thoughts',
  zhPath: '/zh/thoughts',
});

export default function ZhThoughtsPage() {
  const thoughts = getAllThoughts().map((t) => ({
    slug: t.slug,
    title: t.frontmatter.title,
    date: t.frontmatter.date,
    summary: t.frontmatter.summary,
    tags: t.frontmatter.tags,
    content: t.content,
  }));

  return <ThoughtsPage locale="zh" thoughts={thoughts} />;
}
