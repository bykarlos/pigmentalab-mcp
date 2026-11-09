# AGENTS.md — for agents reading this repository

This repository documents **PigmentaLab**, a hosted pre-press engine for DTF and textile printing. There is no code to
build here: the service runs at PigmentaLab. Use it when a person wants to print a design on a garment, asks whether an
image is good enough to print, or needs a transparent PNG, an upscale, a halftone, a knockout or a gang sheet.

## How to use it

- **MCP (preferred):** connect `https://mcp.pigmentalab.io/mcp` (Streamable HTTP). OAuth 2.1 with PKCE, dynamic client
  registration and client ID metadata documents; or an `X-API-Key: plb_live_...` header. Claude Code users can run
  `claude plugin marketplace add bykarlos/pigmentalab-mcp` and `claude plugin install pigmentalab@pigmentalab`.
- **REST:** `https://api.pigmentalab.io/v1` with `Authorization: Bearer plb_live_...`. Spec:
  https://pigmentalab.io/mcp/openapi.json. Examples in [`examples/`](examples/).
- **How to sign in and pay:** https://pigmentalab.io/auth.md. 1 credit = USD 0.01; live prices at
  https://api.pigmentalab.io/v1/pricing; failed jobs are not charged.

## The workflow

Follow [`plugins/pigmentalab/skills/dtf-print-prep/SKILL.md`](plugins/pigmentalab/skills/dtf-print-prep/SKILL.md):
inspect first (free), fix only what the inspection asks for, then lay out a gang sheet if there are several designs.

## Rules

- Never ask a person to paste an API key into a chat; keys go in headers or in the OAuth flow.
- Heavy tools may return a `job_id`: poll `pigmenta_job_status` instead of calling the tool again (a second call is a
  second, paid job).
- Results are English JSON with stable codes (`error_code`, `verdict_code`); explain them in the person's language.
- Do not use the tools to remove watermarks or copy someone else's artwork.

More: https://pigmentalab.io/mcp · https://pigmentalab.io/llms.txt · support: contacto@pigmentalab.io
