# AetherIoT Website

The public landing page for the AetherIoT open-source platform and its
AetherEdge, AetherCloud, and AetherContracts products.

The site is a single static route built with vinext and exported for Cloudflare
Pages. Product claims must remain aligned with the current beta boundaries in
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

`npm run build` writes the deployable static site to `dist/client`.

## Cloudflare Pages

Create a Direct Upload project named `aetheriot` and deploy `dist/client`.
The production URL is expected to be `https://aetheriot.pages.dev`.
