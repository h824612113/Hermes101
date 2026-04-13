export interface Resource {
  title: string;
  desc: string;
  url: string;
  source: string;
  sourceIcon?: string;
  lang: 'zh' | 'en';
  category: ResourceCategory;
  featured?: boolean;
  tags?: string[];
}

export type ResourceCategory =
  | 'official'
  | 'getting-started'
  | 'channel-integration'
  | 'skill-dev'
  | 'video'
  | 'deep-dive'
  | 'tools'
  | 'cloud-deploy'
  | 'use-cases';

export const categoryMeta: Record<
  ResourceCategory,
  { icon: string; label: string; labelEn: string; color: string }
> = {
  official: {
    icon: '📖',
    label: '官方资源',
    labelEn: 'Official',
    color: 'blue',
  },
  'getting-started': {
    icon: '🏁',
    label: '入门部署',
    labelEn: 'Getting Started',
    color: 'green',
  },
  'channel-integration': {
    icon: '📱',
    label: '平台接入',
    labelEn: 'Channels',
    color: 'purple',
  },
  'skill-dev': {
    icon: '🧩',
    label: '技能开发',
    labelEn: 'Skills',
    color: 'orange',
  },
  video: {
    icon: '📹',
    label: '视频教程',
    labelEn: 'Videos',
    color: 'red',
  },
  'deep-dive': {
    icon: '🔬',
    label: '深度文章',
    labelEn: 'Deep Dives',
    color: 'indigo',
  },
  tools: {
    icon: '🔧',
    label: '工具与插件',
    labelEn: 'Tools',
    color: 'teal',
  },
  'cloud-deploy': {
    icon: '☁️',
    label: '云平台部署',
    labelEn: 'Cloud Deploy',
    color: 'sky',
  },
  'use-cases': {
    icon: '💡',
    label: '玩法与场景',
    labelEn: 'Use Cases',
    color: 'amber',
  },
};

export const resources: Resource[] = [
  // ============ Official Resources ============
  {
    title: 'Hermes Agent 官网',
    desc: 'Nous Research 官方主页，包含安装、特性与入口链接',
    url: 'https://hermes-agent.nousresearch.com/',
    source: 'Nous Research',
    lang: 'zh',
    category: 'official',
    featured: true,
    tags: ['官网', '必读'],
  },
  {
    title: 'Hermes Agent 文档首页',
    desc: '官方完整文档，覆盖入门、配置、特性与开发扩展',
    url: 'https://hermes-agent.nousresearch.com/docs/',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'official',
    featured: true,
    tags: ['文档', '必读'],
  },
  {
    title: 'Hermes Docs Sitemap',
    desc: '文档目录索引，方便快速定位全部章节',
    url: 'https://hermes-agent.nousresearch.com/docs/sitemap.xml',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'official',
    tags: ['索引', '导航'],
  },
  {
    title: 'GitHub — NousResearch/hermes-agent',
    desc: 'Hermes Agent 主仓库、Issue 与 Release 发布入口',
    url: 'https://github.com/NousResearch/hermes-agent',
    source: 'GitHub',
    lang: 'en',
    category: 'official',
    featured: true,
    tags: ['源码', '开源'],
  },
  {
    title: 'GitHub Releases — Hermes Agent',
    desc: '查看最新版本发布记录与变更日志',
    url: 'https://github.com/NousResearch/hermes-agent/releases',
    source: 'GitHub Releases',
    lang: 'en',
    category: 'official',
    tags: ['发布', '更新'],
  },
  {
    title: 'Hermes Agent README',
    desc: '官方 README，包含安装命令、使用方式与文档索引',
    url: 'https://raw.githubusercontent.com/NousResearch/hermes-agent/main/README.md',
    source: 'GitHub',
    lang: 'en',
    category: 'official',
    tags: ['README'],
  },
  {
    title: 'Nous Portal',
    desc: 'Nous 官方模型与账号入口（部分网络环境可能需要浏览器验证）',
    url: 'https://portal.nousresearch.com/',
    source: 'Nous Portal',
    lang: 'en',
    category: 'official',
    featured: true,
    tags: ['模型平台', '官方入口'],
  },
  {
    title: 'Nous Research Discord',
    desc: '官方社区交流渠道',
    url: 'https://discord.gg/NousResearch',
    source: 'Discord',
    lang: 'en',
    category: 'official',
    tags: ['社区'],
  },

  // ============ Getting Started ============
  {
    title: 'Quickstart',
    desc: '官方最快上手路径：安装、初始化、首次对话',
    url: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'getting-started',
    featured: true,
    tags: ['快速上手'],
  },
  {
    title: 'Installation',
    desc: '官方安装文档，覆盖 Linux/macOS/WSL2 等环境',
    url: 'https://hermes-agent.nousresearch.com/docs/getting-started/installation',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'getting-started',
    tags: ['安装'],
  },
  {
    title: 'Termux (Android)',
    desc: 'Android Termux 手动安装与兼容性说明',
    url: 'https://hermes-agent.nousresearch.com/docs/getting-started/termux',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'getting-started',
    tags: ['Termux', 'Android'],
  },
  {
    title: 'Learning Path',
    desc: '官方学习路径建议，适合系统化学习',
    url: 'https://hermes-agent.nousresearch.com/docs/getting-started/learning-path',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'getting-started',
    tags: ['学习路径'],
  },

  // ============ Channel Integration ============
  {
    title: 'Messaging Gateway',
    desc: 'Telegram / Discord / Slack / WhatsApp / Signal 等渠道接入指南',
    url: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'channel-integration',
    featured: true,
    tags: ['Telegram', 'Discord', 'Slack'],
  },
  {
    title: 'Team Telegram Assistant Guide',
    desc: '官方示例：团队 Telegram 助手搭建方案',
    url: 'https://hermes-agent.nousresearch.com/docs/guides/team-telegram-assistant',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'channel-integration',
    tags: ['团队协作', 'Telegram'],
  },

  // ============ Skills ============
  {
    title: 'Skills System',
    desc: '官方技能系统说明：安装、使用与维护',
    url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/skills',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'skill-dev',
    featured: true,
    tags: ['Skills'],
  },
  {
    title: 'Creating Skills',
    desc: '开发者指南：如何创建和发布自定义技能',
    url: 'https://hermes-agent.nousresearch.com/docs/developer-guide/creating-skills',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'skill-dev',
    tags: ['开发', '技能'],
  },
  {
    title: 'Skills Catalog Reference',
    desc: '官方技能目录参考文档',
    url: 'https://hermes-agent.nousresearch.com/docs/reference/skills-catalog',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'skill-dev',
    tags: ['目录', '参考'],
  },

  // ============ Tools ============
  {
    title: 'OpenRouter — Nous/Hermes Models',
    desc: 'OpenRouter 模型目录，可检索 Hermes 系列模型',
    url: 'https://openrouter.ai/models?q=nous+hermes',
    source: 'OpenRouter',
    lang: 'en',
    category: 'tools',
    featured: true,
    tags: ['模型', 'OpenRouter'],
  },
  {
    title: 'Ollama — nous-hermes2',
    desc: 'Ollama 本地运行 Nous Hermes 2 模型页面',
    url: 'https://ollama.com/library/nous-hermes2',
    source: 'Ollama',
    lang: 'en',
    category: 'tools',
    tags: ['本地模型', 'Ollama'],
  },
  {
    title: 'Hugging Face (Mirror) — NousResearch',
    desc: 'NousResearch 组织镜像页，可查看 Hermes 模型与评测数据集',
    url: 'https://hf-mirror.com/NousResearch',
    source: 'Hugging Face',
    lang: 'en',
    category: 'tools',
    tags: ['HF', '模型'],
  },
  {
    title: 'hermes-paperclip-adapter',
    desc: 'Hermes 与 Paperclip 集成适配器',
    url: 'https://github.com/NousResearch/hermes-paperclip-adapter',
    source: 'GitHub',
    lang: 'en',
    category: 'tools',
    tags: ['Adapter', 'Integration'],
  },

  // ============ Use Cases ============
  {
    title: 'Automate with Cron',
    desc: '官方指南：使用 Cron 实现自动化任务',
    url: 'https://hermes-agent.nousresearch.com/docs/guides/automate-with-cron',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'use-cases',
    featured: true,
    tags: ['自动化', 'Cron'],
  },
  {
    title: 'Daily Briefing Bot',
    desc: '官方示例：搭建每日简报机器人',
    url: 'https://hermes-agent.nousresearch.com/docs/guides/daily-briefing-bot',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'use-cases',
    tags: ['简报', 'Bot'],
  },
  {
    title: 'Use MCP with Hermes',
    desc: '官方指南：通过 MCP 扩展 Hermes 能力',
    url: 'https://hermes-agent.nousresearch.com/docs/guides/use-mcp-with-hermes',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'use-cases',
    tags: ['MCP', '扩展'],
  },

  // ============ Cloud Deploy ============
  {
    title: '腾讯云 — Hermes Agent 架构全解',
    desc: '中文长文，覆盖自进化循环与多层记忆设计',
    url: 'https://cloud.tencent.com/developer/article/2652528',
    source: '腾讯云',
    lang: 'zh',
    category: 'cloud-deploy',
    featured: true,
    tags: ['中文', '架构'],
  },
  {
    title: '博客园 — Hermes Agent 安装配置完整指南',
    desc: '中文实操安装文，适合国内用户快速部署',
    url: 'https://www.cnblogs.com/qiniushanghai/p/19851330',
    source: '博客园',
    lang: 'zh',
    category: 'cloud-deploy',
    tags: ['中文', '部署'],
  },

  // ============ Deep Dive ============
  {
    title: 'Architecture (Official)',
    desc: '官方开发者架构文档，理解 Hermes 运行机制的核心入口',
    url: 'https://hermes-agent.nousresearch.com/docs/developer-guide/architecture',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'deep-dive',
    featured: true,
    tags: ['架构', '开发者'],
  },
  {
    title: 'Agent Loop Internals',
    desc: '官方内部机制文档：Agent Loop 与执行流',
    url: 'https://hermes-agent.nousresearch.com/docs/developer-guide/agent-loop',
    source: 'Hermes Docs',
    lang: 'en',
    category: 'deep-dive',
    tags: ['内部机制'],
  },

  // ============ Video ============
  {
    title: 'YouTube Search — Hermes Agent',
    desc: '按关键词聚合视频教程，便于追踪最新社区演示',
    url: 'https://www.youtube.com/results?search_query=NousResearch+Hermes+Agent',
    source: 'YouTube',
    lang: 'en',
    category: 'video',
    tags: ['视频', '社区'],
  },
];

export function getFeaturedResources(): Resource[] {
  return resources.filter((r) => r.featured);
}

export function getResourcesByCategory(cat: ResourceCategory): Resource[] {
  return resources.filter((r) => r.category === cat);
}

export function getResourcesByLang(lang: 'zh' | 'en'): Resource[] {
  return resources.filter((r) => r.lang === lang);
}

export const stats = {
  totalResources: resources.length,
  totalCategories: Object.keys(categoryMeta).length,
  zhResources: resources.filter((r) => r.lang === 'zh').length,
  enResources: resources.filter((r) => r.lang === 'en').length,
};
