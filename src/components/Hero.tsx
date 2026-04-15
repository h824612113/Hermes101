'use client';

import { stats } from '@/data/resources';
import { Dictionary } from '@/lib/i18n';

interface HeroProps {
  locale: 'en' | 'zh';
  dict: Dictionary;
}

export default function Hero({ locale, dict }: HeroProps) {
  const isZh = locale === 'zh';
  const metricItems = [
    dict.hero.metrics.items.email,
    dict.hero.metrics.items.meeting,
    dict.hero.metrics.items.seo,
  ];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center hero-glow overflow-hidden pt-28 pb-10 sm:pt-0 sm:pb-0">
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse"
        style={{ background: 'rgba(37, 99, 235, 0.10)' }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
        style={{ background: 'rgba(16, 185, 129, 0.08)', animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse"
        style={{ background: 'rgba(37, 99, 235, 0.05)', animationDelay: '4s' }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {isZh ? '实战导向 · 每天 30-60 分钟' : 'Hands-on track · 30-60 minutes per day'}
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 tracking-tight"
          style={{ color: '#fff' }}
        >
          {isZh ? (
            <>
              把 <span className="gradient-text">Hermes</span> 用进你的工作流
            </>
          ) : (
            <>
              Build a <span className="gradient-text">Hermes Workflow</span> You Actually Use
            </>
          )}
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 px-2"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          {isZh
            ? '从部署、人格设定到自动化，7 天完成一个可长期运行的 AI 助手。'
            : 'From deployment to personality and automation, ship an AI assistant you can run long-term in 7 days.'}
        </p>

        <p
          className="text-xs sm:text-sm md:text-base mb-6 sm:mb-10 max-w-2xl mx-auto px-3"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          {isZh
            ? '不讲空泛概念，聚焦可复现的步骤、踩坑记录和真实配置示例。'
            : 'No fluff, just repeatable steps, failure notes, and real configuration examples.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <a
            href="#roadmap"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
            style={{ color: '#fff' }}
          >
            🚀 {isZh ? '查看 7 天路线' : 'See 7-Day Roadmap'}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>

          <a
            href={isZh ? '/zh/resources' : '/resources'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border border-white/20 hover:border-white/40 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            📚 {dict.hero.ctaSecondary}
          </a>

          <a
            href="https://hermes-agent.nousresearch.com/docs/getting-started/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border border-white/20 hover:border-white/40 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {isZh ? '官方快速开始' : 'Official Quickstart'}
          </a>
        </div>

        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-4 sm:p-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-blue-300/30 bg-blue-400/10 w-fit"
              style={{ color: 'rgba(219, 234, 254, 0.95)' }}
            >
              {dict.hero.metrics.badge}
            </span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {dict.hero.metrics.range}
            </span>
          </div>

          <h3 className="mt-3 text-lg sm:text-xl font-bold" style={{ color: '#fff' }}>
            {dict.hero.metrics.title}
          </h3>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {dict.hero.metrics.subtitle}
          </p>

          <div className="mt-4 space-y-3 md:hidden">
            {metricItems.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-sm font-semibold" style={{ color: '#fff' }}>
                  {item.label}
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)' }}>{dict.hero.metrics.columns.baseline}</div>
                    <div className="mt-1 font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      {item.baseline}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)' }}>{dict.hero.metrics.columns.current}</div>
                    <div className="mt-1 font-semibold" style={{ color: '#86efac' }}>
                      {item.current}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)' }}>{dict.hero.metrics.columns.target}</div>
                    <div className="mt-1 font-semibold" style={{ color: '#93c5fd' }}>
                      {item.target}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block mt-4 overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th
                    className="text-left text-xs font-semibold px-3"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {dict.hero.metrics.columns.metric}
                  </th>
                  <th
                    className="text-left text-xs font-semibold px-3"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {dict.hero.metrics.columns.baseline}
                  </th>
                  <th
                    className="text-left text-xs font-semibold px-3"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {dict.hero.metrics.columns.current}
                  </th>
                  <th
                    className="text-left text-xs font-semibold px-3"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {dict.hero.metrics.columns.target}
                  </th>
                </tr>
              </thead>
              <tbody>
                {metricItems.map((item) => (
                  <tr key={item.label} className="bg-white/5">
                    <td className="px-3 py-2 rounded-l-lg font-medium" style={{ color: '#fff' }}>
                      {item.label}
                    </td>
                    <td className="px-3 py-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {item.baseline}
                    </td>
                    <td className="px-3 py-2 font-semibold" style={{ color: '#86efac' }}>
                      {item.current}
                    </td>
                    <td className="px-3 py-2 rounded-r-lg font-semibold" style={{ color: '#93c5fd' }}>
                      {item.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 mx-auto max-w-md grid grid-cols-2 gap-y-4 gap-x-6 sm:hidden">
          <div className="text-center">
            <div className="text-xl font-bold" style={{ color: '#fff' }}>
              {stats.totalResources}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isZh ? '资源条目' : 'Resources'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold" style={{ color: '#fff' }}>
              7
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isZh ? '学习章节' : 'Lessons'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold" style={{ color: '#fff' }}>
              {isZh ? '中英双语' : 'Bilingual'}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isZh ? '内容覆盖' : 'Coverage'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold" style={{ color: '#fff' }}>
              OSS
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isZh ? '开源项目' : 'Open Source'}
            </div>
          </div>
        </div>

        <div className="hidden sm:mt-16 sm:flex items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: '#fff' }}>
              {stats.totalResources}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isZh ? '资源条目' : 'Resources'}
            </div>
          </div>
          <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: '#fff' }}>
              7
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isZh ? '学习章节' : 'Lessons'}
            </div>
          </div>
          <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: '#fff' }}>
              {isZh ? '中英双语' : 'Bilingual'}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isZh ? '内容覆盖' : 'Coverage'}
            </div>
          </div>
          <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: '#fff' }}>
              OSS
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isZh ? '开源项目' : 'Open Source'}
            </div>
          </div>
        </div>

        <div className="mt-12 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
