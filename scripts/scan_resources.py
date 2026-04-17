#!/usr/bin/env python3
"""
Hermes101 Resource Scanner
--------------------------
Takes web search results (JSON on stdin), deduplicates against
existing resources.ts entries, classifies new ones, and outputs
TypeScript code to patch in.

Usage:
  echo '{"results": [...]}' | python3 scan_resources.py
  python3 scan_resources.py --dry-run < search_results.json

Input JSON format:
  {"results": [{"url": "...", "title": "...", "description": "..."}]}
"""

import json
import re
import sys
import argparse
from pathlib import Path
from urllib.parse import urlparse

RESOURCES_TS = Path(__file__).parent.parent / "src" / "data" / "resources.ts"

# Category detection rules: (domain_patterns, path_keywords, category)
CATEGORY_RULES = [
    # Official / source
    (["github.com/NousResearch"], [], "official"),
    (["hermes-agent.nousresearch.com"], [], "official"),
    (["portal.nousresearch.com"], [], "official"),
    (["discord.gg/NousResearch"], [], "official"),
    # Video
    (["youtube.com", "youtu.be", "vimeo.com"], [], "video"),
    # Tools & platforms
    (["openrouter.ai", "ollama.com", "huggingface.co", "hf-mirror.com"], [], "tools"),
    (["github.com"], ["tool", "adapter", "plugin", "extension", "cli"], "tools"),
    # Cloud deploy
    (["cloud.tencent.com", "aliyun.com", "aws.amazon.com", "vercel.com",
      "fly.io", "railway.app", "render.com"], [], "cloud-deploy"),
    # Deep dive / architecture
    ([], ["architecture", "internals", "deep-dive", "how-it-works",
          "under-the-hood", "source-code", "analysis", "comparison"], "deep-dive"),
    # Skills
    (["skills.101"], [], "skill-dev"),
    ([], ["skill", "plugin", "extension", "develop"], "skill-dev"),
    # Getting started / setup
    ([], ["install", "setup", "getting-started", "quickstart",
          "beginner", "tutorial", "guide", "how-to", "deploy",
          "配置", "安装", "入门", "教程", "指南"], "getting-started"),
    # Use cases
    ([], ["use-case", "workflow", "automate", "build", "project",
          "example", "demo", "运用", "应用", "场景", "玩法", "思考",
          "experience", "review", "opinion", "thought"], "use-cases"),
]

# Known official resources to never duplicate
OFFICIAL_DOMAINS = {
    "hermes-agent.nousresearch.com",
    "github.com/NousResearch/hermes-agent",
    "discord.gg/NousResearch",
    "portal.nousresearch.com",
}

# Language detection
ZH_PAT = re.compile(r'[\u4e00-\u9fff\u3400-\u4dbf]')
EN_STOPWORDS = {'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been',
                'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
                'would', 'could', 'should', 'may', 'might', 'can', 'shall'}


def load_existing_urls() -> set[str]:
    """Extract all URLs already in resources.ts."""
    if not RESOURCES_TS.exists():
        return set()
    content = RESOURCES_TS.read_text()
    return set(re.findall(r"url:\s*'([^']+)'", content))


def detect_lang(title: str, desc: str) -> str:
    """Detect 'zh' or 'en' based on CJK characters."""
    text = f"{title} {desc}"
    zh_count = len(ZH_PAT.findall(text))
    return 'zh' if zh_count >= 3 else 'en'


def classify_url(url: str, title: str, desc: str) -> str:
    """Determine the ResourceCategory for a URL."""
    parsed = urlparse(url)
    domain = parsed.netloc.lower().removeprefix("www.")
    path_lower = parsed.path.lower()
    text_lower = f"{title} {desc}".lower()

    for domain_patterns, path_keywords, category in CATEGORY_RULES:
        domain_match = any(d in domain for d in domain_patterns) if domain_patterns else False
        path_match = any(k in path_lower or k in text_lower for k in path_keywords) if path_keywords else False

        if domain_match or path_match:
            return category

    # Default: blog posts → deep-dive, github repos → tools, else use-cases
    if "blog" in domain or "blog" in path_lower or "article" in path_lower:
        return "deep-dive"
    if "github.com" in domain:
        return "tools"
    return "use-cases"


def slugify_source(url: str) -> str:
    """Generate a human-readable source name from URL."""
    parsed = urlparse(url)
    domain = parsed.netloc.lower().removeprefix("www.")
    # Clean up common prefixes
    for prefix in ["blog.", "dev.", "docs.", "wiki."]:
        if domain.startswith(prefix):
            domain = domain[len(prefix):]
    # Capitalize nicely
    parts = domain.split(".")
    return parts[0].capitalize() if parts else domain


def make_resource_entry(item: dict) -> dict | None:
    """Create a Resource dict from a search result item."""
    url = item.get("url", "").strip()
    title = item.get("title", "").strip()
    desc = item.get("description", "").strip()

    if not url or not title:
        return None

    # Clean up title (remove site suffix like " | ByteIota")
    if " | " in title:
        title = title.rsplit(" | ", 1)[0].strip()
    if " — " in title and len(title.split(" — ")) <= 2:
        title = title.rsplit(" — ", 1)[0].strip()

    # Truncate description
    if len(desc) > 120:
        desc = desc[:117] + "..."

    lang = detect_lang(title, desc)
    category = classify_url(url, title, desc)
    source = slugify_source(url)

    # Determine tags
    tags = []
    title_lower = title.lower()
    if any(k in title_lower for k in ["tutorial", "教程", "指南", "guide"]):
        tags.append("教程" if lang == "zh" else "Tutorial")
    if any(k in title_lower for k in ["install", "setup", "安装", "配置"]):
        tags.append("安装" if lang == "zh" else "Setup")
    if any(k in title_lower for k in ["comparison", "vs", "对比"]):
        tags.append("对比" if lang == "zh" else "Comparison")
    if any(k in title_lower for k in ["vps", "deploy", "部署"]):
        tags.append("部署" if lang == "zh" else "Deploy")

    return {
        "title": title,
        "desc": desc,
        "url": url,
        "source": source,
        "lang": lang,
        "category": category,
        "tags": tags[:3] if tags else None,
    }


def format_ts_entry(entry: dict) -> str:
    """Format a Resource dict as a TypeScript object literal."""
    lines = ["  {"]

    # Escape single quotes in strings
    def esc(s):
        return s.replace("\\", "\\\\").replace("'", "\\'")

    lines.append(f"    title: '{esc(entry['title'])}',")
    lines.append(f"    desc: '{esc(entry['desc'])}',")
    lines.append(f"    url: '{esc(entry['url'])}',")
    lines.append(f"    source: '{esc(entry['source'])}',")
    lines.append(f"    lang: '{entry['lang']}',")
    lines.append(f"    category: '{entry['category']}',")

    if entry.get("tags"):
        tag_strs = ", ".join(f"'{esc(t)}'" for t in entry["tags"])
        lines.append(f"    tags: [{tag_strs}],")

    lines.append("  },")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Scan and classify new Hermes resources")
    parser.add_argument("--dry-run", action="store_true", help="Don't write, just print")
    parser.add_argument("--patch", action="store_true", help="Directly patch resources.ts")
    parser.add_argument("--input", type=str, help="Input JSON file (default: stdin)")
    args = parser.parse_args()

    # Read input
    if args.input:
        data = json.loads(Path(args.input).read_text())
    else:
        data = json.loads(sys.stdin.read())

    results = data.get("results", data if isinstance(data, list) else [])
    if isinstance(data, list):
        results = data

    existing_urls = load_existing_urls()
    print(f"Existing resources: {len(existing_urls)}", file=sys.stderr)

    new_entries = []
    skipped = 0

    for item in results:
        url = item.get("url", "").strip()
        if not url:
            continue

        # Normalize for comparison
        url_norm = url.rstrip("/")

        # Check if already exists
        if url in existing_urls or url_norm in existing_urls:
            skipped += 1
            continue

        # Skip official docs that are likely duplicates of known entries
        parsed = urlparse(url)
        domain = parsed.netloc.lower().removeprefix("www.")
        if any(domain.startswith(od.split("/")[0]) and
               (len(od.split("/")) == 1 or parsed.path.startswith("/" + od.split("/", 1)[1]))
               for od in OFFICIAL_DOMAINS):
            skipped += 1
            continue

        entry = make_resource_entry(item)
        if entry:
            new_entries.append(entry)
            existing_urls.add(url)

    print(f"New resources found: {len(new_entries)}", file=sys.stderr)
    print(f"Skipped (duplicate/official): {skipped}", file=sys.stderr)

    if not new_entries:
        print("No new resources to add.", file=sys.stderr)
        print(json.dumps({"new_count": 0, "entries": []}))
        return

    # Output as both JSON and TypeScript
    output = {
        "new_count": len(new_entries),
        "entries": new_entries,
        "ts_snippet": "\n".join(format_ts_entry(e) for e in new_entries),
    }

    if args.dry_run:
        print("\n=== New Resources (dry run) ===\n", file=sys.stderr)
        for e in new_entries:
            print(f"  [{e['category']}] {e['title']}", file=sys.stderr)
            print(f"    {e['url']}", file=sys.stderr)
            print(f"    lang={e['lang']} source={e['source']}", file=sys.stderr)
            print(file=sys.stderr)

    print(json.dumps(output, ensure_ascii=False, indent=2))

    if args.patch:
        # Direct patch: insert before the closing '];' of the resources array
        content = RESOURCES_TS.read_text()
        marker = "\n];"
        idx = content.rfind(marker)
        if idx == -1:
            print("ERROR: Could not find closing '];' in resources.ts", file=sys.stderr)
            sys.exit(1)

        ts_code = "\n".join(format_ts_entry(e) for e in new_entries)
        new_content = content[:idx] + "\n  // === Auto-discovered " + \
                      str(len(new_entries)) + " resources ===\n" + \
                      ts_code + "\n" + content[idx:]
        RESOURCES_TS.write_text(new_content)
        print(f"Patched resources.ts with {len(new_entries)} new entries.", file=sys.stderr)


if __name__ == "__main__":
    main()
