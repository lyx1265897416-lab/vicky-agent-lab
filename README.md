# Vicky Agent Lab

面向零基础学习者的 Personal Agent 八课文字实操网站，包含讲稿、逐步操作、真实截图与官方实录、配套 Skills 与虚构练习材料。

- 在线课程：https://lyx1265897416-lab.github.io/vicky-agent-lab/
- 第 1 课：https://lyx1265897416-lab.github.io/vicky-agent-lab/learn.html?lesson=1
- 资料库：https://lyx1265897416-lab.github.io/vicky-agent-lab/materials.html

## 本地预览

无需构建或安装依赖。在仓库目录运行：

```sh
python3 -m http.server 8080
```

访问 http://localhost:8080/ 。

## 发布与维护

GitHub Pages 从 `main` 分支的仓库根目录发布。提交并推送更新后，Pages 会重新部署；发布状态见仓库 Actions / Settings → Pages。

这是当前课程 v1.11 的独立静态快照，原站更新不会自动同步到此仓库。编辑内容时同时维护 `course-content.js` 与 `downloads/` 对应学习包；不要只改显示文字而留下旧下载文件。

分享课节链接时使用 `learn.html?lesson=6#step-6-2` 等完整文件名形式。页面不需要服务器、数据库或 API Key；进度和笔记只保存在学员自己的浏览器。

## 内容与验证范围

关键步骤配有 2026-10-26 本机 Finder 原始截图、真实 Codex CLI 产出，以及带来源的 OpenAI 官方外链视频。Mac 桌面应用内部逐按钮验证仍未完成，Windows 未实测。官方视频有版本差异说明，不是本课程原创录播。网站没有支付或付费账户系统。

课程文字、示例和配套文件沿用学习包内 `LICENSE.txt` 的使用说明；公开可阅读不代表授权整套课程转售。第三方品牌与文档归各自权利人所有。

截图原文件在 `media/`，真实运行产出在 `media/evidence/`。官方视频通过来源 URL 播放，版权归 OpenAI；不包含在课程可转售授权中。


## 成果体验（v1.11）

`examples.html` 提供三个可交互案例：会议行动看板、研究简报、个人工作区。前两项使用 `media/evidence/` 中的历史真实 CLI 输出（输入是虚构 case-a）；第三项展示课程模板。界面为本课原创查看器，不是 Codex 截图，不会运行模型。

看板支持本课 `meeting-actions` / `research-brief` JSON 导入（1 MB 上限）、筛选、引用查阅、导出和恢复样例。导入仅在页面内存中存在；自己导入的引用未在此页与原文核验。完整课程与第 8 课下载包包含 `bonus-result-viewer/`，单独下载为 `downloads/personal-agent-result-viewer.zip`。无需服务器或第三方 JS 库，包含本地使用说明。

首页开源延伸区链接 LangChain Local Deep Researcher（MIT，原作者视频与截图）、OpenAI plugins（按具体插件许可）、Microsoft MarkItDown（MIT）。不复制第三方实现，不代表课程已经部署或教授这些项目；外部媒体与服务可能变化。

### 本次检查

- 八节课各有 1 个成果入口，截图加载成功，原有 41 步实操保留，桌面无横向溢出。
- 390 px 预览下检查首页、成果看板、第 6 课的真实浏览器排版。
- 浏览器实际检查：任务筛选、预算证据高亮、导入简报、未载入原文提示、无效 JSON / 错误结构 / 超过 1 MB 的提示、工作区文件切换、键盘方向键、JSON 导出。
- 开源视频成功加载并播放（时长约 119 秒）。188 个本地页面资源/链接检查通过，所有 ZIP 的 CRC 检查通过，完整学习包中的看板与单独下载包一致。
- 本次未重新运行 Codex 生成流程；沿用已有真实产出。当前浏览器禁止打开 file://，离线包完成结构与依赖检查，未把它记为本机浏览器离线运行实测。Windows 保持未实测。


## 视觉案例展厅（v1.12）

首页改为作品与视频优先，`explore.html` 收录 13 个真实项目，覆盖网站、游戏、视频、设计工具、空间 3D、数据、教育与语音 8 个方向。6 段视频支持页内播放，其余案例提供真实效果图与原项目体验入口。资料页与课程导航增加展厅入口；原课堂成果看板保留。

来源包括 OpenAI 官方 Showcase、Remotion 作者画廊、Manim 官方示例。Remotion 三个案例按原作者明确标注 Claude Code 或 OpenCode，不冒充 Codex 生成；框架仓库链接不冒充案例完整源码。媒体使用官方外链，不打包进入课程授权。每个案例附原创的小版本练习方向，现有 8 课仍是工作区、上下文、规则、Skills 与验收基础课，不宣称覆盖展厅项目的完整复现教学。

### v1.12 验证

- 本机浏览器实际播放：Velocity Loop、Stop-Motion Desk、Travel Route、Presscut、Bar + Line Chart、Manim，视频 readyState 为 4 且播放时间前进。HLS 视频使用按需加载的 hls.js 1.7.3；不可用时保留原作者观看入口。无自动播放，离开视野暂停。
- 12 张外链预览图成功加载，Manim 使用实际视频首帧。视频加载取决于外部服务与网络。
- 方向筛选、只看视频（6 个）、查询参数恢复、展开练习方向与复制按钮实测通过。
- 实际操作 Pattern Studio 添加 Daisy，图案数由 12 变为 13，并切换 Repeat 预览。不将其余外部项目记为全面功能验收；语音项目未启动麦克风会话。
- 检查桌面与 390 px 手机宽度排版。未更改现有课程文件、Skills 与下载包；Windows 操作依然未实测。

## 按用户任务重新筛选（v1.13）

新增 `research.html`，记录 CNNIC 第 57 次报告图 43（调查期 2025.12）、Coursera 2025/2026 学习趋势和 OpenAI 消费者使用研究。明确区分使用目的、学习趋势与付费意愿；没有进行付费学员访谈，不把平台学习量当成销量。

用 Presenton、OpenPost、OpenResume、AI Study Kit、Webroom、WanderNote 替换 6 个与日常任务联系较弱或前置能力更多的案例。13 项按汇报/数据、宣传内容、求职展示、学习教学、生活安排与创意加餐分类。赛车退出首页推荐，保留为加餐。现有 8 节基础课程和下载包未改动。

### v1.13 验证与范围

- 浏览器实际操作：Presenton 模板切页；OpenPost 加载教程轮播模板并改字；OpenResume 使用虚构经历填写并同步预览；AI Study Kit 完成 Git 选择题并查看正确解析；WanderNote 切换到第二天行程。
- `gallery/captures/` 中三张图是本次实际浏览器截图：宣传编辑器、虚构简历、答题结果。其余预览保留原作者外链。没有输入私人资料，没有登录新账号、购买服务或执行候选项目安装脚本。
- Presenton 只验证模板预览，未执行完整模型生成；Webroom 只检查到文件打开入口，未验证 Agent 编辑链路。开源产品参考不等于 Codex 制作证明。
- 本次实际播放 Presenton 视频，readyState=4、时间前进。OpenResume GIF 成功显示并验证停止/筛选恢复截图。OpenPost GIF 在浏览器加载不稳定，因此不在站内提供播放按钮，保留真实静态截图和可直接操作的编辑器。最终为 5 段视频 + 1 个操作动图，其余 4 段视频沿用 v1.12 播放验证。
- 六类筛选数量 3/4/2/2/1/1，总计 13，视频/动图集合为 6；展开、复制起步练习、过滤时停止动图通过。检查桌面、390px 手机宽度的首页、展厅与调研页面。
- 修改页面的 98 个本地链接/资源存在性检查通过；修改后的 JavaScript 语法、git diff 空白检查通过。
- 外部案例及媒体依赖原项目与网络，入口条件在每项标明。这里是视觉参考和小版本练习方向，不是这 13 个项目的完整课程复现交付；Windows 仍未实测。

## Loading and playback optimization（v1.14）

首页不再下载整套教材；课程与资料按需读取。13 张案例预览改为同站压缩 WebP；5 段真实演示改为点击加载的轻量无声片段，完整效果保留原作者链接。PPT 案例展示实际模板，替代不稳定的视频外链。媒体派生版本的来源分别见 `gallery/posters/sources.json` 与 `gallery/clips/sources.json`，不属于课程可转售授权。

`course-content.js` 仍是课程/资料的规范来源。编辑后运行 `node tools/split-course.cjs`，再运行 `node tools/check-performance.cjs`。不要手改生成的 `course-data/` 文件。下载包的正文与内容没有更改。

具体优化、实测数据与限制见 [PERFORMANCE.md](PERFORMANCE.md)。用户要求每次网页交付都检查性能，已记录在 [AGENTS.md](AGENTS.md)。本版保留了真实图像、视频与体验入口；优化没有替换成示意图。
