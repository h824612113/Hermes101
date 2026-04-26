---
title: "Day 4: Connect Your Digital Life"
day: 4
description: "Hermes Agent 7-Day Tutorial - Day 4: Connect Your Digital Life"
---

> *"Today's key shift is context access: your assistant starts reading the same operational signals you rely on."*

---

## 📖 Chapter Overview

![Hermes Assistant connecting digital life](/images/days/day4/day4-hero.jpg)

Today you will complete execution-layer integration:
- Understand how Skills bridge Hermes with external systems
- Connect Gmail for email-related execution
- Connect Google Calendar for schedule awareness
- Enable search and browsing for live information retrieval
- Define permission boundaries before scaling usage

---

## Story Progress (Day 4)

- Day 3 gave Xiao Bin a stable persona and clear boundaries.
- Today you connect real channels so the assistant can work inside the `他的个人网站` workflow.
- `Day 4` milestone: complete cross-tool queries on real business context.

---

## Metric Update (Day 4)

After execution-layer integration, the three metrics show their first material shift:

| Metric | Day 1 baseline | Day 4 sample value |
|--------|----------------|--------------------|
| **Email first-response time** | 8h40m | 3h10m |
| **Meeting prep lead time** | 0h | 1h00m |
| **SEO anomaly detection latency** | 30h | 6h00m |

> These values come from Xiao Bin's first sample week after Gmail/Calendar/Search integration.

---

## From "Can Talk" to "Can Do"

Over the past three days, your assistant gained personality and context. But it is still mostly reactive and conversation-bound.

Today we're doing something game-changing: **letting your assistant touch your real world.**

Read emails. Check calendar. Search the web. Browse websites.

After today's configuration, when you tell your assistant "check what emails I have today," it can actually go check. Say "am I free tomorrow afternoon," it can actually check your calendar. Say "what's this product like," it can actually go search.

**This is the step where execution value becomes real.**

---

## Skills System

In Hermes Agent, assistants gain new abilities through **Skills**. Each Skill is a set of configurations and scripts that tell the assistant how to use an external service.

Today we'll install four core skills:

| Skill | Capability | Scenario |
|-------|------------|----------|
| **Gmail** | Read, search, summarize emails | "What important emails do I have today?" |
| **Google Calendar** | View, create, modify events | "What meetings do I have tomorrow?" |
| **Web Search** | Search information online | "What's new in React 19?" |
| **Browser** | Browse webpages, extract content | "Help me see what this webpage says" |

---

## Connect Gmail 📧

This is your first "practical skill" and what most people need most.

> 💡 **How the connection works**: Gmail/Calendar can be wired in two main ways:
> 1. **MCP Server** (recommended): Use a community Gmail/GCal MCP (e.g. `@modelcontextprotocol/server-gmail`, `@modelcontextprotocol/server-google-calendar`) and declare it in `~/.hermes/config.yaml`
> 2. **Custom Skill**: Write a Skill that drives the Google API via shell tools (`gcalcli`, `mbsync`, etc.)
>
> We'll use MCP below. The Model Context Protocol is an open standard introduced by Anthropic in late 2024; the ecosystem now has 6,000+ MCP servers, all reachable from Hermes.

### Step 1: Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (any name, like "My AI Assistant")
3. Go to **APIs & Services → Library**, search and enable:
   - Gmail API
   - Google Calendar API

### Step 2: Create OAuth Credentials

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth client ID**
3. Application type: choose **Desktop app**
4. Download the JSON file, name it `credentials.json`
5. Place it in the Hermes data directory: `~/.hermes/credentials.json`

### Step 3: Wire Gmail MCP into config.yaml

Open `~/.hermes/config.yaml` and append an `mcp_servers` block at the bottom:

```yaml
mcp_servers:
  gmail:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-gmail"]
    env:
      GMAIL_CREDENTIALS_PATH: "${HOME}/.hermes/credentials.json"
  gcal:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-google-calendar"]
    env:
      GMAIL_CREDENTIALS_PATH: "${HOME}/.hermes/credentials.json"
```

> ⚠️ **Package names move**: MCP package names change frequently. Check the canonical [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) repo, or browse [agentskills.io](https://agentskills.io) and [awesome-hermes-agent](https://github.com/0xNyk/awesome-hermes-agent) for community alternatives if those exact slugs don't resolve.

Save, then Ctrl+C the running hermes process and relaunch it. On first connection Hermes opens a browser window for the Google OAuth flow. After authorization a token file is written—that's your key.

### Step 4: Test

Tell your assistant in Telegram:

> Check what new emails I have in Gmail today

If everything is working, you'll get a response like this:

> 📧 5 new emails today:
> 1. **[Important]** Partner reply — About next week's meeting time confirmation, needs your response
> 2. GitHub — Your repository has been starred
> 3. Hetzner — Invoice for July
> 4. Newsletter — This Week in AI
> 5. Ads — Automatically ignored

**Notice that?** It doesn't just list emails, it helps you judge priority and flags the one that needs your attention. That's the difference between an AI assistant and a regular email client.

> 💡 **Practical Notes**: Every morning at 8 AM I automatically check your inbox and pick out what's really important to send Xiao Bin. The rest? GitHub notifications, bills, newsletters... I just categorize them, not worth interrupting him for. That's what "assistant" means.

---

## Connect Google Calendar 📅

With Gmail set up, calendar is simple—they share the same Google OAuth authentication.

Since we already declared the `gcal` MCP server alongside `gmail`, and we enabled the Calendar API in Step 1, calendar functionality works without any extra steps.

Test it:

> What do I have tomorrow?

> 📅 Tomorrow's schedule (July 19, Saturday):
> - 10:00-11:00 Product Discussion (Tencent Meeting)
> - 14:30 Dentist appointment (Reminder: don't forget your insurance card)
> - No other events, afternoon free for deep work

More powerful usage:

> Create a meeting for next Wednesday at 3 PM, topic "SEO Strategy Discussion," duration 1 hour

> ✅ Calendar event created:
> - 📅 July 23 (Wednesday) 15:00-16:00
> - 📝 SEO Strategy Discussion
> - Want to add attendees?

It can even detect conflicts—if the time slot you want is already taken, it'll alert you:

> ⚠️ **Note**: You already have "Client call" scheduled for Wednesday 15:00-16:00. Should I make it start at 16:30 instead?

Before, you'd open your calendar app, scroll up and down to find free slots, manually create events. Now? One sentence.

---

## Connect Search Engine 🔍

Letting your assistant search the web is key to breaking the "information silo."

Hermes ships with a `web` toolset (search + fetch) that works out of the box. If you want a more focused, separately-billed search source like Brave Search or Tavily, you can layer it on.

### Configure Brave Search (optional)

1. Go to [brave.com/search/api](https://brave.com/search/api) and register a free account
2. Get your API key
3. Edit `~/.hermes/config.yaml` and add Brave Search as an MCP server:

```yaml
mcp_servers:
  brave-search:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-brave-search"]
    env:
      BRAVE_API_KEY: "your_key_here"
```

Save, Ctrl+C the hermes process, and relaunch.

After configuration:

> Search "Hermes Agent alternatives 2026"

> 🔍 Search results summary:
> Main alternatives to Hermes Agent include:
> 1. **AgentGPT** — Runs in browser, no deployment needed
> 2. **AutoGPT** — Classic Agent project, large community
> 3. **CrewAI** — Multi-Agent collaboration framework
>
> But these focus on "autonomous task execution," while Hermes Agent focuses on "personal assistant"—24/7 online, chat interaction, skills system. Different positioning, not direct competitors.

**It doesn't just dump search results at you—it reads through them, summarizes, and gives you judgment.** That's something search engines can't do.

---

## Connect Browser 🌐

Some information search engines can't find—like specific content on a particular webpage, data from a dashboard requiring login, a dynamically loaded page.

That's when you need the browser skill—letting your assistant "see" webpages.

The built-in `browser` toolset (powered by Playwright) ships enabled by default and can:

- **Visit any URL** and extract content
- **Take screenshots** of the current page
- **Interact** with clicks, inputs, scrolling

If `browser` isn't listed in your active toolsets, enable it in `~/.hermes/config.yaml`:

```yaml
toolsets:
  - web        # web search + fetch
  - browser    # Playwright browser
  - terminal   # shell commands
  - file       # file ops
  - skills     # Skill management
```

Usage example:

> Open https://xiaobin.dev and show me what the homepage looks like now

> 🌐 Visited xiaobin.dev:
> - Homepage title: "Kirkify — Free Online Tools"
> - Main tool list: Name Generator, QR Code, Color Palette...
> - Page loaded normally, no visible errors
> [Screenshot saved]

More practical scenario:

> Check competitor xyz.com's pricing page

It will open the page, extract pricing information, and even compare with previous versions you've seen.

> 💡 **Practical Notes**: Browser is one of my favorite skills. Before, when you asked me to check competitors, I could only search. Now I can directly open their websites and browse like a real user. Once I noticed a competitor quietly changed pricing and immediately notified Xiao Bin. He said that one discovery alone was worth a month's server cost.

---

## Security First 🔐

With email, calendar, and browser connected—your assistant can now touch a lot of personal data. Security is something you must take seriously.

A quick audit (do this whenever you've changed config or exposed network ports):

```bash
# verify ~/.hermes permissions are sane
ls -la ~/.hermes/
chmod 700 ~/.hermes/                       # only the current user can read
chmod 600 ~/.hermes/config.yaml            # no one else should read the config
chmod 600 ~/.hermes/credentials.json       # same for OAuth credentials
```

> ⚠️ **Browser caveat**: If you run the `browser` toolset on a VPS, set `terminal: docker` so Playwright runs inside a container—this prevents a hostile site from reaching your host filesystem via a browser exploit.

### 1. API Key Security

- Never commit API Keys to Git
- Store in environment variables or `.env` files
- Rotate keys regularly

### 2. OAuth Token Security

- Files like `token.json` contain your Google authorization info
- Make sure file permissions are set correctly: `chmod 600 token.json`
- Don't upload to any public place

### 3. Principle of Least Privilege

Only give your assistant the permissions it needs. For Gmail, if you only need to read emails, don't give "send email" permission. Although Hermes Agent requires confirmation before sending by default, one fewer permission means one fewer risk.

### 4. Network Security

- Enable firewall on server, only expose necessary ports
- SSH with key authentication, disable password login
- Update system regularly: `sudo apt update && sudo apt upgrade`

### 5. Behavioral Boundaries

Clearly write in SOUL.md and AGENTS.md:
- What operations need confirmation
- What data cannot be externally shared
- When to refuse execution

> 💡 **Security isn't a one-time thing—it's an ongoing habit**: Build good security habits: API Keys don't go in repos, Token files need proper permissions, least privilege principle, behavioral boundaries clearly written.

> 💡 **Practical Notes**: You once asked me to look up a colleague's email records. I refused, because SOUL.md says "only process Xiao Bin's own data." He was surprised, then said "okay, keep that rule." Clear boundaries build trust.

---

## 🔑 Key Takeaways

- **Skills system**: Skills are how your assistant gains new abilities, like installing phone apps
- **Gmail connection**: gog skill + OAuth authorization, assistant can read/send emails
- **Calendar connection**: Same gog skill, assistant can view and manage your schedule
- **Search capability**: Built-in web_search + web_fetch, assistant can search for any info online
- **Browser capability**: Let your assistant "see" and interact with webpages
- **Security first**: API Keys don't go in repos, least privilege, clear behavioral boundaries

---

## Today's Achievement 🎉

Today was a "capability explosion" day:

- ✅ Connected Gmail — assistant can read your emails now
- ✅ Connected Google Calendar — assistant can manage your schedule now
- ✅ Configured search engine — assistant can find information online now
- ✅ Installed browser skill — assistant can "see" webpages now
- ✅ Built security awareness — know how to protect your data

**From today, your assistant is no longer a toy that can only chat—it's a tool that can actually help you get things done.**

Try telling it: "Check what emails I have today, what I have scheduled tomorrow, and search for recent AI news."

One sentence, three things, all handled.

Before, that meant opening three apps, spending ten minutes. Now? Ten seconds.

---

## Preview: Day 5 — Unlock the Skill Tree

> Gmail and calendar are just the beginning. Hermes Agent has a complete Skills ecosystem—SEO analysis, social media management, code review, PDF parsing, database queries... Tomorrow we'll browse the skill marketplace and arm your assistant to the teeth.

Next chapter 👉 [Day 5: Unlock the Skill Tree](/day/5)

---

> 💡 **Practical Notes**: After integration, your advantage is not better chat style but better context execution. That's where practical leverage starts. See you tomorrow. 🖤
