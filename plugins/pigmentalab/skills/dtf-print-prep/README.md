# DTF print prep

An agent skill that turns "print this on a t-shirt" into a print-ready file for DTF (direct-to-film) and textile
printing: a transparent PNG at 300 dpi at the real print size, checked first and fixed only where it needs it.

It works in any language. Ask in your own words:

- *Can this image be printed 30 cm tall on a black t-shirt?*
- *Remove the background of this logo for DTF.*
- *What size goes on the chest of a kids' t-shirt, size 8?*
- *Make a halftone of this design for a dark hoodie.*
- *Lay out 20 copies of this 8 cm logo on my 58 cm roll.*

## What it needs

- **The PigmentaLab MCP server**, connected in your agent: `https://mcp.pigmentalab.io/mcp`. The skill explains to the
  agent how to connect it in Claude Code, Cursor, VS Code with Copilot, Gemini CLI and any agent that supports
  remote MCP servers.
- **A PigmentaLab account.** You sign in once, when you connect the server, and press Allow. No API key goes into the
  chat.

## What it costs

The skill is free. The inspection, the size table, the print advice and the price list are free. The image tools
(background removal, upscale, knockout, halftone, improve, gang sheet) use the API credit of your PigmentaLab
account: 1 credit = USD 0.01, a background removal is 1 credit, and the agent tells you the price before a paid
step. A job that fails is not charged.

## Privacy and network

The skill itself is text: it runs no code and makes no network calls. The agent calls the PigmentaLab MCP server
that you connect, and the images it sends to those tools go to PigmentaLab (pigmentalab.io) to be processed. Results
come back as download links that expire after four hours. Privacy policy: https://pigmentalab.io/en/privacy

## Files

| File | What it is |
|---|---|
| `SKILL.md` | The instructions the agent follows |
| `references/dtf-file-rules.md` | What a good DTF file is, pixels per print size, sizes by garment, other techniques |
| `references/codes.md` | Every code the tools return, and what to say or do |
| `examples/left-chest-logo.md` | A full run with real outputs |

## About

Made by PigmentaLab, a pre-press engine for DTF and textile printing. Documentation: https://pigmentalab.io/mcp ·
Source: https://github.com/bykarlos/pigmentalab-mcp (MIT) · Help: contacto@pigmentalab.io
