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

- AetherIoT and its core products are industry-neutral. A home, building, or
  energy site may appear only as a clearly labeled use case; it must not become
  the identity of the umbrella platform or the AetherEdge kernel.
- The product is a developer preview. Both languages must keep the split
  between what is available now (safe-empty local runtime, acquisition, rules,
  alarms, and safety interlocks) and what is in development (the complete
  conversation-first intent and proposal experience).
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
- All three core product repositories stay explicit in the primary navigation,
  AetherEMS stays explicit as the downstream energy solution, and each language
  links to its matching documentation corpus.
- The current-user entry point links to the safe commissioning journey and uses
  the signed Release installer path rather than presenting a source checkout as
  the normal operator Quickstart.
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
