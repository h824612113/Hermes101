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

- Day 4 connected Xiao Bin's email, calendar, and web context.
- Today you convert those access points into maintainable capability modules for the `他的个人网站` launch sprint.
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
- **Configuration** — API keys, connection params, etc. (usually live in `~/.hermes/config.yaml`, not inside the Skill itself)
- **Scripts** — Specific execution logic (if needed)

Installing a Skill means putting these files in `~/.hermes/skills/`. When Hermes starts, it automatically loads them, just like your phone auto-loading installed apps.

> 💡 **Core idea**: Throughput improves when skills are selected precisely, configured cleanly, and validated consistently.

### Three Sources of Skills

| Source | Description | Volume |
|--------|-------------|--------|
| **Bundled Skills** | Ship with the repo. Cover GitHub workflows, code-review, systematic-debugging, and 40+ scenarios | 40+ |
| **Agent-created** | After complex tasks (typically 5+ tool calls), the agent autonomously distills the solution into a new Skill | Grows with use |
| **Skills Hub** | Community-contributed, follows the [agentskills.io](https://agentskills.io) standard | Continuously growing |

> 💡 **Cross-tool interop**: agentskills.io is an open standard for Skills, supported by 30+ tools including Claude Code, Cursor, Gemini CLI, and Hermes. A Skill you write in one tool loads directly in another. Skills aren't bound to a single agent.

---

## Skill Marketplace

Two main places to find Skills:

- **Official Hub**: [agentskills.io](https://agentskills.io) (cross-tool standard)
- **Community list**: [awesome-hermes-agent](https://github.com/0xNyk/awesome-hermes-agent) (curated picks for Hermes)

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

Let's use **remind-me** (reminders) as our example—the friendliest skill for beginners: install it and it works immediately.

### Method 1: Let the Agent install it (recommended)

Just say it in chat:

> Install the remind-me Skill for me

Hermes pulls the matching markdown from agentskills.io, writes it to `~/.hermes/skills/remind-me/SKILL.md`, and activates it immediately—no restart required.

> 💡 **Why conversational install**: Hermes manages Skills through agent tool calls (the `skills` toolset), not a separate CLI subcommand. You can also say "browse Python-development skills on agentskills.io" and have it list them before installing.

### Method 2: Clone manually from GitHub

```bash
cd ~/.hermes/skills/
git clone https://github.com/<author>/<skill-repo>.git remind-me
```

Best for people who want to manage Skill source code themselves—you can fork, edit, and PR back upstream.

### Method 3: Write your own (covered on Day 7)

Drop a `SKILL.md` at `~/.hermes/skills/<my-skill>/SKILL.md` and Hermes will pick it up on next launch.

### Method 4: Pick from the community list

Browse [awesome-hermes-agent](https://github.com/0xNyk/awesome-hermes-agent) for categorized picks. Send the name or URL to Hermes and ask it to install plus give you 3 copy-paste examples.

---

## Skill Self-Improvement: Hermes's Killer Feature

This is the single biggest difference between Hermes and OpenClaw, Claude Code, and every other agent skill system.

**Traditional Skills are static**: You write the rules, the agent follows them. Want to change them? You hand-edit the markdown.

**Hermes Skills are alive**: They run inside the learning loop and auto-optimize from your feedback.

The mechanism:

1. **Execute the Skill** — Agent follows the steps in the SKILL.md
2. **Collect feedback** — Your reactions (satisfied / unsatisfied / corrections) land in session memory
3. **Update the Skill** — Agent analyzes the feedback and rewrites the relevant steps in the SKILL.md
4. **Use the new version next time** — The improved Skill applies to subsequent tasks automatically

Concrete example: you install a "write Git commit messages" Skill. The first format isn't to your taste, so you say "write the body in English, prefix with the conventional commit type". Next time you don't have to repeat yourself—Hermes has written that rule into the SKILL.md. Open `~/.hermes/skills/git-commit-style/SKILL.md` and you'll see the diff.

> ⚠️ **Observable**: Every Skill change is a markdown diff—readable, revertable, hand-editable. If a learned rule went off the rails, just `nano` it back, and Hermes will incorporate that correction into the next learning pass.

> 💡 **Quality of feedback matters**: If you only say "this isn't quite right" without saying *what* is wrong, the agent can't improve precisely. **Good feedback = good evolution direction.**

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

> Analyze xiaobin.dev's /templates page—how's search performance, user behavior, and what does the page look like now

The assistant calls three skills:
- GSC for search performance (rankings, clicks, CTR)
- GA4 for user behavior (time on page, bounce rate)
- Browser to open the page and see current state

Finally gives you a complete analysis report with optimization suggestions.

**A single tool is a knife, multiple tools combined is a kitchen. The AI assistant is the chef.**

> 💡 **Practical Notes**: My proudest skill combo went like this—you said "help me see which pages can be optimized recently." I first checked GSC to find high-impression low-click pages, then GA4 for user behavior, then browser to open those pages and analyze content quality, finally gave a prioritized optimization list. The whole process took 30 seconds. you spent an afternoon fixing the top-ranked one, and click-through rate improved 23% the following week.

---

## Managing Your Skills

Most Skill management in Hermes happens through conversation. You can ask:

- "List the Skills I currently have installed" → Agent scans `~/.hermes/skills/` for you
- "Browse Python-development skills on agentskills.io" → Agent searches the hub
- "Install remind-me" / "Remove the xxx Skill" → Agent uses the `skills` tool

If you prefer the command line, every Skill is just a markdown directory under `~/.hermes/skills/`:

```bash
ls ~/.hermes/skills/                   # list installed
nano ~/.hermes/skills/<name>/SKILL.md  # edit
rm -rf ~/.hermes/skills/<name>         # uninstall
```

**Skill configuration**

Each Skill's core file is `~/.hermes/skills/<skill-name>/SKILL.md`. If a Skill needs API keys or other parameters, put them in `~/.hermes/config.yaml` (under toolsets / mcp_servers / custom fields)—not inside SKILL.md. That way config stays centralized and Skills stay clean.

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

- **Skills = an App Store for AI**: Each Skill is a `~/.hermes/skills/<name>/SKILL.md`
- **Three sources**: Bundled (40+ ship with the repo) / Agent-created / Community Hub (agentskills.io)
- **Skill self-improvement**: The more you use it, the better it gets—correct it once and the rule lands in markdown
- **agentskills.io standard**: Interoperates with Claude Code, Cursor, Gemini CLI—Skills aren't platform-locked
- **Write your own**: A SKILL.md plus a script is a new Skill

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
