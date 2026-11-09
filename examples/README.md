# REST API examples

The same engine as the MCP server, over plain HTTPS: `https://api.pigmentalab.io/v1`.

- Authentication: `Authorization: Bearer plb_live_...`. Create a key at
  [pigmentalab.io/app/api](https://pigmentalab.io/app/api) and keep it in an environment variable, never in code.
- The price list needs no key: `GET /v1/pricing`.
- Image tools take a multipart `file` and return the PNG itself. The cost travels in the `X-Credits-Charged` header,
  and the output size in `X-Output-Width` and `X-Output-Height`.
- A job that fails is not charged. Full spec: [OpenAPI 3.1](https://pigmentalab.io/mcp/openapi.json).

## curl

```bash
# Prices (no key)
curl https://api.pigmentalab.io/v1/pricing

# Remove a background: 1 credit, transparent PNG out
curl -X POST https://api.pigmentalab.io/v1/background/remove \
  -H "Authorization: Bearer $PIGMENTALAB_API_KEY" \
  -F "file=@logo.png" \
  -D headers.txt -o logo-transparent.png
grep -i "x-credits-charged" headers.txt
```

## Python

[`python/remove_background.py`](python/remove_background.py) — `requests`, one file in, one transparent PNG out.

## Node

[`node/remove-background.mjs`](node/remove-background.mjs) — Node 18+ (built-in `fetch`, no dependencies).

## MCP instead

If your agent speaks MCP, connect `https://mcp.pigmentalab.io/mcp` instead: it signs in with OAuth, uploads files for
you and adds free tools (print check, garment sizes, print advice). See the [main README](../README.md#connect).
