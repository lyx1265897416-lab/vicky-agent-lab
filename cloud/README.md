# 免费档部署：Cloudflare Workers + DeepSeek

课程网页仍在 GitHub Pages；Cloudflare 只处理 AI 接口。Node 本地后端仍可独立使用。

## 你需要操作的两步

1. 打开 https://dash.cloudflare.com/ ，注册/登录自己的账号，选择 Workers 免费档。不要购买域名或升级套餐。
2. 我完成代码部署后，进入 **Workers & Pages → vicky-agent-lab-api → Settings → Variables and Secrets → Add**：
   - Type：**Secret**
   - Variable name：`DEEPSEEK_API_KEY`
   - Value：你现有的 DeepSeek API key
   - 保存并部署。只在官方控制台填写；不要把密钥发到聊天、GitHub 或网页代码里。

真实模型验证和网页接通由开发者完成。健康检查 ready=true 只代表配置存在，不能证明密钥、余额或模型可用。

## 开发者部署顺序

在本目录运行（需要 Node 22+）：

```sh
npm ci --registry=https://registry.npmjs.org
npm run check
npm run login
npm run deploy
```

Wrangler 登录会打开 Cloudflare OAuth 授权页，请账号本人确认权限。当前部署配置 `PUBLIC_TRIAL=true`，但缺少 DEEPSEEK_API_KEY 时仍关闭调用。保存有效密钥后，匿名试用将在每日额度内启用。新建其他环境时先设为 false，完成密钥配置再开启。

在官方控制台填写 Secret 并部署后，检查 /api/health；修改源码配置时再运行 npm run deploy。以原创测试材料从已允许的课程来源进行雅思批改、完整 4 轮面试验证（总计至少 6 次模型调用）。模型/余额/输出格式错误时先修复，不要宣称服务已接通。

只有实测通过后，在 practice/live.js 的 HOSTED_API 填写部署返回的 **实际 HTTPS origin**，运行 node tools/build-practice.cjs，检查手机/桌面布局和加载性能，再发布 GitHub Pages。网页只保存接口地址，不保存密钥。

## 成本与开关

- Cloudflare Workers Free 和 SQLite Durable Objects 有免费额度，超过免费额度会受限；不要为此自动升级。详见官方价格页。
- DeepSeek 独立按输入/输出 tokens 计费；这里不把免费托管说成免费模型。
- `DAILY_CALL_LIMIT=30`：全站每天最多 30 次模型请求（UTC 零点重置，北京时间早上 8 点），失败/超时也计数。一篇作文通常 1 次，完整面试 5 次。不是 30 人或人民币预算。
- 统一持久化计数，跨地区/实例/重启仍生效；每个匿名 IP 哈希最多 6 次/分钟。CORS 只限制浏览器来源，并非防刷认证；公开测试仍可能被人耗尽当日额度。
- `PUBLIC_TRIAL=false` 且不配置 TRIAL_ACCESS_CODE：暂停调用。设置 TRIAL_ACCESS_CODE secret 可改成邀请测试；前端通过 health 显示体验码输入框。
- 请勿在本项目中记录请求正文或开启包含正文的调试日志。生产 observability 默认关闭。

## 数据

作文由 Cloudflare 转发给 DeepSeek，不在本站持久化。面试项目、回答及成功请求缓存临时存储于 Cloudflare SQLite Durable Objects，以支持多轮和成功重试去重。30 分钟无操作后拒绝继续使用并通过 alarm 安排清理；用户点结束可立即清除。平台故障时清理可能延后，不能承诺精确到秒。服务商数据处理另受各自政策约束。

每日限额计数只保存当日总量和短期、按日变化的 IP 哈希，不存原始 IP。面试记录不会进入 Git 或静态网页。

## 验证

```sh
node --test ../server/core.test.mjs worker.test.mjs
npm run check
npm run dev
```

单元测试是模拟模型调用，不等于真实 DeepSeek 效果。首次真实体验需补记实测结论与耗时。

## 覆盖范围与待办

准备完成：服务端密钥、结构化反馈、原句校验、四轮追问、会话持久化/过期、全站额度、CORS、请求大小限制。
已完成：OAuth 授权、首次部署，云端 /api/health 返回 HTTP 200。
已完成：Secret 由账号本人填写；两条真实模型 API 流程已通过首轮验证。前端地址已配置，公开网页的真实作文批改和完整四轮面试均已通过浏览器验收。详见 PRACTICE-QA.md / PERFORMANCE.md。
接口地址：https://vicky-agent-lab-api.vicky-agent-lab-api.workers.dev
大陆用户的 GitHub Pages / workers.dev 连通性需在目标网络独立实测。若受限，后续考虑自有域名或国内托管，不能用本机测试声称国内稳定。

官方依据（核对 2026-10-27）：
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/durable-objects/platform/pricing/
- https://developers.cloudflare.com/workers/configuration/secrets/
- https://api-docs.deepseek.com/
