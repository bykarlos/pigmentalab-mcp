// Remove the background of an image with the PigmentaLab REST API. Node 18+, no dependencies.
//
//   export PIGMENTALAB_API_KEY=plb_live_...      # from https://pigmentalab.io/app/api
//   node remove-background.mjs logo.png logo-transparent.png

import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const [, , src, dst] = process.argv;
if (!src || !dst) {
  console.error("usage: node remove-background.mjs <input image> <output.png>");
  process.exit(1);
}

const form = new FormData();
form.append("file", new Blob([await readFile(src)]), basename(src));

const resp = await fetch("https://api.pigmentalab.io/v1/background/remove", {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.PIGMENTALAB_API_KEY}` },
  body: form,
});

if (!resp.ok) {
  // Errors come as JSON with a stable code (INVALID_KEY, INSUFFICIENT_BALANCE, ...). Failed jobs are not charged.
  console.error(`PigmentaLab answered ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
  process.exit(1);
}

await writeFile(dst, Buffer.from(await resp.arrayBuffer()));
console.log(
  `${dst}: ${resp.headers.get("x-output-width")}x${resp.headers.get("x-output-height")} px, ` +
    `${resp.headers.get("x-credits-charged")} credit(s)`,
);
