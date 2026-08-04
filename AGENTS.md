# AGENTS.md

## Goal

Investigate the slow ticket dashboard without implementing a fix. Build a
small, evidence-backed map from the observed request to the relevant code.

## Commands

```bash
pnpm install
pnpm dev
pnpm verify
pnpm reset
```

The application runs at `http://localhost:3001` and requires Node.js 24-26.

## Boundaries

- Do not patch, refactor or optimize application behavior.
- Inspect only files connected to verified runtime evidence.
- Temporary logs are allowed, but remove them before finishing.
- Do not read `.env`, credentials, personal folders or unrelated files.
- Separate verified facts from hypotheses.
- Stop when additional access or a broader scope is required.
- Keep the application diff empty at the end of the investigation.

## Expected output

Provide a concise path with file and symbol references, one tested hypothesis,
one open question and one area intentionally kept out of scope.
