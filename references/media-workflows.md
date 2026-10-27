# Media preparation

Prefer suitable user-owned or verified licensed assets, then original bundled assets, then simple original SVG/CSS, then authorized generation. Record author, source, license, permitted redistribution and transformations. Public accessibility alone is not a license.

The cup GLB is original geometry authored for this project. Its source is scripts/create-model.mjs; it is MIT. The CSS product sculpture and icon are also original. There are no downloaded stock images, fonts or MotionSites media in the demos.

For images retain source originals and generate appropriately sized WebP/AVIF/PNG variants with explicit dimensions and alt text. Preserve transparency when requested. For textures assign color space deliberately and avoid unnecessary resolution.

For footage use an installed ffmpeg, with paths passed as individual arguments. A typical web transcode uses H.264, yuv420p, no unnecessary audio and `-movflags +faststart`; choose dimensions/CRF based on measured quality and payload. Extract a poster and inspect first/middle/last frames. Scrubbing needs usable keyframe intervals and browser seek tests. Do not promise seamless loops without inspecting the seam. Never upload user assets to a provider without appropriate authorization.
