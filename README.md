# Cinematic Web Studio

AI-powered cinematic website creation for ChatGPT and Codex.

Created and maintained by Artem Semianyk.

![Cinematic Web Studio](assets/icon.png)

[Русская документация](README.ru.md) · [Installation](docs/installation.md) · [Usage](docs/usage.md) · [Limitations](docs/limitations.md)

Turn a natural-language brief into an original responsive website with deliberate motion, real 3D where needed, browser QA and a source-code handoff. This is a **skills-only Agent Plugins package**. The host AI performs design and coding using its available tools; the package supplies eight workflows, original working examples and reusable local scripts. It is not a hosted website-generation API.

## Quick start

Install the private plugin through the verified link supplied in the creation report. Select Cinematic Web Studio in ChatGPT Work or Codex and ask:

> Create a premium interactive coffee website. Use a real 3D cup, cinematic lighting, scroll-controlled rotation and camera movement. Support desktop and mobile and give me the source.

The host needs file/code execution for a runnable build and browser tools for QA. Plain chat without execution cannot run these workflows end to end. No API key is required for the bundled examples.

Run the original examples with Node.js 22+:

```sh
npm start
# Open http://127.0.0.1:4173/examples/
```

The browser bundle is committed, so preview requires no dependency install. To edit and test:

```sh
npm ci
npm run build
npx playwright install chromium
npm test
npm run test:browser
```

## Workflows

| Skill | Responsibility |
| --- | --- |
| setup | Check host capabilities and explain missing tools |
| website-architect | Interpret a brief and carry implementation through QA and delivery |
| cinematic-animation | Select CSS, WAAPI, timelines, media or 3D based on the effect |
| ai-media-generator | Source and prepare rights-cleared assets; discover authorized optional providers |
| 3d-experience-builder | Load actual GLB geometry, light it and expose accessible interaction |
| performance-optimizer | Bound media and rendering costs; preserve reduced-motion and fallback behavior |
| website-qa | Exercise real browsers and inspect screenshots and failures |
| publish-export | Deliver clean source archives and publish only with authorization |

## Original demonstrations

| Example | What runs |
| --- | --- |
| [Serein](examples/cinematic-landing/) | CSS product sculpture and WAAPI section reveals |
| [Forma](examples/interactive-3d/) | Original local GLB cup, Three.js lighting, orbit and rotation/reset controls |
| [Orbit](examples/scroll-animation/) | Sticky scene, synchronized chapters and reversible scroll transforms |
| [Aurore acceptance scenario](examples/coffee-acceptance/) | Real cup rotation and camera travel on scroll, responsive chapters and tasting selector |

These are fictional concept brands. They do not make real product, availability or sales claims. The tasting selector is explicitly a local demonstration, not checkout.

## Reuse and export

```sh
node scripts/scaffold.mjs --template coffee-acceptance --out ../my-coffee-site --brand "My Coffee"
python scripts/package.py --project ../my-coffee-site --out ../my-coffee-site.zip
```

Scaffolding is a deterministic starting point, not natural-language AI generation. The installed architect skill directs the host to adapt the generated source to the actual brief. Existing directories are rejected rather than overwritten. A standalone export includes its local media, browser bundle, run script and browser test harness.

## Technologies and licensing

Implemented examples use semantic HTML, CSS, Web Animations API and Three.js/WebGL with GLTFLoader and OrbitControls. Node.js serves local previews; esbuild produces the browser bundle; Playwright runs QA. GSAP/ScrollTrigger, R3F, video/image sequences, particles, shader effects and WebGPU are conditional workflow guidance, **not tested bundled implementations**. No custom animation engine or MCP server is included.

Original code, instructions, graphics and cup geometry are MIT. The bundled Three.js code is MIT with its license at [THREE-LICENSE.txt](examples/shared/THREE-LICENSE.txt). Development dependencies retain their own licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Providers, publication and limits

No paid media provider is preconnected. [Provider adapters](docs/providers.md) are separate host workflows, not API clients, and do not claim successful authentication or generation. Video generation is optional. No telemetry, backend, database or continuous hosting is provisioned by this package. Publishing requires an available authorized provider and account.

Read [test status](docs/status.md) before relying on the release. Chromium viewport emulation cannot establish Safari or physical-device compatibility, field Core Web Vitals, or actual plugin activation. No public-directory approval is claimed.

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). Keep keys and customer content out of source archives. Report a minimal reproduction without secrets.

## Inspirations and References

[MotionSites](https://github.com/MotionSites-AI/claude-skill) was researched as a technical reference. Its prompt/media collection is not redistributed or used by these examples. See [research and architecture](references/architecture.md) for findings and license boundaries.

This independent project is not an official OpenAI product and is not endorsed by OpenAI or MotionSites.
