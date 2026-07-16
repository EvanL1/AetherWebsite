# AetherIoT Website

The public landing page for the AetherIoT open-source platform and its
AetherEdge, AetherCloud, and AetherContracts products.

The site is a single route built with vinext and deployed to Cloudflare
Workers. Product claims must remain aligned with the current beta boundaries in
the AetherIot, AetherCloud, and AetherContracts repositories.

## Development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run build
node --test tests/rendered-html.test.mjs
npm run lint
```

`npm run build` writes the Worker entry point to `dist/server` and static assets
to `dist/client`.

## Cloudflare Workers

The Worker is named `www` so Cloudflare assigns the free production URL
`https://www.aetheriot.workers.dev`.

```bash
npm run deploy:cloudflare
```
