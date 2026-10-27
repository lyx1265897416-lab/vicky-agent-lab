# 从这里开始
1. 解压 ZIP 后把 practice-workspace 文件夹作为 Codex 的本地工作目录，不是 downloads 上级。
2. 不熟悉下载安装到目录选择时，先看 https://lyx1265897416-lab.github.io/vicky-agent-lab/setup.html 。需有当地合法可用的工具账户与额度；课程包不包含账户或模型费用。
3. 两个项目级 Skill 已放在 .agents/skills；不要修改系统文件。先让 Codex 报告目录并读取对应 SKILL.md，确认名字与内容。自动发现失败时可按文件路径显式读取，这是兼容执行方式；重启后再检查自动发现。
4. 阅读 lessons/interview-01.md 或 lessons/ielts-01.md，按顺序发指令。全程先用 samples 中的虚构资料。
5. 本地双击 report-viewer.html 可打开离线报告查看器。点“我的练习”导入 outputs 的 JSON；网页验收同样可用 https://lyx1265897416-lab.github.io/vicky-agent-lab/practice.html 。导入在浏览器本地完成。
6. 所有原稿保留，输出用递增编号。退出前导出自己的草稿；网页不自动永久保存输入。

首次诊断的模型输出每次可能不同。样例报告是人工教学对照，不是你运行的实测结果。
雅思包待教师复核，不估分。面试包待目标用户试用，不代表任何雇主的招聘标准。暂无在线收款或托管 AI 服务。

## 出错怎么做
找不到文件：核对选中的工作区，直接读取完整相对路径。
无法运行模型：先检查所用工具的账户、额度与可用范围。不要为了本包购买共享账号。
导入失败：让 Codex 按 resources/report-format.md 修复 JSON；引文不匹配时回到原稿，不要伪造原稿过关。
格式校验通过但反馈不对：保留具体反例，更正 Skill 的判断规则，再用未参与修改的样例复测。

## 来源
Codex 本地 Skill 发现与调用：https://learn.chatgpt.com/docs/build-skills
IELTS 官方写作维度：https://ielts.org/take-a-test/preparation-resources/writing-test-resources
