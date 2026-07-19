# AetherIoT 官网

AetherIoT 的公开产品官网。AetherIoT 是面向物理空间的开源、AI 原生运行平台，目标是不再让用户逐项配置设备：用户描述生活需求，智能体提出可检查的自动化方案，再由边缘端按照权限和安全规则在本地执行。官网说明 AetherEdge、AetherCloud 和 AetherContracts 的不同职责，并明确区分已经交付的基础能力与仍在开发的家庭对话配置体验。

网站包含两个入口：根路径 `/` 提供中文页面，`/en/` 提供英文页面。两种语言必须保持相同的产品边界、链接和页面结构。

## 公开发现入口

- `/robots.txt`：搜索引擎抓取策略
- `/sitemap.xml`：中英文官网页面索引
- `/llms.txt`：中文智能体入口
- `/en/llms.txt`：英文智能体入口

两份智能体入口只提供母项目、产品代码库和统一文档索引，不复制完整文档语料。

## 本地开发

```bash
npm ci
npm run dev
```

## 验证

```bash
npm run build
node --test tests/rendered-html.test.mjs
npm run lint
```

`npm run build` 会把工作进程入口写入 `dist/server`，并把静态资源写入 `dist/client`。

## Cloudflare Workers 部署

工作进程名称为 `www`，因此 Cloudflare 会分配免费的生产地址 `https://www.aetheriot.workers.dev`。

```bash
npm run deploy:cloudflare
```
