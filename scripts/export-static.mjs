import { mkdir, writeFile } from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const routes = [
  {
    path: "/",
    output: "index.html",
    marker: "不再逐项配置设备。",
    language: 'lang="zh-CN"',
  },
  {
    path: "/en/",
    output: "en/index.html",
    marker: "Stop configuring devices.",
    language: 'lang="en"',
  },
];

const clientDirectory = new URL("../dist/client/", import.meta.url);

for (const route of routes) {
  const response = await worker.fetch(
    new Request(new URL(route.path, "https://aetheriot.dev"), {
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

  if (!response.ok) {
    throw new Error(
      `Static export for ${route.path} failed with HTTP ${response.status}`,
    );
  }

  const html = await response.text();
  if (!html.includes(route.marker) || !html.includes(route.language)) {
    throw new Error(
      `Static export for ${route.path} did not contain its localized landing page`,
    );
  }

  const outputUrl = new URL(route.output, clientDirectory);
  await mkdir(new URL("./", outputUrl), { recursive: true });
  await writeFile(outputUrl, html, "utf8");
}
