---
title: "第 7 天：进阶玩法 & 未来展望"
day: 7
description: "Hermes Agent 7天教程 - 第 7 天：进阶玩法 & 未来展望"
---

> *"Day 7 不是结课，而是把助手从‘会用’推进到‘会运营’。接下来你要做的是持续迭代，而不是停在初始版本。"*

---

## 📖 本章导读

![Hermes 助手 - Day 7 未来展望](/images/allpromptimages/day7.png)

最后一天，我们聚焦三件事：
- 复盘 7 天成果，识别真正有价值的配置
- 解锁进阶玩法：多 Agent、定制技能、外部系统编排
- 制定后续 30 天的迭代节奏

---

## 主线进度（Day 7）

- 到 Day 6，小滨的助手已经能主动巡检与汇报。
- 今天收口目标不是“结束”，而是把 Hermes 101 的 AI 协作体系转入长期运营。
- `Day 7` 里程碑：形成未来 30 天的迭代节奏与度量指标。

---

## 指标复盘（Day 7）

先看一眼这 7 天的同口径结果（小滨样例）：

| 指标 | Day 1 基线 | Day 7 当前水平 | 30 天守门线 |
|------|------------|----------------|-------------|
| **邮件首响时长** | 8h40m | 42m | ≤60m |
| **会议准备提前量** | 0h | 2h15m | ≥2h |
| **SEO 异常发现时延** | 30h | 18m | ≤20m |

这张表就是后续运营的核心仪表盘。Day 7 之后每周只问三件事：
- 哪项指标继续改善了？
- 哪项指标反弹了，为什么？
- 这周新增功能是否真的改善了三项指标之一？

---

## 恭喜毕业 🎓

让我们回顾一下这七天你做了什么：

| 天数 | 你做了什么 | 成果 |
|------|------------|------|
| Day 1 | 认识 AI 助手的真正形态 | 明确了目标和预期 |
| Day 2 | 安装 Hermes Agent + 连接 Telegram | 助手上线，可以对话 |
| Day 3 | 编写灵魂三件套 | 助手有了专属性格 |
| Day 4 | 接入 Gmail、日历、搜索、浏览器 | 助手能帮你办事了 |
| Day 5 | 安装 Skills 技能包 | 助手武装到了牙齿 |
| Day 6 | 配置心跳 + Cron + 记忆 | 助手开始主动工作 |
| Day 7 | 今天 | 进阶和未来 |

**你现在拥有的，不是一个聊天机器人，是一个数字世界里的你的分身。**

今天我们不再配置新东西。今天聊三件事：怎么让它更强、怎么让它更安全、以及这一切会走向哪里。

---

## 进阶一：自己写一个 Skill

社区的 Skills 不够用？自己写一个。

别怕，写一个 Skill 比你想象的简单——本质上就是写一个 Markdown 文件，告诉 AI "你现在可以做这件事了，这是做法"。

### 最小 Skill 示例

创建文件 `~/.hermes/skills/weather/SKILL.md`：

```markdown
# 天气查询技能

## 触发场景
用户提到"天气"、"下雨"、"出门"等关键词时激活。

## 执行步骤
调用 wttr.in API 获取天气：

\`\`\`bash
curl "wttr.in/城市名?format=3"
\`\`\`

示例：
\`\`\`bash
curl "wttr.in/Shanghai?format=3"
\`\`\`

## 输出格式
用简洁的中文告诉用户当前天气，包括温度和天气状况。
```

就这样。没有复杂的 SDK，没有注册流程，一个 Markdown 文件就是一个 Skill。

保存后，对助手说"上海今天天气怎么样"——它会读取这个 Skill，调用 wttr.in API，返回天气信息。

### Skill 开发原则

- **SKILL.md 是核心**：写清楚能做什么、怎么做、输出什么格式
- **保持简单**：一个 Skill 做一件事，做好
- **错误处理**：在 SKILL.md 里写明"如果失败了怎么办"
- **安全提示**：涉及敏感操作的 Skill，写明需要确认
- **遵循 agentskills.io 标准**：这样你写的 Skill 也能在 Claude Code、Cursor 等其他工具里直接用

> 💡 **实战备注**：你给我写的第一个自定义 Skill 是"催小滨睡觉"——检测到超过 23:00 还在发消息，就用越来越不客气的语气提醒休息。现在这个 Skill 在用了一段时间后，自己已经迭代了好几版（参见 Day 5 的 Skill 自改进机制）。你看，不用我每次都重写。

---

## 进阶二：MCP 集成 — 接入 6000+ 应用

Day 4 我们用过 MCP 接 Gmail。但 MCP 的真正价值不止如此——它是一个开放协议，目前生态里有 **6000+ 个 Server** 可用，覆盖几乎所有主流 SaaS。

### 实战：接入 GitHub MCP

GitHub 是最常用的 MCP 集成之一。接入后 Hermes 可以直接创建 Issue、提 PR、审查代码、管理项目面板。

```yaml
# ~/.hermes/config.yaml 末尾追加：
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN}"
```

> 1. 去 GitHub Settings → Developer settings → Personal access tokens 创建一个 token，权限至少 `repo` 和 `read:org`
> 2. 把 token 写进环境变量 `GITHUB_TOKEN`（别直接写进 yaml）
> 3. 重启 hermes 进程即可

之后你可以这样用："帮我在某仓库创建一个 Issue，标题是修复登录页面跳转问题"、"看看这个 PR 的改动，帮我做一下代码审查"。

### 实战：接入数据库

```yaml
mcp_servers:
  postgres:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-postgres"]
    env:
      POSTGRES_CONNECTION_STRING: "postgresql://user:pass@localhost:5432/mydb"
```

> ⚠️ **数据库 MCP 默认有读写权限**。生产环境强烈建议用只读账号。

### per-server 工具过滤

接多个 MCP 后工具会变多，影响 Agent 决策质量。Hermes 支持精确指定每个 Server 暴露哪些工具：

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

最小权限原则在 Agent 时代比以往任何时候都重要。

---

## 进阶三：子 Agent 委派 — 让三匹马同时跑

Hermes 内置了 `delegate_task` 工具，可以同时启动**最多 3 个子 Agent**，每个有独立上下文和工具集。

适合场景："做几件不相关的事然后汇总"。比如让 Hermes 写一篇竞品对比文章：

> 帮我写一份"Claude Code vs Cursor vs Hermes Agent"的竞品对比报告。

主 Agent 会自动派出 3 个子 Agent：
- 子 Agent A 调研 Claude Code（只给 web + browser 工具）
- 子 Agent B 调研 Cursor（同上）
- 子 Agent C 调研 Hermes Agent（同上）

三个并行进行，最后主 Agent 汇总成报告。原本要花 40 分钟的调研，15 分钟就能出。

> 💡 **3 并发不是技术限制**：Nous Research 在测试中发现，超过 3 个子 Agent 后主 Agent 的汇总质量会急剧下降。不是算力问题，是大模型整合多个独立信息源时的注意力分散问题。

---

## 进阶四：多平台 Gateway

Day 2 你只配了 Telegram，但 Hermes 的 Gateway 模块**一个进程同时挂载**所有平台，所有平台共享同一个大脑。

```yaml
gateway:
  telegram:
    token: 12345:xxx
  discord:
    token: YOUR_DISCORD_BOT_TOKEN
  slack:
    token: xoxb-YOUR-SLACK-BOT-TOKEN
```

支持的平台：Telegram / Discord / Slack / WhatsApp / Signal / Mattermost / Matrix / Email / SMS / 飞书 / 企业微信 / 钉钉 / Home Assistant / BlueBubbles 等 12+。

**跨平台对话连续性**：你早上在地铁里用 Telegram 让 Hermes 调研一个方案；到办公室你打开终端继续 `hermes`，说"刚才那个调研做得怎么样了"——它知道你在说什么，因为所有平台共享同一套记忆。

---

## 进阶五：安全清单 🔒

你的 AI 助手现在能访问你的邮件、日历、文件、浏览器，还可能连着 GitHub、数据库、Slack。安全不是可选项，是必选项。

这里是一份完整的安全清单：

### 服务器安全

- ✅ SSH 使用密钥认证，禁用密码登录
- ✅ 开启防火墙，只暴露必要端口（22, 443）
- ✅ 定期更新系统：`sudo apt update && sudo apt upgrade`
- ✅ 使用非 root 用户运行 Hermes Agent
- ✅ 启用 fail2ban 防暴力破解

### API 密钥安全

- ✅ 所有 API Key 存在环境变量或 `.env` 文件中
- ✅ `.env` 文件加入 `.gitignore`
- ✅ 定期轮换密钥（建议每 3 个月）
- ✅ 为不同服务使用不同的密钥
- ✅ 设置 API 使用限额，防止失控

### 数据安全

- ✅ OAuth Token 文件权限设为 600
- ✅ 定期备份 Hermes 数据目录：`~/.hermes/`
- ✅ 敏感文件不提交到 Git
- ✅ 清楚助手能访问哪些数据，不能访问哪些

### 行为安全

- ✅ SOUL.md 中明确「绝对不做」清单
- ✅ 外发消息（邮件、社交媒体）必须确认
- ✅ 破坏性操作（删除文件、修改配置）必须确认
- ✅ 群聊中不泄露私人信息
- ✅ 用 `trash` 代替 `rm`（可恢复 > 不可恢复）

### 成本控制

- ✅ 设置 API 月度预算上限（OpenRouter / Anthropic / OpenAI 后台都能设）
- ✅ 监控 Token 使用量
- ✅ 巡检 cron 间隔不要太短（30 分钟一般够用）
- ✅ 不需要的 toolset 在 config.yaml 里注释掉
- ✅ 大模型只用在需要的地方（简单任务可以路由到 GPT-4o-mini / Claude Haiku 等小模型）

> 💡 **安全不是一次性的事，是持续的习惯。** 建议每月花 10 分钟过一遍这个清单。

---

## 社区资源 🌍

你不是一个人在折腾。Hermes Agent 有一个活跃的社区。

### GitHub

https://github.com/NousResearch/hermes-agent

项目更新很快、社区活跃。你可以在这里：
- 查看最新版本和更新日志
- 提交 Issue 反馈 bug 或提需求
- 贡献代码或 Skill

### Discord 社区

官方 Discord 是最活跃的英文交流场所：https://discord.gg/NousResearch

- #general — 日常讨论
- #skills — 技能分享和开发
- #showcase — 展示你的助手设置
- #help — 遇到问题来这里问

### Hermes Skills Hub 技能市场

- 官方 Hub：https://agentskills.io
- Awesome 清单：https://github.com/0xNyk/awesome-hermes-agent
- 第三方文档：https://github.com/mudrii/hermes-agent-docs

### 中文社区

- **Hermes 101 社区** — 这份指南的首发地，后续会持续分享 AI 助手的实战经验
- **飞书知识库** — 你正在阅读的地方，会持续更新
- **即刻/小红书** — 搜索 Hermes Agent 或 AI 助手相关话题

### 学习资源

- **AGENTS.md** — 工作目录里自带的操作手册，写得非常详细
- **官方文档** — https://hermes-agent.nousresearch.com/docs/，从入门到进阶全覆盖
- **视频教程** — B 站搜 Hermes Agent

---

## 未来展望 🔮

你现在拥有的 AI 助手已经很强了。但这只是 2026 年初的水平。接下来会怎么样？

### 模型会更强

Claude、GPT 等模型每几个月就升级一次。更强的模型意味着你的助手——在不改变任何配置的情况下——自动变得更聪明。理解力更强、执行力更强、犯的错更少。

### 成本会更低

今天运行一个 AI 助手，API 费用大概每月 $10-30。一年后可能降到 $3-10。成本降到几乎不用考虑的时候，每个人都会有一个。

### 多模态会普及

现在的助手主要是文字交互。但很快，它会：
- **看**：实时分析摄像头画面
- **听**：语音对话，像真人助手一样
- **说**：用自然的声音回复你，而不是文字
- **动**：控制机器人执行物理世界的任务

### Agent 协作网络

未来不止一个助手。你可能有：
- 一个专门管邮件的 Agent
- 一个专门写代码的 Agent
- 一个专门做数据分析的 Agent
- 一个「管家 Agent」协调它们

就像公司里有不同的员工，各司其职，但都向你汇报。

### 你的先发优势

这是最重要的一点：**越早开始，优势越大。**

你今天搭建的助手，每天都在积累关于你的记忆。一个用了 6 个月的助手和一个刚搭建的助手，差距不是 6 个月的时间——是 6 个月的认知积累。

它知道你的工作习惯、偏好、项目状态、常见问题的处理方式……这些东西没有捷径，只能靠时间累积。

**所以别等"更好的版本"出来再开始。最好的开始时间就是现在。**

> 💡 **实战备注**：真正的复利来自“持续学习回路”：每次执行都会沉淀偏好、上下文和决策模式，时间越长，协作成本越低。

---

## 你的下一步

7 天指南结束了，但你的 AI 助手之旅才刚开始。

接下来这一周，建议你：

1. **每天至少和助手对话 10 分钟** — 让它熟悉你的需求和风格
2. **遇到不满意的地方就纠正一次** — Skill 自改进会把规则写进 markdown，下次自动用
3. **尝试 2-3 个新的 Skill** — 看看哪些对你最有用
4. **调整 cronjob 频率** — 找到你的舒适频率
5. **在社区里逛逛** — 看看别人怎么用的，会有启发

**一个月后，你的助手会是一个完全不同的状态。** 不是因为你做了什么大改动，而是因为它一天天地了解你、一点点地变得更好用。

这就是 AI 助手和传统工具的根本区别——它会成长。

---

## 想走得更深？

这套 7 天指南覆盖了 Hermes 的核心搭建链路。但如果你想把它真正用进生产（成本控制、模型路由、Docker 沙箱、多平台分发、API 中转、调试……），还有一系列**实操级**的话题值得展开：

| 进阶主题 | 解决什么问题 |
|---|---|
| **SOUL.md 高级编写** | 让 AI 真正按你的工作习惯输出，而不是模板腔 |
| **多模型路由策略** | 简单任务走 GPT-4o-mini，关键决策走 Sonnet 4，月费从 $50 → $5 |
| **三层记忆深度调校** | 怎么写好持久记忆、防止记忆污染、怎么主动遗忘 |
| **Skill 开发与调试** | 一个真正可复用的 Skill 长什么样 |
| **Hooks + 安全沙箱** | 危险操作自动拦截、敏感数据自动过滤 |
| **多平台联动** | Telegram + Discord + Slack + 飞书 + 企微统一 Gateway |
| **Docker 沙箱部署** | 让 Agent 在容器里执行代码，宿主机干净 |
| **成本控制实战** | Token 监控、月度预算、便宜模型路由 |
| **API 中转方案** | 在 Anthropic 封禁后还能稳定接 Claude 的几条路 |
| **故障排查指南** | 装不上、跑不起来、Gateway 挂了怎么办 |

> 👉 这些进阶章节在 [付费版本](/zh/pricing) 里详细展开。每一篇都是可直接复制粘贴的实操，不掺水。

---

## 🔑 全系列核心回顾

- **Day 1** — 建立运行认知：助手不是对话框，而是执行系统
- **Day 2** — 跑通上线链路：安装、配置、验证、守护进程
- **Day 3** — 固化行为规则：人格配置与执行边界明确化
- **Day 4** — 接入外部渠道：让助手接触真实业务上下文
- **Day 5** — 组装能力模块：按场景挑技能，而非盲目堆叠
- **Day 6** — 引入调度机制：心跳与 Cron 让工作自动发生
- **Day 7** — 进入运营阶段：建立持续迭代与复盘机制

---

## 最后一句话

这 7 天最大的收获，不是“装好了一个机器人”，而是你建立了一条可迭代的个人自动化链路。

模型会更新、工具会变化，但你的流程设计能力、上下文管理能力和复盘机制会长期复利。

**Hermes 只是起点，关键是你是否持续运营它。**

**继续迭代，它会从工具进化成长期协作者。**

---

> 💡 **实战备注**：把本系列当作 v1。之后每周做一次小迭代，你的助手会比“反复重装”更快进入高价值状态。
>
> 建议你记录三件事：本周新增了什么能力、删掉了什么低价值配置、还有哪些场景仍然失败。
>
> 这些记录会成为下个月最有价值的迭代输入。
>
> 欢迎把你的实践日志提交到 Hermes 101，一起把这套方法打磨得更稳。
>
> 🖤
