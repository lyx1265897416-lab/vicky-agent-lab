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
- Pages run 40465902666 succeeded. The public version's annotation, correct-answer check and mobile interview choice were verified; public load was ~3.0 s on the current connection, no long tasks or console errors. Actual published screenshot saved as `../practice-visual-v117.jpg`.

## v1.18 · DeepSeek integration preparation · 2026-10-27
- Backend added: actual DeepSeek chat-completions adapter, JSON/quote validation, four-turn in-memory interview sessions, successful-response idempotency, safe errors, input bounds, global persisted daily call cap and loopback-only key setup.
- Browser workflow tested against an explicitly labelled local fixture, not a real model: essay submit → quote/revision → four interview replies → summary. Six backend tests pass; fixture exists outside the public repo and is not deployed.
- Unconfigured real server correctly returns ready=false; UI disables submission and never substitutes canned feedback. No key has been supplied and **no real DeepSeek generation has been tested**.
- Public GitHub Pages has no backend configured. Its real-input tab states that the service is not open. Existing preset walkthrough and course downloads remain available.
- Prominent Chinese case titles now appear in the cover image area and actual preview capture. Test outputs are not used as marketing screenshots.
- Local HTTP checks: private env/source paths 404; unapproved Origin 403; absent data-transfer consent 400. No actual secret was entered during QA.
- Deployment requires a HTTPS Node backend with persistent usage storage and one instance; operational instructions in server/README.md. No account, payment or hosting purchase was made.
- Pages deployment 40471096760 succeeded. Public real-input tab accurately reports no deployed backend, with submit disabled; no model output is implied. Desktop and 390 px input layouts checked without horizontal overflow. Public shell loaded in 1.74 s on the current connection.

## Cloudflare 免费档接入准备 · 2026-10-27
- server/core.test.mjs + cloud/worker.test.mjs：10 项通过（模拟上游）；新增并发全站限额、跨实例会话恢复、成功重试去重、过期清理、非法来源/超长输入校验。
- Wrangler 4.153.0 dry-run 成功，压缩 Worker 6.35 KiB；本机 workerd 启动成功，未配置密钥 health.ready=false。
- 尚未使用真实 DeepSeek 密钥，未完成云端发布。不要将模拟验证等同模型效果。

## DeepSeek 已接通 · 2026-10-27
- 用户本人在 Cloudflare Secret 配置密钥；本地与公开仓库均未读取/保存密钥值。
- Worker: https://vicky-agent-lab-api.vicky-agent-lab-api.workers.dev；部署版本 dcccddc7-4904-4ee9-96c6-ffbaaaa51c9a。全站上限 30 次模型请求/UTC 日。
- 用原创虚构材料实际调用：IELTS 返回真实批注且逐字引用匹配；面试开始→4 轮回答→报告→清理全部 HTTP 200。两次 API 流程验证后又从公开网页完成作文和完整面试。
- API 第二轮测量：作文 5.3 s、面试首题 2.7 s、追问 1.8–2.1 s、最终复盘 8.3 s；仅本次样本，不代表全部用户。
- 首轮发现模型对正确搭配过度修改、追问重复；已加入保守批改、短问题、分轮目标、不得因未来计划尚未实施而挑错等要求。真实输出仍需人工判断，未做雅思教师认证。
- 浏览器：从公开 GitHub Pages 输入原创作文，勾选同意后收到真实报告；点击原文跳到批注；完整 4 轮面试生成复盘。结果来自实时 API，没有预设替代。
- 手机 390 px / 350 px 无横向溢出；桌面面试报告为双栏，无文字重叠；控制台无错误。
- 连接检查进行中时文案改为“正在连接体验服务”，避免误报尚未开放。
- 实测结果仅存在工作目录与本次浏览器中；未把用户资料作为公开课程样例。

## v1.19.1 · streaming and startup verification (2026-10-27)
- Thirteen automated tests cover existing budgets/session durability plus UTF-8/SSE chunk boundaries, streamed progress, truncated provider response rejection, external interview session forwarding, and persistence before final result.
- Real DeepSeek: IELTS report, all four interview rounds, final report (one validation failure then explicit retry), session clear. Validation failure is surfaced rather than substituted with sample feedback.
- Public UI: actual own-input IELTS output and actual interview first question. Mobile and desktop layouts inspected, no overflow/errors. Local fault fixture checks reconnect, cancellation and error with draft retention; fixture is outside the published repository and has no key.
- Lazy course loading verified through “跟着搭建”; complete lesson remains readable. Initial real-AI tab doesn't load content.js or video. Loading course controls are inert until ready, with a retryable message on failure.
- Cancel means stop waiting; it cannot guarantee upstream cancellation or refund. No automatic paid retries were added. Current-page draft retention does not promise refresh persistence.

## v1.20 · actual answer previews
- Real public IELTS input → partial summary visible → validated report, 7.3s. Real public interview input → final first question, 3.0s. Controlled slow local stream additionally verifies readable partial question and report fields without relying on screenshot timing.
- Incremental public-answer fields are provisional, not final truth. Final exact-quote/schema checks are unchanged. Failed or stopped previews are removed; no draft download or early answer submission is exposed.
- Browser checks: desktop and 390px mobile, guidance remains, safe literal rendering of HTML-like model text, cancellation/error recovery, no overflow or console error.
- Automated checks: 16 pass. Parser is tested at every character prefix, with Chinese, quotes, newline escapes and emoji; unknown/internal fields excluded. Generated files and offline package rebuilt.

## 2026-10-27 · v1.21 从首次进入到完成练习

### 实际发现与修正
- 额度耗尽但入口仍显示可提交：健康检查读取每日共享余额，不消耗额度；作文不足 1 次、完整新面试不足 5 次时提前提示。已有会话仍保留回答/下载入口。余额为瞬时状态，不承诺预留。
- 聊天框重绘可能停在旧题：突出当前问题与考察点，历史问答默认折叠，四题进度可见；完整新题后自动定位。
- 第四题仍提示继续追问：按钮改为“提交最后一题，生成复盘”，等待区区分问题生成和最终报告。生成时输入只读，避免生成途中修改后被覆盖。
- 报告过长且缺少下一步：原文可展开、批注可定位、练习框与完整 Markdown 导出；重开前可保留/确认，防止误清空。刷新/离开有未保存内容提示。
- 模型没有列出修改点时仍提示点批注：单独处理空 issues，显示优点和迁移练习，不鼓励重复付费请求。
- 本轮真实作文出现格式或原文引用校验拒绝：保留输入、撤回预览，未把失败报告当成功。增加独立批注处理：仅部分引用不匹配时隐藏这些批注并显示说明；所有引用不匹配或格式错误仍拒绝。不会修改原句去迁就模型，不自动重试。

### 实测证据与边界
- 公开 DeepSeek 面试：首问→回答→第 2/3/4 题→最后回答→复盘全部成功；问题依次涉及角色参考、检查表、验收边界、下次改进，最终反馈正确把计划与已验证事实区分。4 轮历史可展开，练习与完整报告导出已检查文件内容。
- 公开作文：270 词原创稿（含两处故意语法错误），1 次真实请求被校验拦截，输入保留。这次未记录原始模型输出，不能断言具体哪个字段导致失败。新增处理已用本地同一 core/stream 路径验证，但不能把模拟成功当成真实作文复测成功。
- 本地免费模拟：完整 4 轮、最后一题、报告与练习、重开确认、无批注分支、部分错误引用过滤与告知、报告下载均通过。模拟材料明确标为测试。
- 自动检查 18 项通过（包括持久会话/幂等重试/总额限制/引用校验/流式预览），原课程与素材一致性检查通过，语法及 diff 检查通过。
- 本轮已获准的 6 次调用均已使用（面试 5 次，作文 1 次）；测试结束先恢复每日 30 次上限。随后用户批准额外最多 2 次，补充复测结果见下节。
- 截图：工作区 outputs/interview-round4-v121.png 为公开网站真实第 4 题。


### 补充真实作文复测：通过
- 用户批准最多额外 2 次；实际只调用 1 次，无自动重试。同一篇 270 词原创作文约 4.7 秒返回完整报告。
- 两条批注均逐字对应原文：students has → students have；would makes → would make。未出现隐藏无效引用的提示，保留原文校验。
- 从批注按钮和原文高亮均可定位到第 2 条；完成自己改写，下载的 Markdown 包含原文、两条批注与学习者改写。切换案例再返回，报告和改写仍在。
- 桌面与 390×844 手机检查通过：无水平溢出，控制台无 error/warn。真实截图保存在工作区 outputs/ielts-retest-success-v121.png。
- 临时上限 38 已恢复为每日 30，Worker 版本 179ced9d-a668-4cfa-9c45-541508d7402e；复核 health 剩余额度 0。今天总共使用 37 次，未使用最后一次额外授权。
- 单篇成功不保证所有模型输出可靠；前次失败记录保留。性能与材料检查、语法检查和 git diff 检查通过。
