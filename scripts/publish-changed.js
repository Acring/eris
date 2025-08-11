/*
  Publish only changed packages in Yarn workspaces to npm.
  - Compares local package.json version with npm registry
  - Skips private packages and apps
*/
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(command, options = {}) {
  return execSync(command, { stdio: 'pipe', encoding: 'utf8', ...options }).trim();
}

function getWorkspaces() {
  const output = run('yarn workspaces list --json');
  const lines = output.split('\n').filter(Boolean);
  return lines.map((line) => JSON.parse(line));
}

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getPublishedVersion(pkgName) {
  try {
    const version = run(`npm view ${pkgName} version --json`);
    if (!version) return null;
    return JSON.parse(version);
  } catch (e) {
    return null; // Not published yet
  }
}

function publishPackage(pkgPath) {
  console.log(`Publishing ${pkgPath} ...`);
  // Ensure files are built prior to publish; CI already ran yarn build at root
  run('npm publish --access public', { cwd: pkgPath });
}

function main() {
  const repoRoot = process.cwd();
  const workspaces = getWorkspaces();
  const packages = workspaces.filter((w) => w.location.startsWith('packages/'));

  let publishedCount = 0;
  for (const ws of packages) {
    const pkgDir = path.join(repoRoot, ws.location);
    const pkgFile = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(pkgFile)) continue;

    const pkg = readJSON(pkgFile);
    if (pkg.private) {
      console.log(`Skip private package ${pkg.name || ws.name}`);
      continue;
    }
    if (!pkg.name || !pkg.version) {
      console.log(`Skip invalid package at ${ws.location}`);
      continue;
    }

    const current = pkg.version;
    const published = getPublishedVersion(pkg.name);
    if (published === current) {
      console.log(`No change for ${pkg.name} (${current})`);
      continue;
    }

    console.log(`Will publish ${pkg.name}: local ${current}, published ${published || 'none'}`);
    publishPackage(pkgDir);
    publishedCount += 1;
  }

  console.log(`Done. Published ${publishedCount} package(s).`);
}

main();
