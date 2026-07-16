import { mkdir, writeFile } from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://www.aetheriot.workers.dev/", {
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
  throw new Error(`Static export failed with HTTP ${response.status}`);
}

const html = await response.text();
if (!html.includes("Describe the outcome.")) {
  throw new Error("Static export did not contain the AetherIoT landing page");
}

const clientDirectory = new URL("../dist/client/", import.meta.url);
await mkdir(clientDirectory, { recursive: true });
await writeFile(new URL("index.html", clientDirectory), html, "utf8");
