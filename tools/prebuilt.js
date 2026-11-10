#!/usr/bin/env node
// Prebuilt packages: just copy the pre-built .tgz from the app folder
const fs = require('fs');
const path = require('path');

const appDir = process.argv[2];  // apps/chidori
const outputPath = process.argv[3];  // output .tgz path

if (!appDir || !outputPath) {
  console.error('Usage: prebuilt.js <app-dir> <output-path>');
  process.exit(1);
}

// Read app.json to get the id and version
const appJsonPath = path.join(appDir, 'app.json');
if (!fs.existsSync(appJsonPath)) {
  console.error('Error: app.json not found in ' + appDir);
  process.exit(1);
}

const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
const id = appJson.id;
const version = appJson.version;

// Look for the pre-built package in the app directory
const prebuiltPath = path.join(appDir, `${id}@${version}.tgz`);

if (!fs.existsSync(prebuiltPath)) {
  console.error(`Error: Pre-built package not found: ${prebuiltPath}`);
  console.error(`Expected: ${id}@${version}.tgz in ${appDir}`);
  process.exit(1);
}

// Copy the pre-built package to the output location
console.log(`Copying ${prebuiltPath} -> ${outputPath}`);
fs.copyFileSync(prebuiltPath, outputPath);
console.log(`Build complete: ${outputPath}`);
