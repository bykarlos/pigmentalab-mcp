"""Remove the background of an image with the PigmentaLab REST API.

    pip install requests
    export PIGMENTALAB_API_KEY=plb_live_...      # from https://pigmentalab.io/app/api
    python remove_background.py logo.png logo-transparent.png
"""

import os
import sys

import requests

API = "https://api.pigmentalab.io/v1"


def remove_background(src: str, dst: str) -> None:
    key = os.environ["PIGMENTALAB_API_KEY"]
    with open(src, "rb") as image:
        resp = requests.post(
            f"{API}/background/remove",
            headers={"Authorization": f"Bearer {key}"},
            files={"file": (os.path.basename(src), image)},
            timeout=120,
        )
    if resp.status_code != 200:
        # Errors come as JSON with a stable code (INVALID_KEY, INSUFFICIENT_BALANCE, ...). Failed jobs are not charged.
        sys.exit(f"PigmentaLab answered {resp.status_code}: {resp.text[:300]}")
    with open(dst, "wb") as out:
        out.write(resp.content)
    print(f"{dst}: {resp.headers.get('X-Output-Width')}x{resp.headers.get('X-Output-Height')} px, "
          f"{resp.headers.get('X-Credits-Charged')} credit(s)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("usage: python remove_background.py <input image> <output.png>")
    remove_background(sys.argv[1], sys.argv[2])
