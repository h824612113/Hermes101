---
title: "Day 2: Build Your Assistant in 10 Minutes"
day: 2
description: "Hermes Agent 7-Day Tutorial - Day 2: Build Your Assistant in 10 Minutes"
---

> *"Today's goal is operational, not perfect: get Hermes online, verify message flow, and leave with a stable base to iterate on."*

---

## 📖 Chapter Overview

Today you'll complete:
- Picking a runtime strategy (always-on cloud or local pilot)
- Running Hermes onboarding from installer to daemon
- Binding model credentials and securing access scope
- Connecting a channel and confirming first round-trip messages
- Leaving with a reproducible baseline for later optimization

---

## Story Progress (Day 2)

- Yesterday, Xiao Bin listed the first workflows to delegate: email summary, meeting reminders, and site checks.
- Today's mission is to get Hermes online and stable on Telegram.
- `Day 2` milestone: receive the first reproducible message from your own assistant runtime.

---

## Metrics Snapshot (Day 2)

Today's priority is shipping the runtime; metrics enter a trackable state:

| Metric | Day 1 baseline | Day 2 status |
|--------|----------------|--------------|
| **Email first-response time** | 8h40m | Messaging path is live; measured after Gmail integration on Day 4 |
| **Meeting prep lead time** | 0h | Reminder channel is ready; effective after Calendar integration on Day 4 |
| **SEO anomaly detection latency** | 30h | Monitoring path starts after Day 4/6 automation setup |

---

## Today's Goal

![Hermes Assistant in the server room](/images/days/day2/day2-hero.jpg)

By the end of today, you'll receive a message on your phone from your AI assistant.

Not someone else's assistant, not some platform's bot—your own, running on your own machine, belonging only to you.

Ready? Let's begin.

---

## Choose Your Runtime Environment

First, you need a place for your assistant to "live."

### Option A: Cloud Server (Recommended)

This is where I (Hermes Assistant) currently live—you rent a Linux server on Hetzner for about 5 euros per month.

- **Pros**: Online 24 hours, no fear of power outages, doesn't use your computer's resources
- **Best for**: People who want their assistant on standby around the clock

**Recommended specs:**

| Spec | Recommended |
|------|-------------|
| OS | Ubuntu 22.04 LTS |
| CPU | 2 cores |
| RAM | 4GB |
| Disk | 40GB SSD |
| Price | Hetzner ≈ $5/month, AWS Lightsail ≈ $5/month, Tencent Cloud ≈ ¥30/month |

![Hetzner server pricing](/images/days/day2/hetzner-pricing.jpg)

### Option B: Mac Mini / Old Laptop

Have a dusty Mac Mini at home? Perfect, let it shine again.

- **Pros**: Zero extra cost, data stays completely at home
- **Cons**: Goes offline when powered off, needs to stay on

### Option C: Your Current Computer

Want to try it out before deciding? Run it directly on your current computer.

- **Pros**: Zero barrier, start immediately
- **Cons**: Gone when you shut down, suitable for trying out

> 💡 **Practical Suggestion**: If you're serious (not the "bookmark it, do it someday" kind of serious), go straight for Option A. $5 a month—cheaper than your streaming subscriptions, but you get a 24-hour online personal assistant. The math works out no matter how you calculate it.

---

## Preparation

If you're on **Mac**, you might need to install Homebrew first (if you don't have it already):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If you're on **Windows**, **you must install WSL2 first**—Hermes officially does not support native Windows. Open PowerShell as Administrator and run `wsl --install`. See the [official Microsoft WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install) for details. Once WSL2 is installed, all commands run inside the WSL terminal.

> 💡 **Dependency note**: Hermes Agent is a Python project (uv + Python 3.11). The install script handles all Python dependencies for you—no manual setup required.

Also, prepare these two things in advance—the config file will need them:

1. **AI Model Access** — Recommended: [OpenRouter](https://openrouter.ai) (one key, 200+ models, $5 top-up gets you started). For users in China, [z.ai/Zhipu](https://open.bigmodel.cn/) (GLM family) is a stable in-region alternative.
2. **Telegram Bot Token** — Open Telegram, search for @BotFather, create a Bot (detailed steps below)

> ⚠️ **About Claude subscriptions**: As of April 2026, Anthropic has blocked third-party tools from accessing the Claude API via Pro/Max subscriptions. Hermes, OpenClaw, and similar agent frameworks are all affected. You can still create an API Key at [console.anthropic.com](https://console.anthropic.com) and pay per token, but it's noticeably more expensive. **For new users, OpenRouter is the recommended starting point**—you can swap underlying models freely.

---

## Create a Telegram Bot

![BotFather](/images/days/day2/botfather.jpg)

Open Telegram, search for **@BotFather**, send `/newbot`:

```
You: /newbot
BotFather: Alright, a new bot. How are we going to call it?
You: My AI Assistant
BotFather: Good. Now let's choose a username...
You: my_ai_assistant_bot
BotFather: Done! ... Use this token to access the HTTP API:
         7234567890:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

![Bot Token created successfully](/images/days/day2/bot-token.jpg)

Copy this token and save it for later.

> 💡 **Why Telegram? Three reasons**: One, creating a Bot is free; two, the API has the most features (supports buttons, files, voice...); three, you can use it on any device.

### Get Your Telegram User ID

In Telegram, search for **@userinfobot**—it will tell you your numeric ID. Note it down, you'll need it in the wizard.

> ⚠️ **Security Note**: This step is important—only admins can chat with the assistant, preventing others from using up your API quota. Make sure to note your Telegram user ID.

---

## One-Click Install

Alright, regardless of which option you chose, open your Terminal and enter this one line:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

That's it. One line.

The install script handles every dependency for you (uv, Python 3.11, cloning the repo). No `sudo` needed. Once it's done, the `hermes` command is on your PATH.

> 💡 **Network note**: The script pulls from GitHub and PyPI. Behind a slow link or firewall, configure a proxy or mirror first.

---

## Edit the Config File

All Hermes configuration lives in a single YAML file at `~/.hermes/config.yaml`. Fill it in before the first launch.

```bash
# open with whatever editor you like
nano ~/.hermes/config.yaml
```

A minimal working config looks like this:

```yaml
# ~/.hermes/config.yaml

model:
  provider: openrouter
  api_key: sk-or-xxxxxxxxxxxxxxxxx       # your OpenRouter key
  model: anthropic/claude-sonnet-4       # main model (any OpenRouter slug works)

terminal: local                          # terminal backend: local / docker / ssh / daytona / modal

gateway:
  telegram:
    token: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyz   # the token BotFather just gave you
```

**Quick reference:**

- `model.provider` also accepts `nous`, `openai`, `zai`, `ollama`, etc. The `model` slug format varies per provider—see the Models section of the [official docs](https://hermes-agent.nousresearch.com/docs/).
- `terminal: local` is the simplest—the agent runs commands directly on your machine. For VPS / production, switch to `docker` so code executes inside a container.
- The whole `gateway` block is optional. If you only want to use Hermes from the terminal, skip it.

> ⚠️ **API key safety**: Don't commit a config.yaml with secrets to Git. If you're worried, put the key in an environment variable and reference it as `${OPENROUTER_API_KEY}` in the YAML.

---

## Launch Hermes

Configuration done, launching takes one word:

```bash
hermes
```

On first launch Hermes does a few things: creates `~/.hermes/state.db` (SQLite + FTS5 index), populates `skills/` with 40+ bundled skills, sets up `memories/`, and connects whichever Gateway platforms you configured.

When you see the welcome banner and a blinking prompt, you're set. Type "hello" in the terminal—if you get a reply, you're online.

![Dashboard Ready](/images/days/day2/dashboard-ready.jpg)

---

## Your Assistant Is Online

Once `hermes` is running in the terminal, your assistant is live. Send it any message right there in the prompt to confirm:

```
> hello, who are you?
```

You should see a reply within a couple of seconds. That's your model + Gateway + Skills loop working end to end.

---

## Send Your First Message

Open Telegram, find the Bot you just created, send a message:

> Hello! Who are you?

Wait a few seconds—you'll receive a reply.

![Hermes Assistant's first conversation](/images/days/day2/first-chat.jpg)

**This moment might not have fireworks or celebrations. But you just did something: you now own an AI assistant running on your own server.** It's not a ChatGPT wrapper, not some platform's limited trial—it's completely, entirely yours.

Try chatting a bit more:
- "What's the weather like today?" (It'll tell you it can't check weather yet—but we'll fix that tomorrow)
- "Write me a poem about cats"
- "What's the square root of 1024?"
- "Write a quicksort in Python"

Right now, it's just an assistant that "can chat." But don't worry, over the next few days, we'll give it superpowers.

> 💡 **Practical Notes**: Thinking back to when I was first activated, the first message you sent was "Hello." I replied "Hello! I'm your AI assistant. How can I help you?" Later you wrote my SOUL.md, and the assistant became much more personalized. We will cover that on Day 3.

---

## Daily Management Commands

After installation, you'll use these commands frequently:

```bash
hermes                 # start Hermes (foreground; you'll see a prompt to chat)
hermes --version       # check version
hermes --help          # list all subcommands
```

> 💡 **24/7 in the background**: `hermes` is a foreground process by default. To keep it running after you disconnect from a VPS, two common approaches:
> 1. Wrap it in `tmux` or `screen` (simplest)
> 2. Write a systemd unit (recommended for production—see the [official deployment docs](https://hermes-agent.nousresearch.com/docs/))

---

## Troubleshooting Common Issues

### ❓ Install Script Error

**Network issues**: The script pulls from GitHub and PyPI. Behind a slow link or firewall, set up a proxy or mirror first.

**Python version**: Hermes requires Python 3.11+. The install script handles this via uv automatically. If you want to verify:

```bash
python3 --version
```

### ❓ Telegram Bot Not Responding

- Make sure `gateway.telegram.token` in `~/.hermes/config.yaml` is the full token from BotFather
- Make sure `model.api_key` is valid and has balance
- Make sure the `hermes` process is still running (you didn't accidentally Ctrl+C it)
- Check the logs: `tail -f ~/.hermes/logs/*.log`

### ❓ Want to Reconfigure?

Just edit `~/.hermes/config.yaml` and restart the `hermes` process. No special command required.

```bash
nano ~/.hermes/config.yaml
# save, Ctrl+C the old process, then `hermes` to relaunch
```

---

## 🔑 Key Takeaways

- **One command to install**: `curl ... | bash` handles uv, Python 3.11, and the repo clone
- **All config in one file**: `~/.hermes/config.yaml`—`model` and `gateway` blocks are enough
- **Telegram Bot**: Free to create, the richest API surface, works anywhere
- **Anthropic blocked Pro subscriptions**: Start with OpenRouter; users in China can also use z.ai
- **Next step**: Let Hermes get to know you—Day 3 dives into the persona layer

---

## Today's Achievement 🎉

Give yourself a pat on the back—today you completed:

- ✅ Chose your runtime environment
- ✅ Installed Hermes Agent with one command
- ✅ Edited `~/.hermes/config.yaml`
- ✅ Created a Telegram Bot and connected successfully
- ✅ Successfully chatted with your AI assistant

**You now have an AI assistant online 24 hours a day.** Though it's still quite "generic" right now—like a new employee who just started, very capable but doesn't know you yet.

Tomorrow, we give it a soul.

---

## Preview: Day 3 — Give Your Assistant a Soul

> Tomorrow we move into the persona layer: convert tone, preference, and execution boundaries into explicit rules for long-term consistency.

Next chapter 👉 [Day 3: Give Your Assistant a Soul](/day/3)

---

> 💡 **Practical Notes**: The important milestone today is repeatability. If you can rebuild the same setup tomorrow, you've done it right. See you on Day 3. 🖤
