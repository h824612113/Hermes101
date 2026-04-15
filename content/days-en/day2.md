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

- Yesterday, Zhou Mu listed the first workflows to delegate: email summary, meeting reminders, and site checks.
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

If you're on **Windows**, **you do not have to install WSL2 first**. Hermes Agent can run directly on native Windows. If your goal is to get started quickly—or you want Hermes Agent to work directly with Windows files, browsers, WeChat, or other desktop apps—**native Windows is usually the better default**. Only choose **WSL2 (Windows Subsystem for Linux)** if you prefer a Linux CLI workflow or want an environment that feels closer to a server. If you do want the WSL2 route, open PowerShell as Administrator and run `wsl --install`. See the [official Microsoft WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install) for details.

Also, prepare these two things in advance—the wizard will need them:

1. **AI Model Access (choose one)** — If you have a Claude subscription (Pro/Max/Team), you can just OAuth login in the wizard, no API Key needed; or go to [console.anthropic.com](https://console.anthropic.com) to create an API Key (pay as you go)
2. **Telegram Bot Token** — Open Telegram, search for @BotFather, create a Bot (detailed steps below)

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

## One-Click Install + Auto Configuration

Alright, regardless of which option you chose, open your Terminal and enter this one line:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

That's it. One line.

The install script will automatically handle all dependencies (Node.js, Git...), then go directly into the interactive setup wizard—no need to manually run any setup commands.

![Hermes Agent Installation Wizard - Security Warning](/images/days/day2/install-security.jpg)

---

## What Will the Wizard Ask You?

The wizard will guide you through all configuration step by step, just follow the prompts:

**1. Choose Mode**: QuickStart (recommended) or Advanced. New users should choose QuickStart.

![Choose Onboarding Mode](/images/days/day2/onboarding-mode.jpg)

**2. Choose AI Model**: Claude recommended, Hermes Agent works best with Claude. Two connection methods:
- If you have a Claude subscription, choose **setup-token connection** (no API Key needed, no extra charges)
- If no subscription, choose **Anthropic API Key** (pay as you go)

> 💡 **Supported Models**: Besides Anthropic Claude Opus 4.5 (recommended), it also supports OpenAI GPT-5.2, Google Gemini 3 Pro, Moonshot (Kimi K2.5), MiniMax M2.1, Z.AI (GLM-4.7), xAI (Grok), Qwen, Venice, OpenRouter, and 10+ other providers. But Claude is the first choice. Those with Claude subscriptions should use setup-token connection for convenience (no API Key needed, no extra charges).

![Choose Model Provider](/images/days/day2/model-provider.jpg)

**3. Configure Chat Channel**: Choose Telegram, paste the Bot Token you got from BotFather earlier.

![Choose Chat Channel](/images/days/day2/select-channel.jpg)

**4. Set Admin**: Enter your Telegram user ID.

![Configure Telegram allowFrom](/images/days/day2/telegram-allowfrom.jpg)

**5. Install Background Daemon**: The wizard will ask if you want to install a daemon (background service). Choose Yes—this way your assistant runs automatically in the background, starts on boot, no manual management needed.
- Linux servers: Automatically creates systemd user service
- Mac: Automatically creates LaunchAgent

**6. Health Check + Skills Installation**: Finally, the wizard will start the Gateway, run health checks, and let you choose to install recommended skills.

The whole process takes about 3-5 minutes, just follow the prompts the whole way, no need to manually edit any configuration files.

![Dashboard Ready](/images/days/day2/dashboard-ready.jpg)

---

## Your Assistant Is Online

After the wizard completes, your assistant is already running in the background. Verify it:

```bash
hermes gateway status
```

![Hermes Agent Status](/images/days/day2/hermes-status.jpg)

If you see the Gateway is running, everything is ready.

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
hermes status          # Check overall status
hermes gateway status  # Check Gateway running status
hermes health          # Health check
hermes configure       # Reconfigure (change model, channels, etc.)
hermes daemon restart  # Restart background service
hermes daemon logs     # View runtime logs
```

---

## Troubleshooting Common Issues

### ❓ Install Script Error

**Node.js version too low**: Hermes Agent requires Node.js 22+. Check version:

```bash
node -v
```

If the version isn't enough, the install script usually installs it automatically. If not, upgrade manually:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 22
```

### ❓ Telegram Bot Not Responding

- Confirm Bot Token is correct
- Confirm your user ID is in the admin list
- Check logs: `hermes daemon logs`
- Confirm API Key is valid and has balance
- First DM might need pairing approval: `hermes pairing list telegram`, then `hermes pairing approve telegram <code>`

### ❓ Want to Reconfigure?

You can rerun the wizard anytime:

```bash
hermes onboard
```

Or just change a specific part:

```bash
hermes configure
```

---

## 🔑 Key Takeaways

- **One command handles everything**: `curl ... | bash` installs and automatically enters the configuration wizard
- **Wizard guides you through**: Choose model, enter Key, configure Telegram, install daemon—just follow the prompts
- **Telegram Bot**: Free to create, most complete API features, works on any device
- **Security first**: Set admin ID, only you can chat with the assistant
- **Auto-runs in background**: Daemon service enables 24/7 availability, starts on boot
- **Next step**: Give the assistant a soul, transform it from "generic AI" to "your AI"

---

## Today's Achievement 🎉

Give yourself a pat on the back—today you completed:

- ✅ Chose your runtime environment
- ✅ Installed Hermes Agent with one command
- ✅ Completed all configuration through the wizard
- ✅ Created a Telegram Bot and connected successfully
- ✅ Successfully chatted with your AI assistant
- ✅ Background daemon running automatically

**You now have an AI assistant online 24 hours a day.** Though it's still quite "generic" right now—like a new employee who just started, very capable but doesn't know you yet.

Tomorrow, we give it a soul.

---

## Preview: Day 3 — Give Your Assistant a Soul

> Tomorrow we move into the persona layer: convert tone, preference, and execution boundaries into explicit rules for long-term consistency.

Next chapter 👉 [Day 3: Give Your Assistant a Soul](/day/3)

---

> 💡 **Practical Notes**: The important milestone today is repeatability. If you can rebuild the same setup tomorrow, you've done it right. See you on Day 3. 🖤
