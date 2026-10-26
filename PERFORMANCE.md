# Performance checks — v1.14 (2026-10-26)

## What changed

- Home uses a 303-byte progress script instead of loading the 1,110,437-byte course/source bundle and lesson renderer. The hero is present in HTML and its image is preloaded.
- Home shell (HTML + declared local JS/CSS, conservative raw-file budget): 81,885 bytes. Thirteen local WebP gallery posters total 385,944 bytes; every poster is below 100 KB. Original source URLs are retained in `gallery/posters/sources.json`.
- Lessons load only the catalog and selected lesson. The materials page loads the catalog plus the selected asset; full-text search is fetched only when used. All 120 original asset bodies are byte-for-byte checked against the canonical source. All eight lessons are compared after display-only image URL substitutions.
- Course screenshots have lighter display copies in `media/previews/`; original-resolution PNG links/downloads are preserved. The shared official course-video poster is hosted locally.
- Five genuine video previews are compressed MP4s, 19 KB–1.94 MB, requested only after clicking. These are silent excerpts, not full original videos. Full author/source links remain. Presenton's unreliable signed video URL is replaced by its actual template preview/experience link. `gallery/clips/sources.json` records media provenance.
- Gallery releases the video element, decoder, source request and any HLS instance when offscreen, filtered out or hidden. Only one player is active. Load failure has a 15-second bound, retry and source link. GIF preview is replaced by a compressed MP4. Expensive backdrop blur is removed.
- Notes autosave is debounced and flushed on page exit. Opt-in `?perf=1` diagnostics run for 10 seconds only and send no telemetry.

## Local browser observations

Same machine, 1280px desktop viewport, local HTTP. These are individual observed runs, not a controlled benchmark or a promise for other networks. The baseline already used the optimized gallery posters, making the resource comparison conservative. Browser cache and connection state may affect timings.

| Observation | Before page-data cleanup | After cleanup |
| --- | ---: | ---: |
| Resource encoded bodies, excluding document | 1,419,626 B | 246,858 B |
| DOMContentLoaded | 8,640 ms | 535 ms |
| LCP | 10,732 ms | 772 ms |
| CLS | 0.1365 | 0 |
| Long tasks in observation window | 3 / 948 ms | 0 |
| Third-party requests before interaction | 0 (posters already optimized) | 0 |

Further media/display optimizations happened after this sample. Public-deployment observations are recorded below separately, rather than substituting local speed for real hosting speed.

## Functional and regression checks

- All five local clips decoded successfully and were played in the actual browser (readyState 4, playback time advanced). Filtering and scrolling away left zero video elements; reopening playback worked. Only one player remained during transitions.
- All eight lessons opened; step counts remained 4/5/5/5/5/5/6/6 (41 steps).
- Materials: requested novice guide, full-text search for `负责人`, selected meeting Skill, copy, and rapid resource navigation. Concept search for `Skill` returned one result. Local test note persisted after reload and was cleared afterward.
- Desktop and 390px-width rendered views inspected for home, gallery and lesson 6. No overlapping text or visible horizontal overflow; preview images remain real and readable.
- Changed JavaScript passed syntax checks; 214 local HTML references checked (the existing absolute `/vicky-agent-lab/` root link in 404.html resolves to the public site). No observed browser console errors in the regression session.
- `node tools/check-performance.cjs` passes: eight lessons, 120 original asset bodies, home shell and poster budgets.

## Repeat before every delivery

Follow `AGENTS.md`. Generate lazy payloads after source edits; run the checks; inspect desktop/mobile and critical interactions; verify the published version. Don't infer mainland-China or mobile-network performance from this machine. GitHub Pages and external experience links remain network-dependent.
