import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/", options = {}) {
  const { origin = "http://localhost", env = {} } = options;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${origin}-${path}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(path, origin), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
      ...env,
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(path = "/", options = {}) {
  const response = await render(path, options);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

function heroFor(html) {
  const hero = html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.notEqual(hero, "", "hero section must exist");
  return hero;
}

test("server-renders Chinese as the default AetherIoT landing page", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<html lang="zh-CN"/);
  assert.match(
    html,
    /<title>AetherIoT｜面向物理空间的 AI 原生运行平台<\/title>/,
  );
  assert.match(html, /从安全空状态开始。/);
  assert.match(html, /受治理地运行物理空间。/);
  assert.match(html, /面向设备厂商、系统集成商、解决方案开发者和边缘运维人员/);
  assert.match(html, /证明只读数据链路/);
  assert.match(html, /选择产品与安全起点/);
  assert.match(html, /AetherEdge/);
  assert.match(html, /AetherCloud/);
  assert.match(html, /AetherContracts/);
  assert.match(html, /AetherEMS/);
  assert.match(html, /AetherEdge-ARCH-VERSION\.run/);
  assert.match(html, /aether doctor/);
  assert.doesNotMatch(html, /aether-example-minimal-gateway|git clone/);
  assert.doesNotMatch(html, /人工智能/);
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
    /<title>AetherIoT — AI-native runtime platform for physical spaces<\/title>/,
  );
  assert.match(html, /Start from a safe-empty edge\./);
  assert.match(html, /Govern behavior across physical spaces\./);
  assert.match(html, /device makers, system integrators, solution builders, and edge operators/);
  assert.match(html, /prove the read-only data path/);
  assert.match(html, /Choose your product and safe starting point/);
  assert.doesNotMatch(html, /描述你想要的结果|由智能体生成行为|Agents build behavior/);
});

test("publishes localized canonical, alternate, and Open Graph metadata", async () => {
  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");

  for (const html of [chinese, english]) {
    assert.match(
      html,
      /<link rel="alternate" hrefLang="zh-CN" href="https:\/\/aetheriot\.ai\/"/,
    );
    assert.match(
      html,
      /<link rel="alternate" hrefLang="en" href="https:\/\/aetheriot\.ai\/en\/"/,
    );
    assert.match(
      html,
      /<link rel="alternate" hrefLang="x-default" href="https:\/\/aetheriot\.ai\/"/,
    );
  }

  assert.match(
    chinese,
    /<link rel="canonical" href="https:\/\/aetheriot\.ai\/"/,
  );
  assert.match(
    chinese,
    /<meta name="description" content="AetherIoT 是行业中立的 AI 原生 IoT 平台：从安全空边缘运行时开始，先证明观测链路，再显式投运受治理的确定性行为。"/,
  );
  assert.match(chinese, /<meta property="og:locale" content="zh_CN"/);
  assert.match(
    chinese,
    /<meta property="og:image" content="https:\/\/aetheriot\.ai\/og-home\.png"/,
  );
  assert.match(
    english,
    /<link rel="canonical" href="https:\/\/aetheriot\.ai\/en\/"/,
  );
  assert.match(
    english,
    /<meta name="description" content="AetherIoT is an industry-neutral, AI-native IoT platform: start with a safe-empty edge runtime, prove observation, then commission governed deterministic behavior."\/>/,
  );
  assert.match(english, /<meta property="og:locale" content="en_US"/);
  assert.match(
    english,
    /<meta property="og:image" content="https:\/\/aetheriot\.ai\/og-home\.png"/,
  );
});

test("redirects former account subpages to the independent cloud console", async () => {
  for (const path of ["/cloud/", "/en/cloud/"]) {
    const response = await render(path);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "https://cloud.aetheriot.ai/");
  }
});

test("canonicalizes the www hostname without losing path or query", async () => {
  const response = await render("/en/?source=language", {
    origin: "https://www.aetheriot.ai",
  });

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "https://aetheriot.ai/en/?source=language",
  );
});

test("enables privacy-conscious PostHog only on the configured production host", async () => {
  const productionWithoutKey = await htmlFor("/", {
    origin: "https://aetheriot.ai",
  });
  assert.doesNotMatch(productionWithoutKey, /posthog|us\.i\.posthog\.com/i);

  const productionWithKey = await htmlFor("/en/", {
    origin: "https://aetheriot.ai",
    env: { POSTHOG_KEY: "phc_test_project_key" },
  });
  assert.match(productionWithKey, /data-aether-analytics/);
  assert.match(productionWithKey, /phc_test_project_key/);
  assert.match(productionWithKey, /https:\/\/us\.i\.posthog\.com/);
  assert.match(productionWithKey, /person_profiles:\s*"never"/);
  assert.match(productionWithKey, /disable_session_recording:\s*true/);
  assert.match(productionWithKey, /cta_clicked/);

  const previewWithKey = await htmlFor("/", {
    origin: "https://aetheriot-platform.example.com",
    env: { POSTHOG_KEY: "phc_test_project_key" },
  });
  assert.doesNotMatch(previewWithKey, /posthog|us\.i\.posthog\.com/i);
});

test("keeps production HTML on the static asset path before analytics injection", async () => {
  const response = await render("/", {
    origin: "https://aetheriot.ai",
    env: {
      POSTHOG_KEY: "phc_test_project_key",
      ASSETS: {
        fetch: async () =>
          new Response("<html><head></head><body>static home</body></html>", {
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      },
    },
  });
  const html = await response.text();

  assert.match(html, /static home/);
  assert.match(html, /data-aether-analytics/);
});

test("marks the same high-intent calls to action in both locales", async () => {
  for (const path of ["/", "/en/"]) {
    const html = await htmlFor(path);

    for (const id of [
      "nav_aetheredge",
      "nav_aethercloud",
      "nav_aethercontracts",
      "language_switch",
      "cloud_account",
      "nav_docs",
      "hero_user_journey",
      "final_ai_native",
      "final_docs",
    ]) {
      assert.match(html, new RegExp(`data-analytics-id="${id}"`));
    }
  }
});

test("sends the security headers on every response", async () => {
  const expected = {
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  };

  // A rendered page and a redirect leave the worker by different paths, so
  // both are checked: the redirect is the one that would slip through if the
  // headers were attached at the renderer instead of at the worker boundary.
  for (const path of ["/", "/en/", "/cloud/"]) {
    const response = await render(path);
    for (const [header, value] of Object.entries(expected)) {
      assert.equal(
        response.headers.get(header),
        value,
        `${path} is missing ${header}`,
      );
    }
  }
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
    chinese,
    /href="https:\/\/cloud\.aetheriot\.ai"[^>]*>云端账户</,
  );

  assert.match(
    english,
    /<a[^>]+class="locale-link"[^>]+href="\/"[^>]+hrefLang="zh-CN"/,
  );
  assert.match(english, /aria-label="Switch to Chinese"/);
  assert.match(english, /aria-label="Toggle color theme"/);
  assert.match(
    english,
    /href="https:\/\/cloud\.aetheriot\.ai"[^>]*>Cloud account</,
  );
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
    "overview/user-journeys",
    "aetheredge",
    "aethercloud",
    "aethercontracts",
    "guides/edge-contracts-cloud",
    "compatibility/version-matrix",
    "roadmap/status",
  ]) {
    assert.match(
      chinese,
      new RegExp(`https://docs\\.aetheriot\\.ai/zh/${path}/`),
    );
    assert.match(
      english,
      new RegExp(`https://docs\\.aetheriot\\.ai/${path}/`),
    );
  }

  assert.doesNotMatch(
    chinese,
    /https:\/\/docs\.aetheriot\.ai\/en\//,
  );
  assert.doesNotMatch(english, /https:\/\/docs\.aetheriot\.ai\/(en|zh)\//);
  assert.match(chinese, />边缘、契约与云端联动指南</);
  assert.match(english, />Edge–Contracts–Cloud integration guide</);
  assert.doesNotMatch(chinese, /tutorials\/edge-contracts-cloud|>教程</);
  assert.doesNotMatch(english, /tutorials\/edge-contracts-cloud|>Tutorials</);
});

test("keeps claims aligned with the current beta product boundary", async () => {
  const chinese = heroFor(await htmlFor("/"));
  const english = heroFor(await htmlFor("/en/"));

  assert.match(chinese, /开源 · AI 原生 · 开发者预览/);
  assert.match(chinese, /当前可用：安全空本地运行、采集、规则、告警与安全联锁/);
  assert.match(chinese, /开发中：完整对话式意图与方案体验/);
  assert.doesNotMatch(
    chinese,
    /24\/7|全天候|生产就绪|生产级|保证可用|完全自主|无需任何配置/,
  );

  assert.match(english, /OPEN SOURCE · AI-NATIVE · DEVELOPER PREVIEW/);
  assert.match(english, /AVAILABLE NOW: SAFE-EMPTY LOCAL RUNTIME, ACQUISITION, RULES, ALARMS, AND SAFETY INTERLOCKS/);
  assert.match(english, /IN DEVELOPMENT: COMPLETE CONVERSATIONAL INTENT AND PROPOSAL EXPERIENCE/);
  assert.doesNotMatch(english, /24\/7|production.ready|production-grade|guaranteed uptime/i);
});

test("states user-facing safeguards instead of presenting arbitrary proof metrics", async () => {
  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");
  const chineseProof =
    chinese.match(/<section class="proof-strip"[\s\S]*?<\/section>/)?.[0] ?? "";
  const englishProof =
    english.match(/<section class="proof-strip"[\s\S]*?<\/section>/)?.[0] ?? "";

  for (const value of ["先看方案", "权限检查", "本地执行", "离线运行"]) {
    assert.match(chineseProof, new RegExp(`>${value}<`));
  }
  assert.match(chinese, /物理系统真正需要的保障/);
  assert.doesNotMatch(chineseProof, />3<|>0<|>1<|>本地</);

  for (const value of ["REVIEW FIRST", "CHECK PERMISSIONS", "RUN LOCALLY", "RUN OFFLINE"]) {
    assert.match(englishProof, new RegExp(`>${value}<`));
  }
  assert.match(english, /WHAT A PHYSICAL SYSTEM NEEDS/);
});

test("presents an industry-neutral physical-space use case without changing platform identity", async () => {
  const chineseHero = heroFor(await htmlFor("/"));
  const englishHero = heroFor(await htmlFor("/en/"));

  assert.doesNotMatch(chineseHero, /智能体生成行为|由智能体生成行为/);
  assert.doesNotMatch(englishHero, /Agents build behavior/i);

  assert.match(
    chineseHero,
    /晚上十点后，大厅无人 10 分钟就关闭照明，把空调调到 26℃/,
  );
  assert.match(
    englishHero,
    /After 10 p\.m\., turn off the lobby lights when it has been unoccupied for 10 minutes/,
  );

  for (const device of ["入口门禁", "大厅照明", "大厅空调", "空气质量", "占用传感器"]) {
    assert.match(chineseHero, new RegExp(device));
  }
  for (const device of [
    "Entrance access",
    "Lobby lighting",
    "Lobby climate",
    "Air quality",
    "Occupancy sensor",
  ]) {
    assert.match(englishHero, new RegExp(device));
  }

  const chineseScene =
    chineseHero.match(/<section class="home-scene"[\s\S]*?<\/section>/)?.[0] ?? "";
  const englishScene =
    englishHero.match(/<section class="home-scene"[\s\S]*?<\/section>/)?.[0] ?? "";

  assert.notEqual(chineseScene, "");
  assert.notEqual(englishScene, "");
  assert.equal(chineseScene.match(/class="device-card"/g)?.length, 5);
  assert.equal(englishScene.match(/class="device-card"/g)?.length, 5);
  assert.match(chineseScene, /不代表当前设备兼容性/);
  assert.match(chineseScene, /自动化方案通过检查后才执行/);
  assert.match(chineseScene, /AetherEdge 本地执行/);
  assert.match(englishScene, /not a statement of current device compatibility/);
  assert.match(englishScene, /The automation runs only after its checks pass/);
  assert.match(englishScene, /AetherEdge runs locally/);

  for (const scene of [chineseScene, englishScene]) {
    assert.doesNotMatch(scene, /<(?:svg|img|button)\b/);
    assert.equal(scene.match(/class="device-icon[^"]*" aria-hidden="true"/g)?.length, 5);
  }
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
  assert.match(chinese, /从安全空状态开始/);
  assert.match(chinese, /<html lang="zh-CN"/);
  assert.match(english, /Start from a safe-empty edge/);
  assert.match(english, /<html lang="en"/);

  for (const html of [chinese, english]) {
    assert.doesNotMatch(html, /localhost|codex-preview/);
  }
  assert.match(
    chinese,
    /<meta property="og:image" content="https:\/\/aetheriot\.ai\/og-home\.png"/,
  );
  assert.match(
    english,
    /<meta property="og:image" content="https:\/\/aetheriot\.ai\/og-home\.png"/,
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
  assert.equal(config.assets.binding, "ASSETS");
  assert.deepEqual(
    config.assets.run_worker_first,
    [
      "/",
      "/en",
      "/en/",
      "/cloud",
      "/cloud/*",
      "/en/cloud",
      "/en/cloud/*",
    ],
    "HTML must pass through the Worker for hostname redirects and optional analytics",
  );

  const exportScript = await readFile(
    new URL("../scripts/export-static.mjs", import.meta.url),
    "utf8",
  );
  assert.match(exportScript, /https:\/\/aetheriot\.ai/);
  assert.match(exportScript, /en\/index\.html/);
  assert.doesNotMatch(exportScript, /aetheriot\.pages\.dev/);
});

test("ships a correctly sized physical-space social card", async () => {
  const image = await readFile(
    new URL("../public/og-home.png", import.meta.url),
  );

  assert.equal(image.subarray(1, 4).toString("ascii"), "PNG");
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
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
    /Sitemap: https:\/\/aetheriot\.ai\/sitemap\.xml/,
  );
  assert.match(sitemap, /<loc>https:\/\/aetheriot\.ai\/<\/loc>/);
  assert.match(
    sitemap,
    /<loc>https:\/\/aetheriot\.ai\/en\/<\/loc>/,
  );
  assert.doesNotMatch(sitemap, /\/cloud\//);

  for (const agentIndex of [chineseAgents, englishAgents]) {
    assert.match(
      agentIndex,
      /https:\/\/docs\.aetheriot\.ai\/(?:en\/)?llms\.txt/,
    );
    assert.match(agentIndex, /https:\/\/github\.com\/EvanL1\/AetherEdge/);
    assert.match(agentIndex, /https:\/\/github\.com\/EvanL1\/AetherCloud/);
    assert.match(agentIndex, /https:\/\/github\.com\/EvanL1\/AetherContracts/);
  }
  assert.match(chineseAgents, /安全空边缘运行时/);
  assert.match(chineseAgents, /开源、行业中立、AI 原生运行平台/);
  assert.doesNotMatch(chineseAgents, /人工智能/);
  assert.match(englishAgents, /industry-neutral, AI-native runtime platform/i);
  assert.match(englishAgents, /safe-empty edge/i);

  const chinese = await htmlFor("/");
  const english = await htmlFor("/en/");
  assert.match(
    chinese,
    /<link rel="icon" href="https:\/\/aetheriot\.ai\/favicon\.svg" type="image\/svg\+xml"/,
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
    "og-home.png",
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
  assert.match(readme, /从安全空边缘运行时开始/);
  assert.match(readme, /仍在开发的完整对话式意图体验/);
  assert.match(readme, /不能把行业中立母项目重新定义为垂直产品/);
  assert.doesNotMatch(readme, /AetherIot|人工智能/);
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
  assert.match(css, /\.hero-line\s*{[\s\S]*?text-wrap:\s*balance/);
  assert.match(
    css,
    /html\[lang="en"\] \.hero-line-outline\s*{[^}]*font-size:\s*0\.82em/,
  );
  assert.match(
    css,
    /@media \(min-width:\s*721px\)[\s\S]*?\.hero-line\s*{[^}]*white-space:\s*nowrap[^}]*text-wrap:\s*nowrap/,
  );
  assert.match(css, /html\[data-theme="light"\]/);
  assert.match(css, /PingFang SC/);
  assert.match(css, /\.site-controls/);
  assert.match(
    css,
    /\.device-grid\s*{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/,
  );
  assert.match(
    css,
    /@media \(max-width:\s*440px\)[\s\S]*?\.device-grid\s*{[^}]*grid-template-columns:\s*1fr/,
  );
  assert.match(css, /@media \(max-width:\s*720px\)[\s\S]*--page-gutter:\s*20px/);
});

test("keeps the sticky navigation full-bleed and the hero content-driven", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const navigation = css.match(/\.nav\s*{[\s\S]*?\n}/)?.[0] ?? "";
  const hero = css.match(/\.hero\s*{[\s\S]*?\n}/)?.[0] ?? "";

  assert.match(navigation, /position:\s*sticky/);
  assert.match(navigation, /width:\s*100%/);
  assert.match(navigation, /padding-inline:\s*var\(--page-gutter\)/);
  assert.doesNotMatch(navigation, /margin-inline/);
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
