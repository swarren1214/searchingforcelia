#!/usr/bin/env node

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicDir = path.join(root, "public");
const maxImageBytes = 800 * 1024;
const maxVideoBytes = 14 * 1024 * 1024;
const allowedImageExtensions = new Set([".avif", ".webp", ".jpg", ".jpeg", ".png", ".svg"]);
const allowedVideoExtensions = new Set([".mp4", ".webm"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

async function run() {
  let failures = 0;

  const files = await walk(publicDir);
  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    const stats = await stat(filePath);
    const relative = path.relative(root, filePath);

    const isImage = relative.includes("public/images/");
    const isVideo = relative.includes("public/videos/");

    if (isImage && !allowedImageExtensions.has(ext)) {
      console.error(`Unsupported image format: ${relative}`);
      failures += 1;
    }

    if (isVideo && !allowedVideoExtensions.has(ext)) {
      console.error(`Unsupported video format: ${relative}`);
      failures += 1;
    }

    if (isImage && stats.size > maxImageBytes) {
      console.error(`Image too large (${stats.size} bytes): ${relative}`);
      failures += 1;
    }

    if (isVideo && stats.size > maxVideoBytes) {
      console.error(`Video too large (${stats.size} bytes): ${relative}`);
      failures += 1;
    }
  }

  if (failures > 0) {
    process.exitCode = 1;
    return;
  }

  console.log("Media guard check passed.");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
