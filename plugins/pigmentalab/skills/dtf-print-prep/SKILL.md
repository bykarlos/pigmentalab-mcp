---
name: dtf-print-prep
description: "Use when the user asks to print a design on a t-shirt, hoodie, cap, tote bag or fabric, or says things like 'can this image be printed at 30 cm?', 'remove the background for DTF', 'make a halftone for a black hoodie', 'what size goes on the chest of a t-shirt?' or 'lay out a gang sheet for my 58 cm roll'. Prepares print-ready DTF and textile artwork with the PigmentaLab MCP server: checks resolution and transparency, removes backgrounds, upscales to 300 dpi, knocks out colors, makes halftones and packs gang sheets."
---

# DTF print prep

Turns "print this on a t-shirt" into a file a DTF printer can use: a transparent PNG at 300 dpi at the real print
size, checked first and fixed only where it needs it.

## What this skill needs

- **The PigmentaLab MCP server**, connected in the agent: `https://mcp.pigmentalab.io/mcp` (Streamable HTTP, OAuth).
  This skill runs no code and makes no network calls of its own: it tells the agent how to use that server's tools.
  When the agent calls them, the images it sends go to PigmentaLab (pigmentalab.io) to be processed, and the results
  come back as download links that expire after four hours.
- **A PigmentaLab account.** The person signs in once, when the server is connected. The inspection, the size table,
  the print advice and the price list are free. The image tools use the account's API credit (1 credit = USD 0.01):
  `pigmenta_pricing` gives the price of each one, and a job that fails is not charged.

## Step 0: check the connection

If tools such as `inspect_image_for_print` and `remove_background` are not available, the server is not connected.
Tell the person how to connect it in their agent, and wait until it is done:

- Claude Code: `claude mcp add --transport http pigmentalab https://mcp.pigmentalab.io/mcp`
- Cursor, in `~/.cursor/mcp.json`: `{"mcpServers": {"pigmentalab": {"url": "https://mcp.pigmentalab.io/mcp"}}}`
- VS Code with Copilot, in `.vscode/mcp.json`:
  `{"servers": {"pigmentalab": {"type": "http", "url": "https://mcp.pigmentalab.io/mcp"}}}`
- Gemini CLI, in `~/.gemini/settings.json`:
  `{"mcpServers": {"pigmentalab": {"httpUrl": "https://mcp.pigmentalab.io/mcp"}}}`, then `/mcp auth pigmentalab`
- Any other agent: a remote MCP server at that URL. Agents with MCP OAuth open the sign-in page by themselves.

The first time a tool runs, the person signs in to PigmentaLab and presses **Allow**. Never ask them to paste an API
key into the chat. Full guide: https://pigmentalab.io/mcp

## Step 1: the usual job, "print this on a t-shirt"

1. `inspect_image_for_print` (free), with `target_height_cm` when they say a size: real pixels, the largest size at
   300 dpi (optimal) and 150 dpi (minimum), transparency, warnings and a `verdict_code`.
2. `print_size_for_garment` (free): the design box for `garment`, `placement` and `size` (for example `t_shirt`,
   `left_chest`, `M`). Never invent sizes: an adult t-shirt full front is 27 x 35 cm in M, a left-chest logo about
   10 x 10 cm.
3. Fix only what the inspection asks for:
   - a background on a design that goes on a garment: `remove_background` (transparent PNG, no halos);
   - too few pixels for the size: `upscale_image` with `height_cm` (it reaches 300 dpi at that height). A blurry photo
     has no detail to recover: say so instead of promising a sharp print;
   - a color to drop so the garment shows through, also inside the design: `knockout_color`;
   - gradients or soft shadows on a dark garment: `halftone_image`;
   - dull colors, noise, a logo with soft or jagged edges, or a blurry face: `improve_image` with `operation`
     `colors`, `denoise`, `logo` or `face`.
4. Many designs or copies: `create_gangsheet` packs them on the roll by their real silhouette. Ask the roll width of
   the person's printer or print shop; 58 cm is the most common.
5. `print_advice` (free): what to tell the printer, by `technique` (`dtf`, `uv_dtf`, `sublimation`,
   `screen_printing`, `vinyl`, `embroidery`) and `who_prints` (`self`, `print_shop`, `not_sure`).

Each result has a `reuse_as_image_url`: pass it to the next tool instead of uploading the image again.

## What to tell the person

Answer in the person's language, in short lines:

1. The verdict, from `verdict_code` (see `references/codes.md`): the size it prints well at, and the size they want.
2. Each fix you ran, why, and what it cost (`credits_charged`). Say what changed in the artwork.
3. The download link of the final file, and that it expires in four hours.
4. If someone else prints it: the `print_advice` lines to pass on.

`examples/left-chest-logo.md` shows a full run with real outputs.

## Rules

- Keep the artwork as it is. Run only the fixes the inspection asks for. Background removal, halftones, knockout and
  gang sheets do not redraw anything.
- Images: a public URL or a `reuse_as_image_url` from a previous result. If the file is only on the person's
  computer, `pigmenta_create_upload` gives them a short-lived upload page in their language.
- Heavy tools may return a `job_id`: poll `pigmenta_job_status`. Calling the tool again starts, and charges, a second
  job.
- Before a paid step, say its price. `pigmenta_account` shows the balance. If it is short (`INSUFFICIENT_BALANCE`),
  say how many credits are missing; credit is managed on pigmentalab.io, never inside the chat.
- Do not remove watermarks or copy someone else's logo or artwork: say why and stop.
- Results are English JSON with stable codes (`verdict_code`, `error_code`): explain them, don't paste the JSON.
- `pigmenta_guide` has the rest of what PigmentaLab knows: sizes, halftones, knockout, gang sheets, sublimation and
  seamless patterns.

More: `references/dtf-file-rules.md` (what a good DTF file is, pixels per size, other techniques) and
`references/codes.md` (every code and what to say).
