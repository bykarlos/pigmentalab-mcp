# Example: a logo on the chest of a black t-shirt

The person attaches a logo and writes: *"I want this logo on the chest of a black t-shirt, about 10 cm."*

## 1. Inspect (free)

`inspect_image_for_print` with `target_height_cm: 10`. Real output, trimmed:

```json
{
  "width_px": 1000,
  "height_px": 1000,
  "max_print_height_cm": { "at_300dpi_optimal": 8.5, "at_150dpi_minimum": 16.9 },
  "alpha": { "has_alpha": false, "opaque_ratio": 1.0, "soft_edge_ratio": 0.0 },
  "warnings": ["It has no transparency: if the design goes on a garment, remove the background first."],
  "verdict_code": "fits_with_reservations",
  "dpi_at_requested_height": 254.0,
  "credits_charged": 0
}
```

Two things to fix: the white background would print as a white square on the black shirt, and 254 dpi is under 300.

## 2. Check the size (free)

`print_size_for_garment` with `garment: "t_shirt"`, `placement: "left_chest"`, `size: "M"`. Real output, trimmed:

```json
{
  "max_width_cm": 10.0,
  "max_height_cm": 10.0,
  "where": "on the heart side (wearer's left), 7 cm below the collar",
  "pixels_at_300_dpi": "1182 x 1182"
}
```

10 cm is right for the chest.

## 3. Fix (2 credits)

1. `remove_background` with the image (1 credit): a transparent PNG.
2. `upscale_image` with the `reuse_as_image_url` of step 1 and `height_cm: 10` (1 credit): 10 cm at 300 dpi.

## 4. Advice for the print shop (free)

`print_advice` with `technique: "dtf"`, `who_prints: "print_shop"`, `dpi: 300`. Two of its lines:

- "Send this PNG as it is to the print shop and ask them not to shrink it or add a background."
- "Always PNG, never JPG: JPG loses quality and transparency."

## 5. What the agent says

> Your logo is ready for the chest at 10 cm. I made two changes:
>
> - I removed the white background, which would have printed as a white square on the black shirt (1 credit).
> - I enlarged it to 10 cm at 300 dpi. It was at 254 dpi: fine from a distance, soft up close (1 credit).
>
> Download it here: [link]. The link lasts 4 hours.
>
> For the print shop: send this PNG as it is, at 10 cm, and ask them not to shrink it or add a background.
