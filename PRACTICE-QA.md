# 实操案例 v1.16 验证记录

日期：2026-10-27。本记录不代表实际学员效果或销量。

## 已检查
- 6 组原创输入、8 节完整文字实操、两套 Skill 通过结构验证。
- 20 道面试主问题带触发追问条件。
- 3 篇 Task 2 练习正文均不少于 250 词；预置反馈引用存在于原文。
- JSON 校验拒绝缺失字段、错误类型、空反馈和不在 source 内的引用。
- 浏览器实际导入面试与雅思样例 JSON，通过格式与引文匹配检查；不等于判断准确率。
- 切换案例保留各自本次页面草稿；刷新不持久保存，已在界面提示。
- 390 px 手机与 1365 px 桌面检查，未发现横向溢出；原文批注、下一轮、修改对照、课程切换可用。
- 完整 ZIP 实际下载成功，37 个条目，ZIP CRC 检查通过，包含隐藏 .agents 目录。
- 原 8 节基础课与 121 份既有材料的内容一致性检查通过。
- 视频是实际 Chrome 页面截图组成的分步回放，不是连续录屏、AI 生成图或 Codex 模型执行录像；页面明确说明。

## 未验证
- 尚未做雅思教师复核、5 位真实求职者试用、真实付款或考试 / 招聘效果验证。
- 本轮没有把 Skills 交给独立模型进行完整多轮运行；结构检查和样例报告不能代替模型行为测试。
- 离线查看器、相对资源与 ZIP 已打包；浏览器安全策略禁止 file:// 导航，未实测双击离线页面。未绕过该限制。
- Windows 未实机验证；现有安装课的未实测提示保留。
- GitHub Pages 从当前网络的观测不代表中国大陆所有地区的可用性与速度。

## 效果检查要点
先看一条真实原话如何产生可执行反馈；再换题独立完成。AI 反馈的原文引用、上下文解释和修改建议分别复核。不要把预置样例、下载量或体验次数当成学员成果或付费转化。

线上验收：GitHub Pages 6f4e6d9 部署成功，公开案例页可打开；面试追问、雅思切换、正文批注可见。当前网络下最终新查询参数复测约 2.3 秒 DOM ready，CLS 0.0006，无长任务；详见 PERFORMANCE.md。视频已观察到 currentTime > 13 秒、readyState 4、无解码错误，切换后 src 清空。

## v1.17 · Guided visual entry · 2026-10-27
- First screen now contains a three-step interactive preview: IELTS annotation → before/after → fixed grammar exercise; interview question → answer selection with feedback → evidence cards.
- Both choices, empty/wrong/correct grammar answers, case switching and the handoff into lesson 1 were exercised in the browser. No model call is implied by preset or fixed-rule results.
- Original complete samples, lesson scripts and downloads retained. Long scripts are expandable; concrete actions remain visible.
- Desktop 1365 px and mobile 390 px inspected: no horizontal overflow or overlapping content, readable interaction controls. Homepage cards use actual new interface captures, with full-frame containment.
- Existing videos are explicitly marked as the previous full-sample interface; they are not recordings of the new guided first screen.
- Local diagnostic reload: DOM ready 41 ms, load 44 ms, LCP 88 ms, CLS 0, no long tasks or remote media. Local timing is not internet latency; public verification follows deployment.
