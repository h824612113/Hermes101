---
title: "Day 7: Advanced Techniques & Future Outlook"
day: 7
description: "Hermes Agent 7-Day Tutorial - Day 7: Advanced Techniques & Future Outlook"
---

> *"Day 7 is not graduation; it's the handoff from setup mode to operating mode."*

---

## 📖 Chapter Overview

![Hermes Assistant looking to the future](/images/days/day7/day7-hero.jpg)

On this final day, we focus on three practical outcomes:
- Review what to keep from the 7-day setup
- Unlock advanced patterns: multi-agent, custom skills, external orchestration
- Define a 30-day iteration cadence after launch

---

## Story Progress (Day 7)

- By Day 6, Xiao Bin's assistant is already running proactive checks and reports.
- Today is not an ending; it's the handoff to long-term operation for the `他的个人网站` system.
- `Day 7` milestone: define a 30-day iteration plan with measurable operating metrics.

---

## Metric Review (Day 7)

First, the same three metrics across the full week (Xiao Bin sample):

| Metric | Day 1 baseline | Day 7 current | 30-day guardrail |
|--------|----------------|---------------|------------------|
| **Email first-response time** | 8h40m | 42m | <=60m |
| **Meeting prep lead time** | 0h | 2h15m | >=2h |
| **SEO anomaly detection latency** | 30h | 18m | <=20m |

This table is the operating dashboard after graduation. Each week, ask only:
- Which metric improved?
- Which metric regressed, and why?
- Did any new feature move one of the three core metrics?

---

## Congratulations, Graduate 🎓

Let's review what you accomplished in these seven days:

| Day | What You Did | Result |
|-----|--------------|--------|
| Day 1 | Understood the true form of AI assistants | Clarified goals and expectations |
| Day 2 | Installed Hermes Agent + connected Telegram | Assistant online, can chat |
| Day 3 | Wrote the soul trio | Assistant has a unique personality |
| Day 4 | Connected Gmail, calendar, search, browser | Assistant can help you get things done |
| Day 5 | Installed Skills packages | Assistant armed to the teeth |
| Day 6 | Configured heartbeat + Cron + memory | Assistant started working proactively |
| Day 7 | Today | Advanced techniques and future |

**What you have now isn't a chatbot. It's an operational teammate running your playbook in the digital stack.**

Today we're not configuring anything new. Today we'll discuss three things: how to make it stronger, how to make it safer, and where all this is heading.

---

## Advanced Level 1: Write Your Own Skill

Community Skills not enough? Write your own.

Don't worry, writing a Skill is simpler than you think—essentially it's just writing a Markdown file telling the AI "you can now do this thing, here's how."

### Minimal Skill Example

Create file `~/.hermes/skills/weather/SKILL.md`:

```markdown
# Weather Query Skill

## Trigger
Activate when the user mentions "weather", "rain", "going out", and similar keywords.

## Steps
Call the wttr.in API to get weather:

\`\`\`bash
curl "wttr.in/CityName?format=3"
\`\`\`

Example:
\`\`\`bash
curl "wttr.in/NewYork?format=3"
\`\`\`

## Output Format
Tell the user the current weather in concise language, including temperature and conditions.
```

That's it. No complex SDK, no registration process, one Markdown file is one Skill.

After saving, tell your assistant "What's the weather like in New York today"—it will read this Skill, call the wttr.in API, and return weather information.

### Skill Development Principles

- **SKILL.md is the core**: Write clearly what it can do, how to do it, output format
- **Keep it simple**: One Skill does one thing, does it well
- **Error handling**: Write in SKILL.md "what to do if it fails"
- **Security notes**: For Skills involving sensitive operations, note that confirmation is needed
- **Follow the agentskills.io standard**: Skills you write here also load directly in Claude Code, Cursor, and other supported tools

> 💡 **Practical Notes**: One useful custom Skill is sleep reminders: if activity continues after 23:00, send progressively stronger nudges to rest. After a few weeks of use, the Skill itself self-improved several times (see Day 5's self-improvement mechanism)—you don't have to keep rewriting.

---

## Advanced Level 2: MCP Integration — Plug Into 6,000+ Apps

We used MCP on Day 4 to wire Gmail. But MCP's real value goes well beyond that—it's an open protocol with **6,000+ servers** in the ecosystem, covering nearly every major SaaS.

### Hands-on: GitHub MCP

GitHub is one of the most useful MCP integrations. After connecting, Hermes can create issues, open PRs, review code, and manage project boards directly.

```yaml
# Append to ~/.hermes/config.yaml:
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN}"
```

> 1. Create a personal access token in GitHub Settings → Developer settings (`repo` and `read:org` minimum)
> 2. Export it as `GITHUB_TOKEN` in your shell rc file (don't paste secrets into the YAML)
> 3. Restart `hermes`

Then you can say: "Open an issue in repo X titled 'fix login redirect bug'", or "review the diff on this PR for me."

### Hands-on: database MCP

```yaml
mcp_servers:
  postgres:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-postgres"]
    env:
      POSTGRES_CONNECTION_STRING: "postgresql://user:pass@localhost:5432/mydb"
```

> ⚠️ **Database MCPs default to read-write**. In production, strongly recommend using a read-only DB account.

### Per-server tool filtering

When you wire several MCPs, the tool count grows fast and decision quality drops. Hermes lets you whitelist specific tools per server:

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN}"
    allowed_tools:
      - "list_issues"
      - "create_issue"
      - "get_pull_request"
      - "create_pull_request_review"
```

Least privilege has never mattered more than in the agent era.

---

## Advanced Level 3: Sub-Agent Delegation — Three Horses Running

Hermes ships a built-in `delegate_task` tool that can spin up **up to 3 sub-agents** in parallel, each with its own context and toolset.

Best use case: "do several unrelated things and then aggregate." For example, asking Hermes to write a competitive comparison:

> Write a competitive analysis of "Claude Code vs Cursor vs Hermes Agent."

The main agent automatically spawns 3 sub-agents:
- Sub-agent A researches Claude Code (only `web` + `browser` tools)
- Sub-agent B researches Cursor (same)
- Sub-agent C researches Hermes Agent (same)

All three run in parallel; the main agent aggregates the results. A 40-minute research task becomes 15 minutes.

> 💡 **Why 3 and not more**: Nous Research's tests showed that beyond 3 sub-agents, the main agent's aggregation quality degrades sharply. It's not a compute issue—it's the LLM's attention split when integrating many independent sources.

---

## Advanced Level 4: Multi-Platform Gateway

Day 2 you only configured Telegram. Hermes's Gateway module **runs all platforms in a single process**, all sharing the same brain.

```yaml
gateway:
  telegram:
    token: 12345:xxx
  discord:
    token: YOUR_DISCORD_BOT_TOKEN
  slack:
    token: xoxb-YOUR-SLACK-BOT-TOKEN
```

Supported platforms: Telegram / Discord / Slack / WhatsApp / Signal / Mattermost / Matrix / Email / SMS / Feishu / WeCom / DingTalk / Home Assistant / BlueBubbles—12+ in total.

**Cross-platform conversation continuity**: chat with Hermes on Telegram during your morning commute, then open `hermes` in the terminal at the office and say "how did that research turn out?"—it knows exactly what you mean, because all platforms share the same memory.

---

## Advanced Level 5: Security Checklist 🔒

Your AI assistant can now access your emails, calendar, files, browser, and possibly GitHub, databases, and Slack. Security isn't optional—it's mandatory.

Here's a complete security checklist:

### Server Security

- ✅ SSH uses key authentication, password login disabled
- ✅ Firewall enabled, only necessary ports exposed (22, 443)
- ✅ System updated regularly: `sudo apt update && sudo apt upgrade`
- ✅ Run Hermes Agent as non-root user
- ✅ Enable fail2ban to prevent brute force attacks

### API Key Security

- ✅ All API Keys stored in environment variables or `.env` files
- ✅ `.env` file added to `.gitignore`
- ✅ Keys rotated regularly (recommend every 3 months)
- ✅ Different keys for different services
- ✅ API usage limits set to prevent runaway costs

### Data Security

- ✅ OAuth Token file permissions set to 600
- ✅ Regular backup of the Hermes data directory: `~/.hermes/`
- ✅ Sensitive files not committed to Git
- ✅ Clear understanding of what data assistant can and cannot access

### Behavioral Security

- ✅ SOUL.md has clear "absolutely do not" list
- ✅ External messages (email, social media) must be confirmed
- ✅ Destructive operations (delete files, modify configs) must be confirmed
- ✅ Don't leak private info in group chats
- ✅ Use `trash` instead of `rm` (recoverable > unrecoverable)

### Cost Control

- ✅ Set monthly API budget limits (OpenRouter / Anthropic / OpenAI consoles all support this)
- ✅ Monitor token usage
- ✅ Watchdog cron interval not too short (30 min is usually enough)
- ✅ Comment out unused toolsets in config.yaml
- ✅ Reserve big models for tasks that need them—route simple tasks to GPT-4o-mini, Claude Haiku, etc.

> 💡 **Security isn't a one-time thing—it's an ongoing habit.** I recommend spending 10 minutes each month going through this checklist.

---

## Community Resources 🌍

You're not alone in this journey. Hermes Agent has an active community.

### GitHub

https://github.com/NousResearch/hermes-agent

The project moves fast and the community is very active. You can:
- Check the latest versions and changelogs
- Submit Issues to report bugs or feature requests
- Contribute code or Skills

### Discord Community

The official Discord is the most active English discussion venue: https://discord.gg/NousResearch

- #general — Daily discussion
- #skills — Skill sharing and development
- #showcase — Show off your assistant setup
- #help — Come here when you have questions

### Hermes Skills Hub Skill Marketplace

- Official Hub: https://agentskills.io
- Awesome list: https://github.com/0xNyk/awesome-hermes-agent
- Third-party docs: https://github.com/mudrii/hermes-agent-docs

### Chinese Community

- **WeChat Account "Hermes 101"** — Where this guide was first published, will continue sharing AI assistant hands-on experience
- **Feishu Knowledge Base** — What you're reading now, will be continuously updated
- **Jike/Xiaohongshu** — Search Hermes Agent or AI assistant related topics

### Learning Resources

- **AGENTS.md** — The operation manual included in your working directory, very detailed
- **Official Docs** — https://hermes-agent.nousresearch.com/docs/, from beginner to advanced
- **Video Tutorials** — Search Hermes Agent on YouTube/Bilibili

---

## Future Outlook 🔮

What you have now is already a powerful AI assistant. But this is just the level of early 2026. What's next?

### Models Will Get Stronger

Claude, GPT and other models upgrade every few months. Stronger models mean your assistant—without changing any configuration—automatically becomes smarter. Better understanding, better execution, fewer mistakes.

### Costs Will Drop

Today running an AI assistant costs about $10-30/month in API fees. A year from now it might drop to $3-10. When costs become negligible, everyone will have one.

### Multimodal Will Become Standard

Current assistants mainly interact through text. But soon, it will:
- **See**: Real-time camera feed analysis
- **Hear**: Voice conversation, like a real human assistant
- **Speak**: Reply with natural voice, not text
- **Move**: Control robots to execute physical world tasks

### Agent Collaboration Networks

The future isn't just one assistant. You might have:
- One Agent dedicated to managing email
- One Agent dedicated to writing code
- One Agent dedicated to data analysis
- One "Butler Agent" coordinating them all

Like a company with different employees, each with their specialty, but all reporting to you.

### Your First-Mover Advantage

This is the most important point: **The earlier you start, the bigger your advantage.**

The assistant you build today accumulates memories about you every day. An assistant used for 6 months versus one just built—the gap isn't 6 months of time, it's 6 months of cognitive accumulation.

It knows your work habits, preferences, project status, common problem-solving approaches... There are no shortcuts for these things, only time can accumulate them.

**So don't wait for a "better version" to come out before starting. The best time to start is now.**

> 💡 **Practical Notes**: The real compounding effect is operational memory. Each execution stores context and preference signals that reduce future coordination cost.

---

## Your Next Steps

The 7-day guide is over, but your AI assistant journey has just begun.

In the coming week, I suggest you:

1. **Chat with your assistant at least 10 minutes daily** — Let it get familiar with your needs and style
2. **Correct it once whenever you're not satisfied** — Skill self-improvement writes the rule into markdown for next time
3. **Try 2-3 new Skills** — See which ones are most useful for you
4. **Tune your cronjob cadences** — Find your comfortable frequency
5. **Browse the community** — See how others use it, get inspired

**In a month, your assistant will be in a completely different state.** Not because you made any big changes, but because it's understanding you day by day, getting better bit by bit.

That's the fundamental difference between AI assistants and traditional tools—it grows.

---

## Want to Go Deeper?

This 7-day guide covers the core build path for Hermes. But if you want to take it to production—cost control, model routing, Docker sandboxing, multi-platform distribution, API relays, debugging—there's a separate set of **operational** topics worth unpacking:

| Advanced Topic | What It Solves |
|---|---|
| **Advanced SOUL.md** | Make the AI output to your actual style, not template-speak |
| **Multi-model routing** | Send simple tasks to GPT-4o-mini, important calls to Sonnet 4—drop monthly bill from $50 to $5 |
| **Tuning the three-layer memory** | How to write good persistent memories, prevent memory pollution, and force-forget |
| **Skill development & debugging** | What a genuinely reusable Skill looks like |
| **Hooks + security sandbox** | Auto-block dangerous operations, auto-filter sensitive data |
| **Multi-platform orchestration** | Telegram + Discord + Slack + Feishu + WeCom on one Gateway |
| **Docker sandbox deployment** | Run the agent inside a container, keep the host clean |
| **Cost control playbook** | Token monitoring, monthly budgets, cheap-model routing |
| **API relay strategies** | Several reliable ways to keep using Claude after Anthropic's third-party block |
| **Troubleshooting guide** | Won't install, won't start, gateway dropped—what now |

> 👉 These advanced chapters are unpacked in detail in the [paid edition](/pricing). Every piece is copy-paste production material—no fluff.

---

## 🔑 Complete Series Review

- **Day 1** — Build the right model: assistant as runtime, not just chat UI
- **Day 2** — Ship the baseline: install, configure, validate, daemonize
- **Day 3** — Stabilize behavior: define persona and execution boundaries
- **Day 4** — Connect real channels: bring email, calendar, and web context in
- **Day 5** — Assemble capabilities: select skills by use case and risk
- **Day 6** — Add orchestration: heartbeat and Cron for proactive execution
- **Day 7** — Enter operating mode: iterate with review loops and metrics

---

## One Last Thing

The biggest outcome of this week is not a chatbot. It is a repeatable automation system you can keep improving.

Models will evolve and tools will change. Your durable advantage is workflow design, context hygiene, and operating discipline.

**Hermes gives you the runtime; your iteration loop creates the leverage.**

**Keep shipping small improvements, and the assistant compounds.**

---

> 💡 **Practical Notes**: Treat this 7-day series as version 1.0. Keep iterating prompts, memory rules, and automations weekly, and your assistant will compound in value.
>
> Track three metrics each week: what you added, what you removed, and where the assistant still fails.
>
> Those notes become your highest-quality input for the next iteration cycle.
>
> If you publish your learnings in Hermes 101, others can build faster from your baseline.
>
> 🖤
