'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ThoughtItem {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  content: string;
}

interface ThoughtsPageProps {
  locale: 'en' | 'zh';
  thoughts: ThoughtItem[];
}

const texts = {
  en: {
    title: 'My Thoughts',
    subtitle:
      'Personal insights, lessons learned, and creative ideas from daily Hermes usage.',
    backToList: '← Back to all thoughts',
    publishedOn: 'Published on',
    noThoughts: 'No thoughts published yet. Check back soon!',
    tag: 'Tag',
  },
  zh: {
    title: '我的思考',
    subtitle: '日常使用 Hermes 过程中的心得、教训和创意想法。',
    backToList: '← 返回全部文章',
    publishedOn: '发布于',
    noThoughts: '暂无文章，敬请期待！',
    tag: '标签',
  },
};

export default function ThoughtsPage({ locale, thoughts }: ThoughtsPageProps) {
  const [selected, setSelected] = useState<ThoughtItem | null>(null);
  const t = texts[locale];

  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <a
            href={locale === 'zh' ? '/zh' : '/'}
            className="text-sm mb-4 inline-block transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {locale === 'zh' ? '← 返回首页' : '← Back to home'}
          </a>
          <h1
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: '#fff' }}
          >
            💡 {t.title}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Article view */}
        {selected ? (
          <div>
            <button
              onClick={() => setSelected(null)}
              className="text-sm mb-6 inline-block transition-colors hover:text-white cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {t.backToList}
            </button>

            <article
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              <div className="mb-4 flex items-center gap-3 flex-wrap">
                <span
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {t.publishedOn} {selected.date}
                </span>
                {selected.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full border border-blue-300/30 bg-blue-400/10"
                    style={{ color: 'rgba(219, 234, 254, 0.95)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-bold mb-6"
                style={{ color: '#fff' }}
              >
                {selected.title}
              </h2>

              <div className="prose prose-invert prose-sm sm:prose-base max-w-none thought-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {selected.content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        ) : thoughts.length === 0 ? (
          <div
            className="text-center py-20"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <p className="text-lg">{t.noThoughts}</p>
          </div>
        ) : (
          /* List view */
          <div className="space-y-4">
            {thoughts.map((item) => (
              <button
                key={item.slug}
                onClick={() => setSelected(item)}
                className="w-full text-left rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 sm:p-6 transition-all duration-200 hover:bg-white/10 hover:border-white/20 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className="text-xs"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {item.date}
                  </span>
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full border border-blue-300/30 bg-blue-400/10"
                      style={{ color: 'rgba(219, 234, 254, 0.95)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: '#fff' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {item.summary}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
