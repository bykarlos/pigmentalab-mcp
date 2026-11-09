# What a good DTF file is

## The file

- PNG with a transparent background. Never JPG: it loses quality and has no transparency.
- 300 dpi at the real print size. 150 dpi is the floor: it looks fine from a distance and soft up close.
- Transparency fully on or off. Half-transparent pixels (shadows, glows, feathered edges) print with a halo or a white
  rim: make the alpha binary, or turn the soft parts into a halftone.
- Lines and letters at least 1 mm wide once printed.
- White ink goes under the colors as a base, so any color prints on any garment.
- Print at the exact size of the file, without shrinking or enlarging it in the RIP.

## Pixels for a print size

Pixels = cm ÷ 2.54 × dpi. At least:

| Print size | At 300 dpi (optimal) | At 150 dpi (floor) |
|---|---|---|
| 5 cm | 591 px | 296 px |
| 10 cm | 1182 px | 591 px |
| 20 cm | 2363 px | 1182 px |
| 27 cm | 3189 px | 1595 px |
| 30 cm | 3544 px | 1772 px |
| 35 cm | 4134 px | 2067 px |
| 42 cm | 4961 px | 2481 px |

## Where it goes on the garment

`print_size_for_garment` gives the exact box by garment, placement and size, and where it sits. As an orientation, in
adult M:

| Placement | Box |
|---|---|
| T-shirt full front | 27 x 35 cm (from 25 x 33 in S to 32 x 42 in XXXL), 6–8 cm below the collar |
| Left chest | about 10 x 10 cm, 7 cm below the collar |
| Full back | 29 x 39 cm, about 10 cm below the collar |
| Oversize t-shirt | front 32.5 x 38.5 cm, back 35 x 39 cm, never more than 38 cm wide |
| Hoodie front | 27 x 26 cm, above the kangaroo pocket |
| Kids | from 15 cm wide (2 years) to 25 cm (16 years) |
| Cap | 10 x 5.5 cm |
| Tote bag | 25 x 30 cm |

The box is the maximum: the design stays inside it and does not have to fill it.

## Dark garments and halftones

- Gradients on a dark garment: a halftone turns them into dots. It is softer to the touch, uses less white ink, and
  the gradients survive washing.
- To change the size of a halftone, make it again from the original at the new size: scaling a finished halftone
  deforms the dots.
- In the RIP, keep the white choke at the minimum, or it eats the small dots.

## Dropping a color (knockout)

- A black design on a black garment: drop the black with `knockout_color` so the fabric shows through. Hard alpha is
  what DTF needs; the progressive mode keeps a soft fade.
- Use it instead of a background removal when the color to drop is also inside the design.

## Gang sheets

- The sheet is the width of the printer's film roll: 58 cm is the most common, and 30, 33 and 60 cm exist. Ask
  before packing.
- `create_gangsheet` takes the pieces, the copies of each and their size in cm, and packs them by their real
  silhouette with a 5 mm margin by default. It is priced by the metres of the result.

## Other techniques

- **Sublimation:** white or light polyester only. White is not printed (the fabric shows), the background does not
  need removing, and 150 dpi is enough. A whole roll of fabric takes a seamless pattern.
- **UV DTF:** real size, no background, for rigid objects (mugs, tumblers, glass).
- **Screen printing:** flat colors, one per screen; gradients become a halftone.
- **Vinyl:** vectorize it, with flat colors and no gradients.
- **Embroidery:** few colors, no gradients or very fine details.
