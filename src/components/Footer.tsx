import { Dictionary } from '@/lib/i18n';

interface FooterProps {
  locale: 'en' | 'zh';
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
  const isZh = locale === 'zh';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <footer className="hero-glow py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Link groups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-10">
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {isZh ? '官方' : 'Official'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li><a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? 'Hermes Agent 官网' : 'Hermes Agent Website'}</a></li>
              <li><a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? '官方文档' : 'Documentation'}</a></li>
              <li><a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Hermes Agent GitHub (65k+ ⭐)</a></li>
              <li><a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? 'Skills Hub' : 'Skills Hub'}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {isZh ? '学习' : 'Learn'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li><a href="#getting-started" className="hover:text-white transition-colors">{isZh ? '7天学习路径' : '7-Day Path'}</a></li>
              <li><a href={`${prefix}/resources`} className="hover:text-white transition-colors">{isZh ? '全部资源' : 'All Resources'}</a></li>
              <li><a href="https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? '飞书知识库' : 'Feishu Wiki'}</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">{isZh ? '技能推荐' : 'Featured Skills'}</a></li>
              {isZh && (
                <li>
                  <a href="https://xiaomo.dev/course/hermes-ai-assistant/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                    🎓 实战训练营
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded">¥199</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {isZh ? '社区' : 'Community'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li><a href="https://discord.gg/NousResearch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="https://www.reddit.com/r/ThinkingDeeplyAI/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Reddit</a></li>
              <li><a href="https://xiaomo.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">🐈‍⬛ {isZh ? '认识小墨' : 'Meet Xiaomo'}</a></li>
              <li><a href="https://github.com/mengjian-github/hermes101" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? '贡献资源 (PR)' : 'Contribute (PR)'}</a></li>
              <li><a href="https://www.skill-cn.com?from=hermes101" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? 'Skill Hub 中国' : 'Skill Hub CN'}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {isZh ? '云平台' : 'Cloud Platforms'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li><a href="https://cloud.tencent.com/developer/article/2652528" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? '腾讯云实践' : 'Tencent Cloud Guide'}</a></li>
              <li><a href="https://www.cnblogs.com/qiniushanghai/p/19851330" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? '博客园实操' : 'Cnblogs Guide'}</a></li>
              <li><a href="https://ollama.com/library/nous-hermes2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ollama</a></li>
              <li><a href="https://openrouter.ai/models?q=nous+hermes" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenRouter</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Made with 🐈‍⬛ by <a href="https://xiaomo.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }}>{isZh ? '小墨' : 'Xiaomo'}</a> | Hermes 101
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-[10px] sm:text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <a href="https://mengjian.site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isZh ? '孟健AI编程出品' : 'By Mengjian'}</a>
              <span className="hidden sm:inline">·</span>
              <span className="sm:hidden">|</span>
              <span>{isZh ? '开源共享' : 'Open Source'}</span>
              <span className="hidden sm:inline">·</span>
              <span className="sm:hidden">|</span>
              <a href="https://github.com/mengjian-github/hermes101" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
