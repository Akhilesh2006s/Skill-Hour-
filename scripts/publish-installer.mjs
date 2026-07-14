/**
 * Copy SkillHour-Setup-{version}.exe into:
 *   develop/downloads/{version}/SkillHour-Setup-{version}.exe
 * and update develop/downloads/latest.json
 *
 * Usage:
 *   node scripts/publish-installer.mjs
 *   node scripts/publish-installer.mjs --version 1.0.0
 *   node scripts/publish-installer.mjs --src "D:\\path\\to\\SkillHour-Setup-1.0.0.exe"
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const developRoot = join(__dirname, '..');
const repoRoot = join(developRoot, '..');
const downloadsRoot = join(developRoot, 'downloads');

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function readDesktopVersion() {
  try {
    const pkg = JSON.parse(
      readFileSync(join(repoRoot, 'viswam-desktop', 'package.json'), 'utf8'),
    );
    return String(pkg.version || '1.0.0').trim();
  } catch {
    return '1.0.0';
  }
}

const version = String(argValue('--version') || readDesktopVersion()).trim();
const fileName = `SkillHour-Setup-${version}.exe`;
const destDir = join(downloadsRoot, version);
const destFile = join(destDir, fileName);

const defaultCandidates = [
  join(repoRoot, 'viswam-desktop', 'release', fileName),
  join(repoRoot, 'viswam-desktop', 'release-build', fileName),
];

const srcArg = argValue('--src');
const srcFile = srcArg
  ? resolve(srcArg)
  : defaultCandidates.find((p) => existsSync(p));

if (!srcFile || !existsSync(srcFile)) {
  console.error(`Installer not found: ${fileName}`);
  console.error('Build first, then re-run publish:');
  console.error('  cd viswam-desktop');
  console.error('  npm run dist:client');
  console.error('  cd ../develop && npm run publish');
  console.error('');
  console.error('Or pass a path:');
  console.error(`  npm run publish -- --src "C:\\path\\to\\${fileName}"`);
  process.exit(1);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(srcFile, destFile);

const relativePath = `/downloads/${version}/${fileName}`;
const latest = {
  productName: 'SkillHour',
  version,
  architecture: 'x64',
  fileName,
  path: relativePath,
  installerParameters: '/S',
  updatedAt: new Date().toISOString(),
};

writeFileSync(join(downloadsRoot, 'latest.json'), `${JSON.stringify(latest, null, 2)}\n`);

const bytes = statSync(destFile).size;
console.log(`Published:`);
console.log(`  from: ${srcFile}`);
console.log(`  to:   ${destFile}`);
console.log(`  size: ${(bytes / (1024 * 1024)).toFixed(1)} MB`);
console.log(`  url:  ${relativePath}`);
console.log('');
console.log('Partner Center Package URL (replace YOUR_DOMAIN):');
console.log(`  https://YOUR_DOMAIN${relativePath}`);