---
name: dtf-print-prep
description: Prepare images for DTF and textile printing with PigmentaLab. Use when someone wants to print a design on a t-shirt, hoodie, cap, bag or fabric, asks whether an image is good enough to print, needs a transparent PNG at 300 dpi, the right print size for a garment, a halftone, a knockout or a gang sheet.
---

# DTF print prep with PigmentaLab

PigmentaLab (https://pigmentalab.io) is a pre-press engine for DTF (direct-to-film) and textile printing. This plugin
connects its MCP server, `pigmentalab`. The first time a tool runs, Claude Code asks the person to sign in to
PigmentaLab and press Allow. Tools are paid from the account's API credit (1 credit = USD 0.01); the inspection, the
size table, the print advice and the price list are free.

## The usual job: "print this on a t-shirt"

1. `inspect_image_for_print` (free): real pixels, the largest size it prints well at 300 dpi (optimal) and 150 dpi
   (minimum), transparency and a verdict.
2. `print_size_for_garment` (free): the design box for the garment, placement and size. Do not invent sizes: an adult
   t-shirt full front is 27 x 35 cm in M; a left-chest logo about 10 x 10 cm.
3. Fix only what the inspection asks for:
   - background to remove: `remove_background` (transparent PNG, no halos);
   - too small for the size: `upscale_image` (the `logo` engine for logos, flat art and lettering);
   - a color to drop so the garment shows through: `knockout_color`;
   - gradients on a dark garment: `halftone_image`;
   - dull colors, noise, a soft logo or a blurry face: `improve_image`.
4. Several designs or copies: `create_gangsheet` packs them on the roll by their real silhouette. Ask the roll width of
   the person's printer or print shop (58 cm is the most common).
5. `print_advice` (free): what to tell the printer for the technique (DTF, UV DTF, sublimation, screen printing, vinyl,
   embroidery).

Each result has a `reuse_as_image_url`: pass it to the next tool instead of uploading again.

## What a good DTF file is

- PNG with a transparent background, at 300 dpi at the real print size (30 cm wide = 3543 px). Never JPG.
- Alpha fully on or off: half-transparent pixels (shadows, glows, soft edges) print with a halo or a white rim.
- Lines and letters at least 1 mm printed. Print at the exact size of the file, without scaling it in the RIP.
- Sublimation is different: white or light polyester, white is not printed, 150 dpi is enough.

## Working rules

- Keep the person's artwork as it is. Run only the fixes the inspection asks for, and say what each one changes.
- Images: pass a local file's public URL or a URL from a previous result. If the image is only on the person's
  computer, `pigmenta_create_upload` gives them a short-lived upload page in their language.
- Heavy tools may return a `job_id`: poll `pigmenta_job_status`. Calling the tool again starts and charges a second job.
- `pigmenta_pricing` tells what a tool costs and `pigmenta_account` shows the balance. A job that fails is not charged.
- Never ask the person to paste an API key into the chat.
- Do not use the tools to remove a watermark or to copy someone else's trademark or artwork: say why and stop.
- Results are JSON in English with stable codes (`error_code`, `verdict_code`): explain them in the person's language.
- `pigmenta_guide` has the rest of what the PigmentaLab Bot knows (sizes, halftones, knockout, gang sheets,
  sublimation, patterns, account).
