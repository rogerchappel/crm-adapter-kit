# crm-adapter-kit

Provider-neutral CRM primitives and dry-run action plans for agents.

## Status

This repository is early-stage. Use it for local automation and review workflows, and verify the output before relying on it in production.

## Install

```sh
npm install
npm run build
```

## Use

Start with the built-in help or the smallest local check:

```sh
npx crm-adapter-kit --help
```
```sh
npm test
```

## Verify

Run the local validation command before opening a pull request:

```sh
npm test
```

For release hygiene, confirm the package contents before publishing:

```sh
npm run package:smoke
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution expectations. Keep changes small, reviewable, and backed by the verification command above.

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting guidance. Do not include secrets, private logs, or customer data in issues or fixtures.

## License

MIT

## Release readiness

Run the release gate before tagging or publishing:

```sh
npm run release:check
npm pack --dry-run
```

The package smoke check prints the tarball contents so missing runtime files are caught before release.
