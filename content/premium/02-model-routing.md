---
title: "多模型路由策略：用便宜模型干 80% 的活"
chapter: 2
date: 2026-04-16
summary: 不是所有任务都需要最强模型。学会把日常杂活丢给便宜模型、关键决策留给贵模型，月费能从 $50 压到 $5 以内。
tags: [模型, 成本, 配置]
status: draft
---

## 核心思路：任务分级

大部分对话不需要 GPT-4o 或 Claude Opus。分级逻辑：

| 任务类型 | 示例 | 适合模型 | 成本 |
|---------|------|---------|------|
| 简单操作 | 读文件、搜网页、执行命令 | 小模型 (GPT-4o-mini, Haiku) | 极低 |
| 代码生成 | 写脚本、改配置 | 中模型 (GPT-4o, Sonnet) | 中等 |
| 复杂推理 | 架构设计、安全审计、长文写作 | 大模型 (Opus, GPT-4.5) | 高 |
| 嵌入/向量化 | 知识库索引、语义搜索 | 专用嵌入模型 (text-embedding-3) | 极低 |

**关键洞察：** 80% 的日常任务是"简单操作"，用小模型就够了。只有 10-15% 需要中模型，5% 需要大模型。

## Hermes 的模型配置

Hermes 支持三种模型角色：

```yaml
# config.yaml 示例
model:
  provider: openrouter
  # 主模型 — 用于主要对话和推理
  main: anthropic/claude-sonnet-4

  # 辅助模型 — 用于摘要、分类、简单任务
  auxiliary: openai/gpt-4o-mini

  # 嵌入模型 — 用于记忆和知识库索引
  embedding: openai/text-embedding-3-small
```

### 怎么选主模型

| 模型 | 优势 | 劣势 | 适合场景 |
|------|------|------|---------|
| Claude Sonnet 4 | 代码强、指令遵循好 | 贵 | 技术工作为主 |
| GPT-4o | 均衡、速度快 | 有时啰嗦 | 通用助手 |
| Gemini 2.5 Pro | 超长上下文、便宜 | 指令遵循差一点 | 需要读大量文件 |
| DeepSeek V3 | 极便宜、中文好 | 工具调用差一些 | 预算有限 |

**我的选择：** 主模型用 Sonnet 4（代码质量高），辅助模型用 GPT-4o-mini（便宜够用），嵌入模型用 text-embedding-3-small。

### 怎么配辅助模型

辅助模型负责：
- 摘要生成（heartbeat 维护）
- 任务分类（判断该用哪个模型）
- 简单查询（读文件、搜网页结果的整理）

```yaml
auxiliary: openai/gpt-4o-mini  # $0.15/1M input tokens
```

对比主模型的成本：
```
Sonnet 4:    $3.00/1M input tokens
GPT-4o-mini: $0.15/1M input tokens
差价: 20 倍
```

辅助模型跑 heartbeat、cron 检查这类简单任务，一个月下来能省 $10-20。

## 实战：路由策略

### 自动路由（推荐）

让 Hermes 自己判断用哪个模型：

```yaml
# config.yaml
model:
  main: anthropic/claude-sonnet-4
  auxiliary: openai/gpt-4o-mini

# 告诉 AI 什么时候用辅助模型
```

在 user-profile Skill（`~/.hermes/skills/user-profile/SKILL.md`）里加一条规则：

```markdown
## Cost Awareness

- 简单查询（读文件、搜索、列出内容）用辅助模型
- 需要推理和生成的用主模型
- 巡检 Skill 和 cronjob 默认用辅助模型
- 不确定时用主模型（宁可多花一点，不能搞砸）
```

### 手动路由

某些 cron 任务可以强制指定模型：

```json
{
  "name": "daily-cleanup",
  "model": {"model": "gpt-4o-mini", "provider": "openrouter"},
  "prompt": "检查 /tmp 下超过 7 天的文件并列出..."
}
```

### 按任务类型切换

```bash
# 日常对话 — 用主模型
hermes chat

# 批量处理 — 用便宜模型
hermes chat --model openai/gpt-4o-mini

# 长文写作 — 用大模型
hermes chat --model anthropic/claude-opus-4
```

## 成本计算实例

假设每天使用量：
- 50 次对话（平均 2K token/次）
- 10 次 cron 任务（平均 3K token/次）
- 5 次 heartbeat（平均 1K token/次）

**全用 Sonnet 4：**
```
日消耗: (50×2K + 10×3K + 5×1K) × 2 (input+output) = 270K token
月消耗: 270K × 30 = 8.1M token
月成本: 8.1M × $3/1M = $24.3
```

**用路由策略（对话用 Sonnet 4，cronjob/巡检用 mini）：**
```
对话: 50×2K×2 × $3/1M = $0.6/天
cronjob: 10×3K×2 × $0.15/1M = $0.009/天
巡检: 5×1K×2 × $0.15/1M = $0.0015/天
日消耗: $0.61
月成本: $18.3 → 省 $6/月
```

如果把部分简单对话也切到 mini，月费可以压到 **$8-12**。

## 进阶：多 Provider 降本

不要只用一个平台。分散充值可以：
1. 利用新用户免费额度
2. 比价选最便宜的
3. 一个挂了切另一个

```yaml
# config.yaml — 混合 provider
model:
  main: anthropic/claude-sonnet-4  # via Anthropic 直连
  auxiliary: openai/gpt-4o-mini    # via OpenRouter

# 或者用 OpenRouter 统一管理所有模型
model:
  provider: openrouter
  main: anthropic/claude-sonnet-4
  auxiliary: openai/gpt-4o-mini
```

**免费额度来源：**
- OpenAI: 新账号 $5 额度
- Anthropic: 新账号 $5 额度
- Google AI Studio: Gemini 免费（有速率限制）
- DeepSeek: 注册送额度

## 常见坑

### 坑 1：辅助模型处理复杂任务翻车
辅助模型便宜但能力有限。如果让它处理代码审查或复杂推理，可能会给出错误答案。**不确定时用主模型。**

### 坑 2：频繁切换模型导致上下文丢失
不同模型的对话上下文不共享。频繁切换会让 AI "失忆"。

### 坑 3：只看价格不看质量
DeepSeek 确实便宜，但在工具调用（function calling）上经常出错。省钱的前提是不影响工作质量。

---

## 本章要点

- 80% 任务用小模型就够，只有关键决策需要大模型
- 配好 main + auxiliary + embedding 三层模型
- 在 user-profile Skill 里加成本意识规则
- 月费从 $24 压到 $8-12 完全可行
- 分散充值多平台，利用免费额度

**下一章：** 三层记忆体系实战 — 会话记忆、持久记忆、Skill 记忆怎么组织才真正有用。
