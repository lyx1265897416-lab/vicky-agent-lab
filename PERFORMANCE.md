# Performance checks — v1.14 (2026-10-26)

## What changed

- Home uses a 303-byte progress script instead of loading the 1,110,437-byte course/source bundle and lesson renderer. The hero and its genuine thumbnail are present in HTML; home/gallery critical CSS is inline, and gallery cards are prerendered to avoid waiting for JavaScript and extra CSS/image round trips.
- Home shell (HTML + declared local JS/CSS, conservative raw-file budget): 124,183 bytes (includes inline critical CSS and the genuine hero thumbnail). Thirteen local WebP gallery posters total 385,944 bytes; every poster is below 100 KB. Original source URLs are retained in `gallery/posters/sources.json`.
- Lessons load only the catalog and selected lesson. The materials page loads the catalog plus the selected asset; full-text search is fetched only when used. All 120 original asset bodies are byte-for-byte checked against the canonical source. All eight lessons are compared after display-only image URL substitutions.
- Course screenshots have lighter display copies in `media/previews/`; original-resolution PNG links/downloads are preserved. The shared official course-video poster is hosted locally.
- Five genuine video previews are compressed MP4s, 19 KB–1.94 MB, requested only after clicking. These are silent excerpts, not full original videos. Full author/source links remain. Presenton's unreliable signed video URL is replaced by its actual template preview/experience link. `gallery/clips/sources.json` records media provenance.
- Gallery releases the video element, decoder, source request and any HLS instance when offscreen, filtered out or hidden. Only one player is active. Load failure has a 15-second bound, retry and source link. GIF preview is replaced by a compressed MP4. Expensive backdrop blur is removed.
- Notes autosave is debounced and flushed on page exit. Opt-in `?perf=1` diagnostics run for 10 seconds only and send no telemetry.

## Local browser observations

Same machine, 1280px desktop viewport, local HTTP. These are individual observed runs, not a controlled benchmark or a promise for other networks. The baseline already used the optimized gallery posters, making the resource comparison conservative. Browser cache and connection state may affect timings.

| Observation | Before page-data cleanup | After cleanup |
| --- | ---: | ---: |
| Resource encoded bodies, excluding document | 1,419,626 B | 246,858 B |
| DOMContentLoaded | 8,640 ms | 535 ms |
| LCP | 10,732 ms | 772 ms |
| CLS | 0.1365 | 0 |
| Long tasks in observation window | 3 / 948 ms | 0 |
| Third-party requests before interaction | 0 (posters already optimized) | 0 |

Further media/display optimizations happened after this sample. Public-deployment observations are recorded below separately, rather than substituting local speed for real hosting speed.

## Functional and regression checks

- All five local clips decoded successfully and were played in the actual browser (readyState 4, playback time advanced). Filtering and scrolling away left zero video elements; reopening playback worked. Only one player remained during transitions.
- All eight lessons opened; step counts remained 4/5/5/5/5/5/6/6 (41 steps).
- Materials: requested novice guide, full-text search for `负责人`, selected meeting Skill, copy, and rapid resource navigation. Concept search for `Skill` returned one result. Local test note persisted after reload and was cleared afterward.
- Desktop and 390px-width rendered views inspected for home, gallery and lesson 6. No overlapping text or visible horizontal overflow; preview images remain real and readable.
- Changed JavaScript passed syntax checks; 214 local HTML references checked (the existing absolute `/vicky-agent-lab/` root link in 404.html resolves to the public site). No observed browser console errors in the regression session.
- `node tools/check-performance.cjs` passes: eight lessons, 120 original asset bodies, home shell and poster budgets.

## Repeat before every delivery

Follow `AGENTS.md`. Generate lazy payloads after source edits; run the checks; inspect desktop/mobile and critical interactions; verify the published version. Don't infer mainland-China or mobile-network performance from this machine. GitHub Pages and external experience links remain network-dependent.

## First public check and additional fix

The initial v1.14 public check had LCP 5,956 ms, DOM ready 6,406 ms, CLS 0, no long tasks, no external requests, and 199,394 bytes of resource bodies. Several GitHub Pages requests took 1.8–3.2 seconds; local metrics alone were not sufficient. A second pass therefore inlined critical home/gallery CSS, embedded the 31,912-byte real hero thumbnail, prerendered gallery cards, preloaded lesson rendering scripts, and inlined the small home/gallery startup scripts so initial controls need no additional script round trips. The final online result is checked after this follow-up deployment.

## Final public verification

Public code commit `160306a`, GitHub Pages run `40318644272` succeeded. Actual desktop-browser observation on `index.html?v=1.14&rev=160306a&perf=1`: LCP 3,708 ms, CLS 0.018, no long tasks, no third-party requests, all seven visible/nearby images loaded. DOM ready was 8,414 ms; first visibility improved, but this network/host still had document-loading delay. The final 7 subresource entries total 145,479 encoded bytes, **excluding** the HTML document (critical CSS, hero and startup JS are now inline); do not compare that number directly with the older subresource-only total as if it were total transfer size.

The public OpenResume clip reached readyState 4 and the end at 15.6 s. Scrolling away left zero players. No browser console errors were observed. These are individual runs with differing cache/connection state; no guarantee of worldwide or mainland-China latency is made. Subsequent deliveries must repeat the public check rather than relying on these results.

## Registration onboarding v1.15 — 2026-10-26

- Added shared account eligibility/registration guide before OS installation and a 02A entry immediately before both login steps. Long detail uses native disclosure panels, opened by deep links. No new dependency/framework.
- Local setup.html?perf=1#registration observation: LCP 176 ms, CLS 0, 1 long task (64 ms), DOM ready 98 ms, load 143 ms; 9 subresource requests, 138,311 encoded bytes excluding the HTML document, 0 external requests. This is a local-machine result, not public or China-network latency. Lazy collapsed/offscreen images correctly remain unloaded.
- Real phone verification reference is 14,554 bytes, intrinsic 904×504, local WebP with lazy loading. Desktop right-side image and single-column mobile layout checked. 390 px test iframe yields 375 px content after scrollbar; no horizontal overflow at entry and expanded phone section.
- Registration route expansion, Windows panel switch, return to phone branch, new material selection, no new console errors verified. Original 8 lessons and 121 asset bodies match generated payloads. ZIP checks passed including all registration-guide copies. Local links and fragment IDs resolve.
- No new-account creation, phone verification, mainland-network or Windows native app test is claimed.

Public verification after Pages run 40441264176 succeeded (commit 6e110bd): setup.html?v=1.15&perf=1#registration reported LCP 1,644 ms, CLS 0, 0 long tasks, DOM ready 1,631 ms, load 1,762 ms; 9 subresource requests, 104,138 encoded bytes excluding HTML, 0 external resources. No console errors. Mainland detail auto-expanded and the Windows login deep link selected the correct platform. These observations apply only to this browser/network run, not mainland-China availability or universal speed.

## 2026-10-27 · v1.16 实操案例

- 新页面 shell（HTML + CSS + 3 JS）64,777 bytes，无第三方字体或脚本；首次不设置视频源。
- 首页 shell 126,653 bytes，既有 121 份材料和 8 课载荷一致性检查 PASS。
- 两段 H.264 分步视频各约 2.16 MB，preload=none，展开后才设置源；切换栏目、隐藏页面释放媒体，离开播放区域停止并释放。
- 390 px 与 1365 px 布局检查：document.scrollWidth 等于 viewport width，无横向溢出。
- 本机 localhost explore 实测：LCP 1356 ms、CLS 0、长任务 0、DOM ready 198 ms、load 250 ms；外部资源请求 0。图片按需加载，未加载的下方 lazy 图片不是破图。
- 两种 JSON 报告实际导入成功；样例切换、四轮追问、修改对照、课程切换和下载检查通过。浏览器未发现新增错误。
- 离线 file:// 交互实测受到浏览器安全策略限制，未绕过；ZIP 和相对资源只做静态完整性检查。
- 线上发布后的观测见后续记录；本机数据不能代表中国大陆或其他网络。

### 首轮线上反馈与修正
首次线上冷加载观测到 LCP 9836 ms、DOM ready 13291 ms、CLS 0.1356，未出现长任务。多个小资源在当前网络分别等待 3.4—7 秒，造成额外串行初始化延迟。
已把新案例页 CSS、课程数据、校验器与交互脚本内联到单个约 64.6 KB 的 HTML（gzip 后更小）；视频仍按需请求。`tools/practice-page.html` 为页面模板，`tools/build-practice.cjs` 生成线上页与离线版。本地交互与无溢出复验通过。

### 内联后线上复测
相同设备和网络下，带新版本查询参数的线上观测：LCP 1120 ms、DOM ready 1273 ms、load 1279 ms、长任务 0；只有一个 opt-in 性能诊断脚本请求，无外域与视频请求。发现 CLS 0.1356，追加为动态标题、说明与案例主体预留高度，避免流式 HTML 在脚本执行前后跳动。该观测仅代表本次网络；不是全球或国内速度保证。

### 最终线上布局复测
部署 6f4e6d9 成功后，在 1365×950 视口读取公开页面（新查询参数）：LCP 2272 ms、DOM ready 2312 ms、load 2319 ms、CLS 0.0006、长任务 0。只请求 1 个 opt-in 诊断脚本，无外域媒体请求；四轮追问按钮可用，控制台无新增错误。保留高度修复将布局偏移由 0.1356 降为 0.0006。最后仅调整了不同项目共用的反馈标题措辞，布局与加载方式不变。

## v1.17 · Guided previews · 2026-10-27
- Added CSS/DOM interactive first-screen previews; no framework, remote fonts, autoplay or extra startup requests.
- Public practice shell remains under 83 KB uncompressed, with original 8 foundational lessons and 121 asset bodies unchanged by checker.
- New homepage previews are small WebP crops from actual interface screenshots and retain lazy loading. Videos still load only when opened.
- Local browser at 1365 px: LCP 88 ms, DOM ready 41 ms, load 44 ms, CLS 0, long tasks 0, external requests none. Desktop and 390 px layouts checked; online timing will be verified after Pages deployment.
- Public Pages verification for commit f6b2ec0 (1365 × 950, current network): LCP 2920 ms, DOM ready 2956 ms, load 2963 ms, CLS 0.0239, long tasks 0. Only opt-in diagnostics requested; no external media on initial practice load. Not a mainland-China or global network measurement.
- Public IELTS fixed exercise returned the expected correction; interview choice feedback worked at 390 px with scroll width 390 px. No new browser warnings/errors.

## v1.18 · Input-ready interface · 2026-10-27
- Practice shell stays below 100 KB uncompressed; no SDK, framework, third-party font or eager media added. Hosted API remains unset until deployment and live verification.
- Frontend sends model requests only after explicit submit and transfer consent. Missing backend/credentials never triggers provider requests or displays fabricated AI output.
- Existing foundational lesson/asset checks remain passing. Public timings will be recorded after deployment.
- Public v1.18 (commit 5685f3c), current connection: LCP 1612 ms, DOM ready 1630 ms, load 1740 ms, CLS 0.0087, long tasks 0. No initial external media/model requests; opt-in diagnostics only. No console warnings/errors. This is not a mainland-China/global latency claim.

### 2026-10-27 Cloudflare 接入准备
- 仅增加云端数据处理说明，未增加前端依赖或首屏远程媒体。
- 127.0.0.1:8095/practice.html?case=ielts&perf=1：DOM ready 599 ms、load 603 ms、LCP 568 ms、CLS 0.0486、long tasks 0（本地当前网络，不代表公网或中国大陆）。
- 390 px / 1365 px：document scrollWidth 等于 viewport；手机表单与完整同意说明可读，无控制台错误。
- check-performance / check-practice 通过，原 8 节基础课和 121 个材料正文不变。
- Cloudflare 部署与真实模型延迟待账号授权、密钥配置后补测。
- 对应公开版本 233c01a，GitHub Pages run 40478535835 成功。公开实践页实测 LCP 3620 ms、DOM ready 4214 ms、load 4373 ms、CLS 0.0486、long tasks 0，无初始远程媒体/模型请求。本次公网较慢；独立 curl 为 HTTP 200、TTFB 10.795 s、总 13.898 s（98,693 B），显示网络等待存在明显波动。未声称全球或大陆速度已达标。

### 2026-10-27 真实 AI 上线复测
- 公开写作页：LCP 6148 ms、DOMContentLoaded 7402 ms、load 7444 ms、CLS 0.0486、long tasks 0。health 请求 6102 ms；当前网络波动显著。
- 公开面试页：LCP 2236 ms、DOMContentLoaded 4794 ms、load 4796 ms、CLS 0.0154、long tasks 0；health 2015 ms。
- 新增后台 health 请求不调用模型，提交前无媒体自动加载；静态实践页面 98,826 B，原 8 课与 121 资产正文保持一致。
- 两页均可真实提交，不存在渲染卡死；不能将 4.8–7.4 秒的本次加载时间说成全球或国内稳定。网页与 health 受外部网络影响，仍保留超时与明确错误提示。

## 2026-10-27 · v1.19 / v1.19.1 live waiting and startup

- Online practice HTML: 98,826 → 70,296 bytes (29% smaller before HTTP compression). The full 32,788-byte case/lesson dataset now loads only when opening a lesson, complete example, or own-practice tab. Online startup JS/CSS is minified; the downloadable workspace retains readable sources and all lessons. Build requires `npm ci --prefix cloud` for the pinned esbuild dependency.
- Cloudflare backend uses DeepSeek streaming. SSE lifecycle events arrive before the final result: received → model reading → actual generated character count → reference/format validation. No invented completion percentage or unvalidated report is displayed. JSON clients remain supported.
- Waiting UI appears synchronously, shows elapsed time, relevant reading/preparation guidance, and stop controls. Mobile scrolls to waiting feedback, then to the next interview question. Connection retry and request errors preserve current-page inputs; refreshing still clears drafts, as disclosed.
- Public browser measurements for v1.19 (same machine/network, individual observations, not a controlled benchmark):

| Page | LCP | DOM ready | HTML TTFB | HTML transfer | Health | Long tasks | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| IELTS desktop, 1365px | 2,944ms | 3,066ms | 2,766ms | 24,284B | 775ms | 0 | .0087 |
| Interview, checked at 390px | 748ms | 729ms | 544ms | 24,284B | 1,556ms | 0 | .0154 |

Previous observations: IELTS LCP 6,148ms / DOM 7,402ms; interview LCP 2,236ms / DOM 4,794ms. Network variability remains significant; most IELTS first-visit latency was upstream HTML TTFB. These observations do not establish mainland-China or global speed. Initial resource reports contained only opt-in diagnostics and health, no video, full lesson payload, or model request.

- Real cloud SSE test: essay accepted at 1,813ms, first generation progress 2,877ms, final 9,100ms. Interview start: 728 / 2,069 / 2,495ms; follow-ups: accepted 205–249ms, first generation 1,020–1,242ms, final 1,318–1,675ms. Final interview report first attempt failed exact-reference/format validation; no invalid report was shown. Explicit retry completed at 6,455ms (accepted 657ms, generation 1,529ms), then session cleared. No automatic paid retry.
- Public browser real calls: different IELTS test essay completed in 5.3s; interview first question in 2.8s. These are full completion times, not first-token latency. Generated text remains subject to model quality limits.
- Desktop/mobile screenshots inspected; 390px viewport equals document scrollWidth, no horizontal overflow. Console errors/warnings absent. Mobile reconnection, preserved input, stop and injected SSE error tested locally without paid model calls. Functional and stream tests: 13 pass; six cases/eight practice lessons retained; original eight foundation lessons /121 asset bodies unchanged.

Final public v1.19.1 recheck (warm network/cache): practice LCP 440ms, DOM 390ms, TTFB 261ms, transferred HTML 24,447B, health 218ms, CLS 0. One 89ms long task was observed in this run; there was no repeated freeze or console error. Fresh mobile interview first question completed in 2.2s; its bounding box was y337–507 within the 844px viewport after automatic scroll. Course lazy-load → next lesson → live interview retained the session. Homepage cross-check: LCP 1,060ms, TTFB 455ms, CLS .018, zero long tasks, zero external requests or initial video; all preview images loaded. These warm observations are not guaranteed first-visit times.

Release evidence: Worker `5a647587-c68e-47ca-8c41-6b7e5d567673`; GitHub Pages code release `1f378c2`, run `40483817621` succeeded. Public footer verified v1.19.1.

## 2026-10-27 · v1.20 incremental answer previews
- Backend extracts only public answer fields from incomplete JSON and sends small append patches. No reasoning fields, raw JSON syntax, artificial typing delay, or extra model call. Partial Chinese, escaped quotes/newlines and Unicode are decoded incrementally. Frontend updates existing text nodes; it does not rebuild the draft on each token.
- The waiting guide, elapsed time and cancellation controls remain. Drafts are labelled “生成中 · 尚未校验”; question answering and report download become available only with the final validated response. Cancellation, validation failure and stream interruption retract the draft and preserve current-page inputs.
- Practice shell 73,304B (previous 70,296B), actual transferred HTML 25,414B. No initial video or full lesson payload, no new third-party client dependency.
- Public desktop IELTS (1365×900): LCP 3,192ms, TTFB 2,810ms, HTML download 369ms, DOM ready 3,200ms, health 871ms, CLS .0087, zero long tasks. Actual draft summary was observed before final; final validated report completed at 7.3s. Browser waitFor hit its tool deadline while diagnostics already showed the visible partial summary; this is a test-driver timing limit, not a failed model request.
- Public interview (390×844): LCP 724ms, TTFB 588ms, HTML download 77ms, DOM ready 699ms, health 434ms, CLS .0154, zero long tasks. Real question completed at 3.0s; its brief streaming interval was not captured in a screenshot. Slow local fixture separately verified question text growth before final response, no stale essay fields, and retained guidance. No claim of precise first-token latency from these browser observations.
- Local browser fault tests: draft HTML-like text remained literal (zero injected image nodes), stopping retracted draft, error retracted draft, original input retained. Mobile scrollWidth=viewportWidth=390, no new console errors on public or local checks. Desktop final report screenshot inspected.
- Sixteen backend/parser tests passed, including every-prefix decoding, allowlisting, invalid-quote rejection after preview, chunked SSE and persistent session forwarding. All existing performance guards and original 8 lessons /121 asset bodies passed. Timing observations describe this network only.
- Code published as fd96328; GitHub Pages run40485226886 succeeded. Worker c85f0dea-d3b7-46a2-9d84-1aac7c58c596. Public footer v1.20 verified.

## 2026-10-27 · v1.21 新用户完整旅程

- 实际公开页面：四轮面试首问 2.0 秒，后续追问 4.2 / 1.8 / 1.4 秒，最后复盘 4.9 秒。使用原创虚构舞蹈招新项目，未发送用户个人资料。
- 公开面试页：TTFB 825 ms、HTML 下载 299 ms、DOM ready 1155 ms、load 1158 ms、HTML transfer 27593 B。诊断中的 LCP 8376 ms 包含跳到体验区后的动态内容，不能当作初始首屏速度。
- 公开作文页：TTFB 357 ms、HTML 下载 108 ms、DOM ready 524 ms、LCP 544 ms。load 3603 ms 受可选 perf-observer.js（3178 ms）影响；健康检查 4566 ms 是另一个较慢网络请求，填写表单不依赖它完成。此页实际观察视口 1280 px，不冒称手机加载数据。
- 两页均 0 个长任务，控制台无 error/warn；未新增首屏视频或大图片。新 practice shell 79988 B（未压缩），仍低于既有 80000 B 限额。原课程 8 节、121 个资源体保持一致。
- 390 × 844 检查了真实面试第 4 题和本地报告阅读/练习；无水平溢出。桌面检查了当前题、历史折叠、复盘与重开确认。并未做中国大陆或全网络延迟验证。
- 最终发布版重新冷打开（尚未操作表单）：LCP 472 ms、DOM ready 468 ms、load 470 ms、TTFB 341 ms、HTML transfer 27587 B、health 1032 ms、CLS 0.0087、0 长任务。独立核验了余额 0 时提交按钮禁用、表单仍可填写、可手动检查额度；390 px 无横向溢出。以上均为当前网络单次观察。


### v1.21 补充作文复测
- 本次新打开的公开页面：LCP 4780 ms、HTML TTFB 4581 ms、HTML 下载 684 ms、DOM ready 5294 ms、load 5420 ms、HTML transfer 27601 B、health 1283 ms、CLS 0.0087，0 长任务。
- 本次首开仍约 5.4 秒，主要等待 HTML 响应；与之前较快的观测有明显网络差异，不能宣称稳定秒开。无新增首屏视频或模型请求。
- 同一篇 270 词作文真实生成 4.7 秒；报告定位、改写、下载和切换保留均验证。手机视口与 scrollWidth 均 390 px，桌面/手机控制台无错误或警告。
- 本轮未改变网站代码，只补充真实验收证据；check-performance、check-practice、live.js 语法与 diff 检查通过。


## 2026-10-27 · v1.22 缓存、直达入口与首开边界

- 增加免费 Workers Static Assets 入口 https://vicky-agent-lab-api.vicky-agent-lab-api.workers.dev/ ，页面与 /api 同源，减少额外域名连接和 JSON POST 预检。原 GitHub 地址保留，并提供随案例切换的备用入口，不自动把访客重定向到未验证更快的线路。
- 首页与展厅 CSS/JS 压缩；首页 HTML 122607 B（之前 126046 B，旧检查值 127807 B 包含诊断脚本）。实践页 81247 B（含约 1 KB 导航缓存启动代码与备用链接），检查预算设为 83000 B。没有删教材、视频或可视化。
- 新 navigation-sw.js 只缓存 index/explore/practice 三个公开 HTML 页面。再次访问先显示缓存，后台更新供下次导航使用，不刷新正在填写的表单。指针/键盘焦点/触屏意图只预取对应公开页面；从不预取 AI、课程全集或视频，不缓存用户输入、API、报告和下载。此项改善回访和站内切换，不等于新用户首次访问提速。
- 可选诊断脚本在实践页 load 后加载，避免诊断本身拖慢 load 指标；只带 perf=1 时启用。页面正常链接不带诊断参数。

本机同一网络的单次观察（不是中国大陆实测，也不是控制变量统计）：

| 页面/阶段 | 首屏 LCP | HTML TTFB | DOM ready | load | health | 长任务 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 原 GitHub，优化前新导航 | 3612ms | 1339ms | 3596ms | 3604ms | 5518ms | 0 |
| Cloudflare 新域名首次访问 | 8852ms | 7314ms | 8837ms | 9624ms | 1266ms | 0 |
| 新版 Cloudflare，无本机页面缓存，但域名已访问 | 2000ms | 451ms | 1974ms | 2880ms | 1724ms | 0 |
| 同入口再次打开，命中本机页面缓存 | 140ms | 4ms | 49ms | 2512ms* | 2487ms | 0 |

* 此次诊断脚本另等 2492ms，HTML transfer 为 0，servedByServiceWorker=true。之后已将实践页诊断加载移到 load 之后。新域名首次 8.9 秒失败于速度目标的记录保留；不能仅选 2 秒观测来宣称首开稳定。接口仍需联网，页面可先填写但余额返回前不可提交。

- 390px 手机与桌面 UI 检查：无横向溢出、无 error/warn；案例切换、按需打开 4 节实战课首课成功。原 8 节基础课、121 个材料正文未变。19 个后端/流式/预算测试和 4 个导航缓存边界测试通过。
- 本轮未调用付费模型，也未提高每日 30 次上限。新同源接口不自动重试付费请求。
- 尝试 ITDOG 国内多线路测速；用户授权本次滑块验证，但验证未通过，没有获取国内节点数据。用户暂无域名，因此未开通自有域名、付费托管或中国大陆 CDN。
- 官方说明：https://developers.cloudflare.com/china-network/ ：大陆网络是 Enterprise 的另订服务，默认免费网络不能据此宣称大陆加速。静态缓存依据 https://developers.cloudflare.com/workers/static-assets/ 。
- 最终 Worker 版本 f12ef0c2-c6e8-4f29-9f45-6d412a5b1a30。公共课程按允许清单上传，server/cloud/env/Git 元数据不进入静态目录。

最终缓存更新验证：再次打开已取得新版 HTML（诊断脚本在 load 后加载），LCP 192ms、TTFB 34ms、DOM ready 101ms、load 102ms、HTML transfer 0、servedByServiceWorker=true、CLS 0、0 长任务。health 2252ms 独立联网，界面先显示。验证了后台更新在下一次打开生效，不会在填写中强制刷新。curl 确认 /server/core.mjs 为404、health仍剩余0；Python默认User-Agent请求被边缘策略返回403，该客户端结果未当作浏览器可用性证据。

GitHub 公开 v1.22 首次页面缓存前复测：LCP 2796ms、TTFB 2526ms、DOM ready 2823ms、load 2824ms、HTML transfer 28071B、health 4935ms、0 长任务、无控制台错误。此次首屏比同轮优化前3.6秒快，但样本不足以将波动归因为代码优化，更不代表中国大陆访问结果。备用链接初始化时保留当前案例，已修正并重新构建。
