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
    icon: '👋',
    title: '初识 Hermes Agent',
    desc: '了解 AI 私人助理的真正含义，以及 Hermes Agent 能为你做什么。',
    localLink: '/zh/day/1',
  },
  {
    day: 2,
    icon: '💬',
    title: '深入对话',
    desc: '掌握与 AI 助理对话的技巧，让沟通更高效、更自然。',
    localLink: '/zh/day/2',
  },
  {
    day: 3,
    icon: '📁',
    title: '文件与代码',
    desc: '让 AI 助理帮你处理文件、写代码、执行脚本。',
    localLink: '/zh/day/3',
  },
  {
    day: 4,
    icon: '🌐',
    title: '网络能力',
    desc: '搜索、抓取、API 调用，让 AI 助理连接互联网。',
    localLink: '/zh/day/4',
  },
  {
    day: 5,
    icon: '🧩',
    title: '技能扩展',
    desc: '安装社区技能，让 AI 助理学会更多能力。',
    localLink: '/zh/day/5',
  },
  {
    day: 6,
    icon: '⏰',
    title: '自动化',
    desc: '定时任务、心跳检测、主动推送，让 AI 助理自主工作。',
    localLink: '/zh/day/6',
  },
  {
    day: 7,
    icon: '🚀',
    title: '高级技巧',
    desc: '多 Agent、浏览器控制、设备联动，解锁全部潜力。',
    localLink: '/zh/day/7',
  },
];

const daysEn = [
  {
    day: 1,
    icon: '👋',
    title: 'Meet Hermes Agent',
    desc: 'Understand what a true AI assistant means and what Hermes Agent can do for you.',
    localLink: '/day/1',
  },
  {
    day: 2,
    icon: '💬',
    title: 'Deep Conversations',
    desc: 'Master the art of communicating with your AI assistant effectively.',
    localLink: '/day/2',
  },
  {
    day: 3,
    icon: '📁',
    title: 'Files & Code',
    desc: 'Let your AI assistant handle files, write code, and run scripts.',
    localLink: '/day/3',
  },
  {
    day: 4,
    icon: '🌐',
    title: 'Web Capabilities',
    desc: 'Search, scrape, API calls. Connect your AI assistant to the internet.',
    localLink: '/day/4',
  },
  {
    day: 5,
    icon: '🧩',
    title: 'Skill Extensions',
    desc: 'Install community skills to teach your assistant new abilities.',
    localLink: '/day/5',
  },
  {
    day: 6,
    icon: '⏰',
    title: 'Automation',
    desc: 'Cron jobs, heartbeat checks, proactive alerts. Let your AI work autonomously.',
    localLink: '/day/6',
  },
  {
    day: 7,
    icon: '🚀',
    title: 'Advanced Techniques',
    desc: 'Multi-agent, browser control, device integration. Unlock full potential.',
    localLink: '/day/7',
  },
];

export default function LearningPath({ locale, dict }: LearningPathProps) {
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
    <section id="getting-started" ref={sectionRef} className="py-12 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '7天学习路径' : '7-Day Learning Path'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isZh 
              ? '从入门到进阶，每天一个主题，循序渐进掌握 Hermes Agent 的全部能力。'
              : 'From beginner to advanced, one topic per day. Progressively master all Hermes Agent capabilities.'
            }
          </p>
        </div>

        {/* Day cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {days.map((d, i) => (
            <a
              key={d.day}
              href={d.localLink}
              className="reveal card-hover group block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Day badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[10px] sm:text-xs font-bold text-primary/40 bg-primary/5 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                DAY {d.day}
              </div>

              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{d.icon}</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">{d.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 sm:mb-4">{d.desc}</p>
              <span className="text-primary text-xs sm:text-sm font-medium group-hover:translate-x-1 inline-block transition-transform duration-300">
                {isZh ? '查看详情 →' : 'Learn more →'}
              </span>
            </a>
          ))}
        </div>

        {/* Course CTA - Chinese only */}
        {isZh && (
          <div className="mt-10 sm:mt-16 reveal">
            <a
              href="https://xiaomo.dev/course/hermes-ai-assistant/"
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎓</span>
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">实战训练营</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">AI 私人助理实战课</h3>
                <p className="text-white/80 text-sm sm:text-base mb-4">21节视频课程，手把手带你从零部署专属 AI 助理，打通多渠道自动化工作流</p>
                <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300">
                  了解详情 <span>→</span>
                </span>
              </div>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
