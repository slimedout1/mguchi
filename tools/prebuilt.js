#!/usr/bin/env node
// Prebuilt packages: the .tgz is already built and in the app folder
const fs = require('fs');
const path = require('path');

const appDir = process.argv[2];  // apps/chidori

if (!appDir) {
  console.error('Usage: prebuilt.js <app-dir>');
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

// The pre-built package should already be in the app directory
const prebuiltPath = path.join(appDir, `${id}@${version}.tgz`);

if (!fs.existsSync(prebuiltPath)) {
  console.error(`Error: Pre-built package not found: ${prebuiltPath}`);
  console.error(`Expected: ${id}@${version}.tgz in ${appDir}`);
  process.exit(1);
}

// MGU Store expects the output at {dir}/{id}@{version}.tgz which is already there
console.log(`Pre-built package ready: ${prebuiltPath}`);
console.log(`Build complete (using pre-built package)`);
