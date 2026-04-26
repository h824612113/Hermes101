---
title: "三层记忆体系：让 AI 真正记住你"
chapter: 3
date: 2026-04-16
summary: Hermes 的记忆不是魔法，就是 SQLite + 几个 markdown。理解三层结构、知道每一层该写什么、定期审计——AI 才会越用越懂你，而不是三个月后还在问"你的服务器是什么系统"。
tags: [记忆, FTS5, 持久记忆, Skill, 知识库]
status: draft
---

## 三层记忆，对应认知科学的三种记忆类型

Hermes 的记忆系统不是黑盒——所有数据都在 `~/.hermes/` 目录下，可读、可改、可备份。理解结构是用好它的前提：

```
第一层：会话记忆（SQLite + FTS5 全文索引）
  位置：~/.hermes/state.db
  写入：自动（每轮对话写入）
  查询：按需（FTS5 搜相关历史）
  对应：情景记忆（发生过什么）

第二层：持久记忆（memory 工具维护）
  位置：~/.hermes/memories/
  写入：半自动（Agent 在对话末提炼 + 你手动补）
  查询：每轮对话开始时按需注入
  对应：语义记忆（你是谁、稳定事实）

第三层：Skill 记忆 + 外部知识库
  位置：~/.hermes/skills/<name>/SKILL.md（Skill）
       /root/kb/ 或你自定的位置（外部知识库）
  写入：手动 + Skill 自改进自动写入
  查询：根据触发条件加载到 prompt
  对应：程序性记忆（怎么做事）
```

**关键设计**：所有层都是**按需检索**而非全量加载。新对话开始时 Hermes 不会把所有历史塞进 prompt——它根据当前话题用 FTS5 搜出相关片段，只加载需要的部分。这是为什么聊几个月也不会变慢、不会爆 token 的根本原因。

## 第一层：会话记忆（自动，几乎不用你管）

每轮对话的内容、工具调用、返回结果，全部写入 `~/.hermes/state.db` 这个 SQLite 数据库，并实时建 FTS5 全文索引。

```bash
# 看一下你的会话数据库
sqlite3 ~/.hermes/state.db ".tables"
# 通常会有 sessions / messages / tool_calls 等表

# 查一下数据量
sqlite3 ~/.hermes/state.db "SELECT count(*) FROM messages;"
```

### 你能做的事

1. **跨会话搜索**：直接说"上周三我让你调研那个方案的结果是什么"——Hermes 用 FTS5 搜历史，把最相关的片段加载到上下文回答你。
2. **备份和迁移**：换机器只需要打包整个 `~/.hermes/` 目录。新机器上还原后所有历史可搜。
3. **审计**：直接读 `state.db`，所有对话都是明文存储（除非你在 config 里加密）。

### 你不该做的事

- **手动编辑 state.db**：这是 SQLite 数据库，乱改可能损坏 FTS5 索引。
- **指望它自动遗忘**：会话记忆只增不减。如果你的隐私敏感，定期清理：

```bash
# 删掉 6 个月前的会话（先备份！）
sqlite3 ~/.hermes/state.db \
  "DELETE FROM messages WHERE created_at < datetime('now', '-6 months');"
sqlite3 ~/.hermes/state.db "VACUUM;"
```

## 第二层：持久记忆（精心维护的回报最大）

会话记忆是流水账。持久记忆是**精炼出的"你是谁"**——不会因为新对话被淹没。

Hermes 的 `memory` 工具会在对话末做一次"策划记忆"——决定这次聊了什么是值得长期记住的。但 Agent 自动判断不一定准，**最佳实践是你也主动告诉它**。

### 主动写入持久记忆的几种方式

**方式一：在对话里直接说**

> 把"我用 Next.js + TypeScript + Tailwind"这件事记下来，以后写代码默认用这套。

Hermes 会调 `memory` 工具把这条写进持久记忆。

**方式二：写一个"用户画像" Skill**

在 `~/.hermes/skills/user-profile/SKILL.md` 写好你的稳定事实——这个文件每次对话都会被加载到 prompt：

```markdown
# About the User

## Who I Am
- 中文为主，技术词保留英文
- 技术栈：Next.js / TypeScript / Tailwind / Python / Nginx
- 时区：CST (UTC+8)，深夜不打扰

## Environment
- 主服务器：Hetzner CX22, Ubuntu 22.04
- 主域名：cyberhz.com
- 项目目录：/root/
- API key 在 ~/.hermes/.env，不要在对话里复述出来

## Preferences
- 先说结论，再说理由
- 不要"好的！"、"很高兴帮到你！"这种废话
- 不确定时说不确定，不要编

## Hard Boundaries
- 涉及发邮件 / 推特 / 群聊广播 → 必须先问
- 删文件 → 用 trash，不要 rm
- 改 Nginx 配置 → 改完 nginx -t 验证再 reload
```

**方式三：Honcho 用户建模（可选）**

Honcho 是 Plastic Labs 开发的辩证用户建模系统，会从你言行不一致中推断更深层的画像。在 `~/.hermes/config.yaml` 里启用：

```yaml
memory:
  honcho:
    enabled: true
    api_url: "https://honcho.plasticlabs.ai"
    workspace_id: "your-workspace-id"
```

Honcho 推断的画像不是替代你写的 user-profile，而是**互补**——你写的是"我希望我是这样"，Honcho 推的是"我实际是这样"。两者放在一起，AI 对你的理解更立体。

### 持久记忆 ≠ 越多越好

每条持久记忆都会以摘要形式被注入 prompt（虽然按需检索，但触发后会占 token）。所以**写得短而精**：

| ❌ 不要这样 | ✅ 应该这样 |
|---|---|
| "我喜欢用 Tailwind 写样式因为它能让我快速开发，特别是配合 shadcn 的话效率特别高，但是我也不排斥手写 CSS" | "样式：Tailwind + shadcn/ui，必要时手写 CSS" |
| "上周三我和老板开会决定下个月发布 v2，要把首页重做，需要加上视频背景和暗色模式" | （这是项目状态，不是稳定事实，不该进持久记忆。让会话记忆 + Skill 自改进处理） |

### 定期审计持久记忆

每月 / 每季度做一次：

```bash
# 看看持久记忆里都有什么
ls -la ~/.hermes/memories/
cat ~/.hermes/memories/*.md   # 视具体实现可能是 .json，先 ls 确认

# 删掉过时的（比如换了服务器、改了项目方向）
nano ~/.hermes/memories/<file>
```

> ⚠️ **重要**：Hermes 没有自动遗忘机制。你不审计，过时信息就一直在用。

## 第三层：Skill 记忆 + 外部知识库

### Skill 记忆

每个 Skill 是 `~/.hermes/skills/<name>/SKILL.md`——它记的是**怎么做事**。详见第 4 章《技能开发从零到发布》。

最关键的差异：**Skill 会自我进化**。你纠正一次，Hermes 把规则写进 markdown，下次自动用。这一层会越用越好用。

### 外部知识库

如果你有大量稳定的技术资料（Nginx 模板、Docker compose 模板、SOP 文档……），把它们放在一个独立目录，让 Hermes 通过文件工具按需读取：

```
/root/kb/
├── wiki/          # 验证过的可复用知识
│   ├── nginx-templates.md
│   ├── docker-compose.md
│   └── ssh-hardening.md
├── tasks/         # 任务记录（进行中→完成后提炼到 wiki）
├── raw/           # 原始素材
└── index.md       # 给 AI 看的目录
```

在 `~/.hermes/skills/knowledge-base/SKILL.md` 里写一条触发规则：

```markdown
# Knowledge Base Lookup

## Trigger
当我问技术方案、配置模板、过往决策时

## Steps
1. 先读 /root/kb/index.md 找入口
2. 按主题进 /root/kb/wiki/<topic>.md
3. 找不到就告诉我"知识库没有"，不要瞎编
```

### 三层联动的实战例子

> 你问："帮我部署这个新 Next.js 项目"
>
> Hermes 的处理流：
>
> 1. **持久记忆触发**：知道你用 Hetzner Ubuntu 22.04 + Nginx 反代，主域名 cyberhz.com
> 2. **会话记忆 FTS5 搜**："上次部署 Next.js" → 找到上周三的部署对话，提取你遇到的端口冲突解决方案
> 3. **Skill 触发**：加载 `deployment-checklist` Skill（你之前迭代过几版的部署流程）
> 4. **知识库读取**：从 `/root/kb/wiki/nginx-templates.md` 读出反代模板
>
> 最终给你一套**完全符合你历史习惯**的部署方案。三层各司其职，按需调用。

## 三个最常见的坑

### 坑 1：把项目状态写进持久记忆

❌ 持久记忆里写"当前在做 Hermes 101 教程"

✅ 这种动态状态让会话记忆 + Skill 自改进去管。持久记忆只放**长期不变的事实**。

### 坑 2：Skill 写得过于具体导致永远触发不准

❌ Skill 触发条件写"当用户提到 nginx 时" → 太宽泛，每次聊到 nginx 都加载，浪费 token。

✅ 写"当用户让我配置或部署 nginx 反向代理时" → 精准触发。

### 坑 3：知识库当垃圾桶

❌ 把所有 markdown 笔记一股脑扔进 `kb/wiki/`。

✅ wiki 只放**验证过 + 可复用**的内容。原始数据进 `raw/`，进行中的任务进 `tasks/`，完成后再提炼。

## 本章要点

- **三层记忆 = 三种认知**：情景（SQLite+FTS5）+ 语义（持久记忆）+ 程序性（Skill）
- **会话记忆**：自动，按需检索，定期清理超过保留期的旧数据
- **持久记忆**：短而精，主动写 user-profile Skill，每月审计
- **Skill 记忆**：自改进让它越用越好——这是 Hermes 最大的差异化
- **外部知识库**：大量稳定资料放独立目录，让 Skill 触发读取

**下一章：** 技能开发从零到发布 — 写一个真正有用的 skill。
