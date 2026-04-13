import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { SiteLocale } from '@/lib/seo';

export const DAY_NUMBERS = [1, 2, 3, 4, 5, 6, 7] as const;

type DayNumber = (typeof DAY_NUMBERS)[number];

export interface DayFrontmatter {
  title: string;
  day: number;
  description: string;
}

export interface DayContentEntry {
  content: string;
  frontmatter: DayFrontmatter;
  filePath: string;
  lastModified: string;
}

export function getDayStaticParams() {
  return DAY_NUMBERS.map((day) => ({ day: day.toString() }));
}

export function getDayContent(locale: SiteLocale, day: string | number): DayContentEntry | null {
  const dayNumber = Number(day);

  if (!DAY_NUMBERS.includes(dayNumber as DayNumber)) {
    return null;
  }

  const contentDir = locale === 'zh' ? 'days' : 'days-en';
  const filePath = path.join(process.cwd(), 'content', contentDir, `day${dayNumber}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    content,
    frontmatter: {
      title: String(data.title ?? `Day ${dayNumber}`),
      day: Number(data.day ?? dayNumber),
      description: String(data.description ?? ''),
    },
    filePath,
    lastModified: fs.statSync(filePath).mtime.toISOString(),
  };
}
