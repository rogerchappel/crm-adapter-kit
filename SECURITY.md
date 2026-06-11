# Security

`crm-adapter-kit` is designed for local planning and dry-run workflows. It should not require live CRM credentials for tests, examples, or smoke checks.

## Reporting a Vulnerability

Please report security issues privately through GitHub Security Advisories for this repository when available, or open an issue without sensitive details.

## Data Handling

- Do not commit real CRM exports, customer data, tokens, or account identifiers.
- Keep fixtures synthetic and small.
- Review generated action plans before wiring them to any live provider.
