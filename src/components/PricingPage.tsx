'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import { getDictionary, Locale } from '@/lib/i18n';

interface PricingPageProps {
  locale: Locale;
}

const chaptersZh = [
  { ch: 1, title: 'SOUL.md 进阶：让 AI 真正懂你', desc: '人格文件的高级写法、多场景切换、团队共享' },
  { ch: 2, title: '多模型路由策略', desc: '用便宜模型干 80% 的活，月费从 $50 压到 $5' },
  { ch: 3, title: '三层记忆体系实战', desc: '会话记忆、持久记忆、Skill 记忆的组织与优化' },
  { ch: 4, title: '技能开发从零到发布', desc: '写一个真正有用的 Skill，从模板到实战' },
  { ch: 5, title: 'Skill 审计与安全', desc: '三层安全边界：toolset 开关 / sandbox / 工具过滤' },
  { ch: 6, title: '多平台部署', desc: 'Telegram + Discord + 飞书同时跑，一个实例多入口' },
  { ch: 7, title: 'Docker 沙箱', desc: '让 AI 安全地跑不信任的代码' },
  { ch: 8, title: '成本控制实战', desc: '真实账单拆解，四个策略把月费压到 $5 以内' },
  { ch: 9, title: '自建 API 中转', desc: '用 sub2api 搭自己的模型网关，统一管理+变现' },
  { ch: 10, title: 'Debug 心法', desc: '排错三步法 + 让 AI 帮你修 AI' },
  { ch: 11, title: '工作流模板', desc: '5 个即用自动化：日报、代码审查、知识整理、会议纪要、项目状态' },
  { ch: 12, title: '本地知识库搭建', desc: '用 Hermes + 嵌入模型构建私有知识库，支持语义检索和自动更新' },
  { ch: 13, title: 'Hermes × Obsidian 联动', desc: '让 AI 助手读写你的 Obsidian 笔记库，自动整理、关联和检索' },
  { ch: 14, title: 'Hermes × OpenClaw 协作', desc: '两大开源 Agent 框架如何互补：Hermes 做执行，OpenClaw 做编排' },
];

const chaptersEn = [
  { ch: 1, title: 'Advanced SOUL.md', desc: 'Advanced persona files, multi-scenario switching, team sharing' },
  { ch: 2, title: 'Multi-Model Routing', desc: 'Use cheap models for 80% of tasks, cut monthly cost from $50 to $5' },
  { ch: 3, title: 'Three-Layer Memory System', desc: 'Session, persistent, and Skill memory organization' },
  { ch: 4, title: 'Skill Development Guide', desc: 'Build a truly useful Skill from template to production' },
  { ch: 5, title: 'Skill Audit & Security', desc: 'Three security layers: toolset toggle / sandbox / tool filtering' },
  { ch: 6, title: 'Multi-Platform Deployment', desc: 'Run Telegram + Discord + Feishu from a single instance' },
  { ch: 7, title: 'Docker Sandbox', desc: 'Run untrusted code safely in isolated containers' },
  { ch: 8, title: 'Cost Control Playbook', desc: 'Real billing breakdown, four strategies to stay under $5/month' },
  { ch: 9, title: 'Self-Hosted API Relay', desc: 'Build your own model gateway with sub2api' },
  { ch: 10, title: 'Debug Playbook', desc: 'Three-step troubleshooting + let AI debug itself' },
  { ch: 11, title: 'Workflow Templates', desc: '5 ready-to-use automations: briefing, code review, KB, meeting notes, status' },
  { ch: 12, title: 'Local Knowledge Base', desc: 'Build a private KB with Hermes + embedding models, semantic search and auto-update' },
  { ch: 13, title: 'Hermes × Obsidian', desc: 'Let your AI assistant read/write your Obsidian vault — auto-organize, link, and retrieve' },
  { ch: 14, title: 'Hermes × OpenClaw', desc: 'How two open-source agent frameworks complement each other: Hermes executes, OpenClaw orchestrates' },
];

export default function PricingPage({ locale }: PricingPageProps) {
  const dict = getDictionary(locale);
  const isZh = locale === 'zh';
  const chapters = isZh ? chaptersZh : chaptersEn;

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <span className="text-lg">🔒</span>
              <span className="text-sm font-semibold text-blue-700">
                {isZh ? '付费进阶内容' : 'Premium Content'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isZh ? 'Hermes Agent 进阶实战' : 'Hermes Agent Advanced Guide'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isZh
                ? '7 天免费教程带你入门，14 章付费内容带你从"能用"到"用好"。覆盖模型路由、记忆体系、安全审计、成本控制、知识库搭建、Obsidian 联动等核心主题。'
                : 'The free 7-day tutorial gets you started. These 14 premium chapters take you from "it works" to "it works well" — covering model routing, memory, security, cost control, knowledge bases, Obsidian integration, and more.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10">
            <div className="px-6 py-4 bg-gray-900 text-white">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">
                  {isZh ? '章节目录' : 'Chapter List'}
                </h2>
                <span className="text-sm text-gray-400">
                  {isZh ? '共 14 章' : '14 Chapters'}
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {chapters.map((c) => (
                <div key={c.ch} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center">
                    {c.ch}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{c.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">
              {isZh ? '获取完整付费内容' : 'Get Full Premium Access'}
            </h2>
            <p className="mb-6 max-w-lg mx-auto text-blue-100">
              {isZh
                ? '包含 14 章深度实战教程 + 持续更新。一次购买，永久访问。'
                : 'Includes all 14 deep-dive chapters with ongoing updates. One-time purchase, lifetime access.'}
            </p>
            <a
              href="https://acne8it01tyq.feishu.cn/wiki/AedTwCM5oiijCUkFVAmcXmopnQe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {isZh ? '前往飞书知识库购买' : 'Purchase on Feishu Wiki'}
              <span>→</span>
            </a>
          </div>

          <div className="mt-10 text-center">
            <a
              href={isZh ? '/zh' : '/'}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← {isZh ? '返回首页查看免费 7 天教程' : 'Back to free 7-day tutorial'}
            </a>
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
