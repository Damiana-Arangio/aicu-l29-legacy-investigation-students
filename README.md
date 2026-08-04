# Ticketing legacy investigation

A self-contained ticketing dashboard for L29. The application intentionally
contains a slow loading path that must be investigated before any code change.

## Requirements

- Node.js 24, 25 or 26
- pnpm 11

## Start

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3001>.

## Checks

```bash
pnpm verify
```

## Reset local data

```bash
pnpm reset
```

No API key, environment file or external service is required.
