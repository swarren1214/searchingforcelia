#!/usr/bin/env node

import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import sharp from "sharp";

const root = process.cwd();
const rawImageDir = path.join(root, "assets", "raw", "images");
const outputImageDir = path.join(root, "public", "images");
const widths = [640, 960, 1280, 1920];

async function walkImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkImages(fullPath)));
      continue;
    }

    if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const relativePath = path.relative(rawImageDir, filePath);
  const parsed = path.parse(relativePath);
  const outputDir = path.join(outputImageDir, parsed.dir);

  await mkdir(outputDir, { recursive: true });

  for (const width of widths) {
    const baseName = `${parsed.name}-${width}`;

    await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(outputDir, `${baseName}.webp`));

    await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 52 })
      .toFile(path.join(outputDir, `${baseName}.avif`));
  }
}

async function run() {
  try {
    const dirStats = await stat(rawImageDir);
    if (!dirStats.isDirectory()) {
      throw new Error("Raw image path is not a directory.");
    }
  } catch {
    console.log("No raw image directory found at assets/raw/images. Nothing to optimize.");
    return;
  }

  const files = await walkImages(rawImageDir);
  if (files.length === 0) {
    console.log("No source images found. Nothing to optimize.");
    return;
  }

  for (const filePath of files) {
    await optimizeImage(filePath);
    console.log(`Optimized: ${path.relative(root, filePath)}`);
  }

  console.log(`Done. Processed ${files.length} image(s).`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
