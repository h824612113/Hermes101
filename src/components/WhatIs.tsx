'use client';

import { useEffect, useRef } from 'react';
import { Dictionary } from '@/lib/i18n';

interface WhatIsProps {
  locale: 'en' | 'zh';
  dict: Dictionary;
}

const featuresZh = [
  {
    icon: '🧩',
    title: '工具可编排',
    desc: '把搜索、读写文件、自动化脚本和外部 API 组织成可复用流程。',
  },
  {
    icon: '🛰️',
    title: '多渠道在线',
    desc: '支持接入 Telegram、Discord 等渠道，消息和任务在同一套上下文里运行。',
  },
  {
    icon: '🧠',
    title: '记忆可管理',
    desc: '通过配置文件控制人格、偏好和长期记忆策略，而不是依赖临时提示词。',
  },
  {
    icon: '🔒',
    title: '部署自主',
    desc: '本地或云端都可运行，模型、密钥、日志的边界由你自己定义。',
  },
];

const featuresEn = [
  {
    icon: '🧩',
    title: 'Composable Tools',
    desc: 'Turn search, files, scripts, and external APIs into reusable execution flows.',
  },
  {
    icon: '🛰️',
    title: 'Multi-Channel Runtime',
    desc: 'Connect Telegram, Discord, and other channels while sharing one working context.',
  },
  {
    icon: '🧠',
    title: 'Configurable Memory',
    desc: 'Control persona, preferences, and long-term behavior via explicit configuration.',
  },
  {
    icon: '🔒',
    title: 'Deployment Control',
    desc: 'Run locally or in the cloud with clear ownership of models, keys, and logs.',
  },
];

export default function WhatIs({ locale }: WhatIsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isZh = locale === 'zh';
  const features = isZh ? featuresZh : featuresEn;

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
    <section id="capabilities" ref={sectionRef} className="py-12 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isZh ? 'Hermes Agent 到底能做什么？' : 'What Can Hermes Agent Actually Do?'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isZh
              ? '把它当成“可编程执行层”更准确：不仅能聊天，还能在你定义的规则下持续完成任务。'
              : 'Think of it as a programmable execution layer, not just a chatbot. It runs tasks continuously under your rules.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="reveal card-hover bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-100"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{f.icon}</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">{f.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal grid sm:grid-cols-2 gap-4">
          <a
            href="https://hermes-agent.nousresearch.com/docs/getting-started/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="text-sm font-semibold text-gray-900 mb-1">
              {isZh ? '官方快速开始' : 'Official Quickstart'}
            </div>
            <div className="text-sm text-gray-600">
              {isZh
                ? '最快跑通安装与首轮对话。'
                : 'Fastest path to install and complete your first run.'}
            </div>
          </a>

          <a
            href="https://github.com/NousResearch/hermes-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-gray-200 p-4 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <div className="text-sm font-semibold text-gray-900 mb-1">GitHub</div>
            <div className="text-sm text-gray-600">
              {isZh
                ? '查看 Release、Issue 和社区讨论。'
                : 'Track releases, issues, and implementation details.'}
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
