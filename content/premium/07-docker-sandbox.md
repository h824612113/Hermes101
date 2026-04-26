---
title: "Docker 沙箱：让 AI 安全地跑不信任的代码"
chapter: 7
date: 2026-04-16
summary: 让 AI 写代码并执行是 Hermes 最强的能力之一，但也是最危险的。Docker 沙箱能把风险控制在容器里。
tags: [Docker, 沙箱, 安全, 隔离]
status: draft
---

## 为什么需要沙箱

Hermes 可以执行任意 shell 命令。这意味着：
- AI 写的代码可能有 bug（rm -rf /）
- 社区 skill 可能包含恶意命令
- 实验性操作可能破坏系统

沙箱的作用：**让这些操作在一个隔离的环境里发生，炸了也不影响主机。**

## 最小可用 Docker 沙箱

```bash
# 创建一个轻量沙箱容器
docker run -d --name hermes-sandbox \
  --memory 512m \
  --cpus 1 \
  --network none \
  --read-only \
  -v /tmp/sandbox-workspace:/workspace \
  ubuntu:22.04 \
  tail -f /dev/null
```

参数解释：
- `--memory 512m` — 最多用 512MB 内存，防止 OOM
- `--cpus 1` — 限制 CPU
- `--network none` — 禁止网络访问（最安全）
- `--read-only` — 文件系统只读
- `-v /tmp/sandbox-workspace:/workspace` — 只挂载一个工作目录

## 在沙箱里执行命令

```bash
# 在沙箱里执行
docker exec hermes-sandbox bash -c "ls /workspace"

# 复制文件进去
docker cp ./script.py hermes-sandbox:/workspace/script.py

# 复制结果出来
docker cp hermes-sandbox:/workspace/output.txt ./output.txt
```

## 集成到 Hermes

### 方案 1：用 Skill 包装

```markdown
---
name: sandbox-exec
description: Execute untrusted code in Docker sandbox
---

# Sandbox Execute

## Steps
1. 将代码复制到沙箱：`docker cp {file} hermes-sandbox:/workspace/`
2. 执行：`docker exec hermes-sandbox bash /workspace/{file}`
3. 获取输出：`docker logs hermes-sandbox 2>&1 | tail -20`
4. 如果需要文件输出：`docker cp hermes-sandbox:/workspace/output ./`

## Pitfalls
- 沙箱没有网络。需要网络的操作要先在主机下载依赖
- 沙箱文件系统重启后丢失。重要结果要复制出来
- 内存限制 512MB。大数据处理可能 OOM
```

### 方案 2：Hermes 原生 docker terminal（推荐）

这是 Hermes 内置的方式——一行配置切换：

```yaml
# ~/.hermes/config.yaml
terminal: docker

# 可选：指定基础镜像和资源限制
docker:
  image: nousresearch/hermes-sandbox:latest    # 也可以用 ubuntu:22.04
  memory: 512m
  cpu: 1
  network: bridge                              # 或 none / host
```

切到 `terminal: docker` 之后，所有 `terminal` 工具调用都自动在容器里执行。Agent 不知道差别，但宿主机干净——这是和 OpenClaw 自己手动包一层 `docker exec` 最大的区别：**你不用改任何 Skill，沙箱"对 Agent 透明"**。

## 有网络的沙箱（谨慎使用）

有些任务需要网络（pip install, npm install）：

```bash
# 允许网络，但限制出站
docker run -d --name hermes-sandbox-net \
  --memory 512m \
  --cpus 1 \
  -v /tmp/sandbox-workspace:/workspace \
  ubuntu:22.04 \
  tail -f /dev/null

# 白名单模式：只允许访问特定域名
# 需要 iptables 配合
iptables -I DOCKER-USER -d evil.com -j DROP
```

## Python 代码执行示例

```bash
# 1. 写代码到临时文件
cat > /tmp/sandbox-workspace/analysis.py << 'EOF'
import json
data = [1, 2, 3, 4, 5]
print(json.dumps({"mean": sum(data)/len(data), "max": max(data)}))
EOF

# 2. 在沙箱里执行
docker exec hermes-sandbox python3 /workspace/analysis.py

# 3. 输出
# {"mean": 3.0, "max": 5}
```

## 沙箱维护

```bash
# 查看沙箱状态
docker stats hermes-sandbox

# 清理工作空间
docker exec hermes-sandbox rm -rf /workspace/*

# 重启沙箱（重置状态）
docker restart hermes-sandbox

# 彻底重建
docker rm -f hermes-sandbox
docker run -d --name hermes-sandbox ... # 重新创建
```

## 多沙箱管理

如果需要不同安全级别的沙箱：

```bash
# 严格沙箱（无网络、只读）
docker run -d --name sandbox-strict --network none --read-only ...

# 宽松沙箱（有网络、可写）
docker run -d --name sandbox-open ...

# 专用沙箱（预装了 Python + 依赖）
docker build -t hermes-python-sandbox - << 'EOF'
FROM python:3.12-slim
RUN pip install pandas numpy requests
EOF
docker run -d --name sandbox-python hermes-python-sandbox ...
```

## 常见坑

### 坑 1：沙箱太严格，什么都跑不了
需要安装软件的场景，先构建自定义镜像，别在运行时装。

### 坑 2：忘了清理
沙箱工作空间会越来越大。定期清理或设 cron：
```bash
0 3 * * * docker exec hermes-sandbox rm -rf /workspace/*
```

### 坑 3：沙箱里的程序读不到主机环境变量
沙箱是隔离的。需要的话显式传入：
```bash
docker exec -e API_KEY="$API_KEY" hermes-sandbox python3 script.py
```

---

## 本章要点

- 沙箱 = 隔离环境，让不安全的代码在里面跑
- 最小配置：--network none --read-only --memory 512m
- 用 Skill 包装沙箱操作，AI 就能自动使用
- 需要网络时用白名单，不要完全开放
- 定期清理沙箱工作空间

**下一章：** 成本控制实战 — 真实账单拆解。
