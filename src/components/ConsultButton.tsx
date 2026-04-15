'use client';

import { useState } from 'react';

interface ConsultButtonProps {
  locale: 'en' | 'zh';
}

export default function ConsultButton({ locale }: ConsultButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isZh = locale === 'zh';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        aria-label={isZh ? '获取支持' : 'Get Support'}
      >
        <span className="text-xl">💬</span>
        <span className="hidden sm:inline">{isZh ? '获取支持' : 'Support'}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={isZh ? '关闭' : 'Close'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isZh ? 'Hermes 101 支持入口' : 'Hermes 101 Support'}
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              {isZh
                ? '你可以通过以下渠道提问、反馈问题或参与贡献。'
                : 'Use the links below for help, bug reports, or contributions.'}
            </p>

            <div className="space-y-3">
              <a
                href="https://hermes-agent.nousresearch.com/docs/getting-started/quickstart"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-gray-200 px-4 py-3 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="font-medium text-gray-900">{isZh ? '官方快速开始' : 'Official Quickstart'}</div>
                <div className="text-xs text-gray-500 mt-1">hermes-agent.nousresearch.com/docs</div>
              </a>

              <a
                href="https://discord.gg/NousResearch"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-gray-200 px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Discord</div>
                <div className="text-xs text-gray-500 mt-1">Nous Research community</div>
              </a>

              <a
                href="https://github.com/h824612113/Hermes101/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">GitHub Issues</div>
                <div className="text-xs text-gray-500 mt-1">{isZh ? '报告问题 / 提建议' : 'Report bugs / Request features'}</div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
