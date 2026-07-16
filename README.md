# AetherIoT Website

The public landing page for AetherIoT: the open-source, AI-native runtime
foundation for turning human intent into governed, verifiable behavior across
physical spaces. It presents the distinct roles of AetherEdge, AetherCloud,
and AetherContracts without presenting the planned end-user agent experience
as already shipped.

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
