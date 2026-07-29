# AetherIoT 官网

AetherIoT 的公开产品官网。AetherIoT 是面向物理空间的开源、AI 原生运行平台：设备厂商、系统集成商、解决方案开发者和运维人员从安全空边缘运行时开始，先证明只读数据链路，再显式投运受治理的确定性行为。官网说明 AetherEdge、AetherCloud、AetherContracts 和下游 AetherEMS 的不同职责，并明确区分已经交付的基础能力与仍在开发的完整对话式意图体验。家庭和能源场景只能作为明确标注的用例，不能把行业中立母项目重新定义为垂直产品。

网站首页包含两个入口：根路径 `/` 提供中文页面，`/en/` 提供英文页面。独立的 AetherCloud 控制台部署在 `https://cloud.aetheriot.dev`，官网只提供入口，不承载账户或控制台页面。两种语言必须保持相同的产品边界、链接和页面结构。

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

工作进程名称为 `www`，因此 Cloudflare 会分配免费的生产地址 `https://aetheriot.dev`。

```bash
npm run deploy:cloudflare
```
