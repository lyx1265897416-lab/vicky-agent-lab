# 01 / 准备项目，让追问有依据

这一课先把“做过什么”变成可检查的材料。面试官无法仅凭你说用了哪些模型判断能力。岗位要求、个人职责和具体决策，是陪练的输入。示例都是虚构的，不属于真实品牌、雇主或候选人。

下载本页学习包并解压，打开其中的 practice-workspace 作为 Codex 本地任务工作目录。Mac 可以在 Finder 中查看；Windows 可以在文件资源管理器中查看。这里已有项目级 Skills，不需要把文件复制进系统目录。首次使用工具先完成课程的安装与账户检查。

samples/interview-film.md 保存岗位和项目事实。先使用它走通流程，再复制 resources/project-facts.md 填写你自己的项目。没有数据就写未测，不要把计划写成已经完成。

## 跟做
1. 下载并解压完整实战包，确认没有多套同名文件夹。打开 practice-workspace。
2. 在 Codex 对话框发送下面的目录检查指令，核对返回路径和文件。
3. 让 Codex 读取 samples/interview-film.md，按“岗位要求／已有事实／缺失证据”列三栏，暂不开始面试。

## 发给 Codex
```text
请先列出当前工作目录，确认有 AGENTS.md、samples、resources 和 .agents/skills。只读取这些课程文件。告诉我找到的两个 Skill 名称；不要搜索其他目录，不修改全局配置。
```

## 应该看到
看到正确工作目录、两个 Skill 名称和项目事实表。网页只用于看课，指令发给 Codex。

## 排错
看不到 .agents 是隐藏目录的常见现象。让 Codex 按完整路径读取 .agents/skills/aigc-interview-coach/SKILL.md；不要反复下载。路径不符时先重新选择工作目录。
