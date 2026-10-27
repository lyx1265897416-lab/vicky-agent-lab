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
