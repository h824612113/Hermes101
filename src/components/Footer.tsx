import { Dictionary } from '@/lib/i18n';

interface FooterProps {
  locale: 'en' | 'zh';
  dict: Dictionary;
}

export default function Footer({ locale }: FooterProps) {
  const isZh = locale === 'zh';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <footer className="hero-glow py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-10">
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {isZh ? '开始学习' : 'Start Here'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li>
                <a href="#roadmap" className="hover:text-white transition-colors">
                  {isZh ? '7 天路线图' : '7-Day Roadmap'}
                </a>
              </li>
              <li>
                <a href="#toolkit" className="hover:text-white transition-colors">
                  {isZh ? '技能与能力包' : 'Skills & Capability Packs'}
                </a>
              </li>
              <li>
                <a href={`${prefix}/resources`} className="hover:text-white transition-colors">
                  {isZh ? '资源索引' : 'Resource Index'}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {isZh ? '官方入口' : 'Official'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li>
                <a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isZh ? 'Hermes Agent 官网' : 'Hermes Agent Website'}
                </a>
              </li>
              <li>
                <a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isZh ? '官方文档' : 'Documentation'}
                </a>
              </li>
              <li>
                <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Hermes Agent GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {isZh ? '社区协作' : 'Community'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li>
                <a href="https://discord.gg/NousResearch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://github.com/h824612113/Hermes101/issues" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isZh ? '问题反馈' : 'Issue Tracker'}
                </a>
              </li>
              <li>
                <a href="https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isZh ? '飞书知识库' : 'Feishu Wiki'}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {isZh ? '项目仓库' : 'Project'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li>
                <a href="https://github.com/h824612113/Hermes101" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isZh ? '站点源码' : 'Site Source'}
                </a>
              </li>
              <li>
                <a href="https://github.com/h824612113/Hermes101/pulls" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isZh ? '查看 PR' : 'Pull Requests'}
                </a>
              </li>
              <li>
                <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Skills Hub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {isZh ? '由 Hermes 101 团队维护' : 'Maintained by Hermes 101 Team'}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-[10px] sm:text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <span>{isZh ? '开源共享' : 'Open Source'}</span>
              <span className="hidden sm:inline">·</span>
              <a
                href="https://github.com/h824612113/Hermes101"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
