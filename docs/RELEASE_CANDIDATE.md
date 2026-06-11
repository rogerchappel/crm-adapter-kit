# Release Candidate Notes

## Verification

- npm test
- npm run check
- npm run build
- npm run smoke
- npm run package:smoke
- npm run release:check

## Classification

ship: v1 is useful for local agent workflows with fixtures and dry-run behavior.

## Known Limits

- No live provider integrations.
- Markdown/JSON outputs are intentionally conservative.

## Package Surface

- The npm tarball exposes the CLI through `crm-adapter-kit`.
- The package export exposes the provider-neutral summary/list/plan helpers.
- `npm run package:smoke` installs the generated tarball into a temporary project and verifies both the CLI and module export.
