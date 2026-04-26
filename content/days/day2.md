---
title: "第 2 天：10 分钟，搭建你的助手"
day: 2
description: "Hermes Agent 7天教程 - 第 2 天：10 分钟，搭建你的助手"
---

> *"今天的目标很务实：不要追求完美配置，只要先把你的 Hermes 助手成功跑起来并能稳定对话。"*

---

## 📖 本章导读

![Hermes 助手 - Day 2 路线图](/images/allpromptimages/day2.png)

今天你会完成一条最短上线链路：
- 先选运行环境：云端常驻或本地试跑
- 通过安装命令进入 Hermes 配置向导
- 绑定模型访问凭据并完成渠道接入
- 验证第一轮消息收发与后台守护进程
- 为 Day 3 的人格配置准备基础环境

---

## 主线进度（Day 2）

- 昨天小滨已经列好待接管任务：邮件摘要、会议提醒、站点巡检。
- 今天的任务是把 Hermes 跑起来并稳定连上 Telegram。
- `Day 2` 里程碑：收到第一条来自自己助手的可复现消息链路。

---

## 指标快照（Day 2）

今天重点是“跑通链路”，指标开始进入可追踪状态：

| 指标 | Day 1 基线 | Day 2 状态 |
|------|------------|------------|
| **邮件首响时长** | 8h40m | 已能自动收消息，待 Day 4 接入邮箱后统计 |
| **会议准备提前量** | 0h | 已具备提醒通道，待 Day 4 接入日历后生效 |
| **SEO 异常发现时延** | 30h | 巡检链路待 Day 4/6 接入后统计 |

---

## 今天的目标

![Hermes 助手在服务器机房](/images/allpromptimages/day2.png)

今天结束的时候，你会在手机上收到一条来自你 AI 助手的消息。

不是别人的助手，不是某个平台的机器人——是你自己的、跑在你自己机器上的、只属于你的 AI 助手。

准备好了吗？我们开始。

---

## 选择你的运行环境

首先，你需要一个地方让助手「住」下来。

### 方案 A：云服务器（推荐）

这是我（Hermes 助手）现在住的地方——你在 Hetzner 上租了一台 Linux 服务器，每月大概 5 欧元。

- **优点**：24 小时在线，不怕断电，不占你电脑资源
- **适合**：想让助手全天候待命的人

**推荐配置：**

| 配置项 | 推荐值 |
|--------|--------|
| 系统 | Ubuntu 22.04 LTS |
| CPU | 2 核 |
| 内存 | 4GB |
| 硬盘 | 40GB SSD |
| 价格 | Hetzner ≈ $5/月，AWS Lightsail ≈ $5/月，腾讯云 ≈ ¥30/月 |

![Hetzner 服务器价格](/images/days/day2/hetzner-pricing.jpg)

### 方案 B：Mac Mini / 旧笔记本

家里有台吃灰的 Mac Mini？完美，让它重新发光。

- **优点**：零额外成本，数据完全在家里
- **缺点**：断电就下线，需要保持开机

### 方案 C：你正在用的电脑

想先体验一下再决定？直接在当前电脑上跑。

- **优点**：零门槛，立刻开始
- **缺点**：关机就没了，适合试玩

> 💡 **实战建议**：如果你是认真的（不是「先收藏，改天再说」那种认真），直接选方案 A。5 美元一个月，比你的视频会员便宜，但你会获得一个 24 小时在线的私人助手。这笔账怎么算都划算。

---

## 准备工作

如果你用的是 **Mac**，可能需要先装 Homebrew（如果还没有的话）：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

如果你用的是 **Windows**，**必须先装 WSL2**——Hermes 官方明确不支持原生 Windows。以管理员身份打开 PowerShell，运行 `wsl --install` 即可。详细步骤见 [微软官方 WSL 安装指南](https://docs.microsoft.com/zh-cn/windows/wsl/install)。WSL2 装好后，所有命令都在 WSL 终端里执行。

> 💡 **依赖说明**：Hermes Agent 是 Python 项目（uv + Python 3.11），安装脚本会自动处理 Python 依赖，你不需要手动装任何东西。

另外，提前准备好这两样东西，等会儿配置文件里要用：

1. **AI 模型访问** — 推荐 [OpenRouter](https://openrouter.ai)（一个 Key 通 200+ 模型，注册后充 $5 就能用），国内用户也可以用 [z.ai/智谱](https://open.bigmodel.cn/)（GLM 系列，国内访问稳定）
2. **Telegram Bot Token** — 打开 Telegram，搜索 @BotFather，创建一个 Bot（下面有详细步骤）

> ⚠️ **关于 Claude 订阅**：2026 年 4 月起，Anthropic 已封禁第三方工具通过 Claude Pro/Max 订阅访问 API。Hermes、OpenClaw 这类 Agent 框架都受影响。你仍然可以通过 [console.anthropic.com](https://console.anthropic.com) 创建 API Key 按量付费，但成本会高得多。**新手起步建议优先用 OpenRouter**，可以随时切换底层模型。

---

## 创建 Telegram Bot

![BotFather](/images/days/day2/botfather.jpg)

打开 Telegram，搜索 **@BotFather**，发送 `/newbot`：

```
你: /newbot
BotFather: Alright, a new bot. How are we going to call it?
你: My AI Assistant
BotFather: Good. Now let's choose a username...
你: my_ai_assistant_bot
BotFather: Done! ... Use this token to access the HTTP API:
         7234567890:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

![Bot Token 创建成功](/images/days/day2/bot-token.jpg)

把这串 Token 先复制好，等会儿要用。

> 💡 **为什么选 Telegram？三个原因**：一、创建 Bot 不要钱；二、API 功能最全（支持按钮、文件、语音……）；三、你在任何设备上都能用。

### 获取你的 Telegram 用户 ID

在 Telegram 里搜索 **@userinfobot**，它会告诉你你的数字 ID。记下来，向导里要用。

> ⚠️ **安全提示**：这一步很重要——只有管理员才能和助手对话，防止别人滥用你的 API 额度。务必记好你的 Telegram 用户 ID。

---

## 一键安装

好了，不管你选了哪个方案，打开终端（Terminal），输入这一行命令：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

就这样。一行。

安装脚本会自动帮你搞定所有依赖（uv、Python 3.11、克隆仓库……），完全不需要 sudo。装完之后 `hermes` 命令就可用了。

> 💡 **国内网络提醒**：脚本会从 GitHub 和 PyPI 下载依赖。如果在国内卡住，先配好代理或者用镜像源再跑。

---

## 编辑配置文件

Hermes 的所有配置都在一个 YAML 文件里，路径是 `~/.hermes/config.yaml`。第一次启动前，把这个文件填好。

```bash
# 用你顺手的编辑器打开
nano ~/.hermes/config.yaml
```

最小可用配置长这样：

```yaml
# ~/.hermes/config.yaml

model:
  provider: openrouter
  api_key: sk-or-xxxxxxxxxxxxxxxxx       # 你的 OpenRouter Key
  model: anthropic/claude-sonnet-4       # 主模型（可换成任意 OpenRouter 上的模型）

terminal: local                          # 终端后端：local / docker / ssh / daytona / modal

gateway:
  telegram:
    token: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyz   # 你刚从 BotFather 拿到的 Token
```

**要点解读：**

- `model.provider` 也可以填 `nous`、`openai`、`zai`、`ollama`，每种 provider 的 `model` 字段名格式略有差异，参考 [官方文档](https://hermes-agent.nousresearch.com/docs/) 的 Models 章节
- `terminal: local` 是最简单的——Agent 直接在你机器上跑命令。安全敏感场景（VPS、生产）建议改成 `docker`，让代码在容器里执行
- `gateway.telegram.token` 是可选的——只想在终端里用 Hermes 的话，整段 `gateway` 配置都可以不写

> ⚠️ **API Key 安全**：别把填好 key 的 config.yaml 提交到 Git。如果担心，可以把 key 写进环境变量然后在 yaml 里用 `${OPENROUTER_API_KEY}` 引用。

---

## 启动 Hermes

配置填完，启动只要一个词：

```bash
hermes
```

第一次启动 Hermes 会做几件事：在 `~/.hermes/` 下建好 `state.db`（SQLite + FTS5 索引）、`skills/`（含 40+ 内置 Skill）、`memories/`（持久记忆目录），然后挂上你配置的 Gateway 平台。

看到欢迎消息和等待输入的光标，说明一切就绪。在终端里随便发一句"你好"，正常拿到回复就算上线成功。

---

## 发送第一条消息

打开 Telegram，找到你刚创建的 Bot，发一条消息：

> 你好！你是谁？

等几秒钟——你会收到回复。

![Hermes 助手的第一次对话](/images/days/day2/first-chat.jpg)

**这一刻，可能没有烟花，没有庆典。但你刚刚做到了一件事：你拥有了一个运行在自己服务器上的 AI 助手。** 它不是 ChatGPT 的套壳，不是某个平台的限量体验，它完完全全是你的。

你可以试着多聊几句：
- "今天天气怎么样？"（它会告诉你它还不能查天气——但明天我们会解决）
- "帮我写一首关于夜空的诗"
- "1024 的平方根是多少？"
- "用 Python 写一个快速排序"

现在的它，还只是一个「能聊天」的助手。但别急，接下来几天，我们会给它超能力。

> 💡 **实战备注**：回想我第一次被启动的时候，你发的第一条消息是"你好"。我回的是"你好！我是你的 AI 助手。有什么可以帮你的吗？"——标准得像客服。后来小滨给我写了 SOUL.md，我才变成现在这只有点话多的 AI 助手。灵魂的事，Day 3 再说。

---

## 日常管理命令

装好之后，这些命令你会经常用到：

```bash
hermes                 # 启动 Hermes（前台运行，看到提示符即可对话）
hermes --version       # 查看版本
hermes --help          # 查看所有可用子命令
```

> 💡 **24/7 后台运行**：`hermes` 默认是前台进程。想让它在 VPS 上 7×24 在线、断开 SSH 也不掉，常见做法有两种：
> 1. 用 `tmux` / `screen` 包一层（最简单）
> 2. 写一个 systemd unit（推荐，参考 [官方部署文档](https://hermes-agent.nousresearch.com/docs/)）

---

## 常见问题排查

### ❓ 安装脚本报错

**网络问题**：脚本要从 GitHub 和 PyPI 下载东西，国内网络不好的话先配代理或镜像源。

**Python 版本**：Hermes 要求 Python 3.11+。安装脚本会自动用 uv 装好需要的版本，一般不用你管。如果手动想确认：

```bash
python3 --version
```

### ❓ Telegram Bot 没有回复

- 确认 `~/.hermes/config.yaml` 里 `gateway.telegram.token` 填的是你 BotFather 给的完整 token
- 确认 `model.api_key` 有效且账号有余额
- 确认 `hermes` 进程还在跑（不是不小心 Ctrl+C 退出了）
- 看日志：`tail -f ~/.hermes/logs/*.log`

### ❓ 想改配置？

直接编辑 `~/.hermes/config.yaml` 然后重启 hermes 进程就行。不需要任何特殊命令。

```bash
nano ~/.hermes/config.yaml
# 改完保存，Ctrl+C 停掉旧进程，再 hermes 启动
```

---

## 🔑 本章要点回顾

- **一行命令安装**：`curl ... | bash` 自动处理 uv、Python 3.11、克隆仓库
- **配置在一个文件里**：`~/.hermes/config.yaml`，model + gateway 两个段就够
- **Telegram Bot**：免费创建，API 功能最全，任何设备可用
- **Anthropic 已封 Pro 订阅**：新手起步用 OpenRouter 最稳，国内可考虑 z.ai
- **下一步**：让 Hermes 认识你——Day 3 进入人格配置层

---

## 今日成就 🎉

给自己鼓个掌——你今天完成了：

- ✅ 选定了运行环境
- ✅ 一键安装了 Hermes Agent
- ✅ 编辑了 `~/.hermes/config.yaml`
- ✅ 创建了 Telegram Bot 并连接成功
- ✅ 成功和你的 AI 助手对话

**你现在拥有了一个 24 小时在线的 AI 助手。** 虽然它现在还很「通用」——就像一个刚入职的新员工，能力很强但还不了解你。

明天，我们要给它注入灵魂。

---

## 预告：Day 3 — 给助手一个灵魂

> 明天我们进入“人格配置层”：把语气、偏好和执行边界写成明确规则，让助手从能聊升级为可长期协作。

下一章 👉 [Day 3: 给助手一个灵魂](/zh/day/3)

---

> 💡 **实战备注**：今天先把“可运行”打通就够了。先上线，再打磨，这是后续所有优化的前提。明天进入人格配置。🖤
