# PRD: crm-adapter-kit

Status: release-candidate

## Pitch

A provider-neutral CRM adapter contract for agents: contacts, accounts, deals, notes, tasks, and dry-run writes.

## Goals

- Provide a local-first CLI and library API.
- Keep external writes out of scope for v1.
- Make outputs deterministic enough for fixture-backed tests.

## Non-goals

- Live provider writes.
- Secret storage.
- Publishing packages or releases from this repo.
