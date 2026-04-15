'use client';

import { useEffect, useRef } from 'react';
import { Dictionary } from '@/lib/i18n';

interface SkillsProps {
  locale: 'en' | 'zh';
  dict: Dictionary;
}

const tracksZh = [
  {
    icon: '⚙️',
    title: '自动化执行',
    summary: '定时任务、状态检查、告警推送',
    examples: ['cron', 'health-check', 'notifier'],
  },
  {
    icon: '🗂️',
    title: '知识处理',
    summary: '文档检索、摘要、结构化提取',
    examples: ['doc-reader', 'summary', 'table-parser'],
  },
  {
    icon: '🌐',
    title: '网页操作',
    summary: '抓取、表单填写、页面巡检',
    examples: ['browser-runner', 'scraper', 'ui-audit'],
  },
  {
    icon: '📨',
    title: '沟通协作',
    summary: '邮件、IM、看板同步',
    examples: ['telegram', 'slack', 'smtp-send'],
  },
  {
    icon: '🧪',
    title: '开发工作流',
    summary: '代码生成、测试、发布检查',
    examples: ['repo-search', 'test-runner', 'release-check'],
  },
  {
    icon: '🧭',
    title: '个人效率',
    summary: '日程整理、待办分解、日报周报',
    examples: ['calendar-assistant', 'task-breakdown', 'daily-brief'],
  },
];

const tracksEn = [
  {
    icon: '⚙️',
    title: 'Automation',
    summary: 'Scheduling, health checks, and proactive alerts',
    examples: ['cron', 'health-check', 'notifier'],
  },
  {
    icon: '🗂️',
    title: 'Knowledge Ops',
    summary: 'Retrieval, summarization, and structured extraction',
    examples: ['doc-reader', 'summary', 'table-parser'],
  },
  {
    icon: '🌐',
    title: 'Web Runtime',
    summary: 'Scraping, form actions, and UI verification',
    examples: ['browser-runner', 'scraper', 'ui-audit'],
  },
  {
    icon: '📨',
    title: 'Communication',
    summary: 'Email, chat channels, and status sync',
    examples: ['telegram', 'slack', 'smtp-send'],
  },
  {
    icon: '🧪',
    title: 'Dev Workflow',
    summary: 'Code generation, testing, and release checks',
    examples: ['repo-search', 'test-runner', 'release-check'],
  },
  {
    icon: '🧭',
    title: 'Personal Ops',
    summary: 'Planning, task breakdown, and daily reviews',
    examples: ['calendar-assistant', 'task-breakdown', 'daily-brief'],
  },
];

export default function Skills({ locale }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isZh = locale === 'zh';
  const tracks = isZh ? tracksZh : tracksEn;

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
    <section id="toolkit" ref={sectionRef} className="py-12 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-4">
            <span className="text-2xl">🧰</span>
            <span className="text-sm font-semibold text-primary">
              {isZh ? '能力包与技能组合' : 'Capability Packs'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '先选场景，再选技能' : 'Pick Use Cases Before Skills'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isZh
              ? '把技能当作“可维护模块”，而不是一次性脚本。先定义任务目标，再决定安装哪些能力。'
              : 'Treat skills as maintainable modules, not one-off scripts. Define the job first, then install capabilities.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {tracks.map((track, i) => (
            <div
              key={track.title}
              className="reveal card-hover bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100 hover:border-primary/20 transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{track.icon}</span>
                <h3 className="text-base font-bold text-gray-900">{track.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{track.summary}</p>
              <div className="flex flex-wrap gap-2">
                {track.examples.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-200 text-xs font-mono text-gray-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal bg-gray-900 rounded-xl p-4 sm:p-6 mb-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h4 className="text-white font-semibold mb-1">
                {isZh ? '建议安装流程' : 'Suggested Installation Flow'}
              </h4>
              <p className="text-gray-400 text-sm">
                {isZh
                  ? '先在文档确认技能用途和权限，再逐个安装并测试。'
                  : 'Review purpose and permission scope in docs, then install and test incrementally.'}
              </p>
            </div>
            <div className="overflow-x-auto">
              <code className="block bg-gray-800 text-green-400 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono">
                /skills
              </code>
            </div>
          </div>
        </div>

        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            {isZh ? '查看官方 Skills 文档' : 'Read Official Skills Docs'}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="https://agentskills.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            {isZh ? '访问 Skills Hub' : 'Visit Skills Hub'}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
