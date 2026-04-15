'use client';

import { useEffect, useRef } from 'react';
import { Dictionary } from '@/lib/i18n';

interface CommunityProps {
  locale: 'en' | 'zh';
  dict: Dictionary;
}

const itemsZh = [
  {
    icon: '📖',
    title: '官方文档',
    desc: '快速定位安装、配置、技能与架构说明',
    link: 'https://hermes-agent.nousresearch.com/docs/',
    color: 'hover:border-blue-300 hover:bg-blue-50',
  },
  {
    icon: '💬',
    title: 'Discord 社区',
    desc: '提问排障、分享经验、同步版本变化',
    link: 'https://discord.gg/NousResearch',
    color: 'hover:border-indigo-300 hover:bg-indigo-50',
  },
  {
    icon: '🧩',
    title: 'Skills Hub',
    desc: '查找可复用技能并评估适配场景',
    link: 'https://agentskills.io',
    color: 'hover:border-green-300 hover:bg-green-50',
  },
  {
    icon: '🐞',
    title: '问题反馈',
    desc: '通过 Issue 提交 bug 和功能建议',
    link: 'https://github.com/h824612113/Hermes101/issues',
    color: 'hover:border-orange-300 hover:bg-orange-50',
  },
  {
    icon: '📝',
    title: '飞书知识库',
    desc: '中文图文路线与实践记录',
    link: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf',
    color: 'hover:border-cyan-300 hover:bg-cyan-50',
  },
  {
    icon: '⭐',
    title: 'Hermes 101 仓库',
    desc: '查看源码、提交 PR、一起维护内容',
    link: 'https://github.com/h824612113/Hermes101',
    color: 'hover:border-yellow-300 hover:bg-yellow-50',
  },
];

const itemsEn = [
  {
    icon: '📖',
    title: 'Official Docs',
    desc: 'Installation, config, skills, and architecture references',
    link: 'https://hermes-agent.nousresearch.com/docs/',
    color: 'hover:border-blue-300 hover:bg-blue-50',
  },
  {
    icon: '💬',
    title: 'Discord Community',
    desc: 'Troubleshooting, release discussions, and implementation tips',
    link: 'https://discord.gg/NousResearch',
    color: 'hover:border-indigo-300 hover:bg-indigo-50',
  },
  {
    icon: '🧩',
    title: 'Skills Hub',
    desc: 'Discover reusable skills and evaluate fit before install',
    link: 'https://agentskills.io',
    color: 'hover:border-green-300 hover:bg-green-50',
  },
  {
    icon: '🐞',
    title: 'Issue Tracker',
    desc: 'Report bugs and request features in a structured way',
    link: 'https://github.com/h824612113/Hermes101/issues',
    color: 'hover:border-orange-300 hover:bg-orange-50',
  },
  {
    icon: '📝',
    title: 'Feishu Wiki',
    desc: 'Chinese write-ups and practical walkthroughs',
    link: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf',
    color: 'hover:border-cyan-300 hover:bg-cyan-50',
  },
  {
    icon: '⭐',
    title: 'Hermes 101 Repo',
    desc: 'Source code, PRs, and contributor discussions',
    link: 'https://github.com/h824612113/Hermes101',
    color: 'hover:border-yellow-300 hover:bg-yellow-50',
  },
];

export default function Community({ locale }: CommunityProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isZh = locale === 'zh';
  const items = isZh ? itemsZh : itemsEn;

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
    <section id="community" ref={sectionRef} className="py-12 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            🤝 {isZh ? '协作网络' : 'Collaboration Network'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '遇到问题时，去哪里找答案' : 'Where to Go When You Get Stuck'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isZh
              ? '把文档、社区、问题反馈和仓库入口放在一个地方，减少来回切换。'
              : 'Keep docs, community channels, issue reporting, and repository access in one place.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item, i) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal card-hover group block bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all duration-300 ${item.color}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
              <div className="mt-4 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isZh ? '打开 ↗' : 'Open ↗'}
              </div>
            </a>
          ))}
        </div>

        <div className="reveal bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#fff' }}>
            {isZh ? '一起把 Hermes 101 做得更实用' : 'Help Keep Hermes 101 Practical'}
          </h3>
          <p className="mb-6 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {isZh
              ? '欢迎补充真实案例、部署记录和排障经验。'
              : 'Contribute real use cases, deployment notes, and troubleshooting insights.'}
          </p>
          <a
            href="https://github.com/h824612113/Hermes101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {isZh ? '提交改进' : 'Contribute'}
          </a>
        </div>
      </div>
    </section>
  );
}
