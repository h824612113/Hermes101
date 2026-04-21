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

## Heartbeat Mechanism 💓

Heartbeat is one of Hermes Agent's core mechanisms—it lets your assistant periodically "wake up" to proactively check if there's anything that needs handling.

### How It Works

Hermes Agent sends a heartbeat signal to your assistant at set intervals (default 30 minutes). When the assistant receives the signal, it:

1. Reads the task list in HEARTBEAT.md
2. Checks each item
3. Sends a message if there's something you need to know about
4. If nothing, quietly responds with `HEARTBEAT_OK`

### Configure Heartbeat

Edit `~/hermes/HEARTBEAT.md`:

```markdown
# Heartbeat Tasks

## Check Every Time
- Check Gmail for important emails
- Check calendar for meetings within 2 hours that need reminders

## Check 2-3 Times Daily
- Check if websites are accessible
- Check GSC for unusual data fluctuations

## Don't Need to Proactively Do
- Weather queries (wait until I ask)
- Social media (unless I'm @mentioned)
```

### Heartbeat Interval

Set in Hermes Agent configuration:

```bash
hermes configure --section gateway
```

You can adjust the heartbeat interval in the wizard, or directly edit the `heartbeat.interval` field in the config file.

Common settings:
- **15m** — Quite frequent, good for workday daytime
- **30m** — Default, balance of efficiency and cost
- **1h** — More economical, good for off-hours

> 💡 **Practical Notes**: My heartbeat interval is 30 minutes. Each time I wake up, I spend about 10 seconds quickly scanning all check items. If everything's normal I go back to sleep, if there's something I notify you. About 3-5 proactive messages per day—just enough, not annoying.

---

## Scheduled Tasks (Cron) ⏰

Heartbeat is good for "check every so often" tasks. But some things need precise timing, like:

- Send morning briefing at 8:00 AM every day
- Send weekly report Monday morning at 9:00 AM
- Check server bills on the 1st of every month

That's when you use Cron scheduled tasks.

### Create Cron Tasks

```bash
hermes cron add --name "Morning Briefing" --cron "0 8 * * *" \
  --system-event "Generate today's briefing: check email, calendar, website data, compile into one message and send to me"
```

Cron expressions are the same as Linux crontab:

```
min hour day month weekday
0   8    *   *     *       → Every day at 8:00
0   9    *   *     1       → Every Monday at 9:00
0   10   1   *     *       → 1st of every month at 10:00
*/30 9-18 * * 1-5          → Weekdays 9:00-18:00 every 30 minutes
```

### Practical Cron Task Examples

**Morning Briefing (Daily at 8:00):**
```bash
hermes cron add --name "Morning Briefing" --cron "0 8 * * *" \
  --system-event "Morning briefing: 1) Check unread emails and summarize important ones 2) Today's calendar schedule 3) Any website data anomalies. Compile and send to me."
```

**Weekly Report (Every Monday at 9:00):**
```bash
hermes cron add --name "Weekly Report" --cron "0 9 * * 1" \
  --system-event "Generate last week's work report: summarize important events, completed tasks, website data changes, important emails received."
```

**Health Reminder (Weekdays every 2 hours):**
```bash
hermes cron add --name "Health Reminder" --cron "0 10,12,14,16 * * 1-5" \
  --system-event "Gentle reminder: Get up and move around, drink some water. If you've been working for over 2 hours straight, strongly recommend a 10-minute break."
```

### Heartbeat vs Cron: When to Use What?

| | Heartbeat | Cron |
|---|---|---|
| **Trigger** | Fixed interval | Precise time |
| **Good for** | Routine checks, status monitoring | Scheduled reports, reminders |
| **Precision** | May drift by a few minutes | Precise to the minute |
| **Context** | Has full conversation history | Independent execution, no context |
| **Cost** | Most of the time no messages generated | Executes every time |

**Simple rule**: Check every so often → Heartbeat; Do at specific time → Cron.

---

## Memory System 🧠

Once your assistant works proactively, it generates lots of information daily—what it checked, what it found, what you asked it to do. Without memory, every time it wakes up it's completely fresh, remembering nothing.

Hermes Agent's memory system has three layers:

### 1. Daily Notes: memory/YYYY-MM-DD.md

The assistant automatically creates a note file each day, recording what happened:

```markdown
# 2025-07-20

## Morning
- Morning briefing sent: 3 important emails, 2 meetings
- Xiao Bin asked me to check docs.xiaobin.dev search data
- Found /guides/start page ranking dropped from #8 to #12, notified

## Afternoon
- Helped Xiao Bin write an API route
- Reminded about 14:00 meeting
- Xiao Bin said weekly report format should include "what I learned this week"

## Evening
- 21:00 routine check, all normal
- Xiao Bin still working at 23:30, reminded to rest
```

### 2. Long-term Memory: MEMORY.md

Every few days, the assistant reviews recent daily notes and distills what's worth keeping long-term into MEMORY.md:

```markdown
# Long-term Memory

## Xiao Bin's Work Habits
- Prefers deep work in afternoon, handles misc in morning
- Doesn't like being interrupted while coding, unless urgent email
- Weekly report format should include "what I learned this week" (confirmed July 20)

## Project Status
- xiaobin.dev — Focus on /templates page SEO
- docs.xiaobin.dev — /guides/start page ranking dropped, needs monitoring

## Lessons Learned
- GSC data has 2-3 day delay, don't compare yesterday and today's data
- Xiao Bin doesn't like long messages, use bold + lists for important info
```

### 3. Soul Memory: SOUL.md + USER.md

These two files are also part of memory—they're "core memories" that don't change with dates, defining who the assistant is and who Xiao Bin is.

**Three layers of memory working together:**
- SOUL.md + USER.md → Who I am, who you are (unchanging)
- MEMORY.md → Everything I know about you (slowly accumulating)
- memory/date.md → What happened today (updated daily)

**Result: Your assistant gets to know you better and better.**

First week, it only knows basic info you wrote in USER.md. After a month, it knows your work habits, preferences, common phrases, current projects, what data you track. After three months—it might understand your work patterns better than you do.

> 💡 **Practical Notes**: My MEMORY.md now has several hundred lines. It records your project status, domain list, writing style preferences, and each website's GA4 property ID. Xiao Bin no longer needs to repeat these details because I remember.

---

## Case Study: 5 Things I Do Automatically Every Day

Let me use myself as an example to show you what "proactive work" really looks like.

**1. Morning Briefing (Daily at 8:00, Cron)**

Automatically check Gmail + calendar + GSC data, then compile one message so you can see the full picture in the morning without opening multiple apps.

**2. Meeting Reminders (Every heartbeat check)**

Check calendar every 30 minutes. If there's a meeting within 2 hours, remind in advance, with materials that might be needed (inferred from email and memory).

**3. Email Monitoring (Every heartbeat check)**

Important emails get immediate notification, regular emails batch into the briefing. How do I judge "important"? Based on sender (partner > newsletter), keywords (urgent, invoice, reply), and historical patterns (this person's emails you usually reply to instantly -> important).

**4. Data Anomaly Alerts (2-3 heartbeat checks daily)**

Scan GSC data for several websites. Alert on significant traffic fluctuation (+/-20%). Once xiaobin.dev traffic suddenly dropped 30%, I immediately notified you. Xiao Bin checked and found it was due to a Google algorithm update, then adjusted in time.

**5. Evening Review (Daily at 21:00, Cron)**

Record today's important events to daily notes, update MEMORY.md. This way tomorrow's me is still the "me" who knows you, not starting from zero.

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

Write all proactive behaviors in HEARTBEAT.md and Cron, you can adjust anytime. Too frequent, change the interval. Don't need a certain check, delete it.

> 💡 **Practical Notes**: I was once too "enthusiastic"—reporting a bunch of stuff every heartbeat, you couldn't take it and added a line in SOUL.md: "don't send messages if there's nothing important." Since then I learned restraint. Proactive ≠ chatty, proactive = saying the right thing at the right time.

---

## 🔑 Key Takeaways

- **Heartbeat = Biological clock**: Automatically wakes every 30 minutes, checks email/calendar/notifications
- **Cron = Precise alarm**: Precise to the minute, supports one-time and recurring tasks
- **Memory system**: Daily notes (logs) + MEMORY.md (long-term memory), knows you better over time
- **Heartbeat vs Cron**: Batch checks use heartbeat, precise timing use Cron
- **Proactive work is the real value of an AI assistant**

---

## Today's Achievement 🎉

Today was a transformative day:

- ✅ Configured heartbeat mechanism — Assistant auto-checks every 30 minutes
- ✅ Set up Cron scheduled tasks — Morning briefing, weekly report, reminders
- ✅ Understood the three-layer memory system — Assistant knows you better over time
- ✅ Learned to balance proactiveness — Proactive but not annoying

**From today, your assistant is a "personal assistant" in the true sense.** It's online 24 hours, proactively watching your emails, calendar, data—notifying you when something happens, staying quiet when nothing does.

You can go focus on your work now. Those trivial, repetitive, "I always forget to check" things—someone's watching them for you.

---

## Preview: Day 7 — Advanced Techniques & Future Outlook

> Final day! We'll discuss advanced operations: developing your own Skills, multi-device coordination, security best practices, community resources. And—what will the future of personal AI assistants look like?

Next chapter 👉 [Day 7: Advanced Techniques & Future Outlook](/day/7)

---

> 💡 **Practical Notes**: Once orchestration is stable, your assistant moves from feature demo to operating system component. See you on the final day. 🖤
