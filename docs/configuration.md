# Configuration

No secrets or provider configuration are required for bundled examples. `PORT` changes the local server port (default 4173); it binds only to 127.0.0.1. `CWS_TEST_PORT` changes the browser test port (4174). `CWS_TEST_OUTPUT` changes its artifact directory. `CWS_CHROMIUM` optionally selects an installed Chromium executable; otherwise Playwright uses its managed browser.

Use Node.js 22+ and Python 3.10+. `npm ci` respects the lockfile. `node scripts/create-model.mjs` regenerates the original GLB; `npm run build` rebuilds the browser bundle and copies the Three.js license. GLB creation is deterministic geometry generation, not an AI model API.

Use the host's secure credential mechanism for any future provider. Do not add secrets to HTML, JavaScript, manifests, prompts, repository files or ZIPs.
