# Codes the tools return, and what to do

The tools answer in English JSON with stable codes. Explain them to the person in their language.

## `verdict_code` (from `inspect_image_for_print`)

| Code | Means | What to say or do |
|---|---|---|
| `fits` | 300 dpi or more at the size asked | It prints sharp at that size. No upscale needed. |
| `fits_with_reservations` | between 150 and 300 dpi | Fine from a distance, soft up close. Offer `upscale_image` to reach 300 dpi. |
| `does_not_fit` | under 150 dpi | Too small for that size. Give the largest reasonable size (`max_print_height_cm.at_150dpi_minimum`) and offer `upscale_image`. |
| `max_size` | no size was asked | Give the largest size at 300 dpi and at 150 dpi, and ask what size they want. |

Read the `warnings` out too: no transparency (remove the background before it goes on a garment), a CMYK file (the
tones can shift), a DPI the file declares but that cannot be trusted (the size is measured by pixels), a very small
image, or ink over almost the whole surface (check the cost of the sheet). `alpha.soft_edge_ratio` above zero means
half-transparent edges.

## `error_code`

| Code | Means | What to do |
|---|---|---|
| `NO_API_KEY` | the connection has no PigmentaLab account | Reconnect the server and sign in (Step 0 of the skill). Never ask for a key in the chat. |
| `UNAUTHORIZED` | the sign-in was revoked or the key is wrong | Reconnect PigmentaLab and sign in again. |
| `INSUFFICIENT_BALANCE` | not enough API credit; `required_credits` says how much | Say how many credits are missing and that credit is managed on pigmentalab.io. Do not retry. |
| `RATE_LIMITED` | too many requests in a short time | Wait a minute and try once more. |
| `BUSY` | the engine is busy | Try again in a few minutes. |
| `BAD_INPUT` | a parameter is missing or wrong | Read `error`, fix the call and run it again. |
| `NO_INPUT` | no image was given | Pass a public URL, a `reuse_as_image_url` or an upload handle. |
| `BAD_IMAGE` | the file is not an image the tool can read | Ask for a PNG or a JPG. |
| `IMAGE_TOO_LARGE` | the image is over the size limit | Read `error` for the limit; send a smaller file. |
| `LIST_MISMATCH` | gang sheet: `quantities` or `heights_cm` do not have one value per piece | Send one value per piece, in the same order, or none. |
| `TOO_MANY_PIECES` | gang sheet: more than 40 different pieces | Split them into two sheets. |
| `NO_JOB` | the gang sheet did not start | Nothing was charged: try once more. |
| `JOB_NOT_FOUND` | the `job_id` is unknown or expired | Do not rerun the tool blindly: that starts and charges a new job. Ask the person first. |
| `UNKNOWN_GARMENT`, `UNKNOWN_PLACEMENT`, `UNKNOWN_SIZE`, `PLACEMENT_NOT_FOR_GARMENT` | `print_size_for_garment` got a value it does not know | The answer lists the valid values: pick the closest and call again. |
| `INTERNAL`, `API_ERROR` | something failed on PigmentaLab's side | A failed job is not charged. Try once more; if it fails again, the person can write to contacto@pigmentalab.io. |
