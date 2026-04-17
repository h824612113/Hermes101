---
title: "多平台部署：Telegram + Discord 同时接入"
chapter: 6
date: 2026-04-16
summary: 一个 Hermes 实例可以同时接入多个平台。配置好之后，你在 Telegram 说的话 Discord 那边也能看到（如果你需要的话）。
tags: [部署, Telegram, Discord, 多平台]
status: draft
---

## 一个实例，多个入口

Hermes 的核心逻辑和记忆是统一的。接入不同平台只是多了几个"对话窗口"。

```
                    ┌── Telegram ──┐
                    │              │
用户 ──── Discord ───┤   Hermes     ├── 记忆/文件/工具
                    │   (同一实例)   │
                    └── CLI ───────┘
```

## Telegram 接入

### 第一步：创建 Bot

1. 在 Telegram 找 @BotFather
2. 发送 `/newbot`
3. 输入 bot 名称和用户名
4. 拿到 Bot Token（格式：`123456:ABC-DEF...`）

### 第二步：配置

```yaml
# config.yaml
channels:
  telegram:
    enabled: true
    token: "${TELEGRAM_BOT_TOKEN}"
    # 允许谁跟 bot 对话（你的 Telegram ID）
    allowed_users:
      - 7333347813  # 你的 user ID
    # 是否响应群消息
    respond_in_groups: false
```

### 第三步：获取你的 User ID

找 @userinfobot，发任意消息，它会返回你的数字 ID。

### 第四步：启动

```bash
export TELEGRAM_BOT_TOKEN="123456:ABC-DEF..."
hermes serve
```

## Discord 接入

### 第一步：创建 Bot

1. 去 https://discord.com/developers/applications
2. 创建 Application → 添加 Bot
3. 拿到 Bot Token
4. 在 Bot 设置里开启 **Message Content Intent**

### 第二步：邀请 Bot 到服务器

在 OAuth2 → URL Generator 里：
- Scopes: `bot`
- Permissions: `Send Messages`, `Read Message History`, `Attach Files`

复制生成的 URL，打开邀请 bot 到你的服务器。

### 第三步：配置

```yaml
# config.yaml
channels:
  discord:
    enabled: true
    token: "${DISCORD_BOT_TOKEN}"
    # 允许哪些频道
    allowed_channels:
      - "1180423283305369620"  # 频道 ID
    # 允许哪些用户（留空表示所有人）
    allowed_users: []
    # 是否响应群消息（只响应 @提及）
    respond_to_mentions: true
```

### 第四步：获取频道 ID

Discord 设置 → 高级 → 开启开发者模式 → 右键频道 → 复制 ID

## 同时跑

```bash
# .env 文件
TELEGRAM_BOT_TOKEN=123456:ABC-DEF
DISCORD_BOT_TOKEN=MTxxxxxx.xxxxxx.xxxxx

# 启动（两个平台同时接入）
hermes serve
```

就这样。一个进程同时处理 Telegram 和 Discord 消息。

## Cron 推送到多平台

Cron 任务可以指定推送到不同平台：

```json
{
  "name": "daily-report-telegram",
  "deliver": "telegram:7333347813",
  "prompt": "生成日报..."
}
```

```json
{
  "name": "daily-report-discord",
  "deliver": "discord:1180423283305369620",
  "prompt": "生成日报..."
}
```

也可以同时推：创建两个 cron 任务，同一个 prompt，不同 deliver 目标。

## 群聊行为

### Telegram 群

```yaml
channels:
  telegram:
    respond_in_groups: false  # 不主动响应群消息
    # 或
    respond_in_groups: true   # 响应所有群消息
    group_trigger: "@hermes"  # 只有 @提及才响应
```

### Discord 群

```yaml
channels:
  discord:
    respond_to_mentions: true  # 只响应 @提及
    respond_in_threads: true   # 响应线程消息
```

## 常见坑

### 坑 1：Token 放在 config.yaml 里
Token 属于敏感信息。用环境变量：
```yaml
token: "${TELEGRAM_BOT_TOKEN}"  # ✅
token: "123456:ABC-DEF"         # ❌
```

### 坑 2：群聊里泄露私人信息
AI 有你的 MEMORY.md 里的私人内容。在群聊里它可能不小心说出来。

**防御：** 在 SOUL.md 里加：
```markdown
## Group Chat

- 不泄露 MEMORY.md 里的私人信息
- 不代表用户发言
- 用 HEARTBEAT_OK 回复不需要响应的消息
```

### 坑 3：Discord 长消息被截断
Discord 消息有 2000 字符限制。AI 的长回复会被截断。

**解决：** 配置自动分段发送，或限制回复长度。

---

## 本章要点

- 一个 Hermes 实例可以同时接入 Telegram + Discord + CLI
- Token 用环境变量，不要硬编码
- 群聊里注意隐私保护
- Cron 可以推送到不同平台
- SOUL.md 里要写群聊行为规则

**下一章：** Docker 沙箱 — 在容器里跑不信任的代码。
