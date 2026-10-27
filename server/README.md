# DeepSeek 实操后端

Node.js 22+，无第三方依赖。启动：`node server/main.mjs`。
本地打开 http://127.0.0.1:8095/local-setup，填写现有密钥。默认保存到仓库外相邻的 `vicky-agent-lab-private/deepseek.env`（600 权限）。不要在公开仓库里写密钥。

## 部署条件
- 长期运行的 Node 服务（单实例），支持 HTTPS、外连 api.deepseek.com 和一个**持久磁盘**。
- `NODE_ENV=production`、`DEEPSEEK_API_KEY`（secret）、`PRIVATE_DIR`（持久磁盘目录）。
- `DEEPSEEK_MODEL=deepseek-flash`（2026-10-27 官方文档模型标识，可由运营方调整）。
- `DAILY_CALL_LIMIT=30`：全站每天最多 30 次模型请求，包含失败/超时请求，不是人民币预算。
- 默认关闭公开调用。配置 `TRIAL_ACCESS_CODE` 给受邀测试者，或明确设置 `PUBLIC_TRIAL=true` 开放匿名试用。
- 在 `practice/live.js` 的 HOSTED_API 中配置实际已部署的 HTTPS 地址，然后重新构建页面。不要在前端写 DeepSeek 密钥。
- 健康检查 `/api/health` 只表示已配置，不能证明额度或密钥有效。

## 数据和额度
作文和面试输入转发给 DeepSeek，平台处理受其条款约束；本服务不把作文写入磁盘、不记录请求正文。面试会话暂存在内存中，30 分钟过期（至多再过 1 分钟清理），重启后消失。额度计数持久化到 PRIVATE_DIR/usage.json，写入失败时不调用模型。不要使用无持久磁盘或多副本部署，否则日额度无法作为跨重启/跨实例上限。代码包含按连接 IP 的短时间限流；代理环境中可能共享限额，不能作为防滥用的唯一保证。

模型输出按字段和原文引用校验；格式不合格、引用不匹配会报错，不回退到预设答案。HTTP 错误、空响应、超时不自动重试。面试每轮请求有幂等标识，成功响应丢失后原请求可重复取回，避免重复计费。

## 依据
https://api-docs.deepseek.com/
https://api-docs.deepseek.com/guides/json_mode/

## 验证
`node --test server/core.test.mjs` 为模拟网络测试；真实密钥与线上部署必须另外验证。不要把模拟测试写成真实模型效果。
