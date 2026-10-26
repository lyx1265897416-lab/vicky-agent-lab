# Vicky Agent Lab

面向零基础学习者的 Personal Agent 八课文字实操网站，包含讲稿、逐步操作、可点击教学模拟、配套 Skills 与虚构练习材料。

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

这是当前课程 v1.6 的独立静态快照，原站更新不会自动同步到此仓库。编辑内容时同时维护 `course-content.js` 与 `downloads/` 对应学习包；不要只改显示文字而留下旧下载文件。

分享课节链接时使用 `learn.html?lesson=6#step-6-2` 等完整文件名形式。页面不需要服务器、数据库或 API Key；进度和笔记只保存在学员自己的浏览器。

## 内容与验证范围

界面演示为教学模拟，不能替代真实 Codex 客户端实测。Mac / Windows 桌面逐按钮验证均未完成，历史 CLI 运行记录单独标注。没有录播视频、支付或付费账户系统。

课程文字、示例和配套文件沿用学习包内 `LICENSE.txt` 的使用说明；公开可阅读不代表授权整套课程转售。第三方品牌与文档归各自权利人所有。
