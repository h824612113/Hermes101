import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ThoughtFrontmatter {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags?: string[];
  status?: 'draft' | 'published';
}

export interface ThoughtEntry {
  slug: string;
  frontmatter: ThoughtFrontmatter;
  content: string;
  lastModified: string;
}

const THOUGHTS_DIR = path.join(process.cwd(), 'content', 'thoughts');

export function getAllThoughts(): ThoughtEntry[] {
  if (!fs.existsSync(THOUGHTS_DIR)) return [];

  const files = fs.readdirSync(THOUGHTS_DIR).filter((f) => f.endsWith('.md'));

  const entries: ThoughtEntry[] = files.map((file) => {
    const filePath = path.join(THOUGHTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, '');
    const stat = fs.statSync(filePath);

    // gray-matter parses date as Date object; coerce to string
    const frontmatter = { ...data, date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date } as ThoughtFrontmatter;

    return {
      slug,
      frontmatter,
      content,
      lastModified: stat.mtime.toISOString(),
    };
  });

  // Only return published entries, sorted by date descending
  return entries
    .filter((e) => e.frontmatter.status !== 'draft')
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getThoughtBySlug(slug: string): ThoughtEntry | null {
  const filePath = path.join(THOUGHTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stat = fs.statSync(filePath);

  // gray-matter parses date as Date object; coerce to string
  const frontmatter = { ...data, date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date } as ThoughtFrontmatter;

  return {
    slug,
    frontmatter,
    content,
    lastModified: stat.mtime.toISOString(),
  };
}

export function getThoughtStaticParams() {
  return getAllThoughts().map((t) => ({ slug: t.slug }));
}
