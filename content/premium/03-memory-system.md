---
title: "三层记忆体系：让 AI 真正记住你"
chapter: 3
date: 2026-04-16
summary: Hermes 的记忆不是魔法，就是文件。写得好，AI 越用越懂你；写得烂，三个月后它还在问你"你的服务器是什么系统"。
tags: [记忆, MEMORY.md, 知识库]
status: draft
---

## 记忆的三层结构

Hermes 的记忆不是黑盒，是明文文件。理解结构才能用好：

```
第一层：MEMORY.md（长期记忆）
  ↓ 注入每一轮对话
  记录：你是谁、你的偏好、稳定事实

第二层：memory/YYYY-MM-DD.md（每日笔记）
  ↓ 需要时搜索
  记录：当天发生了什么、做了什么决定

第三层：/root/kb/（知识库）
  ↓ 需要时读取
  记录：稳定的技术知识、可复用的方法
```

## 第一层：MEMORY.md

### 写什么

MEMORY.md 注入每一轮对话，所以它必须**短而精**。只写会反复用到的信息：

```markdown
## User

- 中文为主
- 技术栈：Next.js, TypeScript, Nginx
- 偏好：先说结论，不要废话
- 时区：CST (UTC+8)

## Environment

- 服务器：Ubuntu 22.04, 198.23.152.147
- 网站根目录：/var/www/cyberhz/public
- 项目目录：/root/

## Stable Facts

- 主域名：cyberhz.com
- Telegram bot token 存在 ~/.hermes/.env
- 科技日报每天 6:00 北京时间推 Telegram
```

### 不写什么

- ❌ 临时任务状态（"今天在修 nginx 配置"）
- ❌ 已完成的工作（"昨天部署了 hermes101"）
- ❌ 大段描述（超过 3 行的事实要精简）
- ❌ 密码和密钥（用 .env 文件）

### 维护频率

MEMORY.md 不是一次写完就不管了。定期（每周或每两周）：
1. 删掉过时信息
2. 合并重复条目
3. 把稳定的 daily note 结论提升到这里

## 第二层：Daily Notes

每天的对话自动生成 `memory/YYYY-MM-DD.md`。这是原始日志。

### 怎么用

- 回顾过去对话：`session_search "关键词"`
- 追溯决策：翻对应日期的 daily note
- 提取长期价值：提升到 MEMORY.md

### 组织技巧

不要手动编辑 daily notes（AI 会自动写）。你的工作是**定期 review**：

```
每周一次：
1. 读最近 7 天的 daily notes
2. 找到值得长期记住的结论
3. 写入 MEMORY.md
4. 跨任务的经验写入 /root/kb/wiki/
```

## 第三层：知识库 /root/kb/

知识库是你主动构建的，不是 AI 自动生成的。

### 目录结构

```
/root/kb/
├── wiki/          # 稳定知识（技术方案、配置模板）
├── tasks/         # 任务记录（每个任务一个目录）
├── raw/           # 原始数据（日报、扫描结果）
├── templates/     # 模板（笔记骨架）
└── index.md       # 导航
```

### 写入规则

- **wiki/** — 只放验证过的、可复用的知识
- **tasks/** — 任务进行中放这里，完成后提炼到 wiki
- **raw/** — 原始数据（科技日报、搜索结果），不做处理直接存

### 实际示例

wiki 里应该长这样：

```markdown
# Nginx 配置模板

## 反向代理 + SSL
server {
    listen 443 ssl http2;
    server_name example.com;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

## 已知坑
- http2 需要 OpenSSL 1.0.2+
- proxy_pass 末尾不要加 /（会改变路径）
```

这种模板你可能每两个月用一次，但每次都需要。放在 wiki 里，AI 能直接读取给你。

## 记忆搜索：怎么找到过去的信息

### 情况 1：记得聊过但不记得细节
```
session_search "nginx 配置"
```
搜索所有对话记录。

### 情况 2：找具体日期的决定
```
read_file /root/memory/2026-04-10.md
```

### 情况 3：找技术方案
```
search_files "proxy_pass" /root/kb/
```
搜索知识库内容。

## 常见坑

### 坑 1：MEMORY.md 写太多
超过 2000 字就要精简。每次对话都加载，太长浪费 token。

### 坑 2：不维护
三个月不看 MEMORY.md，里面全是过时信息。AI 会根据过时信息给你错误建议。

### 坑 3：把知识库当垃圾桶
什么都往 kb/ 里扔。只放经过验证的、可复用的内容。原始数据放 raw/，临时的东西别放。

---

## 本章要点

- 三层记忆：MEMORY.md（每轮注入）> daily notes（日志）> kb（知识库）
- MEMORY.md 要短而精，定期清理
- 知识库只放验证过的可复用内容
- 每周 review daily notes，提炼到 MEMORY.md
- 用 session_search 搜索过去对话，不要猜

**下一章：** 技能开发从零到发布 — 写一个真正有用的 skill。
