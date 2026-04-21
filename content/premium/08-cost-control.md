---
title: "成本控制实战：把月费压到 $5 以内"
chapter: 8
date: 2026-04-16
summary: 不是所有钱都值得省。但如果用对策略，Hermes 的月费可以从 $30+ 压到 $5 以内，同时不损失核心体验。
tags: [成本, 省钱, 配置]
status: draft
---

## 真实账单拆解

先看一个典型用户的月账单（用 Claude Sonnet 4 作为主模型）：

```
主模型 (Sonnet 4):
  日常对话:  ~150K tokens/天 × 30 = 4.5M tokens
  代码生成:  ~50K tokens/天 × 30  = 1.5M tokens
  Input:  6M × $3/M   = $18
  Output: 2M × $15/M  = $30
  小计: $48/月

辅助模型 (GPT-4o-mini):
  Heartbeat: ~5K tokens/天 × 30  = 150K tokens
  Cron:      ~10K tokens/天 × 30 = 300K tokens
  Input:  450K × $0.15/M  = $0.07
  Output: 150K × $0.60/M  = $0.09
  小计: $0.16/月

总计: ~$48/月
```

**$48/月** 对个人用户来说不便宜。但大部分支出花在了"用大模型做小事情"上。

## 策略一：降模型（省 60-80%）

| 主模型 | Input 价格 | 输出价格 | 月费 (6M in + 2M out) |
|--------|-----------|---------|---------------------|
| Claude Opus 4 | $15/M | $75/M | $240 |
| Claude Sonnet 4 | $3/M | $15/M | $48 |
| GPT-4o | $2.5/M | $10/M | $35 |
| Claude Haiku 3.5 | $0.80/M | $4/M | $12.8 |
| GPT-4o-mini | $0.15/M | $0.60/M | $2.1 |
| DeepSeek V3 | $0.27/M | $1.10/M | $3.8 |

**务实建议：** 主模型用 GPT-4o 或 Haiku 3.5，日常够用。只有需要高质量代码时切到 Sonnet。

## 策略二：减少 Token 消耗（省 30-50%）

### 精简 MEMORY.md
```
长版 (500行):  每轮消耗 ~1500 tokens → 月消耗 ~4.5M tokens
精简版 (100行): 每轮消耗 ~300 tokens  → 月消耗 ~0.9M tokens
省: ~$10/月
```

### 精简 Skill
```
每个 skill 都会在匹配时注入。
装了 20 个 skill，每个 200 行 → 每次注入 ~4000 tokens
只保留真正用到的 5 个 → 每次注入 ~1000 tokens
```

### 精简 HEARTBEAT.md
```
Heartbeat 每 30-60 分钟跑一次。
如果 HEARTBEAT.md 写了 50 行 → 每次消耗 1500 tokens
精简到 10 行 → 每次消耗 300 tokens
月省: ~$2
```

## 策略三：用免费/便宜的边缘服务（省 50-100%）

### 免费额度利用

| 平台 | 免费额度 | 限制 |
|------|---------|------|
| OpenAI | $5 新用户 | 一次性 |
| Anthropic | $5 新用户 | 一次性 |
| Google AI Studio | Gemini 免费 | 15 RPM |
| DeepSeek | 注册送额度 | 有速率限制 |
| Groq | 免费层 | 速度极快，Llama/Mixtral |
| Together AI | $5 新用户 | 开源模型 |

**策略：** 把免费额度分散到不同平台，轮流用。

### 自托管开源模型

如果你有 GPU（哪怕是旧的）：

```bash
# 用 Ollama 跑本地模型
ollama run llama3.1:8b
ollama run qwen2.5:7b

# 配置 Hermes 使用本地模型
# config.yaml
model:
  provider: ollama
  main: llama3.1:8b  # 完全免费
```

本地 8B 模型做日常操作足够，复杂任务才走 API。

## 策略四：优化对话模式（省 20-40%）

### 减少多轮对话

AI 有时候会"确认"三次才行动。在 SOUL.md 里写：

```markdown
## Efficiency

- 能一次做完的不要分两步
- 不需要确认简单操作（读文件、搜索）
- 只有破坏性操作才需要确认
- 不要问"还有什么需要帮忙的"
```

### 合并 Cron 任务

```
原来: 5 个 cron 任务各跑 1 次 = 5 次对话
合并: 1 个 cron 任务做 5 件事 = 1 次对话
省: 80%
```

## 实战组合：$5/月方案

```
主模型: DeepSeek V3 ($0.27/$1.10 per M)
辅助模型: GPT-4o-mini ($0.15/$0.60 per M)

每日用量:
  对话: 20 次 × 1.5K tokens = 30K tokens (用 DeepSeek)
  Cron: 5 次 × 2K tokens   = 10K tokens (用 mini)
  Heartbeat: 12 次 × 300    = 3.6K tokens (用 mini)

月消耗:
  DeepSeek: 30K × 30 = 900K tokens
    Input:  600K × $0.27/M  = $0.16
    Output: 300K × $1.10/M  = $0.33
  Mini: 13.6K × 30 = 408K tokens
    Input:  250K × $0.15/M  = $0.04
    Output: 158K × $0.60/M  = $0.09

总计: $0.62/月 ≈ ¥4.5/月
```

**$0.62/月**。基本等于免费。代价是复杂推理能力弱一些，但日常操作完全够用。

## 监控成本

```bash
# 查看 OpenRouter 使用量
curl -s https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" | python3 -m json.tool

# 设置用量提醒
# 在 OpenRouter 后台设置 Usage Alert
# 到达 $5 自动通知
```

---

## 本章要点

- 典型用户月费 $30-50，但可以压到 $5 以内
- 四个策略：降模型、减 token、用免费额度、优化对话模式
- 极限方案：DeepSeek V3 + GPT-4o-mini，月费不到 $1
- 精简 MEMORY.md 和 Skill 数量是见效最快的方法
- 监控用量，设自动提醒

**下一章：** 自建 API 中转 — 用 sub2api 搭自己的模型网关。
