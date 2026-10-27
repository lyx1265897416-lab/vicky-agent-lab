# 03 / 把反馈变成能查看的报告

报告的价值来自“结论对应哪句话”。它应保留你的原话、说明缺少什么，以及下一次可以做什么。已有证据不等于招聘结果；未展示也不等于你没有能力。

本包使用统一 report.json 格式。Skill 内的 references/report-format.md 定义必填字段。Codex 写入 outputs 后，你可以在本网页“我的练习”中导入。导入由浏览器本地读取，网页不上传文件；但你发送给 Codex 的材料会按所用工具的处理方式运行。

先用包内 sample-report-interview.json 检查网页，再导入自己的报告。浏览器校验格式和引用是否包含在 source 原文中，不会证明评价本身正确。

## 跟做
1. 完成对话后发下面指令，要求输出 Markdown 和 JSON 两种报告。
2. 在文件管理器中打开 outputs，找到报告 JSON。
3. 打开网页的“我的练习”，选择 JSON 文件；逐条核对批注引用，必要时下载或打印报告。

## 发给 Codex
```text
请按当前 Skill 的 references/report-format.md 保存本轮报告到 outputs/interview-01.json，另存可读的 outputs/interview-01.md。source 只包含本轮实际材料和对话；evidence 的 quote 必须逐字摘自 source。不要覆盖已有文件，已有同名时改用新序号。
```

## 应该看到
导入后看到报告标题、原文、逐条证据与下一次练习。自己的报告与预置样例分开显示。

## 排错
导入失败先看错误提示。若是引用找不到，让 Codex 对照原文修正 quote；若是格式问题，让它按 resources/report-format.md 修复。不要为了过校验把虚构引文加入原稿。
