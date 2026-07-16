import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the AetherIoT product-family landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AetherIoT — Edge, cloud, and contracts<\/title>/i);
  assert.match(
    html,
    /<span class="hero-line hero-line-solid">The cloud can wait\.<\/span>/,
  );
  assert.match(
    html,
    /<span class="hero-line hero-line-outline">The edge cannot\.<\/span>/,
  );
  assert.match(html, /Start building/);
  assert.match(html, /AetherIoT is the open-source IoT platform/);
  assert.match(html, /AetherEdge/);
  assert.match(html, /AetherCloud/);
  assert.match(html, /AetherContracts/);
  assert.match(html, /AetherEMS/);
  assert.match(html, /aether-example-minimal-gateway/);
  assert.match(html, /https:\/\/docs\.aetheriot\.workers\.dev\/aetheredge\//);
  assert.match(html, /https:\/\/github\.com\/EvanL1\/AetherEdge/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("makes all three repositories explicit in the primary navigation", async () => {
  const response = await render();
  const html = await response.text();
  const navigation = html.match(/<nav\b[\s\S]*?<\/nav>/)?.[0] ?? "";

  assert.match(navigation, /https:\/\/github\.com\/EvanL1\/AetherEdge/);
  assert.match(navigation, /https:\/\/github\.com\/EvanL1\/AetherCloud/);
  assert.match(navigation, /https:\/\/github\.com\/EvanL1\/AetherContracts/);
  assert.match(navigation, />AetherEdge</);
  assert.match(navigation, />AetherCloud</);
  assert.match(navigation, />AetherContracts</);
  assert.doesNotMatch(html, /View on GitHub|Star on GitHub/);
});

test("links the unified documentation architecture", async () => {
  const response = await render();
  const html = await response.text();

  for (const [label, path] of [
    ["Overview", "overview/platform"],
    ["AetherEdge", "aetheredge"],
    ["AetherCloud", "aethercloud"],
    ["AetherContracts", "aethercontracts"],
    ["Tutorials", "tutorials/edge-contracts-cloud"],
    ["Compatibility", "compatibility/version-matrix"],
    ["Roadmap", "roadmap/status"],
  ]) {
    assert.match(html, new RegExp(`>${label}<`));
    assert.match(html, new RegExp(`https://docs\\.aetheriot\\.workers\\.dev/${path}/`));
  }
});

test("keeps claims aligned with the current beta product boundary", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /OPEN SOURCE · BETA/);
  assert.match(html, /OPTIONAL CLOUDLINK/);
  assert.match(html, /The edge makes the final call/);
  assert.doesNotMatch(html, /production.ready|production-grade|guaranteed uptime/i);
});

test("exports a static homepage for Cloudflare Pages", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /The cloud can wait/);
  assert.match(html, /AetherIoT is the open-source IoT platform/);
  assert.match(html, /<meta property="og:image" content="https:\/\/aetheriot\.pages\.dev\/og\.png"/);
  assert.doesNotMatch(html, /localhost|codex-preview/);
});

test("ships a correctly sized AetherIoT social card", async () => {
  const image = await readFile(new URL("../public/og.png", import.meta.url));

  assert.equal(image.subarray(1, 4).toString("ascii"), "PNG");
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
});

test("keeps the visual frame fluid to the viewport edges", async () => {
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
  assert.match(css, /@media \(max-width:\s*720px\)[\s\S]*--page-gutter:\s*16px/);
});
