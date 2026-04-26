'use client';

import { useEffect, useRef } from 'react';
import { Dictionary } from '@/lib/i18n';

interface LearningPathProps {
  locale: 'en' | 'zh';
  dict: Dictionary;
}

const daysZh = [
  {
    day: 1,
    icon: '🧭',
    title: '第 1 天：初识 Hermes Agent',
    desc: '搭建概念地图，明确 Hermes 与普通聊天助手的区别。',
    localLink: '/zh/day/1',
  },
  {
    day: 2,
    icon: '🛠️',
    title: '第 2 天：10 分钟，搭建你的助手',
    desc: '按最短路径完成安装、配置和首次可用部署。',
    localLink: '/zh/day/2',
  },
  {
    day: 3,
    icon: '🎭',
    title: '第 3 天：给助手一个灵魂',
    desc: '用人格与用户上下文，让回复风格和行为稳定下来。',
    localLink: '/zh/day/3',
  },
  {
    day: 4,
    icon: '🔌',
    title: '第 4 天：接入你的数字生活',
    desc: '把邮箱、日历、聊天平台接入统一工作流。',
    localLink: '/zh/day/4',
  },
  {
    day: 5,
    icon: '🧰',
    title: '第 5 天：解锁技能树',
    desc: '从官方技能开始，建立“安装前审查”习惯。',
    localLink: '/zh/day/5',
  },
  {
    day: 6,
    icon: '⏱️',
    title: '第 6 天：让助手主动工作',
    desc: '引入定时任务与状态检测，让它自动执行而非被动等待。',
    localLink: '/zh/day/6',
  },
  {
    day: 7,
    icon: '🚀',
    title: '第 7 天：进阶玩法 & 未来展望',
    desc: '整合多 Agent 协作与复杂场景，形成长期可维护方案。',
    localLink: '/zh/day/7',
  },
];

const daysEn = [
  {
    day: 1,
    icon: '🧭',
    title: 'Day 1: Meet Hermes Agent',
    desc: 'Build a clear mental model of Hermes and its runtime boundaries.',
    localLink: '/day/1',
  },
  {
    day: 2,
    icon: '🛠️',
    title: 'Day 2: Build Your Assistant in 10 Minutes',
    desc: 'Complete installation and first usable deployment via the shortest path.',
    localLink: '/day/2',
  },
  {
    day: 3,
    icon: '🎭',
    title: 'Day 3: Give Your Assistant a Soul',
    desc: 'Set persona and user context so behavior stays consistent over time.',
    localLink: '/day/3',
  },
  {
    day: 4,
    icon: '🔌',
    title: 'Day 4: Connect Your Digital Life',
    desc: 'Wire inboxes, calendars, and channels into one execution flow.',
    localLink: '/day/4',
  },
  {
    day: 5,
    icon: '🧰',
    title: 'Day 5: Unlock the Skill Tree',
    desc: 'Start from vetted skills and build a pre-install review checklist.',
    localLink: '/day/5',
  },
  {
    day: 6,
    icon: '⏱️',
    title: 'Day 6: Make Your Assistant Work Proactively',
    desc: 'Use scheduling and health checks to move from reactive to proactive.',
    localLink: '/day/6',
  },
  {
    day: 7,
    icon: '🚀',
    title: 'Day 7: Advanced Techniques & Future Outlook',
    desc: 'Combine multi-agent patterns for long-running production workflows.',
    localLink: '/day/7',
  },
];

export default function LearningPath({ locale }: LearningPathProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isZh = locale === 'zh';
  const days = isZh ? daysZh : daysEn;

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
    <section id="roadmap" ref={sectionRef} className="py-12 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '7 天上手路线图' : '7-Day Build Roadmap'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isZh
              ? '按“可运行优先”的顺序设计：先跑通，再增强，再自动化。'
              : 'Organized for execution-first learning: get it running, then strengthen, then automate.'}
          </p>
        </div>

        <div className="reveal mb-6 sm:mb-10 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-slate-950">
            <img
              src="/images/allpromptimages/Learning Path 路线图.png"
              alt={isZh ? 'Hermes 学习路线总览图' : 'Hermes learning roadmap visual'}
              className="block w-full h-auto object-cover"
            />
          </div>
          <p className="mt-3 text-center text-xs sm:text-sm text-gray-500">
            {isZh ? '路线总览图：直接使用你新生成的路线图。' : 'Roadmap visual: using the newly generated roadmap image.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {days.map((d, i) => (
            <a
              key={d.day}
              href={d.localLink}
              className="reveal card-hover group block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[10px] sm:text-xs font-bold text-primary/40 bg-primary/5 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                {isZh ? `第${d.day}天` : `Day ${d.day}`}
              </div>

              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{d.icon}</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">{d.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 sm:mb-4">{d.desc}</p>
              <span className="text-primary text-xs sm:text-sm font-medium group-hover:translate-x-1 inline-block transition-transform duration-300">
                {isZh ? '进入章节 →' : 'Open lesson →'}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
