'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HtmlLangUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    const nextLang = pathname.startsWith('/zh') ? 'zh-CN' : 'en';
    if (document.documentElement.lang !== nextLang) {
      document.documentElement.lang = nextLang;
    }
  }, [pathname]);

  return null;
}
