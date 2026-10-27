# Runway host workflow adapter

Status: optional; no authenticated API client or generation result is bundled.

1. Discover a real tool for this provider in the active host; inspect its current schema and official documentation. Do not invent endpoint/model identifiers.
2. Check authorization and requested media type, rights to inputs, budget and output destination. Obtain user approval before a metered call. Missing auth is a blocker for this adapter only.
3. Pass only necessary input via the supported tool. Keep credentials in the host's secure store; never embed them in frontend code or archives.
4. Follow returned job IDs/status using the documented completion flow. Treat failure, timeout and cancellation explicitly; do not blindly create duplicate billable jobs.
5. Verify the actual result, dimensions/duration, artifacts, license and suitability. Save provenance and prepare a local optimized asset plus fallback.
6. If unavailable, return to local/user-provided media and report the limitation. Never label an unrun request successful.
