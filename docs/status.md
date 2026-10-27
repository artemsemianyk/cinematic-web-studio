# Verification and release status

Tested 2026-10-27. This is a skills-only developer preview, version 0.1.0.

## Passed

- `npm test`: 4 tests, 0 failures. Portable manifest/presentation, eight parsed skills with resolved references, binary GLB geometry, reusable scaffolding including HTML injection escaping and overwrite rejection.
- `npm run build`: local Three.js bundle built successfully.
- `npm run test:browser`: 11 checks, 0 failures in Chromium 149.0.7827.55. Four pages at 1440×1000 and 390×844, reduced motion, missing-model and unavailable-WebGL fallbacks.
- Separate Aurore project created with the packaged scaffold: 5 browser checks, 0 failures, including desktop/mobile real GLB and scroll story. Source is exportable without the plugin installed.
- Browser checks cover loaded geometry, rendered pixel changes, rotation/reset buttons, desktop pointer orbit, scroll chapters, camera travel, reverse scrolling, media/network and JavaScript errors, horizontal overflow and anchor targets.
- Screenshots inspected: coffee desktop/mobile, product landing and scroll chapter. Original cup is visibly rendered, text is legible and primary controls fit the tested mobile viewport.
- `npm audit --omit=dev`: zero reported runtime vulnerabilities at test time.
- Dependency licenses inspected: Three.js MIT, esbuild MIT, yaml ISC, Playwright Apache-2.0. No MotionSites assets copied.

Evidence: [browser report](evidence/browser-report.json), [separate export acceptance](evidence/export-acceptance-report.json), [asset sizes](evidence/asset-sizes.json), and PNG screenshots in this directory.

The first sandboxed browser launch failed before a page opened; the same harness passed after authorized execution outside the restricted Windows sandbox. The test used installed Chromium via CWS_CHROMIUM. CI installs Playwright's matching Chromium and may therefore use a different version; a local pass is not a claim that remote CI has already run.

## Acceptance boundary

The coffee prompt was implemented through the packaged workflow and a separate template export. This is a technical integration test, not proof of automatic skill activation in ChatGPT. Direct installed-plugin invocation and fresh/existing-chat onboarding remain unverified unless a later account report explicitly records them. No inaccessible host behavior is claimed as passed.

## Distribution

Repository: https://github.com/artemsemianyk/cinematic-web-studio . The account-specific Plugin Creator URL and release publication outcome are delivered separately in the creation report. An account-saved private plugin is not a public directory listing, and may still require the user to click Install.

## Public directory preparation gaps

Eight skills, original icon, author metadata, review prompts and release notes are prepared. No MCP review cases are required for this skills-only package. Public submission remains blocked on verified publisher identity in the portal, country targeting, commerce declaration, and verified website/support/privacy/terms URLs. Policy text and legal attestations must reflect the publisher's confirmed practices; they have not been invented. No public submission or approval is claimed.

## Remaining test limits

No physical-device, Safari, Firefox, field Core Web Vitals or paid media-provider integration test. GSAP, R3F, WebGPU and video generation are optional guidance rather than tested demo code. No production hosting is provisioned.
