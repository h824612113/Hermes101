import type { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Premium Content',
  description: '11 advanced chapters covering model routing, memory systems, security, cost control, and workflow automation for Hermes Agent.',
  locale: 'en',
  enPath: '/pricing',
  zhPath: '/zh/pricing',
});

export default function EnPricingPage() {
  return <PricingPage locale="en" />;
}
