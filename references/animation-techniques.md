# Animation selection and implementation

| Requirement | First choice | Escalation and verification |
| --- | --- | --- |
| Reveal, fade, hover | CSS / WAAPI | Native finite animations, reduced-motion branch |
| Decorative depth | CSS transforms and original SVG | Do not call an illustration actual 3D |
| Pinned story | CSS sticky and clamped progress | Verify start/mid/end and upward reversal |
| Complex overlapping timeline | GSAP + ScrollTrigger | Check current license, cleanup, resize and mobile behavior |
| Real camera/model/material interaction | Three.js GLTFLoader + OrbitControls | Confirm geometry and live rendered changes |
| Existing React 3D app | React Three Fiber | Reuse stack, dispose resources and avoid per-frame React updates |
| Cinematic footage | Existing rights-cleared MP4 + poster | Metadata, seek handling, codec/mobile tests |
| Exact frame scrubbing | Canvas image sequence | Bound cache, decode asynchronously, profile memory |
| Particles/shaders | One bounded WebGL scene | Stop offscreen, reduce resolution, provide fallback |
| WebGPU | Optional progressive enhancement | Request adapter, catch initialization/device loss, retain WebGL/CSS |

The original runnable recipes are in examples/shared/motion.js and src/scene.js. Scroll progress is section displacement divided by scrollable section height, clamped to [0,1]. Map it directly to object rotation and camera position so reverse scrolling restores state. Keyboard rotation remains usable with reduced motion. The renderer draws on demand and limits DPR.

The cup contains four meshes and no embedded animation clips. Other GLBs may expose clips; use AnimationMixer only when a real clip exists. Verify user-driven rotation separately from camera orbit. Controls must not prevent vertical touch scrolling.

Video and image sequences cannot replace arbitrary geometry interaction. GSAP, R3F, WebGPU, shaders, particles and media scrubbing are extension guidance, not shipped/tested demo features. Three.js docs: https://threejs.org/docs/pages/GLTFLoader and https://threejs.org/manual/pages/loading-3d-models.html .
