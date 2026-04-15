'use client';

import { useState, useEffect, useRef } from 'react';
import {
  resources,
  categoryMeta,
  stats,
  type Resource,
  type ResourceCategory,
} from '@/data/resources';
import ConsultButton from './ConsultButton';

/* ── i18n texts ── */
const texts = {
  en: {
    backToHome: 'Back to home',
    heroTitle: 'Resource Index',
    heroSubtitle:
      'A maintained index of Hermes references.\nPrioritize official docs first, then deployment notes, skills, and use-case writeups.',
    statsResources: 'resources',
    statsChinese: 'Chinese',
    statsEnglish: 'English',
    statsCategories: 'categories',
    searchPlaceholder: 'Search tutorials, platforms, keywords…',
    searchResultsFor: 'Search',
    searchFound: 'found',
    searchResults: 'results',
    noResults: 'No matching resources',
    clearSearch: 'Clear search',
    sourcesLabel: 'Sources',
    itemsLabel: 'items',
    open: 'Open →',
    zhLabel: '中文',
    enLabel: 'EN',
    contributeTitle: '🤝 Know a better reference?',
    contributeDesc: 'This repository is open source. Update',
    contributeDesc2: ' and open a PR so others can reuse it.',
    submitPR: 'Submit PR',
    footerMadeBy: 'Maintained by',
    catDescriptions: {
      official: 'First-hand materials from the Hermes Agent team',
      'cloud-deploy': 'One-click deployment solutions for major cloud platforms',
      'getting-started': 'Beginner-friendly step-by-step tutorials',
      'channel-integration': 'Feishu, DingTalk, Telegram, WeChat Work integration',
      'skill-dev': 'Create and publish custom skills',
      video: 'Visual tutorials for better learning',
      'deep-dive': 'Architecture analysis, industry commentary, and advanced content',
      tools: 'Community-developed tools and plugins',
      'use-cases': 'Real-world workflows, automations, and creative use cases',
    },
  },
  zh: {
    backToHome: '返回首页',
    heroTitle: '资源索引',
    heroSubtitle:
      '按主题维护的 Hermes 参考链接集合。\n先看官方文档，再看部署、技能和真实案例。',
    statsResources: '篇资源',
    statsChinese: '中文',
    statsEnglish: '英文',
    statsCategories: '大分类',
    searchPlaceholder: '搜索教程、平台、关键词…',
    searchResultsFor: '搜索',
    searchFound: '· 找到',
    searchResults: '条',
    noResults: '没有匹配的资源',
    clearSearch: '清除搜索',
    sourcesLabel: '收录来源',
    itemsLabel: '篇',
    open: '打开 →',
    zhLabel: '中文',
    enLabel: 'EN',
    contributeTitle: '🤝 发现更好的资料？',
    contributeDesc: '这是开源仓库。更新',
    contributeDesc2: ' 后提交 PR，其他人就能直接复用。',
    submitPR: '提交 PR',
    footerMadeBy: '维护者',
    catDescriptions: {
      official: '来自 Hermes Agent 团队的第一手资料',
      'cloud-deploy': '主流云平台一键部署方案',
      'getting-started': '从零开始的保姆级教程',
      'channel-integration': '飞书、钉钉、Telegram、企业社群等平台接入',
      'skill-dev': '创建和发布自定义技能',
      video: '看得见的教程更好学',
      'deep-dive': '架构分析、行业评论和进阶内容',
      tools: '社区开发的辅助工具和插件',
      'use-cases': '真实工作流、自动化方案和创意玩法',
    },
  },
};

/* ── helpers ── */
const catOrder: ResourceCategory[] = [
  'official',
  'cloud-deploy',
  'getting-started',
  'channel-integration',
  'skill-dev',
  'video',
  'deep-dive',
  'tools',
  'use-cases',
];

const borderColors: Record<string, string> = {
  blue: '#3b82f6',
  green: '#10b981',
  purple: '#8b5cf6',
  orange: '#f97316',
  red: '#f43f5e',
  indigo: '#6366f1',
  teal: '#14b8a6',
  sky: '#0ea5e9',
  amber: '#f59e0b',
};

const bgColors: Record<string, string> = {
  blue: 'rgba(59,130,246,0.04)',
  green: 'rgba(16,185,129,0.04)',
  purple: 'rgba(139,92,246,0.04)',
  orange: 'rgba(249,115,22,0.04)',
  red: 'rgba(244,63,94,0.04)',
  indigo: 'rgba(99,102,241,0.04)',
  teal: 'rgba(20,184,166,0.04)',
  sky: 'rgba(14,165,233,0.04)',
  amber: 'rgba(245,158,11,0.04)',
};

/* source color dots */
const sourceDots: Record<string, string> = {
  '阿里云': '#ff6a00',
  '腾讯云': '#0052d9',
  'DigitalOcean': '#0069ff',
  'Hostinger': '#6c47ff',
  'IBM': '#0f62fe',
  'Codecademy': '#1557ff',
  'Bilibili': '#fb7299',
  'MiniMax': '#7c3aed',
  'GitHub': '#24292f',
  'GitHub Releases': '#24292f',
  'Nous Research': '#2563eb',
  'Hermes Docs': '#2563eb',
  'Nous Portal': '#0f172a',
  'OpenRouter': '#0f766e',
  'Ollama': '#059669',
  'Hugging Face': '#f59e0b',
  'Hermes Agent': '#2563eb',
  'Hermes Agent Docs': '#2563eb',
  'Hermes Skills Hub': '#10b981',
  'Discord': '#5865f2',
  'Wikipedia': '#636466',
  'Apifox': '#e8432a',
  '博客园': '#3b82f6',
  'CSDN': '#fc5531',
  '53AI': '#6366f1',
  '实在智能': '#059669',
  '腾讯新闻': '#0052d9',
  'Reddit': '#ff4500',
  'Substack': '#ff6719',
  'Hermes 101': '#2563eb',
  'Creator Economy': '#7c3aed',
  'NxCode': '#0ea5e9',
  'Scientific American': '#000000',
  'Cisco': '#049fd9',
  'TechCrunch': '#0a9e23',
  'CNET': '#e00707',
  'The Verge': '#fa4b2a',
  'The Guardian': '#052962',
  'DataCamp': '#03ef62',
  'CoderSera': '#6366f1',
  '掘金': '#1e80ff',
  'DEV Community': '#0a0a0a',
  'The Hacker News': '#ff6600',
  'CNBC': '#005594',
  'Medium': '#000000',
  'Apiyi': '#3b82f6',
  'YouTube': '#ff0000',
  '阿里云开发者社区': '#ff6a00',
};

interface ResourcesPageProps {
  locale: 'en' | 'zh';
}

/* ── card ── */
function Card({ r, color, t }: { r: Resource; color: string; t: typeof texts.en }) {
  const dotColor = sourceDots[r.source] || '#9ca3af';
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
      style={{
        background: r.featured ? 'linear-gradient(135deg, #fffbeb 0%, #ffffff 40%)' : '#fff',
        borderLeft: `3px solid ${borderColors[color] || '#e5e7eb'}`,
      }}
    >
      {/* featured star */}
      {r.featured && (
        <div className="absolute top-3 right-3">
          <span className="text-amber-400 text-sm">⭐</span>
        </div>
      )}

      <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2 pr-6">
        {r.title}
      </h3>
      <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3">{r.desc}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dotColor }} />
          <span className="text-xs text-gray-400">{r.source}</span>
          <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded font-medium ${
            r.lang === 'zh'
              ? 'bg-red-50 text-red-500'
              : 'bg-blue-50 text-blue-500'
          }`}>
            {r.lang === 'zh' ? t.zhLabel : t.enLabel}
          </span>
        </div>
        <span className="text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {t.open}
        </span>
      </div>
    </a>
  );
}

/* ── section per category ── */
function CategorySection({ 
  cat, 
  index, 
  locale, 
  t 
}: { 
  cat: ResourceCategory; 
  index: number; 
  locale: 'en' | 'zh';
  t: typeof texts.en;
}) {
  const meta = categoryMeta[cat];
  const color = meta.color;
  const items = resources.filter((r) => r.category === cat);
  if (items.length === 0) return null;
  const isAlt = index % 2 === 1;

  return (
    <section
      className="reveal py-10 -mx-4 px-4 md:-mx-8 md:px-8 rounded-2xl"
      style={{
        transitionDelay: `${index * 80}ms`,
        background: isAlt ? bgColors[color] || 'rgba(0,0,0,0.02)' : 'transparent',
      }}
    >
      {/* section header */}
      <div className="flex items-center gap-4 mb-2">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-sm"
          style={{ background: `${borderColors[color]}15`, border: `1px solid ${borderColors[color]}25` }}
        >
          {meta.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              {locale === 'zh' ? meta.label : meta.labelEn}
            </h2>
            <span
              className="text-[11px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${borderColors[color]}15`, color: borderColors[color] }}
            >
              {items.length} {t.itemsLabel}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">{t.catDescriptions[cat]}</p>
        </div>
      </div>

      {/* divider */}
      <div className="h-px mb-6 mt-4" style={{ background: `linear-gradient(to right, ${borderColors[color]}30, transparent)` }} />

      {/* cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((r) => (
          <Card key={r.url} r={r} color={color} t={t} />
        ))}
      </div>
    </section>
  );
}

/* ── page ── */
export default function ResourcesPage({ locale }: ResourcesPageProps) {
  const [search, setSearch] = useState('');
  const mainRef = useRef<HTMLDivElement>(null);
  const t = texts[locale];
  const homeUrl = locale === 'zh' ? '/zh' : '/';
  const sourceList = Array.from(new Set(resources.map((r) => r.source))).slice(0, 14);

  const searchResults = search
    ? resources.filter((r) => {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          r.source.toLowerCase().includes(q) ||
          r.tags?.some((tag) => tag.toLowerCase().includes(q))
        );
      })
    : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );
    const elements = mainRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── hero header ── */}
      <header className="hero-glow relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(37, 99, 235, 0.12)' }} />
        <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }} />

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-14">
          <a href={homeUrl} className="inline-flex items-center gap-1.5 text-sm mb-8 hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t.backToHome}
          </a>

          <div className="flex items-start gap-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#fff' }}>
                {t.heroTitle}
              </h1>
              <p className="text-base md:text-lg max-w-xl leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {t.heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  { n: stats.totalResources + '+', l: t.statsResources },
                  { n: stats.zhResources, l: t.statsChinese },
                  { n: stats.enResources, l: t.statsEnglish },
                  { n: stats.totalCategories, l: t.statsCategories },
                ].map((s) => (
                  <div key={s.l} className="px-4 py-2 rounded-full backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="text-sm font-bold" style={{ color: '#fff' }}>{s.n}</span>
                    <span className="text-xs ml-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.l}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 max-w-md">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(255,255,255,0.3)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative w-80 shrink-0">
              <div
                className="rounded-xl p-5 shadow-2xl"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#fff' }}>
                  {locale === 'zh' ? '使用建议' : 'Usage Notes'}
                </h3>
                <ol className="space-y-2 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <li>{locale === 'zh' ? '1. 先阅读官方文档再看社区文章。' : '1. Start from official docs before community posts.'}</li>
                  <li>{locale === 'zh' ? '2. 搜索时优先按场景和关键词组合。' : '2. Combine use-case and keyword in search.'}</li>
                  <li>{locale === 'zh' ? '3. 安装第三方能力前先审查权限。' : '3. Review permissions before installing third-party skills.'}</li>
                  <li>{locale === 'zh' ? '4. 发现失效链接请直接提 PR。' : '4. Open a PR when you find stale links.'}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── source logos ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="font-medium text-gray-500 mr-1">{t.sourcesLabel}</span>
          {sourceList.map((name) => (
            <span key={name} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-md text-gray-600 border border-gray-100">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: sourceDots[name] || '#9ca3af' }}
              />
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── main content ── */}
      <div ref={mainRef} className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {search ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {t.searchResultsFor} &ldquo;<span className="text-gray-900 font-medium">{search}</span>&rdquo; {t.searchFound} <b className="text-gray-900">{searchResults.length}</b> {t.searchResults}
            </p>
            {searchResults.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-3xl mb-3">🔍</p>
                <p>{t.noResults}</p>
                <button onClick={() => setSearch('')} className="mt-3 text-sm text-blue-600 hover:underline">{t.clearSearch}</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((r) => <Card key={r.url} r={r} color="blue" t={t} />)}
              </div>
            )}
          </>
        ) : (
          catOrder.map((cat, i) => (
            <CategorySection key={cat} cat={cat} index={i} locale={locale} t={t} />
          ))
        )}

        {/* ── contribute CTA ── */}
        <div className="reveal mt-12 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          {/* decorative */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{ background: 'rgba(37, 99, 235, 0.15)' }} />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }} />

          <div className="flex-1 relative">
            <h3 className="text-xl font-bold mb-2" style={{ color: '#fff' }}>{t.contributeTitle}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {t.contributeDesc} <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>src/data/resources.ts</code>{t.contributeDesc2}
            </p>
          </div>
          <a
            href="https://github.com/h824612113/Hermes101"
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {t.submitPR}
          </a>
        </div>
      </div>

      {/* ── footer ── */}
      <footer className="hero-glow py-8 mt-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {t.footerMadeBy} <a href={homeUrl} className="hover:underline" style={{ color: 'rgba(255,255,255,0.6)' }}>Hermes 101</a> · <a href="https://github.com/h824612113/Hermes101" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'rgba(255,255,255,0.6)' }}>GitHub</a>
        </div>
      </footer>

      {/* Floating consult button */}
      <ConsultButton locale={locale} />
    </div>
  );
}
