# dsh-jlu-baixiaosheng

吉林大学百晓生知识库 · DeepSeek Harness 插件。把 38 篇实测参考资料（转专业/培养方案/保研/选课/校园网/考试/竞赛车队/新生生活等）作为一个技能注册进 DSH 技能目录，模型问到吉大相关问题时自动加载，也可 `/jlu-baixiaosheng` 手动调用。

> 📎 本插件是主知识库项目 [JLU-xinshengbaixiaosheng](https://github.com/WilliamWang6586/JLU-xinshengbaixiaosheng) 的 DSH 分发形态，内容同源、版本同步；主项目已把本仓库挂为 submodule（`dsh-jlu-baixiaosheng/` 目录）。非 DSH 用户（Hermes / Claude Code 等）请直接使用主项目。

纯数据插件：不联网、不起子进程、不读写你的任何文件，只随包提供 Markdown/txt 参考文档。

## 安装

桌面端「设置 → 插件 → 插件终端」执行（包发布到 npm 后）：

```bash
pnpm add dsh-jlu-baixiaosheng
```

未发布前可从 GitHub 装：

```bash
pnpm add github:WilliamWang6586/dsh-jlu-baixiaosheng
```

或在 profile 目录手工放置本目录后，在 `cordis.patch.yml` 追加：

```yaml
- insert:
    - id: dsh-jlu-baixiaosheng
      name: dsh-jlu-baixiaosheng
```

重启会话后技能目录出现 `jlu-baixiaosheng` 即生效。

## 内容

- `SKILL.md`：使用指南 + 全部 38 篇资料的索引与摘要
- `references/`：38 篇原始资料（政策原文整理、实测记录、题库/背诵卡片等）

数据截至 2026-11，以吉林大学官方最新通知为准；二手题库存在 OCR 错字，包内已逐条标注。

## 版本

与知识库主线版本一致（当前 1.7.4）。

MIT License.
