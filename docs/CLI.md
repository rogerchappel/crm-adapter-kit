# CLI

```sh
crm-adapter-kit summary --adapter fixtures/sample.json
crm-adapter-kit list-contacts --adapter fixtures/sample.json --query Ada
crm-adapter-kit plan-task --adapter fixtures/sample.json --contact Ada --follow-up "Send deck"
```

The CLI reads local fixture files only. Network adapter paths are rejected before data is loaded.

Exit behavior:

- `0`: help or command completed successfully.
- `1`: command failed, the adapter path was out of scope, the fixture could not be loaded, or the requested contact was not found.

Fixture-backed verification:

```sh
npm test
npm run smoke
```
