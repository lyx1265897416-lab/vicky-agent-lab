# Performance checks — v1.14 (2026-10-26)

## What changed

- Home uses a 303-byte progress script instead of loading the 1,110,437-byte course/source bundle and lesson renderer. The hero and its genuine thumbnail are present in HTML; home/gallery critical CSS is inline, and gallery cards are prerendered to avoid waiting for JavaScript and extra CSS/image round trips.
- Home shell (HTML + declared local JS/CSS, conservative raw-file budget): 124,183 bytes (includes inline critical CSS and the genuine hero thumbnail). Thirteen local WebP gallery posters total 385,944 bytes; every poster is below 100 KB. Original source URLs are retained in `gallery/posters/sources.json`.
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

## First public check and additional fix

The initial v1.14 public check had LCP 5,956 ms, DOM ready 6,406 ms, CLS 0, no long tasks, no external requests, and 199,394 bytes of resource bodies. Several GitHub Pages requests took 1.8–3.2 seconds; local metrics alone were not sufficient. A second pass therefore inlined critical home/gallery CSS, embedded the 31,912-byte real hero thumbnail, prerendered gallery cards, preloaded lesson rendering scripts, and inlined the small home/gallery startup scripts so initial controls need no additional script round trips. The final online result is checked after this follow-up deployment.

## Final public verification

Public code commit `160306a`, GitHub Pages run `40318644272` succeeded. Actual desktop-browser observation on `index.html?v=1.14&rev=160306a&perf=1`: LCP 3,708 ms, CLS 0.018, no long tasks, no third-party requests, all seven visible/nearby images loaded. DOM ready was 8,414 ms; first visibility improved, but this network/host still had document-loading delay. The final 7 subresource entries total 145,479 encoded bytes, **excluding** the HTML document (critical CSS, hero and startup JS are now inline); do not compare that number directly with the older subresource-only total as if it were total transfer size.

The public OpenResume clip reached readyState 4 and the end at 15.6 s. Scrolling away left zero players. No browser console errors were observed. These are individual runs with differing cache/connection state; no guarantee of worldwide or mainland-China latency is made. Subsequent deliveries must repeat the public check rather than relying on these results.
