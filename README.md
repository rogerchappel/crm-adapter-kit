# crm-adapter-kit

Provider-neutral CRM primitives and dry-run action plans for agents.


## Quickstart

Run the tool from a fresh checkout:

```sh
npm install
npm run build
node bin/cli.js --help
npm test
```

The help command is a quick smoke test for the CLI entrypoint, and `npm test` runs the committed regression suite before you depend on the output.

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
npm run smoke
```

See [docs/CLI.md](docs/CLI.md) for command examples, local-only adapter scope, and exit behavior.

Run a fixture-backed summary:

```sh
crm-adapter-kit summary --adapter fixtures/sample.json
```

Expected output shape:

```json
{
  "contacts": 2,
  "accounts": 2,
  "deals": 2
}
```

Plan a dry-run follow-up task without touching a CRM provider:

```sh
crm-adapter-kit plan-task --adapter fixtures/sample.json --contact "Ada Lovelace" --follow-up "Send deck"
```

The result is marked as a dry run and includes the planned action type,
contact id, title, and rationale.

## Verify

Run the local validation command before opening a pull request:

```sh
npm run release:check
```

For release hygiene, confirm the package contents before publishing:

```sh
npm run package:smoke
```

## Limitations

- `crm-adapter-kit` reads local fixture data only. It does not authenticate to,
  query, or mutate Salesforce, HubSpot, or any other CRM provider.
- Dry-run plans are deterministic previews for review. They are not delivery
  confirmations and must be mapped to a real provider adapter before execution.
- Fixture data should stay synthetic. Do not commit customer records, private
  notes, access tokens, or exported CRM payloads.

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
```

The package smoke check prints the tarball contents so missing runtime files are caught before release.
