// Renders every built talk flyer (_site/flyers/*.html) to flyers/<name>.pdf.
// A flyer is re-rendered only when what it prints changes: the hash covers
// the .sheet markup plus the bytes of every image it shows, and is kept in
// flyers/.hashes.json. PDFs whose talk file was removed are deleted.
// Usage: node render-flyers.mjs <built-site-dir> <repo-dir>
import { chromium } from "playwright";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [site, repo] = process.argv.slice(2).map(p => path.resolve(p));
const outDir = path.join(repo, "flyers");
const hashFile = path.join(outDir, ".hashes.json");
fs.mkdirSync(outDir, { recursive: true });
const old = fs.existsSync(hashFile) ? JSON.parse(fs.readFileSync(hashFile, "utf8")) : {};
const hashes = {};

const browser = await chromium.launch();
const page = await browser.newPage();
const pages = fs.readdirSync(path.join(site, "flyers")).filter(f => f.endsWith(".html"));
for (const file of pages) {
  const name = file.replace(/\.html$/, "");
  const htmlPath = path.join(site, "flyers", file);
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  // The template and no-seminar weeks are marked data-no-pdf by the layout.
  if (await page.$(".sheet[data-no-pdf]")) continue;
  await page.waitForFunction(() => document.documentElement.dataset.fitted === "1");

  const h = createHash("sha256").update(await page.$eval(".sheet", el => el.outerHTML));
  const srcs = await page.$$eval(".sheet img", imgs => imgs.map(i => i.getAttribute("src")));
  for (const src of srcs) {
    const f = path.resolve(path.dirname(htmlPath), src);
    if (fs.existsSync(f)) h.update(fs.readFileSync(f));
  }
  hashes[name] = h.digest("hex");

  const pdf = path.join(outDir, `${name}.pdf`);
  if (old[name] === hashes[name] && fs.existsSync(pdf)) continue;
  await page.pdf({ path: pdf, preferCSSPageSize: true, printBackground: true });
  console.log(`rendered flyers/${name}.pdf`);
}
await browser.close();

for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith(".pdf") && !(f.replace(/\.pdf$/, "") in hashes)) {
    fs.rmSync(path.join(outDir, f));
    console.log(`removed flyers/${f}`);
  }
}
fs.writeFileSync(hashFile, JSON.stringify(hashes, null, 2) + "\n");
