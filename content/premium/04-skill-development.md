---
title: "技能开发从零到发布：写一个真正有用的 Skill"
chapter: 4
date: 2026-04-16
summary: Skill 不是插件市场里的花瓶。一个好的 skill 应该解决一个具体问题，而且让 AI 不需要你重复解释怎么做。
tags: [skill, 开发, 教程]
status: draft
---

## Skill 是什么

Skill 本质上是一个 **Markdown 说明书**，告诉 AI：
1. 什么时候该用这个 skill（触发条件）
2. 怎么用（具体步骤和命令）
3. 有哪些坑（已知问题和解决方案）

AI 每次需要做某件事时，会读取对应的 skill，按照里面的指引执行。**没有 skill，AI 每次都要从零推理怎么做。有了 skill，它就能直接照着做。**

## 什么时候该写 Skill

| 场景 | 需要 Skill 吗 |
|------|-------------|
| 一次性操作（改个配置） | ❌ 不需要 |
| 每次都要解释的复杂流程 | ✅ 需要 |
| 用到特定工具/API 的任务 | ✅ 需要 |
| 有已知坑的工作流 | ✅ 需要 |
| 简单的文件操作 | ❌ 不需要 |

**判断标准：** 你是不是在重复告诉 AI 同样的话？如果是，就该写成 skill。

## Skill 目录结构

```
~/.hermes/skills/
└── my-skill/
    └── SKILL.md      # 必须有，说明书
```

就这么简单。一个目录一个文件就够了。

## SKILL.md 写法

### 最小可用版本

```markdown
---
name: deploy-hermes101
description: Deploy hermes101 site to cyberhz.com
---

# Deploy hermes101

## When to use
When user asks to deploy or publish hermes101 changes.

## Steps
1. Build: `cd /root/hermes101 && npm run build`
2. Copy: `cp -r /root/hermes101/out/* /var/www/cyberhz/public/`
3. Reload: `nginx -s reload`
4. Verify: `curl -s -o /dev/null -w "%{http_code}" https://cyberhz.com`

## Pitfalls
- Build may fail if `node_modules` is stale → run `npm install` first
- nginx reload needs root → use sudo or run as root
```

### 完整版本

```markdown
---
name: my-skill
description: 一句话描述这个 skill 做什么
version: 1.0.0
tags: [tag1, tag2]
---

# Skill Name

## When to use
触发条件。什么时候 AI 应该加载这个 skill。

## Prerequisites
- 需要什么工具（curl, python3, etc.）
- 需要什么环境变量
- 需要什么前置配置

## Steps

### Step 1: 做什么
具体命令或操作。

```bash
command-here
```

### Step 2: 做什么
...

## Verification
怎么确认成功了。

```bash
check-command
```

## Pitfalls
- 已知坑 1：原因 + 解决方案
- 已知坑 2：原因 + 解决方案

## Examples
实际使用场景的示例。

## Related
相关 skill 或文档链接。
```

## 实战：写一个"检查网站健康"的 Skill

```markdown
---
name: site-health-check
description: Check if cyberhz.com and its subdomains are healthy
---

# Site Health Check

## When to use
When user asks "网站正常吗" or "is the site up", or during monitoring tasks.

## Steps

1. Check main domain:
```bash
curl -s -o /dev/null -w "%{http_code}" https://cyberhz.com
```

2. Check key pages:
```bash
for page in "" "/resources" "/thoughts" "/zh"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://cyberhz.com${page}")
  echo "${page:-/}: ${code}"
done
```

3. Check SSL expiry:
```bash
echo | openssl s_client -connect cyberhz.com:443 2>/dev/null | openssl x509 -noout -enddate
```

4. Check nginx:
```bash
nginx -t 2>&1 && systemctl is-active nginx
```

## Interpretation
- 200 = OK
- 301/302 = Redirect (usually OK, check target)
- 500/502/503 = Server error → check nginx error log
- 000 = Connection failed → nginx down or DNS issue

## Pitfalls
- curl may timeout on slow connections → add `--max-time 10`
- SSL check may fail if port 443 is blocked by firewall
- `nginx -t` needs root permissions

## Report format
```
✅ cyberhz.com: 200
✅ /resources: 200
✅ /thoughts: 200
✅ SSL: expires Jun 15 2026
✅ Nginx: active
```
```

## 发布 Skill

Skill 不需要"发布"。放在 `~/.hermes/skills/` 目录下，AI 自动发现。

如果你想分享给别人：
1. 把 SKILL.md 放到 GitHub 仓库
2. 别人复制到他们自己的 `~/.hermes/skills/` 目录即可
3. 或者写成 Hermes 社区 skill（需要遵循社区规范）

## 管理已有的 Skill

```bash
# 列出所有 skill
ls ~/.hermes/skills/

# 查看某个 skill
cat ~/.hermes/skills/my-skill/SKILL.md

# 删除不用的 skill
rm -rf ~/.hermes/skills/old-skill/
```

## 常见坑

### 坑 1：写太长
skill 越长，AI 加载的 token 越多。只写关键步骤，不要写教程。

### 坑 2：硬编码密码
skill 会注入每一轮对话。密码放 .env 文件，skill 里只写"从 .env 读取"。

### 坑 3：不更新
工具升级了，skill 里的命令可能失效。用过发现不对就马上改。

---

## 本章要点

- Skill = AI 的说明书，解决重复解释的问题
- 一个目录一个 SKILL.md 就够了
- 写触发条件 + 步骤 + 已知坑
- 放在 ~/.hermes/skills/ 就自动生效
- 不要写太长，不要硬编码密码

**下一章：** Hooks 审计与安全 — 怎么防 skill 权限滥用。
