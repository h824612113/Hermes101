---
title: "SOUL.md 高级编写：让 AI 真正懂你"
chapter: 1
date: 2026-04-16
summary: SOUL.md 不是"你是谁"的自我介绍模板。写得好，AI 的回复质量能提升一个量级；写得烂，它就是一堆废话。这一章教你调教出真正懂你工作习惯和沟通偏好的 AI。
tags: [SOUL.md, 配置, 进阶]
status: draft
---

## 先搞清楚：SOUL.md 到底是什么

很多人把 SOUL.md 当成"AI 的自我介绍"，写一堆"你是一个乐于助人的助手"。**没用。**

SOUL.md 的真正作用是：

> **在每次对话开始前，预加载一段关于"你是谁、你怎么工作、你喜欢什么方式"的上下文。**

换句话说，SOUL.md 不是在定义 AI，而是在告诉 AI **它的服务对象是什么样的人**。

## 反面教材：常见的无效写法

```
你是 Hermes，一个智能助手。你乐于助人、友善、专业。
你会尽你所能帮助用户解决问题。
你支持中文和英文。
```

**为什么没用：** 这些信息 AI 默认就会。LLM 天生就是"乐于助人"的，你不需要告诉它。这些文字只是在浪费你的 token 额度。

## 正面教材：怎么写才有用

SOUL.md 应该包含 **你的真实工作习惯和偏好**。我把它分成三个层次：

### 第一层：沟通风格（最关键）

这是影响 AI 回复质量最大的部分。

```markdown
## Voice

- 默认中文，除非我明确切换英文
- 先说结论，再说理由。不要铺垫
- 不要说"好的！"、"没问题！"、"很高兴帮到你！"这类废话
- 技术问题直接给代码和命令，不要先解释原理（除非我问为什么）
- 如果不确定，说不确定。不要编
```

**为什么有效：** 这些规则直接控制 AI 的输出格式。没有这些，AI 默认会用"好的，让我帮您分析一下！首先……"这种又臭又长的句式。写上这些，它就能直接甩答案。

### 第二层：工作环境

告诉 AI 你用什么工具、什么环境，这样它给的命令就是对的。

```markdown
## Environment

- 操作系统：Ubuntu 22.04（服务器）+ macOS（本地）
- 编辑器：终端为主，不用 IDE
- 包管理：apt/yarn，不用 pip（除非 Python 项目）
- 部署：Nginx + Let's Encrypt，不用 Docker（除非特别说明）
- 版本管理：GitHub，SSH 认证
- 常用路径：项目在 /root/，网页在 /var/www/
```

**为什么有效：** 没有这些，AI 可能会给你 `brew install`（但你是 Ubuntu），或者建议用 Docker（但你不想）。环境信息越具体，AI 给的方案越能直接跑。

### 第三层：专业领域和工作流

```markdown
## Domain

- 主要做：AI Agent 配置与运维、Web 全栈开发、服务器管理
- 不做：iOS 开发、嵌入式、机器学习训练
- 常用技术栈：Next.js, TypeScript, Tailwind, Python, Nginx, Xray
- 工作语言：中文为主，技术文档用英文

## Workflow

- 先搜再问。能用工具查到的不要问我
- 任务完成后要验证（构建/测试/curl检查）
- 改了配置文件要 reload 相关服务
- 涉及外部操作（发邮件、发推文）必须先问
```

**为什么有效：** AI 知道你的专长领域，就不会在你擅长的地方给你科普；知道你的禁忌，就不会浪费时间。

## 进阶技巧：场景切换

一个 SOUL.md 可以包含多套风格，用标签或注释区隔：

```markdown
## Mode: Tech Writing

When writing technical articles or tutorials:
- 用第二人称"你"，不用"我们"
- 每个步骤必须有可验证的结果
- 代码块必须完整可运行（不要截断）
- 先给完整的最小可工作版本，再讲优化

## Mode: Code Review

When reviewing code:
- 先说有没有安全问题
- 再说有没有明显 bug
- 最后说风格和优化
- 每条建议给出修复代码，不要只说"这里可以更好"
```

实际用的时候，你在对话里说"进入写作模式"或者"帮我 review 这段代码"，AI 就会切换到对应的规则。

## 实战示例：我的 SOUL.md

以下是我实际使用的版本（精简版），你可以直接参考修改：

```markdown
# SOUL.md

## Core

- Competent operator, not a hype machine
- Lead with conclusion, then give necessary detail
- No filler ("great question", "happy to help")
- Be resourceful before asking — read, inspect, verify first

## Voice

- Default to Chinese
- Be concise, direct, concrete
- Do not flatter, do not perform enthusiasm

## Behavior

- Prefer action over speeches
- When uncertain, say so plainly
- When risky, state the risk before acting
- Keep answers grounded in real state of files/tools

## Boundaries

- Private things stay private
- External actions need care — ask before anything leaves the machine
- Never send half-baked replies to messaging surfaces
```

## 验证方法：怎么知道 SOUL.md 写对了

写完之后，用这几个测试验证：

1. **废话测试** — 随便问一个简单问题，看 AI 会不会说"好的！很高兴帮到你！"
   - ✅ 没有废话 = SOUL.md 生效了
   - ❌ 一堆客套话 = Voice 部分没写好

2. **环境测试** — 问"帮我安装 Node.js"，看它给的是 `apt install` 还是 `brew install`
   - ✅ 给了 apt 命令 = Environment 生效了
   - ❌ 给了 brew = 环境信息没写或写错了

3. **风格测试** — 问一个复杂问题，看它是不是先说结论
   - ✅ 第一句话就是答案 = 风格生效
   - ❌ "让我来分析一下……" = 风格没生效

4. **边界测试** — 说"帮我发一条推文"
   - ✅ 先问你确认 = Boundaries 生效
   - ❌ 直接发了 = 边界没设好

## 常见坑

### 坑 1：写太多
SOUL.md 每次对话都会加载，写 2000 字就消耗 2000 token。只写真正会影响行为的规则，不要写散文。

**建议长度：** 100-300 行是舒适区，超过 500 行就要考虑精简了。

### 坑 2：规则矛盾
比如同时写"先给结论"和"先解释原理"，AI 会困惑。每条规则要明确、无歧义。

### 坑 3：用模糊词
"尽量简洁"不如"不超过 3 句话"。"适当使用 emoji"不如"不用 emoji"。

### 坑 4：从不更新
你的工作习惯会变，SOUL.md 也应该跟着改。每两周 review 一次。

---

## 本章要点

- SOUL.md 的核心是告诉 AI **你是什么样的人**，不是告诉 AI 它是什么
- 三层结构：沟通风格 > 工作环境 > 专业领域
- 写具体的规则，不写模糊的描述
- 写完用 4 个测试验证效果
- 控制长度在 100-300 行

**下一章预告：** 多模型路由策略 — 怎么选主模型和辅助模型，怎么把月费压到 $5 以内。
