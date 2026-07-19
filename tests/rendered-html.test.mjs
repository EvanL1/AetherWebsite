import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(path, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(path = "/") {
  const response = await render(path);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("server-renders Chinese as the default AetherIoT landing page", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<html lang="zh-CN"/);
  assert.match(html, /<title>AetherIoT｜面向物理空间的人工智能原生运行平台<\/title>/);
  assert.match(html, /描述你想要的结果。/);
  assert.match(html, /由智能体生成行为。/);
  assert.match(html, /智能体生成可审查的计划/);
  assert.match(html, /了解智能体如何工作/);
  assert.match(html, /AetherEdge/);
  assert.match(html, /AetherCloud/);
  assert.match(html, /AetherContracts/);
  assert.match(html, /AetherEMS/);
  assert.match(html, /aether-example-minimal-gateway/);
  assert.doesNotMatch(
    html,
    /Describe the outcome|Explore the architecture|OPEN SOURCE|WHY AETHER|QUICKSTART|>Tutorials</,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("serves the complete English site at /en/", async () => {
  const html = await htmlFor("/en/");

  assert.match(html, /<html lang="en"/);
  assert.match(
    html,
    /<title>AetherIoT — The AI-native runtime for physical spaces<\/title>/,
  );
  assert.match(html, /Describe the outcome\./);
  assert.match(html, /Agents build behavior\./);
  assert.match(html, /See how agents work/);
  assert.match(html, /Agents produce inspectable plans/);
  assert.doesNotMatch(html, /描述你想要的结果|由智能体生成行为/);
});

test("publishes localized canonical, alternate, and Open Graph metadata", async () => {
  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");

  for (const html of [chinese, english]) {
    assert.match(
      html,
      /<link rel="alternate" hrefLang="zh-CN" href="https:\/\/www\.aetheriot\.workers\.dev\/"/,
    );
    assert.match(
      html,
      /<link rel="alternate" hrefLang="en" href="https:\/\/www\.aetheriot\.workers\.dev\/en\/"/,
    );
    assert.match(
      html,
      /<link rel="alternate" hrefLang="x-default" href="https:\/\/www\.aetheriot\.workers\.dev\/"/,
    );
  }

  assert.match(
    chinese,
    /<link rel="canonical" href="https:\/\/www\.aetheriot\.workers\.dev\/"/,
  );
  assert.match(
    chinese,
    /<meta name="description" content="面向智能体的开源运行平台，把人的意图转化为受治理、可验证，并由边缘端确定执行的现实行为。"/,
  );
  assert.match(chinese, /<meta property="og:locale" content="zh_CN"/);
  assert.match(
    chinese,
    /<meta property="og:image" content="https:\/\/www\.aetheriot\.workers\.dev\/og-zh\.png"/,
  );
  assert.match(
    english,
    /<link rel="canonical" href="https:\/\/www\.aetheriot\.workers\.dev\/en\/"/,
  );
  assert.match(
    english,
    /<meta name="description" content="The open-source runtime foundation for agents to turn human intent into governed, verifiable physical behavior."\/>/,
  );
  assert.match(english, /<meta property="og:locale" content="en_US"/);
  assert.match(
    english,
    /<meta property="og:image" content="https:\/\/www\.aetheriot\.workers\.dev\/og\.png"/,
  );
});

test("offers accessible language and theme controls on both routes", async () => {
  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");

  assert.match(
    chinese,
    /<a[^>]+class="locale-link"[^>]+href="\/en\/"[^>]+hrefLang="en"/,
  );
  assert.match(chinese, /aria-label="切换到英文"/);
  assert.match(chinese, /aria-label="切换明暗主题"/);

  assert.match(
    english,
    /<a[^>]+class="locale-link"[^>]+href="\/"[^>]+hrefLang="zh-CN"/,
  );
  assert.match(english, /aria-label="Switch to Chinese"/);
  assert.match(english, /aria-label="Toggle color theme"/);
});

test("makes all three repositories explicit in the primary navigation", async () => {
  const html = await htmlFor("/");
  const navigation = html.match(/<nav\b[\s\S]*?<\/nav>/)?.[0] ?? "";

  assert.match(navigation, /https:\/\/github\.com\/EvanL1\/AetherEdge/);
  assert.match(navigation, /https:\/\/github\.com\/EvanL1\/AetherCloud/);
  assert.match(navigation, /https:\/\/github\.com\/EvanL1\/AetherContracts/);
  assert.match(navigation, />AetherEdge</);
  assert.match(navigation, />AetherCloud</);
  assert.match(navigation, />AetherContracts</);
  assert.doesNotMatch(html, /View on GitHub|Star on GitHub/);
});

test("links each language to the matching documentation corpus", async () => {
  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");

  for (const path of [
    "overview/ai-native-platform",
    "overview/platform",
    "aetheredge",
    "aethercloud",
    "aethercontracts",
    "guides/edge-contracts-cloud",
    "compatibility/version-matrix",
    "roadmap/status",
  ]) {
    assert.match(
      chinese,
      new RegExp(`https://docs\\.aetheriot\\.workers\\.dev/${path}/`),
    );
    assert.match(
      english,
      new RegExp(`https://docs\\.aetheriot\\.workers\\.dev/en/${path}/`),
    );
  }

  assert.doesNotMatch(
    chinese,
    /https:\/\/docs\.aetheriot\.workers\.dev\/en\//,
  );
  assert.match(chinese, />边缘、契约与云端联动指南</);
  assert.match(english, />Edge–Contracts–Cloud integration guide</);
  assert.doesNotMatch(chinese, /tutorials\/edge-contracts-cloud|>教程</);
  assert.doesNotMatch(english, /tutorials\/edge-contracts-cloud|>Tutorials</);
});

test("keeps claims aligned with the current beta product boundary", async () => {
  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");

  assert.match(chinese, /开源 · 人工智能原生 · 测试版/);
  assert.match(chinese, /边缘端决定实际执行的行为/);
  assert.match(
    chinese,
    /面向最终用户的智能体体验仍在开发中/,
  );
  assert.doesNotMatch(
    chinese,
    /24\/7|全天候|生产就绪|生产级|保证可用|完全自主|无需任何配置/,
  );

  assert.match(english, /OPEN SOURCE · AI-NATIVE · BETA/);
  assert.match(english, /The edge decides what runs/);
  assert.match(english, /END-USER AGENT EXPERIENCE IN DEVELOPMENT/);
  assert.doesNotMatch(english, /24\/7|production.ready|production-grade|guaranteed uptime/i);
});

test("states runtime invariants instead of presenting arbitrary proof metrics", async () => {
  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");
  const chineseProof =
    chinese.match(/<section class="proof-strip"[\s\S]*?<\/section>/)?.[0] ?? "";
  const englishProof =
    english.match(/<section class="proof-strip"[\s\S]*?<\/section>/)?.[0] ?? "";

  for (const value of ["智能体生成", "契约验证", "边缘裁决", "断网继续"]) {
    assert.match(chineseProof, new RegExp(`>${value}<`));
  }
  assert.match(chinese, /不可绕过的运行约束/);
  assert.doesNotMatch(chineseProof, />3<|>0<|>1<|>本地</);

  for (const value of ["GENERATE", "VERIFY", "DECIDE", "CONTINUE"]) {
    assert.match(englishProof, new RegExp(`>${value}<`));
  }
  assert.match(english, /NON-NEGOTIABLE RUNTIME INVARIANTS/);
});

test("keeps both localized pages structurally identical", async () => {
  const pages = [await htmlFor("/"), await htmlFor("/en/")];

  for (const html of pages) {
    assert.equal(html.match(/<main>/g)?.length, 1);
    assert.equal(html.match(/<nav\b/g)?.length, 1);
    assert.equal(html.match(/<h1>/g)?.length, 1);
    assert.equal(html.match(/<footer>/g)?.length, 1);
    assert.equal(html.match(/class="capability-card"/g)?.length, 3);
    assert.equal(html.match(/class="layer-card"/g)?.length, 3);
    assert.equal(html.match(/class="docs-card"/g)?.length, 8);
  }
});

test("exports static Chinese and English homepages for Cloudflare Workers", async () => {
  const chinese = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );
  const english = await readFile(
    new URL("../dist/client/en/index.html", import.meta.url),
    "utf8",
  );

  assert.match(chinese, /描述你想要的结果/);
  assert.match(chinese, /<html lang="zh-CN"/);
  assert.match(english, /Describe the outcome/);
  assert.match(english, /<html lang="en"/);

  for (const html of [chinese, english]) {
    assert.doesNotMatch(html, /localhost|codex-preview/);
  }
  assert.match(
    chinese,
    /<meta property="og:image" content="https:\/\/www\.aetheriot\.workers\.dev\/og-zh\.png"/,
  );
  assert.match(
    english,
    /<meta property="og:image" content="https:\/\/www\.aetheriot\.workers\.dev\/og\.png"/,
  );
});

test("targets the AetherIoT Cloudflare Workers free subdomain", async () => {
  const config = JSON.parse(
    await readFile(
      new URL("../dist/server/wrangler.json", import.meta.url),
      "utf8",
    ),
  );

  assert.equal(config.name, "www");
  assert.equal(config.main, "index.js");
  assert.equal(config.assets.directory, "../client");

  const exportScript = await readFile(
    new URL("../scripts/export-static.mjs", import.meta.url),
    "utf8",
  );
  assert.match(exportScript, /https:\/\/www\.aetheriot\.workers\.dev/);
  assert.match(exportScript, /en\/index\.html/);
  assert.doesNotMatch(exportScript, /aetheriot\.pages\.dev/);
});

test("ships a correctly sized AetherIoT social card", async () => {
  for (const filename of ["og.png", "og-zh.png"]) {
    const image = await readFile(
      new URL(`../public/${filename}`, import.meta.url),
    );

    assert.equal(image.subarray(1, 4).toString("ascii"), "PNG");
    assert.equal(image.readUInt32BE(16), 1200);
    assert.equal(image.readUInt32BE(20), 630);
  }
});

test("publishes browser, crawler, sitemap, and agent discovery resources", async () => {
  const [favicon, robots, sitemap, chineseAgents, englishAgents] =
    await Promise.all([
      readFile(new URL("../public/favicon.svg", import.meta.url), "utf8"),
      readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
      readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
      readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
      readFile(new URL("../public/en/llms.txt", import.meta.url), "utf8"),
    ]);

  assert.match(favicon, /stroke="#b8ff62"/);
  assert.match(
    robots,
    /Sitemap: https:\/\/www\.aetheriot\.workers\.dev\/sitemap\.xml/,
  );
  assert.match(sitemap, /<loc>https:\/\/www\.aetheriot\.workers\.dev\/<\/loc>/);
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.aetheriot\.workers\.dev\/en\/<\/loc>/,
  );

  for (const agentIndex of [chineseAgents, englishAgents]) {
    assert.match(
      agentIndex,
      /https:\/\/docs\.aetheriot\.workers\.dev\/(?:en\/)?llms\.txt/,
    );
    assert.match(agentIndex, /https:\/\/github\.com\/EvanL1\/AetherEdge/);
    assert.match(agentIndex, /https:\/\/github\.com\/EvanL1\/AetherCloud/);
    assert.match(agentIndex, /https:\/\/github\.com\/EvanL1\/AetherContracts/);
  }

  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");
  assert.match(
    chinese,
    /<link rel="icon" href="https:\/\/www\.aetheriot\.workers\.dev\/favicon\.svg" type="image\/svg\+xml"/,
  );
  assert.match(
    chinese,
    /<link rel="alternate" type="text\/plain" href="\/llms\.txt"/,
  );
  assert.match(
    english,
    /<link rel="alternate" type="text\/plain" href="\/en\/llms\.txt"/,
  );
  assert.match(
    chinese,
    /<link rel="sitemap" type="application\/xml" href="\/sitemap\.xml"/,
  );

  for (const path of [
    "favicon.svg",
    "robots.txt",
    "sitemap.xml",
    "llms.txt",
    "en/llms.txt",
  ]) {
    await readFile(new URL(`../dist/client/${path}`, import.meta.url));
  }
});

test("documents both locales and the unshipped conversational boundary", async () => {
  const readme = await readFile(
    new URL("../README.md", import.meta.url),
    "utf8",
  );

  assert.match(readme, /根路径 `\/` 提供中文页面/);
  assert.match(readme, /`\/en\/` 提供英文页面/);
  assert.match(readme, /仍在开发的最终用户对话式智能体体验/);
  assert.doesNotMatch(readme, /AetherIot/);
});

test("shares the responsive brand frame and explicit light theme", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(css, /--content-width/);
  assert.match(css, /--page-gutter:\s*clamp\(16px,\s*2\.5vw,\s*48px\)/);
  assert.match(
    css,
    /width:\s*calc\(100% - var\(--page-gutter\) - var\(--page-gutter\)\)/,
  );
  assert.match(css, /circle at 12% 38%/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /\.hero-line\s*{[\s\S]*?white-space:\s*nowrap/);
  assert.match(css, /html\[data-theme="light"\]/);
  assert.match(css, /PingFang SC/);
  assert.match(css, /\.site-controls/);
  assert.match(css, /@media \(max-width:\s*720px\)[\s\S]*--page-gutter:\s*20px/);
});

test("keeps the sticky navigation centered and the hero content-driven", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const navigation = css.match(/\.nav\s*{[\s\S]*?\n}/)?.[0] ?? "";
  const hero = css.match(/\.hero\s*{[\s\S]*?\n}/)?.[0] ?? "";

  assert.match(navigation, /position:\s*sticky/);
  assert.match(navigation, /margin-inline:\s*auto/);
  assert.doesNotMatch(navigation, /left:\s*50%|translateX/);

  assert.match(
    hero,
    /min-height:\s*clamp\(680px,\s*calc\(100svh - 84px\),\s*790px\)/,
  );
  assert.match(
    css,
    /\.hero h1\s*{[\s\S]*?font-size:\s*clamp\(46px,\s*4\.6vw,\s*84px\)/,
  );
  assert.match(
    css,
    /@media \(max-width:\s*1024px\)[\s\S]*?\.hero\s*{[^}]*min-height:\s*auto/,
  );
  assert.match(
    css,
    /@media \(max-width:\s*1024px\)[\s\S]*?\.hero h1\s*{[^}]*font-size:\s*clamp\(46px,\s*7\.2vw,\s*72px\)/,
  );
});
