# Installation

This package uses Agent Plugins 1.0: root `plugin.json`, fixed `skills/` discovery and OpenAI presentation/onboarding under `extensions.com.openai`. No legacy ai-plugin.json, hooks, app binding or fake MCP endpoint is needed.

For the account-saved private version, open the verified Plugin Creator URL supplied in the creation report, install/enable it in the supported host and select Cinematic Web Studio in the composer. Run setup, then the coffee prompt in `usage.md`. If the plugin is installed during an existing conversation, the host may need a fresh chat before its skills appear. Registration and installation are distinct; check status for evidence.

For portable distribution, use the ZIP's single `cinematic-web-studio/` directory in a host supporting Agent Plugins. Codex desktop also supports local or repository marketplaces; register this directory through the host's plugin-creator/local-marketplace workflow rather than editing unknown global configuration. A GitHub source ZIP is not itself proof of installation in ChatGPT Web.

Required for full operation: a coding-capable host, writable workspace, Node.js 22+, browser tooling and archive support. Python 3.10+ is used by the package helper. npm and network access are needed only for rebuilding/testing dependencies. No media/API credentials are required. Hosts without an executor can receive source but cannot run the local scripts.

Official sources checked 2026-10-27:
- https://developers.openai.com/plugins/build/plugins
- https://developers.openai.com/plugins/build/skills
- https://developers.openai.com/plugins/deploy/submission

Public directory submission requires separate publisher verification, listing/policy URLs and review steps. Private creation does not constitute public approval.
