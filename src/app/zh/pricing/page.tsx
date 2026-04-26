import type { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '付费进阶内容',
  description: '11 章深度实战教程：模型路由、记忆体系、安全审计、成本控制、工作流自动化。',
  locale: 'zh',
  enPath: '/pricing',
  zhPath: '/zh/pricing',
});

export default function ZhPricingPage() {
  return <PricingPage locale="zh" />;
}
