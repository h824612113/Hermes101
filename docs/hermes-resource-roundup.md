# Hermes 资料全网归总（2026-04-13）

> 目标：为 `hermes101` 收集可用于官网/资源页的 Hermes 资料，优先官方一手来源，再补充生态平台与社区教程。

## 1) 官方一手来源（最高优先级）

- Hermes Agent 官网：https://hermes-agent.nousresearch.com/
- Hermes 文档首页：https://hermes-agent.nousresearch.com/docs/
- Hermes 文档 sitemap（可程序化抓取目录）：https://hermes-agent.nousresearch.com/docs/sitemap.xml
- Hermes Agent GitHub：https://github.com/NousResearch/hermes-agent
- Hermes Agent README（原始）：https://raw.githubusercontent.com/NousResearch/hermes-agent/main/README.md
- Nous Portal（官方模型入口）：https://portal.nousresearch.com/
- Nous Research 官网：https://nousresearch.com/
- Nous Research Discord：https://discord.gg/NousResearch

### Portal 访问状态说明

- `https://portal.nousresearch.com/` 在当前抓取环境返回 **Vercel Security Checkpoint**（浏览器验证页），无法直接拿到业务内容。
- 可确认它是官方入口（在 Hermes 官网导航与 README 中均有明确链接）。

## 2) 官方文档结构概览（来自 sitemap）

共抓到 `111` 个 docs 链接，分布：

- `user-guide`：56
- `developer-guide`：20
- `guides`：14
- `reference`：10
- `getting-started`：6
- `integrations`：2
- `skills`：1
- `search`：1

### 推荐首批收录（适合放资源页）

- Quickstart：https://hermes-agent.nousresearch.com/docs/getting-started/quickstart
- Installation：https://hermes-agent.nousresearch.com/docs/getting-started/installation
- Termux：https://hermes-agent.nousresearch.com/docs/getting-started/termux
- CLI：https://hermes-agent.nousresearch.com/docs/user-guide/cli
- Configuration：https://hermes-agent.nousresearch.com/docs/user-guide/configuration
- Messaging Gateway：https://hermes-agent.nousresearch.com/docs/user-guide/messaging
- Security：https://hermes-agent.nousresearch.com/docs/user-guide/security
- Tools：https://hermes-agent.nousresearch.com/docs/user-guide/features/tools
- Skills：https://hermes-agent.nousresearch.com/docs/user-guide/features/skills
- Memory：https://hermes-agent.nousresearch.com/docs/user-guide/features/memory
- MCP：https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp
- Cron：https://hermes-agent.nousresearch.com/docs/user-guide/features/cron
- Context Files：https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files
- Architecture：https://hermes-agent.nousresearch.com/docs/developer-guide/architecture
- Contributing：https://hermes-agent.nousresearch.com/docs/developer-guide/contributing
- CLI Reference：https://hermes-agent.nousresearch.com/docs/reference/cli-commands
- Env Vars：https://hermes-agent.nousresearch.com/docs/reference/environment-variables

## 3) GitHub 生态（官方组织内）

### 重点仓库

- `NousResearch/hermes-agent`
- `NousResearch/hermes-paperclip-adapter`
- `NousResearch/Hermes-Function-Calling`
- `NousResearch/hermes-agent-self-evolution`

### 当前快照（抓取时）

- `hermes-agent`：约 `64,956` stars（GitHub API）
- 最近 release（前 5）：
  - `v2026.4.8`
  - `v2026.4.3`
  - `v2026.3.30`
  - `v2026.3.28`
  - `v2026.3.23`

## 4) 模型分发与平台生态

### OpenRouter（API 模型目录）

来源：https://openrouter.ai/api/v1/models

识别到 Nous/Hermes 相关模型 ID（6 个）：

- `nousresearch/hermes-2-pro-llama-3-8b`
- `nousresearch/hermes-3-llama-3.1-405b`
- `nousresearch/hermes-3-llama-3.1-405b:free`
- `nousresearch/hermes-3-llama-3.1-70b`
- `nousresearch/hermes-4-405b`
- `nousresearch/hermes-4-70b`

### Ollama

- 模型页：https://ollama.com/library/nous-hermes2
- 可用命令：`ollama run nous-hermes2`

### Hugging Face（镜像可访问）

- 组织页（镜像）：https://hf-mirror.com/NousResearch
- 可见 Hermes 系列条目（示例）：
  - `/NousResearch/hermes-2`
  - `/NousResearch/hermes-3`
  - `/NousResearch/Hermes-4-70B`
  - `/NousResearch/Hermes-4-14B`
  - `/NousResearch/Hermes-4.3-36B`

## 5) 社区与第三方资料（次优先级）

以下来源可用于“扩展阅读”，但不应替代官方文档：

- 腾讯云解析文：https://cloud.tencent.com/developer/article/2652528
- 博客园安装指南：https://www.cnblogs.com/qiniushanghai/p/19851330
- 菜鸟教程页面：https://www.runoob.com/ai-agent/hermes-agent.html
- AIHub 条目页：https://www.aihub.cn/agents/hermes-agentnous/
- 社区镜像站（非 Nous 官方域名）：https://hermes-agent.org/zh/

## 6) 给 `hermes101` 的落地建议

- 资源页分层建议：
  - 第一层：官方（官网、docs、GitHub、Portal、Discord）
  - 第二层：生态平台（OpenRouter、Ollama、HF）
  - 第三层：社区教程（云厂商/博客）
- 对第三层增加标签：`community` / `非官方`，避免用户误判权威性。
- Portal 相关内容先保留入口链接，不写未验证的具体配置细节。

