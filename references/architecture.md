# Research and architecture decision

Research date: 2026-10-27. MotionSites repository revision inspected: faa30d512e3973e58675c72101a7ef42ed37ae83.

## MotionSites findings

Inspected README, LICENSE, the main SKILL, assets guidance, technique index, scroll/media/3D recipes and an example prompt at https://github.com/MotionSites-AI/claude-skill . The system is a Claude skill/plugin with instructions, recipe references, examples, media contact sheets and a screenshot helper. Its workflow moves from brief and visual references to media, specification, code and screenshot-driven revision. It documents HTML/CSS/JS, Three.js, GSAP and React variants, with video, pointer, scroll, typography, surface and shader effects. Ready media and prompts reduce authoring effort; generation is delegated to external tools when available. This does not establish any authenticated generation integration.

Its LICENSE separates MIT instructions/references/scripts from restricted example prompts and media collections. Cinematic Web Studio redistributes none of those collections and copies no recipes. MotionSites is an inspiration, not an author or dependency of this package. The product website https://motionsites.ai/ presents a design/prompt library; public access does not grant unrestricted asset redistribution.

Our improvements focus on portable Agent Plugins packaging, isolated skill responsibilities, self-contained original assets, deterministic local exports, no mandatory CDN/media service, actual GLB interaction and reproducible browser assertions. Tradeoff: a much smaller asset/recipe library and no hosted generation service.

## Plugin architecture

Root Agent Plugins 1.0 manifest plus eight skills and supporting source. The architect is the natural-language entry point; the host AI provides reasoning/code edits and invokes available file/shell/browser tools. The local scaffold copies a selected starting template, and the host customizes it. It is not represented as a general-purpose text-to-website API.

An MCP server would duplicate the host's local file/build/browser operations at this stage and introduce hosting/authentication costs. It is therefore omitted. A future browser-only hosted generator would need a real HTTPS service, authorization, isolated jobs, asset storage and concrete tested tools; a local stdio server cannot automatically serve ChatGPT Web users.

Official packaging references: https://developers.openai.com/plugins/build/plugins , https://developers.openai.com/plugins/build/skills , https://developers.openai.com/plugins/deploy/submission . The portable root manifest is chosen over the supported compatibility overlay. Public directory publication remains separate from private account registration.
