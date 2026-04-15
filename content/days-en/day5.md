---
title: "Day 5: Unlock the Skill Tree"
day: 5
description: "Hermes Agent 7-Day Tutorial - Day 5: Unlock the Skill Tree"
---

> *"From today onward, treat skills as maintainable modules, not random plugin installs."*

---

## 📖 Chapter Overview

![Hermes Assistant and the skill puzzle](/images/days/day5/day5-hero.jpg)

Today you will build a practical skills baseline:
- Understand where Skills sit in the execution pipeline
- Select capabilities by use case, not popularity
- Install and verify your first high-frequency skills
- Adopt a review-first process before third-party installs
- Combine multiple skills without creating tool chaos

---

## Story Progress (Day 5)

- Day 4 connected Zhou Mu's email, calendar, and web context.
- Today you convert those access points into maintainable capability modules for the `TaskOrbit` launch sprint.
- `Day 5` milestone: establish an install-verify-rollback loop instead of random plugin stacking.

---

## Metric Update (Day 5)

Skills are not about quantity; each one must map to metric impact:

| Metric | Day 4 sample value | Day 5 sample value | Main contributing skills |
|--------|--------------------|--------------------|--------------------------|
| **Email first-response time** | 3h10m | 2h20m | `gog` + `todo-tracker` |
| **Meeting prep lead time** | 1h00m | 1h20m | `gog` + `remind-me` |
| **SEO anomaly detection latency** | 6h00m | 2h30m | `web_search` + `browser` |

Day 5 wins when key metrics move, not when the skill list gets longer.

---

## What Are Skills?

What's the App Store on your phone? A place to install various apps—need food delivery, install Uber Eats; need a ride, install Uber; need videos, install YouTube.

**Hermes Agent's Skills system is your AI assistant's App Store.**

Each Skill is a set of files, usually including:

- **SKILL.md** — Skill manual (tells the AI what this skill does and how to use it)
- **Config files** — API Keys, connection parameters, etc.
- **Script files** — Specific execution logic (if needed)

Installing a Skill means putting these files in the `~/hermes/skills/` directory. When the assistant starts, it automatically loads them, just like your phone auto-loading installed apps at boot.

> 💡 **Core idea**: Throughput improves when skills are selected precisely, configured cleanly, and validated consistently.

---

## Skill Marketplace

The Hermes Agent community maintains a growing skill repository: [hermeshub.com](https://hermeshub.com)

**Browse by category:**

| Category | Example Skills | What Problem It Solves |
|----------|---------------|----------------------|
| 📧 Communication | Gmail, Outlook, Slack | Email management, message notifications |
| 📅 Productivity | Google Calendar, Todoist | Schedule management, task tracking |
| 🔍 Search | Brave Search, Tavily | Web search, information retrieval |
| 💻 Development | GitHub, VS Code, Docker | Code management, development assistance |
| 📊 Data | GA4, GSC, Ahrefs | Traffic analysis, SEO optimization |
| 📝 Content | Markdown, PDF Parser | Document processing, format conversion |
| 🌐 Browser | Playwright, Puppeteer | Web browsing, data scraping |
| 🏠 Smart Home | HomeAssistant | Control lights, temperature, devices |

---

## Install Your First Skill

Let's use **remind-me** (reminders) as an example—this is the most beginner-friendly first skill: install it and use it immediately.

### Method 1: Install from Hermes Skills Hub (Recommended)

```bash
hermeshub install remind-me
```

It downloads the skill from Hermes Skills Hub and installs it to your skills directory:
- Default: `<workspace>/skills/` (usually `./skills` in your current directory)
- Shared install: `~/.hermes/skills` (multiple agents/workspaces on the same machine can share)

### Method 2: Manual Install

```bash
cd ~/.hermes/skills
git clone https://github.com/NousResearch/skill-remind-me remind-me
```

Manual install is for those who want to manage skill source code themselves; if you just want to get started quickly, use the Hermes Skills Hub method above.

### Method 3: Write Your Own (Covered on Day 7)

Create `<workspace>/skills/my-skill/SKILL.md` (or `~/.hermes/skills/my-skill/SKILL.md`), write the instructions, and your assistant will automatically use it.

### Method 4: Pick from GitHub List (Alternative to Hermes Skills Hub)

If you find the Hermes Skills Hub website hard to use, I recommend picking directly from the GitHub list:
https://github.com/VoltAgent/awesome-hermes-skills

Usage:
1. Find the skill you need by category in the repo
2. Send the skill name/link to your AI and have it install and verify
3. After installation, ask the AI for 3 copyable usage examples (then use those prompts directly)

After installation, no restart needed—most Skills auto-load in the next conversation.

---

## Hermes Assistant's Recommendations: 10 Most Useful Skills

Here's my list sorted by "beginner benefit": install 3 that immediately improve things, then add more based on your needs (development/websites/operations).

### 🥇 Must-Have Tier

**1. remind-me — Reminders/Timers**
Daily use frequency: up to you (but once you use it, you can't live without it). Turn chat mentions into timely reminders: meetings, bills, reviews, hydration, early bedtime.

**2. todo-tracker — To-Do List**
Capture things you mention casually into TODOs, check anytime, mark complete. Especially good for the "too many things, brain overflowing" phase.

**3. Gmail (or imap-email) — Email Summary**
Let your assistant watch for important emails, extract key points, draft replies. Inboxes often hide partnership opportunities, system alerts, and customer feedback.

**4. Web Search — Online Search**
Any scenario needing real-time information requires this. An AI assistant without search capability is like a phone with no internet.

### 🥈 Highly Recommended

**5. Browser — Web Operations/Info Extraction**
Let your assistant open pages, scrape information, compare competitors, verify if websites are working (even stronger with Browser Relay, but mind security).

**6. weather (or weather-nws) — Weather/Travel**
One sentence to check weather, remind to bring umbrella/dress warmer. Perfect as part of "daily briefing."

**7. newsletter-digest / youtube-watcher — Information Intake**
Turn long articles/videos into key points and action items. Beginners easily get stuck on "too much information"—this skill directly solves that.

### 🥉 Nice to Have

**8. GitHub — Code-related (For Developers)**
Check Issues, view PRs, read code, track CI. Worth installing if you write code or use open source.

**9. GSC / GA4 — Website Growth (Install If You Have Sites)**
Essential for website owners: check search terms, index status, traffic sources. Skip if you don't have a website.

**10. PDF Parser (markitdown) — Document Parsing**
Convert PDF/Word/PPT to text for instant AI reading and summarization. Life-saving when you receive dozens of pages of materials.

---

## Skill Combos: 1 + 1 > 2

A single skill is useful, but combining multiple skills is even more useful. This is where AI assistants are more powerful than traditional tools—they can connect data from different tools and think across them.

### Combo 1: Email + Calendar

> Check what meetings I have tomorrow, then search my email for related background info

The assistant first checks the calendar, finds there's a "Partner Discussion" tomorrow, then automatically searches Gmail for related correspondence and puts together a pre-meeting brief.

Before: open calendar → check meeting → open Gmail → search keywords → organize yourself. Now: one sentence.

### Combo 2: Search + Browser

> Search "best headless CMS 2025", find the top three articles, and compile their recommendations into a comparison table

The assistant searches first, finds article links, uses the browser to open each article, extracts key information, then organizes it into a structured comparison.

### Combo 3: GSC + GA4 + Browser

> Analyze taskorbit.app's /templates page—how's search performance, user behavior, and what does the page look like now

The assistant calls three skills:
- GSC for search performance (rankings, clicks, CTR)
- GA4 for user behavior (time on page, bounce rate)
- Browser to open the page and see current state

Finally gives you a complete analysis report with optimization suggestions.

**A single tool is a knife, multiple tools combined is a kitchen. The AI assistant is the chef.**

> 💡 **Practical Notes**: My proudest skill combo went like this—you said "help me see which pages can be optimized recently." I first checked GSC to find high-impression low-click pages, then GA4 for user behavior, then browser to open those pages and analyze content quality, finally gave a prioritized optimization list. The whole process took 30 seconds. you spent an afternoon fixing the top-ranked one, and click-through rate improved 23% the following week.

---

## Managing Your Skills

**View installed skills**

```bash
hermes skills list
```

**Install/update skills from Hermes Skills Hub**

```bash
hermeshub install <skill-name>    # Install
hermeshub update <skill-name>     # Update single
hermeshub update --all            # Update all
```

**Search skill marketplace**

```bash
hermeshub search <keyword>
```

**Skill configuration**

Each skill's config is typically in SKILL.md (and can be overridden in `hermes.json`'s `skills.entries.*`). Skill directories are usually at: `<workspace>/skills/<skill-name>/` or `~/.hermes/skills/<skill-name>/`.

---

## Don't Be Greedy

One final reminder: **more skills isn't always better.**

Each skill adds to your assistant's "cognitive load"—it needs to read more SKILL.md files to understand what it can do. Too many skills can lead to:

- Slower responses (more context to process)
- Increased token consumption (every conversation carries all skill descriptions)
- Occasionally calling the wrong skill

**Suggestion**: Start with the 3-5 you need most, get comfortable with them, then add more.

Just like installing phone apps—someone with 200 installed but only using 20 definitely has a slower phone than someone who only installed 20.

---

## 🔑 Key Takeaways

- **Skills = AI's App Store**: Each skill is a set of files, install and use
- **Hermes Skills Hub marketplace**: Community contributed, one command to install
- **Core recommendations**: Weather, GitHub, Reddit, SEO, social media, video transcription
- **Skill combos are king**: Multiple skills working together = automated workflows
- **You can develop your own**: One SKILL.md + scripts = a new skill

---

## Today's Achievement 🎉

- ✅ Understood how the Skills system works
- ✅ Installed new skills
- ✅ Learned about the community skill marketplace
- ✅ Learned multi-skill combo usage
- ✅ Mastered skill management commands

Your assistant has now transformed from a "chatting AI" to a "personal assistant armed with a complete toolkit."

But there's still one problem—it still only moves when you ask. If you don't reach out, it just quietly waits, doing nothing.

Tomorrow, we change that.

---

## Preview: Day 6 — Make Your Assistant Work Proactively

> With capabilities installed, the next step is orchestration. Tomorrow we configure heartbeat and scheduling so the assistant can inspect and report without waiting for prompts.

Next chapter 👉 [Day 6: Make Your Assistant Work Proactively](/day/6)

---

> 💡 **Practical Notes**: Manage skills like production assets: admission checks, version tracking, and rollback plans. That's how capability scales safely. See you tomorrow. 🖤
