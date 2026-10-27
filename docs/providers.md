# Provider status

| Provider | Available route | Verified status in this release |
| --- | --- | --- |
| Local original assets | Bundled CSS/SVG and GLB | Used by demos; no authentication |
| OpenAI image generation | Discover host image-generation tool | Tool available in authoring environment; no paid call made, no output claimed |
| OpenAI video | Discover supported host/API capability from current official docs | No authenticated adapter or generation tested |
| Runway | Official API with bearer key and version header | Documentation inspected; no credentials or metered request used |
| Kling | Separate native provider or supported intermediary | No direct integration/authentication tested |

The files in `providers/` are isolated workflow adapters for the host agent. They are not executable API implementations. The v0.1.0 plugin deliberately has no network media client; none is required for its baseline workflow. Discover current tools and schemas at runtime and get consent for costs before generation. Do not report a provider as connected merely because documentation exists.

Research: https://docs.dev.runwayml.com/api/ documents text/image generation tasks and bearer authentication; https://docs.dev.runwayml.com/guides/models/ includes Kling models through Runway. Access through an intermediary is not proof of a direct Kling connection. OpenAI tool availability depends on the active host/account, independently of this skills package.
