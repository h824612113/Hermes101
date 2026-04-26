---
title: "工作流模板：从零搭 5 个实战自动化"
chapter: 11
date: 2026-04-16
summary: 学完基础配置，下一步是把 Hermes 接进真实工作流。这 5 个模板可以直接复制使用，覆盖日报、代码审查、知识整理、会议纪要和项目管理。
tags: [工作流, 自动化, cron, 实战]
status: draft
---

## 为什么需要工作流模板

Hermes 最大的价值不是聊天，而是**自动化重复工作**。但大部分人卡在"不知道让它做什么"。

这 5 个模板覆盖最常见的场景，每个都包含完整的配置、prompt 和验证方法。

## 模板 1：每日信息摘要

每天早上自动扫描邮件、日历、新闻，生成一份摘要推到 Telegram。

**适用场景：** 想要一个每天早上的"AI 秘书"

```yaml
# cron 配置
name: daily-briefing
schedule: "0 23 * * *"  # UTC 23:00 = 北京 7:00
deliver: telegram:YOUR_CHAT_ID
```

```markdown
# Prompt

生成今日简报，包含以下部分：

## 📬 邮件
检查最近 24 小时的未读邮件，列出重要的（忽略营销和通知类）。

## 📅 日历
查看今天的日程安排。

## 📰 新闻
搜索 3 条与 AI/科技相关的重大新闻，一句话摘要。

## ✅ 建议
根据以上信息，给出今天的 3 个行动建议。

格式：简洁，每条不超过 2 行。
```

**验证方法：** 第二天早上检查 Telegram 是否收到摘要。

## 模板 2：代码变更审查

每次 git push 后自动审查代码变更，发现问题立即通知。

**适用场景：** 个人项目或小团队的代码质量管控

```markdown
---
name: code-review
description: Review recent git changes for issues
---

# Code Review

## Steps
1. 检查最近的提交: `git log --oneline -5`
2. 查看变更: `git diff HEAD~1`
3. 审查以下方面:
   - 安全问题（密钥泄露、SQL注入、XSS）
   - 明显 Bug（空指针、逻辑错误）
   - 性能问题（N+1查询、大循环）
   - 代码风格不一致

## 输出格式
```
提交: {commit_hash} {message}
变更文件: {file_count} 个

🔴 严重问题:
- {issue description}

🟡 建议改进:
- {suggestion}

✅ 通过
```

## Pitfalls
- 不要审查自动生成的文件（package-lock.json 等）
- 只关注变更部分，不要全局审查
```

## 模板 3：知识库自动整理

每周把散落的笔记、对话记录整理成结构化的知识库。

**适用场景：** 笔记多但乱，找不到以前的内容

```yaml
# cron 配置
name: weekly-kb-cleanup
schedule: "0 14 * * 0"  # 每周日 UTC 14:00
deliver: local
```

```markdown
# Prompt

做一次知识库整理：

1. 读取 /root/memory/ 下最近 7 天的 daily notes
2. 提取值得长期保存的结论和方法
3. 检查 /root/kb/wiki/ 是否有需要更新的页面
4. 清理 /root/kb/raw/ 下超过 30 天的临时文件
5. 更新 /root/kb/index.md 导航

输出：整理报告（新增/更新/删除了什么）
```

## 模板 4：会议纪要生成

把会议录音转文字后，自动生成结构化纪要。

**适用场景：** 会议多、纪要整理耗时

```markdown
---
name: meeting-notes
description: Generate structured meeting notes from transcript
---

# Meeting Notes Generator

## Input
将会议文字稿贴给 Hermes。

## Prompt
根据以下会议内容，生成结构化纪要：

### 格式
```
# 会议纪要 - {主题}
日期: {date}
参与者: {participants}

## 决策事项
1. ...

## 行动项
| 事项 | 负责人 | 截止日期 |
|------|--------|---------|
| ... | ... | ... |

## 待讨论
- ...

## 关键信息
- ...
```

### 要求
- 只提取事实，不加猜测
- 行动项必须有负责人和截止日期（如果没有指定，标注"待确认"）
- 去掉闲聊和重复讨论
```

## 模板 5：项目状态追踪

每天自动检查项目状态（git、部署、依赖更新），生成状态报告。

**适用场景：** 同时维护多个项目

```yaml
# cron 配置
name: project-status
schedule: "0 9 * * 1-5"  # 工作日 UTC 9:00
deliver: telegram:YOUR_CHAT_ID
```

```markdown
# Prompt

检查以下项目状态：

## hermes101
1. `cd /root/hermes101 && git status` — 有未提交的变更吗？
2. `git log --oneline -3` — 最近 3 次提交
3. `curl -s -o /dev/null -w "%{http_code}" https://cyberhz.com` — 网站正常吗？
4. `npm outdated 2>/dev/null | head -5` — 有依赖需要更新吗？

## 服务器
1. `df -h` — 磁盘使用率
2. `free -h` — 内盘使用
3. `uptime` — 系统负载

## 输出格式
每个项目用 ✅/⚠️/❌ 标注状态，异常项给出具体说明和建议。
```

## 怎么组合使用

把 5 个模板组合成日常工作流：

```
07:00  模板1 — 每日摘要（开始工作前）
09:00  模板5 — 项目状态（工作日）
随时   模板2 — 代码审查（git push 触发）
随时   模板4 — 会议纪要（会后）
周日   模板3 — 知识库整理
```

## 自定义模板

这些模板是起点。根据你的实际需求调整：

1. **换数据源** — 把邮件换成 Slack、把日历换成 Notion
2. **加条件** — "如果磁盘 >80% 则通知"
3. **链式执行** — 模板1 发现日历有会议 → 自动触发模板4

核心结构永远是：**触发条件 → 收集信息 → 处理 → 输出**

---

## 本章要点

- 5 个即用模板：日报、代码审查、知识整理、会议纪要、项目状态
- 每个模板有完整的 cron 配置和 prompt
- 组合使用形成日常工作流
- 模板是起点，按需自定义

**前一章：** Debug 心法 — 让 AI 帮你修 AI。
