import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const ROOT = "attached_assets";
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 80;
const MIN_BYTES = 300 * 1024;

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
}

const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const files = (await walk(ROOT)).filter((f) =>
  exts.has(path.extname(f).toLowerCase())
);

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

for (const file of files) {
  const stat = await fs.stat(file);
  if (stat.size < MIN_BYTES) {
    skipped++;
    continue;
  }
  const ext = path.extname(file).toLowerCase();
  try {
    const buf = await fs.readFile(file);
    let pipeline = sharp(buf, { failOn: "none" }).rotate();
    const meta = await sharp(buf).metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    let outBuf;
    if (ext === ".jpg" || ext === ".jpeg") {
      outBuf = await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .toBuffer();
    } else if (ext === ".png") {
      outBuf = await pipeline
        .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
        .toBuffer();
    } else if (ext === ".webp") {
      outBuf = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    } else {
      skipped++;
      continue;
    }
    if (outBuf.length < stat.size) {
      await fs.writeFile(file, outBuf);
      totalBefore += stat.size;
      totalAfter += outBuf.length;
      processed++;
      console.log(
        `  ${(stat.size / 1024).toFixed(0)}KB -> ${(outBuf.length / 1024).toFixed(0)}KB  ${file}`
      );
    } else {
      skipped++;
    }
  } catch (err) {
    console.warn(`  SKIP ${file}: ${err.message}`);
    skipped++;
  }
}

console.log(
  `\nProcessed: ${processed}  Skipped: ${skipped}\nBefore: ${(totalBefore / 1024 / 1024).toFixed(1)}MB  After: ${(totalAfter / 1024 / 1024).toFixed(1)}MB  Saved: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)}MB`
);
