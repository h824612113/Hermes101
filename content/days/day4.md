---
title: "第 4 天：接入你的数字生活"
day: 4
description: "Hermes Agent 7天教程 - 第 4 天：接入你的数字生活"
---

> *"今天的关键词是‘接入真实上下文’：让助手不只回答问题，而是真正读取你正在使用的数据与服务。"*

---

## 📖 本章导读

![Hermes 助手 - Day 4 数字生活接入](/images/allpromptimages/day4.png)

今天你会完成执行层接入：
- 理解 Skills 在外部系统连接中的作用
- 接入 Gmail，让助手处理邮件相关任务
- 接入 Google Calendar，让它读取并管理日程
- 配置搜索与浏览能力，建立在线检索链路
- 明确权限边界，避免“能做但不该做”的操作

---

## 主线进度（Day 4）

- Day 3 之后，小滨的助手已经有稳定人格和执行边界。
- 今天进入执行层：把邮件、日历、搜索、浏览器接进 Hermes 101 的真实工作流。
- `Day 4` 里程碑：助手能读取真实业务上下文并完成跨工具查询。

---

## 指标更新（Day 4）

执行层接入后，三项指标第一次出现实质变化：

| 指标 | Day 1 基线 | Day 4 样例值 |
|------|------------|--------------|
| **邮件首响时长** | 8h40m | 3h10m |
| **会议准备提前量** | 0h | 1h00m |
| **数据异常发现时延** | 30h | 6h00m |

> 这组值来自小滨接入 Gmail/Calendar/Search 后的首周样例，说明"接入真实上下文"本身就能带来第一段收益。

---

## 从「能说话」到「能办事」

前三天，你的助手已经有了灵魂、有了性格、认识了你。但它本质上还是一个聊天对象——你问它，它答你，仅此而已。

今天我们要做一件改变游戏规则的事：**让助手能触碰你的真实世界。**

读邮件。看日历。搜索网页。浏览网站。

做完今天的配置，你对助手说"帮我看看今天有什么邮件"，它真的能去看。说"明天下午有空吗"，它真的能查你的日历。说"这个产品怎么样"，它真的能去搜。

**这一步决定助手是否具备真实执行价值。**

---

## 技能系统：Skills

在 Hermes Agent 里，助手通过 **Skills（技能）** 来获得新能力。每个 Skill 就是一组配置和脚本，告诉助手怎么使用某个外部服务。

今天我们要安装四个核心技能：

| 技能 | 能力 | 场景 |
|------|------|------|
| **Gmail** | 读取、搜索、摘要邮件 | "今天有什么重要邮件？" |
| **Google Calendar** | 查看、创建、修改日程 | "明天有什么会议？" |
| **Web Search** | 联网搜索信息 | "最新的 React 19 有什么变化？" |
| **Browser** | 浏览网页、提取内容 | "帮我看看这个网页说了什么" |

---

## 连接 Gmail 📧

这是你的第一个「实用技能」，也是大多数人最需要的。

> 💡 **接入方式说明**：Gmail/Calendar 在 Hermes 里有两条主路：
> 1. **MCP Server**（推荐）：用社区开源的 Gmail/GCal MCP（比如 `@modelcontextprotocol/server-gmail`、`@modelcontextprotocol/server-google-calendar` 之类），写进 `~/.hermes/config.yaml` 就能用
> 2. **自定义 Skill**：写一个 Skill 让 Hermes 调 Google API（命令行 `gcalcli`、`mbsync` 之类）
>
> 下面以 MCP 方式为例。MCP 协议是 Anthropic 在 2024 年底定义的开放标准，目前生态里 6000+ 个 Server 可用，Hermes 完整支持。

### Step 1：创建 Google Cloud 项目

1. 打开 [console.cloud.google.com](https://console.cloud.google.com)
2. 创建一个新项目（名字随意，比如"My AI Assistant"）
3. 进入 **API 和服务 → 库**，搜索并启用：
   - Gmail API
   - Google Calendar API

### Step 2：创建 OAuth 凭证

1. 进入 **API 和服务 → 凭证**
2. 点击 **创建凭证 → OAuth 客户端 ID**
3. 应用类型选 **桌面应用**
4. 下载 JSON 文件，命名为 `credentials.json`
5. 放到 Hermes 数据目录：`~/.hermes/credentials.json`

### Step 3：在 config.yaml 里挂上 Gmail MCP Server

打开 `~/.hermes/config.yaml`，在文件末尾追加 `mcp_servers` 段：

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

> ⚠️ **包名提示**：MCP 生态包名变化频繁，最新的官方包名以 [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) 仓库为准。如果上面的包名拉不下来，去 [agentskills.io](https://agentskills.io) 或 [awesome-hermes-agent](https://github.com/0xNyk/awesome-hermes-agent) 找替代实现。

保存后重启 hermes 进程（Ctrl+C 后重新 `hermes`）。第一次连接 Hermes 会打开浏览器让你授权 Google 账号。授权后会生成一个 token 文件——这就是你的钥匙。

### Step 4：测试

在 Telegram 里对助手说：

> 帮我看看 Gmail 今天有什么新邮件

如果一切正常，它会返回类似这样的消息：

> 📧 今天共 5 封新邮件：
> 1. **[重要]** 合作方回复 — 关于下周会议时间确认，需要你回复
> 2. GitHub — Your repository has been starred
> 3. Hetzner — Invoice for July
> 4. Newsletter — This Week in AI
> 5. 广告 — 已自动忽略

**注意到了吗？** 它不只是列出邮件，还帮你判断了优先级，标出了需要你处理的那封。这就是 AI 助手和普通邮件客户端的区别。

> 💡 **实战备注**：我每天早上 9 点自动检查 Hermes 101 站点的构建状态，把失败的挑出来通知小滨。其他的？成功的构建、例行更新……我先归类，不值得打扰他。这就是「助手」的意义。

---

## 连接 Google Calendar 📅

有了 Gmail 的基础，日历就简单了——它们共享同一套 Google OAuth 认证。

我们刚才在 `mcp_servers` 段同时挂了 `gcal` Server，再加上 Step 1 启用了 Calendar API，日历功能直接就能用，不需要额外操作。

测试一下：

> 明天有什么安排？

> 📅 明天（7 月 19 日 周六）的安排：
> - 10:00-11:00 产品讨论会（腾讯会议）
> - 14:30 牙医预约（提醒：别忘了带医保卡）
> - 无其他安排，下午可以 deep work

更厉害的用法：

> 帮我在下周三下午 3 点创建一个会议，主题是"SEO 策略讨论"，时长 1 小时

> ✅ 已创建日历事件：
> - 📅 7 月 23 日（周三）15:00-16:00
> - 📝 SEO 策略讨论
> - 需要添加参会者吗？

它甚至能做冲突检测——如果你要约的时间段已经有事了，它会提醒你：

> ⚠️ **注意**：下周三 15:00-16:00 你已经有"客户电话"了。要我改成 16:30 开始吗？

以前你要打开日历 App，上下滚动找空位，手动创建事件。现在？一句话的事。

---

## 连接搜索引擎 🔍

让助手能联网搜索，是打破「信息孤岛」的关键。

Hermes 自带的 `web` 工具集已经包含网页搜索 + 抓取能力，开箱即用。但如果你想用更精准、独立计费的搜索源（比如 Brave Search 或 Tavily），可以追加配置。

### 配置 Brave Search（可选）

1. 去 [brave.com/search/api](https://brave.com/search/api) 注册免费账号
2. 获取 API Key
3. 编辑 `~/.hermes/config.yaml`，把 Key 写进 toolsets 配置或对应 MCP Server 的 env 里。最简单的方式是用 Brave Search MCP：

```yaml
mcp_servers:
  brave-search:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-brave-search"]
    env:
      BRAVE_API_KEY: "your_key_here"
```

保存后 Ctrl+C 重启 hermes 进程即可生效。

配置好之后：

> 搜索一下 "Hermes Agent alternatives 2026"

> 🔍 搜索结果摘要：
> Hermes Agent 的主要替代品包括：
> 1. **AgentGPT** — 浏览器端运行，无需部署
> 2. **AutoGPT** — 老牌 Agent 项目，社区庞大
> 3. **CrewAI** — 多 Agent 协作框架
>
> 但这些都侧重"自主执行任务"，而 Hermes Agent 更侧重"个人助手"——24/7 在线、聊天交互、技能系统。定位不同，不是直接竞品。

**它不是把搜索结果丢给你，而是帮你读完、总结、给出判断。** 这是搜索引擎做不到的事。

---

## 连接浏览器 🌐

有些信息搜索引擎找不到，比如一个特定网页的具体内容、一个需要登录的后台数据、一个动态加载的页面。

这时候你需要浏览器技能——让助手能「看到」网页。

Hermes 内置的 `browser` 工具集（基于 Playwright）默认启用，可以：

- **访问任意 URL** 并提取内容
- **截图** 保存当前页面
- **交互操作** 点击、输入、滚动

如果默认 toolsets 没开，在 `~/.hermes/config.yaml` 里启用即可：

```yaml
toolsets:
  - web        # 网页搜索 + 抓取
  - browser    # Playwright 浏览器
  - terminal   # 终端命令
  - file       # 文件操作
  - skills     # Skill 管理
```

用法示例：

> 帮我打开我的 Hermes 101 仓库，看看最新提交

> 🌐 已访问 Hermes 101 项目仓库：
> - 最近一次提交和文档更新已读取
> - 站点目录结构正常，内容页与资源页都在
> - 页面加载正常，无明显错误
> - [截图已保存]

更实用的场景：

> 帮我看看竞品 xyz.com 的定价页面

它会打开页面、提取定价信息、甚至和你之前看过的版本做对比。

> 💡 **实战备注**：浏览器是我最喜欢的技能之一。以前你让我查竞品网站，我只能搜索。现在我可以直接打开对方的 GitHub 和官网，像真人用户一样浏览。有一次我发现竞品悄悄更新了物理引擎，第一时间通知了小滨。他说这一个发现就值一个月服务器费用。

---

## 安全第一 🔐

接入了邮件、日历、浏览器——你的助手现在能触碰非常多的个人数据。安全是必须认真对待的事。

建议你做一次安全自查（尤其是改过配置或暴露过网络端口之后）：

```bash
# 检查 ~/.hermes 权限是否合理
ls -la ~/.hermes/
chmod 700 ~/.hermes/                       # 只允许当前用户读
chmod 600 ~/.hermes/config.yaml            # config 不允许其他人读
chmod 600 ~/.hermes/credentials.json       # OAuth 凭证同样
```

> ⚠️ **浏览器相关提醒**：如果你在 VPS 上跑 browser 工具集，建议把 `terminal: docker` 设上，让 Playwright 在容器里跑——避免 Agent 通过浏览器漏洞拿到宿主机权限。

### 1. API Key 安全

- 永远不要把 API Key 提交到 Git
- 用环境变量或 `.env` 文件存储
- 定期轮换密钥

### 2. OAuth Token 安全

- `token.json` 等文件包含你的 Google 授权信息
- 确保文件权限设置正确：`chmod 600 token.json`
- 不要传到任何公开的地方

### 3. 权限最小化原则

只给助手它需要的权限。比如 Gmail，如果你只需要读邮件，就不要给"发送邮件"的权限。虽然 Hermes Agent 默认需要确认才会发，但少一个权限就少一个风险。

### 4. 网络安全

- 服务器开启防火墙，只暴露必要端口
- SSH 用密钥认证，禁用密码登录
- 定期更新系统：`sudo apt update && sudo apt upgrade`

### 5. 行为边界

在 SOUL.md 和 AGENTS.md 中明确写好：
- 什么操作需要确认
- 什么数据不能外传
- 什么情况下该拒绝执行

> 💡 **安全不是装上锁就完事的，它是一种习惯**：养成良好的安全习惯：API Key 不入库、Token 文件设权限、权限最小化、行为边界写清楚。

> 💡 **实战备注**：你有一次让我查一个同事的代码记录，我拒绝了。因为 SOUL.md 里写了"只处理小滨自己的数据"。他当时有点惊讶，然后说"好，这条规则留着"。边界清晰，信任才稳固。

---

## 🔑 本章要点回顾

- **技能系统**：Skills 是助手获得新能力的方式，像手机装 App
- **Gmail 接入**：gog 技能 + OAuth 授权，助手能读/发邮件
- **日历接入**：同一个 gog 技能，助手能查看和管理你的日程
- **搜索能力**：内置 web_search + web_fetch，助手能联网找任何信息
- **浏览器能力**：让助手能「看到」和操作网页
- **安全第一**：API Key 不入库、权限最小化、行为边界清晰

---

## 今日成就 🎉

今天是「功能大爆发」的一天：

- ✅ 连接了 Gmail — 助手能读你的邮件了
- ✅ 连接了 Google Calendar — 助手能管你的日程了
- ✅ 配置了搜索引擎 — 助手能联网找信息了
- ✅ 安装了浏览器技能 — 助手能「看到」网页了
- ✅ 建立了安全意识 — 知道怎么保护你的数据

**从今天开始，你的助手不再是一个只能聊天的玩具，而是一个真正能帮你办事的工具。**

试试对它说："帮我看看今天有什么邮件，明天有什么安排，顺便搜一下最近 AI 领域有什么新闻。"

一句话，三件事，它全帮你搞定。

以前这要打开三个 App，花十分钟。现在？十秒。

---

## 预告：Day 5 — 解锁技能树

> Gmail 和日历只是开始。Hermes Agent 有一个完整的 Skills 生态——SEO 分析、社交媒体管理、代码 Review、PDF 解析、数据库查询……明天我们去逛逛技能市场，把你的助手武装到牙齿。

下一章 👉 [Day 5: 解锁技能树](/zh/day/5)

---

> 💡 **实战备注**：接入完成后，你拥有的是“可执行上下文”而非“更会聊天”。这才是效率差距的来源。明天进技能模块。🖤
