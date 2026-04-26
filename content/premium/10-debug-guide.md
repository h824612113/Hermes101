---
title: "Debug 心法：让 AI 帮你修 AI"
chapter: 10
date: 2026-04-16
summary: Hermes 出了问题，不要慌。90% 的问题可以通过系统化排查定位。更妙的是，你可以让 AI 帮你排查 AI 的问题。
tags: [debug, 排错, 教障排除]
status: draft
---

## 排错三步法

不管什么问题，先走这三步：

```
第一步：看日志（到底发生了什么）
第二步：看状态（服务还在跑吗）
第三步：看配置（配置对不对）
```

80% 的问题走到第二步就能定位。

## 第一步：看日志

### Hermes 自身日志

```bash
# 如果用 systemd 管理
journalctl -u hermes -f --lines=50

# 如果直接跑的进程
# 看终端输出，或者日志文件
cat ~/.hermes/logs/hermes.log | tail -50
```

### 常见日志关键词

| 日志内容 | 含义 | 解决方案 |
|---------|------|---------|
| `rate limit` | API 速率限制 | 等一会儿重试，或换模型 |
| `401 Unauthorized` | API Key 失效 | 检查 Key 是否过期/被封 |
| `context_length_exceeded` | 超出上下文长度 | 精简持久记忆 / Skill，清理对话历史 |
| `timeout` | 请求超时 | 检查网络，或增加超时时间 |
| `ECONNREFUSED` | 连接被拒绝 | 服务没启动或端口不对 |
| `permission denied` | 权限不足 | 用 sudo 或检查文件权限 |
| `OOM killed` | 内存溢出 | 增加内存或限制模型大小 |

## 第二步：看状态

### 系统状态

```bash
# Hermes 进程在跑吗
ps aux | grep hermes

# 端口在监听吗
ss -tlnp | grep hermes

# 内存够吗
free -h

# 磁盘够吗
df -h
```

### 服务状态

```bash
# Nginx
systemctl status nginx
nginx -t

# Docker
docker ps
docker logs hermes-sandbox --tail 20

# API 连通性
curl -s https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY" | head -1
```

### 网络状态

```bash
# DNS 解析
dig yourdomain.com

# 连通性
ping yourdomain.com

# SSL 证书
echo | openssl s_client -connect yourdomain.com:443 2>/dev/null | \
  openssl x509 -noout -dates
```

## 第三步：看配置

### config.yaml 检查

```bash
# YAML 语法检查
python3 -c "import yaml; yaml.safe_load(open('config.yaml'))" && echo "OK"

# 检查环境变量是否加载
env | grep -E "API_KEY|TOKEN"
```

### .env 检查

```bash
# 文件存在吗
ls -la ~/.hermes/.env

# 权限对吗（应该是 600）
chmod 600 ~/.hermes/.env

# 内容对吗（不要直接 cat，检查行数）
wc -l ~/.hermes/.env
```

## 常见问题速查

### 问题 1：Hermes 启动后立刻退出

```bash
# 查看退出原因
journalctl -u hermes --lines=20

# 常见原因：
# - config.yaml 语法错误 → 用 yaml 检查
# - API Key 未设置 → 检查 .env
# - 端口被占用 → 换端口
```

### 问题 2：Bot 不回复消息

```bash
# 1. Bot 在线吗
curl -s "https://api.telegram.org/bot${TOKEN}/getMe"

# 2. Bot 能收到消息吗
curl -s "https://api.telegram.org/bot${TOKEN}/getUpdates"

# 3. Hermes 进程在处理吗
journalctl -u hermes -f
# 然后给 Bot 发消息，看有没有日志
```

### 问题 3：AI 回复质量突然变差

- 检查是不是换了模型（config 被改了）
- 检查持久记忆里是不是被写入了矛盾的规则（`ls ~/.hermes/memories/` 看一下）
- 检查上下文是不是太长（被截断了）
- 检查上游模型有没有更新（行为变了）

### 问题 4：cronjob 不执行

直接在对话里查：

> 列出我所有的定时任务，告诉我它们最近的执行状态。

> 把 ID 是 xxx 的 cron 手动触发一次，把执行结果给我看。

如果你需要直接看底层数据，cronjob 状态存在 `~/.hermes/state.db`：

```bash
sqlite3 ~/.hermes/state.db "SELECT * FROM cronjobs;"
```

### 问题 5：Skill 不生效

```bash
# Skill 文件存在吗
ls ~/.hermes/skills/my-skill/SKILL.md

# Skill 名字对吗（目录名 = skill 名）
# YAML frontmatter 格式对吗（name 字段必须有）

# 测试：直接问 AI "加载 my-skill skill"
```

## 让 AI 自己 Debug

最强大的技巧：让 Hermes 帮你排查 Hermes 的问题。

### 方式 1：让 AI 读日志

```
你：看看 hermes 最近的日志，有什么异常吗？
AI：（执行 journalctl，分析日志，指出问题）
```

### 方式 2：让 AI 做系统检查

```
你：帮我做一次系统健康检查
AI：（检查进程、端口、内存、磁盘、日志，给出报告）
```

### 方式 3：写成 Skill

把排查步骤写成 skill，AI 就能自动执行：

```markdown
---
name: self-diagnose
description: Diagnose Hermes issues
---

# Self Diagnose

## Steps
1. 检查进程: `ps aux | grep hermes`
2. 检查内存: `free -h`
3. 检查磁盘: `df -h`
4. 检查日志: `journalctl -u hermes --lines=30`
5. 检查 API 连通: `curl -s https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"`
6. 检查配置: `python3 -c "import yaml; yaml.safe_load(open('config.yaml'))"`

## Report Format
对每项给出 ✅ 正常 或 ❌ 异常 + 建议修复方案。
```

## 性能优化

### 加速启动

```bash
# 减少 skill 加载时间
# 只保留真正需要的 skill
ls ~/.hermes/skills/ | wc -l  # 数量控制在 10 个以内

# 看一下持久记忆体积，太大就清理
du -sh ~/.hermes/memories/
```

### 减少延迟

```yaml
# config.yaml
performance:
  # 流式输出（打字机效果）
  streaming: true

  # 减少不必要的工具调用
  tool_choice: auto  # 让 AI 自己判断要不要用工具

  # 并发控制
  max_concurrent_tools: 3
```

---

## 本章要点

- 排错三步法：看日志 → 看状态 → 看配置
- 常见错误关键词速查（rate limit, 401, timeout, OOM）
- Bot 不回复时先检查 getMe 和 getUpdates
- 让 AI 自己做系统检查 — 写成 skill 最省事
- 控制 skill 数量和持久记忆体积来优化性能

---

## 全书总结

11 章内容覆盖了 Hermes 从"能用"到"用好"的完整路径：

1. SOUL.md — 让 AI 懂你
2. 模型路由 — 省钱不省质量
3. 记忆体系 — 越用越懂你
4. Skill 开发 — 解决重复问题
5. 安全审计 — 敢装社区 skill
6. 多平台 — 一个实例多入口
7. Docker 沙箱 — 安全跑代码
8. 成本控制 — 月费压到 $5
9. API 中转 — 自建网关变现
10. Debug 心法 — 自己修自己的问题
11. 工作流模板 — 5 个实战自动化

**下一章：** 工作流模板 — 从零搭 5 个实战自动化。
