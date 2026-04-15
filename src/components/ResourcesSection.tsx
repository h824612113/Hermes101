'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  getFeaturedResources,
  categoryMeta,
  resources,
  stats,
  type Resource,
} from '@/data/resources';
import { Dictionary } from '@/lib/i18n';

interface ResourcesSectionProps {
  locale: 'en' | 'zh';
  dict: Dictionary;
}

const colorMap: Record<string, string> = {
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  green: 'border-green-200 bg-green-50 text-green-700',
  purple: 'border-purple-200 bg-purple-50 text-purple-700',
  orange: 'border-orange-200 bg-orange-50 text-orange-700',
  red: 'border-red-200 bg-red-50 text-red-700',
  indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  teal: 'border-teal-200 bg-teal-50 text-teal-700',
  sky: 'border-sky-200 bg-sky-50 text-sky-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
};

function ResourceCard({ r, i, isZh }: { r: Resource; i: number; isZh: boolean }) {
  const meta = categoryMeta[r.category];
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="reveal card-hover group block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 hover:border-gray-200 relative"
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <span
          className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border ${
            r.lang === 'zh'
              ? 'border-red-200 bg-red-50 text-red-600'
              : 'border-blue-200 bg-blue-50 text-blue-600'
          }`}
        >
          {r.lang === 'zh' ? '中文' : 'EN'}
        </span>
      </div>

      <span
        className={`inline-flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border mb-2 sm:mb-3 ${
          colorMap[meta.color] || colorMap.blue
        }`}
      >
        {meta.icon} {isZh ? meta.label : meta.labelEn}
      </span>

      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors pr-8 sm:pr-10 line-clamp-2">
        {r.title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-2 sm:mb-3 line-clamp-2">{r.desc}</p>

      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-xs text-gray-400">{r.source}</span>
        <span className="text-blue-600 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isZh ? '查看 ↗' : 'Open ↗'}
        </span>
      </div>
    </a>
  );
}

export default function ResourcesSection({ locale }: ResourcesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = getFeaturedResources();
  const isZh = locale === 'zh';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const sourceList = useMemo(
    () => Array.from(new Set(resources.map((item) => item.source))).slice(0, 10),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="library" ref={sectionRef} className="py-12 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            📚 {isZh ? '资料库' : 'Knowledge Library'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '按主题整理的 Hermes 参考链接' : 'A Topic-Organized Hermes Reference Set'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isZh
              ? '覆盖官方文档、部署、技能、工具与案例。优先收录可复现、可验证的一手资料。'
              : 'Covers official docs, deployment, skills, tools, and use cases with reproducible, verifiable sources.'}
          </p>
        </div>

        <div className="reveal mb-8 mx-auto max-w-3xl">
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
            <span className="text-lg mt-0.5">⚠️</span>
            <div>
              <span className="font-semibold">{isZh ? '安装提醒：' : 'Install Reminder: '}</span>
              {isZh
                ? '第三方技能先看源码和权限范围，再在隔离环境测试。'
                : 'Review source code and permission scope before installing third-party skills.'}
              <a
                href="https://hermes-agent.nousresearch.com/docs/user-guide/security"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-amber-700 underline hover:text-amber-900"
              >
                {isZh ? '官方安全指南 ↗' : 'Security Guide ↗'}
              </a>
            </div>
          </div>
        </div>

        <div className="reveal flex flex-wrap items-center justify-center gap-4 md:gap-10 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">{stats.totalResources}</span>
            <span className="text-sm text-gray-500">{isZh ? '条资源' : 'Resources'}</span>
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">{stats.zhResources}</span>
            <span className="text-sm text-gray-500">{isZh ? '中文' : 'Chinese'}</span>
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-purple-600">{stats.enResources}</span>
            <span className="text-sm text-gray-500">{isZh ? '英文' : 'English'}</span>
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">{stats.totalCategories}</span>
            <span className="text-sm text-gray-500">{isZh ? '分类' : 'Categories'}</span>
          </div>
        </div>

        <div className="reveal flex flex-wrap items-center justify-center gap-4 mb-12 text-sm text-gray-400">
          {isZh ? '当前来源：' : 'Current Sources: '}
          {sourceList.map((source) => (
            <span
              key={source}
              className="px-3 py-1 bg-white rounded-full border border-gray-100 text-gray-500 text-xs"
            >
              {source}
            </span>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {featured.map((r, i) => (
            <ResourceCard key={r.url} r={r} i={i} isZh={isZh} />
          ))}
        </div>

        <div className="text-center reveal">
          <a
            href={`${prefix}/resources`}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            {isZh ? '进入完整资源索引' : 'Open Full Resource Index'}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <p className="text-gray-500 text-sm mt-3">
            {isZh ? '欢迎补充高质量链接 · ' : 'High-quality additions are welcome · '}
            <a
              href="https://github.com/h824612113/Hermes101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {isZh ? '提交 PR' : 'Submit a PR'}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
