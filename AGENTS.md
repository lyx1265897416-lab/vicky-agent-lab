# Website delivery checks

The user explicitly requires checking loading speed and responsiveness before every website result is returned.

- Run `node tools/split-course.cjs` after changing the canonical `course-content.js`.
- Run `node tools/build-critical.cjs` after editing shared CSS, gallery cases, gallery renderer or the homepage hero poster.
- Run `node tools/check-performance.cjs`, syntax-check changed scripts, and check `git diff --check` before release.
- Use the browser to inspect the changed pages at desktop and phone widths. Verify visible images, no overflow or overlapping text, main interactions, and no new console errors.
- For performance changes, open representative pages with `?perf=1`, read `#performance-report`, and save actual observations in `PERFORMANCE.md`. Diagnostics are opt-in and send no telemetry.
- Initial home/gallery load must not fetch remote media or full `course-content.js`; videos must load only on click and release network/decoder resources when hidden, offscreen, or filtered out.
- After publishing, confirm GitHub Pages deployment success and the public version; test an online page and critical interaction. State any untested scope or external-network limits honestly. Do not claim global or mainland-China latency from one local measurement.
- Keep original course text and downloadable learning materials intact. Verify lazy payloads match the canonical source; retain attribution for media derivatives.
