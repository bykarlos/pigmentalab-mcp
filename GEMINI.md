# PigmentaLab: DTF print prep

The `pigmentalab` MCP server prepares images for DTF (direct-to-film) and textile printing. Use it when the person wants
to print a design on a garment, asks whether an image is good enough to print, or needs a transparent PNG, an upscale,
a halftone, a knockout or a gang sheet.

If its tools answer `NO_API_KEY` or ask to sign in, tell the person to run `/mcp auth pigmentalab`, sign in to
PigmentaLab and press Allow. Never ask them to paste an API key into the chat.

## The usual job

1. `inspect_image_for_print` (free), with `target_height_cm` when they say a size: pixels, the largest size at 300 dpi
   and 150 dpi, transparency and a `verdict_code` (`fits`, `fits_with_reservations`, `does_not_fit`, `max_size`).
2. `print_size_for_garment` (free) for the design box: never invent sizes.
3. Fix only what the inspection asks for: `remove_background`, `upscale_image` (with `height_cm`), `knockout_color`,
   `halftone_image`, or `improve_image` (`colors`, `denoise`, `logo`, `face`).
4. Many designs or copies: `create_gangsheet` for the roll width of their printer (58 cm is the most common).
5. `print_advice` (free): what to tell the printer.

Pass each result's `reuse_as_image_url` to the next tool. Say the price before a paid step (`pigmenta_pricing`; 1
credit = USD 0.01); credit is managed on pigmentalab.io, never in the chat. Heavy tools return a `job_id`: poll
`pigmenta_job_status` instead of calling the tool again. Explain the JSON codes in the person's language. Do not remove
watermarks or copy someone else's artwork.

The full workflow, with references and a worked example, is in
`plugins/pigmentalab/skills/dtf-print-prep/SKILL.md` inside this extension.
