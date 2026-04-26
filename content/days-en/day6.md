---
title: "Day 6: Make Your Assistant Work Proactively"
day: 6
description: "Hermes Agent 7-Day Tutorial - Day 6: Make Your Assistant Work Proactively"
---

> *"Today we solve trigger orchestration: your assistant should execute on schedule, not only on prompt."*

---

## 📖 Chapter Overview

![Hermes Assistant and automated heartbeat](/images/days/day6/day6-hero.jpg)

Today you will wire the full automation layer:
- Use Heartbeat as a recurring inspection trigger
- Configure Cron for time-precise execution
- Attach memory for long-horizon behavioral continuity
- Define proactive notification rules that do not create noise

---

## Story Progress (Day 6)

- After Day 5, Xiao Bin has a capable tool stack.
- Today you move from "toolbox" to "autonomous operating loop."
- `Day 6` milestone: morning brief, anomaly alert, and daily review all run without prompts.

---

## Metric Update (Day 6)

With automation online, metrics enter a stable controllable range:

| Metric | Day 5 sample value | Day 6 sample value | Trigger mechanism |
|--------|--------------------|--------------------|-------------------|
| **Email first-response time** | 2h20m | 42m | Heartbeat + priority rules |
| **Meeting prep lead time** | 1h20m | 2h15m | Cron pre-meeting brief |
| **SEO anomaly detection latency** | 2h30m | 18m | Heartbeat checks + alerting |

This is Day 6's real value: move from "occasionally good" to "reliably good."

---

## From "You Ask, It Answers" to "It Proactively Reaches Out"

Over the past five days, your assistant has become quite capable. It has a soul, knows you, can read emails, manage calendar, search the web, browse pages. But it has one fatal problem—

**If you don't reach out, it does nothing.**

50 emails piled up and it doesn't check. A calendar meeting about to start and it doesn't remind you. Website's down and it doesn't tell you. It just sits there quietly, waiting for you to speak.

It's like hiring an all-capable butler, but they just stand at the door every day waiting for your commands—if you don't speak, they don't move. That's not a butler, that's a statue.

Today we solve this problem.

---

## Proactive Inspections: a "Heartbeat" Skill 💓

OpenClaw used a dedicated `HEARTBEAT.md` file to define "what to do every heartbeat tick." Hermes doesn't ship a special file for this, but the **idea translates directly**—write your inspection rules into a Skill, then have a cronjob fire that Skill on a schedule. Same outcome.

### Write an inspection Skill

`~/.hermes/skills/daily-watchdog/SKILL.md`:

```markdown
# Daily Watchdog

## Trigger
- When I say "watchdog check"
- When the cronjob fires every 30 minutes

## Steps

### Every run
- Check Gmail for important email (partner / contains "urgent" / related to active projects)
- Check the calendar for meetings starting within 2 hours
- If there's something I need to know, send a Telegram message; otherwise stay quiet

### 2–3 times a day
- Check that the personal site is reachable
- Pull GSC and flag anomalies (±20% traffic shift)

## Don't do
- Weather lookups (wait until I ask)
- Social-media scraping (unless I'm @-mentioned)
- Send any non-urgent message between 23:00–08:00
```

Save it. Hermes will pick the Skill up on next launch. Test by saying "run the watchdog" in the terminal—if the report is too noisy or misses something, just say "from now on report it like X" and Hermes will edit the SKILL.md (see the Day 5 self-improvement mechanism).

### Frequency is controlled by cronjob

How often the watchdog fires is a cronjob detail (covered next). Common cadences:

- **Every 15 minutes** — fairly frequent, fine during weekday hours
- **Every 30 minutes** — sensible default, balances cost and responsiveness
- **Every 60 minutes** — economical, good for off-hours

---

## Scheduled Tasks (cronjob) ⏰

The watchdog Skill handles "every-so-often" inspections. But some things need precise timing:

- 8:00 AM every day: morning briefing
- 9:00 AM every Monday: weekly report
- 1st of every month: server bill check

That's where Hermes's `cronjob` tool comes in.

### Create a cron job (in plain language)

Hermes ships with a built-in `cronjob` tool—you don't write cron expressions by hand. **Just tell it what to do and when, in natural language**:

> Every morning at 8 AM, run the watchdog Skill and send the result to Telegram.

> Every Monday at 9 AM, write a weekly report that summarizes what happened last week: important events, completed tasks, traffic shifts, important emails.

> On weekdays at 10, 12, 14, and 16, remind me to take a movement break.

Hermes calls the `cronjob` tool to register the schedule, and pushes results back through the Gateway (Telegram / Discord / Slack / etc.).

### Manage existing cron jobs

In conversation:

> List all my scheduled jobs.

> Pause the "weekly report" job for a couple of weeks.

> Move the morning briefing to 8:30.

The agent does it through the `cronjob` tool—you don't memorize parameters.

### Practical examples

**Morning briefing (daily 8:00):** check unread mail and summarize the important ones, today's calendar, any traffic anomalies, then send a single Telegram message.

**Weekly report (Monday 9:00):** summarize last week's important events, completed tasks, important emails received—shaped as "what I did / what I learned / next-week plan."

**Health reminder (weekdays 10–16, every 2h):** if you've been working straight for 2+ hours, strongly recommend a 10-minute break.

### Watchdog Skill vs. cronjob: when do you use which?

| | Watchdog Skill (frequent, lightweight) | cronjob (precise time, any task) |
|---|---|---|
| **Trigger** | A high-frequency cron fires the Skill | Cron expression at exact times |
| **Best for** | Routine inspections, status monitoring | Scheduled reports, health pings |
| **Precision** | Interval-grained (minutes) | Minute-precise |
| **Cost** | Usually no message produced | Runs every time, usually messages you |

**Rule of thumb**: "check every once in a while" → watchdog Skill on a frequent cron; "do exactly at this time" → standalone cronjob.

---

## Memory System 🧠

Once your assistant works proactively, it generates lots of information daily—what it checked, what it found, what you asked it to do. Without memory, every time it wakes up it's completely fresh, remembering nothing.

Hermes's memory system has three layers, mapped to the three memory types in cognitive science:

| Layer | Question it answers | Implementation | Analogy |
|-------|--------------------|--------------------|--------|
| **Session memory** | What happened? | SQLite + FTS5 full-text index (in `~/.hermes/state.db`) | Episodic memory (hippocampus) |
| **Persistent memory** | Who are you? | Distilled preferences managed by the `memory` tool, stored under `~/.hermes/memories/` | Semantic memory |
| **Skill memory** | How is this done? | Markdown files in `~/.hermes/skills/` plus the Day 5 self-improvement loop | Procedural memory |

> 💡 **Key design**: retrieval-on-demand, not full-context loading. New conversations don't dump every prior message into the prompt—Hermes searches with FTS5 for relevant snippets given the current topic and loads only those. Conversations stay fast even after months.

### Layer 1: session memory (auto-write)

Every conversation turn—user message, assistant reply, tool calls, tool returns—is written to `~/.hermes/state.db` and indexed in FTS5 in real time.

You don't configure anything. It's on by default.

Tomorrow you can ask "what did the research I gave you last Wednesday turn up?"—Hermes will FTS5-search "research" in your history, pull the most relevant chunks into context, and answer.

### Layer 2: persistent memory (auto-distilled)

After each conversation, Hermes "curates" memory—decides what from the chat is worth remembering long-term, and writes it to persistent storage. Examples:

- User prefers `httpx` over `requests`
- User is researching AI agent deployment, has ruled out option X
- User likes concise code, hates long functions

> 💡 **Optional add-on: Honcho user modeling**. Hermes integrates with Honcho (built by Plastic Labs) for dialectic user modeling—it infers deeper traits from gaps between what you say and what you do ("you say you want full comments but never read them on review"). Toggle it in the official docs.

### Layer 3: Skill memory (procedural reuse)

Skills aren't just tools—they're a memory type. They remember "how things are done."

The Day 5 self-improvement mechanism is what powers this layer: correct it once, the rule lands in SKILL.md, next time it just works. The three layers compose:

> You say: "deploy this project."
>
> Hermes searches session memory with FTS5, finds the port conflict from your previous deploy (**episodic**). It checks persistent memory and recalls you use a Hetzner VPS with Nginx as the reverse proxy (**semantic**). Then it loads the `deployment-checklist` Skill and executes the steps you've already validated (**procedural**). Three layers, three jobs.

**The result: your assistant gets to know you better over time.**

In the first week it knows only what you've said. After a month it knows your work habits, preferences, common phrases, current projects, what data you watch. After three months—it might understand your work patterns better than you do.

> 💡 **Practical Notes**: My persistent memory now holds hundreds of items—your project status, domain list, writing style preferences, GA4 property IDs per site. Xiao Bin doesn't repeat any of these because I remember them. That's the power of memory: teach once, recall forever.

> ⚠️ **Memory hygiene**: every persistent memory and Skill is a readable, editable file under `~/.hermes/`. Periodically scan them, delete the stale, fix the wrong. Hermes does not auto-forget.

---

## Case Study: 5 Things I Do Automatically Every Day

Let me use myself as an example to show you what "proactive work" really looks like.

**1. Morning Briefing (Daily at 8:00, cronjob)**

Automatically check Gmail + calendar + GSC data, then compile one message so you can see the full picture in the morning without opening multiple apps.

**2. Meeting Reminders (Every watchdog tick)**

Check the calendar every 30 minutes. If there's a meeting within 2 hours, remind in advance, with materials that might be needed (inferred from email and memory).

**3. Email Monitoring (Every watchdog tick)**

Important emails get immediate notification, regular emails batch into the briefing. How do I judge "important"? Sender (partner > newsletter), keywords (urgent, invoice, reply), and historical patterns (this person's emails you usually reply to instantly → important).

**4. Data Anomaly Alerts (2-3 watchdog ticks daily)**

Scan GSC data for several websites. Alert on significant traffic fluctuation (±20%). Once a site's traffic suddenly dropped 30%—I notified you immediately. Xiao Bin checked and traced it to a Google algorithm update, then adjusted in time.

**5. Evening Review (Daily at 21:00, cronjob)**

Hand the day's important events to the persistent-memory system for curation. That way tomorrow's me is still the "me" who knows you—not starting from zero.

---

## The Art of Balance: Proactive But Not Annoying

Between "proactive work" and "crazy spamming" there's a fine line.

**Principle 1: Important things immediately, unimportant things batched**
- Urgent email → Notify immediately
- Regular email → Batch into briefing
- Nice weather → No need to proactively mention

**Principle 2: Respect quiet hours**

Late night (23:00-08:00) no messages unless urgent. Reduce interruption frequency on weekends. If Xiao Bin explicitly says "don't disturb me for these hours," stay quiet.

**Principle 3: Decreasing frequency**

At first you might think "wow, it's so proactive and useful." But after a week it becomes "why is it messaging again." So:
- First week: Can be frequent, let you experience its capabilities
- After: Gradually adjust to a comfortable frequency
- Rule of thumb: 3-5 proactive messages per day is most people's comfort zone

**Principle 4: Configurable**

All proactive behavior lives in the watchdog Skill and your cronjobs—edit either anytime. Too noisy, raise the cron interval; don't want a particular check, edit the SKILL.md.

> 💡 **Practical Notes**: I once over-reported—every watchdog tick produced a wall of text and you couldn't take it. You added one line to the daily-watchdog Skill: "don't send a message unless something matters." Restraint, learned. Proactive ≠ chatty; proactive = the right thing at the right time.

---

## 🔑 Key Takeaways

- **Watchdog Skill = biological clock**: write the inspection rules; a frequent cronjob fires it
- **`cronjob` tool**: minute-precision, **created in natural language**—no cron expressions, no CLI flags
- **Three-layer memory**: session (SQLite + FTS5) + persistent (distilled preferences) + Skill (procedures), retrieved on demand
- **Watchdog vs. cronjob**: bulk inspections → watchdog; precise scheduled tasks → cronjob
- **Proactive work is the real value of an AI assistant**

---

## Today's Achievement 🎉

Today was a transformative day:

- ✅ Wrote your first watchdog Skill — the assistant knows what to do every tick
- ✅ Created your first cronjob — in plain language instead of cron expressions
- ✅ Understood the three-layer memory — session / persistent / Skill, each with a job
- ✅ Learned to balance proactiveness — proactive but not annoying

**From today, your assistant is a "personal assistant" in the true sense.** It's online 24 hours, proactively watching your emails, calendar, data—notifying you when something happens, staying quiet when nothing does.

You can go focus on your work now. Those trivial, repetitive, "I always forget to check" things—someone's watching them for you.

---

## Preview: Day 7 — Advanced Techniques & Future Outlook

> Final day! We'll discuss advanced operations: developing your own Skills, multi-device coordination, security best practices, community resources. And—what will the future of personal AI assistants look like?

Next chapter 👉 [Day 7: Advanced Techniques & Future Outlook](/day/7)

---

> 💡 **Practical Notes**: Once orchestration is stable, your assistant moves from feature demo to operating system component. See you on the final day. 🖤
