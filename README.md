# crm-adapter-kit

Provider-neutral CRM primitives and dry-run action plans for agents.

## Quickstart

```bash
npm test
npm run smoke
crm-adapter-kit --help
```

## What It Does

A provider-neutral CRM adapter contract for agents: contacts, accounts, deals, notes, tasks, and dry-run writes.

The package is local-first: it reads fixtures or project files and emits deterministic JSON/Markdown output. It does not publish, post, sync, or write to external accounts.

## Examples

See [examples/basic.md](examples/basic.md) and the fixture-backed tests in [tests/core.test.js](tests/core.test.js).

## Limitations

- V1 uses local fixtures and static checks only.
- Live provider integrations require a separate approval and adapter layer.
- Generated plans are review artifacts, not authorization to perform external writes.

## Verification

```bash
npm test
npm run check
npm run build
npm run smoke
npm run package:smoke
npm run release:check
bash scripts/validate.sh
```

`npm run release:check` is the release-candidate gate used by CI. It checks
syntax, runs the Node test suite, executes the CLI smoke path, and performs an
npm pack dry-run.
