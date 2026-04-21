---
title: "自建 API 中转：用 sub2api 搭自己的模型网关"
chapter: 9
date: 2026-04-16
summary: 不想被中间商赚差价？自己搭一个 API 网关，统一管理多家模型，还能对外卖 API Key。
tags: [API, 中转, sub2api, 变现]
status: draft
---

## 为什么自建

| 方案 | 优点 | 缺点 |
|------|------|------|
| 直连 OpenAI | 最简单 | 只能用 OpenAI 的模型 |
| 直连 Anthropic | 用 Claude | 只能用 Claude |
| 用 OpenRouter | 统一接口、模型多 | 加价 10-20%、依赖第三方 |
| **自建网关** | 自己定价、可转售 | 需要维护 |

自建的核心价值：**你控制一切** — 模型选择、价格、用户管理、计费。

## sub2api 是什么

sub2api 是一个轻量 API 中转服务：
- 把多家 AI 模型的 API 统一成 OpenAI 兼容格式
- 支持用户管理、额度控制、计费
- 你可以用自己的 API Key 充值上游，然后给用户发 Key

## 部署步骤

### 1. 拉取并启动

```bash
# 假设你已经有 sub2api 的部署方式
# 这里以 Docker 为例
docker run -d --name sub2api \
  -p 8080:8080 \
  -e DATABASE_URL="postgres://user:pass@db:5432/sub2api" \
  -e ADMIN_PASSWORD="your-admin-password" \
  sub2api/sub2api:latest
```

### 2. 配置上游模型

在管理后台（http://your-server:8080/admin）添加模型：

```
模型名: gpt-4o
上游地址: https://api.openai.com/v1
API Key: sk-your-openai-key

模型名: claude-sonnet-4
上游地址: https://api.anthropic.com/v1
API Key: sk-ant-your-anthropic-key

模型名: deepseek-v3
上游地址: https://api.deepseek.com/v1
API Key: sk-your-deepseek-key
```

### 3. 反向代理 + HTTPS

```nginx
# /etc/nginx/conf.d/api.yourdomain.com.conf
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 300s;  # 长对话需要
    }
}
```

### 4. 给用户发 Key

在管理后台创建用户 → 生成 API Key → 发给用户

用户的使用方式和 OpenAI 完全一样：

```python
from openai import OpenAI
client = OpenAI(
    api_key="sk-your-issued-key",
    base_url="https://api.yourdomain.com/v1"
)
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "hello"}]
)
```

## 定价策略

### 按量计费

```
上游 OpenAI GPT-4o: $2.5/1M input
你的定价:            ¥0.02/1K input = $2.76/1M
利润率:              ~10%

上游 Anthropic Sonnet 4: $3/1M input
你的定价:                ¥0.025/1K input = $3.45/1M
利润率:                  ~15%
```

### 包月套餐

```
基础版: ¥49/月  — 含 50 万 token，仅限 GPT-4o-mini
标准版: ¥149/月 — 含 200 万 token，可选 GPT-4o/Sonnet
专业版: ¥299/月 — 含 500 万 token，所有模型
```

## 风控

### 速率限制

```yaml
# 每用户速率限制
rate_limit:
  requests_per_minute: 20
  tokens_per_minute: 100000
  requests_per_day: 500
```

### 额度控制

```yaml
# 超额自动停用
billing:
  auto_disable: true
  warning_threshold: 80  # 80% 时发提醒
  disable_threshold: 100 # 100% 时停用
```

### 防滥用

```yaml
security:
  # 禁止的模型参数
  blocked_params:
    temperature: [">", 2.0]
    max_tokens: [">", 16384]

  # IP 黑名单
  blocked_ips: []
```

## 对接收款

### 微信/支付宝

推荐用聚合支付（易支付、码支付等）：
1. 注册聚合支付账号
2. 对接 API（生成收款二维码）
3. 用户扫码付款 → 自动充值到账户

### 简单方案：手动收款

初期用户少，直接微信收款 + 手动充值也行。等量起来了再自动化。

## 常见坑

### 坑 1：上游 API Key 被封
OpenAI 和 Anthropic 都禁止转售。如果检测到异常用量模式，可能封号。

**缓解：** 分散多个 Key、控制每 Key 用量、不对外暴露你用的是哪家的 Key。

### 坑 2：用户投诉回复质量
用户觉得"你的 API 回复不如官方好"。其实上游是一样的，但用户期望不同。

**解决：** 提前说明质量和上游一致，问题反馈走工单。

### 坑 3：上游涨价
模型供应商可能随时涨价。你已经按月卖了，涨价就亏。

**缓解：** 不要做长期预付。按量计费或者短期套餐更安全。

---

## 本章要点

- sub2api 统一多家模型为 OpenAI 兼容接口
- 部署简单：Docker + Nginx + HTTPS
- 定价加 10-30%，按量或包月都行
- 注意风控：速率限制、额度控制、防滥用
- 上游封号是最大风险，分散 Key 降低风险

**下一章（最后一章）：** Debug 心法 — 常见报错排查和 AI 自助修 Bug。
