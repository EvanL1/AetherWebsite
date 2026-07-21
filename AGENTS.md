# AetherWebsite Agent Instructions

This repository is the public product website for AetherIoT. `CLAUDE.md` and
`GEMINI.md` are symlinks to this file, so every agent reads and edits the same
instructions.

This is a public marketing surface. A wrong claim here reaches prospective
users before any code does, so the rules below are stricter than the ones for
an internal repository.

## Product Claim Discipline

`tests/rendered-html.test.mjs` is the authority, not this prose. It fails the
build when a claim drifts, so read it before editing any page copy.

- The product is a developer preview. Both languages must keep the split
  between what is available now (local runtime, rules, alarms, safety
  interlocks) and what is in development (conversational home setup).
- Never claim 24/7 operation, production readiness, guaranteed uptime, full
  autonomy, or zero configuration. The tests reject those phrases in both
  languages.
- The proof strip states user-facing safeguards, never invented metrics. Bare
  numbers in that section fail the test.
- Do not upgrade readiness language ahead of the product repositories.
  AetherEdge, AetherCloud, and AetherContracts own their own status.

## Bilingual Parity

- `/` serves Chinese from `app/(zh)`; `/en/` serves English from `app/(en)/en`.
- Both routes must stay structurally identical and carry the same product
  boundaries, navigation, and links. A test asserts this directly.
- All three product repositories stay explicit in the primary navigation, and
  each language links to its matching documentation corpus.
- Localized canonical, alternate, and Open Graph metadata must stay in sync.

## Public Discovery

`public/` owns the machine-readable entry points: `robots.txt`, `sitemap.xml`,
`llms.txt`, and `public/en/llms.txt`. Both `llms.txt` files point at the parent
project, the product repositories, and the unified documentation index. They
deliberately do not mirror the full documentation corpus.

## Verification

```bash
npm ci
npm run build
node --test tests/rendered-html.test.mjs
npm run lint
```

`npm run build` writes the worker entry to `dist/server` and static assets to
`dist/client`. Run the rendered-HTML test after any copy, layout, or metadata
change; it is the only check that enforces the claim and parity rules.

## Deployment

```bash
npm run deploy:cloudflare
```

The worker is named `www`, which is what gives the site its production address
on the AetherIoT Cloudflare Workers subdomain. Do not rename it.

## Change Discipline

- Do not commit build output. `dist/`, `.next/`, and `.vinext/` are generated
  and ignored; `build/` is source and holds the Vite plugin.
- Keep copy changes paired across both languages in the same change.
- Do not add analytics, third-party trackers, or external font/script hosts
  without an explicit decision; the site is a static, self-contained surface.
