# AetherIoT 官网

AetherIoT 的公开产品官网。AetherIoT 是面向物理空间的开源、人工智能原生运行平台，目标是把人的意图转化为受治理、可验证的现实行为。官网说明 AetherEdge、AetherCloud 和 AetherContracts 的不同职责，并明确区分已经交付的基础能力与仍在开发的最终用户对话式智能体体验。

网站包含两个入口：根路径 `/` 提供中文页面，`/en/` 提供英文页面。两种语言必须保持相同的产品边界、链接和页面结构。

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
